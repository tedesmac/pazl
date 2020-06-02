import Api from '@/api'
import App from '@/components/app'
import Router from '@/router'
import Store from '@/store'
import { capitalize, routes } from '@/utils'
import Vue from 'vue'
import Vuex from 'vuex'
import { sync } from 'vuex-router-sync'

import(
  /* webpackChunkName: 'modal' */
  'vue-js-modal'
).then(_ => {
  Vue.use(_.default, {
    componentName: 'modal',
  })
})

import(
  /* webpackChunkName: 'popover' */
  'vue-js-popover'
).then(_ => {
  Vue.use(_.default, {
    componentName: 'popover',
  })
})

import(
  /* webpackChunkName: 'notification' */
  'vue-notification'
).then(_ => {
  Vue.use(_.default, {
    componentName: 'notifications',
  })
})

Vue.prototype.$api = Api
Vue.prototype.$routes = routes
Vue.prototype.$utils = { capitalize }

const router = Router()

const store = Store()

const stateEl = document.getElementById('pazl-state')
if (stateEl) {
  const state = JSON.parse(stateEl.textContent)
  store.replaceState(state)
  store.commit('setHydrated', true)
}

sync(store, router)

new Vue({
  components: { App },
  el: '#app',
  template: '<App />',
  router,
  store,
})

console.log(`
      \`\`\`\`\`
   \`\`\`\`\`\`\`\`\`\`\`\`\`
.\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`
,,,''\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`
,,,,,,,''-\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`
,,,,,,,,,,,''-\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`
~,,,,,,,,,,,,,,,'-\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`
,,,,,,,,,,,,,,,,,,,,'.\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`
,,,,,,,,,,,,,,,,,,,,,~,,'-\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`
,,,,,,,,";:,~,,,,,,,,,,,,,,,'\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`,
.,,,,,,,~|\\|r;:~,,,,,,,,,,'-\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`.:^\\\\'
\`,,,,,,,,*\\\\\\\\\\|r;:,,,,'\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`';*\\\\\\\\\\'
 ,,,,,,,,r\\\\\\\\\\\\\\\\^  \`\`\`\`\`\`\`\`\`\`\`\`\`\`\`-,;|\\\\\\\\\\\\\\\\,
 ,,,,,,,,^\\\\\\\\\\?;,\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`':^\\\\\\\\\\\\\\\\\\\\\\\\:
 ,,,,,,,~;\\\\^_'\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`,;*\\\\\\\\\\\\\\\\\\\\\\\\\\:
 ,,,,,,,,::\`\`\`\`\`\`\`\`\`\`\`\`\`\`\`-";|\\\\\\\\\\\\\\\\\\\\\\\\|'
 ,,,,,,,,,,,'.\`\`\`\`\`\`\`\`\`-_^|\\\\\\\\\\\\\\\\\\\\\\\\|'
 ,,,,,,,,,,,,,,,'.\`\`':>\\\\\\\\\\\\\\\\\\\\\\\\\\r\`
 ,,,,,,,,,,,,,,,,,,^\\\\\\\\\\\\\\\\\\\\\\\\\\;
 .,,,,,,,,,,,,,,,,~^\\\\\\\\\\\\\\\\\\\\,
 \`,,,,,,,,::~,,,,,~;\\\\\\\\\\\\?\`
  ,,,,,,,,;\\\\>;:~,,:\\\\\\^
  ,,,,,,,,:\\\\\\\\\\|r;::
  ,,,,,,,,:\\\\\\\\\\\\\\\\;
  ,,,,,,,,_\\\\\\\\\\\\\\\\>
  ,,,,,,,,,\\\\\\\\\\\\\\\\\\
  ,,,,,,,,,?\\\\\\\\\\\\\\\\
  ,,,,,,,,,=\\\\\\\\\\\\\\\\
  ,,,,,,,,,r\\\\\\\\\\\\\\\\
    -,,~,,,;\\\\\\\\\\^\`
        ',,;\\\\;


MADE WITH PAZL <PAZL.IO>
`)
