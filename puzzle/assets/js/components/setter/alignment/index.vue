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
      const direction = this.getData('direction', 'horizontal')
      return direction === 'horizontal'
    },

    horizontal: {
      get() {
        if (this.isHorizontal) {
          return this.getStyle('justifyContent', 'center')
        } else {
          return this.getStyle('alignItems', 'center')
        }
      },

      set(value) {
        if (this.isHorizontal) {
          this.setStyle('justifyContent', value)
        } else {
          this.setStyle('alignItems', value)
        }
      },
    },

    vertical: {
      get() {
        if (this.isHorizontal) {
          return this.getStyle('alignItems', 'center')
        } else {
          return this.getStyle('justifyContent', 'center')
        }
      },

      set(value) {
        if (this.isHorizontal) {
          this.setStyle('alignItems', value)
        } else {
          this.setStyle('justifyContent', value)
        }
      },
    },
  },

  watch: {
    isHorizontal(value, oldValue) {
      if (value !== oldValue) {
        const tmp = this.horizontal
        this.horizontal = this.vertical
        this.vertical = tmp
      }
    },
  },
}
</script>
