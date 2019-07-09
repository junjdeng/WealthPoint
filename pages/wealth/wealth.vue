<template>
	<view class="container">
		<view class="section section1" style="background-image: url('../../static/images/wealthbg.jpg');">
			<view class="flex-start">
				<view class="flex1">
					<view class="title">总资产AP</view>
					<view class="num wpgold">{{totalAssets}}</view>
				</view>
				<view class="flex1 count">
					<view>承租AP总数<span>{{buyNumber}}</span></view>
					<view>已退租AP数<span>{{sellNumber}}</span></view>
					<view>待退租AP数<span>{{forSell}}</span></view>
				</view>
			</view>

			<view class="flex-start total_card">
				<view class="flex2" data-url="wallet?type=1" @tap="navTo">
					<view class="num">{{hopeWallet}}</view>
					<view class="title">希望钱包</view>
				</view>
				<view class="flex1">
					<view class="line"></view>
				</view>
				<view class="flex2" data-url="wallet?type=2" @tap="navTo">
					<view class="num">{{bonusWallet}}</view>
					<view class="title">奖金钱包</view>
				</view>
				<view class="flex1">
					<view class="line"></view>
				</view>
				<view class="flex2" data-url="wallet1" @tap="navTo">
					<view class="num">{{financialWallet}}</view>
					<view class="title">理财钱包</view>
				</view>
			</view>
		</view>

		<view class="section section2">
			<view class="section_title">我的收益<span data-url="myMoney" @tap="navTo">分红收益<uni-icon type="forward" class="forward" size="20" color="#999999"></uni-icon></span></span></view>
			<view class="flex-start condition_card">
				<view class="flex1">
					<view>总收益</view>
					<view class="wpred">{{totalRevenue}}</view>
				</view>
				<view class="flex1">
					<view>今日收益</view>
					<view class="wpred">0.50</view>
				</view>
			</view>

			<view class="want_wrap">
				<span class="want" data-url="buyAP" @tap="navTo">我要承租</span>
			</view>
		</view>

		<view class="section section3">
			<view class="flex-start">
				<view class="flex1 " data-url="buyAPList" @tap="navTo">
					<view class="father">
						<image src="../../static/images/wealth2.jpg"></image>
						<view class="color" v-show="buyFlag"></view>
					</view>
					<view class="title">承租AP</view>
				</view>
				<view class="flex1" data-url="sellAPList" @tap="navTo">
					<view class="father">
						<image src="../../static/images/wealth1.jpg"></image>
						<view class="color" v-show="sellFlag"></view>
					</view>
					<view class="title">退租AP</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	import common from '../../common/common.js'
	import { config } from '../../common/config.js'
	import { djRequest } from '../../common/request.js'
	export default {
		data() {
			return {
				obj: {},
				totalAssets: 0, //总资产
				hopeWallet: 0, //希望钱包
				bonusWallet: 0, //奖金钱包
				buyNumber: 0, //买入AP总数
				sellNumber: 0, //已卖出AP总数
				forSell: 0, //待卖出AP总数
				financialWallet: 0, //理财钱包
				totalRevenue: 0, //总收益
				buyFlag:false,
				sellFlag:false
			}
		},
		components: {
			uniIcon
		},
		methods: {
			navTo(e) {
				uni.navigateTo({
					url: e.currentTarget.dataset.url
				})
			},
			/* 钱包资产 */
			wallet() {
				let that = this;
				if(config.balance!==null){
					that.totalAssets = (Number(config.balance.ecash) + Number(config.balance.bonus) + Number(config.balance.harvestNumber) + Number(config.balance.orderNumber)).toFixed(4); //总资产
					that.hopeWallet = Number(config.balance.ecash).toFixed(4); //希望钱包
					that.bonusWallet = Number(config.balance.bonus).toFixed(4); //奖金钱包
					that.financialWallet = Number(config.balance.temporary).toFixed(4); //理财钱包
					that.forSell = (Number(config.balance.ecash) + Number(config.balance.bonus)).toFixed(4); //待卖出
				}
				
			},
			/* 收益资产 */
			harvest() {
				let that = this;
				djRequest({
					url: '/api/statistics/index',
					method: 'GET',
					success: function(res) {
						if (res.data.status === 200) {
							that.totalRevenue = (Number(res.data.data.growingSeedTotal) + Number(res.data.data.rewardSeedTotal)).toFixed(4);
							that.buyNumber = res.data.data.buyOrderTotal;
							that.sellNumber = res.data.data.sellOrderTotal;
						}
					}
				})
			}
		},
		onShow() {
			common.balance();
			this.wallet(); //钱包资产
			this.harvest(); //收益
		}
	}
</script>

<style>
	.section1 {
		padding: 20upx;
		width: 670upx;
		background-size: 100% 100%;
	}

	.section1 .title {
		font-size: 32upx;
		color: #ffffff;
		line-height: 1.6em;
		margin-top: 10upx;
		;
		text-align: left;
	}

	.section1 .num {
		font-size: 64upx;
		color: #ffffff;
		line-height: 1.6em;
		font-weight: 400;
		text-align: left;
	}

	.section1 .total_card {
		background: rgba(255, 255, 255, 0.4);
		border-radius: 16upx;
		margin-top: 10upx;
		padding: 30upx 5upx;
		text-align: center;
	}

	.section1 .total_card .num {
		font-size: 32upx;
		color: #333333;
		font-weight: bold;
		text-align: center;
	}

	.section1 .total_card .title {
		font-size: 28upx;
		color: #666666;
		text-align: center;
	}

	.section1 .total_card .line {
		background: #CCA366;
		display: inline-block;
		width: 1px;
		height: 50upx;
	}

	.section1 .count {
		font-size: 24upx;
		color: #ffffff;
		line-height: 2em;
		padding-left: 100upx;
		font-weight: 500;
	}

	.section1 .count span {
		float: right;
		padding-right: 40upx;
	}

	.section_title {
		color: #333333;
		font-size: 32upx;
		font-weight: bold;
	}

	.section2 {
		padding: 20upx;
		width: 670upx;
	}

	.section2 .condition_card {
		color: #333333;
		font-size: 28upx;
		line-height: 2em;
		text-align: center;
		padding-top: 40upx;
	}

	.section2 .condition_card .wpred {
		font-size: 40upx;
	}

	.want_wrap {
		text-align: center;
		margin-top: 50upx;
		margin-bottom: 10upx;
	}

	.want_wrap .want {
		color: #CCA366;
		font-size: 32upx;
		font-weight: 400;
		border: 1px solid #CCA366;
		border-radius: 8upx;
		padding: 10upx 40upx;
	}

	.section_title span {
		float: right;
		color: #999999;
		font-size: 24upx;
	}

	.section_title span .forward {
		position: relative;
		top: 0upx;
	}

	.section3 {
		text-align: center;
		padding: 40upx 0;
	}

	.section3 image {
		width: 50upx;
		height: 50upx;
	}

	.section3 .title {
		color: #333333;
		font-size: 28upx;
		line-height: 2em;
	}

	.flex4 {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.father{
		position:relative!important;
	}
	.color{
		position:absolute;
		right:35%;
		top:0;
		z-index:100;
		width:20upx;
		height:20upx;
		border-radius:50%;
		background: #e4393c;
	}
</style>
