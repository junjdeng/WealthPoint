<template>
	<view class="list">
		<view class="item" v-for="item in list" :key="item.id">
			<view class="flex-start">
				<view class="title ellipsis flex5">{{item.title}}</view>
				<span class="time flex1">{{item.time | dateTimeFormat('MM-dd')}}</span>
			</view>
			<view class="content ellipsis2">{{item.content}}</view>
		</view>
		<view class="more">暂无更多公告</view>			
	</view>
</template>

<script>
	import {djRequest} from '../../common/request.js'
	import common from '../../common/common.js'
	
	export default {
		data() {
			return {
			   list:[],	
			}
		},
		onLoad() {
			var _this = this;
			djRequest({
				url:'/api/news',
				data:{'start': 0,'length': 10},
				success:function(res) {
					console.log(res);
					if (res.data.status == 200) {
						_this.list = res.data.data.data;
					}
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
	.more{font-size: 24upx; text-align: center; color: #888888; margin-top: 20upx;}
</style>
