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

const fontSetter = () =>
  import(
    /* webpackChunkName: 'fontSetter' */
    './font'
  )

const fontStyleSetter = () =>
  import(
    /* webpackChunkName: 'fontStyleSetter' */
    './fontStyle'
  )

const sizeStyleSetter = () =>
  import(
    /* webpackChunkName: 'sizeStyleSetter' */
    './sizeStyle'
  )

export default {
  components: {
    alignmentSetter,
    blockStyleSetter,
    directionSetter,
    fontSetter,
    fontStyleSetter,
    sizeStyleSetter,
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
