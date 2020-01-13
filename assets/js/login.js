import Api from 'api'
import Vue from 'vue'
import Login from 'components/login'
import { routes } from 'utils'

Vue.prototype.$api = Api
Vue.prototype.$routes = routes

new Vue({
  components: { Login },
  el: '#login',
  template: '<Login />',
})
