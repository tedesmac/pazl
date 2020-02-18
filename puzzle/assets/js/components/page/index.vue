<template>
  <NotFound v-if="error" />

  <div v-else class="__puzzle_page">
    <Menu />

    <div v-if="isEntry">Entry</div>

    <Block
      v-for="(block, index) in blocks"
      :block="block.id"
      :key="block.id"
      :type="block.type"
    />
  </div>
</template>

<script>
import Block from '@/components/block'
import PageStore from '@/store/page'
import Menu from './menu'
import { mapState } from 'vuex'

const NotFound = () => import('@/components/404')

export default {
  components: { Block, Menu, NotFound },

  props: {
    isEntry: {
      type: Boolean,
      default: false,
    },
  },

  computed: mapState({
    blocks: state => state.page.blocks,

    error: state => state.page.error,
  }),

  beforeDestroy() {
    this.$store.unregisterModule('page')
  },

  created() {
    this.$store.registerModule('page', PageStore)
    if (this.isEntry) {
    } else {
      const path = window.location.pathname.substring(1)
      this.$store.dispatch('page/fetchPageByPath', path)
    }
  },
}
</script>
