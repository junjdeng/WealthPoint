<template>
	<view>
		<form class="login_form" @submit="formSubmit">
			<view class="uni-form-item uni-column">
				<input class="uni-input" type="text" v-model.trim="userName" placeholder="用户名" />
			</view>

			<view class="uni-form-item uni-column">
				<input class="uni-input" type="number" v-model.trim="userPhone" placeholder="手机号" />
			</view>

			<view class="uni-form-item uni-column codes" style="position: relative;">
				<input class="uni-input"  type="number" v-model.trim="userCode" placeholder="验证码" />
				<text class="getcode" @click="goMess" v-if="show">获取验证码</text>
				<text class="getcode" v-else>重新发送({{count}})</text>
			</view>

			<view class="uni-form-item uni-column">
				<input class="uni-input" password type="text" v-model.trim="userPwd" placeholder="密码" />
			</view>
			<view class="uni-btn-v">
				<button formType="submit">注册</button>
			</view>
		</form>
		<view class="login" @tap="login">已有账号，去登录</view>

	</view>
</template>

<script>
	import common from '../../common/common.js'
	import {
		config
	} from '../../common/config.js'
	import {
		djRequest
	} from '../../common/request.js'
	export default {
		data() {
			return {
				show: true,
				count: '',
				timer: null,
				choose: true,
				userName: '',
				userPwd: '',
				userPhone: '',
				userCode: ''
			}
		},
		methods: {
			login() {
				uni.navigateTo({
					url:'login'
				})
			},
			formSubmit() {
				console.log(3)
				const that = this;
				if (!common.RegUtil.isMatchMix(that.userName)) {
					common.TostUtil('请输入正确格式的用户名！');
					return;
				}
				if (!common.RegUtil.isMatchPwd(that.userPwd)) {
					common.TostUtil('密码格式不正确！');
					return;
				}
				if (!common.RegUtil.isMatchPhoneNumber(that.userPhone)) {
					common.TostUtil('手机号码格式不正确！');
					return;
				}
				if (that.userCode === '') {
					common.TostUtil('请输入验证码！');
					return;
				}
				djRequest({
					url:'/api/register/ajax',
					method:'GET',
					data:{
						key: 'username' || 'phone' || 'invite_name',
						value: that.userName || that.userPhone
					},
					success:function(res){
						if (res.data.status === 200) {
							that.secondAjax(res.data.status)
						} else {
							common.TostUtil(res.data.message);
						}
					}
				})
			},
			goMess() { //yanzhengma
				const that = this;
				/*Util.ajax.checkGetAuth(function(){*/
				if (!common.RegUtil.isMatchPhoneNumber(that.userPhone)) {
					common.TostUtil('请输入正确的手机号码！');
					return false;
				} else {
					const TIME_COUNT = 60;
					clearInterval(that.timer);
					if (!that.timer) {
						djRequest({
							url:'/api/register/sms',
							data:{
								phone:that.userPhone
							},
							method:'POST',
							success:function(res){
								if (res.data.status === 200) {
									that.count = TIME_COUNT;
									that.show = false;
									that.timer = setInterval(() => {
										if (that.count > 0 && that.count <= TIME_COUNT) {
											that.count--;
										} else {
											that.show = true;
											clearInterval(that.timer);
											that.timer = null;
										}
									}, 1000);
									common.TostUtil(res.data.message);
								} else {
									that.show = true;
									common.TostUtil(res.data.message);
									return false;
								}
							}
						})
						
					}
				}
			},
			secondAjax(num) {
				let that =this;
				if (num === 200) {
					djRequest({
						url:'/api/register',
						method:'POST',
						data:{
							username: that.userName,
							password: that.userPwd,
							phone: that.userPhone,
							sms_code: that.userCode
						},
						success:function(res1){
							if (res1.data.status === 200) {
								common.TostUtil(res1.data.message);
								uni.navigateTo({
									url:'login'
								})
							}else{
								common.TostUtil(res1.data.message);
							}
						}
					})
				}
			}
		}
	}
</script>

<style>
	page {
		background: #ffffff;
	}

	.logo {
		text-align: center;
		font-size: 48upx;
		color: #333333;
		margin-top: 250upx;
	}

	.login_form {
		margin: 100upx 75upx;
		display: inline-block;
		width: 600upx;
	}

	.login_form .uni-form-item {
		margin-top: 40upx;
		border-bottom: 1px solid #999999;
	}

	.login_form .uni-input {
		color: #333333;
		font-size: 32upx;
	}

	.login_form .uni-btn-v {
		margin-top: 100upx;
	}

	.login_form .uni-btn-v button {
		background: #CCA366;
		font-size: 32upx;
		color: #ffffff;
	}

	.login {
		color: #999999;
		font-size: 24rpx;
		margin-top: -70upx;
		margin-left: 80upx;
	}

	.getcode {
		/* position: absolute;
		right: 0;
		top: 0; */
		margin-left:50upx;
		font-size: 32upx;
		height:60upx;
		display:inline-block;
		width:180upx;
		background: none;
		border: none;
		color: #CCA366;
		z-index:10000;
		
	}
	.codes{
		display:flex;
		justify-content: space-between;
		align-items:center;
	}
</style>
