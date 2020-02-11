<template>
  <component :is="component" :root="root" :setting="setting" />
</template>

<script>
import colorSetting from './color'
import numberSetting from './number'
import optionSetting from './option'
import stringSetting from './string'

export default {
  components: {
    colorSetting,
    numberSetting,
    optionSetting,
    stringSetting,
  },

  props: {
    root: {
      type: String,
      required: true,
    },

    setting: {
      type: Object,
      required: true,
    },
  },

  computed: {
    component() {
      return `${this.setting.settingType}Setting`
    },
  },
}
</script>
