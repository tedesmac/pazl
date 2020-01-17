import Axios from 'axios'

Axios.defaults.baseURL = '/puzzle/api/'
Axios.defaults.withCredentials = true

const TOKEN_NAME = 'puzzle_token'

const calls = {
  delete: (url, data) => {
    const { id, ...params } = data
    return Axios.delete(`${url}${id}/`, params)
      .then(response => response.data)
      .catch(error => {
        console.error(`[api.put.${url}] =>`, error)
        return Promise.reject(error)
      })
  },

  get: (url, data) => {
    const { id = null, ...params } = data
    let newUrl = url
    if (id) {
      newUrl = `${url}${id}/`
    }
    return Axios.get(newUrl, { params })
      .then(response => response.data)
      .catch(error => {
        console.error(`[api.get.${url}] =>`, error)
        return Promise.reject(error)
      })
  },

  post: (url, data) =>
    Axios.post(url, data)
      .then(response => response.data)
      .catch(error => {
        console.error(`[api.get.${url}] =>`, error)
        return Promise.reject(error)
      }),

  put: (url, data) => {
    const { id, ...params } = data
    return Axios.put(`${url}${id}/`, params)
      .then(response => response.data)
      .catch(error => {
        console.error(`[api.put.${url}] =>`, error)
        return Promise.reject(error)
      })
  },
}

const apiFactory = (url, methods = ['delete', 'get', 'post', 'put']) => {
  const api = {}

  methods.forEach(method => {
    api[method] = (data = {}) => calls[method](url, data)
  })

  return api
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

export default {
  models: apiFactory('models/'),
  site,
  token,
}
