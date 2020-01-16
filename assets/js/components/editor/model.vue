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

      <Draggable
        class="model-block-container"
        group="blocks"
        v-model="blocks"
        @end="onEnd"
      >
        <div
          v-for="(block, index) in blocks"
          class="model-block"
          :block="index"
          :key="`block_${index}`"
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

    <Error :message="errorMessage" :show="error" @close="error = false" />
  </Editor>
</template>

<script>
import { BlockEditorMixin } from 'components/mixins'
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
  mixins: [BlockEditorMixin],

  components: { Draggable },

  data() {
    return {
      name: '',
      defaultBlocks,
      modelId: 0,
      saving: false,
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
      this.verifyAll()
      if (!this.error) {
        this.saving = true
        this.$api.models
          .post({
            data: {
              blocks: this.blocks,
            },
            name: this.name,
          })
          .then(data => {
            console.log('[model saved] =>', data)
            this.blocks = data.data.blocks
            this.modelId = data.id
            this.name = data.name
            this.saving = false
          })
          .catch(() => {
            this.saving = false
            this.error = true
            this.errorMessage = 'Unable to save, please try again later'
          })
      }
    },

    verifyAll() {
      if (!this.verifyBlocksNamed()) {
        this.error = true
        this.errorMessage = 'All blocks must be named'
      } else if (!this.verifyNamed()) {
        this.error = true
        this.errorMessage = 'Model must be named'
      } else if (!this.verifyUniqueNames()) {
        this.error = true
        this.errorMessage = 'All blocks must have an unique name'
      }
    },

    verifyBlocksNamed() {
      let allBlocksNamed = true
      for (let i = 0; i < this.blocks.length; i++) {
        if (this.blocks[i].name === '') {
          allBlocksNamed = false
          break
        }
      }
      return allBlocksNamed
    },

    verifyNamed() {
      return this.name !== ''
    },

    verifyUniqueNames() {
      let allUniqueNames = true
      for (let i = 0; i < this.blocks.length - 1; i++) {
        for (let j = i + 1; i < this.blocks.length; j++) {
          if (this.blocks[i].name === this.blocks[j].name) {
            allUniqueNames = false
            break
          }
        }
        if (!allUniqueNames) {
          break
        }
      }
      return allUniqueNames
    },
  },

  mounted() {
    if (this.id > 0) {
      this.$api.models.get({ id: this.id }).then(data => {
        this.name = data.name
        this.blocks = data.data.blocks
      })
    }
  },
}
</script>
