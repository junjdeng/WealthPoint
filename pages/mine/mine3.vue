<template>
	<view class="container">
		<view class="list_wrap">
			<view class="list">
				<view class="item flex-start" v-for="(item,index) in list" :key="index" :data-url="'reviseBank?id='+item.id"  @click="navTo">
					<view class="flex1">
						<image src="../../static/images/bank1.png"></image>
					</view>
					<view class="flex5">
						<view class="name">{{item.bankName}}</view>
						<view class="type">借记卡</view>
						<view class="num">{{item.bankNumber}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	import common from '../../common/common.js'
	import {config} from '../../common/config.js'	
	import {djRequest} from '../../common/request.js'
	export default {
		data() {
			return {
				list:[]
			}
		},
		created(){
		
		},
		components: {
			uniIcon
		},
		onShow(){
			let that = this;
			that.bankList();
		},
		methods: {
			navTo(e) {
				uni.navigateTo({
					url:e.currentTarget.dataset.url
				})
			},
			onNavigationBarButtonTap(e) {
				uni.navigateTo({
					url: 'mine3Addbank'
				})
			},
			bankList(){
				let that = this;
				
				djRequest({
					url:'/api/bank',
					method:'GET',
					success:function(res){
						let arr = res.data.data;
						if(arr.length>0){
							arr.forEach(item=>{
							item.bankNumber=item.bankNumber.substring(0,4)+'******'+item.bankNumber.substring(item.bankNumber.length-4);
						})
						that.list = arr;
						}
						
					}
				})
			}
		}
	}
</script>

<style>
	.list_wrap{margin:0 20upx; width: 710upx; margin-top: 20upx;}
	.list .item{color: #333333; background: #FFFFFF; font-size: 32upx; line-height: 2em; border-radius: 8upx; padding: 20rpx; margin-bottom: 20upx;}
	.list .item .flex1{align-self: flex-start; margin-top: 20upx;}
	.list .item image{width: 80upx; height: 80upx;}
	.list .item .name{color: #333333; font-size: 32upx;}
	.list .item .type{color: #999999; font-size: 26upx;}
	.list .item .num{color: #333333; font-size: 28upx;}
	.bottomBtn{width: 710upx;  background: #CCA366; color: #ffffff; border-radius: 8upx; margin-top: 80upx;
 font-size: 32upx; height: 88upx; line-height: 88upx; text-align: center;}
</style>
