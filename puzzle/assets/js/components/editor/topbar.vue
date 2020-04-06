<template>
  <div class="topbar">
    <div>
      <button @click="onGoBack">
        <FontAwesomeIcon :icon="faAngleLeft" />
      </button>
    </div>

    <div>
      <slot />
    </div>

    <div>
      <FontAwesomeIcon class="spinner" :icon="faSpinner" v-if="saving" />
      <button @click="onSave">
        <FontAwesomeIcon :icon="faSave" />
      </button>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faAngleLeft,
  faSave,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons'

export default {
  components: { FontAwesomeIcon },

  computed: {
    saving() {
      return this.$store.state.editor.saving
    },

    faAngleLeft: () => faAngleLeft,
    faSave: () => faSave,
    faSpinner: () => faSpinner,
  },

  props: {
    backUrl: {
      type: String,
      default: '/pazl/admin/',
    },
  },

  methods: {
    onGoBack() {
      window.location = this.backUrl
    },

    onSave() {
      this.$emit('save')
    },
  },
}
</script>
