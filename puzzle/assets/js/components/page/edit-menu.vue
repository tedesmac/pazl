<template>
  <div class="__pazl_edit">
    <div v-if="show" class="__pazl_edit_menu">
      <a :href="$routes.admin">Admin</a>
      <a :href="edit">Edit</a>
      <a :href="``">Unpublish</a>
      <a :href="``">Remove</a>
    </div>

    <FontAwesomeIcon :icon="faPencilRuler" @click="show = !show" />
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPencilRuler } from '@fortawesome/free-solid-svg-icons'
import { mapState } from 'vuex'

export default {
  components: { FontAwesomeIcon },

  data() {
    return {
      show: false,
    }
  },

  computed: {
    edit() {
      if (this.isEntry) {
        return `${this.$routes.editor}entyr?id=${this.id}&model=${this.modelId}`
      }
      return `${this.$routes.editor}page?id=${this.id}`
    },

    faPencilRuler: () => faPencilRuler,

    ...mapState({
      id: state => state.page.id,
      isEntry: state => state.page.isEntry,
      modelId: state => state.page.modelId,
    }),
  },
}
</script>
