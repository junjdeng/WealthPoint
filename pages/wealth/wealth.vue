<template>
	<view class="container">
		<view class="section section1" style="background-image: url('../../static/images/wealthbg.jpg');">
			<view class="flex-start">
				<view class="flex1">
					<view class="title">总资产AP</view>
					<view class="num wpgold">{{(parseFloat(balance.ecash) + parseFloat(balance.bonus)+parseFloat(balance.harvestNumber)+parseFloat(balance.orderNumber)).toFixed(4)}}</view>
				</view>
				<view class="flex1 count">
					<view>承租AP总数<span>{{harvest.buyOrderTotal}}</span></view>
					<view>已退租AP数<span>{{harvest.sellOrderTotal}}</span></view>
					<view>待退租AP数<span>{{(parseFloat(balance.ecash) + parseFloat(balance.bonus)).toFixed(4)}}</span></view>
				</view>
			</view>
			
			<view class="flex-start total_card">
				<view class="flex2" data-url="wallet?type=1" @tap="navTo">
					<view class="num">{{parseFloat(balance.ecash).toFixed(4)}}</view>
					<view class="title">希望钱包</view>
				</view>
				<view class="flex1">
					<view class="line"></view>
				</view>
				<view class="flex2" data-url="wallet?type=2" @tap="navTo">
					<view class="num">{{parseFloat(balance.bonus).toFixed(4)}}</view>
					<view class="title">奖金钱包</view>
				</view>
				<view class="flex1">
					<view class="line"></view>
				</view>
				<view class="flex2" data-url="wallet1" @tap="navTo">
					<view class="num">{{parseFloat(balance.temporary).toFixed(4)}}</view>
					<view class="title">理财钱包</view>
				</view>
			</view>
		</view>
	
		<view class="section section2">
			<view class="section_title">我的收益<span>收益记录<uni-icon type="forward" class="forward" size="24" color="#999999"></uni-icon></span></span></view>
			<view class="flex-start condition_card">
				<view class="flex1">
					<view>总收益</view>
					<view class="wpred">{{(parseFloat(harvest.growingSeedTotal)+parseFloat(harvest.rewardSeedTotal)).toFixed(4)}}</view>
				</view>
				<view class="flex1">
					<view>今日收益</view>
					<view class="wpred">0.00</view>
				</view>
			</view>
			
			<view class="want_wrap">
				<span class="want" data-url="buyAP" @tap="navTo">我要承租</span>
			</view>
		</view>
		
		<view class="section section3">
		   <view class="flex-start">
				<view class="flex1" data-url="buyAPList" @tap="navTo">
					<view><image src="../../static/images/wealth2.jpg"></image></view>
					<view class="title">承租AP</view>
				</view>
				<view class="flex1" data-url="sellAPList" @tap="navTo">
					<view><image src="../../static/images/wealth1.jpg"></image></view>
					<view class="title">退租AP</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	import {djRequest} from '../../common/request.js'
	import {config} from '../../common/config.js'
	import common from '../../common/common.js'
	
	export default {
		data() {
			return {
				balance:{},
				harvest:{},
			}
		},
		components: {
			uniIcon
		},
		onLoad() {			
			var _this = this;		
			djRequest({
				url:'/api/statistics/index',
				method:'GET',
				success:function(res){
					if(res.data.status===200){
						_this.harvest = res.data.data;
					}
				}
			})				
		},
		onShow() {
			var _this = this;
			common.getBalance(function(res){
				_this.balance = res.data.data;
			})			
		},
		methods: {
			navTo(e) {
				uni.navigateTo({
					url:e.currentTarget.dataset.url
				})
			},
		}
	}
</script>

<style>
.section1{padding: 20upx; width: 670upx;  background-size: 100% 100%;}
.section1 .title{font-size: 32upx; color: #ffffff; line-height: 1.6em; margin-top: 10upx;; text-align: left;}
.section1 .num{font-size: 64upx;color: #ffffff; line-height: 1.6em; font-weight: 400;text-align: left;}

.section1 .total_card{background:rgba(255,255,255,0.4); 
border-radius: 16upx; margin-top: 10upx; padding: 30upx 5upx;text-align: center;}
.section1 .total_card .num{font-size: 32upx; color: #333333; font-weight: bold;text-align: center;}
.section1 .total_card .title{font-size: 28upx; color: #666666;text-align: center;}
.section1 .total_card .line{background:#CCA366; display: inline-block; width: 1px; height: 50upx;}

.section1 .count{font-size: 24upx;color: #ffffff; line-height: 2em; padding-left: 100upx; font-weight: 500;}
.section1 .count span{float: right; padding-right: 40upx;}

.section_title {
		color: #333333;
		font-size: 32upx;
		font-weight: bold;
	}

.section2{
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
.section2 .condition_card .wpred{
	font-size: 40upx;
}

.want_wrap{text-align: center; margin-top: 50upx; margin-bottom: 10upx;}
.want_wrap .want{color: #CCA366;
		font-size: 32upx;
		font-weight: 400; border:1px solid #CCA366; border-radius: 8upx; padding:10upx 40upx;}

.section_title span{float: right; color: #999999; font-size: 24upx;}
.section_title span .forward{position: relative;}

.section3{text-align: center; padding: 40upx 0;}
.section3 image{width: 50upx; height: 50upx;}
.section3 .title{color: #333333;
	font-size: 28upx;
	line-height: 2em;}
</style>
