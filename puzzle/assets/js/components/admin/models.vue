<template>
  <div>
    <div class="section is-horizontal space-around">
      <h2>Models</h2>

      <button class="is-cyan" @click="onNewModel">
        New
      </button>
    </div>

    <div class="section is-vertical">
      <Entry
        v-for="model in models"
        :editUrl="`/puzzle/editor/model?id=${model.id}`"
        :key="`model_${model.id}`"
        :name="model.name"
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
    models: state => state.models,
  }),

  methods: {
    onNewModel() {
      window.location = '/puzzle/editor/model/'
    },
  },
}
</script>
