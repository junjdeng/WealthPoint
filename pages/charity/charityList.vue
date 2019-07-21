<template>
	<view class="container">
		
		<view class="list">
			<view class="flex-start item" data-url="charityDetail" @tap="navTo">
				<view class="flex2">
					<image src="../../static/images/app.png"></image>
				</view>
				<view class="flex5 content" >
					<view class="title ellipsis">Kadena将于10月份与价值30亿…</view>
					<view class="sub_title ellipsis2">总部位于布鲁克林的初创公司 Kadena 周一在纽约举行的 CoinDesk 2019 年共识会议上…布，该公司将于今年10月推出一个公开的区块链。</view>
				</view>
			</view>
			<view class="flex-start item">
				<view class="flex2">
					<image src="../../static/images/app.png"></image>
				</view>
				<view class="flex5 content" >
					<view class="title ellipsis">Kadena将于10月份与价值30亿…</view>
					<view class="sub_title ellipsis2">总部位于布鲁克林的初创公司 Kadena 周一在纽约举行的 CoinDesk 2019 年共识会议上…布，该公司将于今年10月推出一个公开的区块链。</view>
				</view>
			</view>
			<view class="flex-start item">
				<view class="flex2">
					<image src="../../static/images/app.png"></image>
				</view>
				<view class="flex5 content" >
					<view class="title ellipsis">Kadena将于10月份与价值30亿…</view>
					<view class="sub_title ellipsis2">总部位于布鲁克林的初创公司 Kadena 周一在纽约举行的 CoinDesk 2019 年共识会议上…布，该公司将于今年10月推出一个公开的区块链。</view>
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
.list{width: 710upx;margin-top: 20upx;}
.list .item{ background: #ffffff; border-radius: 16upx; padding: 20upx; margin-bottom: 20upx;}
.list .item image{width: 160upx; height: 160upx;border-radius: 16upx;}
.list .item .flex2{height: 160upx;}
.list .item .content{align-self: flex-start;}
.list .item .title{font-size: 32upx; color: #333333; line-height: 2.2em;}
.list .item .sub_title{font-size: 24upx; color: #999999; line-height: 1.8em;}
</style>
