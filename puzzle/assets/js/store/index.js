import Api from '@/api'
import { buildMenu } from '@/utils'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default () =>
  new Vuex.Store({
    state: () => ({
      pages: [],
      site: {},
      user: null,
    }),

    actions: {
      fetchPages(context, published = 1) {
        Api.pages
          .get({ published })
          .then(pages => {
            context.commit('setPages', pages)
          })
          .catch(error => {
            console.error('[Store] =>', error)
          })
      },

      fetchSite(context) {
        Api.site
          .get()
          .then(site => {
            context.commit('setSite', site)
          })
          .catch(error => {
            console.error('[Store] =>', error)
          })
      },

      fetchUser(context) {
        Api.me
          .get()
          .then(user => {
            context.commit('setUser', user)
          })
          .catch(error => {
            console.error('[Store] =>', error)
          })
      },
    },

    getters: {
      menu: state => buildMenu(state.pages, state.site.home_page),
    },

    mutations: {
      setPages(state, pages) {
        state.pages = pages
      },

      setSite(state, site) {
        state.site = site
      },

      setUser(state, user) {
        state.user = user
      },
    },
  })
