(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/mailDetail"],{"51f3":function(t,n,e){},6486:function(t,n,e){"use strict";var a=function(){var t=this,n=t.$createElement,e=(t._self._c,t._f("formatDate")(t.info.time,1)),a=t._f("formatDate")(t.info.replyTime,1);t.$mp.data=Object.assign({},{$root:{f0:e,f1:a}})},u=[];e.d(n,"a",function(){return a}),e.d(n,"b",function(){return u})},"9d80":function(t,n,e){"use strict";e.r(n);var a=e("e648"),u=e.n(a);for(var o in a)"default"!==o&&function(t){e.d(n,t,function(){return a[t]})}(o);n["default"]=u.a},d16b:function(t,n,e){"use strict";e.r(n);var a=e("6486"),u=e("9d80");for(var o in u)"default"!==o&&function(t){e.d(n,t,function(){return u[t]})}(o);e("f8c8");var f=e("2877"),r=Object(f["a"])(u["default"],a["a"],a["b"],!1,null,null,null);n["default"]=r.exports},e648:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;u(e("1de3")),e("2966");var a=e("25f1");function u(t){return t&&t.__esModule?t:{default:t}}var o={data:function(){return{info:{}}},onLoad:function(t){var n=this;(0,a.djRequest)({url:"/api/message/show",method:"GET",data:{Id:t.id},success:function(t){n.info=t.data.data}})}};n.default=o},f8c8:function(t,n,e){"use strict";var a=e("51f3"),u=e.n(a);u.a}},[["d783","common/runtime","common/vendor"]]]);