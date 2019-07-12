<template>
	<view class="main" >
		<!-- copy -->
		<view class="">
			<view class="title">{{info.title}}</view>
			<view class="sendTime">发布时间：{{info.time | formatDate(1)}}</view>
			<view class="content">{{info.content}}</view>
		</view>
	</view>
</template>
<script>
	import common from '../../common/common.js'
	import {
		config
	} from '../../common/config.js'
	import { djRequest } from '../../common/request.js'
	export default {
		data() {
			return {
				info: {}
			}
		},
		onLoad(options){
			let that = this;
			djRequest({
				url:'/api/news/show',
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
	.title{
    text-align: center;
  }
  body,html{
	  width:100%;
	  height:100%;
	  background: #fff;
  }
  .main{
	  width:100%;
	  height:100%;
	  background: #fff;
	  padding:20upx;
	  box-sizing:border-box;
  }
  .title{
    font-size:36upx;
    font-weight:500;
    color:#333;
    margin-bottom:10upx;
  }
  .sendTime{
    font-size:24upx;
    color:#ccc;
	box-sizing:border-box;
  }
  .content{
    font-size:32upx;
    color:#666;
    width:100%;
	box-sizing:border-box;
    word-wrap: break-word;
    word-break:break-all;
    text-indent:2em;
    line-height:1.5;
  }
</style>
