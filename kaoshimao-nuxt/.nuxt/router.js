import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'

const _15613f27 = () => interopDefault(import('..\\pages\\down\\index.vue' /* webpackChunkName: "pages_down_index" */))
const _24b7ada3 = () => interopDefault(import('..\\pages\\error\\index.vue' /* webpackChunkName: "pages_error_index" */))
const _15d77134 = () => interopDefault(import('..\\pages\\find-pass\\index.vue' /* webpackChunkName: "pages_find-pass_index" */))
const _507bccbc = () => interopDefault(import('..\\pages\\login\\index.vue' /* webpackChunkName: "pages_login_index" */))
const _b0614dd4 = () => interopDefault(import('..\\pages\\online\\index.vue' /* webpackChunkName: "pages_online_index" */))
const _1b3519f4 = () => interopDefault(import('..\\pages\\register\\index.vue' /* webpackChunkName: "pages_register_index" */))
const _4881a09a = () => interopDefault(import('..\\pages\\reset-pass\\index.vue' /* webpackChunkName: "pages_reset-pass_index" */))
const _240ad744 = () => interopDefault(import('..\\pages\\user\\index.vue' /* webpackChunkName: "pages_user_index" */))
const _d40d7ece = () => interopDefault(import('..\\pages\\entry\\entry.vue' /* webpackChunkName: "pages_entry_entry" */))
const _5e4257ec = () => interopDefault(import('..\\pages\\entry\\entryed\\index.vue' /* webpackChunkName: "pages_entry_entryed_index" */))
const _2ee462ee = () => interopDefault(import('..\\pages\\entry\\entrying\\index.vue' /* webpackChunkName: "pages_entry_entrying_index" */))
const _1861d2ee = () => interopDefault(import('..\\pages\\online\\search\\index.vue' /* webpackChunkName: "pages_online_search_index" */))
const _4e4031cc = () => interopDefault(import('..\\pages\\online\\select\\index.vue' /* webpackChunkName: "pages_online_select_index" */))
const _e8db89a2 = () => interopDefault(import('..\\pages\\online\\simulation\\index.vue' /* webpackChunkName: "pages_online_simulation_index" */))
const _1a81c891 = () => interopDefault(import('..\\pages\\set-volume\\mine\\index.vue' /* webpackChunkName: "pages_set-volume_mine_index" */))
const _98134632 = () => interopDefault(import('..\\pages\\set-volume\\smart\\index.vue' /* webpackChunkName: "pages_set-volume_smart_index" */))
const _a6f46500 = () => interopDefault(import('..\\pages\\user\\collection\\index.vue' /* webpackChunkName: "pages_user_collection_index" */))
const _1af0c602 = () => interopDefault(import('..\\pages\\user\\edit-pass\\index.vue' /* webpackChunkName: "pages_user_edit-pass_index" */))
const _5323bfd4 = () => interopDefault(import('..\\pages\\user\\set\\index.vue' /* webpackChunkName: "pages_user_set_index" */))
const _291322ae = () => interopDefault(import('..\\pages\\user\\wrong\\index.vue' /* webpackChunkName: "pages_user_wrong_index" */))
const _ca91b7e0 = () => interopDefault(import('..\\pages\\online\\simulation\\result.vue' /* webpackChunkName: "pages_online_simulation_result" */))
const _c236137c = () => interopDefault(import('..\\pages\\online\\practice\\_type.vue' /* webpackChunkName: "pages_online_practice__type" */))
const _7a83b8d6 = () => interopDefault(import('..\\pages\\online\\search\\_id.vue' /* webpackChunkName: "pages_online_search__id" */))
const _c4c3c86e = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

Vue.use(Router)

if (process.client) {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual'

    // reset scrollRestoration to auto when leaving page, allowing page reload
    // and back-navigation from other pages to use the browser to restore the
    // scrolling position.
    window.addEventListener('beforeunload', () => {
      window.history.scrollRestoration = 'auto'
    })

    // Setting scrollRestoration to manual again when returning to this page.
    window.addEventListener('load', () => {
      window.history.scrollRestoration = 'manual'
    })
  }
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected and scrollToTop is not explicitly disabled
  if (
    to.matched.length < 2 &&
    to.matched.every(r => r.components.default.options.scrollToTop !== false)
  ) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise((resolve) => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}

export function createRouter() {
  return new Router({
    mode: 'history',
    base: decodeURI('/'),
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,

    routes: [{
      path: "/down",
      component: _15613f27,
      name: "down"
    }, {
      path: "/error",
      component: _24b7ada3,
      name: "error"
    }, {
      path: "/find-pass",
      component: _15d77134,
      name: "find-pass"
    }, {
      path: "/login",
      component: _507bccbc,
      name: "login"
    }, {
      path: "/online",
      component: _b0614dd4,
      name: "online"
    }, {
      path: "/register",
      component: _1b3519f4,
      name: "register"
    }, {
      path: "/reset-pass",
      component: _4881a09a,
      name: "reset-pass"
    }, {
      path: "/user",
      component: _240ad744,
      name: "user"
    }, {
      path: "/entry/entry",
      component: _d40d7ece,
      name: "entry-entry"
    }, {
      path: "/entry/entryed",
      component: _5e4257ec,
      name: "entry-entryed"
    }, {
      path: "/entry/entrying",
      component: _2ee462ee,
      name: "entry-entrying"
    }, {
      path: "/online/search",
      component: _1861d2ee,
      name: "online-search"
    }, {
      path: "/online/select",
      component: _4e4031cc,
      name: "online-select"
    }, {
      path: "/online/simulation",
      component: _e8db89a2,
      name: "online-simulation"
    }, {
      path: "/set-volume/mine",
      component: _1a81c891,
      name: "set-volume-mine"
    }, {
      path: "/set-volume/smart",
      component: _98134632,
      name: "set-volume-smart"
    }, {
      path: "/user/collection",
      component: _a6f46500,
      name: "user-collection"
    }, {
      path: "/user/edit-pass",
      component: _1af0c602,
      name: "user-edit-pass"
    }, {
      path: "/user/set",
      component: _5323bfd4,
      name: "user-set"
    }, {
      path: "/user/wrong",
      component: _291322ae,
      name: "user-wrong"
    }, {
      path: "/online/simulation/result",
      component: _ca91b7e0,
      name: "online-simulation-result"
    }, {
      path: "/online/practice/:type?",
      component: _c236137c,
      name: "online-practice-type"
    }, {
      path: "/online/search/:id",
      component: _7a83b8d6,
      name: "online-search-id"
    }, {
      path: "/",
      component: _c4c3c86e,
      name: "index"
    }],

    fallback: false
  })
}
