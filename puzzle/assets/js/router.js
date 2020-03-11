import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const entry_route_re = /^\/[^/]+\/(\d+)\/[^/]+\/?$/

// Admin Components

const Admin = () =>
  import(
    /* webpackChunkName: 'admin' */
    'components/admin'
  )
const AdminBlocks = () =>
  import(
    /* webpackChunkName: 'adminBlocks' */
    'components/admin/blocks'
  )
const AdminImages = () =>
  import(
    /* webpackChunkName: 'adminImages' */
    'components/admin/images'
  )
const AdminEntries = () =>
  import(
    /* webpackChunkName: 'adminEntries' */
    'components/admin/entries'
  )
const AdminModels = () =>
  import(
    /* webpackChunkName: 'adminModels' */
    'components/admin/models'
  )
const AdminPages = () =>
  import(
    /* webpackChunkName: 'adminPages' */
    'components/admin/pages'
  )
const AdminUpload = () =>
  import(
    /* webpackChunkName: 'adminUpload' */
    'components/admin/upload'
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

// Editor Components

const BlockEditor = () =>
  import(
    /* webpackChunkName: 'blockEditor' */
    'components/editor/block'
  )
const EntryEditor = () =>
  import(
    /* webpackChunkName: 'entryEditor' */
    'components/editor/entry'
  )
const ModelEditor = () =>
  import(
    /* webpackChunkName: 'modelEditor' */
    'components/editor/model'
  )
const PageEditor = () =>
  import(
    /* webpackChunkName: 'pageEditor' */
    'components/editor/page'
  )

// Login Component

const Login = () =>
  import(
    /* webpackChunkName: 'login' */
    'components/login'
  )

// Page component

const Page = () =>
  import(
    /* webpackChunkName: 'page' */
    'components/page'
  )

// 404 component

const NotFound = () =>
  import(
    /* webpackChunkName: '404' */
    'components/404'
  )

// Routes

const routes = [
  // Admin
  {
    component: Admin,
    path: '/puzzle/admin',
    name: 'admin',
    children: [
      {
        component: AdminBlocks,
        path: 'blocks',
        name: 'adminBlocks',
      },
      {
        component: AdminImages,
        path: 'images',
        name: 'adminImages',
      },
      {
        component: AdminEntries,
        path: 'entries/:model',
        name: 'adminEntries',
        props: route => ({
          modelId: Number(route.params.model),
        }),
      },
      {
        component: AdminModels,
        path: 'models',
        name: 'adminModels',
      },
      {
        component: AdminPages,
        path: 'pages',
        name: 'adminPages',
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
      {
        component: AdminUpload,
        path: 'upload',
        name: 'upload',
      },
    ],
  },
  // Editor
  {
    component: BlockEditor,
    path: '/puzzle/editor/block',
    props: route => ({
      id: Number(route.query.id) || 0,
      modelId: Number(route.query.model) || 0,
    }),
  },
  {
    component: EntryEditor,
    path: '/puzzle/editor/entry',
    props: route => ({
      id: Number(route.query.id) || 0,
      modelId: Number(route.query.model) || 0,
    }),
  },
  {
    component: ModelEditor,
    path: '/puzzle/editor/model',
    props: route => ({
      id: Number(route.query.id) || 0,
    }),
  },
  {
    component: PageEditor,
    path: '/puzzle/editor/page',
    props: route => ({
      id: Number(route.query.id) || 0,
    }),
  },
  // Login
  {
    component: Login,
    path: '/puzzle/login',
    name: 'login',
  },
  // Other
  {
    component: NotFound,
    path: '/puzzle/*',
    name: 'notFound',
    props: {
      admin: true,
    },
  },
  // Page
  {
    component: Page,
    path: '*',
    name: 'page',
    props: route => {
      let entryId = 0
      const match = route.path.match(entry_route_re)
      if (match) {
        entryId = Number(match[1])
      }
      return {
        entryId,
      }
    },
  },
]

export default () =>
  new VueRouter({
    mode: 'history',
    routes,
  })
