(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/sign"],{"1acb":function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=e("25f1"),i=u(e("1de3")),o=e("2966");function u(n){return n&&n.__esModule?n:{default:n}}var s=function(){return e.e("components/uni-icon/uni-icon").then(e.bind(null,"fc60"))},c={data:function(){return{signTxt:"签到领积分",signNum:0,list:[],dateList:[],know:!1}},onNavigationBarButtonTap:function(t){n.navigateTo({url:"signRecord"})},onShow:function(){i.default.balance(),this.signNum=o.config.balance.sign;var n=this;(0,a.djRequest)({url:"/api/sign/sign_list",method:"POST",data:{start:0,length:50},success:function(t){if(0==t.data.data.data.length)n.signTxt="签到领积分";else{var e=t.data.data.data[0].time,a=new Date(1e3*e),i=(a.getFullYear(),a.getDate());i=i<10?"0"+i:i;var o=new Date,u=o.getDate();u=u<10?"0"+u:u,n.signTxt=i!==u?"签到领积分":"今日已签到"}}})},components:{uniIcon:s},onLoad:function(){var n=this;n.getDate(),n.signNum=o.config.balance.sign},methods:{getKnow:function(){this.know=!0},inKnow:function(){this.know=!this.know},navTo:function(t){n.navigateTo({url:t.currentTarget.dataset.url})},getDate:function(){for(var n=new Date,t=n.getTime(),e=n.getDay(),a=[],i=0;i<7;i++){var o=new Date(t+864e5*(i-(e+6)%7)).toLocaleDateString().replace(/\//g,".").slice(5);a.push(o)}console.log(a," at pages\\index\\sign.vue:162")},sign:function(){if("今日已签到"!=this.signTxt){var n=this;(0,a.djRequest)({url:"/api/sign",data:{},success:function(t){console.log(t," at pages\\index\\sign.vue:174"),200==t.data.status?(i.default.TostUtil(t.data.message),n.signTxt="今日已签到",i.default.balance(),setTimeout(function(){n.signNum=o.config.balance.sign},300)):i.default.TostUtil(t.data.message)}})}},switch1Change:function(n){console.log("switch1 发生 change 事件，携带值为",n.target.value," at pages\\index\\sign.vue:190")}}};t.default=c}).call(this,e("6e42")["default"])},"1bcd":function(n,t,e){},"3ff1":function(n,t,e){"use strict";e.r(t);var a=e("4b4a"),i=e("638f");for(var o in i)"default"!==o&&function(n){e.d(t,n,function(){return i[n]})}(o);e("a57d");var u=e("2877"),s=Object(u["a"])(i["default"],a["a"],a["b"],!1,null,null,null);t["default"]=s.exports},"4b4a":function(n,t,e){"use strict";var a=function(){var n=this,t=n.$createElement;n._self._c},i=[];e.d(t,"a",function(){return a}),e.d(t,"b",function(){return i})},"638f":function(n,t,e){"use strict";e.r(t);var a=e("1acb"),i=e.n(a);for(var o in a)"default"!==o&&function(n){e.d(t,n,function(){return a[n]})}(o);t["default"]=i.a},a57d:function(n,t,e){"use strict";var a=e("1bcd"),i=e.n(a);i.a}},[["a7db","common/runtime","common/vendor"]]]);