<template>
  <div>
    <div class="section is-horizontal space-between">
      <h2>Images</h2>

      <button class="is-cyan" @click="onNew">New</button>
    </div>

    <div class="section">
      <div class="image-list">
        <div
          v-for="(image, index) in images"
          class="image-container"
          :key="`image_${index}`"
        >
          <div
            class="image"
            :style="{ backgroundImage: `url(${image.url})` }"
          />
        </div>
      </div>
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
    onNew() {
      this.$router.push({ name: 'upload' })
    },
  },

  beforeMount() {
    this.$api.images
      .get()
      .then(data => {
        this.images = data
      })
      .catch(() => {})
  },
}
</script>
