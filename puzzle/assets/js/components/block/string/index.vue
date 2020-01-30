<template>
  <div v-if="edit">
    <input type="text" v-model="data" />
  </div>

  <p v-else>{{ data }}</p>
</template>

<script>
import { BlockMixin } from 'components/mixins'

export default {
  mixins: [BlockMixin],
}
</script>
