<template>
  <div class="mode-toggle">
    <FontAwesomeIcon class="icon" :icon="faEdit" @click="onChange(0)" />
    <FontAwesomeIcon class="icon" :icon="faMobileAlt" @click="onChange(1)" />
    <FontAwesomeIcon class="icon" :icon="faTabletAlt" @click="onChange(2)" />
    <FontAwesomeIcon class="icon" :icon="faDesktop" @click="onChange(3)" />
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

  methods: {
    onChange(index) {
      this.current = index

      switch (index) {
        case 0:
          this.$emit('mode', 'edit')
          break
        case 1:
          this.$emit('mode', 'mobile')
          break
        case 2:
          this.$emit('mode', 'tablet')
          break
        case 3:
          this.$emit('mode', 'desktop')
          break
      }
    },
  },
}
</script>
