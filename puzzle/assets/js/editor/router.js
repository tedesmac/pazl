import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Block = () =>
  import(
    /* webpackChunkName: 'blockEditor' */
    'components/editor/block'
  )
const Entry = () =>
  import(
    /* webpackChunkName: 'entryEditor' */
    'components/editor/entry'
  )
const Model = () =>
  import(
    /* webpackChunkName: 'modelEditor' */
    'components/editor/model'
  )
const Page = () =>
  import(
    /* webpackChunkName: 'modelEditor' */
    'components/editor/page'
  )
const NotFound = () =>
  import(
    /* webpackChunkName: '404' */
    'components/404'
  )

const routes = [
  {
    component: Block,
    path: '/puzzle/editor/block',
  },
  {
    component: Entry,
    path: '/puzzle/editor/entry',
  },
  {
    component: Model,
    path: '/puzzle/editor/model',
    props: route => ({
      id: Number(route.query.id) || 0,
    }),
  },
  {
    component: Page,
    path: '/puzzle/editor/page',
    props: route => ({
      id: Number(route.query.id) || 0,
    }),
  },
  {
    component: NotFound,
    path: '/puzzle/editor',
    props: {
      admin: true,
    },
  },
  {
    component: NotFound,
    path: '/puzzle/editor/*',
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
