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
  code: (args = {}) => settingFactory(T.code, { value: '', ...args }),

  collection: (args = {}) =>
    settingFactory(T.collection, {
      value: 'entry',
      options: ['entry', 'image'],
      ...args,
    }),

  color: (value = '#000', args = {}) =>
    settingFactory(T.color, { value, ...args }),

  date: (value = new Date().toISOString(), args = {}) =>
    settingFactory(T.date, { value, ...args }),

  embed: (args = {}) => settingFactory(T.embed, { value: '', ...args }),

  image: (args = {}) => settingFactory(T.image, { value: '', ...args }),

  markdown: (args = {}) => settingFactory(T.markdown, { value: '', ...args }),

  multinumber: (
    value = 0,
    children = [],
    units = [],
    parse = null,
    args = {}
  ) =>
    settingFactory(T.multinumber, {
      global: true,
      value,
      children,
      units,
      parse,
      ...args,
    }),

  number: (value = 0, units = [], parse = null, args = {}) =>
    settingFactory(T.number, { value, units, parse, ...args }),

  option: (options = [], args = {}) =>
    settingFactory(T.option, { value: options[0], options, ...args }),

  string: (args = {}) => settingFactory(T.string, { value: '', ...args }),

  table: (args = {}) => settingFactory(T.table, { value: [], ...args }),
}
