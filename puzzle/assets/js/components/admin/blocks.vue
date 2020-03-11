<template>
  <div>
    <div class="section is-horizontal space-between">
      <h2>Blocks</h2>
    </div>

    <div
      v-for="model in models"
      class="section is-vertical"
      :key="`model_block_section_${model.id}`"
    >
      <div class="is-full is-horizontal space-between">
        <h2>{{ model.name }} Blocks</h2>
        <button class="is-cyan" @click="onNewBlock(model.id)">New</button>
      </div>

      <div></div>
    </div>

    <div class="section is-vertical">
      <div class="is-full is-horizontal space-between">
        <h2>Non Model Blocks</h2>
        <button class="is-cyan" @click="onNewBlock()">New</button>
      </div>

      <div></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      blocks: {},
    }
  },

  computed: mapState({
    models: state => state.admin.models,
  }),

  methods: {
    onNewBlock(id = 0) {
      const querystring = id ? `?model=${id}` : ''
      window.location = `/puzzle/editor/block${querystring}`
    },
  },

  created() {
    this.$api.blocks.get().then(data => {
      this.blocks = data.reduce(
        (acc, b) => {
          if (b.model) {
            const model = this.models.reduce(
              (acc, m) => (m.id === b.model ? m.name : acc),
              'none'
            )
          }
          return { ...acc, _noModel: [...acc._noModel, b] }
        },
        { _noModel: [] }
      )
    })
  },
}
</script>
