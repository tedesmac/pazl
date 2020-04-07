<template>
  <component class="setting" :block="block" :is="component" />
</template>

<script>
const blockStyleSetter = () =>
  import(
    /* webpackChunkName: 'blockStyleSetter' */
    './blockStyle'
  )
const directionSetter = () =>
  import(
    /* webpackChunkName: 'directionSetter' */
    './direction'
  )
const fontStyleSetter = () =>
  import(
    /* webpackChunkName: 'fontStyleSetter' */
    './fontStyle'
  )

export default {
  components: {
    blockStyleSetter,
    directionSetter,
    fontStyleSetter,
  },

  props: {
    block: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },
  },

  computed: {
    component() {
      return `${this.type}Setter`
    },
  },
}
</script>
