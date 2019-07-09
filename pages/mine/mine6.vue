<template>
	<view class="container">
		<view class="section1">
			<view class="title">激活码数量</view>
			<view class="num wpgold">{{num}}</view>
			<view class="flex-center">
				<span class="flex1 want" data-url="mine6Sell" @tap="navTo">转码</span>
				<span class="flex1 want" data-url="mine6Use" @tap="navTo">激活会员</span>
			</view>
		</view>
	
		<!-- <view class="section2">
			<view class="section_title">激活码明细</view>
			<view class="list">
				<view class="item  flex-start">
					<view class="title flex4">
						<view>转码</view>
						<view class="time">2019-01-08</view>
					</view>
					<view class="num  flex1">+1</view>
				</view>
				<view class="item  flex-start">
					<view class="title flex4">
						<view>转码</view>
						<view class="time">2019-01-08</view>
					</view>
					<view class="num  flex1">+1</view>
				</view>
			</view>
		</view> -->
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
				num:0
			}
		},
		components: {
			uniIcon
		},
		onShow (){
			this.num = config.balance.code;
		},
		onLoad() {
			
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
.section1{width: 750upx; padding: 40upx 0; background: linear-gradient(137deg,#CEA15A,#CEA15A);text-align: center;}
.section1 .title{font-size: 32upx; color: #ffffff; line-height: 1.6em; margin-top: 10upx; }
.section1 .num{font-size: 64upx;color: #ffffff; line-height: 1.6em; font-weight: bold; margin-bottom: 50upx;}
.section1 .want{color: #FFFFFF;font-size: 32upx; border:1px solid #FFFFFF; border-radius: 16upx;
 padding:10upx; margin: 0 60upx;}

.section_title {color: #333333;font-size: 28upx;font-weight: bold;line-height: 2em;}
.section2{margin: 20upx;width: 710upx;}
.section2 .item {
	background: #FFFFFF;
	margin-bottom: 20upx;
	padding: 20upx;
	border-radius: 8upx;
	color: #333333;
	font-size: 28upx;
	line-height: 2em;
}
.section2 .item .flex1{text-align: right;}
.section2 .item .time{color: #999999; font-size: 24upx;}
.section2 .item .title{float: right;font-size: 32upx;}
</style>
