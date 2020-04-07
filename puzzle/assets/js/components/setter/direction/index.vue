<template>
  <div>
    <label>Direction:</label>
    <select v-model="direction">
      <option value="horizontal">Horizontal</option>
      <option value="vertical">Vertical</option>
    </select>
  </div>
</template>

<script>
import { SetterMixin } from '@/components/mixins'

export default {
  mixins: [SetterMixin],

  computed: {
    direction: {
      get() {},

      set(direction) {
        this.block = {
          ...this.block,
          data: {
            ...this.block.data,
            direction,
          },
        }
      },
    },
  },
}
</script>
