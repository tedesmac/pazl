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

const carouselSetter = () =>
  import(
    /* webpackChunkName: 'carouselSetter' */
    './carousel'
  )

const directionSetter = () =>
  import(
    /* webpackChunkName: 'directionSetter' */
    './direction'
  )

const feedSetter = () =>
  import(
    /* webpackChunkName: 'feedSetter' */
    './feed'
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

const imageSetter = () =>
  import(
    /* webpackChunkName: 'imageSetter' */
    './image'
  )

export default {
  components: {
    alignmentSetter,
    blockStyleSetter,
    carouselSetter,
    directionSetter,
    feedSetter,
    fontSetter,
    fontStyleSetter,
    imageSetter,
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
