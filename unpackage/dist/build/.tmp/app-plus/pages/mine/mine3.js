(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mine/mine3"],{1069:function(n,t,a){"use strict";var u=function(){var n=this,t=n.$createElement;n._self._c},e=[];a.d(t,"a",function(){return u}),a.d(t,"b",function(){return e})},"1a20":function(n,t,a){"use strict";a.r(t);var u=a("1a33"),e=a.n(u);for(var i in u)"default"!==i&&function(n){a.d(t,n,function(){return u[n]})}(i);t["default"]=e.a},"1a33":function(n,t,a){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;e(a("ab50")),a("5cc9");var u=a("1bfa");function e(n){return n&&n.__esModule?n:{default:n}}var i=function(){return a.e("components/uni-icon/uni-icon").then(a.bind(null,"857b"))},o={data:function(){return{list:[]}},components:{uniIcon:i},onShow:function(){var n=this;n.bankList()},methods:{navTo:function(t){n.navigateTo({url:t.currentTarget.dataset.url})},onNavigationBarButtonTap:function(t){n.navigateTo({url:"mine3Addbank"})},bankList:function(){var n=this;(0,u.djRequest)({url:"/api/bank",method:"GET",success:function(t){var a=t.data.data;a.length>0&&(a.forEach(function(n){n.bankNumber=n.bankNumber.substring(0,4)+"******"+n.bankNumber.substring(n.bankNumber.length-4)}),n.list=a)}})}}};t.default=o}).call(this,a("6e42")["default"])},"47b9":function(n,t,a){"use strict";a.r(t);var u=a("1069"),e=a("1a20");for(var i in e)"default"!==i&&function(n){a.d(t,n,function(){return e[n]})}(i);a("4905");var o=a("2877"),r=Object(o["a"])(e["default"],u["a"],u["b"],!1,null,null,null);t["default"]=r.exports},4905:function(n,t,a){"use strict";var u=a("5ae2"),e=a.n(u);e.a},"5ae2":function(n,t,a){}},[["834d","common/runtime","common/vendor"]]]);