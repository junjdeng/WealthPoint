<template>
	<view>
		<view class="logo">欢迎登录WEALTH POINT</view>

		<form class="login_form" @submit="formSubmit">
			<view class="uni-form-item uni-column">
                <input class="uni-input" name="username" type="text" placeholder="手机号／邮箱" value="kaixin" />
			</view>
			
			<view class="uni-form-item uni-column">
                <input class="uni-input" name="password" password type="text" placeholder="密码" value="a123456" />
			</view>
									
			<view class="uni-btn-v">
				<button formType="submit">登录</button>
			</view>
		</form>
		
		<view class="register" @tap="registre">暂无账号，立即注册</view>

	</view>
</template>

<script>
	import common from '../../common/common.js'
	import {config} from '../../common/config.js'	
	import {djRequest} from '../../common/request.js'
	
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			registre(){
				uni.navigateTo({
					url: '/pages/login/register'
				});
			},
			formSubmit: function(e) {
				var data = e.detail.value;
				console.log(JSON.stringify(data))
				if (!common.isNotNull(data.username, "账号")) return;
				if (!common.isNotNull(data.password, "密码")) return;
				
				djRequest({
					url:'/api/login',
					data:data,
					success:function(res) {
						console.log(res);						
						if (res.data.status == 406) {
							uni.showToast({
								title:res.data.message
							})
						} 
						
						if (res.data.status == 200){
							config.User = res.data.data;
							uni.switchTab({
								url: '/pages/index/index'
							});
						}	
					}
				})	
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
	.register{color: #CCA366; font-size: 32rpx; text-align: center;}
</style>
