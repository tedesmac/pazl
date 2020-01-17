import App from 'components/app'
import { rootComponent } from 'utils'
import { sync } from 'vuex-router-sync'
import Router from './router'
import Store from './store'

const router = Router()
const store = Store()

sync(store, router)

rootComponent({
  components: { App },
  el: '#app',
  template: '<App />',
  router,
  store,
})
