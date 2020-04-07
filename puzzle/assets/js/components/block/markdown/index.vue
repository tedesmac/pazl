<template>
  <div>
    <MDE v-if="edit" v-model="markdown" />

    <div v-else v-html="html" />
  </div>
</template>

<script>
import { BlockMixin } from '@/components/mixins'
import MD from 'markdown-it'

const MDE = () =>
  import(
    /* webpackChunkName: 'markdonw-editor' */
    './markdown-editor'
  )

const md = new MD()

export default {
  mixins: [BlockMixin],

  components: { MDE },

  computed: {
    html() {
      return md.render(this.markdown)
    },

    markdown: {
      get() {
        if (this.data.markdown) {
          return this.data.markdown
        }
        return ''
      },

      set(value) {
        this.data = {
          ...this.data,
          markdown: value,
        }
      },
    },
  },
}
</script>
