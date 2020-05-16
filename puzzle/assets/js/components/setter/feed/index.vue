<template>
  <div>
    <div class="is-horizontal subsetter">
      <label>Model:</label>
      <select v-model="modelId">
        <option :value="0"></option>
        <option
          v-for="model in models"
          :key="`model_${model.id}`"
          :value="model.id"
        >
          {{
            model.name.substr(0, 1).toUpperCase() +
              model.name.substr(1).toLowerCase()
          }}
        </option>
      </select>
    </div>

    <div class="is-horizontal subsetter">
      <label>Block:</label>
      <select v-model="blockId">
        <option
          v-for="block in blocks"
          :key="`block_${block.id}`"
          :value="block.id"
        >
          {{ block.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import { SetterMixin } from '@/components/mixins'

export default {
  mixins: [SetterMixin],

  data() {
    return {
      blockId: 0,
      fetchedBlocks: {},
      modelId: 0,
      models: [],
    }
  },

  computed: {
    blocks() {
      if (this.modelId in this.fetchedBlocks) {
        return this.fetchedBlocks[this.modelId]
      }
      return []
    },
  },

  methods: {
    fetchBlocks() {
      this.$api.blocks
        .get({ model: this.modelId })
        .then(blocks => {
          this.fetchedBlocks[this.modelId] = blocks
        })
        .catch(error => {
          console.error('[feedSetter.fetchBlocks] =>', error)
        })
    },

    fetchModels() {
      this.$api.models
        .get()
        .then(models => {
          this.models = models
        })
        .catch(error => {
          console.error('[feedSetter.fetchModels] =>', error)
        })
    },
  },

  watch: {
    blockId() {},

    modelId(value) {
      if (value > 0 && !(value in this.fetchedBlocks)) {
        this.fetchBlocks()
      }
    },
  },

  created() {
    this.fetchModels()
  },
}
</script>
