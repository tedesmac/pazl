<template>
  <Editor>
    <Topbar :backUrl="`/puzzle/admin/entries/${modelId}`" @save="onSave" />

    <Workspace class="entry-workspace">
      <div
        v-for="(block, index) in blocks"
        class="entry-block"
        :key="block.name"
      >
        <label>{{ block.name }}</label>
        <Setting root="root" :setting="block" :type="block.type" />
      </div>
    </Workspace>

    <Sidebar>
      <Collapsible class="form" string="Settings">
        <div class="field">
          <label>Title</label>
          <input maxlength="50" type="text" v-model="name" />
        </div>

        <div class="field">
          <label>Description</label>
          <textarea maxlength="200" v-model="description" />
        </div>

        <div class="field">
          <ImagePicker v-model="image" />
        </div>

        <div class="field">
          <label>Author</label>
        </div>
      </Collapsible>

      <Collapsible class="form" string="Advance Settings" :show="false">
        <div class="field">
          <label>Slug</label>
          <input maxlength="100" type="text" v-model="slug" />
        </div>
      </Collapsible>
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
import Block from '@/components/block'
import ImagePicker from '@/components/editor/image-picker'
import { EditorMixin } from '@/components/mixins'
import Setting from '@/components/setting'
import EditorStore from '@/store/editor'
import PageStore from '@/store/page'

const ImageGallery = () =>
  import(
    /* webpackChunkName: 'imageGallery' */
    '@/components/misc/image-gallery'
  )

export default {
  mixins: [EditorMixin],

  components: { Block, ImageGallery, ImagePicker, Setting },

  data() {
    return {
      imageSelectedCallbak: null,
    }
  },

  props: {
    modelId: {
      type: Number,
      required: true,
    },
  },

  computed: {
    blocks() {
      return this.$store.state.page.blocks
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
  },

  methods: {
    beforeImageGallery(event) {
      this.imageSelectedCallbak = event.params.callback
    },

    onImageSelected(image) {
      if (this.imageSelectedCallbak) {
        this.imageSelectedCallbak(image)
      }

      this.$modal.hide('image-select')
    },

    onSave() {
      this.$store
        .dispatch('page/saveEntry', {
          id: this.id,
          model: this.modelId,
        })
        .then(data => {
          if (data.id !== this.id) {
            this.$router.push({
              path: `/puzzle/editor/entry?id=${data.id}&model=${this.modelId}`,
            })
            this.$notify({
              group: 'messages',
              text: 'Entry saved',
            })
          }
        })
        .catch(() => {
          this.$notify({
            group: 'errors',
            text: 'Unable to save, please try again later',
          })
        })
    },

    redirectToAdmin() {
      window.location = '/puzzle/admin/'
    },
  },

  beforeDestroy() {
    this.$store.unregisterModule('editor')
    this.$store.unregisterModule('page')
  },

  created() {
    this.$store.registerModule('editor', EditorStore)
    this.$store.registerModule('page', PageStore)

    if (this.modelId > 0) {
      this.$store
        .dispatch('page/setupEntry', this.modelId)
        .then(() => {
          if (this.id > 0) {
            this.$store.dispatch('page/fetchEntry', this.id).catch(() => {
              window.location = `/puzzle/admin/entries/${this.model}`
            })
          }
        })
        .catch(() => {
          this.redirectToAdmin()
        })
    } else {
      this.redirectToAdmin()
    }
  },
}
</script>
