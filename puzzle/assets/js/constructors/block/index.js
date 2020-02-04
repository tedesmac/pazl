import { direction } from '@/constants'
import settings from '@/constructors/setting'

const directions = Object.keys(direction)

const addFontSize = (obj = {}) => ({
  fontSize: settings.number('1', ['em', 'px']),
  ...obj,
})

const numberedUnitEval = (val, unit) => {
  if (unit === 'auto') {
    return unit
  }
  return `${val}${unit}`
}

const defaultStyle = {
  background: settings.color('#fff'),
  color: settings.color(),
  height: settings.multinumber(0, ['em', '%', 'px']),
  flexGrow: settings.number(),
  margin: settings.multinumber(
    'auto',
    ['bottom', 'left', 'right', 'top'],
    ['em', '%', 'px'],
    numberedUnitEval
  ),
  padding: settings.number(
    'auto',
    ['bottom', 'left', 'right', 'top'],
    ['auto', 'em', '%', 'px'],
    numberedUnitEval
  ),
  width: settings.number(0, ['em', '%', 'px']),
}

const defaultBlock = {
  data: {},
  style: defaultStyle,
}

export const deepMerge = (base, source) => {
  const baseKeys = Object.keys(base)
  const sourceKeys = Object.keys(source)
  const commonKeys = sourceKeys.filter(k => baseKeys.includes(k))
  const uniqueBaseKeys = baseKeys.filter(k => !commonKeys.includes(k))
  const uniqueSourceKeys = sourceKeys.filter(k => !commonKeys.includes(k))

  let merged = {}

  commonKeys.forEach(k => {
    if (Array.isArray(base[k]) && Array.isArray(source[k])) {
      merged[k] = [...base[k], ...source[k]]
    } else if (typeof base[k] === 'object' && typeof source[k] === 'object') {
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

const block = source => deepMerge(defaultBlock, source)

const container = () =>
  block({
    data: {
      direction: settings.option(directions, direction.horizontal),
    },
  })

const image = () =>
  block({
    data: {
      alt: settings.string(),
      src: settings.string(),
    },
  })

const markdown = () =>
  block({
    data: {
      content: settings.markdown(),
    },
    style: {
      fontSize: settings.number(1, ['em', 'px']),
    },
  })

const string = () =>
  block({
    data: {
      content: setting.string(),
    },
  })
