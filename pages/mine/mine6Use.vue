<template>
	<view class="container">
		<view class="form_wrap">
			<form class="dj_form" @submit="formSubmit">
				<view class="uni-form-item uni-column flex-start">
					<span class="flex2 title">会员用户名</span>
					<input class="uni-input flex5" placeholder="请输入会员用户名" />
				</view>
				
				<view class="uni-form-item uni-column flex-start">
					<span class="flex2 title">安全密码</span>
					<input class="uni-input flex5" type="password"  placeholder="请输入安全密码" />
				</view>
				
				<view class="tips">
					*激活码200元每个（新注册账号需要一个激活码激活。激活后立即返0.2个AP即400元到用户的希望钱包）<br/>
					*激活码获取途径：1.向推荐人购买。2.系统奖励。
				</view>
				
				<view class="uni-btn-v">
					<button formType="submit">提交</button>
				</view>
			</form>
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
.dj_form .uni-form-item  .forward{text-align: right;}
.dj_form .tips{padding: 20upx; margin-top: 1em; font-size: 24upx; color: #D03C29;}
</style>
