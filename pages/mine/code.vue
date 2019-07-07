<template>
	<view class="content">
		<view class="img">
			<image src="/static/images/code.png"></image>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				
			}
		},
		onNavigationBarButtonTap(e){
			uni.navigateTo({
				url:'addCode'
			})
		},
		methods:{
			navTo(e){
				uni.navigateTo({
					url:e.currentTarget.dataset.url
				})
			}
		}
	}
</script>

<style>
	.img{
		width:90%;
		margin:20upx auto;
		text-align: center;
		box-sizing:border-box;
		padding:20upx;
		background: red;
	}
	.img image{
		width:100%;
		margin:0 auto;
		display:block;
	}
</style>
