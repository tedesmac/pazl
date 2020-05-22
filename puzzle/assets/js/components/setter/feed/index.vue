<template>
  <div>
    <div class="is-horizontal subsetter">
      <label>Mode</label>
      <select v-model="mode">
        <option value="gallery">Gallery</option>
        <option value="timeline">Timeline</option>
      </select>
    </div>

    <div class="is-horizontal subsetter">
      <label>Model:</label>
      <select v-model="modelId">
        <option :value="0"></option>
        <option
          v-for="model in models"
          :key="`model_${model.id}`"
          :value="model.id"
        >
          {{ $utils.capitalize(model.name) }}
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
          {{ $utils.capitalize(block.name) }}
        </option>
      </select>
    </div>

    <div class="is-horizontal subsetter">
      <label>Show</label>
      <input type="number" v-model="show" />
    </div>
  </div>
</template>

<script>
import { SetterMixin } from '@/components/mixins'

export default {
  mixins: [SetterMixin],

  data() {
    return {
      fetchedBlocks: {},
      models: [],
    }
  },

  computed: {
    blockId: {
      get() {
        return this.getData('blockId', 0)
      },

      set(value) {
        this.setData('blockId', value)
      },
    },

    blocks() {
      if (this.modelId in this.fetchedBlocks) {
        return this.fetchedBlocks[this.modelId]
      }
      return []
    },

    mode: {
      get() {
        return this.getData('mode', 'timeline')
      },

      set(value) {
        this.setData('mode', value)
      },
    },

    modelId: {
      get() {
        return this.getData('modelId', 0)
      },

      set(value) {
        this.setData('modelId', value)
      },
    },

    show: {
      get() {
        return this.getData('show', 20)
      },

      set(value) {
        this.setData('show', value)
      },
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
