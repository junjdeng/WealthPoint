<template>
	<view class="container">
		<view class="section1">
			<view class="title">AP数量</view>
			<view class="num wpgold">{{wallet}}</view>
			<span class="want" data-url="sellAP" @tap="navTo">退租AP</span>
		</view>
	
		<view class="section2">
			<view class="section_title">交易记录</view>
			<view class="list">
				<view class="item flex-start">
					<view class="flex2">
						<view class="title">承租AP</view>
						<view class="time">2019-01-08</view>
					</view>
					<view class="flex1">
						<view class="num">+1</view>
						<view class="status">待匹配</view>
					</view>	
				</view>
				<view class="item flex-start">
					<view class="flex2">
						<view class="title">承租AP</view>
						<view class="time">2019-01-08</view>
					</view>
					<view class="flex1">
						<view class="num">+1</view>
						<view class="status">待匹配</view>
					</view>	
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	import common from '../../common/common.js'
	import {config} from '../../common/config.js'	
	import {djRequest} from '../../common/request.js'
	export default {
		data() {
			return {
				type:1,
				wallet:0
			}
		},
		components: {
			uniIcon
		},
		onLoad(options) {
			this.type=options.type
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
		onShow(){
			let that = this;
			that.wallets();
			if(that.type==2){
				
			}
		},
		methods: {
			navTo(e) {
				let that = this;
				uni.navigateTo({
					url:e.currentTarget.dataset.url+'?type='+that.type
				})
			},
			/* 当前钱包资产 */
			wallets () {
				let that = this;
				if(that.type==1){
					that.wallet=parseFloat(config.balance.ecash).toFixed(4);//希望钱包
				}else if(that.type==2){
					that.wallet=parseFloat(config.balance.bonus).toFixed(4);//奖金钱包
				}
			},
		}
	}
</script>

<style>
.section1{width: 750upx; padding: 40upx 0; background: linear-gradient(137deg,#CEA15A,#F3CB84);text-align: center;}
.section1 .title{font-size: 32upx; color: #ffffff; line-height: 1.6em; margin-top: 10upx; }
.section1 .num{font-size: 64upx;color: #ffffff; line-height: 1.6em; font-weight: bold; margin-bottom: 30upx;}
.section1 .want{color: #FFFFFF;font-size: 32upx; border:1px solid #FFFFFF; border-radius: 16upx;
 padding:10upx 40upx;}

.section_title {color: #333333;font-size: 28upx;font-weight: bold;line-height: 2em;}
.section2{margin: 20upx;width: 710upx;}
.section2 .item {
	background: #FFFFFF;
	margin-bottom: 20upx;
	padding: 20upx;
	border-radius: 8upx;
	color: #333333;
	font-size: 28upx;
	line-height: 2em;
}
.section2 .item .flex1{text-align: right;}
.section2 .item .time,.section2 .item .status{color: #999999; font-size: 24upx;}
</style>
