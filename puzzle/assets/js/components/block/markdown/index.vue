<template>
  <div v-if="edit">
    <MarkdownEditor :id="id" v-model="data" />
  </div>

  <div v-else></div>
</template>

<script>
import { BlockMixin } from 'components/mixins'

const MarkdownEditor = () =>
  import(
    /* webpackChunkName: 'markdownEditor' */
    './markdown-editor'
  )

export default {
  mixins: [BlockMixin],

  components: { MarkdownEditor },
}
</script>
