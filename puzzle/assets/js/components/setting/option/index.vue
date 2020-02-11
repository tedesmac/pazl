<template>
  <div>
    <label> {{ name }}: </label>

    <select v-model="value">
      <option v-for="option in options" :key="option">{{ option }}</option>
    </select>
  </div>
</template>

<script>
import { SettingMixin } from '@/components/mixins'

export default {
  mixins: [SettingMixin],

  computed: {
    options() {
      return this.setting.options
    },
  },
}
</script>
