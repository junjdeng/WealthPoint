(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mine/mine3Addbank"],{5051:function(e,a,t){"use strict";var n=function(){var e=this,a=e.$createElement;e._self._c},u=[];t.d(a,"a",function(){return n}),t.d(a,"b",function(){return u})},"9c47":function(e,a,t){},b795:function(e,a,t){"use strict";t.r(a);var n=t("5051"),u=t("cfff");for(var i in u)"default"!==i&&function(e){t.d(a,e,function(){return u[e]})}(i);t("d9f1");var r=t("2877"),s=Object(r["a"])(u["default"],n["a"],n["b"],!1,null,null,null);a["default"]=s.exports},cfff:function(e,a,t){"use strict";t.r(a);var n=t("e114"),u=t.n(n);for(var i in n)"default"!==i&&function(e){t.d(a,e,function(){return n[e]})}(i);a["default"]=u.a},d9f1:function(e,a,t){"use strict";var n=t("9c47"),u=t.n(n);u.a},e114:function(e,a,t){"use strict";(function(e){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n=r(t("ab50")),u=t("5cc9"),i=t("1bfa");function r(e){return e&&e.__esModule?e:{default:e}}var s=function(){return t.e("components/uni-icon/uni-icon").then(t.bind(null,"857b"))},f={data:function(){return{array:["中国银行","中国建设银行","中国农业银行","中国工商银行","交通银行","广发银行","上海浦东发展银行","招商银行","平安银行","中国邮政储蓄银行","兴业银行","民生银行","光大银行","中信银行","华夏银行","上海银行","北京银行","花旗中国银行","汇丰中国银行","渣打中国银行","香港汇丰银行","其他银行"],index:0,flag:!0,bankAddress:"",bankName:"",bankNumber:"",userName:""}},onShow:function(){this.userName=u.config.User.realName},components:{uniIcon:s},created:function(){var e=this;e.bankName=e.array[e.index]},methods:{bindPickerChange:function(e){this.index=e.target.value,this.bankName=this.array[this.index]},getUserName:function(){var a=this;e.getStorage({key:"loginInfo",success:function(e){a.userName=JSON.parse(e.data).realName}})},formSubmit:function(){var a=this;if(a.flag){if(a.flag=!1,!n.default.RegUtil.isMatchRealName(a.userName))return n.default.TostUtil("请输入开户人！"),void(a.flag=!0);if(!n.default.RegUtil.isMatchBankNumber(a.bankNumber))return n.default.TostUtil("请输入16~19位银行卡号！"),void(a.flag=!0);if(""===a.bankAddress)return n.default.TostUtil("请输入开户行！"),void(a.flag=!0);(0,i.djRequest)({url:"/api/bank/add",data:{bankName:a.bankName,bankNumber:a.bankNumber,bankAccountName:a.userName,bankAddress:a.bankAddress,status:"yes"},method:"POST",success:function(t){406===t.data.status&&(n.default.TostUtil(t.data.message),"请完善个人资料，填写真实姓名"===t.data.message&&e.navigateTo({url:"./../login/finishRegisterInfo"}),a.flag=!0),200===t.data.status&&(a.bankNumber="",n.default.TostUtil(t.data.message),a.flag=!0,setTimeout(function(){e.navigateBack()},1e3))}})}}}};a.default=f}).call(this,t("6e42")["default"])}},[["6be4","common/runtime","common/vendor"]]]);