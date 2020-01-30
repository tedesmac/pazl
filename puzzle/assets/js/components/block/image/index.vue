<template>
  <div>
    <img class="__puzzle_image" :src="src" />
    <FontAwesomeIcon
      v-if="edit"
      class="edit-icon"
      :icon="faEdit"
      @click="onEdit"
    />
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEdit } from '@fortawesome/free-regular-svg-icons'
import { BlockMixin } from 'components/mixins'

export default {
  mixins: [BlockMixin],

  components: { FontAwesomeIcon },

  computed: {
    src() {
      if (this.data && this.data.src) {
        return this.data.src
      }
      return ''
    },

    faEdit: () => faEdit,
  },

  methods: {
    onEdit() {
      this.$modal.show('image-select', {
        callback: this.onImageSelected,
      })
    },

    onImageSelected(image) {
      this.data = { src: image.url }
    },
  },
}
</script>
