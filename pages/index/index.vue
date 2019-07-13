<template>
	<view class="container">
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
				
				<view class="flex1 item" data-url="shop" @click="navTo">
					<image src="../../static/images/main6.png"></image>
					<view>云商城</view>
				</view>
				<view class="flex1 item" data-url="wwallet" @tap="navTo">
					<image src="../../static/images/main5.png"></image>
					<view>W云链</view>
				</view>
			</view>
		</view>
		
		<view class="section section2">
			<view class="notice flex-start">
				<uni-icon type="sound" class="sound_icon" size="14" color="#CCA366" style="position:relative;top:-5upx!important;"></uni-icon>
				<text style="color:#CCA366!important;font-weight:500;">云头条</text>
				<text class="ellipsis ">
					{{news}}
				</text>
				<text class="" data-url="newsList" @tap="navTo">更多<uni-icon type="forward" class="forward" size="16" color="#999999"></uni-icon></text>
			</view>
		</view>

		<view class="section section3">
			<view class="section_title">
				<view>BTC行情</view>
				<view class="flex1 rt " data-url="btc" @tap="navTo">更多<uni-icon type="forward" class="forward" size="16" color="#999999"></uni-icon>
				</view>
			</view>
			<view class="total">
				<text :class="num>=0?'wpgreen':'wpred'">${{theNow}}</text>
				<uni-icon v-if="num>=0" type="arrowthinup" size="18" color="#7ED321"></uni-icon>
				<uni-icon v-if="num<0" type="arrowthindown" size="18" color="#FF5533"></uni-icon>
			</view>
			<view class="total_sub2 wpgreen" v-if="num>=0">+{{num}} +{{cent}}%</view>
			<view class="total_sub wpred" v-if="num<0">{{num}} {{cent}}%</view>
			<view class="flex-start condition_card">
				<view class="flex1">
					<view>最高</view>
					<view class="wpgreen">{{high}}</view>
				</view>
				<view class="flex1">
					<view>最低</view>
					<view :class="color>=0?'wpgreen':'wpred'">{{low}}</view>
				</view>
				<view class="flex1">
					<view>成交量</view>
					<view class="wpgold">{{amount}}</view>
				</view>
			</view>
		</view>

		<view class="section section4">
			<view class="section_title">AP收益曲线(%)</view>
			<view class="trend">
				<view class="qiun-columns">
					<view class="qiun-charts">
						<canvas canvas-id="canvas" id="canvas" class="charts" @touchstart="touchCanvas"></canvas>
					</view>
				</view>
			</view>
		</view>
		<!-- <view class="section section4">
			<view class="section_title">AP成交量</view>
			<view class="trend">
				<view class="qiun-columns">
					<view class="qiun-charts">
						<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" @touchstart="touchColumn"></canvas>
					</view>
				</view>
			</view>
		</view> -->
		<view class="cover" v-if="showPop" @tap="hidePop()">
			<view class="pop_wrap" style="background-image: url('../../static/images/main11.jpg');">
				<view class="text">签到领红包</view>
				<view class="signBtn" data-url="sign" @tap="navTo">去签到</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	import uCharts from '@/components/u-charts/u-charts.js';
	import {djRequest} from '../../common/request.js'
	import common from '../../common/common.js'
	import {config} from '../../common/config.js'
	import  '../../common/hmac-sha256.js'
	import '../../common/base64.js'

	var _self;
	var canvaColumn = null;
	var canvas = null;
	export default {
		data() {
			return {
				news:'暂无公告',
				// echarts: echarts,
				updateStatus: false,
				showPop: false,
				cWidth: '',
				cHeight: '',
				pixelRatio: 0.96, //放大位数
				das: [],
				week: [],
				das2: [],
				//比特币
				theNow: 0,
				low: 0,
				high: 0,
				amount: 0,
				opens: 0,
				cent: 0,
				num: 0,
				color: 0
			}
		},
		components: {
			uniIcon
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url:'message'
			})
		},
		onShow(){
			let that = this;
			djRequest({
				url:'/api/sign/sign_list',
				method:'POST',
				data:{
					start:0,
					length:50
				},
				success:function(res){
					if(res.data.data.data.length==0){
						that.showPop = true;
					}else{
						let timer= res.data.data.data[0].time;
						let date =new Date(timer*1000);
						let YY = date.getFullYear();
						let d = date.getDate();
						d = d < 10 ? ('0' + d) : d;
						let date1=new Date();
						let d1=date1.getDate();
						d1 = d1 < 10 ? ('0' + d1) : d1;
						if(d!==d1){
						that.showPop = true;
						}else{
							that.showPop =false ;
						}
					}
				}
			})			
			this.getBTC();
		},
		onLoad(){			
			common.balance();			
			_self = this;
			this.cWidth = uni.upx2px(680);
			this.cHeight = uni.upx2px(460);
			this.getServerData();
			this.getServerData2();
		},

		methods: {
			nowDate(value){
				let date = new Date(Number(value));
				let MM = date.getMonth() + 1;
				let d = date.getDate();
				return MM+'.'+d
			},
			getNews(){
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
			},
			getBTC(){
				let that = this;			
				// let Signature =
				// 	'https://api.huobi.pro\n/market/detail\n?AccessKeyId=rfhfg2mkl3-2302480c-0d9d2de1-97cee&SignatureMethod=HmacSHA256&SignatureVersion=2&Timestamp=2019-07-09T10:19:30&symbol=btcusdt';
					uni.request({
						url: 'https://api.huobi.pro/market/detail',
						data: {
							symbol: 'btcusdt',
							/* Timestamp: encodeURIComponent('2019-07-09T10:19:30'),
							SignatureVersion: 2,
							SignatureMethod: 'HmacSHA256',*/
							/* Signature:Base64.encode(CryptoJS(encodeURIComponent(Signature),'533c1d05-e6745887-d192682d-90e85')), */
							/* SecretKey: '533c1d05-e6745887-d192682d-90e85',
							AccessKeyId: 'rfhfg2mkl3-2302480c-0d9d2de1-97cee' */
						},
						// header: {
						// 	'Content-Type': 'application/x-www-form-urlencoded',
						// 	'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36',
						// 	'Accept-Language': 'zh-cn'
						// },
						method: 'GET',
						success: function(res) {
							that.amount = Number(res.data.tick.amount).toFixed(2);
							that.high = Number(res.data.tick.high).toFixed(2);
							that.low = Number(res.data.tick.low).toFixed(2);
							that.theNow = Number(res.data.tick.close).toFixed(2);
							that.opens = Number(res.data.tick.open).toFixed(2);
							that.num = Number(that.theNow - that.opens).toFixed(2);
							that.cent = Number((that.num / that.opens) * 100).toFixed(2);
							that.color = Number(that.low - that.opens);
						},
						fail: function(res) {
							console.log(res, 4)
							//that.getBTC();
						}
					})

			},
			navTo(e) {
				uni.navigateTo({
					url: e.currentTarget.dataset.url
				})
			},
			getServerData() {
				let that = this;
				let canvasData = {
					categories: [],
					series: []
				};
				djRequest({
					url:'/api/statistics/income',
					method:'GET',
					success:function(res){
						let orignData = res.data.data;
						let weekNumber = [];
						let weekArr = [];
						for (let obj in orignData) {
							weekArr.push(obj);
							weekNumber.push(String(orignData[obj].number/100.00));
						}												
						canvasData.categories = weekArr;
						canvasData.series = [{
							data: weekNumber,
							name: '',
							color: "#FF5533"
						}];
						//console.log(canvasData);
						_self.CanvasData("canvas", canvasData);
						
					}
				})
				
				
			},
			CanvasData(canvasId1, chartData1) {
				let that = this;
				canvas = new uCharts({
					$this: _self,
					canvasId: canvasId1,
					type: 'line',
					fontSize: 8,
					legend: false,
					dataLabel: false,
					dataPointShape: false,
					background: 'transparent',
					dataLineColor: '#333333',
					pixelRatio: _self.pixelRatio,
					categories: chartData1.categories,
					series: chartData1.series,
					animation: false,
					xAxis: {
						dashLength: 8,
						gridColor: 'transparent'
					},
					yAxis: {
						dashLength: 8,
						splitNumber: 5,
						min: 0,
						disabled: false,
						max: 2,
						format: (val) => {
							return val
						}
					},
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					extra: {
						lineStyle: 'curve',

					}
				});

			},
			touchCanvas(e) {
				canvas.showToolTip(e, {
					format: function(item, category) {
						return /* category + ' ' + item.name + ':' + */ item.data + '%'
					}
				});
			},
			hidePop() {
				this.showPop = false
			},

			getServerData2() {
				let that = this;
				let Column = {
					categories: [],
					series: []
				};							
				djRequest({
					url:'/api/statistics/orders',
					method:'GET',
					success:function(res){
						//console.log(res);
						let orignData = res.data.data;
						let weekNumber = [];
						let weekArr = [];
						for (let obj in orignData) {
							weekArr.push(obj);
							weekNumber.push(String(orignData[obj].number.toFixed(2)));
						}												
						Column.categories = weekArr;
						Column.series = [{
							data: weekNumber,
							name: '',
							color: "#FF5533"
						}];
						//console.log(Column);
						_self.showColumn("canvasColumn", Column);						
					}
				})
			},
			showColumn(canvasId, chartData) {
				canvaColumn = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'column',
					legend: false,
					fontSize: 8,
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					animation: true,
					categories: chartData.categories,
					series: chartData.series,
					xAxis: {
						disableGrid: true,
					},
					yAxis: {
						dashLength: 8,
						splitNumber: 4,
						min: 0,
						disabled: false,
						max: 500,
						format: (val) => {
							return val
						}
					},
					dataLabel: true,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					extra: {
						column: {
							type: 'group',
							width: _self.cWidth * _self.pixelRatio * 0.45 / chartData.categories.length
						}
					}
				});

			},
			touchColumn(e) {
				canvaColumn.showToolTip(e, {
					format: function(item, category) {
						if (typeof item.data === 'object') {
							return category + ' ' + item.name + ':' + item.data.value
						} else {
							return category + ' ' + item.name + ':' + item.data
						}
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
		position: relative;
	}

	.header image:first-child {
		margin-top: 20upx;
		height: 100%;
		width: 45%;
	}

	.header image:last-child {
		width: 50upx;
		height: 50upx;
		position: absolute;
		z-index: 1000;
		top: 58upx;
		right: 30upx;
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

	.notice .sound {
		width: 50upx;
	}

	

	.notice text {
		font-size: 24upx;
		color: #888888;
		display: inline-block;
		text-align: right;
		height: 50upx;
		line-height: 50upx;
	}
		.notice text:nth-child(3) {
		font-size: 24upx;
		color: #333333;
		display: block;
		width: 520upx!important;
		text-align:left;
		padding-left:20upx;
		height: 50upx;
		
		line-height: 50upx;
	}
	.section_title {
		width: 100%;
		color: #333333;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 32upx;
		font-weight: bold;
		position: relative;
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
		
		text-align: center;
	}

	.section3 .total_sub2 {
		font-size: 28upx;
		
		text-align: center;
	}

	.rt {
		position: absolute;
		right: -20upx;
		top: 5upx;
		font-weight: normal !important;
		color: #999 !important;
		font-size: 24upx !important;
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
	.qiun-padding {
		padding: 2%;
		width: 96%;
		box-sizing: border-box;
	}

	.qiun-wrap {
		display: flex;
		flex-wrap: wrap;
	}

	.qiun-rows {
		display: flex;
		flex-direction: row !important;
	}

	.qiun-columns {
		width: 94%;
		display: flex;
		flex-direction: column !important;
		overflow: hidden;
	}

	.qiun-common-mt {
		margin-top: 5px;
	}

	.qiun-bg-white {
		background: #FFFFFF;
	}

	.qiun-title-bar {
		width: 96%;
		padding: 5px 2%;
		flex-wrap: nowrap;
	}

	.qiun-title-dot-light {
		border-left: 5px solid #0ea391;
		padding-left: 5px;
		font-size: 16px;
		color: #000000;
	}

	.qiun-charts {
		width: 375px;
		height: 250px;
		background-color: #FFFFFF;
		overflow: hidden;
	}

	.charts {
		width: 375px;
		height: 250px;
		background-color: #FFFFFF;
	}
	.red{
		color:#FF3333!important;
	}
	.green{
		color:green!important;
	}
</style>
