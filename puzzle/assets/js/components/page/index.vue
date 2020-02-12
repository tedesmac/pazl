<template>
  <NotFound v-if="notFound" />

  <div v-else class="__puzzle_page">
    <Menu />

    <div v-if="isEntry">Entry</div>
    <div v-else>Page</div>
  </div>
</template>

<script>
import Block from '@/components/block'
import Menu from './menu'

const NotFound = () => import('@/components/404')

export default {
  components: { Block, Menu, NotFound },

  data() {
    return {
      notFound: false,
    }
  },

  props: {
    isEntry: {
      type: Boolean,
      default: false,
    },
  },

  created() {
    const path = window.location.pathname
    console.log(path)
  },
}
</script>
