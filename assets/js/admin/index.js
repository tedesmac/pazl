import Admin from 'components/admin'
import { rootComponent } from 'utils'
import Router from './router'

rootComponent({
  components: { Admin },
  el: '#admin',
  router: Router(),
  template: '<Admin />',
})
