<template>
	<view class="container">
		<view class="con">
			<view class="section1">
			<view class="flex-start">
				<view class="flex1">
					<view class="title">目标AP数量</view>
					<view class="num wpgold">318</view>
				</view>
				<view class="flex1">
					<view class="title">已筹集AP数量</view>
					<view class="num wpgold">34.64</view>
				</view>
			</view>
			
			<view class="progress_card">
				<progress :percent="cent" activeColor="#CCA366"  stroke-width="8" />
				<view class="info">完成进度 <span>{{cent}}%</span></view>
			</view>
		</view>
		
		<view class="content">
			<view class="title">加密对冲基金平均管理资产第一季度增长三倍</view>
			<view class="sub_title">37分钟前 | 本文来源: Yogita Khatri | 本文作者: Cindy</view>
			<rich-text class="conFont" nodes="最新研究显示，全球加密货币对冲基金管理的平均资产（AUM）在2019年第一季度增长了 3 倍。 两家公司表示，这一增长表明，尽管同期市场环境低迷，但基金在筹集投资方面“相对成功”。 这份基于与 100 家加密对冲基金提供的数据的报告进一步强调，截至 2019 年第一季度，基金的平均资产管理规模为 2190 万美元，60% 的基金资产不足 1000 万美元，而管理资产超过 5000 万美元的基金不到 10%。 报告发现，加密对冲基金去年的表现也好于比特币。虽然比特币在 2018 年暴跌了约 72%，但在同一时期内，但加密对冲基金同期的平均跌幅仅为 46%，这表明基金经理们已经能够通过有效管理加密资产来对冲风险。 然而，绩效因采用的策略类型而异。例如，报告显示，2018 年“定量”基金的平均回报率为 8%，而“基础基金”和“可自由支配”基金的平均回报率为负，分别为 - 53% 和 - 63%.">
			</rich-text>
		</view>
		</view>
		
		
		<view class="bottomBtn" data-url="charityHelp" @tap="navTo">去捐助</view>
	</view>
</template>

<script>
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	export default {
		data() {
			return {
				cent:49,//百分比
				
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
.section1{padding: 20upx; width: 710upx; background: #ffffff; text-align: center;}
.section1 .title{font-size: 28upx; color: #333333; line-height: 1.6em; font-weight: bold;}
.section1 .num{font-size: 48upx; line-height: 2em; font-weight: bold;}

.section1 .progress_card{padding-top: 40upx;}
.section1 .progress_card .info{color: #333333; font-size: 28upx; line-height: 3em;text-align: left;}
.section1 .progress_card .info span{float: right;}

.content{ background: #ffffff; width: 710upx;padding: 20upx; margin-top: 20upx;}
.content .title{color: #333333; font-size: 32upx; line-height: 2em;text-align: center;}
.content .sub_title{color: #999999; font-size: 24upx; line-height: 2em;}
.bottomBtn{display: block; width: 100%; position: fixed; bottom: 0; background: #CCA366; color: #ffffff;
 font-size: 32upx; height: 100upx; line-height: 100upx; text-align: center;}
 .con{
	 padding-bottom:120upx;
 }
 .conFont{
	 font-size: 28upx;
	 text-indent:2em;
 }
</style>
