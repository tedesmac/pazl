import Api from 'api'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default () =>
  new Vuex.Store({
    state: () => ({
      models: [],
      site: null,
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

      fetchSite() {},

      fetchUser() {},
    },
  })
