<template>
  <nav class="__puzzle_menu">
    <a class="__puzzle_logo" href="/" :style="logoStyle" />

    <div>
      <a v-for="page in pages" :href="page.path" :key="page.path">
        {{ page.name }}
      </a>
    </div>
  </nav>
</template>

<script>
import { LogoMixin } from '@/components/mixins'
import { mapGetters } from 'vuex'

export default {
  mixins: [LogoMixin],

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
