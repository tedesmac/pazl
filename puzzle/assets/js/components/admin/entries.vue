<template>
  <div>
    <div class="section is-horizontal space-between">
      <h2>{{ modelName }}</h2>

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
      return state.admin.models.reduce((_, model) => {
        if (model.id === modelId) {
          console.log('here')
          return model.name
        }
        return _
      }, 'Entries')
    },
  }),

  methods: {
    onDelete(id) {
      // do something
    },

    onEdit(id) {
      window.location = `/puzzle/editor/entry?id=${id}&model=${this.modelId}`
    },

    onNew() {
      window.location = `/puzzle/editor/entry?model=${this.modelId}`
    },
  },

  mounted() {
    this.$api.entries.get().then(entries => {
      this.entries = entries
    })
  },
}
</script>
