import Axios from 'axios'

Axios.defaults.baseURL = '/puzzle/api/'
Axios.defaults.withCredentials = true

const TOKEN_NAME = 'puzzle_token'

/**
 */
const token = {
  post: (credentials = {}) => {
    const token = window.localStorage.getItem(TOKEN_NAME)
    return Axios.post('token/', { ...credentials, token })
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

const site = {
  get: () =>
    Axios.get('site/')
      .then(_ => _)
      .catch(error => {
        console.error('[api.site.get] =>', error)
        return Promise.reject(error)
      }),
  put: (data = {}) =>
    Axios.put('site/', data)
      .then(_ => _)
      .catch(error => {
        console.error('[api.site.put] =>', error)
        return Promise.reject(error)
      }),
}

export default {
  site,
  token,
}
