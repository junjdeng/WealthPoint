<template>
	<view class="contain">
		<view class="doflex" style="color:#333;font-weight:500;">留言信息:</view>
		<view class="doflex">时间：{{info.time|formatDate(1)}}</view>
		<view  class="wrap-row doflex">内容： <text class="color2">{{info.content}}</text> </view>
		<view v-if="info.reply!==''">
		  <view class="doflex" style="color:#333;font-weight:500;">回复信息:</view>
		  <view class="doflex" >时间：{{info.replyTime |formatDate(1)}}</view>
		  <view class=" wrap-row doflex"> 内容： <text class="color-red-flex">{{info.reply}}</text> </view>
		</view>
		<view class="doflex" v-else >
		  暂无回复
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
		data(){
			return {
				 info:{}
			}
		},
		onLoad(options){
			let that = this;
			djRequest({
				url:'/api/message/show',
				method:'GET',
				data:{
					Id:options.id
				},
				success:function(res){
					that.info=res.data.data;
				}
			})
		}
	}
</script>

<style>
	.contain{
		box-sizing: border-box;
		width:710upx;
		margin:0 auto;
	}
	.padding-10{
    padding: 20upx 0;
    border-bottom:1px solid #f7f7f7;
	box-sizing: border-box;
  }
	body,html{
	  width:750upx;
	  height:100%;
	  background: #fff;
	  box-sizing: border-box;
  }
  .color-and-padding {
    color: #999;
    margin: 20upx 0;
	box-sizing: border-box;
  }
  .doflex{
	  font-size: 32upx;
	  color:#666;
	  box-sizing: border-box;
	  border-bottom:2upx solid #f7f7f7;
	  padding:20upx 0;
  }
  .color2{
	  font-size: 28upx;
	  color:#333;
  }
  .color-red-flex{
	  color:#ff3333;
	  box-sizing: border-box;
  }
</style>
