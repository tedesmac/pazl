<template>
  <div class="is-horizontal">
    <label>
      <slot>
        Color:
      </slot>
    </label>
    <input type="color" v-model="handler" />
    <button class="small-button" @click="$emit('clear')">X</button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: '#000000',
    },
  },

  computed: {
    handler: {
      get() {
        return this.value
      },

      set(value) {
        this.$emit('input', value)
      },
    },
  },
}
</script>
