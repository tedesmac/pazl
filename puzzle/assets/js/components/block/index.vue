<template>
  <component class="__puzzle_block" :block="this.id" :is="component" />
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

  computed: {
    component() {
      return `${this.type}Block`
    },

    id() {
      return this.$attrs.block
    },
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

  created() {
    this.$store.commit('page/setBlock', {
      id: this.id,
      index: this.index,
      parent: this.parent,
    })
  },
}
</script>
