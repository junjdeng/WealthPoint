<template>
	<view class="wrap">
		<textarea placeholder="请输入您的意见" v-model.trim="text"></textarea>
		<view class="bottomBtn"  @tap="submit">提交</view>
		<uni-popup :show="showPop" position="middle" mode="fixed" @hidePopup="hidePop">
			<view class="pop_wrap">
				<uni-icon type="checkbox-filled" class="forward" size="56" color="#CCA366"></uni-icon>
				<view>提交成功</view>
				<view class="text">您的意见已经收到，我们会及时跟进反馈</view>
				<view class="close" >返回</view>
			</view>
		</uni-popup>	
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	import common from '../../common/common.js'
	import { config } from '../../common/config.js'
	import { djRequest } from '../../common/request.js'

	export default {
		components: {
			uniIcon,
			uniPopup
		},
		data() {
			return {
				showPop: false,
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
							that.showPop=true;
						}
					}
				})
			},
			hidePop(){
				uni.switchTab({
					url:'index'
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
