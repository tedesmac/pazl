<template>
  <div class="workspace" id="workspace" :style="style">
    <div class="workspace-area">
      <slot />
    </div>
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
        maxWidth: '100%',
        padding: '2.5rem 0 0',
        width: '100vw',
      }
    },
  }),
}
</script>
