import { settingTypes as T } from '@/constants'

const settingFactory = (type, args = {}) => {
  const keys = Object.keys(T)

  if (!keys.includes(type)) {
    throw 'setting must be one of constants.settingTypes'
  }

  return {
    ...args,
    type,
  }
}

export default {
  audio: () => settingFactory(T.audio, { src: '' }),

  collection: () =>
    settingFactory(T.collection, {
      type: 'entry',
      options: ['entry', 'image'],
    }),

  color: (color = '#000') => settingFactory(T.color, { color }),

  date: () => settingFactory(T.date, { date: '' }),

  embed: () => settingFactory(T.embed, { url: '' }),

  file: () => settingFactory(T.file, { src: '' }),

  image: () => settingFactory(T.image, { src: '' }),

  link: (text = '', url = '', isButton = false) =>
    settingFactory(T.link, { isButton, text, url }),

  markdown: () => settingFactory(T.markdown, { content: '' }),

  multinumber: (value = 0, children = [], units = [], parse = null) =>
    settingFactory(T.multinumber, {
      value,
      children,
      units,
      parse,
    }),

  number: (value = 0, units = [], parse = null) =>
    settingFactory(T.number, { value, units, parse }),

  option: (units = [], default_ = '') =>
    settingFactory(T.option, { units, default: default_ }),

  string: () => settingFactory(T.string, { content: '' }),

  table: () => settingFactory(T.table, { values: [] }),

  text: () => settingFactory(T.text, { content: '' }),
}
