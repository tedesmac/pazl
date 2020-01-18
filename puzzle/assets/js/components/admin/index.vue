<template>
  <div class="admin">
    <Sidebar />
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import Sidebar from './sidebar'

export default {
  components: { Sidebar },

  methods: {
    fetchModels() {
      this.$store.dispatch('fetchModels')
    },

    fetchSite() {
      this.$store.dispatch('fetchSite')
    },
  },

  mounted() {
    this.fetchModels()
    this.fetchSite()
  },
}
</script>
