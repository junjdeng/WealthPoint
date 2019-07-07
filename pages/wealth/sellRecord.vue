<template>
	<view class="content">
		<view class="item" :data-url="'sellDetail?id='+item.id" v-for="(item,index) in list" :key="index"  v-show="item.type==='sell'"  @tap="navTo">
			<view class="lf">
				<view class="lf-top">退租AP</view>
				<view class="lf-time">{{item.finishTime|formatDate(1)}}</view>
			</view>
			<view class="rt">
				<view class="num">+{{item.number}}</view>
				<view class="shape"></view>
			</view>
		</view>
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
				list:[]
			}
		},
		methods: {
			getList() {
				let that = this;
				djRequest({
					url: '/api/order',
					data:{
						start: 0,
						length: 200,
						status: 'finish',
						type: 'sell'
					},
					success:function(res){
						that.list = res.data.data.data;
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
