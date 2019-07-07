<template>
	<view class="container">
		<view class="section section1">
			<view class="flex-start">
				<view class="flex1">
					<view class="title">已支持公益项目</view>
					<view class="num wpgold">318</view>
				</view>
				<view class="flex1">
					<view class="title">已筹集AP</view>
					<view class="num wpgold">3184.64</view>
				</view>
			</view>
			
			<view class="flex-start total_card">
				<view class="flex1">
					<view class="num">100</view>
					<view class="title">活动总数</view>
				</view>
				<view class="flex1">
					<view class="num">80</view>
					<view class="title">进行中</view>
				</view>
				<view class="flex1">
					<view class="num">20</view>
					<view class="title">已结束</view>
				</view>
			</view>
		</view>
	
		<view class="section_title clear" data-url="charityList" @tap="navTo">
			最新公益活动<span>更多<uni-icon type="forward" class="forward" size="16" color="#999999"></uni-icon></span>
		</view>
		
		<view class="list">
			<view class="flex-start item">
				<view class="flex2">
					<image src="../../static/images/bg112.jpg"></image>
				</view>
				<view class="flex5 content" >
					<view class="title ellipsis">Kadena将于10月份与价值30亿…</view>
					<view class="sub_title ellipsis2">总部位于布鲁克林的初创公司 Kadena 周一在纽约举行的 CoinDesk 2019 年共识会议上…布，该公司将于今年10月推出一个公开的区块链。</view>
				</view>
			</view>
			<view class="flex-start item">
				<view class="flex2">
					<image src="../../static/images/bg112.jpg"></image>
				</view>
				<view class="flex5 content" >
					<view class="title ellipsis">Kadena将于10月份与价值30亿…</view>
					<view class="sub_title ellipsis2">总部位于布鲁克林的初创公司 Kadena 周一在纽约举行的 CoinDesk 2019 年共识会议上…布，该公司将于今年10月推出一个公开的区块链。</view>
				</view>
			</view>
			<view class="flex-start item">
				<view class="flex2">
					<image src="../../static/images/bg112.jpg"></image>
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
	import common from "@/common/common.js"
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
		},
		onLoad() {
           
		},
	}
</script>
<style>
.section1{padding: 20upx; width: 670upx; text-align: center;}
.section1 .title{font-size: 28upx; color: #333333; line-height: 1.6em; font-weight: bold;}
.section1 .num{font-size: 48upx; line-height: 2em; font-weight: bold;}

.section1 .total_card{background:rgba(204,163,102,0.1); border-radius: 16upx; margin-top: 20upx; padding: 10upx 5upx;}
.section1 .total_card .num{font-size: 32upx; color: #333333; font-weight: bold;}
.section1 .total_card .title{font-size: 28upx; color: #666666;}

.section_title{font-size: 36upx; color: #333333; line-height: 2em; height: 2em; text-align: left; width: 710upx; padding: 20upx 30upx;margin-bottom:30upx;}
.section_title span{float: right;font-size: 28upx; color: #999999;}

.list{width: 710upx;}
.list .item{ background: #ffffff; border-radius: 16upx; padding: 20upx; margin-bottom: 20upx;}
.list .item image{width: 160upx; height: 160upx;border-radius: 16upx;}
.list .item .flex2{height: 160upx;}
.list .item .content{align-self: flex-start;}
.list .item .title{font-size: 32upx; color: #333333; line-height: 2.2em;}
.list .item .sub_title{font-size: 24upx; color: #999999; line-height: 1.8em;}
view{
	box-sizing:border-box!important;
}
</style>
