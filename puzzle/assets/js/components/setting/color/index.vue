<template>
  <div>
    <label>{{ name }}</label>
    <Compact v-model="parsedValue" />
  </div>
</template>

<script>
import { SettingMixin } from '@/components/mixins'
import { Compact } from 'vue-color'

export default {
  mixins: [SettingMixin],

  components: { Compact },

  computed: {
    parsedValue: {
      get() {
        return this.value
      },

      set(value) {
        this.value = value.hex
      },
    },
  },
}
</script>
