<template>
	<view class="wrap">
		<textarea placeholder="请输入您的意见" v-model.trim="text"></textarea>
		<view class="bottomBtn"  @tap="submit">提交</view>
	</view>
</template>
<script>
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	import common from '../../common/common.js'
	import { config } from '../../common/config.js'
	import { djRequest } from '../../common/request.js'
	export default {
		components: {
			uniIcon
		},
		data() {
			return {
				type:"",
				text:''
			}
		},
		methods: {
			submit() {	
				let that = this;
				if(!common.isNotNull(that.text,'输入')) return;
				djRequest({
					url:'/api/message/send',
					data:{
						content:that.text
					},
					method:'POST',
					success:function(res){
						if(res.data.status===200){
							that.text="";
							common.TostUtil(res.data.message);
							setTimeout(function(){
								uni.switchTab({
									url:'index'
								})
							},1000)
							
						}
					}
				})
			}
		}
	}
</script>

<style>
	textarea {
		background: #ffffff;
		margin: 20upx;
		width: 670upx;
		padding: 20upx;
		font-size: 28upx;
	}

	.bottomBtn {
		text-align: center;
		font-size: 30upx;
		line-height: 3em;
		color: #ffffff;
		margin-top: 250upx;
		background: #CCA366;
		margin: 0 20upx;
		width: 710upx;
		border-radius: 8upx;
	}
	.pop_wrap{
		text-align: center;
	}
	.pop_wrap .text{font-size: 28upx; color: #999999; padding: 20upx 0;}
	.pop_wrap .close{background: #CCA366; font-size: 32upx; line-height: 1.6; border-radius: 4upx; 
	color: #ffffff; margin-top: 40upx; padding: 10upx 0;}
</style>
