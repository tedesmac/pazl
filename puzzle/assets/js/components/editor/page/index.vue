<template>
  <Editor>
    <Topbar :backUrl="`${$routes.admin}pages`" @save="onSave">
      <Toggle />
    </Topbar>

    <Workspace>
      <Draggable
        v-model="blocks"
        group="blocks"
        :class="{ 'block-container': edit, __puzzle_page: !edit }"
        @end="onEnd"
      >
        <Block
          v-for="(block, index) in blocks"
          parent="root"
          :block="block.id"
          :class="{
            block: edit,
            'block-hover': block.id === mouseover && edit,
            'block-selected': block.id === selected && edit,
          }"
          :index="index"
          :key="block.id"
          :type="block.type"
          @click.stop.native="onClickBlock(block)"
          @mouseover.stop.native="onMouseOver(block.id)"
        />
      </Draggable>
    </Workspace>

    <Sidebar>
      <div class="tab-list">
        <div
          :class="['tab', { active: activeTab === 'Settings' }]"
          @click="activeTab = 'Settings'"
        >
          Settings
        </div>

        <div class="separator" />

        <div
          :class="['tab', { active: activeTab === 'Blocks' }]"
          @click="activeTab = 'Blocks'"
        >
          Blocks
        </div>

        <div class="separator" />

        <div
          :class="['tab', { active: activeTab === 'Page' }]"
          @click="activeTab = 'Page'"
        >
          Page
        </div>
      </div>
      <!-- Block Settings -->
      <BlockSettings v-if="activeTab === 'Settings' && selected" />
      <div v-else-if="activeTab === 'Settings'" class="setting">
        Select a block to change its properties
      </div>

      <!-- Blocks -->
      <div v-if="activeTab === 'Blocks'">
        <Collapsible string="Default Blocks">
          <Draggable
            v-model="defaultBlocks"
            :clone="onClone"
            :group="{ name: 'blocks', pull: 'clone', put: false }"
          >
            <div
              v-for="(block, index) in defaultBlocks"
              class="model-block"
              :key="`default_block_${index}`"
            >
              {{ block.type }}
            </div>
          </Draggable>
        </Collapsible>

        <Collapsible string="User Blocks">
          <Draggable
            v-model="userBlocks"
            :clone="onCloneUserBlock"
            :group="{ name: 'blocks', pull: 'clone', put: false }"
          >
            <div
              v-for="(block, index) in userBlocks"
              class="model-block"
              :key="`user_block_${index}`"
            >
              {{ block.name }}
            </div>
          </Draggable>
        </Collapsible>
      </div>

      <!-- Page Settings -->
      <div v-if="activeTab === 'Page'">
        <Collapsible class="form" string="Settings">
          <div class="field">
            <label>Name</label>
            <input type="text" maxlength="100" v-model="name" />
          </div>

          <div class="field">
            <label>Description</label>
            <textarea maxlength="200" v-model="description" />
          </div>

          <div class="field">
            <ImagePicker v-model="image" />
          </div>
        </Collapsible>

        <Collapsible string="Advance Settings" />

        <Collapsible string="Style" />
      </div>
    </Sidebar>

    <modal
      height="auto"
      name="image-select"
      width="80%"
      :scrollable="true"
      @before-open="beforeImageGallery"
    >
      <ImageGallery @image="onImageSelected" />
    </modal>

    <notifications group="messages" position="bottom right" />

    <notifications
      group="errors"
      position="bottom right"
      classes="vue-notification error"
    />
  </Editor>
</template>

<script>
import ImagePicker from '@/components/editor/image-picker'
import Toggle from '@/components/editor/mode-toggle'
import {
  BlockContainerMixin,
  BlockEditorMixin,
  EditorMixin,
} from '@/components/mixins'
import { blockTypes } from '@/constants'
import blockFactory from '@/factories/block'
import { genId, mergeArrays } from '@/utils'
import Slug from 'slug'

const BlockSettings = () =>
  import(
    /* webpackChunkName: 'pageBlockSettings' */
    '@/components/editor/blockSettings'
  )
const ImageGallery = () =>
  import(
    /* webpackChunkName: 'imageGallery' */
    'components/misc/image-gallery'
  )

const defaultBlocks = Object.keys(blockTypes)
  .sort()
  .map(key => ({
    type: key,
  }))

export default {
  mixins: [BlockContainerMixin, BlockEditorMixin, EditorMixin],

  components: {
    BlockSettings,
    ImageGallery,
    ImagePicker,
    Toggle,
  },

  data() {
    return {
      defaultBlocks,
      imageSelectedCallbak: null,
      userBlocks: [],
    }
  },

  computed: {
    activeTab: {
      get() {
        return this.$store.state.editor.currentTab
      },

      set(value) {
        this.$store.commit('editor/setCurrentTab', value)
      },
    },

    blocks: {
      get() {
        return this.$store.getters['page/getChildren']('root')
      },

      set(value) {
        const blocks = mergeArrays(value, 'root')
        this.$store.commit('page/updateBlocks', {
          parent: 'root',
          blocks,
        })
      },
    },

    description: {
      get() {
        return this.$store.state.page.description
      },

      set(value) {
        this.$store.commit('page/setDescription', value)
      },
    },

    image: {
      get() {
        return this.$store.state.page.image
      },

      set(value) {
        this.$store.commit('page/setImage', value)
      },
    },

    name: {
      get() {
        return this.$store.state.page.name
      },

      set(value) {
        this.$store.commit('page/setName', value)
      },
    },

    slug: {
      get() {
        return this.$store.state.page.slug
      },

      set(value) {
        this.$store.commit('page/setSlug', value)
      },
    },

    style: {
      get() {
        return this.$store.state.page.syle
      },

      set(value) {
        this.$store.commit('page/setStyle', value)
      },
    },
  },

  methods: {
    beforeImageGallery(event) {
      this.imageSelectedCallbak = event.params.callback
    },

    fetchUserBlocks() {
      this.$api.blocks
        .get({ include_data: 1, model: 0 })
        .then(data => {
          this.userBlocks = data
        })
        .catch(error => {
          console.error('[PageEditor.fetchUserBlocks] =>', error)
        })
    },

    onClickBlock(block) {
      if (this.edit) {
        this.$store.commit('editor/setSelected', block.id)
        this.activeTab = 'Settings'
      }
    },

    /**
     * This function does the following operations:
     *
     * 1. Filter container blocks.
     * 2. Generete new ids for the container blocks, but dont assign them yet.
     * 3. Generete and assign new ids for all the blocks.
     *    a. If block is a container, use the already generated id.
     *    b. If block parent is not root, update its parent id using the
     *       previusly generated container ids.
     */
    onCloneUserBlock(userBlock) {
      try {
        const containers = userBlock.data.blocks.filter(
          block => block.type === 'container'
        )

        const containerIds = containers.reduce((acc, block) => {
          const { id } = block
          acc[id] = genId()
          return acc
        }, {})

        const blocks = userBlock.data.blocks.map(block => {
          if (block.parent in containerIds) {
            block.parent = containerIds[block.parent]
          }

          if (block.type === 'container') {
            block.id = containerIds[block.id]
          } else {
            block.id = genId()
          }

          return block
        })

        console.log(blocks)

        return blocks
      } catch (e) {
        console.error('[PageEditor.onCloneUserBlock] =>', e)
      }
    },

    onImageSelected(image) {
      if (this.imageSelectedCallbak) {
        this.imageSelectedCallbak(image)
      }

      this.$modal.hide('image-select')
    },

    onSave() {
      if (this.validate()) {
        this.$store.commit('editor/setSaving', true)
        this.$store
          .dispatch('page/savePage', this.id)
          .then(data => {
            if (data.id !== this.id) {
              this.$router.push({
                path: `${this.$routes.editor}page?id=${data.id}`,
              })
            }
            this.$notify({
              group: 'messages',
              text: 'Page saved',
            })
            this.$store.commit('editor/setSaving', false)
          })
          .catch(error => {
            console.error('[Page Editor] =>', error)
            this.$notify({
              group: 'errors',
              text: 'Unable to save page, please try again later',
            })
          })
        this.$store.commit('editor/setSaving', false)
      }
    },
  },

  beforeMount() {
    if (this.id > 0) {
      this.$store.dispatch('page/fetchPageById', this.id).catch(() => {
        window.location = `${this.$routes.admin}pages`
      })
    }
    this.fetchUserBlocks()
    this.activeTab = 'Blocks'
  },

  mounted() {
    this.addValidator(this._blocksNoEmptyValidator)
    this.addValidator(this._nameValidator)
  },
}
</script>
