const PrerenderSPAPlugin = require('prerender-spa-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
const path = require('path');
const CompressionPlugin = require("compression-webpack-plugin");
module.exports = {
  transpileDependencies: [],
  lintOnSave: false,
  assetsDir:'web-static-app',
  runtimeCompiler: false, //是否使用包含运行时编译器的 Vue 构建版本
	productionSourceMap: false, //生产环境是否生成 sourceMap 文件，一般情况不建议打开
  chainWebpack: config => {
    config.plugins.delete('prefetch')  //移除Prefetch link(js/css)
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV !== 'production') return;
    return {
      plugins: [
      ]
    };
  },
  css: {
		modules: false,
		extract: true,
		sourceMap: false,
  },
  devServer: {
		port: 8888,
		https: false,
		open: false,
		hotOnly: true
	}
}

