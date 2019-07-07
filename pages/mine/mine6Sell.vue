<template>
	<view class="container">
		<view class="form_wrap">
			<form class="dj_form" @submit="formSubmit">
				<view class="uni-form-item uni-column flex-start">
					<span class="flex2 title">会员用户名</span>
					<input class="uni-input flex5" v-model.trim="userName" placeholder="请输入会员用户名" />
				</view>

				<view class="uni-form-item uni-column flex-start">
					<span class="flex2 title">转码个数</span>
					<input class="uni-input flex5" v-model.trim="num" type="number" placeholder="请输入转码个数" />
				</view>

				<view class="uni-form-item uni-column flex-start">
					<span class="flex2 title">安全密码</span>
					<input class="uni-input flex5" v-model.trim="safePwd" type="password" placeholder="请输入安全密码" />
				</view>

				<view class="tips">
					*激活码200元每个（新注册账号需要一个激活码激活。激活后立即返0.2个AP即400元到用户的希望钱包）<br />
					*激活码获取途径：1.向推荐人购买。2.系统奖励。
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
	import { config } from '../../common/config.js'
	import { djRequest } from '../../common/request.js'
	export default {
		data() {
			return {
				flag: true, //提交状态
				userName: '',
				num: '',
				safePwd: '',
				activeNumber: 0
			}
		},
		components: {
			uniIcon
		},
		onShow() {
			common.balance();
			this.activeNumber = config.balance.code;
		},
		methods: {
			postNumber() {
				let that = this;
				djRequest({
					url: '/api/gift',
					method: 'POST',
					data: {
						username: that.userName,
						number: that.num
					},
					success: function(res) {
						that.userName = '';
						that.num = '';
						that.safePwd = '';
						common.TostUtil(res.data.message);
					}
				})
			},
			formSubmit() {
				let that = this;
				if (that.flag) {
					that.flag = false;
					if (Number(that.num) > Number(that.activeNumber)) {
						common.TostUtil('激活码数量不足！');
						that.num = '';
						that.flag = true;
						return false;
					}
					if (!common.RegUtil.isMatchMix(that.userName)) {
						common.TostUtil('用户名格式不正确');
						that.flag = true;
						return false;
					}
					if (!common.RegUtil.isMatchNumber(Number(that.num))) {
						common.TostUtil('请输入激活码数量（正整数）！');
						that.flag = true;
						return false;
					}
					if (!common.RegUtil.isMatchSafePwd(that.safePwd)) {
						common.TostUtil('安全密码格式不正确！');
						that.flag = true;
						return false;
					}
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
								common.balance();
								setTimeout(function(){
									uni.navigateBack({
										delta: 1
									})
								},1000)
							} else {
								common.TostUtil(res.data.message);
								that.flag = true;
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
</style>
