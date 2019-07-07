<template>
	<view class="container">
		<view class="list_wrap">
			<view class="list">
				<view  v-for="value in lists" :key='value.id' v-if="value.images.length>0"  v-bind:class="[itemClass, value.type == 'alipay'?'alipay':'wechat']">
					<view>
						<image v-bind:src="http_url + value.images"></image>
					</view>
					<view>
						<view class="name">扫一扫{{value.type == "alipay" ? "支付宝" : "微信"}}付款</view>
					</view>
				</view>
			</view>
			<view class="bottomBtn" data-url="mine8AddCode"  @tap="navTo">添加</view>
		</view>
	</view>
</template>

<script>
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	import {djRequest} from '../../common/request.js'
	import {config} from '../../common/config.js'
	
	export default {
		data() {
			return {
				itemClass:'item',
				lists:[],
				http_url:config.BASE_URL,
			}
		},
		components: {
			uniIcon
		},
		onShow() {
			var _this = this;
			djRequest({
				url:'/api/qrcode',
				method:'GET',
				success:function(res) {
					console.log(res);
					_this.lists = res.data.data;
				}
			})				
		},
		onNavigationBarButtonTap(e){
			uni.navigateTo({
				url:'mine7Cards'
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
	.list_wrap{margin: 0 20upx; width: 710upx; margin-top: 20upx; margin-bottom: 100upx;}
	.list .item{color: #FFFFFF;  border-radius: 8upx; font-size: 36upx; 
	line-height: 2em; padding: 30rpx; margin-bottom: 20upx; text-align: center;}
    .list .item image{width: 300upx; height: 300upx; border-radius: 8upx;}
	.bottomBtn{width: 710upx; position: fixed; bottom: 10upx;  background: #CCA366; color: #ffffff; border-radius: 8upx;
 font-size: 32upx; height: 88upx; line-height: 88upx; text-align: center;}
   .alipay{background: #0DA1E6;}
   .wechat{background: #00ad47;}
</style>
