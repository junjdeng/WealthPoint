(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"2b91":function(t,e,a){"use strict";a.r(e);var n=a("6e1f"),i=a.n(n);for(var o in n)"default"!==o&&function(t){a.d(e,t,function(){return n[t]})}(o);e["default"]=i.a},"40ae":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement;t._self._c},i=[];a.d(e,"a",function(){return n}),a.d(e,"b",function(){return i})},4820:function(t,e,a){"use strict";a.r(e);var n=a("40ae"),i=a("2b91");for(var o in i)"default"!==o&&function(t){a.d(e,t,function(){return i[t]})}(o);a("8989");var s=a("2877"),u=Object(s["a"])(i["default"],n["a"],n["b"],!1,null,null,null);e["default"]=u.exports},"56d8":function(t,e,a){},"6e1f":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=s(a("ce167")),i=a("25f1"),o=s(a("1de3"));a("2966");function s(t){return t&&t.__esModule?t:{default:t}}a("7919"),a("abba");var u,r=function(){return a.e("components/uni-icon/uni-icon").then(a.bind(null,"fc60"))},c=null,d=null,l={data:function(){return{news:"暂无公告",updateStatus:!1,showPop:!1,cWidth:"",cHeight:"",pixelRatio:.96,das:[],week:[],das2:[],theNow:0,low:0,high:0,amount:0,opens:0,cent:0,num:0,color:0}},components:{uniIcon:r},onNavigationBarButtonTap:function(e){t.navigateTo({url:"message"})},onShow:function(){var t=this;(0,i.djRequest)({url:"/api/sign/sign_list",method:"POST",data:{start:0,length:50},success:function(e){if(0==e.data.data.data.length)t.showPop=!0;else{var a=e.data.data.data[0].time,n=new Date(1e3*a),i=(n.getFullYear(),n.getDate());i=i<10?"0"+i:i;var o=new Date,s=o.getDate();s=s<10?"0"+s:s,t.showPop=i!==s}}}),this.getBTC()},onLoad:function(){o.default.balance(),u=this,this.cWidth=t.upx2px(680),this.cHeight=t.upx2px(460),this.getServerData(),this.getServerData2()},methods:{nowDate:function(t){var e=new Date(Number(t)),a=e.getMonth()+1,n=e.getDate();return a+"."+n},getNews:function(){var t=this;(0,i.djRequest)({url:"/api/news",data:{start:0,length:1},success:function(e){200==e.data.status&&e.data.data.data.length>0&&(t.news=e.data.data.data[0].title)}})},getBTC:function(){var e=this;t.request({url:"https://api.huobi.pro/market/detail",data:{symbol:"btcusdt"},method:"GET",success:function(t){e.amount=Number(t.data.tick.amount).toFixed(2),e.high=Number(t.data.tick.high).toFixed(2),e.low=Number(t.data.tick.low).toFixed(2),e.theNow=Number(t.data.tick.close).toFixed(2),e.opens=Number(t.data.tick.open).toFixed(2),e.num=Number(e.theNow-e.opens).toFixed(2),e.cent=Number(e.num/e.opens*100).toFixed(2),e.color=Number(e.low-e.opens)},fail:function(t){console.log(t,4," at pages\\index\\index.vue:239")}})},navTo:function(e){t.navigateTo({url:e.currentTarget.dataset.url})},getServerData:function(){var t={categories:[],series:[]};(0,i.djRequest)({url:"/api/statistics/income",method:"GET",success:function(e){var a=e.data.data,n=[],i=[];for(var o in a)i.push(o),n.push(String(a[o].number/100));t.categories=i,t.series=[{data:n,name:"",color:"#FF5533"}],u.CanvasData("canvas",t)}})},CanvasData:function(t,e){d=new n.default({$this:u,canvasId:t,type:"line",fontSize:8,legend:!1,dataLabel:!1,dataPointShape:!1,background:"transparent",dataLineColor:"#333333",pixelRatio:u.pixelRatio,categories:e.categories,series:e.series,animation:!1,xAxis:{dashLength:8,gridColor:"transparent"},yAxis:{dashLength:8,splitNumber:5,min:0,disabled:!1,max:2,format:function(t){return t}},width:u.cWidth*u.pixelRatio,height:u.cHeight*u.pixelRatio,extra:{lineStyle:"curve"}})},touchCanvas:function(t){d.showToolTip(t,{format:function(t,e){return t.data+"%"}})},hidePop:function(){this.showPop=!1},getServerData2:function(){var t={categories:[],series:[]};(0,i.djRequest)({url:"/api/statistics/orders",method:"GET",success:function(e){var a=e.data.data,n=[],i=[];for(var o in a)i.push(o),n.push(String(a[o].number.toFixed(2)));t.categories=i,t.series=[{data:n,name:"",color:"#FF5533"}],u.showColumn("canvasColumn",t)}})},showColumn:function(t,e){c=new n.default({$this:u,canvasId:t,type:"column",legend:!1,fontSize:8,background:"#FFFFFF",pixelRatio:u.pixelRatio,animation:!0,categories:e.categories,series:e.series,xAxis:{disableGrid:!0},yAxis:{dashLength:8,splitNumber:4,min:0,disabled:!1,max:500,format:function(t){return t}},dataLabel:!0,width:u.cWidth*u.pixelRatio,height:u.cHeight*u.pixelRatio,extra:{column:{type:"group",width:u.cWidth*u.pixelRatio*.45/e.categories.length}}})},touchColumn:function(t){c.showToolTip(t,{format:function(t,e){return"object"===typeof t.data?e+" "+t.name+":"+t.data.value:e+" "+t.name+":"+t.data}})}}};e.default=l}).call(this,a("6e42")["default"])},8989:function(t,e,a){"use strict";var n=a("56d8"),i=a.n(n);i.a}},[["798f","common/runtime","common/vendor"]]]);