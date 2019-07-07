<template>
	<view>
		<form class="login_form" @submit="formSubmit">
			<view class="uni-form-item uni-column">
                <input class="uni-input" type="text" placeholder="用户名" />
			</view>
			
			<view class="uni-form-item uni-column">
                <input class="uni-input" type="number" placeholder="手机号" />
			</view>
			
			<view class="uni-form-item uni-column" style="position: relative;">
                <input class="uni-input" type="text" placeholder="验证码" />
				<span class="getcode">获取验证码</span>
			</view>
			
			<view class="uni-form-item uni-column">
                <input class="uni-input" password type="text" placeholder="密码" />
			</view>
			
			
			<view class="uni-btn-v">
				<button formType="submit">注册</button>
			</view>
		</form>
		
		<view class="login" @tap="login">已有账号，去登录</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			login(){
				uni.navigateBack({	
				})
			},
			formSubmit(e){
				console.log(e);
				uni.navigateTo({
					url: '/pages/login/finishRegisterInfo'
				});
			}
		}
	}
</script>

<style>
	page{background: #ffffff;}
	.logo{text-align: center; font-size: 48upx; color: #333333; margin-top: 250upx;}
	.login_form{margin: 100upx 75upx; display: inline-block; width: 600upx;}
	.login_form .uni-form-item{margin-top: 40upx;}
	.login_form .uni-input{color: #333333; font-size: 32upx; border-bottom: 1px solid #999999;}
	.login_form .uni-btn-v{margin-top: 100upx;}
	.login_form .uni-btn-v button{background: #CCA366; font-size: 32upx; color: #ffffff;}
	.login{color: #999999; font-size: 24rpx; margin-top: -70upx; margin-left: 80upx;}
	.getcode{ position: absolute; right: 0; top: 0; font-size: 32upx; background:none; border: none; color: #CCA366;}
</style>
