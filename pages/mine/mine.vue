<template>
	<view class="container">
		<view class="header">
			<view class="section section1">
				<view class="flex-start">
					<view class="flex1">
						<image src="../../static/images/bg112.jpg"></image>
					</view>
					<view class="flex4">
						<view class="name">{{user.username}}</view>
					</view>
					<view class="flex2" data-url="mine0" @tap="navTo">
						<view class="info">个人信息<uni-icon type="forward" class="forward" size="16" color="#ffffff"></uni-icon></view>
					</view>
				</view>
				<view class="flex-start level">
					<view class="flex2" data-url="mine1" @tap="navTo">
						<view class="num">90.7</view>
						<view class="title">AP信用</view>
					</view>
					<view class="flex1" style="text-align: center;">
						<span class="line"></span>
					</view>
					<view class="flex2" data-url="mine2" @tap="navTo">
						<view class="num">{{user.levelName}}</view>
						<view class="title">AP会员</view>
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
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	import {djRequest} from '../../common/request.js'
	import {config} from '../../common/config.js'
	
	export default {
		data() {
			return {
				user:config.User
			}
		},
		components: {
			uniIcon
		},
		onShow() {
			djRequest({
				url:'/api/member/balance',
				method:'GET',
				success:function(res) {
					 console.log(res); 
				}
			})				
		},
		methods: {
			navTo(e) {
				uni.navigateTo({
					url:e.currentTarget.dataset.url
				})
			},
		}
	}
</script>

<style>
	.header{height: 400upx; width: 100%; background: linear-gradient(#CEA15A,#F3CB84); }
	.header .section1{background-image:url(../../static/images/mine.png);background-repeat: no-repeat; 
	background-size: 100% 100%; border-radius: 8upx; overflow: hidden;background-color: transparent;
	height: 340upx; margin-top: 40upx; padding: 20upx; width: 670upx;}
	
	.section1 image{width: 100upx; height: 100upx; border-radius: 50upx; margin: 10upx 0 0 10upx;}
	.section1 .name{color: #ffffff; font-size: 40upx; padding-left: 1em;}
	.section1 .info{color: #ffffff; font-size: 24upx; }
	
	.section1 .level{color: #ffffff; font-size: 32upx; text-align: center; margin-top: 60upx;}
	.section1 .level .line{background:#ffffff; display: inline-block; width: 1px; height: 50upx;}
	.section1 .level .num{line-height: 3em;}
	
	.list .item{color: #333333; font-size: 32upx; line-height: 2em; padding: 20rpx; border-bottom: 1px solid #E6E6E6;}
	.list .item .forward{float: right; line-height: 2em;}

</style>
