<template>
  <div>
    <div class="section is-horizontal space-between">
      <h2>Pages</h2>

      <button class="is-cyan" @click="onNew">New</button>
    </div>

    <div class="section is-horizontal space-between">
      <button @click="onOpenSelectPage">Select Home Page</button>

      <p v-if="homePage !== null">{{ homePage }}</p>
      <p v-else>No Page Selected</p>
    </div>

    <div class="section is-vertical">
      <Entry
        v-for="(page, index) in pages"
        :index="index"
        :key="`tree_page_${page.id}`"
        :name="page.name"
        :published="page.published"
        @edit="onEdit(page.id)"
        @delete="onDeletePage(page.id)"
      >
        <template #actions>
          <button @click="onSetParent(page.id)">
            Set Parent
          </button>
          <button
            class="is-yellow"
            @click="onPublish(page.id, !page.published)"
          >
            {{ page.published ? 'Unpublish' : 'Publish' }}
          </button>
        </template>
      </Entry>
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
        >
          <template #buttons>
            <button @click.stop="console.log('expandTree')">-X</button>
          </template>
        </Entry>
      </div>
    </modal>
  </div>
</template>

<script>
import { AdminListingMixin } from '@/components/mixins'
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
      const id = this.site.home_page
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
      site: state => state.admin.site,
    }),
  },

  methods: {
    fetchPages() {
      this.$api.pages.get().then(pages => {
        this.pages = pages
      })
    },

    onDeletePage(id) {
      this.$api.pages
        .delete({ id })
        .then(this.fetchPages)
        .catch(error => {
          console.error(error)
          this.$notify({
            group: 'errors',
            text: 'Unable to delete page, please try again later',
          })
        })
    },

    onEdit(id) {
      window.location = `/pazl/editor/page?id=${id}`
    },

    onNew() {
      window.location = '/pazl/editor/page/'
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
          this.$store.commit('admin/setSite', site)
        })
        .catch(error => {
          // alert(error)
        })
    },

    onPublish(id, published) {
      this.$api.pages.put({ id, published }).then(page => {
        this.pages = this.pages.map(p => (p.id === page.id ? page : p))
      })
    },

    onSetParent(id) {
      console.log('set parent', id)
    },
  },

  mounted() {
    this.fetchPages()
  },
}
</script>
