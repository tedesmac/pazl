import Admin from 'components/admin'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Blocks = () =>
  import(
    /* webpackChunkName: 'adminBlocks' */
    'components/admin/blocks'
  )
const Images = () =>
  import(
    /* webpackChunkName: 'adminImages' */
    'components/admin/images'
  )
const Entries = () =>
  import(
    /* webpackChunkName: 'adminEntries' */
    'components/admin/entries'
  )
const Models = () =>
  import(
    /* webpackChunkName: 'adminModels' */
    'components/admin/models'
  )
const NotFound = () =>
  import(
    /* webpackChunkName: '404' */
    'components/404'
  )
const Pages = () =>
  import(
    /* webpackChunkName: 'adminPages' */
    'components/admin/pages'
  )
const SettingsProfile = () =>
  import(
    /* webpackChunkName: 'adminSettingsProfile' */
    'components/admin/settings-profile'
  )
const SettingsSite = () =>
  import(
    /* webpackChunkName: 'adminSettingsSite' */
    'components/admin/settings-site'
  )
const SettingsUsers = () =>
  import(
    /* webpackChunkName: 'adminSettingsUsers' */
    'components/admin/settings-users'
  )

const routes = [
  {
    component: Admin,
    path: '/puzzle/admin',
    children: [
      {
        component: Blocks,
        path: 'blocks',
        name: 'blocks',
      },
      {
        component: Images,
        path: 'images',
        name: 'images',
      },
      {
        component: Entries,
        path: 'entries/:model',
        name: 'entries',
        props: route => {
          model: route.params.model
        },
      },
      {
        component: Models,
        path: 'models',
        name: 'models',
      },
      {
        component: Pages,
        path: 'pages',
        name: 'pages',
      },
      {
        component: SettingsProfile,
        path: 'settings/profile',
        name: 'settingsProfile',
      },
      {
        component: SettingsSite,
        path: 'settings/site',
        name: 'settingsSite',
      },
      {
        component: SettingsUsers,
        path: 'settings/users',
        name: 'settingsUsers',
      },
    ],
  },
  {
    component: NotFound,
    path: '/puzzle/admin/*',
    name: 'notFound',
    props: {
      admin: true,
    },
  },
]

export default () =>
  new VueRouter({
    mode: 'history',
    routes,
  })
