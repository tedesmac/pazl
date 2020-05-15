<template>
  <div class="sidebar" :style="style">
    <slot />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState({
    style: state => {
      const { mode } = state.editor
      if (mode === 'edit') {
        return {}
      }
      return {
        transform: 'translateX(100%)',
      }
    },
  }),
}
</script>
