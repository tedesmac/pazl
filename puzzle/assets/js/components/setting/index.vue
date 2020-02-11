<template>
  <component :is="component" :root="root" :setting="setting" />
</template>

<script>
import colorSetting from './color'
import imageSetting from './image'
import numberSetting from './number'
import optionSetting from './option'
import stringSetting from './string'

export default {
  components: {
    colorSetting,
    imageSetting,
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
