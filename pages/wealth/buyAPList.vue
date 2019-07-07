<template>
	<view class="container">
		<uni-segmented-control class="segmented" :current="current" :values="items" @clickItem="onClickItem" style-type="text"
		 active-color="#CCA366">
		</uni-segmented-control>

		<view class="content">
			<view>
				<view class="list">
					<view class="item" v-for="(temp,index) in list" :key="index" v-if="temp.type==='buy'">
						<view class="first">{{temp.orderId}}</view>
						<div class="tw">
							<view>{{temp.number}} <text>AP</text></view>
							<view>
								<!-- 待匹配 -->
								<view v-show="current===0">申请时间: {{temp.time | formatDate(1)}}</view>
								<!-- 待付款 -->
								<view v-show="current===1">匹配时间: {{temp.matchTime | formatDate(1)}}</view>
								<!-- 待确认 -->
								<view v-show="current===2">付款时间: {{temp.payTime | formatDate(1)}}</view>
								<!-- 待评价 -->
								<view v-show="current===3">确认时间: {{temp.confirmTime | formatDate(1)}}</view>
								<view v-show="current!==0">卖方会员: {{temp.sellerUsername}}</view>
							</view>
						</div>
						<view class="sum">
							<view>剩余时间：<text class='time'>{{temp.rever | formatLeftDate}}</text></view>
							<view>合计: <text class="money">{{temp.number * 2000 | yuan}}</text>元</view>
						</view>
						

						<view class="contect">
							<view @click="connect(temp,2)" v-show="current!==0"> 联系会员</view>
							<!--v-show="current!==0">  -->
							<view v-show="current===1">上传凭证</view>
							<!--待付款v-show="current===1"-->
							<view v-show="current===2">查看凭证</view>
							<!--待确认-->
							<view v-show="current===3">去评价</view>
							<!--待评价-->
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue"
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
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
				items: ['待匹配', '待付款', '待确认', '待评价'],
				current: 0,
				list: []
			}
		},
		onNavigationBarButtonTap(e){
			uni.navigateTo({
				url:'buyRecord'
			})
		},
		components: {
			uniSegmentedControl,
			uniLoadMore
		},
		created() {
			this.getList('match')
		},
		methods: {
			/* 联系会员 */
			connect(temp, dist) {
				uni.navigateTo({
					url: 'connectMember?dist=' + dist + '&id=' + temp.id + '&personId=' + temp.sellerMemberId + '&type=' + temp.type
				})
			},
			onClickItem(index) {
				let that = this;
				let ars = ['match', 'pay', 'confirm', 'evaluate'];
				if (this.current !== index) {
					this.current = index;
					that.getList(ars[index]);
				}
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
						type: 'buy'
					},
					success: function(res) {
						if (res.data.status === 200) {
							let arr = res.data.data.data;
							let time24ms = 24 * 3600 * 1000;
							if (that.orderTimer != null) {
								clearInterval(that.orderTimer);
							}
							that.orderTimer = setInterval(() => {
								for (let i = 0; i < arr.length; i++) {
									let curOrder = arr[i];
									let orderTime
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
										let orderOffsetTime = (Date.now() - orderTime) % time24ms;
										let orderStart = time24ms - orderOffsetTime;
										curOrder.rever = orderStart;
									}
									curOrder.rever -= 1000;
									if (curOrder.rever <= 0) {
										curOrder.rever = time24ms;
									}
								}
								that.list = arr;

							}, 1000)
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
		display: flex;
		justify-content: space-around;
		align-items: center;
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
		border-bottom:2upx solid #f7f7f7;
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
	.tw{
		display:flex;
		justify-content:flex-start;
		align-items:center;
		padding:10upx 0;
	}
	.sum{
		display:flex;
		justify-content:space-between;
		align-items:center;
	}
	.tw>view:first-child{
		width:160upx;
		margin-right:60upx;
		font-size:60upx ;
		color:#CCA366;
		text-align: center;
	}
	.tw>view:first-child text{
		font-size: 24upx!important;
		position:relative;
		bottom:2upx;
	}
	.money{
		font-size: 40upx!important;
		font-weight: 600;
		margin:0 10upx;
	}
</style>
