import Api from 'api'
import { routes } from 'utils'

Api.token
  .post()
  .then(loged => {
    if (loged) {
      window.location = routes.admin
    } else {
      window.location = routes.login
    }
  })
  .catch(error => {
    console.error('[root] =>', error)
  })
