<template>
  <div class="admin">
    <Sidebar />
    <div class="content">
      <router-view />
    </div>

    <notifications
      group="errors"
      position="top right"
      classes="vue-notification error"
    />
  </div>
</template>

<script>
import AdminStore from '@/store/admin'
import Sidebar from './sidebar'

export default {
  components: { Sidebar },

  methods: {
    fetchModels() {
      this.$store.dispatch('admin/fetchModels')
    },

    fetchSite() {
      this.$store.dispatch('admin/fetchSite')
    },
  },

  beforeDestroy() {
    this.$store.unregisterModule('admin')
  },

  created() {
    this.$store.registerModule('admin', AdminStore)
  },

  beforeMount() {
    this.fetchModels()
    this.fetchSite()
  },
}
</script>
