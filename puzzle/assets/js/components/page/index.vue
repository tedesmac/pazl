<template>
  <NotFound v-if="error" />

  <div v-else class="__puzzle_page">
    <EditMenu v-if="user != null" />

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
      v-for="(block, index) in blocks"
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
import { mapGetters, mapState } from 'vuex'
import EditMenu from './edit-menu'
import Menu from './menu'

const NotFound = () => import('@/components/404')

export default {
  components: { Block, EditMenu, Menu, NotFound },

  props: {
    entryId: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    blocks() {
      return this.$store.getters['page/getChildren']('root')
    },

    path() {
      return this.$route.fullPath
    },

    ...mapState({
      error: state => state.page.error,

      isEntry: state => state.page.isEntry,

      modelBlock: state => state.page.modelBlock,

      user: state => state.user,
    }),
  },

  methods: {
    fetchEntry() {
      this.$store
        .dispatch('page/fetchEntry', this.entryId)
        .then(this.fetchModel)
    },

    fetchPage() {
      const path = this.$route.fullPath
      this.$store.dispatch('page/fetchPageByPath', path)
    },
  },

  watch: {
    path(value) {
      if (this.isEntry) {
        this.fetchEntry()
      } else {
        this.fetchPage()
      }
    },
  },

  beforeDestroy() {
    this.$store.unregisterModule('page')
  },

  created() {
    const page = this.$store.state.page
    this.$store.registerModule('page', PageStore)
    if (page) {
      this.$store.commit('page/setState', page)
    } else {
      if (this.entryId) {
        this.fetchEntry()
      } else {
        this.fetchPage()
      }
    }
  },
}
</script>
