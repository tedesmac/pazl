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
const containerBlock = () =>
  import(
    /* webpackChunkName: 'containerBlock' */
    'components/block/container'
  )
const htmlBlock = () =>
  import(
    /* webpackChunkName: 'htmlBlock' */
    'components/block/html'
  )
const imageBlock = () =>
  import(
    /* webpackChunkName: 'imageBlock' */
    'components/block/image'
  )
const markdownBlock = () =>
  import(
    /* webpackChunkName: 'markdownBlock' */
    'components/block/markdown'
  )
const stringBlock = () =>
  import(
    /* webpackChunkName: 'stringBlock' */
    'components/block/string'
  )

export default {
  components: {
    containerBlock,
    htmlBlock,
    imageBlock,
    markdownBlock,
    stringBlock,
  },

  props: {
    index: {
      type: Number,
      required: true,
    },

    isEntry: {
      type: Boolean,
      default: false,
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

    edit() {
      return this.$store.editor ? this.$store.editor.edit : false
    },

    id() {
      return this.$attrs.block
    },

    style() {
      return this.block.style
    },
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
