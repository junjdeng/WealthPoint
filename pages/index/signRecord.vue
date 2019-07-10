<template>
	<view class="content">
		<view class="title">
			<view>签到时间</view>
			<view>获取积分</view>
		</view>
		<view class="list" v-for="(item,index) in list" :key="index">
			<view>{{item.time | formatDate(2)}}</view>
			<view>{{item.integral}}</view>
		</view>
		<view class="title">
			<view>合计</view>
			<view>{{total}}</view>
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
				total:0
			}
		},
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
						start:0,
						length:50
					},
					success:function(res){
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
</style>
