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

      <div class="is-full is-vertical" style="margin-top: 1rem;">
        <Entry
          v-for="(block, index) in blocks[model.id]"
          :index="index"
          :key="`block_${block.id}`"
          name="Some name"
          @delete="onDelete(block.id)"
          @edit="onEdit(block.id, model.id)"
        />
      </div>
    </div>

    <div class="section is-vertical">
      <div class="is-full is-horizontal space-between">
        <h2>Non Model Blocks</h2>
        <button class="is-cyan" @click="onNewBlock()">New</button>
      </div>

      <div class="is-full is-vertical" style="margin-top: 1rem;">
        <Entry
          v-for="(block, index) in blocks[0]"
          :index="index"
          :key="`block_${block.id}`"
          name="Some name"
          @delete="onDelete(block.id)"
          @edit="onEdit(block.id)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { AdminListingMixin } from '@/components/mixins'
import { mapState } from 'vuex'

export default {
  mixins: [AdminListingMixin],

  data() {
    return {
      blocks: {},
    }
  },

  computed: mapState({
    models: state => state.admin.models,
  }),

  methods: {
    fetchBlocks() {
      this.$api.blocks
        .get()
        .then(data => {
          this.blocks = data.reduce(
            (acc, b) => {
              if (b.model) {
                try {
                  acc[b.model] = [...acc[b.model], b]
                } catch (e) {
                  acc[b.model] = [b]
                }
              } else {
                try {
                  acc[0] = [...acc[0], b]
                } catch (e) {
                  acc[0] = [b]
                }
              }
              return acc
            },
            this.models.reduce(
              (acc, m) => {
                acc[m.id] = []
                return acc
              },
              { 0: [] }
            )
          )
        })
        .catch(error => {
          console.error('[admin.blocks.fetchBlocks] =>', error)
        })
    },

    onDelete(id) {
      this.$api.blocks
        .delete({ id })
        .then(() => {
          this.fetchBlocks()
        })
        .catch(error => {
          console.error('[admin.blocks.onDelete] =>', error)
          this.$notify({
            group: 'errors',
            text: 'Unable to delete block',
          })
        })
    },

    onEdit(id, model = 0) {
      let querystring = `?id=${id}`
      if (model) {
        querystring += `&model=${model}`
      }
      window.location = `${this.$routes.editor}block${querystring}`
    },

    onNewBlock(id = 0) {
      const querystring = id ? `?model=${id}` : ''
      window.location = `/pazl/editor/block${querystring}`
    },
  },

  watch: {
    models() {
      this.fetchBlocks()
    },
  },

  created() {
    if (this.models.length) {
      this.fetchBlocks()
    }
  },
}
</script>
