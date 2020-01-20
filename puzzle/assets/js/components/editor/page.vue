<template>
  <Editor>
    <Topbar backUrl="/puzzle/admin/pages" :saving="saving" @save="onSave" />

    <Workspace>
      <Draggable v-model="blocks" group="blocks" :clone="onClone" @end="onEnd">
        <div
          v-for="(block, index) in pageBlocks"
          class="model-block"
          :key="`default_block_${index}`"
        >
          {{ block.type }}
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

      <!-- Block Settings -->
      <div v-if="activeTab === 'Block'">Block</div>

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

    <Error :message="errorMessage" :show="error" @close="error = false" />
  </Editor>
</template>

<script>
import PageStore from '@/store/page'
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
      defaultBlocks,
    }
  },

  computed: {
    pageBlocks: {
      get() {
        return this.$store.state.page.blocks
      },

      set(value) {
        this.$store.commit('page/setBlocks', value)
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
    onClone(block) {
      return block
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

  beforeDestroy() {
    this.$store.unregisterModule('page')
  },

  created() {
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
