<template>
	<view class="main">
		<view class="title">
			<view>
				币种
				<!-- /流通市值 -->
			</view>
			<view>最新价</view>
			<view>24H涨幅</view>
		</view>
		<view class="title fz" v-for="(item, index) in list" :key="index">
			<view>
				<view style="display:flex;justify-content:flex-start;align-items:center;box-sizing:border-box;padding-left:40upx;">
					<image class="imgs" v-if="item.cat == 'OMG'" src="/static/images/coin/omg.png"></image>
					<image class="imgs" v-else-if="item.cat == 'ETH'" src="/static/images/coin/eth.png"></image>
					<image class="imgs" v-else-if="item.cat == 'ETC'" src="/static/images/coin/etc.png"></image>
					<image class="imgs" v-else-if="item.cat == 'ADA'" src="/static/images/coin/ADA.png"></image>
					<image class="imgs" v-else-if="item.cat == 'AE'" src="/static/images/coin/AE.png"></image>
					<image class="imgs" v-else-if="item.cat == 'ATOM'" src="/static/images/coin/atom.png"></image>
					<image class="imgs" v-else-if="item.cat == 'BCH'" src="/static/images/coin/BCH.png"></image>
					<image class="imgs" v-else-if="item.cat == 'BTC'" src="/static/images/coin/BTC.png"></image>
					<image class="imgs" v-else-if="item.cat == 'DASH'" src="/static/images/coin/DASH.png"></image>
					<image class="imgs" v-else-if="item.cat == 'EOS'" src="/static/images/coin/EOS.png"></image>
					<image class="imgs" v-else-if="item.cat == 'LTC'" src="/static/images/coin/ltc.png"></image>
					<image class="imgs" v-else-if="item.cat == 'NEO'" src="/static/images/coin/neo.png"></image>
					<image class="imgs" v-else-if="item.cat == 'TRX'" src="/static/images/coin/trx.png"></image>
					<image class="imgs" v-else-if="item.cat == 'XRP'" src="/static/images/coin/XRP.png"></image>
					<image class="imgs" v-else-if="item.cat == 'BSV'" src="/static/images/coin/bsv.png"></image>
					<view>
						<view>
							<view>
								{{ item.cat }}
								<text style="font-size:24upx!important;color:#999!important;">/USDT</text>
							</view>
						</view>
						<view class="txt" v-if="item.cat == 'BTC'">比特币</view>
						<view class="txt" v-if="item.cat == 'ETH'">以钛坊</view>
						<view class="txt" v-if="item.cat == 'ETC'">以钛经典</view>
						<view class="txt" v-if="item.cat == 'XRP'">瑞波币</view>
						<view class="txt" v-if="item.cat == 'TRX'">波场</view>
						<view class="txt" v-if="item.cat == 'NEO'">小蚁</view>
						<view class="txt" v-if="item.cat == 'DASH'">达世币</view>
						<view class="txt" v-if="item.cat == 'BCH'">比特币现金</view>
						<view class="txt" v-if="item.cat == 'ADA'">艾达币</view>
						<view class="txt" v-if="item.cat == 'AE'">阿姨币</view>
						<view class="txt" v-if="item.cat == 'OMG'">嫩模币</view>
						<view class="txt" v-if="item.cat == 'ATOM'">ATOM币</view>
						<view class="txt" v-if="item.cat == 'BSV'">比特币SV</view>
						<view class="txt" v-if="item.cat == 'LTC'">莱特币</view>
						<view class="txt" v-if="item.cat == 'EOS'">柚子</view>
					</view>
				</view>
			</view>
			<view>
				<view style="font-size:28upx;color:#333;text-align:center;width:100%;font-weight:bold;">{{ item.close }}</view>
				<view style="font-size:24upx;color:#666;text-align:center;width:100%;">≈￥{{ item.price }}</view>
			</view>
			<view>
				<view class="high green" v-if="item.num >= 0">
					<text>+{{ item.num }}</text>
					%
				</view>
				<view class="high red" v-else>
					<text>{{ item.num }}</text>
					%
				</view>
			</view>
		</view>
		<view class="intro" v-if="list.length > 0">--数据来源:火币网</view>
	</view>
</template>

<script>
import uniIcon from '@/components/uni-icon/uni-icon.vue';
export default {
	data() {
		return {
			list: []
		};
	},
	onShow() {
		let that = this;
		that.list = [];
		uni.request({
			url: 'http://huobi.wezoz.com/market/tickers',
			header: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36',
				timeout: 8000
			},
			method: 'GET',
			success: function(res) {
				let arr = res.data.data,
					ars = [];
				arr.forEach(item => {
					if (
						item.symbol == 'btcusdt' ||
						item.symbol == 'ethusdt' ||
						item.symbol == 'eosusdt' ||
						item.symbol == 'xrpusdt' ||
						item.symbol == 'bchusdt' ||
						item.symbol == 'etcusdt' ||
						item.symbol == 'ltcusdt' ||
						item.symbol == 'bsvusdt' ||
						item.symbol == 'dashusdt' ||
						item.symbol == 'adausdt' ||
						item.symbol == 'trxusdt' ||
						item.symbol == 'atomusdt' ||
						item.symbol == 'omgusdt' ||
						item.symbol == 'neousdt' ||
						item.symbol == 'aeusdt'
					) {
						if (!item.hasOwnProperty('cat')) {
							item.cat = item.symbol.replace(/usdt/g, '').toUpperCase();
						}
						if (!item.hasOwnProperty('num')) {
							item.num = ((Number(Number(item.close) - Number(item.open)) / Number(item.open)).toFixed(4) * 100).toFixed(2);
						}
						item.high = Number(item.high).toFixed(2);
						item.low = Number(item.low).toFixed(2);
						item.close = Number(item.close).toFixed(4);
						if (!item.hasOwnProperty('price')) {
							item.price = (item.close * 6.9).toFixed(2);
						}
						ars.push(item);
					}
				});
				that.list = ars;
			},
			fail: function(res) {
				console.log(res, 4);
			}
		});
	}
};
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

.title > view {
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
	background: #ff5533;
}

.green {
	background: #7ed321;
}
.imgs {
	width: 40upx;
	height: 40upx;
	margin-right: 5upx;
}
.txt{
	font-size: 24upx;
	color:#666;
	text-align:left;
}
</style>
