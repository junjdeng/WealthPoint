<template>
	<view class="container">
		<view class="header">
			<image mode="aspectFit" src="../../static/images/maintopbg.png"></image>
		</view>

		<view class="section section1">
			<view class="flex-start section_row">
				<view class="flex1 item">
					<image src="../../static/images/main1.png"></image>
					<view>如何赚钱</view>
				</view>
				<view class="flex1 item">
					<image src="../../static/images/main2.png"></image>
					<view>推广二维码</view>
				</view>
				<view class="flex1 item" data-url="customSuggest" @tap="navTo">
					<image src="../../static/images/main3.png"></image>
					<view>客户服务</view>
				</view>
			</view>
			<view class="flex-start section_row">
				<view class="flex1 item" data-url="sign" @tap="navTo">
					<image src="../../static/images/main4.png"></image>
					<view>签到</view>
				</view>
				<view class="flex1 item" data-url="wwallet" @tap="navTo">
					<image src="../../static/images/main5.png"></image>
					<view>W钱包</view>
				</view>
				<view class="flex1 item">
					<image src="../../static/images/main6.png"></image>
					<view>奖金钱包</view>
				</view>
			</view>
		</view>

		<view class="section section2">
			<view class="notice flex-start">
				<uni-icon type="sound" class="sound_icon" size="14" color="#CCA366"></uni-icon>
				<text class="ellipsis flex5">
					{{news}}
				</text>
				<span class="flex1" data-url="newsList" @tap="navTo">更多<uni-icon type="forward" class="forward" size="16" color="#999999"></uni-icon></span></span>
			</view>
		</view>

		<view class="section section3">
			<view class="section_title">AP收益</view>
			<view class="total">3183.18<uni-icon type="arrowthinup" size="18" color="#FF5533"></uni-icon>
			</view>
			<view class="total_sub">+13.67 +0.51%</view>

			<view class="flex-start condition_card">
				<view class="flex1">
					<view>最高</view>
					<view class="wpred">3184.64</view>
				</view>
				<view class="flex1">
					<view>最低</view>
					<view class="wpgreen">3184.64</view>
				</view>
				<view class="flex1">
					<view>成交数</view>
					<view class="wpgold">3184手</view>
				</view>
			</view>
		</view>

		<view class="section section4">
			<view class="section_title">AP走势</view>
			<view class="trend">
				<view class="qiun-columns">
					<view class="qiun-charts">
						<canvas canvas-id="canvas" id="canvas" class="charts"></canvas>
					</view>
				</view>
			</view>
		</view>

		<view class="cover" v-if="showPop" @tap="hidePop()">
			<view class="pop_wrap">
				<view class="text">签到领红包</view>
				<view class="signBtn">签到</view>
			</view>
		</view>
		<!-- 要 叶要艰苦奋斗村叶要 -->
	</view>
</template>

<script>
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	import uCharts from '@/components/u-charts/u-charts.js';
	import {djRequest} from '../../common/request.js'
	import common from '../../common/common.js'
	
	
	var canvas = null;
	
	export default {
		data() {
			return {
				updateStatus: false,
				showPop: false,
				news:'暂无公告',
			}
		},
		components: {
			uniIcon
		},
		onLoad() {
			var _this = this;
			djRequest({
				url:'/api/news',
				data:{'start': 0,'length': 1},
				success:function(res) {
					if (res.data.status == 200 && res.data.data.data.length >0 ) {
						_this.news = res.data.data.data[0].title;
					} 
				}
			})		
			
			
			let canvasData = {
				categories: [],
				series: []
			};
			canvasData.categories = ['5.29', '5.30', '5.31', '6.01', '6.02', '6.03', '6.04'];
			canvasData.series = [{
				data: [2000, 2200, 2800, 3400, 2900, 3000, 3020],
				name: '',
				color:'#CCA366'
			}];
			this.CanvasData("canvas", canvasData);
		},
		methods: {
			navTo(e) {
				uni.navigateTo({
					url: e.currentTarget.dataset.url
				})
			},
			hidePop() {
				this.showPop = false
			},
			CanvasData(canvasId, chartData) {
				let that = this;
				canvas = new uCharts({
					$this: that,
					canvasId: canvasId,
					type: 'line',
					fontSize: 11,
					legend: false,
					dataLabel: false,
					dataPointShape: false,
					background: 'transparent',
					dataLineColor: '#333333',
					pixelRatio: 1,
					categories: chartData.categories,
					series: chartData.series,
					animation: false,
					xAxis: {
						splitNumber: 6,
						disabled: false,
						gridColor:"transparent"
					},
					yAxis: {
						dashLength: 8,
						splitNumber: 4,
						min: 2000,
						gridType: "dash",
						disabled: false,
						max: 4000,
						format: (val) => {
							return val
						}
					},
					width: uni.upx2px(680),
					height: uni.upx2px(460),
					extra: {
						lineStyle: 'curve',
					}
				});
			},
		},

	}
</script>

<style>
	.header {
		height: 128upx;
		background: #ffffff;
		text-align: center;
		width: 100%;
	}

	.header image {
		margin-top: 20upx;
		height: 100%;
		width: 45%;
	}

	.section1 {
		padding: 20upx 0;
	}

	.section_row {
		width: 100%;
	}

	.item {
		text-align: center;
		padding: 20upx;
	}

	.item image {
		width: 64upx;
		height: 64upx;
	}

	.item view {
		font-size: 28rpx;
		color: #333333;
		line-height: 1.6em;
	}

	.section2 {
		background: #f5f5f5;
	}

	.notice .sound_icon {
		width: 50upx;
		line-height: 2.5;		
	}

	.notice text {
		font-size: 24upx;
		color: #333333;
		display: inline-block;
		width: 570upx;
		height: 50upx;
		text-indent: 0.5em;
		line-height: 2;
	}

	.notice span {
		font-size: 24upx;
		color: #888888;
		display: inline-block;
		text-align: right;
		height: 50upx;
		line-height: 2;
	}

	.section_title {
		color: #333333;
		font-size: 32upx;
		font-weight: bold;
	}


	.section3 {
		padding: 20upx;
		width: 670upx;
		margin-top: 0;
	}

	.section3 .total {
		font-size: 56upx;
		color: #FF5533;
		text-align: center;
	}

	.section3 .total_sub {
		font-size: 28upx;
		color: #FF5533;
		text-align: center;
	}

	.section3 .condition_card {
		color: #999999;
		font-size: 28upx;
		text-align: center;
		padding-top: 40upx;
	}

	.section4 {
		padding: 20upx;
		margin-bottom: 20upx;
		width: 670upx;
	}

	.canvasView {
		width: 100%;
		height: 400upx;
	}

	.cover {
		position: fixed;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.4);
	}

	.pop_wrap {
		text-align: center;
		width: 470upx;
		background-image: url("../../static/images/main11.jpg");
		background-size: 100% 100%;
		padding: 20upx;
		margin: 20upx auto;
		border-radius: 8upx;
		position: relative;
		top: 30%;
	}

	.pop_wrap .text {
		font-size: 32upx;
		color: #FFFFFF;
		line-height: 3em;
		padding: 20upx 0;
	}

	.signBtn {
		background: linear-gradient(180deg, #EA6F53, #D03C29);
		width: 270upx;
		height: 270upx;
		border-radius: 50%;
		color: #FFFFFF;
		line-height: 270upx;
		font-size: 32upx;
		text-align: center;
		margin: 20upx auto;
	}
	/* 趋势图 */
.qiun-padding{padding:2%; width:96%;box-sizing:border-box;}
.qiun-wrap{display:flex; flex-wrap:wrap;}
.qiun-rows{display:flex; flex-direction:row !important;}
.qiun-columns{ width:94%;display:flex; flex-direction:column !important; overflow:hidden;}
.qiun-common-mt{margin-top:5px;}
.qiun-bg-white{background:#FFFFFF;}
.qiun-title-bar{width:96%; padding:5px 2%; flex-wrap:nowrap;}
.qiun-title-dot-light{border-left: 5px solid #0ea391; padding-left: 5px; font-size: 16px;color: #000000;}
.qiun-charts{width: 375px; height:250px;background-color: #FFFFFF; overflow:hidden;}
.charts{width: 375px; height:250px;background-color: #FFFFFF;}
</style>
