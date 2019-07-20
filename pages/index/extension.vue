<template>
	<view class="content">
		<view v-for="(item,index) in arr" :key="index">
			<image :src="item" @click="yulan"></image>
		</view>
		
		<!-- <view class="btn" @click="saveFile(item)">保存</view> -->
	</view>
</template>
<script>
	import common from '../../common/common.js'
	import { config } from '../../common/config.js'
	import { djRequest } from '../../common/request.js'
	export default {
		data() {
			return {
				arr:[]
			};
		},
		
		onShow(){
			let that = this;
			djRequest({
				url:'/api/business',
				method:'GET',
				success:function(res){
					if(res.data.status===200){
						let ars= res.data.data;
						ars=ars.slice(1);
						let arq=[];
						ars.forEach(item=>{
							item='http://api.wealth-point.com'+item;
							arq.push(item);
						})
						that.arr = arq;
					}
				}
			})
		},
		onLoad() {},
		methods: {
			yulan() {
				let that=this;
				uni.previewImage({
					urls: that.arr,
					current:'0',
					longPressActions: {
						itemList: ['保存图片'],
						success: function(data) {
							if(data.tapIndex==0){
								that.saveFile(that.arr[data.index]);
							}
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			saveFile(url) {
				uni.showModal({
					content: '是否保存图片?',
					success: function(res) {
						if (res.confirm) {
							uni.downloadFile({
								url: url,
								success: (res) => {
									if (res.statusCode === 200) {
										uni.saveImageToPhotosAlbum({
											filePath: res.tempFilePath,
											success: function() {
												uni.showToast({
													title: "保存成功",
													icon: "none"
												});
											},
											fail: function() {
												uni.showToast({
													title: "保存失败，请稍后重试",
													icon: "none"
												});
											}
										});
									}
								}
							})
						}
					}
				})

			}
		}
	};
</script>

<style>
	.content {
		width: 710upx;
		margin: 20upx auto;
		display: flex !important;
		justify-content: flex-start;
		flex-wrap: wrap;
	}

	.content>view {
		width: 345upx;
		height: 500upx;
		margin-bottom: 40upx;
		border: 2upx solid #f7f7f7;
		border-radius: 8upx;
		box-sizing: border-box;
		box-shadow:5upx 10upx 5upx #ccc;
		position:relative;
		overflow:hidden;
	}

	.content>view image {
		width: 100%;
		height: 100%;
		object-fit: content;
	}

	.content>view:nth-child(2n) {
		margin-left: 20upx
	}
	.btn{
		position:absolute;
		z-index:100;
		width:80upx;
		height:60upx;
		color:#fff;
		line-height: 60upx;
		text-align: center;
		border-radius:10upx;
		background: rgba(0,0,0,.5);
		bottom:10upx;
		right:10upx;
		font-size: 24upx;
	}
</style>
