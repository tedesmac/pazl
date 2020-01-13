import { authenticate } from 'api'

authenticate()
  .then(loged => {
    if (loged) {
      window.location = '/puzzle/admin/'
    } else {
      window.location = '/puzzle/login/'
    }
  })
  .catch(error => {
    console.error('[root] =>', error)
  })
