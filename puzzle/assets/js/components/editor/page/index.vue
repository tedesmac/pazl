<template>
  <Editor>
    <Topbar backUrl="/puzzle/admin/pages" :saving="saving" @save="onSave">
      <Toggle @mode="onModeChange" />
    </Topbar>

    <Workspace>
      <Draggable
        v-model="pageBlocks"
        group="blocks"
        :class="{ 'block-container': edit, __puzzle_page: !edit }"
        @end="onEnd"
      >
        <div
          v-for="(block, index) in pageBlocks"
          :block="block.id"
          :class="{ block: edit }"
          :key="block.id"
        >
          <div v-if="edit" class="type">{{ block.type }}</div>

          <Block
            parent="root"
            :block="block.id"
            :index="index"
            :type="block.type"
          />

          <FontAwesomeIcon
            v-if="edit"
            class="edit-icon"
            :icon="faEdit"
            @click="onEditBlock(block)"
          />
        </div>
      </Draggable>
    </Workspace>

    <Sidebar>
      <div class="tab-list">
        <div
          :class="['tab', { active: activeTab === 'Blocks' }]"
          @click="activeTab = 'Blocks'"
        >
          Blocks
        </div>

        <div class="separator" />

        <div class="separator" />

        <div
          :class="['tab', { active: activeTab === 'Page' }]"
          @click="activeTab = 'Page'"
        >
          Page
        </div>
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
            <label>Image</label>
            <input type="file" value="submit" />
          </div>
        </Collapsible>

        <Collapsible string="Advance Settings" />

        <Collapsible string="Style" />
      </div>
    </Sidebar>

    <modal height="auto" name="block-settings" width="80%" :scrollable="true">
      <BlockSettings />
    </modal>

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
import Block from '@/components/block'
import { BlockEditorMixin } from '@/components/mixins'
import { blockTypes } from '@/constants'
import blockFactory, { mergeBlockToSettings } from '@/factories/block'
import EditorStore from '@/store/editor'
import PageStore from '@/store/page'
import { genId } from '@/utils'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Slug from 'slug'
import { mapState } from 'vuex'
import Toggle from './toggle'

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
  mixins: [BlockEditorMixin],

  components: { Block, BlockSettings, FontAwesomeIcon, ImageGallery, Toggle },

  data() {
    return {
      activeTab: 'Blocks',
      defaultBlocks,
      imageSelectedCallbak: null,
    }
  },

  computed: {
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

    ...mapState({
      edit: state => state.editor.edit,
    }),

    faEdit: () => faEdit,
  },

  methods: {
    beforeImageGallery(event) {
      this.imageSelectedCallbak = event.params.callback
    },

    onEditBlock(block) {
      const settings = mergeBlockToSettings(block)
      this.$store.commit('editor/setBlockSettings', { id: block.id, settings })
      this.$modal.show('block-settings')
    },

    onClone(block) {
      return blockFactory(block.type)
    },

    onImageSelected(image) {
      if (this.imageSelectedCallbak) {
        this.imageSelectedCallbak(image)
      }

      this.$modal.hide('image-select')
    },

    onModeChange(mode) {
      if (mode === 'edit') {
        this.$store.commit('editor/setEdit', true)
      } else {
        this.$store.commit('editor/setEdit', false)
      }
    },

    onSave() {
      this.saving = true

      let data = {
        data: {
          blocks: this.blocks,
        },
        name: this.name,
      }

      if (this.description) {
        data['description'] = this.description
      }

      if (this.slug) {
        data['slug'] = this.slug
      } else {
        data['slug'] = Slug(this.name.toLowerCase())
      }

      if (this.id === 0) {
        this.post(data)
      } else {
        data['id'] = this.id
        this.put(data)
      }
    },

    post(data) {
      this.$api.pages
        .post(data)
        .then(newData => {
          this.saving = false
          console.log('[saved] =>', newData)
          this.$router.push({ path: `/puzzle/editor/page?id=${newData.id}` })
          this.$notify({
            group: 'messages',
            text: 'Page saved',
          })
        })
        .catch(() => {
          this.saving = false
          this.$notify({
            group: 'errors',
            text: 'Unable to save, please try again later',
          })
        })
    },

    put(data) {
      this.$api.pages
        .post(data)
        .then(newData => {
          this.saving = false
          console.log('[saved] =>', newData)
          this.$notify({
            group: 'messages',
            text: 'Page saved',
          })
        })
        .catch(() => {
          this.saving = false
          this.$notify({
            group: 'errors',
            text: 'Unable to save, please try again later',
          })
        })
    },

    removeBlock(id) {
      this.pageBlocks = this.pageBlocks.filter((block, index) => {
        if (block.id && block.id !== id) {
          return block
        } else if (!block.id && index !== Number(id)) {
          return block
        }
      })
    },
  },

  beforeDestroy() {
    this.$store.unregisterModule('editor')
    this.$store.unregisterModule('page')
  },

  created() {
    this.$store.registerModule('editor', EditorStore)
    this.$store.registerModule('page', PageStore)
  },

  beforeMount() {
    if (this.id > 0) {
      this.$store.dispatch('page/fetchPageById', this.id).catch(() => {
        window.location = '/puzzle/admin/pages'
      })
    }
  },
}
</script>
