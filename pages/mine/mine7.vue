<template>
	<view class="container">
		<view class="list_wrap">
			<view class="list">
				<view class="item flex-start">
					<view class="flex2">
						<image src="../../static/images/shop1.png"></image>
					</view>
					<view class="flex5">
						<view class="name">改手机号卡</view>
						<view class="price">0.25AP</view>
					</view>
				</view>
				<view class="item flex-start">
					<view class="flex2">
						<image src="../../static/images/shop2.png"></image>
					</view>
					<view class="flex5">
						<view class="name">改姓名卡</view>
						<view class="price">0.25AP</view>
					</view>
				</view>
				<view class="item flex-start">
					<view class="flex2">
						<image src="../../static/images/shop3.png"></image>
					</view>
					<view class="flex5">
						<view class="name">解封卡</view>
						<view class="price">0.25AP</view>
					</view>
				</view>
				<view class="item flex-start">
					<view class="flex2">
						<image src="../../static/images/shop4.png"></image>
					</view>
					<view class="flex5">
						<view class="name">超级解封卡</view>
						<view class="price">1.00AP</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	import common from '../../common/common.js'
	import {djRequest} from '../../common/request.js'
	
	export default {
		data() {
			return {

			}
		},
		components: {
			uniIcon
		},
		onLoad() {
			var _this = this;
			djRequest({
				url:'/api/gift/price',
				method:'GET',
				success:function(res) {
					console.log(res);
					if(res.data.status===200){
							// _this.balance = res.data.data;
					}				
				}
			})			
		},
		onNavigationBarButtonTap(e){
			uni.navigateTo({
				url:'mine7Cards'
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
	.list_wrap{margin: 0 20upx; width: 710upx; margin-top: 20upx;}
	.list .item{color: #333333; background: #FFFFFF; border-radius: 8upx; font-size: 32upx; line-height: 2em; padding: 20rpx; margin-bottom: 20upx;}
    .list .item image{width: 160upx; height: 160upx; border-radius: 8upx;}
	.list .item .price{color: #D03C29;}
</style>
