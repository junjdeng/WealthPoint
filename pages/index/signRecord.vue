<template>
	<view class="content">
		<view class="title">
			<view>签到时间</view>
			<view>云积分</view>
		</view>
		<view class="list" v-if="list.length>0" v-for="(item,index) in list" :key="index">
			<view>{{item.time | formatDate(2)}}</view>
			<view>+{{item.integral}}</view>
		</view>
		<view class="title"  v-if="list.length>0">
			<view>合计</view>
			<view style="font-size:40upx;color:#D03C29;">{{total}}</view>
		</view>
	</view>
</template>

<script>
	import common from '../../common/common.js'
	import {
		config
	} from '../../common/config.js'
	import { djRequest } from '../../common/request.js'
	export default{
		data () {
			return {
				list:[],
				total:0,
				start:0,
				length:500,
				isMore:true,
			}
		},
		/* onPullDownRefresh: function() {	
			this.start = 0;
			this.list = [];
			this.record();
		},
		onReachBottom: function() {		
			if (this.isMore) {
				this.record();
			}
		}, */
		onShow(){
			this.record();
		},
		methods:{
			record () {
				let that = this;
				djRequest({
					url:'/api/sign/sign_list',
					method:'POST',
					data:{
						start: 0,
						length: 500
					},
					success:function(res){
						/* uni.stopPullDownRefresh();
						if (res.data.data.data.length < that.length) {
							that.isMore = false;
						}else{
							that.isMore = true;
						} */
						/* that.list = that.list.concat(res.data.data.data);
						that.start = that.list.length; */
						that.list=res.data.data.data;
						that.list.forEach(item=>{
							that.total+=Number(item.integral)
						})
					}
				})
			}
		}
	}
</script>

<style>
	.content{
		background: #fff;
	}
	.more{text-align: center; color: #999999; height: 40upx; 
	line-height: 40upx; font-size: 28upx; padding: 20upx 0;margin-top:20upx;}
	.title,.list{
		width:750upx;
		display:flex;
		justify-content: space-between;
		align-items:center;
	}
	.title>view,.list>view{
		width:375upx;
		text-align: center;
		padding:20upx 0;
		font-size: 28upx;
		color:#666;
	}
	.title:first-child{
		border-bottom:2upx solid #f7f7f7;
	}
	.list{
		border-bottom:2upx solid #f7f7f7;
	}
</style>
