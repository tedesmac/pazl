<template>
  <div class="is-horizontal">
    <label>
      {{ label }}
      <slot />
    </label>
    <input type="number" v-model="number" />
    <select v-if="options.length" v-model="unit">
      <option v-for="option in options" :key="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
const re = /(\d*\.?\d*)(\D*)/

export default {
  props: {
    label: {
      type: String,
      default: '',
    },

    options: {
      type: Array,
      default: () => [],
    },

    value: {
      type: String,
      required: true,
    },
  },

  computed: {
    number: {
      get() {
        const match = this.value.match(re)
        if (match) {
          return match[1]
        }
        return '0'
      },

      set(value) {
        this.$emit('input', `${value}${this.unit}`)
      },
    },

    unit: {
      get() {
        const match = this.value.match(re)
        if (match) {
          return match[2]
        }
        return ''
      },

      set(value) {
        this.$emit('input', `${this.number}${value}`)
      },
    },
  },
}
</script>
