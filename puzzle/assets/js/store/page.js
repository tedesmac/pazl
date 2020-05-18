import Api from '@/api'
import Slug from 'slug'

export default {
  namespaced: true,

  state: () => ({
    blocks: [],
    description: '',
    error: false,
    id: 0,
    image: '',
    isEntry: false,
    modelBlock: null, // for entry
    modelId: 0,
    name: '',
    slug: '',
    style: {},
  }),

  actions: {
    fetchBlock(context, id) {
      Api.blocks
        .get({ id })
        .then(_ => {
          const { data, name } = _
          const { blocks } = data
          context.commit('setBlocks', blocks)
          context.commit('setName', name)
        })
        .catch(error => {
          console.error('[pageStore.fetchBlock] =>', error)
        })
    },

    fetchEntry(context, id) {
      Api.entries
        .get({ id })
        .then(data => {
          context.dispatch('fetchModelBlock', data.model)
          context.commit('setBlocks', data.data.blocks)
          context.commit('setDescription', data.description)
          context.commit('setImage', data.image)
          context.commit('setIsEntry', true)
          context.commit('setName', data.name)
          context.commit('setSlug', data.slug)
        })
        .catch(error => {
          console.error('[pageStore.fetchEntry] =>', error)
          context.commit('setError', true)
          return Promise.reject(error.response.data)
        })
    },

    fetchModelBlock(context, id) {
      Api.models
        .get({ id })
        .then(model => {
          if (model.block) {
            Api.blocks.get({ id: model.block }).then(block => {
              context.commit('setModelBlock', block)
            })
          }
        })
        .catch(error => {
          console.error('[pageStore.fetchModelBlock] =>', error)
          return Promise.reject(error)
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
          const { id } = pages[0]
          if (id != null) {
            Api.pages.get({ id }).then(data => {
              context.commit('setBlocks', data.data.blocks)
              context.commit('setDescription', data.description)
              context.commit('setId', data.id)
              context.commit('setImage', data.image)
              context.commit('setName', data.name)
              context.commit('setSlug', data.slug)
              context.commit('setStyle', data.data.style)
            })
          } else {
            context.commit('setError', true)
          }
        })
        .catch(error => {
          console.error('[pageStore.fetchPageByPath] =>', error)
          return Promise.reject(error)
        })
    },

    saveBlock(context, payload) {
      const { id, model } = payload
      const { blocks, name } = context.state

      let data = { data: { blocks }, name }
      if (model) {
        data['model'] = model
      }

      if (id) {
        return Api.blocks
          .put({ ...data, id })
          .then(_ => _)
          .catch(error => {
            console.error('[pageStore.saveBlock.put] =>', error)
            return Promise.reject(error)
          })
      } else {
        return Api.blocks
          .post(data)
          .then(_ => _)
          .catch(error => {
            console.error('[pageStore.saveBlock.post] =>', error)
            return Promise.reject(error)
          })
      }
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

    saveModel(context, id) {
      const { state } = context
      const data = {
        data: { blocks: state.blocks },
        name: state.name,
      }
      if (id) {
        return Api.models
          .put({ ...data, id })
          .then(_ => _)
          .catch(error => {
            console.error('[pageStore.saveModel.put]', error)
            Promise.reject(error)
          })
      } else {
        return Api.models
          .post(data)
          .then(_ => _)
          .catch(error => {
            console.error('[pageStore.saveModel.post]', error)
            Promise.reject(error)
          })
      }
    },

    savePage(context, id) {
      const { state } = context
      const data = {
        data: {
          blocks: state.blocks,
          style: state.style,
        },
        description: state.description,
        imager: state.image,
        name: state.name,
        slug: state.slug ? state.slug : Slug(state.name.toLowerCase()),
      }
      if (id) {
        return Api.pages
          .put({ ...data, id })
          .then(data => {
            return data
          })
          .catch(error => {
            console.error('[pageStore.savePage].put =>', error)
            return Promise.reject(error)
          })
      } else {
        return Api.pages
          .post(data)
          .then(data => {
            return data
          })
          .catch(error => {
            console.error('[pageStore.savePage].put =>', error)
            return Promise.reject(error)
          })
      }
    },

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
      let index
      if (state.isEntry) {
        index = state.blocks.findIndex(b => b.name === block.name)
      } else {
        index = state.blocks.findIndex(b => b.id === block.id)
      }
      state.blocks = state.blocks.map((b, i) => {
        if (i === index) {
          return { ...b, ...block }
        }
        return b
      })
    },

    setBlocks(state, blocks) {
      state.blocks = blocks
    },

    setDescription(state, description) {
      state.description = description
    },

    setError(state, error) {
      state.error = error
    },

    setId(state, id) {
      state.id = id
    },

    setImage(state, image) {
      state.image = image
    },

    setIsEntry(state, value) {
      state.isEntry = value
    },

    setModelBlock(state, block) {
      state.modelBlock = block
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

    /**
     *
     */
    updateBlocks(state, payload) {
      // TODO make sure user defined blocks are not filtered here
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
