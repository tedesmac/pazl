<template>
  <div>
    <div class="section is-horizontal space-between">
      <h2>{{ $utils.capitalize(modelName) }}</h2>

      <button class="is-cyan" @click="onNew">New</button>
    </div>

    <div class="section is-vertical">
      <Entry
        v-for="(entry, index) in entries"
        :index="index"
        :key="`entry_${entry.id}`"
        :name="entry.name"
        :published="entry.published"
        @delete="onDelete(entry.id)"
        @edit="onEdit(entry.id)"
      >
        <template #actions>
          <button class="is-yellow">
            {{ entry.published ? 'Unpublish' : 'Publish' }}
          </button>
        </template>
      </Entry>
    </div>
  </div>
</template>

<script>
import { AdminListingMixin } from '@/components/mixins'
import { mapState } from 'vuex'

export default {
  mixins: [AdminListingMixin],

  data() {
    return { entries: [] }
  },

  props: {
    modelId: {
      type: Number,
      required: true,
    },
  },

  computed: mapState({
    modelName: state => {
      const modelId = Number(state.route.params.model)
      return state.admin.models.reduce((acc, model) => {
        if (model.id === modelId) {
          return model.name
        }
        return acc
      }, 'Entries')
    },
  }),

  methods: {
    fetchEntries() {
      this.$api.entries
        .get({ model: this.modelId })
        .then(entries => {
          this.entries = entries
        })
        .catch(error => {
          console.error('[admin.entries.fetchEntries] =>', error)
          this.entries = []
        })
    },

    onDelete(id) {
      this.$api.entries
        .delete({ id })
        .then(() => {
          this.fetchEntries()
        })
        .catch(error => {
          console.error('[admin.entries.onDelete] =>', error)
        })
    },

    onEdit(id) {
      window.location = `/pazl/editor/entry?id=${id}&model=${this.modelId}`
    },

    onNew() {
      window.location = `/pazl/editor/entry?model=${this.modelId}`
    },
  },

  watch: {
    modelId() {
      this.fetchEntries()
    },
  },

  mounted() {
    this.fetchEntries()
  },
}
</script>
