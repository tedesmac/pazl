<template>
  <component
    class="__puzzle_block"
    :block="block"
    :is="component"
    :isEntry="isEntry"
    :style="style"
  />
</template>

<script>
import { mapState } from 'vuex'

const carouselBlock = () =>
  import(
    /* webpackChunkName: 'carouselBlock' */
    '@/components/block/carousel'
  )
const collectionBlock = () =>
  import(
    /* webpackChunkName: 'collectionBlock' */
    '@/components/block/collection'
  )
const containerBlock = () =>
  import(
    /* webpackChunkName: 'containerBlock' */
    '@/components/block/container'
  )
const feedBlock = () =>
  import(
    /* webpackChunkName: 'feedBlock' */
    '@/components/block/feed'
  )
const htmlBlock = () =>
  import(
    /* webpackChunkName: 'htmlBlock' */
    '@/components/block/html'
  )
const imageBlock = () =>
  import(
    /* webpackChunkName: 'imageBlock' */
    '@/components/block/image'
  )
const markdownBlock = () =>
  import(
    /* webpackChunkName: 'markdownBlock' */
    '@/components/block/markdown'
  )
const spacerBlock = () =>
  import(
    /* webpackChunkName: 'spacerBlock' */
    '@/components/block/spacer'
  )
const stringBlock = () =>
  import(
    /* webpackChunkName: 'stringBlock' */
    '@/components/block/string'
  )
const tableBlock = () =>
  import(
    /* webpackChunkName: 'tableBlock' */
    '@/components/block/table'
  )

export default {
  components: {
    carouselBlock,
    collectionBlock,
    containerBlock,
    feedBlock,
    htmlBlock,
    imageBlock,
    markdownBlock,
    spacerBlock,
    stringBlock,
    tableBlock,
  },

  props: {
    index: {
      type: Number,
      required: true,
    },

    parent: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },
  },

  computed: {
    component() {
      return `${this.type}Block`
    },

    block() {
      const { blocks } = this.$store.state.page
      let index = 0
      if (this.isEntry) {
        index = blocks.findIndex(b => b.name === this.id)
      } else {
        index = blocks.findIndex(b => b.id === this.id)
      }
      return blocks[index]
    },

    id() {
      return this.$attrs.block
    },

    style() {
      return this.block.style
    },

    ...mapState({
      isEntry: state => state.page.isEntry,
    }),
  },

  created() {
    if (this.edit && !this.isEntry) {
      this.$store.commit('page/setBlock', {
        id: this.id,
        index: this.index,
        parent: this.parent,
      })
    }
  },
}
</script>
