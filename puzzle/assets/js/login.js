import Login from 'components/login'
import { rootComponent } from 'utils'

rootComponent({
  components: { Login },
  el: '#login',
  template: '<Login />',
})
