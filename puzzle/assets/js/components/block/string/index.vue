<template>
  <div>
    <input v-if="edit" type="text" v-model="string" />

    <p v-else>{{ string }}</p>
  </div>
</template>

<script>
import { BlockMixin } from 'components/mixins'

export default {
  mixins: [BlockMixin],

  computed: {
    string: {
      get() {
        return this.getData('string')
      },

      set(value) {
        this.setData('string', value)
      },
    },
  },
}
</script>
