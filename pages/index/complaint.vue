<template>
	<view class="content">
		<view class="item font14" v-for="(item,index) in dataList" :key="index" :data-url="'complaintDetail?id='+item.id" @click="navTo">
			<view class="wrap-row"><text style="color:#333;">{{item.content}}</text> <text>{{item.time|formatDate(1)}}</text></view>
		</view>
	</view>
</template>

<script>
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
				dataList: []
			}
		},
		onLoad(options) {
			let that = this;
			djRequest({
				url: '/api/complaint',
				data: {
					start: 0,
					length: 500
				},
				method: 'POST',
				success: function(res) {
					that.dataList = res.data.data.data;
				}
			})
		},
		methods: {
			navTo(e) {
				uni.navigateTo({
					url: e.currentTarget.dataset.url
				})
			}
		}
	}
</script>

<style>
	.content {
		width: 750upx;
		box-sizing: border-box;
	}

	.item {
		width: 750upx;
		background: #fff;
		height: 100upx;
		padding: 0 20upx;
		box-sizing: border-box !important;
		line-height: 100upx;
		border-bottom: 1px solid #f7f7f7;
	}

	.font14 {
		font-size: 28upx !important;
	}
	body,
	html {
		width: 750upx;
		height: 100%;
		background: #fff;
		box-sizing: border-box;
	}

	.wrap-row {
		width: 710upx;
		word-wrap: break-word;
		word-break: break-all;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		margin: 0 auto;
		position: relative;
		display: flex;
		justify-content: space-between;
	}

	.wrap-row>text:nth-child(1) {
		color: rgb(51, 51, 51);
		display: block;
		overflow: hidden;
		width: 550upx;
		text-overflow: ellipsis;
	}

	.wrap-row>text:nth-child(2) {
		color: #999;
		font-size: 20upx;
	}
</style>
