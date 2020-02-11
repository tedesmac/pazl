<template>
  <div>{{ content }}</div>
</template>

<script>
import { BlockMixin } from 'components/mixins'

export default {
  mixins: [BlockMixin],

  computed: {
    content() {
      return this.data.content
    },
  },
}
</script>
