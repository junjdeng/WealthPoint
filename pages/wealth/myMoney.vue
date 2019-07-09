<template>
	<view class="qiun-columns">
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt" >
			<view class="qiun-title-dot-light">我的总收益</view>
		</view>
		<view class="qiun-charts qiun-rows" >
			<canvas canvas-id="canvasPie" id="canvasPie" class="charts-pie" @touchstart="touchPie"></canvas>
			<view class="qiun-bg-white charts-right">
				<view>
					<block v-for="(item, index) in piearr" :key="index">
						<view class="qiun-rows legend-itme">
							<view class="legend-itme-point" :style="{'background-color':item.color}"></view>
							<view class="legend-itme-text">{{item.name}}:{{item.dat}}人</view>
						</view>
					</block>
				</view>
			</view>
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
				piearr:[]
			}
		},
		onLoad() {
			_self = this;
			this.cWidth=uni.upx2px(550);
			this.cHeight=uni.upx2px(500);
			this.getServerData();
		},
		mounted(){
			_self = this;
			this.cWidth=uni.upx2px(550);
			this.cHeight=uni.upx2px(500);
			this.getServerData();
		},
		methods: {
			getServerData(){
								djRequest({
					url:'/api/statistics/index',
					method:'GET',
					success:function(res){
						console.log(res);
						
						let x=res.data.data.buyOrderTotal;
						let y=res.data.data.sellOrderTotal;
						let z = (parseFloat(res.data.data.ecash) + parseFloat(res.data.data.bonus)).toFixed(4);//总资产
						let Pie={series:[]};
						Pie.series=[
						  {dat:y, name:'总卖出'},
						  {dat:z, name:'待卖出'},
						  {dat:x,name:'总买入'}
						];
						_self.showPie("canvasPie",Pie);
					}
				})
				/* uni.request({
					url: 'https://www.easy-mock.com/mock/5cc586b64fc5576cba3d647b/uni-wx-charts/chartsdata2',
					data:{
					},
					success: function(res) {
						console.log(res.data.data)
						let Pie={series:[]};
						//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
						Pie.series=res.data.data.Pie.series;
						
					},
					fail: () => {
						_self.tips="网络错误，小程序端请检查合法域名";
					},
				}); */
			},
			showPie(canvasId,chartData){
				canvaPie=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'pie',
					fontSize:11,
					legend:false,
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
				this.piearr=canvaPie.opts.series;
			},
			touchPie(e){
				canvaPie.showToolTip(e, {
					format: function (item) {
						return item.name + ':' + item.dat 
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
.qiun-title-dot-light{border-left: 10upx solid #0ea391; padding-left: 10upx; font-size: 32upx;color: #000000}
.qiun-charts{width: 750upx; height:500upx;background-color: #FFFFFF;}
.charts-pie{width: 550upx; height:500upx;background-color: #FFFFFF;}
.charts-right{display:flex;align-items:center;width: 250upx; height:500upx;background-color: #FFFFFF;}
.legend-itme{width: 200upx; margin-left: 30upx; height:50upx;align-items:center;}
.legend-itme-point{width: 20upx; height:20upx; margin: 15upx;  border: 1px solid #FFFFFF; border-radius: 20upx;background-color: #000000;}
.legend-itme-text{height:50upx;line-height: 50upx;color: #666666;font-size: 26upx;}
</style>