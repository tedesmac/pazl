<template>
  <component class="setting" :id="block" :is="component" />
</template>

<script>
const alignmentSetter = () =>
  import(
    /* webpackChunkName: 'alignmentSetter' */
    './alignment'
  )

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
    alignmentSetter,
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
