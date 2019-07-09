<template>
	<view class="section2">
		<view class="wt" v-if="type==1">
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
				listWallet: [],
				listBonus: []
			}
		},
		components: {
			uniIcon
		},
		onShow() {
			let that = this;
			if (that.type == 2) { //奖金明细
			djRequest({
				url: '/api/recommend',
				method: 'POST',
				data: {
					start: 0,
					length: 500
				},
				success: function(res) {
					console.log(res)
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
		onLoad(options) {
			this.type = options.type
			console.log(options)
			if (options.type == 1) {
				uni.setNavigationBarTitle({
					title: '希望钱包明细'
				});
			} else if (options.type == 2) {
				uni.setNavigationBarTitle({
					title: '奖金钱包明细'
				});
			}
		},
		methods:{
			hope(){
				
			},
			bonus(){
				let that =this;
				
			}
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
