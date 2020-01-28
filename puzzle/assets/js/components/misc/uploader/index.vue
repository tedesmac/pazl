<template>
  <div
    v-if="status === 'uploading'"
    class="uploader is-vertical justify-center"
  >
    <p>Uploading...</p>
    <div class="progress-bar">
      <div class="progress" :style="progressWidth" />
    </div>
  </div>

  <div v-else-if="status === 'invalid'" class="uploader">
    File not allowed for uploading
  </div>

  <div v-else-if="status === 'error'" class="uploader">
    Unable to upload file, please try again later
  </div>

  <div v-else class="uploader is-horizontal space-around">
    <div class="preview is-a-third" :style="style">
      <FontAwesomeIcon v-if="!isImage" class="icon" :icon="icon" />
    </div>

    <div class="form is-two-thirds">
      <div class="field">
        <label>Name</label>
        <input type="text" v-model="name" />
      </div>

      <div class="field">
        <label>Tags</label>
        <input type="text" />
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faFileAlt, faFileAudio } from '@fortawesome/free-regular-svg-icons'
import { isAudio, isFile, isImage } from 'utils'

export default {
  components: { FontAwesomeIcon },

  data() {
    return {
      image: '',
      name: '',
      progress: 0,
      status: 'uploading',
      tags: [],
      type: '',
    }
  },

  props: {
    file: {
      type: File,
      required: true,
    },
  },

  computed: {
    icon() {
      if (this.type === 'audio') {
        return faFileAudio
      }
      return faFileAlt
    },

    isImage() {
      return this.type === 'image'
    },

    progressWidth() {
      return {
        width: `${this.progress}%`,
      }
    },

    style() {
      let style = {}
      if (this.isImage) {
        style['background-image'] = `url(${this.image})`
      }
      return style
    },
  },

  methods: {
    onUploadProgress(event) {
      console.log(event)
      this.progress = (event.loaded / event.total) * 100
    },

    upload() {
      let formData = new FormData()
      formData.append('file', this.file)
      if (this.type === 'audio') {
        this.uploadAudio(formData)
      } else if (this.type === 'file') {
        this.uploadFile(formData)
      } else if (this.type === 'image') {
        this.uploadImage(formData)
      }
    },

    uploadAudio(data) {
      console.log('[Uploader.uploadAudio] => not implemented')
    },

    uploadFile(data) {
      this.$api.files
        .post(data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: this.onUploadProgress,
        })
        .then(data => {
          this.image = data.url
          this.name = data.name
          this.state = 'done'
        })
        .catch(() => {
          this.state = 'error'
        })
    },

    uploadImage(data) {
      this.$api.images
        .post(data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: this.onUploadProgress,
        })
        .then(data => {
          console.log(data)
          this.image = data.url
          this.name = data.name
          this.status = 'done'
        })
        .catch(() => {
          this.status = 'error'
        })
    },
  },

  beforeMount() {
    const { type } = this.file
    if (isAudio(type)) {
      this.type = 'audio'
    } else if (isFile(type)) {
      this.type = 'file'
    } else if (isImage(type)) {
      this.type = 'image'
    } else {
      this.status = 'invalid'
    }

    if (this.status !== 'invalid') {
      this.upload()
    }
  },
}
</script>
