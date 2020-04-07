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
  container: () => block('container', ['direction', 'alignment']),

  markdown: () => block('markdown', ['fontStyle']),

  string: () => block('string', ['fontStyle']),

  text: () => block('text', ['fontStyle']),
}

export default type => {
  if (type in blockFactories) {
    return blockFactories[type]()
  }
  return block(type)
}
