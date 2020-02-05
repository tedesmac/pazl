import { deepMerge, isAudio, isFile, isImage } from './index'

describe('[utils.deepMerge]', () => {
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
    const expected = { a: ['b'] }
    expect(res).toMatchObject(expected)
  })
})

describe('[utils.isAudio]', () => {
  const tests = [
    ['ACC', 'audio/acc'],
    ['MIDI', 'audio/midi'],
    ['X-MIDI', 'audio/x-midi'],
    ['MP3', 'audio/mpeg'],
    ['OGG Audio', 'audio/ogg'],
    ['OPUS', 'audio/opus'],
    ['WAV', 'audio/wav'],
    ['WEBM Audio', 'audio/weba'],
  ]

  tests.forEach(t => {
    test(t[0], () => {
      expect(isAudio(t[1])).toBeTrue
    })
  })
})

describe('[utils.isFile]', () => {
  const tests = [
    ['EPUB', 'application/epub+zip'],
    ['GZIP', 'application/gzip'],
    ['Microsoft Word', 'application/msword'],
    ['PDF', 'application/pdf'],
    ['Rich Text Format', 'application/rtf'],
    ['Microsoft Excel', 'application/vnd.ms-excel'],
    ['Microsoft Powerpoint', 'application/vnd.ms-powerpoint'],
    [
      'OpenDocument presentation',
      'application/vnd.oasis.opendocument.presentation',
    ],
    [
      'OpenDocument spreadsheet',
      'application/vnd.oasis.opendocument.spreadsheet',
    ],
    ['OpenDocument text', 'application/vnd.oasis.opendocument.text'],
    [
      'Microsoft Powerpoint (OPENXML)',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    ],
    [
      'Microsoft Excel (OPENXML)',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.spreadsheet',
    ],
    [
      'Microsoft Word (OPENXML)',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
    ['7ZIP', 'application/x-7z'],
    ['AbiWord Document', 'application/x-abiword'],
    ['BZip Archive', 'application/x-bzip'],
    ['BZip2 Archive', 'application/x-bzip2'],
    ['RAR Archive', 'application/x-rar-compressed'],
    ['Tape Archive (TAR)', 'application/x-tar'],
    ['ZIP Archive', 'application/x-zip'],
  ]

  tests.forEach(t => {
    test(t[0], () => {
      expect(isFile(t[1])).toBeTrue
    })
  })
})

describe('[utils.isImage]', () => {
  const tests = [
    ['GIF', 'image/gif'],
    ['JPEG', 'image/jpeg'],
    ['PNG', 'image/png'],
    ['SVG', 'image/svg+xml'],
    ['WEBM Image', 'image/webp'],
  ]

  tests.forEach(t => {
    test(t[0], () => {
      expect(isImage(t[1])).toBeTrue
    })
  })
})
