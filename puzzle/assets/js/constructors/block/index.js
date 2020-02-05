import { direction, settingTypes as T } from '@/constants'
import settings, { isSetting } from '@/constructors/setting'

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
  height: settings.number(0, ['em', '%', 'px']),
  flexGrow: settings.number(),
  margin: settings.multinumber(
    'auto',
    ['bottom', 'left', 'right', 'top'],
    ['em', '%', 'px'],
    numberedUnitEval
  ),
  padding: settings.multinumber(
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

const block = source => deepMerge(defaultBlock, source)

const blockSettings = {
  collection: () =>
    block({
      data: settings.collection(),
    }),

  container: () =>
    block({
      data: settings.option(directions, direction.horizontal),
      style: {
        flexWrap: settings.option(['wrap', 'no-wrap'], 'wrap'),
      },
    }),

  html: () =>
    block({
      data: settings.code(),
    }),

  image: () =>
    block({
      data: {
        alt: settings.string(),
        src: settings.image(),
      },
    }),

  markdown: () =>
    block({
      data: settings.markdown(),
      style: {
        fontSize: settings.number(1, ['em', 'px']),
      },
    }),

  spacer: () => ({
    style: {
      flexGrow: settings.number(),
    },
  }),

  string: () =>
    block({
      data: settings.string(),
    }),

  table: () =>
    block({
      data: settings.table(),
    }),
}

export const settingsToBlock = object => {
  const keys = Object.keys(object)
  return keys.reduce((acc, key) => {
    const current = object[key]
    const { type } = current
    if (isSetting(type)) {
      acc[key] = current.value
    } else if (
      typeof object[key] === 'object' &&
      Object.keys(current).length > 0
    ) {
      acc[key] = settingsToBlock(current)
    } else {
      acc[key] = current
    }
    return acc
  }, {})
}

const hydrateSettings = (block, settings) => {
  const keys = Object.keys(settings)
  return keys.reduce((acc, key) => {
    const { type } = block[key]
    if (isSetting(type)) {
      acc[key] = {
        ...settings[key],
        value: block[key],
      }
    } else if (
      typeof block[key] === 'object' &&
      Object.keys(object).length > 0
    ) {
      acc[key] = hydrateSettings(block[key], settings[key])
    } else {
      acc[key] = settings[key]
    }
    return acc
  }, {})
}

export const mergeBlockToSettings = block =>
  hydrateSettings(block, blockSettings[block.type]())

export const initBlock = type => ({
  ...settingsToBlock(blockSettings[type]()),
  style: {},
})
