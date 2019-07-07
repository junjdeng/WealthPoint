<template>
	<view class="container">
		<view class="section1">
			<view class="title">签到红包</view>
			<view class="num wpgold">318元</view>
			<span class="want" data-url="sellAP" @tap="navTo">红包兑换AP</span>
		</view>
	
		<view class=" section section2">
			<view class="section_title">签到日历<switch checked @change="switch1Change" color="#CCA366" /><span>签到提醒</span></view>
			<view class="list flex-start">
				<view class="flex1 item">
					<view class="num">+5</view>
					<view class="point"></view>
					<view calss="date">05.20</view>
				</view>
				<view class="flex1 item">
					<view class="num">+5</view>
					<view class="point"></view>
					<view calss="date">今天</view>
				</view>
				<view class="flex1 item cover">
					<view class="num">+5</view>
					<view class="point"></view>
					<view calss="date">明天</view>
				</view>
				<view class="flex1 item cover">
					<view class="num">+5</view>
					<view class="point"></view>
					<view calss="date">05.20</view>
				</view>
				<view class="flex1 item cover">
					<view class="num">+5</view>
					<view class="point"></view>
					<view calss="date">05.20</view>
				</view>
				<view class="flex1 item cover">
					<view class="num">+5</view>
					<view class="point"></view>
					<view calss="date">05.20</view>
				</view>
				<view class="flex1 item cover">
					<view class="num">+5</view>
					<view class="point"></view>
					<view calss="date">05.20</view>
				</view>
			</view>
			<view class="line"></view>
		</view>
	
	    <view class="signBtn">签到领红包</view>
	
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
		methods: {
			navTo(e) {
				uni.navigateTo({
					url:e.currentTarget.dataset.url
				})
			},
			switch1Change: function (e) {
				console.log('switch1 发生 change 事件，携带值为', e.target.value)
			},
		}
	}
</script>

<style>
.section1{width: 750upx; height: 360upx; border-bottom-left-radius: 40upx; border-bottom-right-radius: 40upx;
 padding: 40upx 0; background: linear-gradient(#CEA15A,#F3CB84);text-align: center;}
.section1 .title{font-size: 32upx; color: #ffffff; line-height: 1.6em; margin-top: 10upx; }
.section1 .num{font-size: 64upx;color: #ffffff; line-height: 1.6em; font-weight: bold; margin-bottom: 30upx;}
.section1 .want{color: #FF5533;font-size: 32upx; border:1px solid #FF5533; border-radius: 16upx;
 padding:10upx 40upx;}

.section2{position: relative; top: -80upx;}
.section_title {color: #333333;font-size: 28upx;font-weight: bold;line-height: 3em;padding: 0 10upx;}
.section_title switch,.section_title span{float: right; margin-right: 10upx;}
.section_title switch{transform: scale(0.8);}
.item{text-align: center; font-size: 8upx;color: #333333; padding: 10upx 0;}
.item.cover{opacity: 0.3;}
.item .num{width: 70upx; height: 70upx; line-height: 70upx; margin: 0 auto; font-size: 32upx; background: #CCA366; color: #FFFFFF;border-radius: 35upx; text-align: center;}
.item .point{width: 20upx; height: 20upx;margin: 10upx auto;border-radius: 10upx; background: #FF5533; z-index: 100;}
.item.cover .point{background:#E6E6E6 ;}
.line{height: 1px; background: #E6E6E6;width: 600upx; position: absolute; bottom: 58upx; left: 50upx;z-index: 0;}
.signBtn{background: linear-gradient(180deg,#EA6F53,#D03C29); width: 270upx; height: 270upx; border-radius: 50%;
color: #FFFFFF; line-height: 270upx; font-size:32upx; text-align: center; }


</style>
