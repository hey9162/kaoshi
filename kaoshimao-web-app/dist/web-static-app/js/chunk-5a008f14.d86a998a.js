(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5a008f14"],{"36f3":function(t,i,n){},5308:function(t,i,n){"use strict";n.d(i,"d",function(){return a}),n.d(i,"a",function(){return r}),n.d(i,"e",function(){return o}),n.d(i,"b",function(){return c}),n.d(i,"c",function(){return u});n("ac6a");var e=n("f499"),s=n.n(e);function a(t,i){var n=s()(i);localStorage.setItem(t,n)}function r(t){var i=localStorage.getItem(t);return JSON.parse(i)}function o(t,i){var n;n=r(t)?r(t):[],n.indexOf(i)>-1||n.push(i),a(t,n)}function c(t){var i=r("questionBank");if(i){var n=i.filter(function(i){return i.id===t.paperid});return n}}function u(t,i){var n=r("questionBank");if(n){var e=n.filter(function(i){return i.id===t.paperid});e[0]["questionsList"+t.qtype]?(e[0]["questionsList"+t.qtype].rows.length=10*(t.page-1),i.rows.forEach(function(i){e[0]["questionsList"+t.qtype].rows.push(i)})):e[0]["questionsList"+t.qtype]=i,a("questionBank",n)}}},8291:function(t,i,n){"use strict";var e=n("36f3"),s=n.n(e);s.a},"9d87":function(t,i,n){"use strict";var e=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("footer",{staticClass:"footer"},[n("div",{staticClass:"box-flex footer-flex"},[n("router-link",{staticClass:"flex-item",class:0==t.index?"active":"",attrs:{to:"/"}},[n("svg",{staticClass:"icon svg-icon",attrs:{"aria-hidden":"true"}},[n("use",{attrs:{"xlink:href":"#iconbook"}})]),n("span",{staticClass:"nav"},[t._v("题库")])]),n("router-link",{staticClass:"flex-item",class:1==t.index?"active":"",attrs:{to:"/online/search"}},[n("svg",{staticClass:"icon svg-icon",attrs:{"aria-hidden":"true"}},[n("use",{attrs:{"xlink:href":"#iconchaxun"}})]),n("span",{staticClass:"nav"},[t._v("搜索")])]),n("router-link",{staticClass:"flex-item",class:2==t.index?"active":"",attrs:{to:"/set-volume/smart"}},[n("svg",{staticClass:"icon svg-icon",attrs:{"aria-hidden":"true"}},[n("use",{attrs:{"xlink:href":"#iconzujuantiku"}})]),n("span",{staticClass:"nav"},[t._v("组卷")])]),n("router-link",{staticClass:"flex-item",class:3==t.index?"active":"",attrs:{to:"/user-center"}},[n("svg",{staticClass:"icon svg-icon",attrs:{"aria-hidden":"true"}},[n("use",{attrs:{"xlink:href":"#iconwode"}})]),n("span",{staticClass:"nav"},[t._v("我的")])])],1)])},s=[],a={name:"MyNav",data:function(){return{}},computed:{},methods:{},props:["index"]},r=a,o=(n("8291"),n("2877")),c=Object(o["a"])(r,e,s,!1,null,null,null),u=c.exports;n.d(i,"a",function(){return u})},a21f:function(t,i,n){var e=n("584a"),s=e.JSON||(e.JSON={stringify:JSON.stringify});t.exports=function(t){return s.stringify.apply(s,arguments)}},ac6a:function(t,i,n){for(var e=n("cadf"),s=n("0d58"),a=n("2aba"),r=n("7726"),o=n("32e9"),c=n("84f2"),u=n("2b4c"),l=u("iterator"),f=u("toStringTag"),d=c.Array,v={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},p=s(v),L=0;L<p.length;L++){var S,g=p[L],h=v[g],x=r[g],C=x&&x.prototype;if(C&&(C[l]||o(C,l,d),C[f]||o(C,f,g),c[g]=d,h))for(S in e)C[S]||a(C,S,e[S],!0)}},f499:function(t,i,n){t.exports=n("a21f")}}]);