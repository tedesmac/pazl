<template>
  <div>
    <label>{{ name }}:</label>
    <button @click="onSelectImage">Pick Image</button>
  </div>
</template>

<script>
import { SettingMixin } from '@/components/mixins'

export default {
  mixins: [SettingMixin],

  methods: {
    onSelectImage() {
      this.$modal.show('image-select', {
        callback: image => {
          this.value = image.url
        },
      })
    },
  },
}
</script>
