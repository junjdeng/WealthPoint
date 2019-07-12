<template>
	<view class="content">
		<view class="img" v-for="(item,index) in list" :key="index" v-if="item.images !=''" :data-url="'delCode?id='+item.id"
		 @click="navTo">
					<image :src="baseUrl+item.images"></image>
		</view>
	</view>
</template>

<script>
	import {
		config
	} from '../../common/config.js'
	import {
		djRequest
	} from '../../common/request.js'
	export default {
		data() {
			return {
				list: [],
				baseUrl: config.BASE_URL,
			}
		},
		onShow() {
			this.getQrcodeList();
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: 'addCode'
			})
		},
		methods: {
			navTo(e) {
				uni.navigateTo({
					url: e.currentTarget.dataset.url
				})
			},
			getQrcodeList() {
				var _this = this;
				djRequest({
					url: '/api/qrcode',
					method: 'GET',
					success: function(res) {
						_this.list = res.data.data;
					}
				})
			}
		}
	}
</script>

<style>
	.img {
		width: 650upx;
		margin: 0 auto 40upx;
		text-align: center;
		box-sizing: border-box;
		padding: 20upx;
		height: 740upx;
		box-sizing: border-box;

	}

	.img image {
		width: 100%;
		display: block;
		height: 700upx;
		margin: 0 auto;
		display: block;
	}
</style>
