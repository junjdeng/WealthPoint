<template>
	<view class="container">
		<view class="form_wrap">
			<form class="dj_form" @submit="formSubmit">
				<view class="uni-form-item uni-column flex-start">
					<span class="flex2 title">真实姓名:</span>
					<input class="uni-input flex5" v-model="userName" placeholder="请输入支付宝真实姓名" />
				</view>
				
				<view class="uni-form-item uni-column flex-start">
					<span class="flex2 title">收款类别:</span>
					<input class="uni-input" hidden disabled  :value="array[index]" />
					<picker class="flex5" @change="bindPickerChange" :value="index" :range="array">
						<view class="uni-input">{{array[index]}}</view>
			        </picker>
					<uni-icon type="forward" class="forward flex1" size="20" color="#999999"></uni-icon>
				</view>			
				
				<view class="uni-form-item uni-column flex-start">
					<span class=" title">收款码:</span>
					<view class="getImg">
						<input class="" @click="chooseImg"  type="file"  />
						<view class="showImg">
							<image :src="url"></image>
						</view>
					</view>
					
					
				</view>
				<view class="tips">
					*请务必确保二维码信息正确，如因错误的二维码信息导致收款失败，会员自行承担责任。
				</view>
				
				<view class="uni-btn-v">
					<button formType="submit">{{flag?'提交':'正在处理中...'}}</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	import common from '../../common/common.js'
	import {config} from '../../common/config.js'	
	import {djRequest,djPostForm} from '../../common/request.js'
	export default {
		data() {
			return {
				array: [
				  '微信',
				  '支付宝'
				],
				typeArr:['wechat','alipay'],
				index: 0,
				flag:true,
				type: '',//收款类别
				userName: '',//开户人
				url:'',
				imageFile:null,
			}
		},
		components: {
			uniIcon
		},
		created () {
			let that = this;
			that.getUserName();
			that.type = that.array[that.index];
		},
		methods: {
			bindPickerChange: function(e) {
				this.index = e.target.value,
				this.type=this.array[this.index];
			},
		chooseImg(){
				uni.chooseImage({
					sizeType: ['original', 'compressed'],
					sourceType: ['album'],
					count: 1,
					success: (imageFile) => {
						this.url = imageFile.tempFilePaths[0];																				
						var _this = this;
						djPostForm({
							url:"/api/uploads",
							filePath: _this.url,
							fileType: 'image',
							name: 'files',
							success:function(result) {
								var res = JSON.parse(result.data);
								if (res.status == 200){
									_this.url = config.BASE_URL + res.data.filePath+res.data.fileName;
									_this.imageFile = res.data;
								}else{
									uni.showToast({
										title:res.data.message,
										icon:"none"
									})
								}	
							}
						})									
					}
				})				
			}, 
			/* 获取用户名 */
			getUserName (){
				let that = this;
				uni.getStorage({
					key:'loginInfo',
					success(e){
						that.userName = JSON.parse(e.data).realName;
					}
				})
			},
			formSubmit () {//确定提交
				let that = this;
				if (!common.RegUtil.isMatchRealName(that.userName)) {
					common.TostUtil('请输入真实姓名！');
					return ;
				  }
				if (!common.isNotNull(that.url, "收款码图片")) return;
				
				if(that.flag){
				  var imageUrl = that.imageFile.filePath+that.imageFile.fileName;
				  var data = {
					  'qr_code_file':imageUrl,
					  'accountName':that.userName,
					  'type':that.typeArr[that.index],
					  'status':'yes',
					  'name':''
				  }
				  
				  that.flag = false;				  
				  djRequest({
					url: '/api/qrcode/uniapp_add',
					data: data,
					method: 'POST',
					success: function(res) {
						that.flag = true;
						if (res.data.status === 200) {
							uni.navigateBack();
						} else {
							common.TostUtil(res.data.message);
						}						
					},
					fail: function(res) {
						common.TostUtil(res.data.message);						
					}
				})
				  			 
				}
			},
		}
	}
</script>

<style>
.form_wrap{ margin-top: 20upx;}
.form_wrap .dj_form{display: inline-block; width: 750upx;position: relative;}
.dj_form .uni-form-item{ margin-bottom: 2upx; padding: 20upx; background: #ffffff;}
/* .dj_form .uni-form-item image{width:100upx; height: 100upx; border-radius: 50upx;} */
.dj_form .uni-form-item .title{color: #333333; font-size: 28upx; line-height: 2em;}
.dj_form .uni-input{color: #333333; font-size: 28upx;  text-align: right;}
.dj_form .uni-btn-v{position: absolute; bottom: -200upx; left: 20upx; width: 710upx; }
.dj_form .uni-btn-v button{background: #CCA366; font-size: 32upx; color: #ffffff;}
.dj_form .uni-form-item  .forward{text-align: right;}
.dj_form .tips{padding: 20upx; margin-top: 1em; font-size: 24upx; color: #D03C29;}
.getImg{
	width:160upx;
	height:160upx;
	border:1px solid #f7f7f7;
	position:relative;
	margin-left:40upx;
	background-image: url('./../../static/images/bgs.png');
	background-size:100% 100%;
	
	}
.getImg input{
	display:block;
	width:100%;
	height:100%;
	opacity:1;
	position:absolute;
	left:0;
	top:0;
	z-index:100;
}
.showImg{
	width:100%;
	height:100%;
	position:absolute;
	left:0;
	top:0;
	z-index:99;
}
.showImg image{
	width:100%;
	height:100%;
	object-fit:cover;
}
</style>
