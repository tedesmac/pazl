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

export const BlockMixin = {
  props: {
    block: {
      type: Object,
      required: true,
    },

    isEntry: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    data: {
      get() {
        const { data = {} } = this.block
        return data
      },

      set(value) {
        this.$store.commit('page/setBlock', {
          ...this.block,
          data: { ...this.block.data, ...value },
        })
      },
    },

    style: {
      get() {
        const { style = {} } = this.block
        return style
      },

      set(value) {
        this.$store.commit('page/setBlock', {
          ...this.block,
          style: { ...this.block.style, ...value },
        })
      },
    },

    ...mapState({
      edit: state => {
        const { editor } = state
        if (editor && editor.edit) {
          return editor.edit
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
      edit: state => (state.editor ? state.editor.edit : false),
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
      return blockFactory(block.type)
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
      validators: [],
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
        this.validators = [...this.validators, validator]
      } else {
        console.error('[EditorMixin] => validator must be a function')
      }
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
    Collapsible,
    Draggable,
    Editor,
    Sidebar,
    Topbar,
    Workspace,
  },

  data() {
    return {
      eventListener: false,
      mouseX: 0,
      saving: false,
    }
  },

  props: {
    id: {
      type: Number,
    },
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
