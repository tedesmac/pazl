<template>
  <div>
    <img class="__puzzle_image" :alt="alt" :src="src" />
    <FontAwesomeIcon v-if="edit" class="edit-icon" :icon="faImage" />
  </div>
</template>

<script>
import { BlockMixin } from '@/components/mixins'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  mixins: [BlockMixin],

  components: { FontAwesomeIcon },

  computed: {
    alt() {
      return this.getData('alt')
    },

    src() {
      if (this.blockMode) {
        return `${this.$routes.static}img/pazl-logo.svg/`
      }
      return this.getData('src')
    },

    faImage: () => faImage,
  },
}
</script>
