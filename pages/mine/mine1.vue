<template>
	<view class="container">
		<view class="section1">
			<view class="title">当前信用评分</view>
			<view class="num wpgold">98.05</view>
			<view class="flex-center">
				<span class="flex1 want" data-url="buyAP" @tap="navTo">平台信用积分</span>
				<span class="flex1 want" data-url="buyAP" @tap="navTo">常见问题</span>
			</view>
		</view>
	
		<view class="section2">
			<view class="section_title">我的信用记录</view>
			<view class="list">
				<view class="item">
					<view class="title">AP信用分已更新！<span>2019-01-08</span></view>
					<view class="time">本月结果为90.88分</view>
				</view>
				<view class="item">
					<view class="title">AP信用分已更新！<span>2019-01-08</span></view>
					<view class="time">本月结果为90.88分</view>
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
.section1{width: 750upx; padding: 40upx 0; background: linear-gradient(137deg, #CEA15A, #F3CB84);text-align: center;}
.section1 .title{font-size: 32upx; color: #ffffff; line-height: 1.6em; margin-top: 10upx; }
.section1 .num{font-size: 64upx;color: #ffffff; line-height: 1.6em; font-weight: bold; margin-bottom: 30upx;}
.section1 .want{color: #FFFFFF;font-size: 32upx; border:1px solid #FFFFFF; border-radius: 16upx;
 padding:10upx; margin: 0 40upx;}

.section_title {color: #333333;font-size: 28upx;font-weight: bold;line-height: 2em;}
.section2{margin: 20upx;width: 710upx;}
.section2 .item {
	background: #FFFFFF;
	margin-bottom: 20upx;
	padding: 20upx;
	border-radius: 8upx;
	color: #999999;
	font-size: 24upx;
	line-height: 2em;
}
.section2 .item .flex1{text-align: right;}
.section2 .item .time{color: #333333; font-size: 28upx;}
.section2 .item .title span{float: right;}
</style>
