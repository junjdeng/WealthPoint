<template>
	<view class="content">
		<view class="item" :data-url="'sellDetail?id='+item.id" v-for="(item,index) in list" :key="index"  v-show="item.type==='sell'"  @tap="navTo">
			<view class="lf">
				<view class="lf-top">卖出云果</view>
				<view class="lf-time">{{item.finishTime|formatDate(1)}}</view>
			</view>
			<view class="rt">
				<view class="num">+{{item.number}}</view>
				<view class="shape"></view>
			</view>
		</view>
		<view class="more">{{isMore ? '上拉加载更多' : '暂无更多数据'}}</view>
	</view>
</template>

<script>
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
				list:[],
				start:0,
				length:30,
				isMore:true,
			}
		},
		onPullDownRefresh: function() {	
			this.start = 0;
			this.list = [];
			this.getList();
		},
		onReachBottom: function() {		
			if (this.isMore) {
				this.getList();
			}
		},
		methods: {
			getList() {
				let that = this;
				djRequest({
					url: '/api/order',
					data:{
						start: that.start,
						length: that.length,
						status: 'finish',
						type: 'sell'
					},
					success:function(res){
						uni.stopPullDownRefresh();
						if (res.data.data.data.length < that.length/2) {
							that.isMore = false;
						}else{
							that.isMore = true;
						}
						that.list = that.list.concat(res.data.data.data);
						that.start = that.list.length;
					}
					
				})
			},
			navTo(e) {
				uni.navigateTo({
					url:e.currentTarget.dataset.url
				})
			},
		},
		created() {
			this.getList();
		}
	}
</script>

<style>
	.more{text-align: center; color: #999999; height: 40upx; 
	line-height: 40upx; font-size: 28upx; padding: 20upx 0;margin-top:20upx;}
	.item {
		color: #333333;
		background: #fff;
		font-size: 32upx;
		line-height: 1.5em;
		padding: 10rpx 20upx;
		display: flex;
		justify-content: space-between;
		width: 100%;
		box-sizing: border-box;
		border-bottom: 1px solid #E6E6E6;
	}

	.item .lf {
		display: flex;
		-webkit-box-orient: vertical;
		flex-direction: column;
	}

	.lf-top {
		font-size: 28upx;
	}

	.lf-time {
		font-size: 20upx;
	}

	.rt {
		font-size: 28upx;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.content {
		padding-top: 4upx;
	}

	.shape {
		width: 20upx;
		height: 20upx;
		border: 2upx solid #333;
		transform: rotateZ(-45deg);
		border-left: none;
		border-top: none;
	}
</style>
