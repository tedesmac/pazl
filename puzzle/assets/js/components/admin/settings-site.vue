<template>
  <div>
    <div class="section is-horizontal">
      <div class="form is-a-third is-vertical subsection">
        <div class="logo-big" :style="logoStyle" />

        <div class="field">
          <div class="justify-center">
            <button class="is-cyan" @click="onPickLogo">Pick</button>
            <input
              ref="file"
              style="display: none"
              type="file"
              @change="onLogoSelected"
            />
          </div>
        </div>
      </div>

      <div class="form is-two-thirds is-vertical subsection">
        <div class="field">
          <label>Name</label>
          <input type="text" v-model="name" />
        </div>

        <div class="field">
          <label>Description</label>
          <textarea v-model="description"></textarea>
        </div>

        <div class="field">
          <div class="justify-right">
            <button class="is-cyan" @click="onSave">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { isLogo } from '@/utils'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      description: '',
      logo: '',
      name: '',
    }
  },

  computed: {
    logoStyle() {
      return {
        backgroundImage: `url("${this.logo}")`,
      }
    },

    ...mapGetters(['siteDescription', 'siteLogo', 'siteName']),
  },

  methods: {
    onLogoSelected() {
      const file = this.$refs.file.files[0]
      if (file) {
        const { type } = file
        if (isLogo(type)) {
          this.upload(file)
        }
      }
    },

    onPickLogo() {
      this.$refs.file.click()
    },

    onSave() {
      this.$api.site
        .put({
          description: this.description,
          name: this.name,
        })
        .then(site => {
          this.$store.commit('setSite', site)
        })
        .catch(error => {
          console.error('[Site Settings] =>', error)
        })
    },

    upload(file) {
      const data = new FormData()
      data.append('file', file)
      this.$api.site.logo
        .post(data, {
          'Content-Type': 'multipart/form-data',
        })
        .then(data => {
          this.$store.commit('setSiteLogo', data.logo)
        })
        .catch(error => {
          console.error('[siteSettings.upload] =>', error)
        })
    },
  },

  watch: {
    siteDescription(value) {
      this.description = value
    },

    siteLogo(value) {
      this.logo = value
    },

    siteName(value) {
      this.name = value
    },
  },

  mounted() {
    this.description = this.siteDescription
    this.logo = this.siteLogo
    this.name = this.siteName
  },
}
</script>
