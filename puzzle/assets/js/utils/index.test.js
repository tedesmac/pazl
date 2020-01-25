import { isAudio, isFile, isImage } from './index'

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
