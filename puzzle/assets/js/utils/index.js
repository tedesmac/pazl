import Api from '@/api'

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
const logo_re = /^image\/(png|svg\+xml)$/i

export const buildMenu = (pages, rootId) => {
  const root = pages.reduce((acc, page) => {
    if (page.id === rootId) return page
    return acc
  }, null)
  if (root == null) {
    return {}
  }
  const nonRoot = pages.filter(page => page.id !== rootId)
  const children = pages.filter(page => page.parent === rootId)
  return {
    name: root.name,
    path: root.path,
    children: children.map(page => buildMenu(nonRoot, page.id)),
  }
}

export const deepMerge = (base, source) => {
  const baseKeys = Object.keys(base)
  const sourceKeys = Object.keys(source)
  const commonKeys = sourceKeys.filter(k => baseKeys.includes(k))
  const uniqueBaseKeys = baseKeys.filter(k => !commonKeys.includes(k))
  const uniqueSourceKeys = sourceKeys.filter(k => !commonKeys.includes(k))

  let merged = {}

  commonKeys.forEach(k => {
    if (
      typeof base[k] === 'object' &&
      typeof source[k] === 'object' &&
      !Array.isArray(base[k])
    ) {
      merged[k] = deepMerge(base[k], source[k])
    } else {
      merged[k] = source[k]
    }
  })

  uniqueBaseKeys.forEach(k => {
    merged[k] = base[k]
  })

  uniqueSourceKeys.forEach(k => {
    merged[k] = source[k]
  })

  return merged
}

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

export const isLogo = mime => logo_re.test(mime)

/**
 * Utility function. User defined blocks are cloned as arrays, this function
 * merge the contents of those arrays into the main array "blocks" and sets the
 * right parent for those blocks.
 */
export const mergeArrays = (blocks, rootId = 'root') => {
  const arrays = blocks.filter(e => Array.isArray(e))
  return arrays.reduce(
    (acc, a) => [
      ...acc,
      ...a.map(b => {
        if (b.parent == 'root' && rootId !== 'root') {
          b.parent = rootId
        }
        return b
      }),
    ],
    blocks.filter(e => !Array.isArray(e)).map(b => ({ ...b, parent: rootId }))
  )
}

export const routes = {
  admin: `/${PAZL_BASE_PATH}/admin/`,
  api: `/${PAZL_BASE_PATH}/api/`,
  editor: `/${PAZL_BASE_PATH}/editor/`,
  login: `/${PAZL_BASE_PATH}/login/`,
  media: `/${PAZL_BASE_PATH}/media/`,
  static: `/${PAZL_BASE_PATH}/static/`,
}
