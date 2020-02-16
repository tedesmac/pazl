<template>
  <div>
    <div class="section is-horizontal space-between">
      <h2>Models</h2>

      <button class="is-cyan" @click="onNewModel">
        New
      </button>
    </div>

    <div class="section is-vertical">
      <Entry
        v-for="model in models"
        :key="`model_${model.id}`"
        :name="model.name"
        @edit="onEdit(model.id)"
      />
    </div>
  </div>
</template>

<script>
import { AdminListingMixin } from 'components/mixins'
import { mapState } from 'vuex'

export default {
  mixins: [AdminListingMixin],

  computed: mapState({
    models: state => state.admin.models,
  }),

  methods: {
    onEdit(id) {
      window.location = `/puzzle/editor/model?id=${id}`
    },

    onNewModel() {
      window.location = '/puzzle/editor/model/'
    },
  },
}
</script>
