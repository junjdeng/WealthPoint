(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/wealth/wallet"],{"4cad":function(t,n,e){},"524e":function(t,n,e){"use strict";var a=function(){var t=this,n=t.$createElement;t._self._c},o=[];e.d(n,"a",function(){return a}),e.d(n,"b",function(){return o})},7180:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;o(e("9e47"));var a=e("7c6a");e("7461");function o(t){return t&&t.__esModule?t:{default:t}}var u=function(){return e.e("components/uni-icon/uni-icon").then(e.bind(null,"7ca9"))},i={data:function(){return{type:1,wallet:0}},components:{uniIcon:u},onLoad:function(n){this.type=n.type,1==n.type?t.setNavigationBarTitle({title:"希望钱包"}):2==n.type&&t.setNavigationBarTitle({title:"奖金钱包"})},onShow:function(){var t=this;t.wallets()},methods:{navTo:function(n){var e=this;t.navigateTo({url:n.currentTarget.dataset.url+"?type="+e.type})},wallets:function(){var t=this;1==t.type?t.wallet=parseFloat(a.config.balance.ecash).toFixed(4):2==t.type&&(t.wallet=parseFloat(a.config.balance.bonus).toFixed(4))}}};n.default=i}).call(this,e("6e42")["default"])},"77dd":function(t,n,e){"use strict";e.r(n);var a=e("524e"),o=e("d3fa");for(var u in o)"default"!==u&&function(t){e.d(n,t,function(){return o[t]})}(u);e("f14b");var i=e("2877"),c=Object(i["a"])(o["default"],a["a"],a["b"],!1,null,null,null);n["default"]=c.exports},d3fa:function(t,n,e){"use strict";e.r(n);var a=e("7180"),o=e.n(a);for(var u in a)"default"!==u&&function(t){e.d(n,t,function(){return a[t]})}(u);n["default"]=o.a},f14b:function(t,n,e){"use strict";var a=e("4cad"),o=e.n(a);o.a}},[["4ec1","common/runtime","common/vendor"]]]);