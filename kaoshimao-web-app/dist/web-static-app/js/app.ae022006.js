(function(e){function n(n){for(var c,u,o=n[0],d=n[1],h=n[2],i=0,f=[];i<o.length;i++)u=o[i],a[u]&&f.push(a[u][0]),a[u]=0;for(c in d)Object.prototype.hasOwnProperty.call(d,c)&&(e[c]=d[c]);l&&l(n);while(f.length)f.shift()();return r.push.apply(r,h||[]),t()}function t(){for(var e,n=0;n<r.length;n++){for(var t=r[n],c=!0,u=1;u<t.length;u++){var o=t[u];0!==a[o]&&(c=!1)}c&&(r.splice(n--,1),e=d(d.s=t[0]))}return e}var c={},u={app:0},a={app:0},r=[];function o(e){return d.p+"web-static-app/js/"+({}[e]||e)+"."+{"chunk-126e8a0a":"d3f38471","chunk-2d0c7d10":"44039f34","chunk-2d0d6cc1":"ce395425","chunk-2d2133a7":"5b1e0417","chunk-2d22d3ea":"f2ceb578","chunk-4523a0be":"b9754638","chunk-6d325aee":"29eb753d","chunk-5a008f14":"d86a998a","chunk-19afd49d":"06f5868d","chunk-2d0c4668":"c5ce5259","chunk-62ef3a8e":"cb5f9b16","chunk-06e7a3ce":"ce9c2288","chunk-16d70475":"02676b5c","chunk-3f1119f8":"44c6dce4","chunk-4a0e0f6f":"eb31e698","chunk-2d0ae955":"93387fc8","chunk-32b50134":"7d90873b","chunk-77bdcbc5":"396eec9b","chunk-0f771930":"604f4d16","chunk-4799d2cf":"d572afb7","chunk-605d7534":"5bbb589a","chunk-74298ab9":"28f16c87","chunk-8966c05c":"f02be168","chunk-b2264f14":"0cc33f93","chunk-da1836f2":"45dc66c0","chunk-de260592":"ef6126f4","chunk-8bf8b13e":"9c95db3b","chunk-90d53496":"9663b4fe","chunk-cf675bc2":"54bcf9d1"}[e]+".js"}function d(n){if(c[n])return c[n].exports;var t=c[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,d),t.l=!0,t.exports}d.e=function(e){var n=[],t={"chunk-126e8a0a":1,"chunk-4523a0be":1,"chunk-6d325aee":1,"chunk-5a008f14":1,"chunk-19afd49d":1,"chunk-3f1119f8":1,"chunk-4a0e0f6f":1,"chunk-32b50134":1,"chunk-77bdcbc5":1,"chunk-0f771930":1,"chunk-4799d2cf":1,"chunk-605d7534":1,"chunk-74298ab9":1,"chunk-b2264f14":1,"chunk-da1836f2":1,"chunk-90d53496":1,"chunk-cf675bc2":1};u[e]?n.push(u[e]):0!==u[e]&&t[e]&&n.push(u[e]=new Promise(function(n,t){for(var c="web-static-app/css/"+({}[e]||e)+"."+{"chunk-126e8a0a":"728c7c57","chunk-2d0c7d10":"31d6cfe0","chunk-2d0d6cc1":"31d6cfe0","chunk-2d2133a7":"31d6cfe0","chunk-2d22d3ea":"31d6cfe0","chunk-4523a0be":"8ff75eb9","chunk-6d325aee":"844ac810","chunk-5a008f14":"625b29fd","chunk-19afd49d":"acfd2fba","chunk-2d0c4668":"31d6cfe0","chunk-62ef3a8e":"31d6cfe0","chunk-06e7a3ce":"31d6cfe0","chunk-16d70475":"31d6cfe0","chunk-3f1119f8":"25c6f01c","chunk-4a0e0f6f":"93f79676","chunk-2d0ae955":"31d6cfe0","chunk-32b50134":"93316b03","chunk-77bdcbc5":"19410944","chunk-0f771930":"793c300b","chunk-4799d2cf":"793d84a3","chunk-605d7534":"48ca3175","chunk-74298ab9":"1d74e998","chunk-8966c05c":"31d6cfe0","chunk-b2264f14":"2818a3a9","chunk-da1836f2":"bd840fcf","chunk-de260592":"31d6cfe0","chunk-8bf8b13e":"31d6cfe0","chunk-90d53496":"b5fa7db9","chunk-cf675bc2":"79ec12ca"}[e]+".css",a=d.p+c,r=document.getElementsByTagName("link"),o=0;o<r.length;o++){var h=r[o],i=h.getAttribute("data-href")||h.getAttribute("href");if("stylesheet"===h.rel&&(i===c||i===a))return n()}var f=document.getElementsByTagName("style");for(o=0;o<f.length;o++){h=f[o],i=h.getAttribute("data-href");if(i===c||i===a)return n()}var l=document.createElement("link");l.rel="stylesheet",l.type="text/css",l.onload=n,l.onerror=function(n){var c=n&&n.target&&n.target.src||a,r=new Error("Loading CSS chunk "+e+" failed.\n("+c+")");r.code="CSS_CHUNK_LOAD_FAILED",r.request=c,delete u[e],l.parentNode.removeChild(l),t(r)},l.href=a;var k=document.getElementsByTagName("head")[0];k.appendChild(l)}).then(function(){u[e]=0}));var c=a[e];if(0!==c)if(c)n.push(c[2]);else{var r=new Promise(function(n,t){c=a[e]=[n,t]});n.push(c[2]=r);var h,i=document.createElement("script");i.charset="utf-8",i.timeout=120,d.nc&&i.setAttribute("nonce",d.nc),i.src=o(e),h=function(n){i.onerror=i.onload=null,clearTimeout(f);var t=a[e];if(0!==t){if(t){var c=n&&("load"===n.type?"missing":n.type),u=n&&n.target&&n.target.src,r=new Error("Loading chunk "+e+" failed.\n("+c+": "+u+")");r.type=c,r.request=u,t[1](r)}a[e]=void 0}};var f=setTimeout(function(){h({type:"timeout",target:i})},12e4);i.onerror=i.onload=h,document.head.appendChild(i)}return Promise.all(n)},d.m=e,d.c=c,d.d=function(e,n,t){d.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},d.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},d.t=function(e,n){if(1&n&&(e=d(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(d.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var c in e)d.d(t,c,function(n){return e[n]}.bind(null,c));return t},d.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return d.d(n,"a",n),n},d.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},d.p="/",d.oe=function(e){throw console.error(e),e};var h=window["webpackJsonp"]=window["webpackJsonp"]||[],i=h.push.bind(h);h.push=n,h=h.slice();for(var f=0;f<h.length;f++)n(h[f]);var l=i;r.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("56d7")},"11c0":function(e,n,t){"use strict";var c=t("9c08"),u=t.n(c);u.a},"21bf":function(e,n,t){},"49f4":function(e,n,t){},"4d4c":function(e,n,t){"use strict";var c=t("21bf"),u=t.n(c);u.a},"56d7":function(e,n,t){"use strict";t.r(n);t("cadf"),t("551c"),t("f751"),t("097d");var c=t("2b0e"),u=t("2f62");c["default"].use(u["a"]);var a=new u["a"].Store({state:{}}),r=t("5c96"),o=t.n(r),d=t("ca95"),h=t.n(d),i=(t("0fae"),function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"app"}},[t("router-view")],1)}),f=[],l={name:"MyApp",created:function(){}},k=l,s=(t("5c0b"),t("2877")),p=Object(s["a"])(k,i,f,!1,null,null,null),m=p.exports,b=(t("7ee6"),t("2570")),v=t.n(b),y=(t("6861"),t("a753"),t("8096"),t("14e1"),t("953d")),g=t.n(y),w=(t("49f4"),t("fe3c"),t("a18c"));c["default"].use(o.a,{size:"small",zIndex:3e3}),c["default"].use(v.a),c["default"].use(g.a),c["default"].use(h.a,{name:"v-touch"}),c["default"].prototype.window=window,new c["default"]({router:w["a"],store:a,mounted:function(){document.dispatchEvent(new Event("render-event"))},render:function(e){return e(m)}}).$mount("#app");var P=["/set-volume/mine","/set-volume/smart","/entry/entrying","/entry/entryed","/user-center/center"],E=function(e){return P.indexOf(e)>-1};w["a"].beforeEach(function(e,n,t){E(e.path)?localStorage.getItem("token")?t():t({path:"/login"}):t()})},"5c0b":function(e,n,t){"use strict";var c=t("5e27"),u=t.n(c);u.a},"5e27":function(e,n,t){},6861:function(e,n,t){},"7ee6":function(e,n){!function(e,n){var t=e.documentElement,c="orientationchange"in window?"orientationchange":"resize",u=function(){var e=t.clientWidth;e&&(t.style.fontSize=20*(e/375).toFixed(5)+"px")};e.addEventListener&&(n.addEventListener(c,u,!1),e.addEventListener("DOMContentLoaded",u,!1))}(document,window)},"9c08":function(e,n,t){},a18c:function(e,n,t){"use strict";var c=t("2b0e"),u=t("8c4f"),a=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",[t("app-main")],1)},r=[],o=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("section",{staticClass:"app-main"},[t("router-view")],1)},d=[],h={name:"AppMain",components:{},data:function(){return{}},methods:{}},i=h,f=(t("4d4c"),t("2877")),l=Object(f["a"])(i,o,d,!1,null,null,null),k=l.exports,s={name:"Layout",components:{AppMain:k},mixins:[],computed:{},methods:{}},p=s,m=(t("11c0"),Object(f["a"])(p,a,r,!1,null,null,null)),b=m.exports;c["default"].use(u["a"]);var v=[{path:"/login",component:function(){return Promise.all([t.e("chunk-6d325aee"),t.e("chunk-62ef3a8e"),t.e("chunk-8966c05c")]).then(t.bind(null,"dc3f"))}},{path:"*",component:function(){return t.e("chunk-126e8a0a").then(t.bind(null,"c449"))}},{path:"/register",component:function(){return Promise.all([t.e("chunk-6d325aee"),t.e("chunk-62ef3a8e"),t.e("chunk-16d70475")]).then(t.bind(null,"0c99"))}},{path:"/find",component:function(){return Promise.all([t.e("chunk-6d325aee"),t.e("chunk-62ef3a8e"),t.e("chunk-de260592")]).then(t.bind(null,"a215"))}},{path:"/reset",component:function(){return Promise.all([t.e("chunk-6d325aee"),t.e("chunk-62ef3a8e"),t.e("chunk-06e7a3ce")]).then(t.bind(null,"b324"))}},{path:"",component:b,redirect:"",children:[{path:"",component:function(){return Promise.all([t.e("chunk-6d325aee"),t.e("chunk-62ef3a8e"),t.e("chunk-5a008f14"),t.e("chunk-0f771930")]).then(t.bind(null,"37f9"))},name:"首页",meta:{title:"首页"}},{path:"select-way/:pId",component:function(){return Promise.all([t.e("chunk-6d325aee"),t.e("chunk-5a008f14"),t.e("chunk-2d0c4668")]).then(t.bind(null,"3b58"))},name:"select",meta:{title:"考试猫"}},{path:"select-ptype",component:function(){return Promise.all([t.e("chunk-6d325aee"),t.e("chunk-5a008f14"),t.e("chunk-19afd49d")]).then(t.bind(null,"2e05"))},name:"ptype",meta:{title:"考试猫"}},{path:"about",component:function(){return Promise.all([t.e("chunk-6d325aee"),t.e("chunk-62ef3a8e"),t.e("chunk-b2264f14")]).then(t.bind(null,"ef46"))},name:"About",meta:{title:"考试猫"}},{path:"down",component:function(){return t.e("chunk-4523a0be").then(t.bind(null,"af7d"))},name:"down",meta:{title:"考试猫"}},{path:"contact",component:function(){return t.e("chunk-2d2133a7").then(t.bind(null,"ac7f"))},name:"Contact",meta:{title:"考试猫"}},{path:"error",component:function(){return t.e("chunk-126e8a0a").then(t.bind(null,"c449"))},name:"Error",meta:{title:"考试猫"}},{path:"set-volume",component:function(){return t.e("chunk-2d0c7d10").then(t.bind(null,"51db"))},meta:{title:"set-volume"},redirect:"set-volume/smart",children:[{path:"mine",component:function(){return Promise.all([t.e("chunk-6d325aee"),t.e("chunk-62ef3a8e"),t.e("chunk-3f1119f8")]).then(t.bind(null,"7b7f"))}},{path:"smart",component:function(){return Promise.all([t.e("chunk-6d325aee"),t.e("chunk-62ef3a8e"),t.e("chunk-5a008f14"),t.e("chunk-74298ab9")]).then(t.bind(null,"230a"))}},{path:"succ",component:function(){return Promise.all([t.e("chunk-6d325aee"),t.e("chunk-8bf8b13e")]).then(t.bind(null,"a265"))}}]},{path:"user-center",component:function(){return t.e("chunk-2d0c7d10").then(t.bind(null,"51db"))},meta:{title:"考试猫"},redirect:"/user-center/center",children:[{path:"center",component:function(){return Promise.all([t.e("chunk-6d325aee"),t.e("chunk-62ef3a8e"),t.e("chunk-5a008f14"),t.e("chunk-605d7534")]).then(t.bind(null,"c87a"))}},{path:"set-info",component:function(){return Promise.all([t.e("chunk-6d325aee"),t.e("chunk-90d53496")]).then(t.bind(null,"1feb"))}},{path:"edit-info",component:function(){return Promise.all([t.e("chunk-6d325aee"),t.e("chunk-62ef3a8e"),t.e("chunk-da1836f2")]).then(t.bind(null,"a89c"))}}]},{path:"entry",component:function(){return t.e("chunk-2d0c7d10").then(t.bind(null,"51db"))},meta:{title:"考试猫"},redirect:"entry/entrying",children:[{path:"entrying",component:function(){return t.e("chunk-cf675bc2").then(t.bind(null,"94c8"))},meta:{title:"考试猫"}},{path:"entryed",component:function(){return t.e("chunk-2d22d3ea").then(t.bind(null,"f758"))}}]},{path:"online",component:function(){return t.e("chunk-2d0d6cc1").then(t.bind(null,"73a0"))},name:"Online",redirect:"online/select",meta:{title:"考试猫"},children:[{path:"practice/:type",name:"onlinePract",component:function(){return Promise.all([t.e("chunk-6d325aee"),t.e("chunk-62ef3a8e"),t.e("chunk-4a0e0f6f"),t.e("chunk-77bdcbc5")]).then(t.bind(null,"3e73"))},meta:{title:"考试猫"}},{path:"result",component:function(){return Promise.all([t.e("chunk-6d325aee"),t.e("chunk-62ef3a8e"),t.e("chunk-4a0e0f6f"),t.e("chunk-32b50134")]).then(t.bind(null,"85a1"))},meta:{title:"考试猫"}},{path:"search",component:function(){return Promise.all([t.e("chunk-6d325aee"),t.e("chunk-62ef3a8e"),t.e("chunk-5a008f14"),t.e("chunk-4799d2cf")]).then(t.bind(null,"0107"))},meta:{title:"考试猫"}},{path:"search-result/:id",component:function(){return Promise.all([t.e("chunk-6d325aee"),t.e("chunk-62ef3a8e"),t.e("chunk-4a0e0f6f"),t.e("chunk-2d0ae955")]).then(t.bind(null,"0b4a"))},meta:{title:"考试猫"}}]}]}];n["a"]=new u["a"]({mode:"history",routes:v})}});