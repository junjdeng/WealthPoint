(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/wealth/OrderConfirm","components/uni-icon/uni-icon"],{"0691":function(t,n,e){"use strict";var r=function(){var t=this,n=t.$createElement;t._self._c},u=[];e.d(n,"a",function(){return r}),e.d(n,"b",function(){return u})},"401d":function(t,n,e){},"528a":function(t,n,e){"use strict";e.r(n);var r=e("a9c7"),u=e("bbdd");for(var a in u)"default"!==a&&function(t){e.d(n,t,function(){return u[t]})}(a);e("9aa5");var i=e("2877"),o=Object(i["a"])(u["default"],r["a"],r["b"],!1,null,"54db8e0e",null);n["default"]=o.exports},"6bfb":function(t,n,e){"use strict";var r=e("6f36"),u=e.n(r);u.a},"6f36":function(t,n,e){},"857b":function(t,n,e){"use strict";e.r(n);var r=e("0691"),u=e("9c2b");for(var a in u)"default"!==a&&function(t){e.d(n,t,function(){return u[t]})}(a);e("6bfb");var i=e("2877"),o=Object(i["a"])(u["default"],r["a"],r["b"],!1,null,null,null);n["default"]=o.exports},"927b":function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r={name:"uni-icon",props:{type:String,color:String,size:[Number,String]},computed:{fontSize:function(){return"".concat(this.size,"px")}},methods:{onClick:function(){this.$emit("click")}}};n.default=r},"9aa5":function(t,n,e){"use strict";var r=e("401d"),u=e.n(r);u.a},"9c2b":function(t,n,e){"use strict";e.r(n);var r=e("927b"),u=e.n(r);for(var a in r)"default"!==a&&function(t){e.d(n,t,function(){return r[t]})}(a);n["default"]=u.a},a9c7:function(t,n,e){"use strict";var r=function(){var t=this,n=t.$createElement,e=(t._self._c,t._f("formatDate")(t.record.time,1));t.$mp.data=Object.assign({},{$root:{f0:e}})},u=[];e.d(n,"a",function(){return r}),e.d(n,"b",function(){return u})},b873:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;u(e("857b")),u(e("ab50")),e("5cc9");var r=e("1bfa");function u(t){return t&&t.__esModule?t:{default:t}}var a={data:function(){return{record:{},id:0}},onLoad:function(t){this.id=t.id,this.getData()},methods:{getData:function(){var t=this;(0,r.djRequest)({url:"/api/payment/show",data:{Id:Number(t.id),type:"order"},method:"GET",success:function(n){200===n.data.status&&(t.record=n.data.data)}})}}};n.default=a},bbdd:function(t,n,e){"use strict";e.r(n);var r=e("b873"),u=e.n(r);for(var a in r)"default"!==a&&function(t){e.d(n,t,function(){return r[t]})}(a);n["default"]=u.a}},[["b9b1","common/runtime","common/vendor"]]]);