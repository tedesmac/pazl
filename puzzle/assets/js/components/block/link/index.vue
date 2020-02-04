<template>
  <div>
    link
  </div>
</template>

<script>
import { BlockMixin } from '@/compnents/mixins'

export default {
  mixins: [BlockMixin],

  computed: {
    text() {
      return this.data.text
    },

    url() {
      return this.data.url
    },
  },
}
</script>
