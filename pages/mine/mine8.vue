<template>
	<view class="container">
		<view class="list_wrap">
			<view class="list">
				<view class="item flex-start" v-for="(temp,index) in list" :key="index" :data-url="'getTool?text='+temp.text+'&price='+temp.price" @click="navTo" >
					<view class="flex2">
						<image :src="temp.icon"></image>
					</view>
					<view class="flex5">
						<view class="name">{{temp.text}}</view>
						<view class="price">{{temp.price}}AP</view>
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
				list:[
					{
						price:0.25,
						text:'改手机号卡',
						icon:'/static/images/shop1.png'
					},
					{
						price:0.25,
						text:'改姓名卡',
						icon:'/static/images/shop2.png'
					},
					{
						price:0.25,
						text:'解封卡',
						icon:'/static/images/shop3.png'
					},
					{
						price:1,
						text:'超级解封卡',
						icon:'/static/images/shop4.png'
					}
				]
			}
		},
		components: {
			uniIcon
		},
		onNavigationBarButtonTap(e){
			
			uni.navigateTo({
				url:'mine7Cards'
			})
		},
		methods: {
			navTo(e) {
				console.log(e,3)
				uni.navigateTo({
					url:e.currentTarget.dataset.url
				})
			}
		}
	}
</script>

<style>
	.list_wrap{margin: 0 20upx; width: 710upx; margin-top: 20upx;}
	.list .item{color: #333333; background: #FFFFFF; border-radius: 8upx; font-size: 32upx; line-height: 2em; padding: 20rpx; margin-bottom: 20upx;}
    .list .item image{width: 160upx; height: 160upx; border-radius: 8upx;}
	.list .item .price{color: #D03C29;}
</style>
