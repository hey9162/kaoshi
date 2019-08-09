import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import Layout from '../views/layout/Layout'
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('../views/login/login')
  },
  {
    path: '*',
    component: () => import('../views/error/error.vue')
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
        name: '首页',
        meta: { title: '首页' }
      },
      {
        path: 'select-way/:pId',
        component: () => import('../views/index/select-way'),
        name: 'select',
        meta: { title: '考试猫' }
      },
      {
        path: 'select-ptype',
        component: () => import('../views/index/select-ptype.vue'),
        name: 'ptype',
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
        meta: { title: '考试猫' }
      },
      {
        path: 'set-volume',
        component: () => import('../views/set-volume/set-volume'),
        meta: { title: 'set-volume' },
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
          {
            path: 'succ',
            component: () => import('../views/set-volume/set-succ/set-succ.vue')
          }
        ]
      },
      // {
      //   path: 'user',
      //   component: () => import('../views/set-volume/set-volume'),
      //   meta: { title: 'user' },
      //   redirect: 'user/set',
      //   children:[
      //     {
      //       path: 'set',
      //       component: () => import('../views/user/set/set.vue')
      //     },
      //     {
      //       path: 'edit-pass',
      //       component: () => import('../views/user/edit-pass/edit-pass.vue')
      //     },
      //     {
      //       path: 'wrong',
      //       component: () => import('../views/user/wrong/wrong.vue')
      //     },
      //     {
      //       path: 'collection',
      //       component: () => import('../views/user/collection/collection.vue')
      //     },
      //   ]
      // },

      {
        path: 'user-center',
        component: () => import('../views/set-volume/set-volume'),
        meta: { title: '考试猫' },
        redirect: '/user-center/center',
        children:[
          {
            path: 'center',
            component: () => import('../views/user/center/center.vue')
          },
          {
            path: 'set-info',
            component: () => import('../views/user/set-info/set-info.vue')
          },
          {
            path: 'edit-info',
            component: () => import('../views/user/edit-info/edit-info.vue')
          },
          // {
          //   path: 'edit-pass',
          //   component: () => import('../views/user/edit-pass/edit-pass.vue')
          // },
          // {
          //   path: 'wrong',
          //   component: () => import('../views/user/wrong/wrong.vue')
          // },
          // {
          //   path: 'collection',
          //   component: () => import('../views/user/collection/collection.vue')
          // },
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
            component: () => import('../views/entry/entrying/entrying'),
            meta: { title: '考试猫' }
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
            path: 'practice/:type',
            name: 'onlinePract',
            component: () => import('../views/online/practice/practice'),
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
