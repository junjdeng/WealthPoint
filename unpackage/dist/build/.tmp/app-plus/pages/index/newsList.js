(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/newsList"],{2351:function(t,n,a){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e=a("1bfa");u(a("ab50")),a("5cc9");function u(t){return t&&t.__esModule?t:{default:t}}var r={data:function(){return{list:[]}},onLoad:function(){var t=this;(0,e.djRequest)({url:"/api/news",data:{start:0,length:10},success:function(n){200==n.data.status&&(t.list=n.data.data.data)}})},methods:{navTo:function(n){t.navigateTo({url:n.currentTarget.dataset.url})}}};n.default=r}).call(this,a("6e42")["default"])},"2f9d":function(t,n,a){"use strict";var e=function(){var t=this,n=t.$createElement,a=(t._self._c,t.__map(t.list,function(n,a){var e=t._f("formatDate")(n.time,4);return{$orig:t.__get_orig(n),f0:e}}));t.$mp.data=Object.assign({},{$root:{l0:a}})},u=[];a.d(n,"a",function(){return e}),a.d(n,"b",function(){return u})},3149:function(t,n,a){"use strict";a.r(n);var e=a("2351"),u=a.n(e);for(var r in e)"default"!==r&&function(t){a.d(n,t,function(){return e[t]})}(r);n["default"]=u.a},9501:function(t,n,a){"use strict";var e=a("e8d4"),u=a.n(e);u.a},"9c27":function(t,n,a){"use strict";a.r(n);var e=a("2f9d"),u=a("3149");for(var r in u)"default"!==r&&function(t){a.d(n,t,function(){return u[t]})}(r);a("9501");var o=a("2877"),i=Object(o["a"])(u["default"],e["a"],e["b"],!1,null,null,null);n["default"]=i.exports},e8d4:function(t,n,a){}},[["e046","common/runtime","common/vendor"]]]);