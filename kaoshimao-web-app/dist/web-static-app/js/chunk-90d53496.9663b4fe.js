(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-90d53496"],{"1feb":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("my-header",[n("div",{staticClass:"app-header-left",on:{click:function(e){return t.$router.go(-1)}}},[n("i",{staticClass:"el-icon-arrow-left"}),t._v(" 返回")]),n("div",{staticClass:"app-header-middle"},[t._v("\n      账号设置\n    ")]),n("div",[t._v("  ")])]),n("div",{staticClass:"app-body"},[n("ul",{staticClass:"card"},[n("router-link",{staticClass:"box-flex",attrs:{to:"/user-center/edit-info"}},[n("p",{},[n("span",[t._v("昵称")])]),n("div",[t._v("\n          "+t._s(t.user.nickname)+"\n          "),n("i",{staticClass:"el-icon-arrow-right"})])]),n("li",{staticClass:"box-flex"},[t._m(0),n("div",[t._v("\n          "+t._s(t.user.phone)+"\n          "),n("i",{staticClass:"el-icon-arrow-right"})])])],1),n("div",{staticClass:"logout"},[n("el-button",{staticClass:"full-btn",attrs:{size:"big",type:"danger"},on:{click:t.logout}},[t._v("退出登录")])],1)])],1)},r=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",{},[n("span",[t._v("账号")])])}],s=n("4f84"),a=n("5308"),o={name:"set-info",data:function(){return{user:{}}},components:{MyHeader:s["a"]},created:function(){this.user=Object(a["a"])("user")},methods:{logout:function(){localStorage.clear(),this.$router.push("/login")}}},u=o,c=(n("763a"),n("2877")),l=Object(c["a"])(u,i,r,!1,null,null,null);e["default"]=l.exports},5308:function(t,e,n){"use strict";n.d(e,"d",function(){return s}),n.d(e,"a",function(){return a}),n.d(e,"e",function(){return o}),n.d(e,"b",function(){return u}),n.d(e,"c",function(){return c});n("ac6a");var i=n("f499"),r=n.n(i);function s(t,e){var n=r()(e);localStorage.setItem(t,n)}function a(t){var e=localStorage.getItem(t);return JSON.parse(e)}function o(t,e){var n;n=a(t)?a(t):[],n.indexOf(e)>-1||n.push(e),s(t,n)}function u(t){var e=a("questionBank");if(e){var n=e.filter(function(e){return e.id===t.paperid});return n}}function c(t,e){var n=a("questionBank");if(n){var i=n.filter(function(e){return e.id===t.paperid});i[0]["questionsList"+t.qtype]?(i[0]["questionsList"+t.qtype].rows.length=10*(t.page-1),e.rows.forEach(function(e){i[0]["questionsList"+t.qtype].rows.push(e)})):i[0]["questionsList"+t.qtype]=e,s("questionBank",n)}}},"609a":function(t,e,n){},"763a":function(t,e,n){"use strict";var i=n("609a"),r=n.n(i);r.a},a21f:function(t,e,n){var i=n("584a"),r=i.JSON||(i.JSON={stringify:JSON.stringify});t.exports=function(t){return r.stringify.apply(r,arguments)}},ac6a:function(t,e,n){for(var i=n("cadf"),r=n("0d58"),s=n("2aba"),a=n("7726"),o=n("32e9"),u=n("84f2"),c=n("2b4c"),l=c("iterator"),f=c("toStringTag"),d=u.Array,p={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},v=r(p),L=0;L<v.length;L++){var S,g=v[L],h=p[g],m=a[g],y=m&&m.prototype;if(y&&(y[l]||o(y,l,d),y[f]||o(y,f,g),u[g]=d,h))for(S in i)y[S]||s(y,S,i[S],!0)}},f499:function(t,e,n){t.exports=n("a21f")}}]);