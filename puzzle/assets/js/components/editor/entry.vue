<template>
  <Editor>
    <Topbar :backUrl="`${$routes.admin}entries/${modelId}`" @save="onSave" />

    <Workspace class="entry-workspace">
      <div
        v-for="(block, index) in blocks"
        class="entry-block"
        :key="block.name"
      >
        <label>{{ block.name }} - {{ block.type }}</label>
        <Block
          parent="root"
          :block="block.name"
          :index="index"
          :type="block.type"
        />
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
import EditorStore from '@/store/editor'
import PageStore from '@/store/page'
import { mapState } from 'vuex'

const ImageGallery = () =>
  import(
    /* webpackChunkName: 'imageGallery' */
    '@/components/misc/image-gallery'
  )

export default {
  mixins: [EditorMixin],

  components: { Block, ImageGallery, ImagePicker },

  props: {
    modelId: {
      type: Number,
      required: true,
    },
  },

  computed: {
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

    ...mapState({
      blocks: state => {
        if (state.page.blocks) {
          return state.page.blocks
        }
        return []
      },
    }),
  },

  methods: {
    onSave() {
      if (this.validate()) {
        this.$store
          .dispatch('page/saveEntry', {
            id: this.id,
            model: this.modelId,
          })
          .then(data => {
            if (data.id !== this.id) {
              this.$router.push({
                path: `${this.$routes.editor}entry?id=${data.id}&model=${this.modelId}`,
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
      }
    },

    redirectToAdmin(extra = '') {
      window.location = `${this.$routes.admin}${extra}`
    },
  },

  created() {
    if (this.modelId > 0) {
      this.$store
        .dispatch('page/setupEntry', this.modelId)
        .then(() => {
          if (this.id > 0) {
            this.$store.dispatch('page/fetchEntry', this.id).catch(() => {
              this.redirectToAdmin(`entries/${this.model}`)
            })
          } else {
            this.$store.commit('page/setIsEntry', true)
          }
        })
        .catch(() => {
          this.redirectToAdmin()
        })
    } else {
      this.redirectToAdmin()
    }

    this.addValidator(this._nameValidator)
  },
}
</script>
