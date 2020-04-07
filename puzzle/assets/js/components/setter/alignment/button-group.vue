<template>
  <div class="button-group">
    <a
      :class="{ active: value === 'flex-start' }"
      @click="$emit('input', 'flex-start')"
    >
      <img
        :class="{ left: !vertical, up: vertical }"
        src="/pazl/static/img/alignment.svg"
      />
    </a>

    <a
      :class="{ active: value === 'center' }"
      @click="$emit('input', 'center')"
    >
      <img
        :class="{ down: vertical }"
        src="/pazl/static/img/alignment-center.svg"
      />
    </a>

    <a
      :class="{ active: value === 'flex-end' }"
      @click="$emit('input', 'flex-end')"
    >
      <img :class="{ down: vertical }" src="/pazl/static/img/alignment.svg" />
    </a>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
  },

  computed: {
    vertical() {
      const { vertical: v } = this.$attrs
      if (v != null) {
        return true
      }
      return false
    },
  },
}
</script>
