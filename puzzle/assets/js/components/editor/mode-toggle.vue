<template>
  <div class="mode-toggle">
    <FontAwesomeIcon class="icon" :icon="faEdit" @click="onChange(0, 'edit')" />
    <FontAwesomeIcon
      class="icon"
      :icon="faMobileAlt"
      @click="onChange(1, 'mobile')"
    />
    <FontAwesomeIcon
      class="icon"
      :icon="faDesktop"
      @click="onChange(2, 'desktop')"
    />
    <div class="slider" :style="slider" />
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faDesktop,
  faEdit,
  faMobileAlt,
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
  },

  methods: {
    onChange(index, mode) {
      this.current = index
      this.$store.commit('editor/setMode', mode)
    },
  },
}
</script>
