<template>
	<view class="section2" style="position:relative;">
		<view class="header">
			<view class="con" @click="goBack"><uni-icon type="back" class="back" size="28" color="#666"></uni-icon></view>
			<view class="cter" style="font-size:32upx;">{{ whichWallet }}</view>
			<view class="btns" v-if="type == 1">
				<view class="btnTitle" @click="getDown">{{ hopeSelTxt }}</view>
				<view class="down" v-show="down">
					<view @click="historyData">已采摘</view>
					<view @click="hopeSend">赠送</view>
					<view @click="hopeRev">消费</view>
				</view>
			</view>
			<view class="btns" v-if="type == 2">
				<view class="btnTitle" @click="getDown">{{ bonusSelTxt }}</view>
				<view class="down" v-show="down">
					<view @click="bonusData">奖金</view>
					<view @click="bonusOther">奖励</view>
					<view @click="bonusRev">消费</view>
				</view>
			</view>
		</view>
		<view class="wt" v-if="type == 1">
			<view class="wallet-title">
				<view>日期</view>
				<view>交易类型</view>
				<view>数量</view>
			</view>
			<view class="list" v-for="(item, index) in listWalletChange" :key="index" v-if="item.balanceType == 'ecash'">
				<view>{{ item.time | formatDate(2) }}</view>
				<view v-show="item.type == 'addition'">赠送</view>
				<view v-show="item.type == 'substruction'">消费</view>
				<view>{{ item.amount }}</view>
			</view>
			<view class="list" v-for="(temp, index) in consume" :key="index" v-if="temp.from == 'ecash'">
				<view class="">{{ temp.time | formatDate(2) }}</view>
				<view class="">购买道具</view>
				<view class="">-{{ temp.price }}</view>
			</view>
			<view class="list" v-for="(item, index) in listWallet" v-if="hopeFlag && listWallet.length > 0" :key="index">
				<view>{{ item.harvestTime | formatDate(2) }}</view>
				<view>已采摘</view>
				<view>{{ item.total }}</view>
			</view>
		</view>
		<view class="bs" v-else>
			<view class="bonus-title">
				<view class="">日期</view>
				<view class="">交易类型</view>
				<view class="">用户</view>
				<view class="">数量</view>
			</view>
			<view class="list" v-for="(item, index) in listWalletChange" :key="index" v-if="item.balanceType == 'bonus'">
				<view>{{ item.time | formatDate(2) }}</view>
				<view v-show="item.type == 'addition'">奖励</view>
				<view v-show="item.type == 'substruction'">消费</view>
				<view class="">{{ item.username }}</view>
				<view>{{ item.amount }}</view>
			</view>
			<view class="list" v-for="(temp, index) in consume" :key="index" v-if="temp.from == 'bonus'">
				<view class="">{{ temp.time | formatDate(2) }}</view>
				<view class="">购买道具</view>
				<view class="">{{ temp.username }}</view>
				<view class="">-{{ temp.price }}</view>
			</view>
			<view class="list" v-for="(temp, index) in listBonus" v-if="bonusFlag && listBonus.length > 0" :key="index">
				<view class="">{{ temp.Time | formatDate(2) }}</view>
				<view class="">奖金</view>
				<view class="">{{ temp.recommendUsername }}</view>
				<view class="">{{ temp.bonus }}</view>
			</view>
		</view>
		<view class="more">{{ isMore ? '' : '暂无更多数据' }}</view>
	</view>
</template>

<script>
import uniIcon from '@/components/uni-icon/uni-icon.vue';
import common from '../../common/common.js';
import { config } from '../../common/config.js';
import { djRequest } from '../../common/request.js';
export default {
	data() {
		return {
			type: 1,
			listWallet: [], //分红列表
			listWalletChange: [], //赠送列表
			listBonus: [], //奖金列表
			consume: [], //消费列表
			down: false, //下拉框
			whichWallet: '希望钱包明细',
			hopeSelTxt: '已采摘',
			bonusSelTxt: '奖金',
			start: 0,
			length: 20,
			isMore: true,
			hopeFlag: true,
			bonusFlag: true
		};
	},
	components: {
		uniIcon
	},
	onPullDownRefresh: function() {
		this.start = 0;
		if (this.type == 1) {
			this.listWallet = [];
			this.hopeGet();
		} else if (this.type == 2) {
			this.listBonus = [];
			this.bonusGet();
		}
	},
	onReachBottom: function() {
		if (this.isMore) {
			if (this.type == 1) {
				this.hopeGet();
			} else if (this.type == 2) {
				this.bonusGet();
			}
		}
	},
	onShow() {
		let that = this;
		if (that.type == 2) {
			//奖金明细
			that.bonusGet();
		} else if (that.type == 1) {
			//希望钱包明细
			that.hopeGet();
		}
	},
	onLoad(options) {
		this.type = options.type;
		if (options.type == 1) {
			this.whichWallet = '希望钱包明细';
		} else if (options.type == 2) {
			this.whichWallet = '奖金钱包明细';
		}
	},
	methods: {
		goBack() {
			uni.navigateBack();
		},
		historyData() {
			let that = this;
			that.hopeFlag = true;
			that.down = false;
			that.listWalletChange = [];
			that.consume = [];
			that.hopeSelTxt = '已采摘';
		},
		bonusData() {
			let that = this;
			that.bonusFlag = true;
			that.down = false;
			that.listWalletChange = [];
			that.consume = [];
			that.bonusSelTxt = '奖金';
		},
		//提取分红希望钱包
		hopeGet() {
			let that = this;
			that.down = false;
			that.hopeFlag = true;
			that.hopeSelTxt = '已采摘';
			/* that.listWallet=[]; */
			that.listWalletChange = [];
			that.consume = [];
			djRequest({
				url: '/api/seed',
				data: {
					start: that.start,
					length: that.length
				},
				method: 'POST',
				success: function(res) {
					uni.stopPullDownRefresh();
					if (res.data.data.data.length < that.length) {
						that.isMore = false;
					} else {
						that.isMore = true;
					}
					let arr1 = res.data.data.data,
						arr = [];
					arr1.forEach(item => {
						if (item.status === 'reward') {
							if (!item.hasOwnProperty('total')) {
								item.total = (Number(item.number) + Number(item.harvestNumber)).toFixed(4);
							}
							arr.push(item);
						}
					});
					that.listWallet = that.listWallet.concat(arr);
					that.start = that.listWallet.length;
				}
			});
		},
		//赠送希望钱包
		hopeSend() {
			let that = this;
			that.hopeFlag = false;
			that.hopeSelTxt = '赠送';
			that.down = !that.down;
			/* that.listWallet=[]; */
			that.listWalletChange = [];
			that.consume = [];
			djRequest({
				url: '/api/adjustment',
				method: 'POST',
				data: {
					start: 0,
					length: 500
				},
				success: function(res) {
					if (res.data.status === 200) {
						that.listWalletChange = res.data.data.data;
					}
				}
			});
		},
		//扣除希望钱包
		hopeRev() {
			let that = this;
			that.hopeFlag = false;
			that.hopeSelTxt = '消费';
			that.down = !that.down;
			/* that.listWallet=[]; */
			that.listWalletChange = [];
			that.consume = [];
			djRequest({
				url: '/api/gift/receive',
				method: 'POST',
				data: {
					start: 0,
					length: 500
				},
				success: function(res) {
					if (res.data.status === 200) {
						let arr = res.data.data.data;
						arr.forEach(item => {
							if (item.from !== 'other') {
								if ((item.source = 'buy') && item.type !== 'code' && item.price !== '0.000') {
									that.consume.push(item);
								}
							}
						});
					}
				}
			});
		},
		//买入奖金钱包
		bonusGet() {
			let that = this;
			that.bonusSelTxt = '奖金';
			that.bonusFlag = true;
			that.down = false;
			/* that.listBonus=[]; */
			that.listWalletChange = [];
			that.consume = [];
			djRequest({
				url: '/api/recommend',
				method: 'POST',
				data: {
					start: that.start,
					length: that.length
				},
				success: function(res) {
					if (res.data.status === 200) {
						uni.stopPullDownRefresh();
						if (res.data.data.data.length < that.length) {
							that.isMore = false;
						} else {
							that.isMore = true;
						}
						that.listBonus = that.listBonus.concat(res.data.data.data);
						that.start = that.listBonus.length;
					}
				}
			});
		},
		//奖励奖金钱包
		bonusOther() {
			let that = this;
			that.bonusSelTxt = '奖励';
			that.bonusFlag = false;
			that.down = !that.down;
			/* that.listBonus=[]; */
			that.listWalletChange = [];
			that.consume = [];
			djRequest({
				url: '/api/adjustment',
				method: 'POST',
				data: {
					start: 0,
					length: 500
				},
				success: function(res) {
					if (res.data.status === 200) {
						that.listWalletChange = res.data.data.data;
					}
				}
			});
		},
		//扣除奖金钱包
		bonusRev() {
			let that = this;
			that.bonusSelTxt = '消费';
			that.bonusFlag = false;
			that.down = !that.down;
			
			/* that.listBonus=[]; */
			that.listWalletChange = [];
			that.consume = [];
			djRequest({
				url: '/api/gift/receive',
				method: 'POST',
				data: {
					start: 0,
					length: 500
				},
				success: function(res) {
					if (res.data.status === 200) {
						let arr = res.data.data.data;
						arr.forEach(item => {
							if (item.from !== 'other') {
								if ((item.source = 'buy') && item.type !== 'code' && item.price !== '0.000') {
									that.consume.push(item);
								}
							}
						});
					}
				}
			});
		},
		//下拉框
		getDown() {
			this.down = !this.down;
		}
	}
};
</script>

<style>
.header {
	width: 750upx;
	display: flex;
	padding: 50upx 20upx 10upx;
	box-sizing: border-box;
	justify-content: space-between;
	align-items: center;
	font-size: 28upx;
	background: #fff;
	position: fixed;
	top: -2upx;
}
.header .con {
	width: 32upx;
	text-align: left;
}
.more {
	text-align: center;
	color: #999999;
	height: 40upx;
	line-height: 40upx;
	font-size: 28upx;
	padding: 20upx 0;
	margin-top: 20upx;
}
.header .con .back {
	margin-left: -20upx;
}
.header .cter {
	width: 540upx;
	text-align: center;
	box-sizing: border-box;
	padding-left: 40upx;
}
.btns {
	position: relative;
	width: 120upx;
}

.btns .btnTitle {
	width: 120upx;
	text-align: center;
	position: relative;
	box-sizing: border-box;
	border-radius: 8upx;
	line-height: 40upx;
	height: 40upx;
	color: #cca366;
	font-size: 24upx !important;
	color: #cca366 !important;
	border: 2upx solid #cca366;
}

.btns view.down {
	width: 100%;
	position: absolute;
	left: 0;
	top: 100%;
	background: #fff;
	z-index: 100;
	border: 2upx solid #f7f7f7;
	border-radius: 6upx;
	box-shadow: 0 0 6upx #f7f7f7;
	overflow: hidden;
	font-size: 24upx !important;
}

.down > view {
	padding: 12upx 0;
	text-align: center;
	border-bottom: 2upx #f7f7f7 solid;
}

.wallet-title,
.bonus-title,
.list {
	width: 750upx;
	display: flex !important;
	justify-content: space-around !important;
	align-items: center !important;
	background: #fff;
	padding: 20upx 0;
	font-size: 28upx;
}

.list {
	border-top: 2upx solid #f7f7f7;
	font-size: 28upx;
}
.wt,
.bs {
	margin-top: 116upx;
}
.wt > .wallet-title > view,
.wt > .list > view {
	width: 33.3%;
	text-align: center;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.bs > .bonus-title > view,
.bs > .list > view {
	width: 25%;
	text-align: center;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.section2 {
	width: 750upx;
}

.section2 .item {
	background: #ffffff;
	margin-bottom: 20upx;
	padding: 20upx;
	border-radius: 8upx;
	color: #333333;
	font-size: 28upx;
	line-height: 2em;
}

.section2 .item .flex1 {
	text-align: right;
}

.section2 .item .time,
.section2 .item .status {
	color: #999999;
	font-size: 24upx;
}
</style>
