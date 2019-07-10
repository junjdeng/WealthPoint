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
					<input class="uni-input flex5" disabled  v-model="obj.username" />
				</view>
				
				<view class="uni-form-item uni-column flex-start">
					<span class="flex2 title">真实姓名</span>
					<input class="uni-input flex5"  disabled  v-model="obj.realName" />
				</view>
				
				<view class="uni-form-item uni-column flex-start">
					<span class="flex2 title">会员级别</span>
					<input class="uni-input flex5"  disabled v-model="obj.levelName" />
				</view>
				<view class="uni-form-item uni-column flex-start">
					<span class="flex2 title">手机号</span>
					<input class="uni-input flex5" type="number" disabled v-model="obj.phone" />
				</view>
				
				<view class="uni-form-item uni-column flex-start">
					<span class="flex2 title">出生日期</span>
					<input class="uni-input flex5"   value="2018-09-09" />
				</view>
				
				<view class="uni-form-item uni-column flex-start">
					<span class="flex2 title">个性签名</span>
					<input class="uni-input flex5"  placeholder="请输入个性签名" value="人生天地间,忽如远行客" />
				</view>
				
				<!-- <view class="uni-btn-v">
					<button formType="submit">编辑</button>
				</view> -->
			</form>
		</view>
	</view>
</template>

<script>
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	export default {
		data() {
			return {
				obj:{}
			}
		},
		components: {
			uniIcon
		},
		onShow () {
			this.getUserInfo();
		},
		methods: {
			getUserInfo(){
				let that = this;
				uni.getStorage({
					key:'loginInfo',
					success(e){
						that.obj= JSON.parse(e.data);
					}
				})
			}
		}
	}
</script>

<style>
.form_wrap{ margin-top: 20upx;}
.form_wrap .dj_form{display: inline-block; width: 750upx;position: relative;}
.dj_form .uni-form-item{ margin-bottom: 2upx; padding: 20upx; background: #ffffff;}
.dj_form .uni-form-item image{width:100upx; height: 100upx; border-radius: 50upx;}
.dj_form .uni-form-item .title{color: #333333; font-size: 28upx; line-height: 2em;}
.dj_form .uni-input{color: #333333; font-size: 28upx;  text-align: right;}
.dj_form .uni-btn-v{position: absolute; bottom: -200upx; left: 20upx; width: 710upx; }
.dj_form .uni-btn-v button{background: #CCA366; font-size: 32upx; color: #ffffff;}
</style>
