<template>
	<view class="container">
		<view class="form_wrap">
			<form class="dj_form" @submit="formSubmit">
				<view class="uni-form-item uni-column flex-start">
					<span class="flex2 title">头像</span>
					<image src="../../static/images/ft.png"></image>
				</view>

				<view class="uni-form-item uni-column flex-start">
					<span class="flex2 title">用户名</span>
					<span><span class="gray">{{obj.username}}</span>
					</span>
				</view>

				<view class="uni-form-item uni-column flex-start" data-url="ownName"  @click="navTo">
					<span class="flex2 title">真实姓名</span>
					<span><span class="gray">{{obj.realName}}</span>
						<uni-icon type="forward" class="forward" size="16" color="#999999"></uni-icon>
					</span>
				</view>

				<view class="uni-form-item uni-column flex-start">
					<span class="flex2 title">云用户级别</span>
					<span class="gray">{{obj.levelName}}</span>
				</view>
				<view class="uni-form-item uni-column flex-start" data-url="phone" @click="navTo">
					<span class="flex2 title">手机号</span>
					<span><span class="gray">{{obj.phone}}</span>
						<uni-icon type="forward" class="forward" size="16" color="#999999"></uni-icon>
					</span>
				</view>
				<view class="uni-form-item uni-column flex-start" :data-url="'signature?txt='+obj.signature" @click="navTo">
					<span class="flex2 title">个性签名</span>
					<span><span class="gray self" >{{obj.signature}}</span>
						<uni-icon type="forward" class="forward" size="16" color="#999999"></uni-icon>
					</span>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	import {
		config
	} from '../../common/config.js'
	import common from '../../common/common.js'
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	import neilModal from '@/components/neil-modal/neil-modal.vue'
	export default {
		data() {
			return {
				obj: {},
				show:false
			}
		},
		components: {
			uniIcon,
			neilModal
		},
		onShow() {
			let that = this;
			that.obj=config.User;
			
		},
		methods: {
			navTo(e) {
				uni.navigateTo({
					url: e.currentTarget.dataset.url
				})
			}
		}
	}
</script>

<style>
	.form_wrap {
		margin-top: 20upx;
	}

	.form_wrap .dj_form {
		display: inline-block;
		width: 750upx;
		position: relative;
	}

	.dj_form .uni-form-item {
		margin-bottom: 2upx;
		padding: 20upx;
		background: #ffffff;
	}

	.dj_form .uni-form-item image {
		width: 100upx;
		height: 100upx;
		border-radius: 50upx;
	}

	.dj_form .uni-form-item .title {
		color: #333333;
		font-size: 28upx;
		line-height: 2em;
	}

	.dj_form .uni-input {
		color: #333333;
		font-size: 28upx;
		text-align: right;
	}

	.dj_form .uni-btn-v {
		position: absolute;
		bottom: -200upx;
		left: 20upx;
		width: 710upx;
	}

	.dj_form .uni-btn-v button {
		background: #CCA366;
		font-size: 32upx;
		color: #ffffff;
	}

	.gray {
		font-size: 28upx;
		color: #666;
	}
	.self{
		width:375upx;
		text-align:right;
		display:inline-block;
		text-overflow: ellipsis;
		overflow:hidden;
		white-space: nowrap;
	}
</style>
