<template>
	<view class="container">
		<view class="header">
			<view class="section section1">
				<view class="flex-between" style="width:100%;align-items:center;box-sizing:border-box;">
					<view style="width:70%" class="flex-start">
						<view class="flex1">
							<image src="../../static/images/ft.png"></image>
						</view>
						<view class="flex4">
							<view class="name">{{user.username}}</view>
						</view>
					</view>

					<view class="flex2" data-url="mine0" @tap="navTo">
						<view class="info" style="text-align: right;">个人信息<uni-icon type="forward" class="forward" size="16" color="#ffffff"></uni-icon>
						</view>
					</view>
				</view>
				<view class="flex-start level">
					<view class="flex2" data-url="mine1" @tap="navTo">
						<view class="num">5</view>
						<view class="title">云信用</view>
					</view>
					<view class="flex1" style="text-align: center;">
						<span class="line"></span>
					</view>
					<view class="flex2" data-url="mine2" @tap="navTo">
						<view class="num">{{user.levelName}}</view>
						<view class="title">云用户</view>
					</view>
				</view>
			</view>
		</view>

		<view class="section">
			<view class="list">
				<view class="item" data-url="mine3" @tap="navTo">
					银行账号<uni-icon type="forward" class="forward" size="20" color="#999999"></uni-icon>
				</view>
				<view class="item" data-url="mine4" @tap="navTo">
					支付宝账号<uni-icon type="forward" class="forward" size="20" color="#999999"></uni-icon>
				</view>
				<view class="item" data-url="mine5" @tap="navTo">
					密码管理<uni-icon type="forward" class="forward" size="20" color="#999999"></uni-icon>
				</view>
				<view class="item" data-url="code" @tap="navTo">
					收款码管理<uni-icon type="forward" class="forward" size="20" color="#999999"></uni-icon>
				</view>
			</view>
		</view>

		<view class="section">
			<view class="list">
				<view class="item" data-url="mine6" @tap="navTo">
					激活码<uni-icon type="forward" class="forward" size="20" color="#999999"></uni-icon>
				</view>
				<view class="item" data-url="mine7" @tap="navTo">
					道具商城<uni-icon type="forward" class="forward" size="20" color="#999999"></uni-icon>
				</view>
				<view class="item" data-url="/pages/index/customSuggest" @tap="navTo">
					意见反馈<uni-icon type="forward" class="forward" size="20" color="#999999"></uni-icon>
				</view>
				<view class="item" @tap="edition">
					检查版本<uni-icon type="forward" class="forward" size="20" color="#999999"></uni-icon>
				</view>
				<view class="item" @tap="goOut">
					退出登陆<uni-icon type="forward" class="forward" size="20" color="#999999"></uni-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	import common from '../../common/common.js'
	import {
		djRequest
	} from '../../common/request.js'
	import {
		config
	} from '../../common/config.js'

	export default {
		data() {
			return {
				user: null
			}
		},
		components: {
			uniIcon
		},
		onShow() {
			common.balance();
			this.user = config.User;
		},
		methods: {
			navTo(e) {
				uni.navigateTo({
					url: e.currentTarget.dataset.url
				})
			},
			edition() {
				let platform = '';
				uni.getSystemInfo({
					success: function(res) {
						platform = res.platform;
					}
				});
				//console.log(platform);
				plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
					uni.request({
						url: 'http://download.wealth-point.com/update2/GetVersion.php',
						success: (result) => {
							//console.log(result,result.data,widgetInfo)
							if ((result.data == widgetInfo.version)) {
								uni.showModal({
									content: '已是最新版本!',
									success: function(res) {
										//console.log('old');
									}
								})
							} else if (result.data && result.data !== widgetInfo.version) {
								uni.showModal({
									content: '发现新版本',
									success: function(res) {
										if (res.confirm) {
											let downUrl = platform == 'ios' ? 'http://download.wealth-point.com/update2/ios.wgt' :
												'http://download.wealth-point.com/update2/apk.wgt';
											//console.log(downUrl);
											uni.downloadFile({
												url: downUrl,
												success: (downloadResult) => {
													//console.log(downloadResult);
													if (downloadResult.statusCode === 200) {
														console.log('installing...');
														plus.runtime.install(downloadResult.tempFilePath, {
															force: true
														}, function() {
															//console.log('install success...');
															uni.showModal({
																content: '安装成功!',
																success: function(res) {
																	if (res.confirm) {
																		plus.runtime.restart();
																	}
																}
															})

														}, function(e) {
															//console.error('install fail...');
															uni.showModal({
																content: '安装失败!',
																success: function(res) {

																}
															})
														});
													}
												},
												fail(err) {
													//console.log(err);
												}
											});
										}
									}
								})
							}
						},
						fail: function(res) {

						}
					});


				});
			},
			goOut() {
				uni.clearStorageSync();
				config.balance = null;
				config.User = null;
				uni.switchTab({
					url: '../index/index'
				})
			}
		}
	}
</script>

<style>
	.header {
		height: 400upx;
		width: 100%;
		background: linear-gradient(#CEA15A, #F3CB84);
	}

	.header .section1 {
		background-image: url(../../static/images/mine.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		border-radius: 8upx;
		overflow: hidden;
		background-color: transparent;
		height: 340upx;
		margin-top: 40upx;
		padding: 20upx;
		width: 710upx;
		box-sizing: border-box;
	}

	.section1 image {
		width: 100upx;
		height: 100upx;
		border-radius: 50upx;
		margin: 10upx 0 0 0;
	}

	.section1 .name {
		color: #ffffff;
		font-size: 40upx;
		padding-left: 1em;
	}

	.section1 .info {
		color: #ffffff;
		font-size: 24upx;
	}

	.section1 .level {
		color: #ffffff;
		font-size: 32upx;
		text-align: center;
		margin-top: 60upx;
	}

	.section1 .level .line {
		background: #ffffff;
		display: inline-block;
		width: 1px;
		height: 50upx;
	}

	.section1 .level .num {
		line-height: 3em;
	}

	.list .item {
		color: #333333;
		font-size: 32upx;
		line-height: 2em;
		padding: 20rpx;
		border-bottom: 1px solid #E6E6E6;
	}

	.list .item .forward {
		float: right;
		line-height: 2em;
	}
</style>
