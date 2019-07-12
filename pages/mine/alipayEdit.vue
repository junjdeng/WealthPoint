<template>
	<view class="container">
		<view class="list_wrap">
			<view class="list">
				<view class="item flex-start">
					<view class="flex5">
						<view class="name">
							<text>支付宝姓名:</text>
							<input type="text" v-model.trim="userName" placeholder="请输入支付宝真实姓名">
						</view>
						<view class="num">
							<text>支付帐号:</text>
							<input type="text" v-model.trim="payName" placeholder="请输入支付宝帐号">
						</view>
					</view>
				</view>
			</view>
			<view class="bottomBtn" @click="add">{{flag?"提交":"处理中..."}}</view>
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
				type: 0,
				userName: '',
				payName: '',
				flag: true,
				id: 0,
			}
		},
		components: {
			uniIcon
		},
		onNavigationBarButtonTap(e) {
			let that = this;
			/* 删除 */
			uni.showModal({
				title: '删除',
				content: '确定删除此支付宝帐号？',
				success: function(res) {
					if (res.confirm) {
						djRequest({
							url: '/api/qrcode/delete',
							method: 'GET',
							data: {
								Id: that.id
							},
							success: function(res) {
								common.TostUtil(res.data.message);
								if (res.data.status === 200) {
									setTimeout(function() {
										uni.navigateBack({
											delta: 1
										})
									}, 1000)
								}

							}
						})
					}
				}
			})

		},
		onLoad(options) {
			this.id = options.id;
			this.payName = options.name;
		},
		onShow() {
			this.getUserName();
		},
		methods: {
			/* 获取用户名 */
			getUserName() {
				let that = this;
				uni.getStorage({
					key: 'loginInfo',
					success(e) {
						that.userName = JSON.parse(e.data).realName;
					}
				})
			},

			/* 修改  */
			add() {
				let that = this;
				if (that.flag) {
					that.flag = false;
					if (!common.RegUtil.isMatchAliPay(that.payName)) {
						common.TostUtil('支付宝格式必须为手机号或邮箱');
						that.flag = true;
						return;
					}
					if (that.userName === '') {
						common.TostUtil('请输入支付宝真实姓名');
						that.flag = true;
						return;
					}
					djRequest({
						url: '/api/alipay/update',
						method: 'POST',
						data: {
							Id: that.id,
							accountName: that.userName,
							name: that.payName,
							status: 'yes'
						},
						success: function(res) {
							console.log(res);
							common.TostUtil(res.data.message);
							that.flag = true;
							setTimeout(function() {
								uni.navigateBack();
							}, 1000)
						},
						fail: function(res) {
							common.TostUtil(res.data.message);
							that.flag = true;
						}
					})
				}
			}
		}
	}
</script>

<style>
	.list_wrap {
		margin: 0 20upx;
		width: 710upx;
		margin-top: 20upx;
	}

	.list .item {
		color: #333333;
		background: #FFFFFF;
		font-size: 32upx;
		line-height: 2em;
		border-radius: 8upx;
		padding: 20rpx;
		margin-bottom: 20upx;
	}

	.list .item .flex1 {
		align-self: flex-start;
		margin-top: 20upx;
	}

	.list .item image {
		width: 80upx;
		height: 80upx;
	}

	.list .item .name {
		color: #333333;
		font-size: 32upx;
	}

	.list .item .num {
		color: #333333;
		font-size: 32upx;
	}

	.bottomBtn {
		width: 710upx;
		background: #CCA366;
		color: #ffffff;
		border-radius: 8upx;
		margin-top: 80upx;
		font-size: 32upx;
		height: 88upx;
		line-height: 88upx;
		text-align: center;
	}

	input {
		border-bottom: 2upx solid #f7f7f7;
		font-size: 28upx;
	}
</style>
