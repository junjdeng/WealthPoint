<template>
	<view class="content">
		<!-- <savefile v-if="isShowPhoto" :url="srcs" @hide="hidePhoto"></savefile> -->
		<image :src="srcs"></image>
	</view>
</template>

<script>
	import common from '../../common/common.js'

	import {
		config
	} from '../../common/config.js'
	import {
		djRequest
	} from '../../common/request.js'
	export default {
		data() {
			return {
				srcs: '',
				id: 0,
				isShowPhoto: false,
			}
		},
		methods: {
			/* hidePhoto(){
			this.isShowPhoto = true;
			
			}, */
			
			onNavigationBarButtonTap(e) {
				let that = this;
				/* 删除 */
				uni.showModal({
					content: '确定删除此二维码？',
					success: function(res) {
						if (res.confirm) {
							djRequest({
								url: '/api/qrcode/delete',
								method: 'GET',
								data: {
									Id: that.id
								},
								success: function(res) {
									common.TostUtil(res.data.message);
									if (res.data.status === 200) {
										setTimeout(function() {
											uni.navigateBack({
												delta: 1
											})
										}, 1000)
									}

								}
							})
						}
					}
				})

			},
		},
		created() {
			let that = this;


		},
		onLoad(options) {
			let that = this;
			that.id = options.id;
			djRequest({
				url: '/api/qrcode/show',
				method: 'GET',
				data: {
					Id: that.id
				},
				success: function(res) {
					that.srcs = 'http://api.wealth-point.com' + res.data.data.images;
					console.log(that.srcs, 4)
				}
			})
		},
		onShow() {

		}
	}
</script>

<style>
	.content {
		width: 80%;
		margin: 20upx auto;
		height: 700upx;
		overflow: hidden;
	}

	.content image {
		width: 100%;
		height: 700upx;
		display: block;
	}
</style>
