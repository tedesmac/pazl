<template>
  <div class="__puzzle_edit">
    <div class="__puzzle_edit_menu">
      <a>Edit</a>
      <a>Unpublish</a>
      <a>Remove</a>
    </div>
    <FontAwesomeIcon :icon="faPencilRuler" />
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPencilRuler } from '@fortawesome/free-solid-svg-icons'

export default {
  components: { FontAwesomeIcon },

  computed: {
    faPencilRuler: () => faPencilRuler,
  },
}
</script>
