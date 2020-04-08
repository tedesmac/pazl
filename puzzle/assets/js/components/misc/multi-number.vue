<template>
  <div>
    <Number class="subsetter" :options="options" v-model="all">
      <div class="sides-all" />
    </Number>

    <hr />

    <Number class="subsetter" :options="options" v-model="top">
      <div class="up side" />
    </Number>

    <Number class="subsetter" :options="options" v-model="right">
      <div class="side" />
    </Number>

    <Number class="subsetter" :options="options" v-model="bottom">
      <div class="down side" />
    </Number>

    <Number class="subsetter" :options="options" v-model="left">
      <div class="left side" />
    </Number>
  </div>
</template>

<script>
import Collapsible from '@/components/editor/collapsible'
import Number from './number'

export default {
  components: { Number },

  data() {
    return {
      all: '0px',
    }
  },

  props: {
    options: {
      type: Array,
      default: () => [],
    },

    value: {
      type: Object,
      required: true,
    },
  },

  computed: {
    bottom: {
      get() {
        return this.value.bottom
      },

      set(bottom) {
        this.$emit('input', { ...this.value, bottom })
      },
    },

    left: {
      get() {
        return this.value.left
      },

      set(left) {
        this.$emit('input', { ...this.value, left })
      },
    },

    right: {
      get() {
        return this.value.right
      },

      set(right) {
        this.$emit('input', { ...this.value, right })
      },
    },

    top: {
      get() {
        return this.value.top
      },

      set(top) {
        this.$emit('input', { ...this.value, top })
      },
    },
  },

  watch: {
    all(value) {
      this.$emit('input', {
        bottom: value,
        left: value,
        right: value,
        top: value,
      })
    },
  },

  beforeMount() {
    const { down, left, right, up } = this.value
    if (down === left && left === right && right === up) {
      this.all = down
    }
  },
}
</script>
