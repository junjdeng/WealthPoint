<template>
	<view>
		<view class="tips">为了您交易安全进行，请您先完善资料</view>
		<form class="login_form" @submit="formSubmit">
			<view class="uni-form-item uni-column flex-start">
				<span class="flex2 title">真实姓名</span>
                <input class="uni-input flex5" type="text" placeholder="请输入真实姓名" />
			</view>
			
			<view class="uni-form-item uni-column flex-start">
				<span class="flex2 title">安全密码</span>
                <input class="uni-input flex5" type="number" placeholder="请输入六位安全密码" />
			</view>
			
			<view class="uni-btn-v">
				<button formType="submit">完成</button>
			</view>
		</form>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			formSubmit(e){
				console.log(e);
				uni.switchTab({
					url: '/pages/index/index'
				});
			}
		}
	}
</script>

<style>
	.tips{font-size: 28upx; color: #333333; line-height: 3em; padding: 20upx;}
	.login_form{ position: relative;}
	.login_form .uni-form-item{ margin-bottom: 2upx; padding: 10upx 20upx; background: #ffffff;}
	.login_form .uni-form-item .title{color: #333333; font-size: 28upx;width: 710upx; padding: 20upx;}
	.login_form .uni-input{color: #333333; font-size: 28upx;  text-align: right;}
	.login_form .uni-btn-v{position: absolute; bottom: -200upx; left: 20upx; width: 710upx; }
	.login_form .uni-btn-v button{background: #CCA366; font-size: 32upx; color: #ffffff;}
</style>
