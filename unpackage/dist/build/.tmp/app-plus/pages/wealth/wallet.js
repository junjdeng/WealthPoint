(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/wealth/wallet"],{"0025":function(t,n,e){"use strict";e.r(n);var a=e("c558"),o=e("414f");for(var i in o)"default"!==i&&function(t){e.d(n,t,function(){return o[t]})}(i);e("7488");var l=e("2877"),u=Object(l["a"])(o["default"],a["a"],a["b"],!1,null,null,null);n["default"]=u.exports},"14c9":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=i(e("ab50")),o=e("5cc9");e("1bfa");function i(t){return t&&t.__esModule?t:{default:t}}var l=function(){return e.e("components/uni-icon/uni-icon").then(e.bind(null,"857b"))},u={data:function(){return{type:1,wallet:0,listWallet:[],listBonus:[]}},components:{uniIcon:l},onShow:function(){a.default.balance()},onNavigationBarButtonTap:function(n){var e=this;1==e.type?t.navigateTo({url:"walletDetail?type=1"}):2==e.type&&t.navigateTo({url:"walletDetail?type=2"})},onLoad:function(n){this.type=n.type,1==n.type?t.setNavigationBarTitle({title:"希望钱包"}):2==n.type&&t.setNavigationBarTitle({title:"奖金钱包"}),this.wallets()},methods:{navTo:function(n){var e=this;t.navigateTo({url:n.currentTarget.dataset.url+"?type="+e.type})},wallets:function(){var t=this;1==t.type?t.wallet=parseFloat(o.config.balance.ecash).toFixed(4):2==t.type&&(t.wallet=parseFloat(o.config.balance.bonus).toFixed(4))}}};n.default=u}).call(this,e("6e42")["default"])},"414f":function(t,n,e){"use strict";e.r(n);var a=e("14c9"),o=e.n(a);for(var i in a)"default"!==i&&function(t){e.d(n,t,function(){return a[t]})}(i);n["default"]=o.a},7488:function(t,n,e){"use strict";var a=e("97c0"),o=e.n(a);o.a},"97c0":function(t,n,e){},c558:function(t,n,e){"use strict";var a=function(){var t=this,n=t.$createElement;t._self._c},o=[];e.d(n,"a",function(){return a}),e.d(n,"b",function(){return o})}},[["7f6f","common/runtime","common/vendor"]]]);