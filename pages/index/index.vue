<template>
	<view class="container">
		<view class="header">
			<image mode="aspectFit" src="../../static/images/maintopbg.png"></image>
			<image src="../../static/images/message.png"></image>
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
				<view class="flex1 item" data-url="sign" @tap="navTo" >
					<image src="../../static/images/main4.png"></image>
					<view>签到</view>
				</view>
				<view class="flex1 item" data-url="wwallet" @tap="navTo">
					<image src="../../static/images/main5.png"></image>
					<view>W钱包</view>
				</view>
				<view class="flex1 item" data-url="../wealth/wallet1" @click="navTo">
					<image src="../../static/images/main6.png"></image>
					<view>奖金钱包</view>
				</view>
			</view>
		</view>

		<view class="section section2">
			<view class="notice flex-start">
				<uni-icon type="sound" class="sound_icon" size="14" color="#CCA366"></uni-icon>
				<text class="ellipsis flex5">
					年末大礼：uni-app1.4 新增百度、支付宝小程序。插件市场重磅上线！</text>
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
					<view class="qiun-charts" >
						<canvas canvas-id="canvas" id="canvas" class="charts" @touchstart="touchCanvas"></canvas>
					</view>
				</view>
			</view>
		</view>
		
		<view class="cover" v-if="showPop"  @tap="hidePop()">
			<view class="pop_wrap">
				<view class="text">签到领红包</view>
				<view class="signBtn">签到</view>
			</view>
	    </view>
	</view>	
</template>

<script>
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	import uCharts from '@/components/u-charts/u-charts.js';
	var _self;
	var canvas=null;
	export default {
		data() {
			return {
				// echarts: echarts,
				updateStatus: false,
				showPop: true,
				cWidth:'',
				cHeight:'',
				pixelRatio:0.98,//放大位数
				serverData:'',
				das:[],
				week:[],
				webview:null
			}
		},
		components: {
			uniIcon,
			//mpvueEcharts
		},
		onLoad() {
		this._data.das = [2000, 2200, 2800, 3400, 2900, 3000, 3020];
		this._data.week=['5.29','5.30','5.31','6.01','6.02','6.03','6.04',];
		_self = this;
		this.cWidth=uni.upx2px(680);
		this.cHeight=uni.upx2px(460);
		this.getServerData();
		},
		methods: {
			navTo(e) {
				uni.navigateTo({
					url:e.currentTarget.dataset.url
				})
			},
			getServerData(){
				let that = this;
				let canvasData={categories:[],series:[]};
				//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
				canvasData.categories=that._data.week;
				canvasData.series=[{data:that._data.das,name:'',color:"#CCA366"}];
				that._data.das=canvasData.series[0].data;
				_self.CanvasData("canvas",canvasData);
			},
			CanvasData(canvasId,chartData){
				let that = this;
				canvas=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'line',
					fontSize:11,
					legend:false,
					dataLabel:false,
					dataPointShape:false,
					background:'transparent',
					dataLineColor:'#333333',
					pixelRatio:_self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: false,
					xAxis: {
						dashLength:8,
						gridColor:'transparent'
					},
					yAxis: {
						dashLength:8,
						splitNumber:4,
						min:2000,
						disabled:false,
						max:4000,
						format:(val)=>{return val}
					},
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					extra: {
						lineStyle: 'curve',
						
					}
				});
				
			},
			touchCanvas(e) {
				canvas.showToolTip(e, {
					format: function (item, category) {
						return /* category + ' ' + item.name + ':' + */item.data 
					}
				});
			},
			hidePop(){
				this.showPop = false	
			}
		},
	}
</script>

<style>
	
	.header {
		height: 128upx;
		background: #ffffff;
		text-align: center;
		width: 100%;
		position:relative;
	}

	.header image:first-child {
		margin-top: 20upx;
		height: 100%;
		width: 45%;
	}
	.header image:last-child{
		width:60upx;
		height: 60upx;;
		position:absolute;
		z-index:1000;
		top:54upx;
		right:30upx;
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
	.notice .sound{width: 50upx;}

	.notice text {
		font-size: 24upx;
		color: #333333;
		display: inline-block;
		width: 570upx;
		height: 50upx;
		text-indent: 1em;
		line-height: 50upx;
	}

	.notice span {
		font-size: 24upx;
		color: #888888;
		display: inline-block;
		text-align: right;
		height: 50upx;
		line-height: 50upx;
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
	
	.cover{position: fixed; width: 100%; height: 100%; background: rgba(0,0,0,0.4);}
	.pop_wrap{
		text-align: center;
		width: 470upx;
		background-image: url("../../static/images/main11.jpg"); background-size: 100% 100%;
		padding: 20upx;
		margin: 20upx auto;
		border-radius: 8upx;
		position: relative;
		top: 30%;
	}
	.pop_wrap .text{font-size: 32upx; color: #FFFFFF; line-height: 3em; padding: 20upx 0;}
	.signBtn{background: linear-gradient(180deg,#EA6F53,#D03C29); width: 270upx; height: 270upx; border-radius: 50%;
color: #FFFFFF; line-height: 270upx; font-size:32upx; text-align: center;margin: 20upx auto; }

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

