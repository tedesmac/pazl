<template>
  <div>
    <Color class="subsetter" v-model="color" @clear="removeStyle('color')" />

    <div class="subsetter">
      <label>Font:</label>
      <select></select>
    </div>

    <Number class="subsetter" v-model="fontSize">
      Size:
    </Number>

    <div class="subsetter">
      <label>Weight:</label>
      <select></select>
    </div>
  </div>
</template>

<script>
import Color from '@/components/misc/color'
import Number from '@/components/misc/number'
import { SetterMixin } from '@/components/mixins'

export default {
  mixins: [SetterMixin],

  components: { Color, Number },

  computed: {
    color: {
      get() {
        return this.getStyle('color', '#000000')
      },

      set(value) {
        this.setStyle('color', value)
      },
    },

    fontSize: {
      get() {
        return this.getStyle('fontSize')
      },

      set(value) {
        this.setStyle('fontSize', value)
      },
    },
  },
}
</script>
