<template>
  <div class="__404">
    <h1>404</h1>
    <h2>This page doesn't exist</h2>

    <div class="links">
      <a href="/">
        <FontAwesomeIcon :icon="faHome" />
        Go to Home
      </a>

      <a href="/puzzle/admin/" v-if="admin">
        <FontAwesomeIcon :icon="faTools" />
        Go to Admin
      </a>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHome, faTools } from '@fortawesome/free-solid-svg-icons'

export default {
  components: { FontAwesomeIcon },

  computed: {
    faHome: () => faHome,
    faTools: () => faTools,
  },

  props: {
    admin: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
