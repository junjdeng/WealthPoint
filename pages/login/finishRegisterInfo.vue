<template>
	<view>
		<view class="tips">为了您交易安全进行，请您先完善资料</view>
		<form class="login_form" @submit="formSubmit">
			<view class="uni-form-item uni-column flex-start">
				<span class="flex2 title">真实姓名</span>
                <input class="uni-input flex5" type="text" v-model.trim="realName" placeholder="请输入真实姓名" />
			</view>
			
			<view class="uni-form-item uni-column flex-start">
				<span class="flex2 title">安全密码</span>
                <input class="uni-input flex5" v-model.trim="pwd" type="password" placeholder="请输入六位安全密码" />
			</view>
			<view class="uni-btn-v">
				<button formType="submit">完成</button>
			</view>
		</form>
	</view>
</template>

<script>
	import common from '../../common/common.js'
	import {config} from '../../common/config.js'	
	import {djRequest} from '../../common/request.js'
	export default {
		data() {
			return {
				realName:'',
				pwd:''
			}
		},
		onNavigationBarButtonTap(e) {
			uni.switchTab({
				url: '../index/index'
			})
		},
		methods: {
			submit(){
				let that = this;
				djRequest({
					url:'/api/member/update',
					method:'POST',
					data:{
						type:'realname',
						value:that.realName
					},
					success:function(res){
						 if (res.data.status === 200) {
						config.User.realName=that.realName;
						common.TostUtil(res.data.message);
						
						setTimeout(function(){
							uni.switchTab({
								url: '/pages/index/index'
							});
						},400)
					  }
					}
				})
			},
			formSubmit(e){
				let that = this;
				if (that.pwd === '') {
					common.TostUtil('请输入安全密码！');
					return;
				}
				if (that.realName === '') {
					common.TostUtil('真实姓名！');
					return;
				}
				djRequest({ //校验安全密码
					url: '/api/member/verify_security',
					data: {
						password: that.pwd
					},
					success: function(res) {
						if (res.data.status === 200) { //安仔密码正确
							that.submit();
						} else { //错误提示用户信息
							common.TostUtil(res.data.message);
							that.pwd = '';
							return;
						}
					},
					fail: function(res) {
						that.pwd = '';
						common.TostUtil(res.data.message);
					}
				})
				
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
