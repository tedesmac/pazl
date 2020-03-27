<template>
  <NotFound v-if="error" />

  <div v-else class="__puzzle_page">
    <Menu />

    <div v-if="entryId && modelBlock">Model Block</div>

    <Block
      v-else-if="entryId"
      v-for="(block, index) in blocks"
      parent="root"
      :block="block.name"
      :index="index"
      :isEntry="true"
      :key="block.name"
      :type="block.type"
    />

    <Block
      v-else
      v-for="block in blocks"
      parent="root"
      :block="block.id"
      :index="index"
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
    entryId: {
      type: Number,
      default: 0,
    },
  },

  computed: mapState({
    blocks: state => state.page.blocks,

    error: state => state.page.error,

    modelBlock: state => state.page.modelBlock,
  }),

  beforeDestroy() {
    this.$store.unregisterModule('page')
  },

  created() {
    this.$store.registerModule('page', PageStore)
    if (this.entryId) {
      this.$store
        .dispatch('page/fetchEntry', this.entryId)
        .then(this.fetchModel)
    } else {
      const path = window.location.pathname.substring(1)
      this.$store.dispatch('page/fetchPageByPath', path)
    }
  },
}
</script>
