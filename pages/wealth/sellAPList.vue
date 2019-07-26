<template>
	<view class="container">
		<uni-segmented-control class="segmented" :current="current" :values="items" @clickItem="onClickItem" style-type="text"
		 active-color="#CCA366">
		</uni-segmented-control>

		<view class="content">
			<view>
				<view class="list">
					<view class="item" v-for="(temp,index) in list" :key="index" v-show="temp.type=='sell'">
						<!--  v-if="temp.type==='sell'" -->
						<view class="first">{{temp.orderId}}</view>
						<view class="tw">
							<view>{{temp.number}} <text>pcs</text></view>
							<view>
								<!-- 待匹配 -->
								<view v-show="current===0">申请时间: {{temp.time | formatDate(1)}}</view>
								<!-- 待付款 -->
								<view v-show="current===1">匹配时间: {{temp.matchTime | formatDate(1)}}</view>
								<!-- 待确认 -->
								<view v-show="current===2">收款时间: {{temp.payTime | formatDate(1)}}</view>
								<!-- 待评价 -->
								<view v-show="current===3">确认时间: {{temp.confirmTime | formatDate(1)}}</view>
								<view v-show="current!==0">买方会员: {{temp.buyerUsername}}</view>
							</view>
						</view>
						<view class="sum">
							<view>剩余时间：<text class='time'>{{temp.rever | formatLeftDate}}</text></view>
							<view>合计:<text class="money">{{temp.number * 2000 | yuan}}</text>元</view>
						</view>
						<view class="contect">
							<view v-show="current!==0" @click="connect(temp,1)"> 联系会员</view>
							<!--待付款v-show="current===1"-->
							<view v-show="current===2" :data-url="'OrderConfirm?id='+temp.matchId" @click="navTo">查看凭证</view>
							<view v-show="current===2" :data-url="'complaint?id='+temp.id+'&type='+temp.type" @click="navTo">投诉</view>
							<view v-show="current===2" @click="confirmPay(temp.id)">确认收款</view>
							<!--待确认-->
							<view v-show="current===3" :data-url="'GoEvaluate?id='+temp.id" @click="navTo">去评价</view>
							<!--待评价-->
						</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import uniSegmentedControl from "@/components/uni-segmented-control2/uni-segmented-control.vue"
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
				items: [{
						name: '待匹配',
						type: 'match',
						num: 0
					},
					{
						name: '待收款',
						type: 'pay',
						num: 0
					},
					{
						name: '待确认',
						type: 'confirm',
						num: 0
					},
					{
						name: '待评价',
						type: 'evaluate',
						num: 0
					},

				],
				current: 0,
				list: []
			}
		},
		components: {
			uniSegmentedControl
		},
		onShow() {
			this.info('match');
			this.info('pay');
			this.info('confirm');
			this.info('evaluate');
			if (this.current == 0) {
				this.getList('match');
			} else if (this.current == 1) {
				this.getList('pay');
			} else if (this.current == 2) {
				this.getList('confirm');
			} else if (this.current == 3) {
				this.getList('evaluate');
			}
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: 'sellRecord'
			})
		},
		methods: {
			navTo(e) {
				uni.navigateTo({
					url: e.currentTarget.dataset.url
				})
			},

			info(idx) {
				let that = this;
				djRequest({
					url: '/api/order',
					method: 'POST',
					data: {
						start: 0,
						length: 50,
						status: idx,
						type: 'sell'
					},
					success: function(res) {
						let arr = res.data.data.data;
						let ars = [];
						that.items.forEach((item, index) => {
							if (idx === item.type) {
								arr.forEach(temp => {
									if (temp.type === 'sell') {
										ars.push(temp);
									}
								});
								item.num = ars.length;
							}
						});
					},
				})
			},
			/* 联系会员 */
			connect(temp, dist) {
				uni.navigateTo({
					url: 'connectMember?dist=' + dist + '&id=' + temp.id + '&personId=' + temp.buyerMemberId + '&type=' + temp.type
				})
			},
			onClickItem(index) {
				let that = this;
				that.list = [];
				let ars = ['match', 'pay', 'confirm', 'evaluate'];
				if (this.current !== index) {
					this.current = index;
					that.list = [];
					that.getList(ars[index]);
					this.info('match');
					this.info('pay');
					this.info('confirm');
					this.info('evaluate');
				}
			},
			/* 确认收款 */
			confirmPay(id) {
				let that = this;
				uni.showModal({
					content: '确定已收款？',
					success: function(res) {
						if (res.confirm) {
							djRequest({
								url: '/api/order/confirm',
								method: 'POST',
								data: {
									Id: id,
									status: 'success'
								},
								success: function(res) {
									common.TostUtil(res.data.message);
									if (res.data.status === 200) {
										common.balance();
										that.getList('confirm');
										that.info('match');
										that.info('pay');
										that.info('confirm');
										that.info('evaluate');
									}
								}
							})
						}
					}
				})

			},
			//获取数据
			getList(idx) {
				let that = this;
				that.list = [];
				djRequest({
					url: '/api/order',
					method: 'POST',
					data: {
						start: 0,
						length: 50,
						status: idx,
						type: 'sell'
					},
					success: function(res) {
						that.list = [];
						if (res.data.status === 200) {
							if (res.data.data.data.length > 0) {
								let arr = res.data.data.data;
								let time24ms;
								for (let i = 0; i < arr.length; i++) {
									let curOrder = arr[i];
									let orderTime;
									if (idx === 'match') {
										orderTime = Number(curOrder.time) * 1000; //订单时间
									} else if (idx === 'pay') {
										orderTime = Number(curOrder.matchTime) * 1000; //匹配时间
									} else if (idx === 'confirm') {
										orderTime = Number(curOrder.payTime) * 1000; //付款时间
									} else if (idx === 'evaluate') {
										orderTime = Number(curOrder.confirmTime) * 1000 //确认时间
									}
									if (!curOrder.hasOwnProperty("rever")) {
										if (idx === 'match') {
											time24ms = 48 * 3600 * 1000;
										} else {
											time24ms = 24 * 3600 * 1000;
										}
										let orderOffsetTime = (Date.now() - orderTime) % time24ms;
										let orderStart = time24ms - orderOffsetTime;
										curOrder.rever = orderStart;
									}
									/* curOrder.rever -= 1000; */
								}
								that.list = [];
								that.list = arr;
								that.getData(idx);
							}

						}

					}
				})
			},
			getData(idx) {
				let that = this;
				let arrs = that.list;
				if (that.orderTimer != null) {
					clearInterval(that.orderTimer);
				}
				arrs.forEach(item => {
					that.orderTimer = setInterval(function() {
						item.rever -= 1000;
						if (item.rever <= 0) {
							if (idx === 'match') {
								item.rever = 48 * 3600 * 1000;
							} else {
								item.rever = 24 * 3600 * 1000;
							}
						}
					}, 1000)
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
		background: #FFFFFF;
		width: 670upx;
		padding: 20upx;
		margin: 0 20upx 20upx 20upx;
		border-radius: 8upx;
		font-size: 28upx;
		line-height: 2em;
		color: #333333;
	}

	.list .item .first {
		color: #999999;
		border-bottom: 2upx solid #f7f7f7;
	}

	.list .item .date {
		float: right;
	}

	.list .item .time {
		color: #D03C29;
	}

	.contect {
		border-top: 2upx solid #f7f7f7;
		padding-top: 20upx;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.contect>view {
		width: 20%;
		text-align: center;
		padding: 5upx;
		background: #CCA366;
		border-radius: 6upx;
		color: #fff;
		overflow: hidden;
	}

	.contect>view+view {

		margin-left: 20upx;
	}

	.tw {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding: 10upx 0;
	}

	.sum {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.tw>view:first-child {
		width: 160upx;
		margin-right: 60upx;
		font-size: 60upx;
		color: #CCA366;
		text-align: center;
	}

	.tw>view:first-child text {
		font-size: 24upx !important;
		position: relative;
		bottom: 2upx;
	}

	.money {
		font-size: 40upx !important;
		font-weight: 600;
		margin: 0 10upx;
	}
</style>
