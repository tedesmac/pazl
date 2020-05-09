import Axios from 'axios'

Axios.defaults.baseURL = `/${PAZL_BASE_PATH}/api/`
Axios.defaults.withCredentials = true

const TOKEN_NAME = 'puzzle_token'

const calls = {
  delete: (url, data) => {
    const { id, ...params } = data
    return Axios.delete(`${url}${id}/`, params)
      .then(response => response.data)
      .catch(error => {
        console.error(`[api.delete.${url}] =>`, error)
        try {
          return Promise.reject(error.response.data)
        } catch {
          return Promise.reject(error)
        }
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
        try {
          return Promise.reject(error.response.data)
        } catch {
          return Promise.reject(error)
        }
      })
  },

  post: (url, data) =>
    Axios.post(url, data)
      .then(response => response.data)
      .catch(error => {
        console.error(`[api.post.${url}] =>`, error)
        try {
          return Promise.reject(error.response.data)
        } catch {
          return Promise.reject(error)
        }
      }),

  put: (url, data) => {
    const { id, ...params } = data
    return Axios.put(`${url}${id}/`, params)
      .then(response => response.data)
      .catch(error => {
        console.error(`[api.put.${url}] =>`, error)
        try {
          return Promise.reject(error.response.data)
        } catch {
          return Promise.reject(error)
        }
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

const me = {
  get: () =>
    Axios.get('me/')
      .then(response => response.data)
      .catch(error => {
        console.error('[api.me.get] =>', error)
        try {
          return Promise.reject(error.response.data)
        } catch {
          return Promise.reject(error)
        }
      }),
}

const site = {
  get: () =>
    Axios.get('site/')
      .then(response => response.data)
      .catch(error => {
        console.error('[api.site.get] =>', error)
        return Promise.reject(error)
      }),
  put: (data = {}) =>
    Axios.put('site/', data)
      .then(response => response.data)
      .catch(error => {
        console.error('[api.site.put] =>', error)
        return Promise.reject(error)
      }),
  logo: {
    get: () =>
      Axios.get('site/logo/')
        .then(response => response.data)
        .catch(error => {
          console.error('[api.site.logo.get]', error)
          try {
            return Promise.reject(error.response.data)
          } catch {
            return Promise.reject(error)
          }
        }),
    post: (data = {}) =>
      Axios.post('site/logo/', data)
        .then(response => response.data)
        .catch(error => {
          console.error('[api.site.logo.put]', error)
          try {
            return Promise.reject(error.response.data)
          } catch {
            return Promise.reject(error)
          }
        }),
  },
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
  blocks: apiFactory('blocks/'),
  entries: apiFactory('entries/'),
  files: apiFactory('files/'),
  images: apiFactory('images/'),
  models: apiFactory('models/'),
  pages: apiFactory('pages/'),
  users: apiFactory('users/'),
  me,
  site,
  token,
}
