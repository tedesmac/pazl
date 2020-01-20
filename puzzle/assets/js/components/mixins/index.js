import Collapsible from 'components/editor/collapsible'
import Entry from 'components/admin/entry'
import Editor from 'components/editor'
import Error from 'components/editor/error'
import Sidebar from 'components/editor/sidebar'
import Topbar from 'components/editor/topbar'
import Workspace from 'components/editor/workspace'
import Draggable from 'vuedraggable'

export const AdminListingMixin = {
  components: { Entry },
}

export const BlockEditorMixin = {
  components: {
    Collapsible,
    Draggable,
    Editor,
    Error,
    Sidebar,
    Topbar,
    Workspace,
  },

  data() {
    return {
      blocks: [],
      error: false,
      errorMessage: '',
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
