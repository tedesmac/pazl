<template>
  <Editor>
    <Topbar />

    <Workspace></Workspace>

    <Sidebar>
      <Collapsible string="Model Blocks" v-if="modelId > 0">
        <Draggable
          v-model="modelBlocks"
          :clone="onCloneModelBlock"
          :group="{ name: 'blocks', pull: 'clone', put: false }"
        >
          <div
            v-for="block in modelBlocks"
            class="model-block"
            :key="`model_block_${block.name}`"
          >
            {{ block.name }}
          </div>
        </Draggable>
      </Collapsible>

      <Collapsible string="Blocks" />
    </Sidebar>

    <modal height="auto" name="block-settings" width="80%" :scrollable="true">
      <BlockSettings />
    </modal>

    <notifications group="messages" position="bottom right" />

    <notifications
      group="errors"
      position="bottom right"
      classes="vue-notification error"
    />
  </Editor>
</template>

<script>
import { BlockContainerMixin, EditorMixin } from '@/components/mixins'

const BlockSettings = () =>
  import(
    /* webpackChunkName: 'pageBlockSettings' */
    '@/components/editor/blockSettings'
  )

export default {
  mixins: [BlockContainerMixin, EditorMixin],

  components: { BlockSettings },

  data() {
    return {
      model: {},
      modelBlocks: [],
    }
  },

  props: {
    modelId: {
      type: Number,
      required: true,
    },
  },

  computed: {},

  methods: {
    fetchModel() {
      this.$api.models
        .get({ id: this.modelId })
        .then(model => {
          this.model = model
          this.modelBlocks = model.data.blocks
        })
        .catch(error => {
          console.error('[Block Editor] =>', error)
        })
    },

    onCloneModelBlock(block) {
      return {
        ...this.onClone(block),
        id: block.id,
      }
    },
  },

  created() {
    if (this.modelId) {
      this.fetchModel()
    }
  },
}
</script>
