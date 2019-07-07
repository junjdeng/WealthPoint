<template>
	<view class="content">
		<view>
			<view class="lf">退租</view>
			<view class="rt">
				<span class="fw">{{obj.number}}</span>
				<span class="sm">AP</span>
			</view>
		</view>
		<view class="gray">
			<view>订单编号</view>
			<view>{{obj.orderId}}</view>
		</view>
		<view class="gray">
			<view>AP数量</view>
			<view>{{obj.number}}</view>
		</view>
		<view class="gray">
			<view>下单时间</view>
			<view>{{obj.time | formatDate(1)}}</view>
		</view>
		<view class="gray">
			<view>匹配时间</view>
			<view>{{obj.matchTime | formatDate(1)}}</view>
		</view>
		<view class="gray">
			<view>收款时间</view>
			<view>{{obj.payTime | formatDate(1)}}</view>
		</view>
		<view class="gray">
			<view>完成时间</view>
			<view>{{obj.finishTime | formatDate(1)}}</view>
		</view>
		<view class="gray">
			<view>打款者</view>
			<view>{{obj.buyerUsername}}</view>
		</view>
		<view class="gray">
			<view>获得评分</view>
			<view>+5</view>
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
				obj: {},
				grow: 0,
				revard: null,
				id: 0
			}
		},
		onLoad: function(options) {
			this.id = options.id
		},
		methods: {
			info() {
				let that = this;
				djRequest({
					url: '/api/order/show',
					data: {
						Id: Number(that.id),
						type: 'sell'
					},
					method: 'GET',
					success: function(res) {
						if (res.data.status === 200) {
							that.obj = res.data.data;
						}
					}
				})
			}
		},
		onShow:function() {
			let that = this;
				that.info();
		}
	}
</script>

<style>
	.content {
		width: 100%;
		padding: 10upx 20upx;
		margin: 2upx auto;
		background: #fff;
		box-sizing: border-box;
	}

	.content>view {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.lf {
		font-size: 32upx;
		padding: 20upx 0;
	}

	.fw {
		font-weight: bold;
		font-size: 40upx !important;
	}

	.gray {
		color: #666;
		font-size: 28upx;
		padding: 20upx 0;
		border-top: 2upx solid #f7f7f7;
	}

	.sm {
		font-size: 20upx !important;
		margin-left: 10upx;
	}

	.red {
		color: #e4393c;
	}
</style>
