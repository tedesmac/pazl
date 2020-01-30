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
        <Block
          v-for="(block, index) in pageBlocks"
          parent="root"
          :block="block.id"
          :index="index"
          :key="block.id"
          :type="block.type"
        />
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

    <modal name="block-settings" />

    <modal name="image-select" @before-open="beforeImageGallery">
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
import EditorStore from '@/store/editor'
import PageStore from '@/store/page'
import Block from 'components/block'
import { BlockEditorMixin } from 'components/mixins'
import Slug from 'slug'
import { genId } from 'utils'
import { mapState } from 'vuex'
import Toggle from './toggle'

const ImageGallery = () =>
  import(
    /* webpackChunkName: 'imageGallery' */
    'components/misc/image-gallery'
  )

const defaultBlocks = [
  { type: 'container' },
  { type: 'image' },
  { type: 'html' },
  { type: 'link' },
  { type: 'markdown' },
  { type: 'string' },
]

export default {
  mixins: [BlockEditorMixin],

  components: { Block, ImageGallery, Toggle },

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
  },

  methods: {
    beforeImageGallery(event) {
      this.imageSelectedCallbak = event.params.callback
    },

    onClone(block) {
      return {
        ...block,
        id: genId(),
        parent: 'root',
      }
    },

    onImageSelected(image) {
      if (this.imageSelectedCallbak) {
        this.imageSelectedCallbak(image)
      }

      this.$modal.hide('image-select')
    },

    onModeChange(mode) {
      console.log(mode)
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
