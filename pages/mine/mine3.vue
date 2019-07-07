<template>
	<view class="container">
		<view class="list_wrap">
			<view class="list">
				<view class="item flex-start" v-for="item in lists" :key="item.id"  @tap="navTo('mine3Addbank?id='+item.id)">
					<view class="flex1">
						<image src="../../static/images/bg112.jpg"></image>
					</view>
					<view class="flex5">
						<view class="name">{{item.bankName}}</view>
						<view class="type">借记卡</view>
						<view class="num">{{item.bankNumber}}</view>
					</view>
				</view>	
			</view>
			
			<view class="bottomBtn"  @tap="navTo('mine3Addbank')">添加</view>
		</view>
	</view>
</template>

<script>
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	import {djRequest} from '../../common/request.js'
	
	export default {
		data() {
			return {
				lists:[],
			}
		},
		components: {
			uniIcon
		},
		onShow() {
			var _this = this;
			djRequest({
				url:'/api/bank',
				method:'GET',
				success:function(res) {
					//console.log(res);
					if (res.data.status == 200) {
						_this.lists = res.data.data;
					} else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						 })
					}
				}
			})		
		},
		methods: {
			navTo(e) {
				//console.log(e);
				uni.navigateTo({
					url:e
				})
			},
		}
	}
</script>

<style>
	.list_wrap{margin:0 20upx; width: 710upx; margin-top: 20upx; margin-bottom: 100upx;}
	.list .item{color: #333333; background: #FFFFFF; font-size: 32upx; line-height: 2em; border-radius: 8upx; padding: 20rpx; margin-bottom: 20upx;}
	.list .item .flex1{align-self: flex-start; margin-top: 20upx;}
	.list .item image{width: 80upx; height: 80upx;}
	.list .item .name{color: #333333; font-size: 32upx;}
	.list .item .type{color: #999999; font-size: 26upx;}
	.list .item .num{color: #333333; font-size: 28upx;}
	.bottomBtn{width: 710upx; position: fixed; bottom: 10upx;  background: #CCA366; color: #ffffff; border-radius: 8upx;
 font-size: 32upx; height: 88upx; line-height: 88upx; text-align: center;}
</style>
