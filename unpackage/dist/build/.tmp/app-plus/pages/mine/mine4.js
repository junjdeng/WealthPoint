(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mine/mine4"],{"542d":function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;a(e("1de3")),e("2966");var u=e("25f1");function a(n){return n&&n.__esModule?n:{default:n}}var o=function(){return e.e("components/uni-icon/uni-icon").then(e.bind(null,"fc60"))},i={data:function(){return{list:[]}},onNavigationBarButtonTap:function(t){n.navigateTo({url:"addAliPay"})},components:{uniIcon:o},onShow:function(){this.getList()},methods:{navTo:function(t){n.navigateTo({url:t.currentTarget.dataset.url})},getList:function(){var n=this;(0,u.djRequest)({url:"/api/qrcode",method:"GET",success:function(t){n.list=t.data.data}})}}};t.default=i}).call(this,e("6e42")["default"])},"5bd6":function(n,t,e){},"5e5b":function(n,t,e){"use strict";e.r(t);var u=e("e104"),a=e("933d");for(var o in a)"default"!==o&&function(n){e.d(t,n,function(){return a[n]})}(o);e("af56");var i=e("2877"),r=Object(i["a"])(a["default"],u["a"],u["b"],!1,null,null,null);t["default"]=r.exports},"933d":function(n,t,e){"use strict";e.r(t);var u=e("542d"),a=e.n(u);for(var o in u)"default"!==o&&function(n){e.d(t,n,function(){return u[n]})}(o);t["default"]=a.a},af56:function(n,t,e){"use strict";var u=e("5bd6"),a=e.n(u);a.a},e104:function(n,t,e){"use strict";var u=function(){var n=this,t=n.$createElement;n._self._c},a=[];e.d(t,"a",function(){return u}),e.d(t,"b",function(){return a})}},[["77a0","common/runtime","common/vendor"]]]);