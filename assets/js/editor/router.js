import Vue from 'vue'
import VueRouter from 'vue-router'
import Editor from 'components/editor'

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
    component: Editor,
    path: '/puzzle/editor',
    children: [
      {
        component: Block,
        path: 'block',
      },
      {
        component: Entry,
        path: 'entry',
      },
      {
        component: Model,
        path: 'model',
      },
      {
        component: Page,
        path: 'page',
      },
    ],
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
