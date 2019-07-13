<template>
	<view class="container">
		<view class="form_wrap">
			<form class="dj_form" @submit="formSubmit">
				<view class="uni-form-item uni-column flex-start">
					<span class="flex2 title">真实姓名</span>
					<input class="uni-input flex5" v-model.trim="realName" placeholder="请输入您的真实姓名" />
				</view>

				<view class="uni-form-item uni-column flex-start">
					<span class="flex2 title">安全密码</span>
					<input class="uni-input flex5" v-model.trim="safePwd" type="password" placeholder="请输入安全密码" />
				</view>

				<view class="tips">
					*当前拥有改名卡<text>{{num}}</text>张。
				</view>

				<view class="uni-btn-v">
					<button formType="submit">{{flag?"提交":"处理中..."}}</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
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
				realName: '',
				flag: true,
				safePwd: '',
				num: 0 //手机卡数量
			}
		},
		components: {
			uniIcon
		},
		onShow() {
			common.balance();
			this.num = config.balance.name;
		},
		methods: {
			postNumber() {
				let that = this;
				if (!common.RegUtil.isMatchRealName(that.realName)) {
					common.TostUtil('真实姓名格式不正确!');
					that.flag = true;
					return;
				}
				if (that.num <= 0) {
					common.TostUtil('改名卡不足！');
					that.flag = true;
					return;
				}
				djRequest({
					url: '/api/member/update',
					method: 'POST',
					data: {
						type:'realname',
						value: that.realName
					},
					success: function(res) {
						common.TostUtil(res.data.message);
						if (res.data.status === 200) {
							common.balance();
							config.User.realName=that.realName;
							that.realName = '';
							that.safePwd = '';
							setTimeout(function() {
								uni.navigateBack()
							}, 1000)
						}
					}
				})
			},
			formSubmit() {
				let that = this;
				if (that.flag) {
					that.flag = false;
					uni.showModal({
						title: '确认修改',
						content: "修改将消耗1张改名卡,确认修改?",
						success: function(res) {
							if (res.confirm) {
								djRequest({
									url: '/api/member/verify_security',
									method: "POST",
									data: {
										password: that.safePwd
									},
									success: function(res) {
										if (res.data.status === 200) {
											that.postNumber();
											that.flag = true;
										} else {
											common.TostUtil(res.data.message);
											that.flag = true;
										}
									}
								})
							}else{
								that.flag=true;
							}
						}
					})
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
		font-size: 28upx;
		line-height: 2em;
	}

	.dj_form .uni-input {
		color: #333333;
		font-size: 28upx;
		text-align: right;
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

	.dj_form .uni-form-item .forward {
		text-align: right;
	}

	.dj_form .tips {
		padding: 20upx;
		margin-top: 1em;
		font-size: 24upx;
		color: #D03C29;
	}
	.tips text{
		font-size: 32upx;
		margin:0 10upx;
	}
</style>
