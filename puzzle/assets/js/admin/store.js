import Api from 'api'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default () =>
  new Vuex.Store({
    state: () => ({
      models: [],
      site: {
        description: 'A Puzzle site',
        home_page: 0,
        name: 'Puzzle',
      },
      user: null,
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
          .then(response => {
            context.commit('setModels', response)
          })
          .catch(error => {
            console.error('[admin.store.fetchModels] =>', error)
          })
      },

      fetchSite(context) {
        Api.site
          .get()
          .then(response => {
            context.commit('setSite', response.data)
          })
          .catch(error => {
            console.error('[admin.store.fetchSite] =>', error)
            return Promise.reject(error)
          })
      },

      fetchUser() {},
    },
  })
