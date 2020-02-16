<template>
  <div class="field">
    <label>Image</label>
    <div class="image-preview" :style="style" @click="onClick">
      <FontAwesomeIcon class="edit-icon" :icon="faEdit" />
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

export default {
  components: { FontAwesomeIcon },

  props: {
    value: {
      type: String,
      required: true,
    },
  },

  computed: {
    style() {
      return {
        backgroundImage: `url("${this.value}")`,
      }
    },

    faEdit: () => faEdit,
  },

  methods: {
    onClick() {
      this.$modal.show('image-select', {
        callback: image => {
          this.$emit('input', image.url)
        },
      })
    },
  },
}
</script>
