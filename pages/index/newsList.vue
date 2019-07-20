<template>
	<view class="list">
		<view class="item" v-for="item in list" :key="item.id" :data-url="'newDetail?id='+item.id" @click="navTo">
			<view class="flex-between top">
				<view class="title  flex5">{{item.title}}</view>
				<view class="time flex1" >{{item.time | formatDate(4)}}</view>
			</view>
			<view class="content ellipsis2">{{item.content}}</view>
		</view>
		<view class="more">暂无更多公告</view>			
	</view>
</template>

<script>
	import {djRequest} from '../../common/request.js'
	import common from '../../common/common.js'
	import {
		config
	} from '../../common/config.js'
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
					if (res.data.status == 200) {
						_this.list = res.data.data.data;
					}
				}
			})				
		},
		methods: {
			navTo(e) {
				uni.navigateTo({
					url:e.currentTarget.dataset.url
				})
			},
		}
	}
</script>

<style>
	.item{background: #ffffff; padding: 10upx 20upx; margin-top: 20upx;}
	.item .title{font-size: 28upx; color: #333333; width:70%;}
	.item .content{font-size: 24upx; color: #999999;text-indent:2em; line-height: 1.6em;}
	.item .time{font-size: 24upx; color: #999999; line-height: 1.6em;  text-align: right;}
	.more{font-size: 24upx; text-align: center; color: #888888; margin-top: 20upx;}
	.top{
		align-items:flex-start!important;
	}
</style>
