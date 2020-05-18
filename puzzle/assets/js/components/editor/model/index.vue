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

    <notifications group="messages" position="bottom right" />

    <notifications
      group="errors"
      position="top right"
      classes="vue-notification error"
    />
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
        this.$store.commit('page/setName', value.toLowerCase().replace(' ', ''))
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
            name: value.toLowerCase().replace(' ', ''),
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
      const errors = this.verifyAll()
      if (errors.length === 0) {
        this.$store.commit('editor/setSaving', true)
        if (this.id == 0) {
          this.$api.models
            .post({
              data: {
                blocks: this.blocks,
              },
              name: this.name,
            })
            .then(data => {
              this.$store.commit('editor/setSaving', false)
              this.$notify({
                group: 'messages',
                text: 'Model saved',
              })
              this.$router.push({
                path: `${this.$routes.editor}model?id=${data.id}`,
              })
            })
            .catch(error => {
              console.error('[editor/model.post] =>', error)
              this.$store.commit('editor/setSaving', false)
              this.$notify({
                group: 'errors',
                text: 'Unable to save, please try again later',
              })
            })
        } else {
          this.$api.models
            .put({
              id: this.id,
              data: {
                blocks: this.blocks,
              },
              name: this.name,
            })
            .then(data => {
              this.$store.commit('editor/setSaving', false)
              this.$notify({
                group: 'messages',
                text: 'Model saved',
              })
            })
            .catch(error => {
              console.error('[editor/model.post] =>', error)
              this.$store.commit('editor/setSaving', false)
              this.$notify({
                group: 'errors',
                text: 'Unable to save, please try again later',
              })
            })
        }
      } else {
        errors.map(e => {
          this.$notify({
            group: 'errors',
            text: e,
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
        for (let j = i + 1; j < this.blocks.length; j++) {
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

  created() {
    this.$store.commit('page/setIsEntry', true)
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
