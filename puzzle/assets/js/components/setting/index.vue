<template>
  <component :is="Component" />
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
    id: {
      type: String,
      required: true,
    },

    isStyle: {
      type: Boolean,
      default: false,
    },

    type: {
      type: String,
      required: true,
    },
  },

  computed: {
    component() {
      return `${this.type}Setting`
    },
  },
}
</script>
