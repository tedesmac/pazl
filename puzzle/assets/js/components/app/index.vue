<template>
  <router-view />
</template>

<script>
export default {
  methods: {
    fetchPages() {
      this.$store.dispatch('fetchPages')
    },

    fetchSite() {
      this.$store.dispatch('fetchSite')
    },

    fetchUser() {
      this.$store.dispatch('fetchUser')
    },
  },

  created() {
    this.fetchPages()
    this.fetchSite()
    this.fetchUser()
  },
}
</script>
