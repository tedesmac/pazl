<template>
  <div>
    <label>{{ name }}</label>
    <input type="color" v-model="value" />
  </div>
</template>

<script>
import { SettingMixin } from '@/components/mixins'

export default {
  mixins: [SettingMixin],

  computed: {
    parsedValue: {
      get() {
        return this.value
      },

      set(value) {
        this.value = value
      },
    },
  },
}
</script>
