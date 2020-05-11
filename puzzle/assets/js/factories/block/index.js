import { genId } from '@/utils'

const block = (type, setters = []) => ({
  id: genId(),
  data: {},
  mobileStyle: {},
  style: {},
  setters,
  type,
})

const blockFactories = {
  carousel: () => block('carousel', ['carousel']),

  container: () => block('container', ['direction', 'alignment']),

  feed: () => block('feed', ['feed']),

  markdown: () => block('markdown', ['font']),

  spacer: () => block('spacer', ['direction']),

  string: () => block('string', ['font']),

  text: () => block('text', ['fontStyle']),
}

export default type => {
  if (type in blockFactories) {
    return blockFactories[type]()
  }
  return block(type)
}
