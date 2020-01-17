<template>
  <div class="collapsible">
    <button class="handle" @click="collapse = !collapse">
      {{ string }}
      <FontAwesomeIcon class="icon" :icon="collapse ? faMinus : faAngleDown" />
    </button>

    <div v-if="collapse" class="container">
      <slot />
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faAngleDown, faMinus } from '@fortawesome/free-solid-svg-icons'

export default {
  components: { FontAwesomeIcon },

  data() {
    return {
      collapse: false,
    }
  },

  props: {
    show: {
      type: Boolean,
      default: true,
    },

    string: {
      type: String,
      default: '',
    },
  },

  computed: {
    faAngleDown: () => faAngleDown,
    faMinus: () => faMinus,
  },

  mounted() {
    this.collapse = this.show
  },
}
</script>
