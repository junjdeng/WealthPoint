<template>
	<view class="container">
		<view class="section1">
			<view class="circel">
				<view class="title">W钻数量</view>
			    <view class="num wpgold">318.05</view>
			</view>
		</view>
	
		<view class="section2">
			<view class="section_title">W钻记录</view>
			<view class="list">
				<view class="item flex-start">
					<view class="flex2">
						<view class="title">类型：承租AP</view>
						<view class="num">平台返利W钻数量：5</view>
					</view>
					<view class="flex1">
						<view class="time">2019-01-08</view>
					</view>	
				</view>
				<view class="item flex-start">
					<view class="flex2">
						<view class="title">类型：承租AP</view>
						<view class="num">平台返利W钻数量：5</view>
					</view>
					<view class="flex1">
						<view class="time">2019-01-08</view>
					</view>	
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
				type:1
			}
		},
		components: {
			uniIcon
		},
		onLoad(options) {
			if (options.type == 1) {
				uni.setNavigationBarTitle({
					title: '希望钱包'
				});
			} else if (options.type == 2) {
				uni.setNavigationBarTitle({
					title: '奖金钱包'
				});
			}
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
.section1{width: 750upx; padding: 0 0 20upx 0; background: #333333;text-align: center;overflow: hidden;}
.section1 .title{font-size: 32upx; color: #ffffff; line-height: 1.6em; margin-top: 120upx; }
.section1 .num{font-size: 64upx;color: #CCA366; line-height: 1.6em; font-weight: bold; margin-bottom: 30upx;}
.section1 .circel{border: 2px solid #CCA366; width: 400upx; height: 400upx; border-radius: 50%; margin: 0 auto;
position: relative; top: 120upx;}
.section_title {color: #333333;font-size: 32upx;font-weight: bold;line-height: 2em;}
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
.section2 .item .flex1{text-align: right; align-self: flex-start;}
.section2 .item .time,.section2 .item .status{color: #999999; font-size: 24upx;}
</style>
