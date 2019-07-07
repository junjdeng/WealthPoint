<template>
	<view class="container">
		<view class="section1">
			<view class="title">当前会员等级</view>
			<view class="num wpgold">V6</view>
			<span class="flex1 want" data-url="buyAP" @tap="navTo">等级规则</span>
		</view>
	
		<view class="section2">
			<view class="section_title">我的爱心会员</view>
			<view class="list">
				<view class="item flex-start">
					<view class="flex1">
						<image  src="../../static/images/bg112.jpg"></image>
					</view>
					<view class="flex2">马晓云</view>
					<view class="flex2 time">2019-09-09</view>
				</view>
				<view class="item flex-start">
					<view class="flex1">
						<image  src="../../static/images/bg112.jpg"></image>
					</view>
					<view class="flex2">马晓云</view>
					<view class="flex2 time">2019-09-09</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	export default {
		data() {
			return {

			}
		},
		components: {
			uniIcon
		},
		onLoad() {
			
		},
		methods: {

		}
	}
</script>

<style>
.section1{width: 750upx; padding: 40upx 0; background: linear-gradient(306deg,#FE9F6C,#FD5450);text-align: center;}
.section1 .title{font-size: 32upx; color: #ffffff; line-height: 1.6em; margin-top: 10upx; }
.section1 .num{font-size: 64upx;color: #ffffff; line-height: 1.6em; font-weight: bold; margin-bottom: 30upx;}
.section1 .want{color: #FFFFFF;font-size: 32upx; border:1px solid #FFFFFF; border-radius: 16upx;
 padding:10upx 30upx; margin: 0 40upx;}

.section_title {color: #333333;font-size: 28upx;font-weight: bold;line-height: 2em;}
.section2{margin: 20upx;width: 710upx;}
.section2 .item {
	background: #FFFFFF;
	margin-bottom: 20upx;
	padding: 20upx;
	border-radius: 8upx;
	color: #333333;
	font-size: 24upx;
	text-align: left;
}
.section2 .item .flex1{text-align: center;}
.section2 .item .time{color: #999999; font-size: 28upx; text-align: right;}
.section2 .item image{width: 100upx; height: 100upx; border-radius: 50upx;}
</style>
