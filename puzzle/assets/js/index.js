import Api from 'api'
import App from 'components/app'
import { routes } from 'utils'
import Vue from 'vue'
import Vuex from 'vuex'
import { sync } from 'vuex-router-sync'
import Router from './router'
import Store from './store'

import(
  /* webpackChunkName: 'modal' */
  'vue-js-modal'
).then(_ => {
  Vue.use(_.default)
})

Vue.prototype.$api = Api
Vue.prototype.$routes = routes

const router = Router()

const store = Store()

sync(store, router)

new Vue({
  components: { App },
  el: '#app',
  template: '<App />',
  router,
  store,
})
