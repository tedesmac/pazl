import Api from 'api'

Api.authenticate()
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
