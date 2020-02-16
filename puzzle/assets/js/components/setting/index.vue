<template>
  <component class="setting" :is="component" :root="root" :setting="setting" />
</template>

<script>
import codeSetting from './code'
import colorSetting from './color'
import imageSetting from './image'
import markdownSetting from './markdown'
import multinumberSetting from './multinumber'
import numberSetting from './number'
import optionSetting from './option'
import stringSetting from './string'
import tableSetting from './table'

export default {
  components: {
    codeSetting,
    colorSetting,
    imageSetting,
    markdownSetting,
    multinumberSetting,
    numberSetting,
    optionSetting,
    stringSetting,
    tableSetting,
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
