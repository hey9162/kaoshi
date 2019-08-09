import Vue from 'vue'
import store from './store'
import ElementUI from 'element-ui'
import VueTouch from 'vue-touch'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import './utils/rem-init'
import MetaInfo from 'vue-meta-info'
import './assets/styles/index.scss'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import VueQuillEditor from 'vue-quill-editor'
Vue.use(ElementUI, { size: 'small', zIndex: 3000 })
import './assets/styles/element-variables.scss'

import  FastClick  from  'fastclick'
// FastClick.attach(document.body);

Vue.use(MetaInfo)
Vue.use(VueQuillEditor)
Vue.use(VueTouch, {name: 'v-touch'})
Vue.prototype.window = window
import router from './router'
new Vue({
  router,
  store,
  mounted: function() {
    document.dispatchEvent(new Event('render-event'))
  },
  render: h => h(App)
}).$mount('#app')


/**
 * 需要登录的路由path
 */
let hasLoginPathArr = ['/set-volume/mine','/set-volume/smart','/entry/entrying','/entry/entryed',
'/user-center/center'];
let checkLogin = toPath =>{
  return hasLoginPathArr.indexOf(toPath) > -1
};
router.beforeEach((to,from,next)=>{
  if(checkLogin(to.path)){
    if(localStorage.getItem('token')){
      next();
    }else{
      next({path:'/login'});
    }
  } else{
    next();
  }
});