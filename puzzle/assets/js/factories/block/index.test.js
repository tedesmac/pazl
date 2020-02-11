import { direction as D, blockTypes as T } from '@/constants'
import initBlock, { mergeBlockToSettings } from './index'

describe('[initBlock]', () => {
  test('container', () => {
    const block = initBlock(T.container)
    console.log(block)
    expect(block.data).toBe(D.horizontal)
  })

  test('html', () => {
    const block = initBlock(T.html)
    expect(block.data).toBe('')
  })

  test('image', () => {
    const block = initBlock(T.image)
    expect(block.data).toMatchObject({
      alt: '',
      src: '',
    })
  })

  test('markdown', () => {
    const block = initBlock(T.markdown)
    expect(block.data).toBe('')
  })

  test('spacer', () => {
    const block = initBlock(T.spacer)
    expect(block.data).toBe(undefined)
  })

  test('string', () => {
    const block = initBlock(T.string)
    expect(block.data).toBe('')
  })

  test('table', () => {
    const block = initBlock(T.table)
    expect(block.data).toMatchObject([])
  })
})

describe('[mergeBlockToSettings]', () => {
  test('image', () => {
    let block = initBlock(T.image)
    block.data.alt = 'alt'
    block.data.src = 'url'
    const blockSettings = mergeBlockToSettings(block)
    expect(blockSettings.data.alt.value).toBe(block.data.alt)
    expect(blockSettings.data.src.value).toBe(block.data.src)
  })

  test('markdown', () => {
    let block = initBlock(T.markdown)
    block.data = '# Test'
    const blockSettings = mergeBlockToSettings(block)
    expect(blockSettings.data.value).toBe(block.data)
  })
})
