<template>
  <Editor>
    <Topbar :backUrl="`${$routes.admin}models/`" @save="onSave" />

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

      <div class="model-block">
        <p>
          <b>Note:</b> All entries include title; description; image; author;
          and publication date by default, so is not necessary to include them
          in the model.
        </p>
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
              maxlength="50"
              :value="block.name"
              type="text"
              @input="onBlockName($event, index)"
            />
          </div>
        </div>
      </Draggable>
    </Workspace>
  </Editor>
</template>

<script>
import { BlockContainerMixin, EditorMixin } from '@/components/mixins'
import { modelTypes } from '@/constants'

const defaultBlocks = Object.keys(modelTypes).map(type => ({ type }))

export default {
  mixins: [BlockContainerMixin, EditorMixin],

  data() {
    return {
      defaultBlocks,
    }
  },

  computed: {
    blocks: {
      get() {
        return this.$store.state.page.blocks
      },

      set(value) {
        this.$store.commit('page/setBlocks', value)
      },
    },

    name: {
      get() {
        return this.$store.state.page.name
      },

      set(value) {
        this.$store.commit('page/setName', this.$utils.capitalize(value))
      },
    },
  },

  methods: {
    onBlockName(event, index) {
      const { value } = event.target
      this.blocks = this.blocks.map((b, i) => {
        if (i === index) {
          return {
            ...b,
            name: this.$utils.capitalize(value),
          }
        }
        return b
      })
    },

    onClone(block) {
      return {
        ...block,
        name: '',
      }
    },

    onSave() {
      if (this.validate()) {
        this.$store.commit('editor/setSaving', true)
        this.$store
          .dispatch('page/saveModel', this.id)
          .then(() => {
            this.$store.commit('editor/setSaving', false)
            this.$notify({
              group: 'messages',
              text: 'Model saved',
            })
          })
          .catch(error => {
            console.error('[ModelEditor.onSave] =>', error)
            this.$store.commit('editor/setSaving', false)
            this.$notify({
              group: 'errors',
              text: 'Unable to save, please try again later',
            })
          })
      }
    },

    verifyAll() {
      let errors = []
      if (!this.verifyBlocksNamed()) {
        errors = ['All blocks must be named.']
      }
      if (!this.verifyNamed()) {
        errors = [...errors, 'Model must be named.']
      }
      if (!this.verifyUniqueNames()) {
        errors = [...errors, 'All blocks must have an unique names.']
      }
      if (this.blocks.length == 0) {
        errors = [...errors, 'Model must have at least 1 block.']
      }
      return errors
    },

    // Validators

    /**
     * Verifies that all blocks are named
     */
    blocksNamedValidator() {
      const message = 'All blocks must be named'
      let valid = true
      for (let i = 0; i < this.blocks.length; i++) {
        if (this.blocks[i].name === '') {
          valid = false
          break
        }
      }
      return { message, valid }
    },

    /**
     * Verifies that all blocks have a unique name
     */
    blocksHaveUniqueNameValidator() {
      const message = 'All blocks must have an unique name'
      let valid = true
      for (let i = 0; i < this.blocks.length - 1; i++) {
        for (let j = i + 1; j < this.blocks.length; j++) {
          if (this.blocks[i].name === this.blocks[j].name) {
            valid = false
            break
          }
        }
        if (!valid) {
          break
        }
      }
      return { message, valid }
    },
  },

  created() {
    this.$store.commit('page/setIsEntry', true)

    this.addValidator(this._blocksNoEmptyValidator)
    this.addValidator(this._nameValidator)
    this.addValidator(this.blocksNamedValidator)
    this.addValidator(this.blocksHaveUniqueNameValidator)
  },

  mounted() {
    if (this.id > 0) {
      this.$api.models
        .get({ id: this.id })
        .then(data => {
          this.name = data.name
          this.blocks = data.data.blocks
        })
        .catch(() => {
          window.location = `${this.$routes.admin}models/`
        })
    }
  },
}
</script>
