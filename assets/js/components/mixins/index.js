import Editor from 'components/editor'
import Error from 'components/editor/error'
import Sidebar from 'components/editor/sidebar'
import Topbar from 'components/editor/topbar'
import Workspace from 'components/editor/workspace'

export const BlockEditorMixin = {
  components: {
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
        } else if (index !== Number(id)) {
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