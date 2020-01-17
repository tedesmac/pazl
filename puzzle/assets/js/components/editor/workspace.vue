<template>
  <div class="workspace" id="workspace">
    <div class="workspace-area" :style="style">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    edit: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    style() {
      return {
        padding: this.edit ? '0.5em' : '0',
      }
    },
  },
}
</script>
