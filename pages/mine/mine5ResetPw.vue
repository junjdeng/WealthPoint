<template>
	<view class="container">
		<view class="form_wrap">
			<form class="dj_form" @submit="formSubmit">
				<view class="uni-form-item uni-column flex-start">
					<span class="flex2 title">原密码</span>
					<input class="uni-input flex5" type="password" v-model.trim="oldPwd" placeholder="请输入原密码" />
				</view>

				<view class="uni-form-item uni-column flex-start">
					<span class="flex2 title">新密码</span>
					<input class="uni-input flex5" type="password" v-model.trim="newPwd1" placeholder="请输入新密码" />
				</view>

				<view class="uni-form-item uni-column flex-start">
					<span class="flex2 title">确认密码</span>
					<input class="uni-input flex5" type="password" v-model.trim="newPwd2" placeholder="请输入确认密码" />
				</view>

				<view class="uni-btn-v">
					<button formType="submit">{{flag?'完成':'处理中...'}}</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	import common from '../../common/common.js'
	import { config } from '../../common/config.js'
	import { djRequest } from '../../common/request.js'
	export default {
		data() {
			return {
				type: 0,
				flag: true,
				oldPwd: '',
				newPwd1: '',
				newPwd2: ''
			}
		},
		components: {
			uniIcon
		},
		onLoad(options) {
			this.type = options.type;
			if (options.type == 1) {
				uni.setNavigationBarTitle({
					title: "修改登录密码"
				})
			} else {
				uni.setNavigationBarTitle({
					title: "修改安全密码"
				})
			}
		},
		methods: {
			formSubmit() {
				let that = this;
				if (that.flag) {
					that.flag = false;
					if (that.newPwd1 !== that.newPwd2) {
						common.TostUtil('两次输入的新密码不一致！');
						that.flag = true;
						return;
					}
					if (that.type == 1) {
						if (!common.RegUtil.isMatchPwd(that.newPwd1) || !common.RegUtil.isMatchPwd(that.newPwd2)) {
							common.TostUtil('新密码格式不正确！');
							that.flag = true;
							return;
						}
						djRequest({
							url: '/api/member/password',
							method: "POST",
							data: {
								old_password: that.oldPwd,
								password: that.newPwd1,
								re_password: that.newPwd2
							},
							success: function(res) {
								common.TostUtil(res.data.message);
								if (res.data.status === 200) {
									uni.navigateTo({
										url: '../login/login'
									})
								}
								that.flag = true;
							},
							fail: function(res) {
								common.TostUtil(res.data.message);
								that.oldPwd='';
								that.newPwd1='';
								that.newPwd2='';
								that.flag = true;
							}
						})
					}
					if (that.type == 2) {
						if (!common.RegUtil.isMatchSafePwd(that.newPwd1) || !common.RegUtil.isMatchSafePwd(that.newPwd2)) {
							common.TostUtil('新密码格式不正确');
							that.flag = true;
							return;
						}
						djRequest({
							url: '/api/member/security',
							method: "POST",
							data: {
								old_password: that.oldPwd,
								password: that.newPwd1
							},
							success: function(res) {
								common.TostUtil(res.data.message);
								that.oldPwd='';
								that.newPwd1='';
								that.newPwd2='';
								that.flag = true;
							},
							fail: function(res) {
								common.TostUtil(res.data.message);
								that.oldPwd='';
								that.newPwd1='';
								that.newPwd2='';
								that.flag = true;
							}
						})
					}
				}


			}
		}
	}
</script>

<style>
	.form_wrap {
		margin-top: 20upx;
	}

	.form_wrap .dj_form {
		display: inline-block;
		width: 750upx;
		position: relative;
	}

	.dj_form .uni-form-item {
		margin-bottom: 2upx;
		padding: 20upx;
		background: #ffffff;
	}

	.dj_form .uni-form-item image {
		width: 100upx;
		height: 100upx;
		border-radius: 50upx;
	}

	.dj_form .uni-form-item .title {
		color: #333333;
		font-size: 32upx;
		line-height: 2em;
	}

	.dj_form .uni-input {
		color: #333333;
		font-size: 28upx;
		text-align: left;
	}

	.dj_form .uni-btn-v {
		position: absolute;
		bottom: -200upx;
		left: 20upx;
		width: 710upx;
	}

	.dj_form .uni-btn-v button {
		background: #CCA366;
		font-size: 32upx;
		color: #ffffff;
	}
</style>
