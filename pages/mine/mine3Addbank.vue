<template>
	<view class="container">
		<view class="form_wrap">
			<form class="dj_form" @submit="formSubmit">
				<view class="uni-form-item uni-column flex-start">
					<span class="flex2 title">持卡人姓名</span>
					<input class="uni-input flex5" disabled name="bankAccountName" :value="user.realName" placeholder="请输入持卡人姓名" />
				</view>
				
				<view class="uni-form-item uni-column flex-start">
					<span class="flex2 title" >银行名称</span>
					<input class="uni-input" name="bankName" hidden disabled  :value="array[index]" />
					<picker class="flex5" @change="bindPickerChange" :value="index" :range="array">
						<view class="uni-input">{{array[index]}}</view>
			        </picker>
					<uni-icon type="forward" class="forward flex1" size="20" color="#999999"></uni-icon>
				</view>			
				
				<view class="uni-form-item uni-column flex-start">
					<span class="flex2 title">银行账号</span>
					<input class="uni-input flex5" name="bankNumber" type="number" :value="bankCard ? bankCard.bankNumber : ''"  placeholder="请输入16-19位银行卡号" />
				</view>
				<view class="uni-form-item uni-column flex-start">
					<span class="flex2 title">开户行</span>
					<input class="uni-input flex5" name="bankAddress" :value="bankCard ? bankCard.bankAddress : ''" placeholder="请输入开户行" />
				</view>
				<view class="tips">
					<input class="uni-input" name="status" hidden disabled  :value="bankCard ? bankCard.status : 'yes'"/>
					<input v-if="bankId != 0" class="uni-input" name="bankId" hidden disabled  :value="bankCard.id"/>
					*请务必确保银行信息正确，如因错误的银行信息导致收款失败，会员自行承担责任。
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
	import {config} from '../../common/config.js'
	import common from '../../common/common.js'
	import {djRequest} from '../../common/request.js'
	
	export default {
		data() {
			return {
			  user:config.User,
			  array: ['中国银行',
					  '中国建设银行',
					  '中国农业银行',
					  '中国工商银行',
					  '交通银行',
					  '广发银行',
					  '上海浦东发展银行',
					  '招商银行',
					  '平安银行',
					  '中国邮政储蓄银行',
					  '兴业银行',
					  '民生银行',
					  '光大银行',
					  '中信银行',
					  '华夏银行',
					  '上海银行',
					  '北京银行',
					  '花旗中国银行',
					  '汇丰中国银行',
					  '渣打中国银行',
					  '香港汇丰银行',
					  '其他银行'],
			index: 0,
			bankCard:null,
			bankId:0,
			}
		},
		components: {
			uniIcon
		},
		onLoad(option) {
			if(option.id){
			   uni.setNavigationBarTitle({
					title:"修改银行卡"
				})
				this.bankId = option.id;
				this.getBankInfo(option.id);
			}else{
				uni.setNavigationBarTitle({
					title:"添加银行卡"
				})
			}
		},
		onNavigationBarButtonTap(e){			
			var _this = this;
			
			if (_this.bankId == 0) {
				return;
			}
			
			uni.showModal({
				title: '删除提示',
				content: '确认删除该银行账户？',
				success: function (res) {
					if (res.confirm) {						
						djRequest({
							url:'/api/bank/delete',
							method:'GET',
							data:{"Id":_this.bankId},
							success:function(res) {
								if (res.data.status == 200) {							
									uni.navigateBack();	
								} else{
									uni.showToast({
										title:res.data.message,
										icon:"none"
									 })
								}
							}
						})		
					} else if (res.cancel) {
						//console.log('用户点击取消');
					}
				}
			});
		},
		methods: {
			getBankInfo:function(bankId){
				var _this = this;
				djRequest({
					url:'/api/bank/show',
					method:'GET',
					data:{"Id":bankId},
					success:function(res) {
						if (res.data.status == 200) {							
							_this.bankCard = res.data.data;
							_this.index = _this.array.indexOf(res.data.data.bankName);		
						} else{
							uni.showToast({
								title:res.data.message,
								icon:"none"
							 })
						}
					}
				})		
			},
			bindPickerChange: function(e) {
				this.index = e.target.value
			},
			formSubmit: function(e) {
				var data = e.detail.value;
				if (!common.isNotNull(data.bankAccountName, "持卡人姓名")) return;
				if (!common.isNotNull(data.bankNumber, "银行账号")) return;
				if (!common.isBankId(data.bankNumber)) return;
				if (!common.isNotNull(data.bankAddress, "开户行")) return;
				
				var url = "/api/bank/add";//新增
				if (this.bankId != 0) {
					url = "/api/bank/update";//修改
				} 
				djRequest({
					url:url,
					data:data,
					success:function(res) {												
						if (res.data.status == 200){
							   uni.showToast({
								title:res.data.message,
								icon:"none",
								duration:1000,
								complete() {
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
