const pkg = require('./package')
// const axios = require('axios')
// const webpack = require('webpack')
// var ExtractTextPlugin = require("extract-text-webpack-plugin")
module.exports = {
  mode: 'universal',
  dev: (process.env.NODE_ENV !== 'production'),
  env: {
    baseUrl: process.env.NODE_ENV === 'production'? 'http://develop.api.kaoshimao.com': (process.env.BASE_URL || 'http://develop.api.kaoshimao.com')
  },
  /*
  ** Headers of the page
  */
  head: {
    title: '考试猫-国家电网安规考试(综合练习)|练习题库|配电线路题库|电工考试题库|模拟考试题库_考试猫',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'keywords', name: 'keywords', content: pkg.keywords },
      { hid: 'description', name: 'description', content: pkg.description }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#f93' },

  /*
  ** Global CSS
  */
  css: [
    'assets/styles/index.scss',
    'element-ui/lib/theme-chalk/index.css',
    'quill/dist/quill.snow.css',
    'quill/dist/quill.bubble.css',
    'quill/dist/quill.core.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    // '@/plugins/element-ui',
    { src: '@/plugins/element-ui', ssr: true},
    { src: '@/plugins/nuxt-quill-plugin', ssr: false}
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
  ],

  /*
  ** Build configuration
  */
  build: {
    // plugins: [
    //   new ExtractTextPlugin("style.css")
    // ],
    vendor: ['axios',
      'element-ui',
      'vue-quill-editor'
    ],
    transpile: [/^element-ui/],
    
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    },
  },
  generate: {
    // routes: function () {
    //   return axios.get('http://develop.api.kaoshimao.com/questions/all')
    //   .then((res) => {
    //     return res.data.map((item) => {
    //       return '/search/' + item.id
    //     })
    //   })
    // }
  }
}
