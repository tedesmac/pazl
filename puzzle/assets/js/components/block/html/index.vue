<template>
  <div v-html="data">
    html
  </div>
</template>

<script>
import { BlockMixin } from '@/components/mixins'

export default {
  mixins: [BlockMixin],
}
</script>
