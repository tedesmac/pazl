import { direction, settingTypes as T } from '@/constants'
import settings, { isSetting } from '@/factories/setting'
import { deepMerge, genId } from '@/utils'

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

const blockSettingsConstructor = {
  collection: () =>
    block({
      data: settings.collection(),
    }),

  container: () =>
    block({
      data: {
        direction: settings.option(directions, direction.horizontal),
      },
      style: {
        flexWrap: settings.option(['wrap', 'no-wrap'], 'wrap'),
      },
    }),

  html: () =>
    block({
      data: {
        content: settings.code(),
      },
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
      data: {
        content: settings.markdown(),
      },
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
      data: {
        content: settings.string(),
      },
    }),

  table: () =>
    block({
      data: {
        content: settings.table(),
      },
    }),
}

const hydrateSettings = (block, settings) =>
  Object.keys(settings).reduce((acc, key) => {
    const { settingType } = settings[key]
    if (isSetting(settingType)) {
      acc[key] = {
        ...settings[key],
        value: block[key],
      }
    } else if (
      typeof block[key] === 'object' &&
      Object.keys(block[key]).length > 0
    ) {
      acc[key] = hydrateSettings(block[key], settings[key])
    } else {
      acc[key] = settings[key]
    }
    return acc
  }, {})

export const mergeBlockToSettings = block =>
  hydrateSettings(block, blockSettingsConstructor[block.type]())

const settingsToBlock = object =>
  Object.keys(object).reduce((acc, key) => {
    const current = object[key]
    const { settingType } = current
    if (isSetting(settingType)) {
      acc[key] = current.value
    } else if (
      typeof object[key] === 'object' &&
      Object.keys(current).length > 0
    ) {
      if (key === 'style') {
        acc[key] = {}
      } else {
        acc[key] = settingsToBlock(current)
      }
    } else {
      acc[key] = current
    }
    return acc
  }, {})

export default type => ({
  ...settingsToBlock(blockSettingsConstructor[type]()),
  id: genId(),
  type,
})
