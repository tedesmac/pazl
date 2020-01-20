<template>
  <div>
    <div class="section is-horizontal space-around">
      <h2>{{ modelName }}</h2>

      <button class="is-cyan" @click="onNew">New</button>
    </div>

    <div class="section"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
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
    onNew() {
      window.location = `/puzzle/editor/entry?model=${this.modelId}`
    },
  },
}
</script>
