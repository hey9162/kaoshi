(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-94cc872a"],{"0c99":function(t,e,r){"use strict";r.r(e);var i=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"layout-container"},[i("div",{staticStyle:{display:"block"},attrs:{id:"c1"}}),i("div",{staticClass:"account-container"},[i("div",{staticClass:"form-main"},[i("div",{staticClass:"form-logo"},[i("router-link",{attrs:{to:"/"}},[i("img",{attrs:{src:r("f66a"),alt:""}})])],1),t._m(0),i("div",{staticClass:"form-pro"},[i("el-form",{ref:"ruleForm",attrs:{model:t.ruleForm,rules:t.rules,"status-icon":""}},[i("div",{staticClass:"inp-group"},[i("el-form-item",{attrs:{prop:"phone"}},[i("el-input",{attrs:{maxlength:"11",type:"text",placeholder:"请输入您的11位手机号码",size:"large"},model:{value:t.ruleForm.phone,callback:function(e){t.$set(t.ruleForm,"phone",e)},expression:"ruleForm.phone"}},[i("template",{slot:"prepend"},[t._v("+86")])],2)],1)],1),i("div",{staticClass:"inp-group suffix"},[i("el-form-item",{attrs:{prop:"code"}},[i("el-input",{attrs:{maxlength:"6",placeholder:"请输入手机验证码",size:"large"},model:{value:t.ruleForm.code,callback:function(e){t.$set(t.ruleForm,"code",e)},expression:"ruleForm.code"}}),i("el-button",{staticClass:"right-btn",attrs:{type:"text",disabled:t.view.disabled},on:{click:function(e){return t.getCheck("ruleForm")}}},[t.view.timeNum?t._e():i("span",[t._v("\n                  获取验证码\n                ")]),t.view.timeNum?i("span",[t._v(t._s(t.view.timeNum)+"秒")]):t._e()])],1)],1),i("div",{staticClass:"inp-group"},[i("el-form-item",{attrs:{prop:"password"}},[i("el-input",{attrs:{type:"password",placeholder:"请输您的入密码",size:"large"},model:{value:t.ruleForm.password,callback:function(e){t.$set(t.ruleForm,"password",e)},expression:"ruleForm.password"}})],1)],1),i("div",{staticClass:"inp-group mar-bottom-20"},[i("el-form-item",{attrs:{prop:"nickname"}},[i("el-input",{attrs:{placeholder:"请输入您的昵称",size:"large"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.submitForm("ruleForm")}},model:{value:t.ruleForm.nickname,callback:function(e){t.$set(t.ruleForm,"nickname",e)},expression:"ruleForm.nickname"}})],1)],1),i("div",{staticClass:"inp-group mar-bottom-10"},[i("el-checkbox",{model:{value:t.agreement,callback:function(e){t.agreement=e},expression:"agreement"}},[t._v("我已阅读并同意"),i("el-button",{attrs:{type:"text"}},[t._v("《平台服务政策》")])],1)],1),i("div",{},[i("el-button",{staticClass:"full-btn",attrs:{type:"primary",disabled:!t.agreement},on:{click:function(e){return t.submitForm("ruleForm")}}},[t._v("免费注册")]),i("div",{staticClass:"bottom-ctrl clearfix"},[i("div",{staticClass:"pull-left"},[t._v("已有账号，"),i("router-link",{attrs:{to:"/login"}},[i("el-button",{attrs:{type:"text"}},[t._v("立即登录")])],1)],1),i("div",{staticClass:"pull-right"},[i("router-link",{attrs:{to:"/find"}},[i("el-button",{attrs:{type:"text"}},[t._v("忘记密码")])],1)],1)])],1)])],1)])])])},n=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"form-content"},[r("h2",[t._v("欢迎您加入考试猫")]),r("p",[t._v("让你轻松备考一次通过")])])}],o=r("7ded"),s=r("61f7"),a=r("ff6b"),u={name:"Register",data:function(){var t=function(t,e,r){Object(s["c"])(e)?r():r(new Error("手机号码不正确"))},e=function(t,e,r){Object(s["a"])(e)?r():r(new Error("昵称不正确"))};return{agreement:"",view:{timeNum:"",disabled:!1},ruleForm:{phone:"",code:"",password:"",nickname:""},rules:{phone:[{required:!0,trigger:"blur",validator:t}],code:[{required:!0,message:"验证码不能为空",trigger:"blur"}],password:[{required:!0,message:"密码不能为空",trigger:"blur"}],nickname:[{required:!0,message:"昵称不能为空",trigger:"blur",validator:e}]}}},computed:{},mounted:function(){},methods:{getCheck:function(t){var e=this;this.$refs.ruleForm.validateField("phone",function(t){if(!t){var r=e,i=_dx.Captcha(document.getElementById("c1"),{appId:"b4f113b21c08e851abc79b753d5c4a0c",style:"popup",width:300,success:function(t){i.hide(),Object(o["b"])({phone:r.ruleForm.phone,token:t}).then(function(t){r.view.timeNum=60,r.view.disabled=!0,Object(a["b"])(r,function(){r.view.disabled=!1})})}});i.show()}})},submitForm:function(t){var e=this;this.$refs[t].validate(function(t){if(!t)return!1;var r={phone:e.ruleForm.phone,code:e.ruleForm.code,password:e.ruleForm.password,nickname:e.ruleForm.nickname};Object(o["e"])(r).then(function(t){e.$router.push("/login")})})}}},c=u,l=r("2877"),m=Object(l["a"])(c,i,n,!1,null,null,null);e["default"]=m.exports},"5d6b":function(t,e,r){var i=r("e53d").parseInt,n=r("a1ce").trim,o=r("e692"),s=/^[-+]?0[xX]/;t.exports=8!==i(o+"08")||22!==i(o+"0x16")?function(t,e){var r=n(String(t),3);return i(r,e>>>0||(s.test(r)?16:10))}:i},"61f7":function(t,e,r){"use strict";function i(t){var e=/^1\d{10}$/;return e.test(t)}function n(t){var e=/^[\w\u4e00-\u9fa5\*]{1,20}$/;return e.test(t)}function o(t){var e=/^[A-Za-z0-9]{6,20}$/;return e.test(t)}r.d(e,"c",function(){return i}),r.d(e,"a",function(){return n}),r.d(e,"b",function(){return o})},7445:function(t,e,r){var i=r("63b6"),n=r("5d6b");i(i.G+i.F*(parseInt!=n),{parseInt:n})},a1ce:function(t,e,r){var i=r("63b6"),n=r("25eb"),o=r("294c"),s=r("e692"),a="["+s+"]",u="​",c=RegExp("^"+a+a+"*"),l=RegExp(a+a+"*$"),m=function(t,e,r){var n={},a=o(function(){return!!s[t]()||u[t]()!=u}),c=n[t]=a?e(p):s[t];r&&(n[r]=c),i(i.P+i.F*a,"String",n)},p=m.trim=function(t,e){return t=String(n(t)),1&e&&(t=t.replace(c,"")),2&e&&(t=t.replace(l,"")),t};t.exports=m},b9e9:function(t,e,r){r("7445"),t.exports=r("584a").parseInt},e692:function(t,e){t.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"},e814:function(t,e,r){t.exports=r("b9e9")},f66a:function(t,e){t.exports="data:image/png;base64,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"},ff6b:function(t,e,r){"use strict";r.d(e,"b",function(){return o}),r.d(e,"a",function(){return s});var i=r("e814"),n=r.n(i);function o(t,e){var r=setTimeout(function(){t.view.timeNum>0?(t.view.timeNum--,o(t,e)):(clearTimeout(r),e())},1e3)}function s(t,e){this.init(t,e)}s.prototype.init=function(t,e){this.time=t||0,this.timer=void 0,this.timeStr="00:00:00",this.type=void 0===e||e},s.prototype.start=function(){this.reTime()},s.prototype.stop=function(){clearTimeout(this.timer)},s.prototype.continue=function(){this.reTime()},s.prototype.reTime=function(){if(this.type)this.time++;else{if(!(this.time>0))return void this.outputTime("00:00:00");this.time--}var t=n()(this.time/3600),e=n()((this.time-3600*t)/60),r=this.time-3600*t-60*e;t<10&&(t="0".concat(t)),e<10&&(e="0".concat(e)),r<10&&(r="0".concat(r)),this.outputTime("".concat(t,":").concat(e,":").concat(r)),this.timer=setTimeout(this.reTime.bind(this),1e3)},s.prototype.outputTime=function(t){this.timeStr=t}}}]);