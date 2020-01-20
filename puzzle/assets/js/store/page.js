import Api from 'api'

export default {
  namespaced: true,

  state: () => ({
    blocks: [],
    description: '',
    image: '',
    name: '',
    slug: '',
    style: {},
  }),

  mutations: {
    removeBlock(state, block) {
      state.blocks = state.blocks.filter(pageBlock => {
        if (pageBlock.id !== block.id) {
          return pageBlock
        }
      })
    },

    setBlock(state, block) {
      const index = state.blocks.findIndex(b => b.id === block.id)

      if (index) {
        state.blocks[index] = { ...state.blocks[index], ...block }
      } else {
        state.blocks = [...state.blocks, block]
      }
    },

    setBlocks(state, blocks) {
      state.blocks = blocks
    },

    setDescription(state, description) {
      state.description = description
    },

    setImage(state, image) {
      state.image = image
    },

    setName(state, name) {
      state.name = name
    },

    setSlug(state, slug) {
      state.slug = slug
    },

    setStyle(state, style) {
      state.style = style
    },

    updateBlocks(state, blocks) {
      let newBlocks = []
      blocks.forEach(block => {
        const index = state.blocks.findIndex(b => b.id === block.id)
        if (index > -1) {
          state.blocks[index] = { ...state.blocks[index], ...block }
        } else {
          newBlocks = [...newBlocks, block]
        }
      })
      state.blocks = [...state.blocks, ...newBlocks]
    },
  },

  actions: {
    fetchPageById(context, id) {
      Api.pages
        .get({ id })
        .then(data => {
          context.commit('setBlocks', data.data.blocks)
          context.commit('setDescription', data.description)
          context.commit('setImage', data.image)
          context.commit('setName', data.name)
          context.commit('setSlug', data.slug)
          context.commit('setStyle', data.data.style)
        })
        .catch(error => {
          console.log('[pageStore.fetchPageById] =>', error)
          // return Promise.reject(error.response.data)
        })
    },

    fetchPageByPath(context, path) {
      Api.pages
        .get({ path })
        .then(response => {
          const { data } = response
          context.commit('setBlocks', data.data.blocks)
          context.commit('setDescription', data.description)
          context.commit('setImage', data.image)
          context.commit('setName', data.name)
          context.commit('setSlug', data.slug)
          context.commit('setStyle', data.data.style)
        })
        .catch(error => {
          console.log('[pageStore.fetchPageById] =>', error)
          return Promise.reject(error.response.data)
        })
    },
  },
}
