<template>
	<view>
		<view class="logo">欢迎登录WEALTH POINT</view>

		<form class="login_form" @submit="formSubmit">
			<view class="uni-form-item uni-column">
                <input class="uni-input" name="username" type="text" v-model="user" placeholder="手机号／邮箱"  />
			</view>
			
			<view class="uni-form-item uni-column">
                <input class="uni-input" name="password" password type="text" v-model="pwd" placeholder="密码"  />
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
				user:'',
				pwd:''
			}
		},
		onLoad() {
			var _this = this;
			uni.getStorage({
				key: 'userpwd',
				success: function (res) {
					_this.login(res.data);
				}
			});			
		},
		methods: {
			registre(){
				uni.navigateTo({
					url: '/pages/login/register'
				});
			},
			login(data){				
				djRequest({
					url:'/api/login',
					data:data,
					success:function(res) {
						if (res.data.status == 406) {
							common.TostUtil(res.data.message);
						} 
						if (res.data.status == 200){
							uni.setStorage({
								key:'sessionid',
								data:res.data.data.sessionId
							})
							
							uni.setStorage({
								key:'userpwd',
								data:data
							})							
																																		
							uni.setStorage({
								key:'loginInfo',
								data:JSON.stringify(res.data.data)
							})
							uni.setStorage({
								key:'time',
								data:JSON.stringify(new Date().getTime())
							})
							config.User = res.data.data;
							common.balance();
							if(res.data.data.realName==""){
								uni.navigateTo({
									url:'finishRegisterInfo'
								})
							}else{
								uni.switchTab({
								url: '/pages/index/index'
							});
							}
							
						}	
					},
				})	
			},
			formSubmit: function(e) {
				var data = e.detail.value;
				/* console.log(JSON.stringify(data)) */
				if (!common.isNotNull(data.username, "账号")) return;
				if (!common.isNotNull(data.password, "密码")) return;
				this.login(data);
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
