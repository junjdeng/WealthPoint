<template>
	<view class="container">		
		<view class="list_wrap">
			<view class="list">
				<view class="item" data-url="mine5ResetPw?type=1" @tap="navTo">
					修改登录密码<uni-icon type="forward" class="forward" size="20" color="#999999"></uni-icon>
				</view>
				<view class="item" data-url="mine5ResetPw?type=2" @tap="navTo">
					修改安全密码<uni-icon type="forward" class="forward" size="20" color="#999999"></uni-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	export default {
		data() {
			return {

			}
		},
		components: {
			uniIcon
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
	.list_wrap{background: #FFFFFF; width: 710upx; padding: 0 20upx;margin-top: 20upx;}
	.list .item{color: #333333; font-size: 32upx; line-height: 2em; padding: 20rpx; border-bottom: 1px solid #E6E6E6;}
	.list .item .forward{float: right; line-height: 2em;}

</style>
