(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/wealth/myMoney"],{1674:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement;e._self._c},o=[];a.d(t,"a",function(){return n}),a.d(t,"b",function(){return o})},"683d":function(e,t,a){"use strict";a.r(t);var n=a("1674"),o=a("bf32");for(var i in o)"default"!==i&&function(e){a.d(t,e,function(){return o[e]})}(i);a("fd9f");var u=a("2877"),r=Object(u["a"])(o["default"],n["a"],n["b"],!1,null,null,null);t["default"]=r.exports},bf32:function(e,t,a){"use strict";a.r(t);var n=a("c100"),o=a.n(n);for(var i in n)"default"!==i&&function(e){a.d(t,e,function(){return n[e]})}(i);t["default"]=o.a},c100:function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n,o=r(a("f2e7")),i=r(a("ab50")),u=(a("5cc9"),a("1bfa"));function r(e){return e&&e.__esModule?e:{default:e}}var c=null,l={data:function(){return{cWidth:"",cHeight:"",pixelRatio:1,serverData:"",piearr:[],zer:0,buy:0,sell:0,totalRevenue:0}},onShow:function(){i.default.balance()},onNavigationBarButtonTap:function(t){e.navigateTo({url:"harvest"})},onLoad:function(){n=this,this.cWidth=e.upx2px(750),this.cHeight=e.upx2px(500);var t=this;(0,u.djRequest)({url:"/api/member/balance",method:"GET",success:function(e){t.zer=(parseFloat(e.data.data.ecash)+parseFloat(e.data.data.bonus)).toFixed(4)}}),(0,u.djRequest)({url:"/api/statistics/index",method:"GET",success:function(e){t.buy=e.data.data.buyOrderTotal,t.sell=e.data.data.sellOrderTotal,t.totalRevenue=(parseFloat(e.data.data.growingSeedTotal)+parseFloat(e.data.data.rewardSeedTotal)).toFixed(4)}})},mounted:function(){var e=this;setTimeout(function(){e.getServerData()},300)},methods:{getServerData:function(){var e=this,t={series:[{data:Number(e.sell),name:"总卖出("+e.sell+")",color:"#ee8622"},{data:Number(e.zer),name:"待卖出("+e.zer+")",color:"#efb964"},{data:Number(e.buy),name:"总买入("+e.buy+")",color:"#f7ac1a"}]};n.showPie("canvasPie",t)},showPie:function(e,t){c=new o.default({$this:n,canvasId:e,type:"pie",fontSize:11,legend:!0,background:"#FFFFFF",pixelRatio:n.pixelRatio,series:t.series,animation:!0,width:n.cWidth*n.pixelRatio,height:n.cHeight*n.pixelRatio,dataLabel:!0,extra:{pie:{lableWidth:15}}})},touchPie:function(e){c.showToolTip(e,{format:function(e){return e.name+":"+Number(e.data)}})}}};t.default=l}).call(this,a("6e42")["default"])},fc9d:function(e,t,a){},fd9f:function(e,t,a){"use strict";var n=a("fc9d"),o=a.n(n);o.a}},[["b064","common/runtime","common/vendor"]]]);