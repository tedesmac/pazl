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
      get() {
        return this.getData('direction', 'horizontal')
      },

      set(value) {
        this.setData('direction', value)
      },
    },
  },
}
</script>
