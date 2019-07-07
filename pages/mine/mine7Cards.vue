<template>
	<view class="container">
		<uni-segmented-control class="segmented" :current="current" :values="items" @clickItem="onClickItem" style-type="text"
		 active-color="#CCA366">
		</uni-segmented-control>
		<view class="content">
			<view>
				<view class="list" v-show="current===0">
					<view class="item flex-start" v-for="(temp,index) in arr1" :key="index" v-show="temp.type!=='code'">
						<view class="flex2">
							<image v-show="temp.type==='phone'" :src="icon1"></image>
							<image v-show="temp.type==='name'" :src="icon2"></image>
							<image v-show="temp.type==='unblock'" :src="icon3"></image>
							<image v-show="temp.type==='super_unblock'" :src="icon4"></image>
						</view>
						<view class="flex5">
							<view v-show="temp.type==='phone'" class="name">改手机号卡</view>
							<view v-show="temp.type==='name'" class="name">改名卡</view>
							<view v-show="temp.type==='unblock'" class="name">解封卡</view>
							<view v-show="temp.type==='super_unblock'" class="name">超级解封卡</view>
							<view class="price">拥有者:{{temp.username}}</view>
							<view class="time">获取时间：{{temp.time |formatDate(1)}}</view>
						</view>
					</view>
				</view>
				<view class="list" v-show="current===1">
					<view class="item flex-start" v-for="(temp,index) in arr2" :key="index" v-show="temp.type!=='code'">
						<view class="flex2">
							<image v-show="temp.type==='phone'" :src="icon1"></image>
							<image v-show="temp.type==='name'" :src="icon2"></image>
							<image v-show="temp.type==='unblock'" :src="icon3"></image>
							<image v-show="temp.type==='super_unblock'" :src="icon4"></image>
						</view>
						<view class="flex5">
							<view v-show="temp.type==='phone'" class="name">改手机号卡</view>
							<view v-show="temp.type==='name'" class="name">改名卡</view>
							<view v-show="temp.type==='unblock'" class="name">解封卡</view>
							<view v-show="temp.type==='super_unblock'" class="name">超级解封卡</view>
							<view class="price">使用者:{{temp.fromUsername}}</view>
							<view class="time">使用时间：{{temp.time |formatDate(1)}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue"
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	import common from '../../common/common.js'
	import { config } from '../../common/config.js'
	import { djRequest } from '../../common/request.js'
	export default {
		data() {
			return {
				items: ['待使用', '已使用'],
				current: 0,
				icon1: '/static/images/shop1.png',
				icon2: '/static/images/shop2.png',
				icon3: '/static/images/shop3.png',
				icon4: '/static/images/shop4.png',
				arr1: [],
				arr2: []
			}
		},
		components: {
			uniSegmentedControl
		},
		onShow() {
			let that = this;
			if (that.current === 0) {
				that.hasGet();
			} else {
				that.hasUse();
			}
		},
		methods: {
			onClickItem(index) {
				let that = this;
				if (that.current !== index) {
					that.current = index;
					if (that.current === 1) {
						that.hasUse();
					} else if (that.current === 0) {
						that.hasGet();
					}
				}
			},
			//已有
			hasGet() {
				let that = this;
				djRequest({
					url: '/api/gift/receive',
					method: 'POST',
					data: {
						start: 0,
						length: 100
					},
					success: function(res) {
						if (res.data.status === 200) {
							that.arr1 = res.data.data.data;
						}
					}
				})
			},
			//已使用
			hasUse() {
				let that = this;
				djRequest({
					url: '/api/gift/usage',
					method: 'POST',
					data: {
						start: 0,
						length: 100
					},
					success: function(res) {
						if (res.data.status === 200) {
							that.arr2 = res.data.data.data;
						}
					}
				})
			}
		}
	}
</script>

<style>
	.segmented {
		background: #FFFFFF;
		width: 750upx;
		height: 68upx;
	}

	.list {
		margin-top: 20upx;
	}

	.list .item {
		color: #333333;
		background: #FFFFFF;
		width: 670upx;
		padding: 20upx;
		margin: 0 20upx 20upx 20upx;
		border-radius: 8upx;
		font-size: 32upx;
		line-height: 2em;
		padding: 20rpx;
		margin-bottom: 20upx;
	}

	.list .item image {
		width: 160upx;
		height: 160upx;
		border-radius: 8upx;
	}

	.list .item .price {
		color: #D03C29;
	}

	.list .item .time {
		color: #999999;
		font-size: 24upx;
	}
</style>
