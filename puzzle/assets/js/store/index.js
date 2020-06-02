import Api from '@/api'
import { buildMenu } from '@/utils'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default () =>
  new Vuex.Store({
    state: () => ({
      hydrated: false,
      pages: [],
      site: {
        description: '',
        home_page: 0,
        logo: '',
        name: '',
      },
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
      home_page: state => state.site.home_page,

      menu: state => buildMenu(state.pages, state.site.home_page),

      siteDescription: state => state.site.description,

      siteLogo: state => state.site.logo,

      siteName: state => state.site.name,

      userId: state => {
        if (state.user == null) {
          return 0
        }
        return state.user.id
      },

      username: state => {
        if (state.user == null) {
          return ''
        }
        return state.user.username
      },
    },

    mutations: {
      setHydrated(state, hydrated) {
        state.hydrated = hydrated
      },

      setSiteLogo(state, logo) {
        state.site = {
          ...state.site,
          logo,
        }
      },

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
