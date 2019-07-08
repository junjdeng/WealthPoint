<template>
	<view class="main">
		<view class="title">
			<view>币种</view>
			<view>当前价</view>
			<view>最高价</view>
			<view>最低价</view>
			<view>成交量</view>
		</view>
		<view class="title fz" v-for="(item,index) in list" :key="index">
			<view>{{item.cat}}</view>
			<view>{{item.close}}</view>
			<view>{{item.high}}</view>
			<view>{{item.low}}</view>
			<view>{{item.amount}}</view>
		</view>
		<view class="intro" v-if="list.length>0">--数据来源:火币网</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				list: []
			}
		},
		onShow() {
			let that = this;
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
								item.symbol == 'bsvusdt')) {
							if (!item.hasOwnProperty('cat')) {
								item.cat = item.symbol.slice(0, 3).toUpperCase();
							}
							item.high=Number(item.high).toFixed(2);
							item.low=Number(item.low).toFixed(2);
							item.amount=Number(item.amount/10000).toFixed(2)+'万';
							item.close=Number(item.close).toFixed(2);
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
		font-size: 32upx;
		color: #333;
		border-bottom:2upx solid #f7f7f7;
		padding:20upx 0;
	}
	.title view{
		width:25%;
		text-align: center;
	}
	.fz{
		font-size: 28upx;
	}
	.intro{
		width:100%;
		background: #fff;
		padding:20upx 20upx 20upx 0;
		box-sizing:border-box;
		font-size: 24upx;
		text-align:right;
		color:#666;
	}
</style>
