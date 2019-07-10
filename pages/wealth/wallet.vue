<template>
	<view class="container">
		<view class="section1">
			<view class="title">AP数量</view>
			<view class="num wpgold">{{wallet}}</view>
		</view>
		<view class="want" data-url="sellAP" @tap="navTo">卖出</view>
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
		onShow(){
			common.balance();
		},
		onNavigationBarButtonTap(e) {
			let that=this;
			if(that.type==1){
				uni.navigateTo({
					url:'walletDetail?type=1'
				})
				
			}else if(that.type ==2){
				uni.navigateTo({
					url:'walletDetail?type=2'
				})
			}
		},
		onLoad(options) {
			this.type = options.type;
			if (options.type == 1) {
				uni.setNavigationBarTitle({
					title: '希望钱包'
				});
			} else if (options.type == 2) {
				uni.setNavigationBarTitle({
					title: '奖金钱包'
				});
			}
			this.wallets();
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
	.section1 {
		width: 710upx;
		padding: 80upx 0;
		background: linear-gradient(137deg, #CEA15A, #F3CB84);
		text-align: center;
		border-radius: 12upx;
		margin-top:10upx;
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

	.want {
		color: #FFFFFF;
		width:710upx;
		font-size: 32upx;
		text-align: center;
		border-radius: 12upx;
		background: linear-gradient(137deg, #CEA15A, #F3CB84);
		padding: 20upx 40upx;
		margin-top:80upx;
		box-sizing:border-box;
	}

	.section_title {
		color: #333333;
		font-size: 28upx;
		font-weight: bold;
		padding:20upx 40upx;
		box-sizing:border-box;
		width:750upx;
	}

	
</style>
