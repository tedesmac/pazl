import {
  blocksToTree,
  buildMenu,
  deepMerge,
  isAudio,
  isFile,
  isImage,
  mergeEntryToBlock,
  sortBlocksByIndex,
} from './index'

describe('[utils.blocksToTree]', () => {
  const blocks = [
    {
      id: '1',
      index: 0,
      parent: 'root',
    },
    {
      id: '2',
      index: 2,
      parent: '1',
    },
    {
      id: '3',
      index: 1,
      parent: '1',
    },
    {
      id: '4',
      index: 0,
      parent: '1',
    },
    {
      id: '5',
      index: 0,
      parent: '4',
    },
  ]

  const expected = [
    {
      id: '1',
      index: 0,
      parent: 'root',
      children: [
        {
          id: '4',
          index: 0,
          parent: '1',
          children: [
            {
              id: '5',
              index: 0,
              parent: '4',
            },
          ],
        },
        {
          id: '3',
          index: 1,
          parent: '1',
        },
        {
          id: '2',
          index: 2,
          parent: '1',
        },
      ],
    },
  ]

  test('1', () => {
    const tree = blocksToTree(blocks)
    expect(tree).toEqual(expected)
  })
})

describe('[utils.buildMenu]', () => {
  test('0 pages', () => {
    const menu = buildMenu([], null)
    expect(menu).toEqual({})
  })

  test('1 page no root', () => {
    const pages = [
      {
        id: 1,
        name: 'home',
        path: '',
        parent: null,
      },
    ]
    const menu = buildMenu(pages, null)
    expect(menu).toEqual({})
  })

  test('Only root', () => {
    const pages = [
      {
        id: 1,
        name: 'home',
        path: '',
        parent: null,
      },
    ]
    const menu = buildMenu(pages, 1)
    expect(menu).toEqual({
      name: 'home',
      path: '',
      children: [],
    })
  })

  test('Root and 1 page without parent', () => {
    const pages = [
      {
        id: 1,
        name: 'home',
        path: '',
        parent: null,
      },
      {
        id: 2,
        name: 'page',
        path: '/page',
        parent: null,
      },
    ]
    const menu = buildMenu(pages, 1)
    expect(menu).toEqual({
      name: 'home',
      path: '',
      children: [],
    })
  })

  test('Root and 1 children', () => {
    const pages = [
      {
        id: 1,
        name: 'home',
        path: '',
        parent: null,
      },
      {
        id: 2,
        name: 'page',
        path: '/page',
        parent: 1,
      },
    ]
    const menu = buildMenu(pages, 1)
    expect(menu).toEqual({
      name: 'home',
      path: '',
      children: [
        {
          name: 'page',
          path: '/page',
          children: [],
        },
      ],
    })
  })

  test('Complex menu', () => {
    const pages = [
      {
        id: 1,
        name: 'home',
        path: '',
        parent: null,
      },
      {
        id: 2,
        name: 'about',
        path: '/about',
        parent: 1,
      },
      {
        id: 3,
        name: 'contact',
        path: '/contact',
        parent: 1,
      },
      {
        id: 4,
        name: 'blog',
        path: '/blog',
        parent: 1,
      },
      {
        id: 5,
        name: 'Entry 1',
        path: '/blog/entry-1',
        parent: 4,
      },
      {
        id: 6,
        name: 'Entry 2',
        path: '/blog/entry-2',
        parent: 4,
      },
    ]
    const menu = buildMenu(pages, 1)
    expect(menu).toEqual({
      name: 'home',
      path: '',
      children: [
        {
          name: 'about',
          path: '/about',
          children: [],
        },
        {
          name: 'contact',
          path: '/contact',
          children: [],
        },
        {
          name: 'blog',
          path: '/blog',
          children: [
            {
              name: 'Entry 1',
              path: '/blog/entry-1',
              children: [],
            },
            {
              name: 'Entry 2',
              path: '/blog/entry-2',
              children: [],
            },
          ],
        },
      ],
    })
  })
})

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

describe('[utils.mergeEntryToBlock]', () => {
  const block = {
    data: {
      blocks: [
        {
          data: {},
          name: 'Price',
        },
      ],
    },
    id: 1,
    model: 1,
    name: 'Some Block',
  }
  const entry = {
    data: {
      blocks: [
        {
          data: {
            string: '$300',
          },
          name: 'Price',
        },
        {
          data: {
            string: 'Other Value',
          },
          name: 'Other Field',
        },
      ],
    },
    id: 5,
    model: 1,
    name: 'A Entry',
    published: true,
    slug: 'playas',
  }
  const expected = [
    {
      data: {
        string: '$300',
      },
      name: 'Price',
    },
  ]

  test('1', () => {
    const merged = mergeEntryToBlock(entry, block)
    expect(merged).toEqual(expected)
  })
})

describe('[utils.sortBlocksByIndex]', () => {
  const blocks = [{ index: 1 }, { index: 0 }]

  const expected = [{ index: 0 }, { index: 1 }]

  test('1', () => {
    const sorted = blocks.sort(sortBlocksByIndex)
    expect(sorted).toEqual(expected)
  })
})
