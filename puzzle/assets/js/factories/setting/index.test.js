import { blockTypes as B, settingTypes as T } from '@/constants'
import settingConstructor, { isSetting } from './index'

describe('[constructors.setting.isSetting]', () => {
  test('code', () => {
    expect(isSetting(T.code)).toBeTrue
  })

  test('color', () => {
    expect(isSetting(T.color)).toBeTrue
  })

  test('collection', () => {
    expect(isSetting(T.collection)).toBeTrue
  })

  test('date', () => {
    expect(isSetting(T.date)).toBeTrue
  })

  test('embed', () => {
    expect(isSetting(T.embed)).toBeTrue
  })

  test('image', () => {
    expect(isSetting(T.image)).toBeTrue
  })

  test('markdown', () => {
    expect(isSetting(T.markdown)).toBeTrue
  })

  test('multinumber', () => {
    expect(isSetting(T.multinumber)).toBeTrue
  })

  test('number', () => {
    expect(isSetting(T.number)).toBeTrue
  })

  test('option', () => {
    expect(isSetting(T.option)).toBeTrue
  })

  test('string', () => {
    expect(isSetting(T.string)).toBeTrue
  })

  test('table', () => {
    expect(isSetting(T.table)).toBeTrue
  })

  test('block.container', () => {
    expect(isSetting(B.container)).toBeFalse
  })

  test('block.html', () => {
    expect(isSetting(B.html)).toBeFalse
  })

  test('block.spacer', () => {
    expect(isSetting(B.spacer)).toBeFalse
  })
})
