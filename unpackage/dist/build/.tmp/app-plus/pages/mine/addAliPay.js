(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mine/addAliPay"],{"50bf":function(t,a,e){"use strict";var n=function(){var t=this,a=t.$createElement;t._self._c},u=[];e.d(a,"a",function(){return n}),e.d(a,"b",function(){return u})},"74fb":function(t,a,e){"use strict";(function(t){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n=o(e("1de3")),u=e("2966"),i=e("25f1");function o(t){return t&&t.__esModule?t:{default:t}}var s=function(){return e.e("components/uni-icon/uni-icon").then(e.bind(null,"fc60"))},f={data:function(){return{type:0,userName:"",payName:"",flag:!0,id:0}},components:{uniIcon:s},onNavigationBarButtonTap:function(a){var e=this;(0,i.djRequest)({url:"/api/qrcode/delete",method:"GET",data:{Id:e.id},success:function(a){console.log(a," at pages\\mine\\addAliPay.vue:51"),n.default.TostUtil(a.data.message),200===a.data.status&&setTimeout(function(){t.navigateBack({delta:1})},1e3)}})},onLoad:function(t){},onShow:function(){this.userName=u.config.User.realName},methods:{getUserName:function(){var a=this;t.getStorage({key:"loginInfo",success:function(t){a.userName=JSON.parse(t.data).realName}})},add:function(){var a=this;if(a.flag){if(a.flag=!1,!n.default.RegUtil.isMatchAliPay(a.payName))return n.default.TostUtil("支付宝格式必须为手机号或邮箱"),void(a.flag=!0);if(""===a.userName)return n.default.TostUtil("请输入支付宝真实姓名"),void(a.flag=!0);(0,i.djRequest)({url:"/api/alipay/add",method:"POST",data:{accountName:a.userName,name:a.payName,status:"yes"},success:function(e){406===e.data.status&&(n.default.TostUtil(e.data.message),"请完善个人资料，填写真实姓名"===e.data.message&&t.navigateTo({url:"./../login/finishRegisterInfo"})),a.flag=!0,200===e.data.status&&(a.bankNumber="",n.default.TostUtil(e.data.message),a.flag=!0,setTimeout(function(){t.navigateBack()},1e3))},fail:function(t){n.default.TostUtil(t.data.message),a.flag=!0}})}}}};a.default=f}).call(this,e("6e42")["default"])},"91ef":function(t,a,e){"use strict";e.r(a);var n=e("74fb"),u=e.n(n);for(var i in n)"default"!==i&&function(t){e.d(a,t,function(){return n[t]})}(i);a["default"]=u.a},c4c2:function(t,a,e){"use strict";e.r(a);var n=e("50bf"),u=e("91ef");for(var i in u)"default"!==i&&function(t){e.d(a,t,function(){return u[t]})}(i);e("f804");var o=e("2877"),s=Object(o["a"])(u["default"],n["a"],n["b"],!1,null,null,null);a["default"]=s.exports},f804:function(t,a,e){"use strict";var n=e("fbb8"),u=e.n(n);u.a},fbb8:function(t,a,e){}},[["447f","common/runtime","common/vendor"]]]);