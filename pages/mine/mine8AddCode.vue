<template>
	<view class="container">
		<view class="form_wrap">
			<form class="dj_form" @submit="formSubmit">
				<view class="uni-form-item uni-column flex-start">
					<span class="flex2 title">姓名</span>
					<input class="uni-input flex5" disabled name="accountName" :value="user.realName" placeholder="请输入持卡人姓名" />
				</view>
				
				<view class="uni-form-item uni-column flex-start">
					<span class="flex2 title" >收款类别</span>
					<input class="uni-input" name="type" hidden disabled  :value="arrayType[index]" />
					<picker class="flex5" @change="bindPickerChange" :value="index" :range="array">
						<view class="uni-input">{{array[index]}}</view>
			        </picker>
					<uni-icon type="forward" class="forward flex1" size="20" color="#999999"></uni-icon>
				</view>			
				
				<view class="uni-form-item uni-column flex-start">
					<span class="flex2 title">收款码</span>									
					<view class="flex5">
						<view class="upImage_wrap" @tap="chooseImage">
							<image class="upImage" :src="tempImagePath" :data-src="tempImagePath"></image>						
						</view>
					</view>
				</view>

				<view class="tips">
					<input class="uni-input" name="status" hidden disabled  value="yes"/>
					<input name="name" hidden disabled   value=""/>
					*请务必确保收款码信息正确，如因错误的收款码信息导致收款失败，会员自行承担责任。
				</view>
				
				<view class="uni-btn-v">
					<button formType="submit">提交</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	import {config} from '../../common/config.js'
	import common from '../../common/common.js'
	import {djPostForm} from '../../common/request.js'
	
	export default {
		data() {
			return {
				user:config.User,
				array: ['微信收款','支付宝收款'],
				arrayType: ['wechat','alipay'],						  
				index: 0,
				tempImagePath:'../../static/images/addpic.jpg',
				tempFile:""
			}
		},
		components: {
			uniIcon
		},
		onLoad() {
			
		},
		methods: {
			bindPickerChange: function(e) {
				this.index = e.target.value
			},
			chooseImage: async function() {
				uni.chooseImage({
					sourceType:  '拍照或相册',
					sizeType: '原图',
					count: 1,
					success: (res) => {
						console.log(res);
						this.tempImagePath = res.tempFilePaths;
						this.tempFile = res.tempFiles;
					}
				})
			},
			formSubmit: function(e) {
				var data = e.detail.value;
				if (this.tempImagePath == '../../static/images/addpic.jpg') {
					uni.showToast({
							title:'请上传收款码图片',
							icon:"none"
					})
					return;
				}
				
				data.qr_code_file = this.tempFile[0];												
				console.log(data);
				var _this = this;
				djPostForm({
					url:"/api/qrcode/add",
					data:data,
					name:"qr_code_file",
					filePath:_this.tempImagePath,
					success:function(res) {	
						console.log(res);
						// if (res.data.status == 200){
						// 	   uni.showToast({
						// 		title:res.data.message,
						// 		icon:"none",
						// 		duration:1000,
						// 		complete() {
						// 			uni.navigateBack()
						// 		}
						// 	   })
						// }else{
						// 	uni.showToast({
						// 		title:res.data.message,
						// 		icon:"none"
						// 	   })
						// }	
					}
				})	
            }
		}
	}
</script>

<style>
.form_wrap{ margin-top: 20upx;}
.form_wrap .dj_form{display: inline-block; width: 750upx;position: relative;}
.dj_form .uni-form-item{ margin-bottom: 2upx; padding: 20upx; background: #ffffff;}
.dj_form .uni-form-item .title{color: #333333; font-size: 28upx; line-height: 2em;}
.dj_form .uni-input{color: #333333; font-size: 28upx;  text-align: right;}
.dj_form .uni-btn-v{position: absolute; bottom: -200upx; left: 20upx; width: 710upx; }
.dj_form .uni-btn-v button{background: #CCA366; font-size: 32upx; color: #ffffff;}
.dj_form .uni-form-item  .forward{text-align: right;}
.dj_form .tips{padding: 20upx; margin-top: 1em; font-size: 24upx; color: #D03C29;}
.upImage_wrap{text-align: right; margin-right: 50upx;}
.upImage{width:200upx; height: 200upx;}
</style>
