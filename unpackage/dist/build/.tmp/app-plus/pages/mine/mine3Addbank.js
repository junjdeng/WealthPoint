(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mine/mine3Addbank"],{"1f2d":function(a,e,t){"use strict";var n=function(){var a=this,e=a.$createElement;a._self._c},u=[];t.d(e,"a",function(){return n}),t.d(e,"b",function(){return u})},"70d1":function(a,e,t){"use strict";t.r(e);var n=t("d0dd"),u=t.n(n);for(var i in n)"default"!==i&&function(a){t.d(e,a,function(){return n[a]})}(i);e["default"]=u.a},"8c72":function(a,e,t){"use strict";var n=t("9121"),u=t.n(n);u.a},9121:function(a,e,t){},b6fc:function(a,e,t){"use strict";t.r(e);var n=t("1f2d"),u=t("70d1");for(var i in u)"default"!==i&&function(a){t.d(e,a,function(){return u[a]})}(i);t("8c72");var r=t("2877"),s=Object(r["a"])(u["default"],n["a"],n["b"],!1,null,null,null);e["default"]=s.exports},d0dd:function(a,e,t){"use strict";(function(a){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=i(t("9e47")),u=(t("7c6a"),t("7461"));function i(a){return a&&a.__esModule?a:{default:a}}var r=function(){return t.e("components/uni-icon/uni-icon").then(t.bind(null,"7ca9"))},s={data:function(){return{array:["中国银行","中国建设银行","中国农业银行","中国工商银行","交通银行","广发银行","上海浦东发展银行","招商银行","平安银行","中国邮政储蓄银行","兴业银行","民生银行","光大银行","中信银行","华夏银行","上海银行","北京银行","花旗中国银行","汇丰中国银行","渣打中国银行","香港汇丰银行","其他银行"],index:0,flag:!0,bankAddress:"",bankName:"",bankNumber:"",userName:""}},components:{uniIcon:r},created:function(){var a=this;a.getUserName(),a.bankName=a.array[a.index]},methods:{bindPickerChange:function(a){this.index=a.target.value,this.bankName=this.array[this.index]},getUserName:function(){var e=this;a.getStorage({key:"loginInfo",success:function(a){e.userName=JSON.parse(a.data).realName}})},formSubmit:function(){var e=this;if(e.flag){if(e.flag=!1,!n.default.RegUtil.isMatchRealName(e.userName))return n.default.TostUtil("请输入开户人！"),void(e.flag=!0);if(!n.default.RegUtil.isMatchBankNumber(e.bankNumber))return n.default.TostUtil("请输入16~19位银行卡号！"),void(e.flag=!0);if(""===e.bankAddress)return n.default.TostUtil("请输入开户行！"),void(e.flag=!0);(0,u.djRequest)({url:"/api/bank/add",data:{bankName:e.bankName,bankNumber:e.bankNumber,bankAccountName:e.userName,bankAddress:e.bankAddress,status:"yes"},method:"POST",success:function(t){406===t.data.status&&(n.default.TostUtil(t.data.message),"请完善个人资料，填写真实姓名"===t.data.message&&a.navigateTo({url:"./../login/finishRegisterInfo"}),e.flag=!0),200===t.data.status&&(e.bankNumber="",n.default.TostUtil(t.data.message),e.flag=!0)}})}}}};e.default=s}).call(this,t("6e42")["default"])}},[["75fc","common/runtime","common/vendor"]]]);