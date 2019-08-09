import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import Layout from '../views/layout/Layout'
export const constantRoutes = [
  {
    path: "*",
    component: () => import('../views/error/error.vue')
  },
  {
    path: '/login',
    component: () => import('../views/login/login')
  },
  {
    path: '/register',
    component: () => import('../views/register/register')
  },
  {
    path: '/find',
    component: () => import('../views/find-pass/find')
  },
  {
    path: '/reset',
    component: () => import('../views/reset-pass/reset')
  },
  {
    path: '',
    component: Layout,
    redirect: '',
    children: [
      {
        path: '',
        component: () => import('../views/index/index'),
        name: 'Index',
        meta: { title: '考试猫' }
      },
      {
        path: 'about',
        component: () => import('../views/about/about'),
        name: 'About',
        meta: { title: '考试猫' }
      },
      {
        path: 'down',
        component: () => import('../views/download/download'),
        name: 'down',
        meta: { title: '考试猫' }
      },
      {
        path: 'contact',
        component: () => import('../views/contact/contact'),
        name: 'Contact',
        meta: { title: '考试猫' }
      },
      {
        path: 'error',
        component: () => import('../views/error/error'),
        name: 'Error',
        meta: { title: 'error' }
      },
      {
        path: 'set-volume',
        component: () => import('../views/set-volume/set-volume'),
        meta: { title: '考试猫' },
        redirect: 'set-volume/smart',
        children:[
          {
            path: 'mine',
            component: () => import('../views/set-volume/mine/mine')
          },
          {
            path: 'smart',
            component: () => import('../views/set-volume/smart/smart')
          },
        ]
      },
      {
        path: 'user',
        component: () => import('../views/set-volume/set-volume'),
        meta: { title: '考试猫' },
        redirect: 'user/set',
        children:[
          {
            path: 'set',
            component: () => import('../views/user/set/set.vue')
          },
          {
            path: 'edit-pass',
            component: () => import('../views/user/edit-pass/edit-pass.vue')
          },
          {
            path: 'wrong',
            component: () => import('../views/user/wrong/wrong.vue')
          },
          {
            path: 'collection',
            component: () => import('../views/user/collection/collection.vue')
          },
        ]
      },
      {
        path: 'entry',
        component: () => import('../views/set-volume/set-volume'),
        meta: { title: '考试猫' },
        redirect: 'entry/entrying',
        children:[
          {
            path: 'entrying',
            component: () => import('../views/entry/entrying/entrying')
          },
          {
            path: 'entryed',
            component: () => import('../views/entry/entryed/entryed')
          },
        ]
      },
      {
        path: 'online',
        component: () => import('../views/online/online'),
        name: 'Online',
        redirect: 'online/select',
        meta: { title: '考试猫' },
        children:[
          {
            path: 'select',
            component: () => import('../views/online/select/select')
          },
          {
            path: 'practice/:type',
            name: 'onlinePract',
            component: () => import('../views/online/practice/practice'),
          },
          {
            path: 'simulation',
            component: () => import('../views/online/simulation/simulation'),
            meta: { title: '考试猫' }
          },
          {
            path: 'result',
            component: () => import('../views/online/simulation/result'),
            meta: { title: '考试猫' }
          },
          {
            path: 'search',
            component: () => import('../views/online/search/search'),
            meta: { title: '考试猫' }
          },
          {
            path: 'search-result/:id',
            component: () => import('../views/online/search/result.vue'),
            meta: { title: '考试猫' }
          }
        ]
      },
      
    ]
  }
]
export default new Router({
  mode: 'history',
  routes: constantRoutes
})
