import App from 'components/app'
import { rootComponent } from 'utils'
import Router from './router'

rootComponent({
  components: { App },
  el: '#app',
  router: Router(),
  template: '<App />',
})
