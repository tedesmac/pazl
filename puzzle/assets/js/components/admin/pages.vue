<template>
  <div>
    <div class="section is-horizontal space-around">
      <h2>Pages</h2>

      <button class="is-cyan" @click="onNew">New</button>
    </div>

    <div class="section is-horizontal space-around">
      <button @click="onOpenSelectPage">Select Home Page</button>

      <p v-if="homePage !== null">{{ homePage }}</p>
      <p v-else>No Page Selected</p>
    </div>

    <div class="section is-vertical">
      <Draggable />
    </div>

    <div class="section"></div>

    <modal name="modal">
      <div class="vertical" :style="{ padding: '1em' }">
        <Entry
          v-for="(page, index) in pages"
          :buttons="false"
          :index="index"
          :key="`select_page_${page.id}`"
          :name="page.name"
          :selectable="true"
          @selected="onPageSelected(page.id)"
        />
      </div>
    </modal>
  </div>
</template>

<script>
import { AdminListingMixin } from 'components/mixins'
import Draggable from 'vuedraggable'
import { mapState } from 'vuex'

export default {
  mixins: [AdminListingMixin],

  components: { Draggable },

  data() {
    return {
      pages: [],
    }
  },

  computed: {
    homePage() {
      const state = this.$store.state
      const id = state.site.home_page
      if (id) {
        return this.pages.reduce((acc, page) => {
          if (id === page.id) {
            return page.name
          }
          return acc
        }, null)
      }
      return null
    },

    ...mapState({
      site: state => state.site,
    }),
  },

  methods: {
    onNew() {
      window.location = '/puzzle/editor/page/'
    },

    onOpenSelectPage() {
      this.$modal.show('modal')
    },

    onPageSelected(id) {
      this.$modal.hide('modal')
      this.$api.site
        .put({ ...this.site, home_page: id })
        .then(response => {
          const site = response.data
          this.$store.commit('setSite', site)
        })
        .catch(error => {
          // alert(error)
        })
    },
  },

  mounted() {
    this.$api.pages.get().then(pages => {
      this.pages = pages
    })
  },
}
</script>
