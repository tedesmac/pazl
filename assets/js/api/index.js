import Axios from 'axios'

const TOKEN_NAME = 'puzzle_token'

/**
 */
const authenticate = (credentials = {}) => {
  const token = window.localStorage.getItem(TOKEN_NAME)
  return Axios.post('/puzzle/login/', { ...credentials, token })
    .then(response => {
      const token = response.data.token
      console.log('token =>', token)
      window.localStorage.setItem(TOKEN_NAME, token)
      return true
    })
    .catch(error => {
      return false
    })
}

export default {
  authenticate,
}
