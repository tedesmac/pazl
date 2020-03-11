import Block from '@/components/block'
import Collapsible from '@/components/editor/collapsible'
import Entry from '@/components/admin/entry'
import Editor from '@/components/editor'
import Sidebar from '@/components/editor/sidebar'
import Topbar from '@/components/editor/topbar'
import Workspace from '@/components/editor/workspace'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import Draggable from 'vuedraggable'
import { mapState } from 'vuex'

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
    data() {
      return this.block.data
    },

    style() {
      return this.block.style
    },
  },
}

export const BlockContainerMixin = {
  components: { Block, Draggable, FontAwesomeIcon },

  data() {
    return {
      eventListener: false,
      mouseX: 0,
    }
  },

  computed: {
    ...mapState({
      edit: state => (state.editor ? state.editor.edit : false),
    }),

    faEdit: () => faEdit,
  },

  methods: {
    onDragOver(event) {
      this.mouseX = event.clientX
    },

    onEditBlock(id, type) {
      console.log('edit', id, type)
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
    validators: []
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

export const SettingMixin = {
  props: {
    root: {
      type: String,
      required: true,
    },

    setting: {
      type: Object,
      required: true,
    },
  },

  computed: {
    id() {
      return this.setting.id
    },

    name() {
      return this.setting.name
    },

    value: {
      get() {
        return this.setting.value
      },

      set(value) {
        this.$store.commit('page/setBlockSetting', {
          id: this.id,
          name: this.name,
          root: this.root,
          value,
        })
      },
    },
  },
}
