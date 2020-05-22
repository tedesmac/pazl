<template>
  <div v-if="edit && !blockMode" style="padding: 0.5rem;">
    <MDE v-model="markdown" />
  </div>

  <div v-else v-html="html" />
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
        if (this.blockMode) {
          return `# Header 1

## Header 2

Normal Text. Lorem markdownum lugebere modo.

### Header 3`
        }
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
