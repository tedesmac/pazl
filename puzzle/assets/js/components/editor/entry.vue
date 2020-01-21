<template>
  <Editor>
    <Topbar :backUrl="`/puzzle/admin/entries/${modelId}`" />

    <Workspace class="entry-workspace">
      <div
        v-for="(block, index) in modelBlocks"
        class="entry-block"
        :key="`block_${index}`"
      >
        <label>{{ block.type }}</label>
      </div>
    </Workspace>

    <Sidebar>
      <Collapsible class="form" string="Settings">
        <div class="field">
          <label>Title</label>
          <input type="text" />
        </div>

        <div class="field">
          <label>Description</label>
          <textarea />
        </div>

        <div class="field">
          <label>Image</label>
          <input type="file" />
        </div>

        <div class="field">
          <label>Author</label>
        </div>
      </Collapsible>

      <Collapsible class="form" string="Advance Settings" :show="false">
        <div class="field">
          <label>Slug</label>
          <input type="text" />
        </div>
      </Collapsible>
    </Sidebar>
  </Editor>
</template>

<script>
import BlockStore from '@/store/page'
import Block from 'components/block'
import { EditorMixin } from 'components/mixins'

export default {
  mixins: [EditorMixin],

  components: { Block },

  data() {
    return {
      model: {
        data: {
          blocks: [],
        },
      },
    }
  },

  props: {
    modelId: {
      type: Number,
      required: true,
    },
  },

  computed: {
    modelBlocks() {
      return this.model.data.blocks
    },
  },

  created() {
    if (this.modelId > 0) {
      this.$api.models.get({ id: this.modelId }).then(data => {
        this.model = data
      })
    } else {
      window.location = '/puzzle/admin/'
    }

    if (this.id > 0) {
      this.$api.entries
        .get({ id: this.id })
        .then(data => {})
        .catch(() => {
          window.location = `/puzzle/admin/entries/${this.model}`
        })
    }
  },
}
</script>
