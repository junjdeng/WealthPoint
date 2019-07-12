<template>
	<view class="container">
		<view class="section1">
			<view class="title">AP数量</view>
			<view class="num wpgold">{{wallet}}</view>
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
				wallet:0
			}
		},
		components: {
			uniIcon
		},
		onLoad() {
			
		},
		onShow(){
			let that = this;
			common.balance();
			that.wallets();
		},
		methods: {
			/* 当前钱包资产 */
			
			wallets () {
				let that = this;
				that.wallet=Number(config.balance.temporary).toFixed(4);
					
			},
		}
	}
</script>

<style>
.section1{width: 750upx; padding: 80upx 0; background: linear-gradient(#CEA15A,#F3CB84);text-align: center;}
.section1 .title{font-size: 32upx; color: #ffffff; line-height: 1.6em; margin-top: 10upx; }
.section1 .num{font-size: 64upx;color: #ffffff; line-height: 1.6em; font-weight: bold; margin-bottom: 30upx;}
.section1 .want{color: #FFFFFF;font-size: 32upx; border:1px solid #FFFFFF; border-radius: 16upx;
 padding:10upx 40upx;}

.section_title {color: #333333;font-size: 28upx;font-weight: bold;line-height: 2em;}
</style>
