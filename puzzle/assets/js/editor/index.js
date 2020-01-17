import App from 'components/app'
import { rootComponent } from 'utils'
import Vue from 'vue'
import Router from './router'

rootComponent({
  components: { App },
  el: '#app',
  router: Router(),
  template: '<App />',
})
