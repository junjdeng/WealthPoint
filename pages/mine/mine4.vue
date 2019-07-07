<template>
	<view class="container">
		<view class="list_wrap">
			<view class="list">
				<view class="item flex-start" v-for="(temp,index) in list" :key="index" :data-url="'alipayEdit?id='+temp.id+'&name='+temp.name"
				 @click="navTo">
					<view class="flex1">
						<image src="../../static/images/bg112.jpg"></image>
					</view>
					<view class="flex5">
						<view class="name">支付宝账号</view>
						<view class="num">{{temp.name}}</view>
					</view>
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
				list: []
			}
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: 'addAliPay'
			})
		},
		components: {
			uniIcon
		},
		onShow() {
			this.getList();
		},
		methods: {
			navTo(e) {
				uni.navigateTo({
					url: e.currentTarget.dataset.url
				})
			},
			/* 获取支付宝列表 */
			getList() {
				let that = this;
				djRequest({
					url: '/api/qrcode',
					method: 'GET',
					success: function(res) {
						/* res.data.data.forEach(item=>{
							item.name=item.name.substring(0,3)+'******'+item.name.substring(item.name.length-4);
						}) */
						that.list = res.data.data;
					}
				})
			},
		}
	}
</script>

<style>
	.list_wrap {
		margin: 0 20upx;
		width: 710upx;
		margin-top: 20upx;
	}

	.list .item {
		color: #333333;
		background: #FFFFFF;
		font-size: 32upx;
		line-height: 2em;
		border-radius: 8upx;
		padding: 20rpx;
		margin-bottom: 20upx;
	}

	.list .item .flex1 {
		align-self: flex-start;
		margin-top: 20upx;
	}

	.list .item image {
		width: 80upx;
		height: 80upx;
	}

	.list .item .name {
		color: #333333;
		font-size: 32upx;
		font-weight: bold;
	}

	.list .item .num {
		color: #999999;
		font-size: 26upx;
	}

	.bottomBtn {
		width: 710upx;
		background: #CCA366;
		color: #ffffff;
		border-radius: 8upx;
		margin-top: 80upx;
		font-size: 32upx;
		height: 88upx;
		line-height: 88upx;
		text-align: center;
	}
</style>
