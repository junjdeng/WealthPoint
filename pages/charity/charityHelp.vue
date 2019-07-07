<template>
	<view class="form_wrap">
		<form class="dj_form" @submit="formSubmit">
			<view class="uni-form-item uni-column flex-start">
				<span class="flex2 title">钱包</span>
				<radio-group class="uni-input flex5">
					<label class="radio"><radio style="transform:scale(0.8)" value="r1" color="#CCA366" checked="true" />奖金钱包</label>
					<label class="radio"><radio style="transform:scale(0.8)" value="r2" color="#CCA366" />希望钱包</label>
				</radio-group>
			</view>
			
			<view class="uni-form-item uni-column flex-start">
				<span class="flex2 title">捐助AP数量</span>
                <input class="uni-input flex5" type="number" placeholder="请输入捐助AP数量" />
			</view>
			
			<view class="uni-form-item uni-column flex-start">
				<span class="flex2 title">安全密码</span>
                <input class="uni-input flex5" type="number" placeholder="请输入六位安全密码" />
			</view>
			
			<view class="uni-btn-v">
				<button formType="submit">去捐助</button>
			</view>
		</form>
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
	.form_wrap{margin-top: 20upx;}
    .dj_form{ position: relative;}
	.dj_form .uni-form-item{ margin-bottom: 2upx; padding: 10upx 20upx; background: #ffffff;}
	.dj_form .uni-form-item .title{color: #333333; font-size: 28upx;width: 710upx; padding: 20upx;}
	.dj_form .uni-form-item label{padding-right: 20upx;}
	.dj_form .uni-input{color: #333333; font-size: 28upx;  text-align: right;}
	.dj_form .uni-btn-v{position: absolute; bottom: -200upx; left: 20upx; width: 710upx; }
	.dj_form .uni-btn-v button{background: #CCA366; font-size: 32upx; color: #ffffff;}
</style>
