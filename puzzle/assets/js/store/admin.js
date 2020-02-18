import Api from 'api'

export default {
  namespaced: true,

  state: () => ({
    models: [],
    site: {
      description: 'A Puzzle site',
      home_page: 0,
      name: 'Puzzle',
    },
  }),

  mutations: {
    setModels(state, models) {
      state.models = models
    },

    setSite(state, site) {
      state.site = site
    },

    setUser(state, user) {
      state.user = user
    },
  },

  actions: {
    fetchModels(context) {
      Api.models
        .get()
        .then(models => {
          context.commit('setModels', models)
        })
        .catch(error => {
          console.error('[admin.store.fetchModels] =>', error)
          return Promise.reject(error)
        })
    },

    fetchSite(context) {
      Api.site
        .get()
        .then(data => {
          context.commit('setSite', data)
        })
        .catch(error => {
          console.error('[admin.store.fetchSite] =>', error)
          return Promise.reject(error)
        })
    },
  },
}
