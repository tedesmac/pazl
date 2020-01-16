import Editor from 'components/editor'
import Sidebar from 'components/editor/sidebar'
import Topbar from 'components/editor/topbar'
import Workspace from 'components/editor/workspace'

export const BlockEditorMixin = {
  components: {
    Editor,
    Sidebar,
    Topbar,
    Workspace,
  },

  data() {
    return {
      blocks: [],
      eventListener: false,
      mouseX: 0,
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
        } else if (index !== index) {
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
