import App from 'components/app'
import Editor from 'components/editor'
import Siderbar from 'components/editor/sidebar'
import Topbar from 'components/editor/topbar'
import Workspace from 'components/editor/workspace'
import { rootComponent } from 'utils'
import Vue from 'vue'
import Router from './router'

Vue.component('Editor', Editor)
Vue.component('Sidebar', Siderbar)
Vue.component('Topbar', Topbar)
Vue.component('Workspace', Workspace)

rootComponent({
  components: { App },
  el: '#app',
  router: Router(),
  template: '<App />',
})
