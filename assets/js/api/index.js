import Axios from 'axios'

const TOKEN_NAME = 'puzzle_token'

/**
 */
const token = {
  post: (credentials = {}) => {
    const token = window.localStorage.getItem(TOKEN_NAME)
    return Axios.post('/puzzle/api/token/', { ...credentials, token })
      .then(response => {
        const token = response.data.token
        window.localStorage.setItem(TOKEN_NAME, token)
        return true
      })
      .catch(error => {
        return false
      })
  },
}

export default {
  token,
}
