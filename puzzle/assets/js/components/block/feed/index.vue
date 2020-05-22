<template>
  <div>
    <Block
      v-for="(entry, index) in entries"
      :block="entry.id"
      :data="entry"
      :key="`feed_block_${entry.id}_${index}`"
      :type="entry.type"
    />
  </div>
</template>

<script>
import { BlockMixin } from '@/components/mixins'
import { blocksToTree, mergeEntryToBlock } from '@/utils'

const Block = () => import('@/components/block')

export default {
  mixins: [BlockMixin],

  components: { Block },

  data() {
    return {
      entryBlock: null,
      fetchedEntries: [],
      page: 1,
    }
  },

  computed: {
    blockId() {
      return this.getData('blockId', 0)
    },

    entries() {
      if (this.entryBlock) {
        return this.fetchedEntries
          .map(entry => {
            const blocks = mergeEntryToBlock(entry, this.entryBlock)
            return blocksToTree(blocks)
          })
          .reduce((acc, a) => [...acc, ...a], [])
      }
      return []
    },

    mode() {
      return this.getData('mode', 'timeline')
    },

    modelId() {
      return this.getData('modelId', 0)
    },

    show() {
      return this.getData('show', 20)
    },
  },

  methods: {
    fetchBlock() {
      if (this.blockId) {
        this.$api.blocks
          .get({ id: this.blockId })
          .then(block => {
            this.entryBlock = block
          })
          .catch(error => {
            console.error('[feedBlock.fetchBlock] =>', error)
          })
      }
    },

    fetchEntries() {
      if (this.modelId) {
        this.$api.entries
          .get({
            include_data: 1,
            model: this.modelId,
            page: this.page,
            per_page: this.show,
            published: 1,
          })
          .then(entries => {
            this.fetchedEntries = entries
          })
          .catch(error => {
            console.error('[feedBlock.fetchItems] =>', error)
          })
      }
    },
  },

  watch: {
    blockId() {
      this.fetchBlock()
    },

    modelId() {
      this.fetchEntries()
    },
  },

  created() {
    this.fetchBlock()
    this.fetchEntries()
  },
}
</script>
