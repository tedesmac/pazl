<template>
  <div>
    {{ name }}:

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
    name() {
      return this.setting._name
    },

    options() {
      return this.setting.options
    },

    value: {
      get() {
        return this.setting.value
      },

      set(value) {
        this.$store.commit('page/setBlockSetting', {
          id: this.blockId,
          name: this.name,
          root: this.root,
          value,
        })
      },
    },
  },
}
</script>
