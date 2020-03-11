const common = {
  collection: 'collection',
  image: 'image',
  markdown: 'markdown',
  string: 'string',
  table: 'table',
}

export const blockTypes = {
  ...common,
  carousel: 'carousel',
  feed: 'feed',
  html: 'html',
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

export const modelTypes = {
  ...common,
  date: 'date',
  number: 'number',
}

export const settingTypes = {
  ...modelTypes,
  code: 'code',
  color: 'color',
  embed: 'embed',
  multinumber: 'multinumber',
  option: 'option',
}
