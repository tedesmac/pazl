<template>
  <Editor>
    <Topbar backUrl="/puzzle/admin/pages" :saving="saving" @save="onSave" />

    <Sidebar>
      <div class="tab-list">
        <div
          :class="['tab', { active: activeTab === 'Blocks' }]"
          @click="activeTab = 'Blocks'"
        >
          Blocks
        </div>

        <div class="separator" />

        <div
          :class="['tab', { active: activeTab === 'Block' }]"
          @click="activeTab = 'Block'"
        >
          Block
        </div>

        <div class="separator" />

        <div
          :class="['tab', { active: activeTab === 'Page' }]"
          @click="activeTab = 'Page'"
        >
          Page
        </div>
      </div>

      <div v-if="activeTab === 'Blocks'">Blocks</div>
      <div v-if="activeTab === 'Block'">Block</div>

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

    <Workspace></Workspace>

    <Error :message="errorMessage" :show="error" @close="error = false" />
  </Editor>
</template>

<script>
import Block from 'components/block'
import { BlockEditorMixin } from 'components/mixins'
import Slug from 'slug'

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

  components: { Block },

  data() {
    return {
      activeTab: 'Blocks',
      blocks: [],
      defaultBlocks,
      description: '',
      image: '',
      name: '',
      slug: '',
      style: {},
    }
  },

  methods: {
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
        data['slug'] = Slug(this.name)
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
        })
        .catch(() => {
          this.saving = false
          this.error = true
          this.errorMessage = 'Unable to save, please try again later'
        })
    },

    put(data) {
      this.$api.pages
        .post(data)
        .then(newData => {
          this.saving = false
          console.log('[saved] =>', newData)
        })
        .catch(() => {
          this.saving = false
          this.error = true
          this.errorMessage = 'Unable to save, please try again later'
        })
    },
  },

  mounted() {
    if (this.id > 0) {
      this.$api.pages
        .get({ id: this.id })
        .then(data => {
          this.blocks = data.data.blocks
          this.description = data.description
          this.name = data.name
          this.slug = data.slug
        })
        .catch(() => {
          window.location = '/puzzle/admin/pages'
        })
    }
  },
}
</script>
