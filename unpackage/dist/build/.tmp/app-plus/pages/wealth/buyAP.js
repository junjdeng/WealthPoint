(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/wealth/buyAP"],{"1edc":function(t,e,n){"use strict";n.r(e);var a=n("36f2"),u=n.n(a);for(var i in a)"default"!==i&&function(t){n.d(e,t,function(){return a[t]})}(i);e["default"]=u.a},"244d":function(t,e,n){"use strict";n.r(e);var a=n("c2b4"),u=n("1edc");for(var i in u)"default"!==i&&function(t){n.d(e,t,function(){return u[t]})}(i);n("bdb4");var o=n("2877"),r=Object(o["a"])(u["default"],a["a"],a["b"],!1,null,null,null);e["default"]=r.exports},"36f2":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=i(n("1de3")),u=(n("2966"),n("25f1"));function i(t){return t&&t.__esModule?t:{default:t}}var o=function(){return n.e("components/uni-icon/uni-icon").then(n.bind(null,"fc60"))},r={data:function(){return{d:"00",h:"00",m:"00",cash:2e3,flag:!0,APNumber:"",safePwd:"",activeTime:0,cycle:864e3,count:0,ends:0}},computed:{total:function(){return this.APNumber*this.cash}},components:{uniIcon:o},methods:{endTime:function(){var e=this;t.getStorage({key:"loginInfo",success:function(t){var n=864e3,a=0,u=Number(JSON.parse(t.data).activationTime);e.activeTime=u;var i=(new Date).getTime()/1e3-u;e.ends=i,a=i>n?n-i%n:n-i;var o=Math.floor(a/86400),r=Math.floor((a-24*o*60*60)/3600),f=Math.floor((a-24*o*60*60-3600*r)/60),c=o.toString().split("");c=c[c.length-1],c<10&&(c="0"+c),r<10&&(r="0"+r),f<10&&(f="0"+f),e.d=c,e.h=r,e.m=f}})},buy:function(){var t=this;(0,u.djRequest)({url:"/api/order/buy",data:{number:Number(t.APNumber)},method:"POST",success:function(e){t.APNumber="",a.default.TostUtil(e.data.message),t.flag=!0}})},formSubmit:function(){var t=this;if(t.flag){if(t.flag=!1,"0.00"!==(t.APNumber%.25).toFixed(2))return a.default.TostUtil("单次承租数量必须为0.25的整数倍！"),void(t.flag=!0);if(""===t.safePwd)return a.default.TostUtil("请输入安全密码！"),void(t.flag=!0);if(t.APNumber>10)return a.default.TostUtil("单次承租数量不能大于10个！"),void(t.flag=!0);if(t.APNumber<1)return a.default.TostUtil("单次承租数量不能小于1个！"),void(t.flag=!0);(0,u.djRequest)({url:"/api/member/verify_security",data:{password:t.safePwd},success:function(e){if(200!==e.data.status)return a.default.TostUtil(e.data.message),void(t.flag=!0);t.buy()},fail:function(e){t.safePwd="",t.flag=!0}})}},counts:function(){var t=this;(0,u.djRequest)({url:"/api/order",data:{start:0,length:200,status:"finish",type:"buy"},method:"POST",success:function(e){if(200===e.data.status){var n=e.data.data.data,a=[],u=Math.floor(t.ends/t.cycle),i=t.activeTime+t.cycle*u;n.forEach(function(t,e){"buy"===t.type&&Number(t.payTime)>Number(i)&&a.push(t)}),t.count=a.length}}})}},onShow:function(){var t=this;t.endTime(),t.counts()}};e.default=r}).call(this,n("6e42")["default"])},bdb4:function(t,e,n){"use strict";var a=n("cf7b"),u=n.n(a);u.a},c2b4:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c},u=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return u})},cf7b:function(t,e,n){}},[["84eb","common/runtime","common/vendor"]]]);