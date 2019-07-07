<template>
	<view class="container">
		 <uni-segmented-control class="segmented" :current="current" 
		 :values="items" 
		 @clickItem="onClickItem" 
		 style-type="text" active-color="#CCA366">
		 </uni-segmented-control>
		 
        <view class="content">
            <view v-show="current === 0">
				<view class="list">
				<view class="item flex-start">
					<view class="flex2">
						<image src="../../static/images/bg112.jpg"></image>
					</view>
					<view class="flex5">
						<view class="name">改名卡</view>
						<view class="price">0.25AP</view>
						<view class="time">购买时间：2019-12-12</view>
					</view>
				</view>
				<view class="item flex-start">
					<view class="flex2">
						<image src="../../static/images/bg112.jpg"></image>
					</view>
					<view class="flex5">
						<view class="name">改名卡</view>
						<view class="price">0.25AP</view>
						<view class="time">购买时间：2019-12-12</view>
					</view>
				</view>
			</view>
            </view>
            <view v-show="current === 1">
               <view class="list">
				<view class="item flex-start">
					<view class="flex2">
						<image src="../../static/images/bg112.jpg"></image>
					</view>
					<view class="flex5">
						<view class="name">改名卡</view>
						<view class="price">0.25AP</view>
						<view class="time">使用时间：2019-12-12</view>
					</view>
				</view>
				<view class="item flex-start">
					<view class="flex2">
						<image src="../../static/images/bg112.jpg"></image>
					</view>
					<view class="flex5">
						<view class="name">改名卡</view>
						<view class="price">0.25AP</view>
						<view class="time">使用时间：2019-12-12</view>
					</view>
				</view>
			</view>
            </view>
        </view>
	</view>
</template>

<script>
	import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue"
	export default {
		data() {
			return {
				items: ['待使用','已使用'],
				current: 0
			}
		},
		components: {
			uniSegmentedControl
		},
		methods: {
			onClickItem(index) {
				if (this.current !== index) {
					this.current = index;
				}
			}
		}
	}
</script>

<style>
	.segmented{background: #FFFFFF; width: 750upx; height: 68upx;}
	.list{ margin-top: 20upx;}
	.list .item{color: #333333; background: #FFFFFF; width: 670upx; padding: 20upx; margin: 0 20upx 20upx 20upx; 
	border-radius: 8upx; font-size: 32upx; line-height: 2em; padding: 20rpx; margin-bottom: 20upx;}
    .list .item image{width: 160upx; height: 160upx; border-radius: 8upx;}
	.list .item .price{color: #D03C29;}
	.list .item .time{color: #999999; font-size: 24upx;}
</style>
