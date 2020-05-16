<template>
  <Editor>
    <Topbar :backUrl="`${$routes.admin}pages`" @save="onSave">
      <Toggle />
    </Topbar>

    <Workspace>
      <Draggable
        v-model="pageBlocks"
        group="blocks"
        :class="{ 'block-container': edit, __puzzle_page: !edit }"
        @end="onEnd"
      >
        <Block
          v-for="(block, index) in pageBlocks"
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

    pageBlocks: {
      get() {
        return this.$store.getters['page/getChildren']('root')
      },

      set(value) {
        this.$store.commit('page/updateBlocks', {
          blocks: value.map(b => ({ ...b, parent: 'root' })),
          parent: 'root',
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

    onClickBlock(block) {
      if (this.edit) {
        this.$store.commit('editor/setSelected', block.id)
        this.activeTab = 'Settings'
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
    this.activeTab = 'Blocks'
  },

  mounted() {
    this.addValidator(this._blocksNoEmptyValidator)
    this.addValidator(this._nameValidator)
  },
}
</script>
