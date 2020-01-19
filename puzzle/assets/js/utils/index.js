import Api from 'api'
import Vue from 'vue'

export const routes = {
  admin: '/puzzle/admin/',
  api: '/puzzle/api/',
  editor: '/puzzle/editor/',
  login: '/puzzle/login',
}

import(
  /* webpackChunkName: 'modal' */
  'vue-js-modal'
).then(_ => {
  Vue.use(_.default)
})

Vue.prototype.$api = Api
Vue.prototype.$routes = routes
/**
 * Returns a Vue component with a custom Vue instance. Use it ro create root
 * components.
 */
export const rootComponent = (args = {}) => new Vue(args)
