<template>
  <div>
    <label>{{ name }}:</label>
    <input type="number" v-model="parsedValue" />
    <select v-if="units.length" v-model="selected">
      <option v-for="u in units" :key="`${name}_${u}`">{{ u }}</option>
    </select>
  </div>
</template>

<script>
import { SettingMixin } from '@/components/mixins'

const number_re = /\d+(\.\d+)?/

export default {
  mixins: [SettingMixin],

  data() {
    return {
      selected: '',
    }
  },

  computed: {
    parsedValue: {
      get() {
        if (typeof this.value === 'number') {
          return this.value
        }

        const match = this.value.match(number_re)
        if (match) {
          return Number(match[0])
        }
        return 0
      },

      set(value) {
        if (this.setting.parse) {
          this.value = this.setting.parse(value, selected)
        } else {
          this.value = `${value}${this.selected}`
        }
      },
    },

    units() {
      return this.setting.units
    },
  },
}
</script>
