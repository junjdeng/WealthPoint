(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mine/addCode"],{1334:function(e,a,t){"use strict";var n=t("6212"),i=t.n(n);i.a},"26eb":function(e,a,t){"use strict";t.r(a);var n=t("2757"),i=t.n(n);for(var u in n)"default"!==u&&function(e){t.d(a,e,function(){return n[e]})}(u);a["default"]=i.a},2757:function(e,a,t){"use strict";(function(e){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n=r(t("ab50")),i=t("5cc9"),u=t("1bfa");function r(e){return e&&e.__esModule?e:{default:e}}var s=function(){return t.e("components/uni-icon/uni-icon").then(t.bind(null,"857b"))},o={data:function(){return{array:["微信","支付宝"],typeArr:["wechat","alipay"],index:0,flag:!0,type:"",userName:"",url:"",imageFile:null}},components:{uniIcon:s},created:function(){var e=this;e.getUserName(),e.type=e.array[e.index]},methods:{bindPickerChange:function(e){this.index=e.target.value,this.type=this.array[this.index]},chooseImg:function(){var a=this;e.chooseImage({sizeType:["original","compressed"],sourceType:["album"],count:1,success:function(t){a.url=t.tempFilePaths[0];var n=a;(0,u.djPostForm)({url:"/api/uploads",filePath:n.url,fileType:"image",name:"files",success:function(a){var t=JSON.parse(a.data);200==t.status?(n.url=i.config.BASE_URL+t.data.filePath+t.data.fileName,n.imageFile=t.data):e.showToast({title:t.data.message,icon:"none"})}})}})},getUserName:function(){var a=this;e.getStorage({key:"loginInfo",success:function(e){a.userName=JSON.parse(e.data).realName}})},formSubmit:function(){var a=this;if(n.default.RegUtil.isMatchRealName(a.userName)){if(n.default.isNotNull(a.url,"收款码图片")&&a.flag){var t=a.imageFile.filePath+a.imageFile.fileName,i={qr_code_file:t,accountName:a.userName,type:a.typeArr[a.index],status:"yes",name:""};a.flag=!1,(0,u.djRequest)({url:"/api/qrcode/uniapp_add",data:i,method:"POST",success:function(t){a.flag=!0,200===t.data.status?e.navigateBack():n.default.TostUtil(t.data.message)},fail:function(e){n.default.TostUtil(e.data.message)}})}}else n.default.TostUtil("请输入真实姓名！")}}};a.default=o}).call(this,t("6e42")["default"])},6212:function(e,a,t){},bcb9:function(e,a,t){"use strict";t.r(a);var n=t("d2e3"),i=t("26eb");for(var u in i)"default"!==u&&function(e){t.d(a,e,function(){return i[e]})}(u);t("1334");var r=t("2877"),s=Object(r["a"])(i["default"],n["a"],n["b"],!1,null,null,null);a["default"]=s.exports},d2e3:function(e,a,t){"use strict";var n=function(){var e=this,a=e.$createElement;e._self._c},i=[];t.d(a,"a",function(){return n}),t.d(a,"b",function(){return i})}},[["acde","common/runtime","common/vendor"]]]);