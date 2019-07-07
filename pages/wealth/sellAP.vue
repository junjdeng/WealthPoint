<template>
	<view class="container">
		<view class="section1">
			<view class="title">AP数量</view>
			<view class="num wpgold">{{parseFloat(type==1 ? balance.ecash : balance.bonus).toFixed(4)}}</view>
		</view>
		
		<view class="form_wrap">
			<form class="dj_form" @submit="formSubmit">
				<view class="uni-form-item uni-column flex-start">
					<span class="flex2 title">退租数量</span>
					<input class="uni-input flex5" name="number" type="number" :value="number" @input="onKeyInput" />
					<input class="uni-input" name="source" hidden  :value="type==1 ? 'ecash':'bonus'" />
				</view>
				
				<view class="uni-form-item uni-column flex-start">
					<span class="flex2 title">支付金额</span>
					<input class="uni-input flex5" type="number" disabled  :value="number*2000" />
				</view>
				
				<view class="uni-form-item uni-column flex-start">
					<span class="flex2 title">安全密码</span>
					<input class="uni-input flex5" name="password" type="password" placeholder="请输入六位安全密码" />
				</view>
				
				<view class="uni-btn-v">
					<button formType="submit">完成</button>
				</view>
			</form>
		</view>
		
	</view>
</template>

<script>
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	import {djRequest} from '../../common/request.js'
	import {config} from '../../common/config.js'
	import common from '../../common/common.js'
	
	export default {
		data() {
			return {
				type:1,
				balance:{},
				number:1
			}
		},
		components: {
			uniIcon
		},
		onLoad(options) {
			this.type = options.type;
			this.balance = config.Balance;
		},
		methods: {
			onKeyInput: function(event) {
				this.number = event.target.value
			},
			formSubmit: function(e) {
				//表单校验
				var data = e.detail.value;
				if (!common.isNotNull(data.number, "退租数量")) return;
				if (!common.isNotNull(data.password, "安全密码")) return;				
				var _this = this;				
				common.isTrueSellPw(data.password,function(res){
					if (res.data.status == 200) {
						_this.sellAP(data);
					} else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				});	
            },			
			sellAP:function(data){
				//退租
				djRequest({
					url:"/api/gift",
					data:data,
					success:function(res) {							
						if (res.data.status == 200){
							   uni.showToast({
								title:res.data.message,
								icon:"none",
								duration:1000,
								success() {
									uni.navigateBack()
								}
							   })
						}else{
							uni.showToast({
								title:res.data.message,
								icon:"none"
							})
						}	
					}
				})					
			}
		}
	}
</script>

<style>
.section1{width: 750upx; padding: 40upx 0; background: linear-gradient(#CEA15A,#F3CB84);text-align: center;}
.section1 .title{font-size: 32upx; color: #ffffff; line-height: 1.6em; margin-top: 10upx; }
.section1 .num{font-size: 64upx;color: #ffffff; line-height: 1.6em; font-weight: bold; margin-bottom: 30upx;}

.form_wrap{ margin-top: 20upx;}
.form_wrap .dj_form{display: inline-block; width: 750upx;position: relative;}
.dj_form .uni-form-item{ margin-bottom: 2upx; padding: 20upx; background: #ffffff;}
.dj_form .uni-form-item .title{color: #333333; font-size: 28upx; line-height: 2em;}
.dj_form .uni-input{color: #333333; font-size: 28upx;  text-align: left;}
.dj_form .uni-btn-v{position: absolute; bottom: -200upx; left: 20upx; width: 710upx; }
.dj_form .uni-btn-v button{background: #CCA366; font-size: 32upx; color: #ffffff;}
</style>
