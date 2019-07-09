<template>
	<view class="container">
		<view class="section1">
			<view class="title">AP数量</view>
			<view class="num wpgold">{{wallet}}</view>
			<span class="want" data-url="sellAP" @tap="navTo">退租AP</span>
		</view>

		<view class="section2">
			<view class="wt" v-if="type==1">
				<view class="section_title">希望钱包明细</view>
				<view class="wallet-title">
					<view>日期</view>
					<view>交易类型</view>
					<view>数量</view>
				</view>
				<view class="list" v-for="(item,index) in listWallet" :key="index">
					<view>{{item.harvestTime | formatDate(2)}}</view>
					<view>提取分红</view>
					<view>{{item.total}}</view>
				</view>
			</view>
			<view class="bs" v-else>
				<view class="section_title">奖金钱包明细</view>
				<view class="bonus-title">
					<view class="">日期</view>
					<view class="">交易类型</view>
					<view class="">用户</view>
					<view class="">数量</view>
				</view>
				<view class="list" v-for="(temp,index) in listBonus" :key="index">
					<view class="">{{temp.Time | formatDate(2)}}</view>
					<view class="">承租</view>
					<view class="">{{temp.recommendUsername}}</view>
					<view class="">{{temp.bonus}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	import common from '../../common/common.js'
	import {
		config
	} from '../../common/config.js'
	import {
		djRequest
	} from '../../common/request.js'
	export default {
		data() {
			return {
				type: 1,
				wallet: 0,
				listWallet: [],
				listBonus: []
			}
		},
		components: {
			uniIcon
		},
		onLoad(options) {
			this.type = options.type
			if (options.type == 1) {
				uni.setNavigationBarTitle({
					title: '希望钱包'
				});
			} else if (options.type == 2) {
				uni.setNavigationBarTitle({
					title: '奖金钱包'
				});
			}
		},
		onShow() {
			let that = this;
			that.wallets();
			if (that.type == 2) { //奖金明细
				djRequest({
					url: '/api/recommend',
					method: 'POST',
					data: {
						start: 0,
						length: 500
					},
					success: function(res) {
						if (res.data.status === 200) {
							that.listBonus = res.data.data.data;
						}
					}
				})
			} else if (that.type == 1) { //希望钱包明细
				djRequest({
					url: '/api/seed',
					data: {
						start: 0,
						length: 500
					},
					method: 'POST',
					success: function(res) {
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
						that.listWallet = arr;
					}
				})
			}
		},
		methods: {
			navTo(e) {
				let that = this;
				uni.navigateTo({
					url: e.currentTarget.dataset.url + '?type=' + that.type
				})
			},
			/* 当前钱包资产 */
			wallets() {
				let that = this;
				if (that.type == 1) {
					that.wallet = parseFloat(config.balance.ecash).toFixed(4); //希望钱包
				} else if (that.type == 2) {
					that.wallet = parseFloat(config.balance.bonus).toFixed(4); //奖金钱包
				}
			},
		}
	}
</script>

<style>
	.wallet-title,
	.bonus-title,
	.list {
		width: 750upx;
		display: flex!important;
		justify-content: space-around!important;
		align-items: center!important;
		background: #fff;
		padding: 20upx 0;
		font-size: 28upx;
	}

	.list {
		border-top: 2upx solid #f7f7f7;
		font-size: 28upx;
	}
	.wt>.wallet-title>view,.wt>.list>view{
		width:33.3%;
		text-align: center;
		overflow:hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.bs>.bonus-title>view,
	.bs>.list>view{
		width:25%;
		text-align: center;
		overflow:hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	} 
	.section1 {
		width: 750upx;
		padding: 40upx 0;
		background: linear-gradient(137deg, #CEA15A, #F3CB84);
		text-align: center;
	}

	.section1 .title {
		font-size: 32upx;
		color: #ffffff;
		line-height: 1.6em;
		margin-top: 10upx;
	}

	.section1 .num {
		font-size: 64upx;
		color: #ffffff;
		line-height: 1.6em;
		font-weight: bold;
		margin-bottom: 30upx;
	}

	.section1 .want {
		color: #FFFFFF;
		font-size: 32upx;
		border: 1px solid #FFFFFF;
		border-radius: 16upx;
		padding: 10upx 40upx;
	}

	.section_title {
		color: #333333;
		font-size: 28upx;
		font-weight: bold;
		padding:20upx 40upx;
		box-sizing:border-box;
		width:750upx;
	}

	.section2 {
		width: 750upx;
	}

	.section2 .item {
		background: #FFFFFF;
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
