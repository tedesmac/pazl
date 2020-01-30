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

  getters: {
    getBlock: state => id => {
      const index = state.blocks.findIndex(b => b.id === id)
      if (index > 0) {
        return state.blocks[index]
      }
      return {}
    },

    getChildren: state => id =>
      state.blocks
        .filter(block => block.parent === id)
        .sort((a, b) => {
          if (a.index < b.index) {
            return -1
          }
          if (a.index > b.index) {
            return 1
          }
          return 0
        }),
  },

  mutations: {
    setBlock(state, block) {
      state.blocks = state.blocks.map(pageBlock => {
        if (pageBlock.id === block.id) {
          return { ...pageBlock, ...block }
        }
        return pageBlock
      })
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

    updateBlocks(state, payload) {
      const { blocks, parent } = payload
      const notParent = state.blocks.filter(b => b.parent !== parent)
      state.blocks = [
        ...notParent,
        ...blocks.map((b, i) => ({ ...b, index: i })),
      ]
    },
  },
}
