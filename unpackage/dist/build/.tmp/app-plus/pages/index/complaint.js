(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/complaint"],{"08f4":function(t,a,n){"use strict";var e=function(){var t=this,a=t.$createElement,n=(t._self._c,t.__map(t.dataList,function(a,n){var e=t._f("formatDate")(a.time,1);return{$orig:t.__get_orig(a),f0:e}}));t.$mp.data=Object.assign({},{$root:{l0:n}})},u=[];n.d(a,"a",function(){return e}),n.d(a,"b",function(){return u})},2211:function(t,a,n){"use strict";n.r(a);var e=n("ef27"),u=n.n(e);for(var r in e)"default"!==r&&function(t){n.d(a,t,function(){return e[t]})}(r);a["default"]=u.a},"32a4":function(t,a,n){},"3dcb":function(t,a,n){"use strict";n.r(a);var e=n("08f4"),u=n("2211");for(var r in u)"default"!==r&&function(t){n.d(a,t,function(){return u[t]})}(r);n("9cb8");var o=n("2877"),c=Object(o["a"])(u["default"],e["a"],e["b"],!1,null,null,null);a["default"]=c.exports},"9cb8":function(t,a,n){"use strict";var e=n("32a4"),u=n.n(e);u.a},ef27:function(t,a,n){"use strict";(function(t){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;u(n("ab50")),n("5cc9");var e=n("1bfa");function u(t){return t&&t.__esModule?t:{default:t}}var r={data:function(){return{dataList:[]}},onLoad:function(t){var a=this;(0,e.djRequest)({url:"/api/complaint",data:{start:0,length:500},method:"POST",success:function(t){a.dataList=t.data.data.data}})},methods:{navTo:function(a){t.navigateTo({url:a.currentTarget.dataset.url})}}};a.default=r}).call(this,n("6e42")["default"])}},[["815a","common/runtime","common/vendor"]]]);