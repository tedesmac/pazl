import { deepMerge } from './index'

describe('[deepMerge]', () => {
  const base = { a: 'a' }
  const source = { b: 'b' }

  test('Empty', () => {
    const res = deepMerge({}, {})
    expect(res).toMatchObject({})
  })

  test('Empty base', () => {
    const res = deepMerge({}, source)
    expect(res).toMatchObject(source)
  })

  test('Empty source', () => {
    const res = deepMerge(base, {})
    expect(res).toMatchObject(base)
  })

  test('Simple merge', () => {
    const res = deepMerge(base, source)
    const expected = { a: 'a', b: 'b' }
    expect(res).toMatchObject(expected)
  })

  test('Deep merge', () => {
    const base = { a: { inner: 'a' } }
    const source = { a: { other: 'b' } }
    const res = deepMerge(base, source)
    const expected = { a: { inner: 'a', other: 'b' } }
    expect(res).toMatchObject(expected)
  })

  test('Array', () => {
    const base = { a: ['a'] }
    const source = { a: ['b'] }
    const res = deepMerge(base, source)
    const expected = { a: ['a', 'b'] }
    expect(res).toMatchObject(expected)
  })
})
