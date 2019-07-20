<template>
	<view class="box">
		<view class="ul-main">
			<view>
				<view><span>会员名：</span><span>{{record.username}}</span></view>
				<view><span>支付时间：</span><span>{{record.time | formatDate(1)}}</span></view>
				<view><span>订单状态:</span>
					<span v-if="record.status==='wait'">待确认</span>
					<span v-if="record.status==='yes'">支付成功</span>
					<span v-if="record.status==='no'">支付未通过</span>
				</view>
				<view>
					<span>支付凭证：</span>
					<view class="img">
						<image :src="'http://api.wealth-point.com'+record.images"></image>
					</view>
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
				record: {},
				id: 0
			}
		},
		onLoad(options) {
			this.id = options.id;
			this.getData();
		},
		methods: {
			getData() {
				let that = this;
				djRequest({
					url: '/api/payment/show',
					data: {
						Id: Number(that.id),
						type: 'order'
					},
					method: 'GET',
					success: function(res) {
						if (res.data.status === 200) {
							that.record = res.data.data;
						}
					}
				})
			}
		}
	}
</script>
<style scoped>
	body,
	html {
		width: 100%;
		height: 100%;
		position: relative;
		background: #fff !important;
	}

	.box {
		width: 100%;
		height: 100%;
		background: #fff;

		box-sizing: border-box;
	}

	.ul-main {
		padding: 20upx 20upx;
		font-size: 28upx;
		color: #666;
	}

	.ul-main>view>view {
		padding: 20upx 0;
	}

	.ul-main>view>view>span:first-child {
		display: inline-block;
		width: 200upx;
	}

	.img {
		width: 100%;
		height: 800upx;
		overflow: hidden;
		margin-top: 40upx;
	}

	.img image {
		width: 100%;
		height: 100%;
	}
</style>
