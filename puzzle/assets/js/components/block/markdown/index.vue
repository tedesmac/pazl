<template>
  <div v-html="html" />
</template>

<script>
import { BlockMixin } from '@/components/mixins'
import MD from 'markdown-it'

const md = new MD()

export default {
  mixins: [BlockMixin],

  computed: {
    html() {
      return md.render(this.markdown)
    },

    markdown() {
      if (this.data.markdown) {
        return this.data.markdown
      }
      return ''
    },
  },
}
</script>
