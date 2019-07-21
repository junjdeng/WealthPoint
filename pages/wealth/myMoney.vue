<template>
	<view class="qiun-columns">
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt" >
			<view class="qiun-title-dot-light">我的总收益</view>
		</view>
		<view class="profit-main">
        <view class="profit-main-left">
          <view class="profit-number">{{totalRevenue}}</view>
          <view>我的总收益</view>
        </view>
        <view class="profit-main-right">
          <view style="font-size: 50upx;color:#CCA366;height: 40upx;position:absolute;left:-10upx;top:-10upx;">*</view>
          <view>
            <view>AP每天的收益分红</view>
          </view>
          <view>
            <view>系统赠送</view>
          </view>
          <view>
            <view>奖励</view>
          </view>
        </view>
      </view>
		<view class="qiun-charts" >
			<canvas canvas-id="canvasPie" id="canvasPie" class="charts" @touchstart="touchPie($event)"></canvas>
		</view>
	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js';
		import common from '../../common/common.js'
	import {
		config
	} from '../../common/config.js'
	import {
		djRequest
	} from '../../common/request.js'
	var _self;
	var canvaPie=null;
   
	export default {
		data() {
			return {
				cWidth:'',
				cHeight:'',
				pixelRatio:1,
				serverData:'',
				piearr:[],
				zer:0,
				buy:0,
				sell:0,
				totalRevenue:0
			}
		},
		onShow(){
			common.balance();
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: 'harvest'
			})
		},
		onLoad() {
			_self = this;
			this.cWidth=uni.upx2px(750);
			this.cHeight=uni.upx2px(500);
			let that = this;
			djRequest({
				url: '/api/member/balance',
				method: 'GET',
				success: function(res) {
					that.zer = (parseFloat(res.data.data.ecash) + parseFloat(res.data.data.bonus)).toFixed(4);//总资产;
				}
			})
			djRequest({
				url:'/api/statistics/index',
				method:'GET',
				success:function(res){
					that.buy=res.data.data.buyOrderTotal;
					that.sell=res.data.data.sellOrderTotal;
					that.totalRevenue=(parseFloat(res.data.data.growingSeedTotal)+parseFloat(res.data.data.rewardSeedTotal)).toFixed(4);
				}
			})
		},
		mounted(){
			let that = this;
			setTimeout(function(){
				that.getServerData();
			},400)
			
		},
		methods: {
			getServerData(){
				let that = this;				let Pie={series:[
				  {data:Number(that.sell), name:'总卖出('+that.sell+')', color:'#ee8622'},
				  {data:Number(that.zer), name:'待卖出('+that.zer+')', color:'#efb964'},
				  {data:Number(that.buy),name:'总买入('+that.buy+')', color:'#f7ac1a'}
				]};
				_self.showPie("canvasPie",Pie);
			},
			showPie(canvasId,chartData){
				canvaPie=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'pie',
					fontSize:11,
					legend:true,
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					series: chartData.series,
					animation: true,
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					dataLabel: true,
					extra: {
						pie: {
						  lableWidth:15
						}
					},
				});
			},
			touchPie(e){
				canvaPie.showToolTip(e, {
					format: function (item) {
						return item.name + ':' + Number(item.data) 
					}
				});
			},
		}
	}
</script>

<style>
page{background:#F2F2F2;width: 750upx;overflow-x: hidden;}
.qiun-padding{padding:2%; width:96%;}
.qiun-wrap{display:flex; flex-wrap:wrap;}
.qiun-rows{display:flex; flex-direction:row !important;}
.qiun-columns{display:flex; flex-direction:column !important;}
.qiun-common-mt{margin-top:10upx;}
.qiun-bg-white{background:#FFFFFF;}
.qiun-title-bar{width:96%; padding:10upx 2%; flex-wrap:nowrap;}
.qiun-title-dot-light{border-left: 10upx solid #CCA366; padding-left: 10upx; font-size: 32upx;color: #000000}
.qiun-charts{width: 750upx; height:500upx;background-color: #FFFFFF;}
.charts{width: 750upx; height:500upx;background-color: #FFFFFF;}
.profit-main {
    color: #565656;
    width: 86%;
    padding: 20upx 7%;
    display: flex;
    justify-content: space-between;
    align-items: center;
	background: #fff;
  }

  .profit-main > view {
    width: 40%;
    font-size: 28upx;
  }

  .profit-main > view:last-child {
    width: 50%;
    border-left: 2upx solid #f2f2f2;
    padding-left: 20upx;
    position:relative;
  }
.profit-number {
    color: #CCA366;
    font-size: 40upx;
  }
  .profit-main-right > view {
    display: flex;
	padding-left:60upx;
	box-sizing:border-box;
    justify-content: flex-start;
    align-items: center;
  }
</style>
