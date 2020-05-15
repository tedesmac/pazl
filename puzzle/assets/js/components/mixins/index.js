import Block from '@/components/block'
import Collapsible from '@/components/editor/collapsible'
import Entry from '@/components/admin/entry'
import Editor from '@/components/editor'
import Sidebar from '@/components/editor/sidebar'
import Topbar from '@/components/editor/topbar'
import Workspace from '@/components/editor/workspace'
import blockFactory, { mergeBlockToSettings } from '@/factories/block'
import EditorStore from '@/store/editor'
import PageStore from '@/store/page'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import Draggable from 'vuedraggable'
import { mapGetters, mapState } from 'vuex'

export const AdminListingMixin = {
  components: { Entry },
}

export const BlockGetRemoveSetMixin = {
  computed: {
    data: {
      get() {
        const { data = {} } = this.block
        return data
      },

      set(data) {
        this.$store.commit('page/setBlock', {
          ...this.block,
          data,
        })
      },
    },

    style: {
      get() {
        const { style = {} } = this.block
        return style
      },

      set(style) {
        this.$store.commit('page/setBlock', {
          ...this.block,
          style,
        })
      },
    },
  },

  methods: {
    getData(key, _default = '') {
      const value = this.data[key]
      if (value == null) {
        return _default
      }
      return value
    },

    getStyle(key, _default = '') {
      const value = this.style[key]
      if (value == null) {
        return _default
      }
      return value
    },

    removeData(key) {
      const { data = {} } = this
      delete data[key]
      this.data = data
    },

    removeStyle(key) {
      const { style = {} } = this
      delete style[key]
      this.style = style
    },

    setData(key, value) {
      const { data = {} } = this
      data[key] = value
      this.data = data
    },

    setStyle(key, value) {
      const { style = {} } = this
      style[key] = value
      this.style = style
    },
  },
}

export const BlockMixin = {
  mixins: [BlockGetRemoveSetMixin],

  props: {
    block: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapState({
      edit: state => {
        const { editor } = state
        if (editor && editor.mode) {
          return editor.mode === 'edit'
        }
        return false
      },
    }),
  },
}

export const BlockContainerMixin = {
  components: { Block, Draggable },

  data() {
    return {
      eventListener: false,
      mouseX: 0,
    }
  },

  computed: {
    ...mapState({
      edit: state => {
        const { editor } = state
        if (editor && editor.mode) {
          return editor.mode === 'edit'
        }
        return false
      },
      mouseover: state => state.editor.mouseover,
      selected: state => state.editor.selected,
    }),
  },

  methods: {
    onClickBlock(block) {
      if (this.edit) {
        this.$store.commit('editor/setSelected', block.id)
        this.$store.commit('editor/setCurrentTab', 'Settings')
      }
    },

    onClone(block) {
      const b = {
        ...block,
        ...blockFactory(block.type),
      }
      return b
    },

    onDragOver(event) {
      this.mouseX = event.clientX
    },

    onEnd(event) {
      const workspace = document
        .getElementById('workspace')
        .getBoundingClientRect()
      if (this.mouseX < workspace.left || workspace.right < this.mouseX) {
        const id = event.item.attributes.block.value
        this.removeBlock(id)
      }
    },

    onMouseOver(id) {
      this.$store.commit('editor/setMouseOver', id)
    },

    removeBlock(id) {
      this.blocks = this.blocks.filter((block, index) => {
        if (block.id && block.id !== id) {
          return block
        } else if (!block.id && index !== Number(id)) {
          return block
        }
      })
    },
  },

  beforeDestroy() {
    if (this.eventListener) {
      document.removeEventListener('dragover', this.onDragOver)
    }
  },

  mounted() {
    document.addEventListener('dragover', this.onDragOver)
    this.eventListener = true
  },
}

export const EditorMixin = {
  components: {
    Collapsible,
    Editor,
    Sidebar,
    Topbar,
    Workspace,
  },

  data() {
    return {
      _validators: [],
    }
  },

  props: {
    id: {
      type: Number,
    },
  },

  methods: {
    addValidator(validator) {
      if (typeof validator === 'function') {
        try {
          this._validators = [...this._validators, validator]
        } catch {
          this._validators = [validator]
        }
      } else {
        console.error('[EditorMixin] => validator must be a function')
      }
    },

    validate() {
      return this._validators.reduce((acc, validator) => {
        const { message, valid } = validator()
        if (!valid) {
          console.error(message)
          this.$notify({
            group: 'errors',
            text: message,
          })
        }
        return acc && valid
      }, true)
    },

    // Validators

    _blocksNoEmptyValidator() {
      const { blocks } = this.$store.state.page
      const message = 'Component should have at least one block'
      const valid = blocks.length > 0
      return { message, valid }
    },

    _nameValidator() {
      const { name } = this.$store.state.page
      const message = 'Name should not be empty'
      const valid = name.length > 0
      return { message, valid }
    },
  },

  beforeDestroy() {
    this.$store.unregisterModule('editor')
    this.$store.unregisterModule('page')
  },

  created() {
    this.$store.registerModule('editor', EditorStore)
    this.$store.registerModule('page', PageStore)
  },
}

export const BlockEditorMixin = {
  components: {
    Draggable,
  },

  data() {
    return {
      eventListener: false,
      mouseX: 0,
      saving: false,
    }
  },

  methods: {
    onDragOver(event) {
      this.mouseX = event.clientX
    },

    onEnd(event) {
      const workspace = document
        .getElementById('workspace')
        .getBoundingClientRect()
      if (this.mouseX < workspace.left || workspace.right < this.mouseX) {
        const id = event.item.attributes.block.value
        this.removeBlock(id)
      }
    },

    removeBlock(id) {
      this.blocks = this.blocks.filter((block, index) => {
        if (block.id && block.id !== id) {
          return block
        } else if (!block.id && index !== Number(id)) {
          return block
        }
      })
    },
  },

  beforeDestroy() {
    if (this.eventListener) {
      document.removeEventListener('dragover', this.onDragOver)
    }
  },

  mounted() {
    document.addEventListener('dragover', this.onDragOver)
    this.eventListener = true
  },
}

export const LogoMixin = {
  computed: {
    logoStyle() {
      return {
        backgroundImage: `url("${this.siteLogo}")`,
      }
    },

    ...mapGetters(['siteLogo']),
  },
}

export const SetterMixin = {
  mixins: [BlockGetRemoveSetMixin],

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  computed: {
    block: {
      get() {
        const block = this.$store.state.page.blocks.reduce((acc, b) => {
          if (this.id === b.id) {
            return b
          }
          return acc
        }, {})
        return block
      },

      set(block) {
        this.$store.commit('page/setBlock', block)
      },
    },
  },
}
