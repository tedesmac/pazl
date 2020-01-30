<template>
  <div class="image-list">
    <div
      v-for="(image, index) in images"
      class="image-container"
      key="image.url"
    >
      <div
        class="image"
        :style="{ backgroundImage: `url(${image.url})` }"
        @click="onClick(image)"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [],
    }
  },

  methods: {
    onClick(image) {
      this.$emit('image', image)
    },
  },

  created() {
    this.$api.images.get().then(data => {
      this.images = data
    })
  },
}
</script>
