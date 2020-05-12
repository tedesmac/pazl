<template>
  <div>
    <div>
      <label>Image</label>
      <button @click="onSelectImage">Pick Image</button>
    </div>

    <div>
      <label>Alt</label>
      <input type="text" v-model="alt" />
    </div>
  </div>
</template>

<script>
import { SetterMixin } from '@/components/mixins'

export default {
  mixins: [SetterMixin],

  computed: {
    alt: {
      get() {
        this.getData('alt')
      },

      set(value) {
        this.setData('alt', value)
      },
    },

    src: {
      get() {
        this.getData('src')
      },

      set(value) {
        this.setData('src', value)
      },
    },
  },

  methods: {
    onSelectImage() {
      this.$modal.show('image-select', {
        callback: image => {
          const { url } = image
          this.src = url
        },
      })
    },
  },
}
</script>
