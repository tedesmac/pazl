const common = {
  audio: 'audio',
  collection: 'collection',
  date: 'date',
  embed: 'embed',
  file: 'file',
  image: 'image',
  markdown: 'markdown',
  number: 'number',
  string: 'string',
  table: 'table',
  text: 'text',
}

export const blockTypes = {
  ...common,
  container: 'container',
  html: 'html',
  script: 'script',
  spacer: 'spacer',
}

export const direction = {
  horizontal: 'horizontal',
  vertical: 'vertical',
}

export const mode = {
  desktop: 'desktop_view',
  edit: 'edit_view',
  mobile: 'mobile_view',
  tablet: 'tablet_view',
}

export const settingTypes = {
  ...common,
  code: 'code',
  color: 'color',
  multinumber: 'multinumber',
  option: 'option',
}
