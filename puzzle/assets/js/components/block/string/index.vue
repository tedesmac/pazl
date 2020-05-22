<template>
  <div v-if="edit && !blockMode" style="padding: 0.5rem;">
    <input type="text" v-model="string" />
  </div>

  <div v-else>
    {{ string }}
  </div>
</template>

<script>
import { BlockMixin } from 'components/mixins'

export default {
  mixins: [BlockMixin],

  computed: {
    string: {
      get() {
        if (this.blockMode) {
          return 'My Awesome String'
        }
        return this.getData('string')
      },

      set(value) {
        this.setData('string', value)
      },
    },
  },
}
</script>
