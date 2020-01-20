<template>
  <component
    :class="{ block: edit }"
    :block="this.id"
    :is="selectedComponent"
  />
</template>

<script>
import { mapState } from 'vuex'

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
const linkBlock = () =>
  import(
    /* webpackChunkName: 'linkBlock' */
    'components/block/link'
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
    linkBlock,
    markdownBlock,
    stringBlock,
  },

  data() {
    return { selectedComponent: `${this.type}Block` }
  },

  computed: {
    id() {
      return this.$attrs.block
    },

    ...mapState({
      edit: state => state.page.edit,
    }),
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
