<template>
  <div class="error" v-if="show" @click="onClose">
    <FontAwesomeIcon class="icon" :icon="faTimes" />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

export default {
  components: { FontAwesomeIcon },

  props: {
    message: {
      type: String,
      required: true,
    },

    show: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    faTimes: () => faTimes,
  },

  methods: {
    onClose() {
      this.$emit('close')
    },
  },
}
</script>
