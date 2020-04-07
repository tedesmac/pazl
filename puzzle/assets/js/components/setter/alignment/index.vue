<template>
  <div>
    <label>Alignment</label>
    <ButtonGroup v-model="horizontal" />
    <ButtonGroup vertical v-model="vertical" />
  </div>
</template>

<script>
import { SetterMixin } from '@/components/mixins'
import ButtonGroup from './button-group'

export default {
  mixins: [SetterMixin],

  components: { ButtonGroup },

  computed: {
    isHorizontal() {
      const { direction } = this.block.data
      if (direction == null) {
        return true
      }
      return direction === 'horizontal'
    },

    horizontal: {
      get() {
        if (this.isHorizontal) {
          const { justifyContent = 'center' } = this.style
          return justifyContent
        } else {
          const { alignItems = 'center' } = this.style
          return alignItems
        }
      },

      set(value) {
        if (this.isHorizontal) {
          this.style = { justifyContent: value }
        } else {
          this.style = { alignItems: value }
        }
      },
    },

    vertical: {
      get() {
        if (this.isHorizontal) {
          const { alignItems = 'center' } = this.style
          return alignItems
        } else {
          const { justifyContent = 'center' } = this.style
          return justifyContent
        }
      },

      set(value) {
        if (this.isHorizontal) {
          this.style = { alignItems: value }
        } else {
          this.style = { justifyContent: value }
        }
      },
    },
  },
}
</script>
