import Api from 'api'

export default {
  namespaced: true,

  state: () => ({
    blocks: [],
    description: '',
    image: '',
    isEntry: false,
    name: '',
    slug: '',
    style: {},
  }),

  actions: {
    fetchEntry(context, id) {
      Api.entries
        .get({ id })
        .then(data => {
          context.commit('setBlocks', data.data.blocks)
          context.commit('setDescription', data.description)
          context.commit('setImage', data.image)
          context.commit('setName', data.name)
          context.commit('setSlug', data.slug)
        })
        .catch(error => {
          console.error('[pageStore.fetchEntry] =>', error)
          return Promise.reject(error.response.data)
        })
    },

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
          console.error('[pageStore.fetchPageById] =>', error)
          // return Promise.reject(error.response.data)
        })
    },

    fetchPageByPath(context, path) {
      Api.pages
        .get({ path, published: 1 })
        .then(pages => {
          const data = pages[0]
          if (data !== undefined) {
            context.commit('setBlocks', data.data.blocks)
            context.commit('setDescription', data.description)
            context.commit('setImage', data.image)
            context.commit('setName', data.name)
            context.commit('setSlug', data.slug)
            context.commit('setStyle', data.data.style)
          }
          return data
        })
        .catch(error => {
          console.error('[pageStore.fetchPageById] =>', error)
          return Promise.reject(error)
        })
    },

    saveEntry(context, payload) {
      const { id, model } = payload
      const { blocks, description, image, name, slug } = context.state

      const data = {
        data: { blocks },
        description,
        image,
        model,
        name,
        slug,
      }

      if (id) {
        return Api.entries
          .put({ ...data, id })
          .then(data => {
            context.commit('setSlug', data.slug)
            return data
          })
          .catch(error => {
            console.error('[pageStore.saveEntry.put] =>', error)
            return Promise.reject(error)
          })
      } else {
        return Api.entries
          .post(data)
          .then(data => {
            context.commit('setSlug', data.slug)
            return data
          })
          .catch(error => {
            console.error('[pageStore.saveEntry.post] =>', error)
            return Promise.reject(error)
          })
      }
    },

    savePage(context, id) {},

    setupEntry(context, id) {
      Api.models
        .get({ id })
        .then(data => {
          context.commit('setBlocks', data.data.blocks)
          context.commit('setIsEntry', true)
        })
        .catch(error => {
          console.error('[pageStore.setupEntry] =>', error)
          return Promise.reject(error)
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

    setBlockSetting(state, payload) {
      const { id, name, root, value } = payload
      const index = state.blocks.findIndex(b => b.id === id)
      let block = state.blocks[index]
      block[root][name] = value
      state.blocks = [...state.blocks.filter(b => b.id !== id), block]
    },

    setDescription(state, description) {
      state.description = description
    },

    setEntryBlock(state, payload) {
      const { name, value } = payload
      const index = state.blocks.findIndex(b => b.name === name)
      let block = state.blocks[index]
      block = { ...block, value }
      state.blocks = state.blocks.map(b => (b.name === name ? block : b))
    },

    setImage(state, image) {
      state.image = image
    },

    setIsEntry(state, value) {
      state.isEntry = value
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
      const newBlocks = [
        ...notParent,
        ...blocks.map((b, i) => ({ ...b, index: i })),
      ]
      const ids = newBlocks.reduce((acc, b) => [...acc, b.id], ['root'])
      state.blocks = newBlocks.filter(b => ids.includes(b.parent))
    },
  },
}
