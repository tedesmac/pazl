<template>
  <div class="mode-toggle">
    <FontAwesomeIcon class="icon" :icon="faEdit" @click="current = 0" />
    <FontAwesomeIcon class="icon" :icon="faMobileAlt" @click="current = 1" />
    <FontAwesomeIcon class="icon" :icon="faTabletAlt" @click="current = 2" />
    <FontAwesomeIcon class="icon" :icon="faDesktop" @click="current = 3" />
    <div class="slider" :style="slider" />
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faDesktop,
  faEdit,
  faMobileAlt,
  faTabletAlt,
} from '@fortawesome/free-solid-svg-icons'

export default {
  components: { FontAwesomeIcon },

  data() {
    return {
      current: 0,
    }
  },

  computed: {
    slider() {
      return {
        transform: `translateX(${this.current * 2.05}em)`,
      }
    },

    faDesktop: () => faDesktop,
    faEdit: () => faEdit,
    faMobileAlt: () => faMobileAlt,
    faTabletAlt: () => faTabletAlt,
  },
}
</script>
