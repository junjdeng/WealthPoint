<template>
	<view class="content">
		<view class="img" v-for="(item,index) in list" :key="index" v-if="item.images !=''" :data-url="'delCode?id='+item.id"  @click="navTo">
			<image :src="baseUrl+item.images"></image>
		</view>
	</view>
</template>

<script>
	import {config} from '../../common/config.js'	
	import {djRequest} from '../../common/request.js'
	export default{
		data(){
			return {
				list:[],
				baseUrl:config.BASE_URL,
			}
		},
		onLoad() {
			
		},
		onShow() {
			this.getQrcodeList();
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
			},
			getQrcodeList(){
				var _this = this;
				djRequest({
					url:'/api/qrcode',
					method:'GET',
					success:function(res){
						//console.log(res);
						_this.list = res.data.data;
					}
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
	}
	.img image{
		width:100%;
		margin:0 auto;
		display:block;
	}
</style>
