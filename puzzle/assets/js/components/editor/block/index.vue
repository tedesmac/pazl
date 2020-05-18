<template>
  <Editor>
    <Topbar :backUrl="`${$routes.admin}blocks`" @save="onSave">
      <Toggle />
    </Topbar>

    <Workspace>
      <Draggable
        v-model="blocks"
        group="blocks"
        :class="{ 'block-container': edit, __puzzle_page: !edit }"
        @end="onEnd"
      >
        <Block
          v-for="(block, index) in blocks"
          parent="root"
          :block="block.id"
          :class="{
            block: edit,
            'block-hover': block.id === mouseover && edit,
            'block-selected': block.id === selected && edit,
          }"
          :index="index"
          :key="block.id"
          :type="block.type"
          @click.stop.native="onClickBlock(block)"
          @mouseover.stop.native="onMouseOver(block.id)"
        />
      </Draggable>
    </Workspace>

    <Sidebar>
      <div class="tab-list">
        <div
          :class="['tab', { active: currentTab === 'Settings' }]"
          @click="currentTab = 'Settings'"
        >
          Settings
        </div>

        <div
          :class="['tab', { active: currentTab === 'Blocks' }]"
          @click="currentTab = 'Blocks'"
        >
          Blocks
        </div>

        <div
          :class="['tab', { active: currentTab === 'Properties' }]"
          @click="currentTab = 'Properties'"
        >
          Properties
        </div>
      </div>

      <!-- Settings -->
      <BlockSettings v-if="currentTab === 'Settings'" />

      <!-- Blocks -->
      <div v-if="currentTab === 'Blocks'">
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

        <Collapsible string="Blocks">
          <Draggable
            v-model="nonModelBlocks"
            :group="{ name: 'blocks', pull: 'clone', put: false }"
            :clone="onClone"
          >
            <div
              v-for="block in nonModelBlocks"
              class="model-block"
              :key="`non_model_block_${block.type}`"
            >
              {{ block.type }}
            </div>
          </Draggable>
        </Collapsible>
      </div>

      <!-- Properties -->
      <div v-if="currentTab === 'Properties'" class="form">
        <div class="field" style="margin-top: 0.5rem;">
          <label>Block Name</label>
          <input type="text" v-model="name" />
        </div>
      </div>
    </Sidebar>

    <modal
      height="auto"
      name="image-select"
      width="80%"
      :scrollable="true"
      @before-open="beforeImageGallery"
    >
      <ImageGallery @image="onImageSelected" />
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
import Toggle from '@/components/editor/mode-toggle'
import { BlockContainerMixin, EditorMixin } from '@/components/mixins'
import { modelTypes } from '@/constants'

const BlockSettings = () => import('@/components/editor/blockSettings')
const ImageGallery = () =>
  import(
    /* webpackChunkName: 'imageGallery' */
    'components/misc/image-gallery'
  )

export default {
  mixins: [BlockContainerMixin, EditorMixin],

  components: { BlockSettings, ImageGallery, Toggle },

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

  computed: {
    blocks: {
      get() {
        return this.$store.getters['page/getChildren']('root')
      },

      set(blocks) {
        this.$store.commit('page/updateBlocks', {
          blocks: blocks.map(b => ({ ...b, parent: 'root' })),
          parent: 'root',
        })
      },
    },

    currentTab: {
      get() {
        return this.$store.state.editor.currentTab
      },

      set(value) {
        this.$store.commit('editor/setCurrentTab', value)
      },
    },

    name: {
      get() {
        return this.$store.state.page.name
      },

      set(value) {
        this.$store.commit('page/setName', value)
      },
    },

    nonModelBlocks() {
      const blocks = [{ type: 'container' }, { type: 'spacer' }]
      if (this.modelId === 0) {
        return [
          ...Object.keys(modelTypes).map(key => ({
            type: key,
          })),
          ...blocks,
        ].sort((a, b) => {
          if (a.type < b.type) {
            return -1
          }
          if (a.type > b.type) {
            return 1
          }
          return 0
        })
      }
      return blocks
    },
  },

  methods: {
    fetchBlock() {
      this.$store.dispatch('page/fetchBlock', this.id)
    },

    fetchModel() {
      this.$api.models
        .get({ id: this.modelId })
        .then(model => {
          this.model = model
          this.modelBlocks = [
            ...model.data.blocks,
            ...[
              {
                name: 'author',
                type: 'author',
              },
              {
                name: 'date',
                type: 'date',
              },
              {
                name: 'description',
                type: 'string',
              },
              {
                name: 'image',
                type: 'image',
              },
              {
                name: 'name',
                type: 'string',
              },
            ],
          ].sort((a, b) => {
            if (a.name < b.name) {
              return -1
            }
            if (a.name > b.name) {
              return 1
            }
            return 0
          })
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

    onSave() {
      if (this.validate()) {
        this.$store.commit('editor/setSaving', true)
        this.$store
          .dispatch('page/saveBlock', {
            id: this.id,
            model: this.modelId,
          })
          .then(data => {
            const { id } = data
            if (this.id !== id) {
              let query = { id }
              if (this.modelId) {
                query['model'] = this.modelId
              }
              this.$router.push({ name: 'blockEditor', query })
            }
            this.$store.commit('editor/setSaving', false)
            this.$notify({
              group: 'messages',
              text: 'Block saved',
            })
          })
          .catch(error => {
            console.error('[blockEditor.onSave] =>', error)
            this.$store.commit('editor/setSaving', false)
            this.$notify({
              group: 'errors',
              text: 'Unable to save block, please try later',
            })
          })
      }
    },
  },

  beforeMount() {
    this.addValidator(this._blocksNoEmptyValidator)
    this.addValidator(this._nameValidator)
  },

  created() {
    if (this.id) {
      this.fetchBlock()
    }
    if (this.modelId) {
      this.fetchModel()
    }
    this.currentTab = 'Blocks'
  },
}
</script>
