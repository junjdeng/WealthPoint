<template>
	<view class="content">
		<image :src="src"></image>
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
				src: '',
				id: 0
			}
		},
		methods: {
			onNavigationBarButtonTap(e) {
				let that = this;
				/* 删除 */
				uni.showModal({
					title: '删除',
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
		onLoad(options) {
			let that = this;
			that.id = options.id;
			djRequest({
				url: '/api/qrcode/show',
				method: 'GET',
				data: {
					Id: options.id
				},
				success: function(res) {
					that.src = 'http://api.wealth-point.com/' + res.data.data.images;
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
	}

	.content image {
		width: 100%;
		display: block;
	}
</style>
