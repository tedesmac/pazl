<template>
  <div class="__puzzle_edit">
    <div v-if="show" class="__puzzle_edit_menu">
      <a>Edit</a>
      <a>Unpublish</a>
      <a>Remove</a>
    </div>

    <FontAwesomeIcon :icon="faPencilRuler" @click="show = !show" />
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPencilRuler } from '@fortawesome/free-solid-svg-icons'

export default {
  components: { FontAwesomeIcon },

  data() {
    return {
      show: false,
    }
  },

  computed: {
    faPencilRuler: () => faPencilRuler,
  },
}
</script>
