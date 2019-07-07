<template>
	<view class="container">
		<view class="form_wrap">
			<form class="dj_form" @submit="formSubmit">
				<view class="uni-form-item uni-column flex-start">
					<span class="flex2 title">原密码</span>
					<input class="uni-input flex5" name="old_password" type="password" placeholder="请输入原密码" />
				</view>
				
				<view class="uni-form-item uni-column flex-start">
					<span class="flex2 title">新密码</span>
					<input class="uni-input flex5" name="password" type="password" placeholder="请输入新密码" />
				</view>
				
				<view class="uni-form-item uni-column flex-start">
					<span class="flex2 title">确认密码</span>
					<input class="uni-input flex5" name="re_password" type="password" placeholder="请输入确认密码" />
				</view>
				
				<view class="uni-btn-v">
					<button formType="submit">完成</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	import common from '../../common/common.js'
	import {djRequest} from '../../common/request.js'
	
	export default {
		data() {
			return {
				type:0,
			}
		},
		components: {
			uniIcon
		},
		onLoad(options) {
			this.type = options.type;
			if (options.type == 1) {
				uni.setNavigationBarTitle({
					title:"修改登录密码"
				})
			} else{
				uni.setNavigationBarTitle({
					title:"修改安全密码"
				})
			}
		},
		methods: {
			formSubmit: function(e) {
				var data = e.detail.value;
				if (!common.isNotNull(data.old_password, "原密码")) return;
				if (!common.isNotNull(data.password, "新密码")) return;				
				if (!common.isNotNull(data.re_password, "确认密码")) return;
				if (data.password != data.re_password){
					uni.showToast({
						title:'新密码和确认密码不一致！',
						icon:"none"
					})
					return;
				} 
				
				var url = "/api/member/password";//登录密码
				if (this.type != 1) {
					url = "/api/member/security";//安全密码
				} 
				console.log(data,url);
				
				djRequest({
					url:url,
					data:data,
					success:function(res) {												
						if (res.data.status == 200){
							   uni.showToast({
								title:res.data.message,
								icon:"none",
								duration:1000,
								complete() {
									uni.navigateBack()
								}
							   })
						}else{
							uni.showToast({
								title:res.data.message,
								icon:"none"
							})
						}	
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
.dj_form .uni-form-item image{width:100upx; height: 100upx; border-radius: 50upx;}
.dj_form .uni-form-item .title{color: #333333; font-size: 28upx; line-height: 2em;}
.dj_form .uni-input{color: #333333; font-size: 28upx;  text-align: left;}
.dj_form .uni-btn-v{position: absolute; bottom: -200upx; left: 20upx; width: 710upx; }
.dj_form .uni-btn-v button{background: #CCA366; font-size: 32upx; color: #ffffff;}
</style>
