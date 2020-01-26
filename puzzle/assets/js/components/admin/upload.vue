<template>
  <div>
    <div
      class="section"
      @dragover.prevent="onDragOver"
      @dragleave="onDragEnd"
      @drop.prevent.stop="onDrop"
    >
      <div v-if="mouseOver" class="upload-area-active">Drop files</div>
      <div v-else class="upload-area">
        Drag and drop documents on this area to upload them.
      </div>
    </div>

    <div v-for="(file, index) in files" class="section" :key="`file_${index}`">
      <Uploader :file="file"
    </div>
  </div>
</template>

<script>
const Uploader = () =>
  import(
    /* webpackChunkName: 'uploader' */
    'components/misc/uploader'
  )

export default {
  components: { Uploader },

  data() {
    return {
      files: [],
      mouseOver: false,
    }
  },

  methods: {
    addFile(file) {
      this.files = [...this.files, file]
    },

    onDragOver(event) {
      if (event.buttons === 1) {
        this.mouseOver = true
      }
    },

    onDragEnd() {
      this.mouseOver = false
    },

    onDrop(event) {
      this.mouseOver = false
      const { dataTransfer } = event

      if (dataTransfer.items) {
        for (let i = 0; i < dataTransfer.items.length; i++) {
          const file = dataTransfer.items[i].getAsFile()
          this.addFile(file)
        }
      } else {
        event.dataTransfer.files.forEach(file => {
          for (let i = 0; i < dataTransfer.files.length; i++) {
            const file = dataTransfer.files[i]
            this.addFile(file)
          }
        })
      }
    },
  },
}
</script>
