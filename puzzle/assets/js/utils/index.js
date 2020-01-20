const charMap = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

export const genId = (length = 8) => {
  let id = ''
  for (let i = 0; i < length; i++) {
    const n = Math.floor(Math.random() * charMap.length)
    id += charMap[n]
  }
  return id
}

export const routes = {
  admin: '/puzzle/admin/',
  api: '/puzzle/api/',
  editor: '/puzzle/editor/',
  login: '/puzzle/login',
}
