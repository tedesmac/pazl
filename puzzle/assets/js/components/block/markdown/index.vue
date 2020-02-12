<template>
  <div v-html="html" />
</template>

<script>
import { BlockMixin } from '@/components/mixins'
import MD from 'markdown-it'

export default {
  mixins: [BlockMixin],

  computed: {
    html() {
      return MD.render(this.data.content)
    },
  },
}
</script>
