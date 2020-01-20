<template>
  <div>
    {{ type }}
  </div>
</template>

<script>
const ContainerBlock = import(
  /* webpackChunkName: 'containerBlock' */
  'components/block/container'
)
const HtmlBlock = import(
  /* webpackChunkName: 'htmlBlock' */
  'components/block/html'
)
const ImageBlock = import(
  /* webpackChunkName: 'imageBlock' */
  'components/block/image'
)
const LinkBlock = import(
  /* webpackChunkName: 'linkBlock' */
  'components/block/link'
)
const MarkdownBlock = import(
  /* webpackChunkName: 'markdownBlock' */
  'components/block/markdown'
)
const StringBlock = import(
  /* webpackChunkName: 'stringBlock' */
  'components/block/string'
)

export default {
  components: { HtmlBlock, ImageBlock, LinkBlock, MarkdownBlock, StringBlock },

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
      id: this.$attrs.block,
      index: this.index,
      parent: this.parent,
    })
  },
}
</script>
