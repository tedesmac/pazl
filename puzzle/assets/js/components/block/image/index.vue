<template>
  <img class="__puzzle_image" :alt="alt" :src="src" />
</template>

<script>
import { BlockMixin } from 'components/mixins'

export default {
  mixins: [BlockMixin],

  computed: {
    alt() {
      return this.getData('alt')
    },

    src() {
      return this.getData('src')
    },
  },
}
</script>
