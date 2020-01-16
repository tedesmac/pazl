<template>
  <Editor>
    <Topbar backUrl="/puzzle/admin/models/" :saving="saving" @save="onSave" />

    <Sidebar>
      <Draggable
        :group="{ name: 'blocks', pull: 'clone', put: false }"
        :clone="onClone"
        v-model="defaultBlocks"
      >
        <div
          class="model-block"
          :key="`defaul_${block.type}`"
          v-for="block in defaultBlocks"
        >
          <p>{{ block.type }}</p>
        </div>
      </Draggable>
    </Sidebar>

    <Workspace>
      <div class="model-block">
        <div class="field">
          <label>
            Model Name:
          </label>
          <input type="text" maxlength="50" v-model="name" />
        </div>
      </div>

      <Draggable class="model-block-container" group="blocks" v-model="blocks">
        <div
          class="model-block"
          :key="`block_${index}`"
          v-for="(block, index) in blocks"
        >
          <div class="type">
            {{ block.type }}
          </div>

          <div class="field">
            <label>Name :</label>
            <input
              type="text"
              maxlength="50"
              @input="onBlockName($event, index)"
            />
          </div>

          <div class="field">
            <label>Default :</label>
          </div>
        </div>
      </Draggable>
    </Workspace>
  </Editor>
</template>

<script>
import Draggable from 'vuedraggable'

const defaultBlocks = [
  {
    type: 'image',
  },
  {
    type: 'html',
  },
  {
    type: 'link',
  },
  {
    type: 'markdown',
  },
  {
    type: 'string',
  },
]

export default {
  components: { Draggable },

  data() {
    return {
      blocks: [],
      name: '',
      saving: false,
      defaultBlocks,
    }
  },

  methods: {
    onBlockName(event, index) {
      this.blocks[index].name = event.target.value
    },

    onClone(block) {
      return {
        ...block,
        name: '',
        default: '',
      }
    },

    onSave() {
      this.saving = !this.saving
    },
  },
}
</script>
