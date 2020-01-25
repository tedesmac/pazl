const audio_re = /^audio\/(acc|(x-)?m(idi|peg)|o(gg|pus)|w(av|eba))$/i
const file_re = new RegExp(
  '^application/(epub+zip|g?zip|msword|(pd|rt)f|vnd.' +
    '(ms-(excel|powerpoint)' +
    '|oasis.opendocument.(presentation|spreadsheet|text)' +
    '|openxmlformats-officedocument.(presentation|spreadsheet|wordprocessing)' +
    'ml.(presentation|sheet|document))' +
    '|x-(7z|abiword|bzip2?|rar-compressed|tar))$',
  'i'
)
const image_re = /^image\/(gif|jpeg|png|svg\+xml|webp)$/i

export const genId = (
  length = 8,
  charMap = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
) => {
  let id = ''
  for (let i = 0; i < length; i++) {
    const n = Math.floor(Math.random() * charMap.length)
    id += charMap[n]
  }
  return id
}

export const isAudio = mime => audio_re.test(mime)

export const isFile = mime => file_re.test(mime)

export const isImage = mime => image_re.test(mime)

export const routes = {
  admin: '/puzzle/admin/',
  api: '/puzzle/api/',
  editor: '/puzzle/editor/',
  login: '/puzzle/login',
}
