import { settingTypes as T } from '@/constants'

const settingKeys = Object.keys(T)

export const isSetting = setting => settingKeys.includes(setting)

const settingFactory = (type, args = {}) => {
  if (!isSetting) {
    throw 'setting must be one of constants.settingTypes'
  }

  return {
    ...args,
    settingType: type,
  }
}

export default {
  code: () => settingFactory(T.code, { value: '' }),

  collection: () =>
    settingFactory(T.collection, {
      value: 'entry',
      options: ['entry', 'image'],
    }),

  color: (value = '#000') => settingFactory(T.color, { value }),

  date: (value = new Date().toISOString()) => settingFactory(T.date, { value }),

  embed: () => settingFactory(T.embed, { value: '' }),

  image: () => settingFactory(T.image, { value: '' }),

  markdown: () => settingFactory(T.markdown, { value: '' }),

  multinumber: (value = 0, children = [], units = [], parse = null) =>
    settingFactory(T.multinumber, {
      global: true,
      value,
      children,
      units,
      parse,
    }),

  number: (value = 0, units = [], parse = null) =>
    settingFactory(T.number, { value, units, parse }),

  option: (units = []) => settingFactory(T.option, { value: units[0], units }),

  string: () => settingFactory(T.string, { value: '' }),

  table: () => settingFactory(T.table, { value: [] }),
}
