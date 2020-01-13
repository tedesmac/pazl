import Vue from 'vue'
import VueRouter from 'vue-router'

const Blocks = () =>
  import(/* webpackChunkName: 'adminBlocks' */ 'components/admin/blocks')
const Images = () =>
  import(/* webpackChunkName: 'adminImages' */ 'components/admin/images')
const Entries = () =>
  import(/* webpackChunkName: 'adminEntries' */ 'components/admin/entries')
const Models = () =>
  import(/* webpackChunkName: 'adminModels' */ 'components/admin/models')
const Pages = () =>
  import(/* webpackChunkName: 'adminPages' */ 'components/admin/pages')
const SettingsGeneral = () =>
  import(
    /* webpackChunkName: 'adminSettingsGeneral' */ 'components/admin/settings-general'
  )
const SettingsProfile = () =>
  import(
    /* webpackChunkName: 'adminSettingsProfile' */ 'components/admin/settings-profile'
  )
const SettingsUsers = () =>
  import(
    /* webpackChunkName: 'adminSettingsUsers' */ 'components/admin/settings-users'
  )

Vue.use(VueRouter)

const routes = [
  {
    component: Blocks,
    path: '/puzzle/admin/blocks',
    name: 'blocks',
  },
  {
    component: Images,
    path: '/puzzle/admin/images',
    name: 'images',
  },
  {
    component: Entries,
    path: '/puzzle/admin/entries/:model',
    name: 'entries',
    props: route => {
      model: route.params.model
    },
  },
  {
    component: Models,
    path: '/puzzle/admin/models',
    name: 'models',
  },
  {
    components: Pages,
    path: '/puzzle/admin/pages',
    name: 'pages',
  },
  {
    component: SettingsGeneral,
    path: '/puzzle/admin/settings/general',
    name: 'settingsGeneral',
  },
  {
    component: SettingsProfile,
    path: '/puzzle/admin/settings/profile',
    name: 'settingsProfile',
  },
  {
    component: SettingsUsers,
    path: '/puzzle/admin/settings/users',
    name: 'settingsUsers',
  },
]

export default () =>
  new VueRouter({
    mode: 'history',
    routes,
  })
