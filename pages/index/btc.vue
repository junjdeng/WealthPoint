<template>
	<view class="main">
		<view class="title">
			<view>币种<!-- /流通市值 --></view>
			<view>最新价</view>
			<view>24H涨幅</view>
		</view>
		<view class="title fz" v-for="(item,index) in list" :key="index">
			<view style="display:flex;justify-content:center;align-items:center;"><!-- <image class="imgs" :src="item.icon"></image> --><view>{{item.cat}}</view></view>
			<view>
				<view style="font-size:28upx;color:#333;text-align:center;width:100%;font-weight:bold;">￥{{item.price}}</view>
				<view style="font-size:24upx;color:#666;text-align:center;width:100%;">${{item.close}}</view>
			</view>
			<view>
				<view class="high green" v-if="item.num>=0" >
					<text >+{{item.num}}</text>%
				</view>
				<view class="high red" v-else>
				<text>{{item.num}}</text>%
				</view>
			</view>
		</view>
		<view class="intro" v-if="list.length>0">--数据来源:火币网</view>
	</view>

</template>

<script>
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	export default {
		data() {
			return {
				list: [],
				
			}
		},
		onShow() {
			let that = this;
			that.list=[];
			uni.request({
				url: 'https://api.huobi.pro/market/tickers',
				header: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36',
					'timeout': 8000
				},
				method: 'GET',
				success: function(res) {
					let arr = res.data.data
					arr.forEach(item => {
						if ((item.symbol == 'btcusdt') || (item.symbol == 'ethusdt') || (item.symbol == 'eosusdt') || (item.symbol ==
								'xrpusdt') || (item.symbol == 'bchusdt') || (item.symbol == 'etcusdt') || (item.symbol == 'ltcusdt') || (
								item.symbol == 'bsvusdt'|| (item.symbol == 'dashusdt')|| (item.symbol == 'adausdt')|| (item.symbol == 'trxusdt')
								|| (item.symbol == 'atomusdt')|| (item.symbol == 'omgusdt')|| (item.symbol == 'neousdt'))) {
									
							if (!item.hasOwnProperty('cat')) {
								item.cat = item.symbol.replace(/usdt/g,'').toUpperCase();
								
							}
							if (!item.hasOwnProperty('num')) {
								item.num = (((Number(Number(item.close) - Number(item.open)) / (Number(item.open))).toFixed(4)) * 100).toFixed(2);
							}
							item.high = Number(item.high).toFixed(2);
							item.low = Number(item.low).toFixed(2);
							item.close = Number(item.close).toFixed(2);
							if (!item.hasOwnProperty('price')) {
								item.price = (item.close*6.86).toFixed(2);
							}
							that.list.push(item)
						}
					})
				},
				fail: function(res) {
					console.log(res, 4)
					//that.getBTC();
				}
			})
		}
	}
</script>

<style>
	.main {
		width: 100%;
		height: 100%;
		background: #fff;
	}

	.title {
		width: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		font-size: 24upx;
		color: #333;
		border-bottom: 2upx solid #f7f7f7;
		padding: 20upx 0;
	}

	.title view {
		width: 33.3%;
		text-align: center;
	}

	.fz {
		font-size: 28upx;
	}

	.intro {
		width: 100%;
		background: #fff;
		padding: 20upx 20upx 20upx 0;
		box-sizing: border-box;
		font-size: 24upx;
		text-align: right;
		color: #666;
	}

	.high {
		width: 120upx !important;
		height: 60upx !important;

		border-radius: 10upx;
		overflow: hidden;
		font-size: 24upx !important;
		color: #fff;
		margin: 0 auto;
		line-height: 60upx;
		text-align: center;
	}

	.red {
		background: #FF5533;
	}

	.green {
		background: #7ED321;
	}
	.imgs{
		display:inline-block;
		width:32upx;
		height:32upx;
		margin-right:10upx;
	}
</style>
