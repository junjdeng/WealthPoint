<template>
	<view class="list">
		<view class="item">
			<view class="flex-start">
				<view class="title ellipsis flex5">首尔FC去年的表现很好去年的表现很好，但是今但是今但是今年表</view>
				<span class="time flex1">11-20</span>
			</view>
			<view class="content ellipsis2">首尔FC去年的表现很好，但是今年表现却不如人意，导致这个 原因的背后是什么呢？ </view>
		</view>
		
		<view class="item">
			<view class="flex-start">
				<view class="title ellipsis flex5">首尔FC去年的表现很好去年的表现很好，但是今但是今但是今年表</view>
				<span class="time flex1">11-20</span>
			</view>
			<view class="content ellipsis2">首尔FC去年的表现很好，但是今年表现却不如人意，导致这个 原因的背后是什么呢？ </view>
		</view>
			
	</view>
</template>

<script>
	import {djRequest} from '../../common/request.js'
	
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			djRequest({
				url:'/api/news',
				data:{'start': 0,'length': 10},
				success:function(res) {
					console.log(res);
				}
			})				
		},
		methods: {
			
		}
	}
</script>

<style>
	.item{background: #ffffff; padding: 10upx 20upx; margin-top: 20upx;}
	.item .title{font-size: 28upx; color: #333333; line-height: 2em;}
	.item .content{font-size: 24upx; color: #999999; line-height: 1.6em;}
	.item .time{font-size: 28upx; color: #999999; line-height: 1.6em; text-align: right;}
</style>
