(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mine/alipayEdit"],{"2f36":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=u(a("9e47")),i=(a("7c6a"),a("7461"));function u(t){return t&&t.__esModule?t:{default:t}}var o=function(){return a.e("components/uni-icon/uni-icon").then(a.bind(null,"7ca9"))},s={data:function(){return{type:0,userName:"",payName:"",flag:!0,id:0}},components:{uniIcon:o},onNavigationBarButtonTap:function(e){var a=this;(0,i.djRequest)({url:"/api/qrcode/delete",method:"GET",data:{Id:a.id},success:function(e){console.log(e," at pages\\mine\\alipayEdit.vue:55"),n.default.TostUtil(e.data.message),200===e.data.status&&setTimeout(function(){t.navigateBack({delta:1})},1e3)}})},onLoad:function(t){this.id=t.id,this.payName=t.name},onShow:function(){this.getUserName()},methods:{getUserName:function(){var e=this;t.getStorage({key:"loginInfo",success:function(t){e.userName=JSON.parse(t.data).realName}})},add:function(){var e=this;if(e.flag){if(e.flag=!1,!n.default.RegUtil.isMatchAliPay(e.payName))return n.default.TostUtil("支付宝格式必须为手机号或邮箱"),void(e.flag=!0);if(""===e.userName)return n.default.TostUtil("请输入支付宝真实姓名"),void(e.flag=!0);(0,i.djRequest)({url:"/api/alipay/update",method:"POST",data:{Id:e.id,accountName:e.userName,name:e.payName,status:"yes"},success:function(a){console.log(a," at pages\\mine\\alipayEdit.vue:112"),n.default.TostUtil(a.data.message),e.flag=!0,setTimeout(function(){t.navigateBack({delta:1})},1e3)},fail:function(t){n.default.TostUtil(t.data.message),e.flag=!0}})}}}};e.default=s}).call(this,a("6e42")["default"])},4299:function(t,e,a){},"5f5e":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement;t._self._c},i=[];a.d(e,"a",function(){return n}),a.d(e,"b",function(){return i})},"8ae2":function(t,e,a){"use strict";a.r(e);var n=a("2f36"),i=a.n(n);for(var u in n)"default"!==u&&function(t){a.d(e,t,function(){return n[t]})}(u);e["default"]=i.a},cfe2:function(t,e,a){"use strict";var n=a("4299"),i=a.n(n);i.a},f78a:function(t,e,a){"use strict";a.r(e);var n=a("5f5e"),i=a("8ae2");for(var u in i)"default"!==u&&function(t){a.d(e,t,function(){return i[t]})}(u);a("cfe2");var o=a("2877"),s=Object(o["a"])(i["default"],n["a"],n["b"],!1,null,null,null);e["default"]=s.exports}},[["c542","common/runtime","common/vendor"]]]);