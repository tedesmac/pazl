import { genId } from '@/utils'

const blockSetters = {
  carousel: ['carousel'],

  container: ['direction', 'alignment'],

  feed: ['feed'],

  markdown: ['font'],

  spacer: ['direction'],

  string: ['font'],

  text: ['fontStyle'],
}

export const setters = type => {
  if (type in blockSetters) {
    return blockSetters[type]
  }
  return []
}

export default type => ({
  id: genId(),
  data: {},
  mobileStyle: {},
  style: {},
  type,
})
