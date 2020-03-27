<template>
  <nav class="__puzzle_menu">
    <div>Home</div>

    <div>
      <a v-for="page in pages" :href="page.path" :key="page.path">
        {{ page.name }}
      </a>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    pages() {
      const { children } = this.menu
      if (children) {
        return children
      }
      return []
    },

    ...mapGetters(['menu']),
  },
}
</script>
