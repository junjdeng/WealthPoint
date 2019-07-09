<template>
	<view class="container">
		<view class="form_wrap">
			<form class="dj_form" @submit="formSubmit">
				<view class="uni-form-item uni-column flex-start">
					<span class="flex2 title">持卡人姓名</span>
					<input class="uni-input flex5" v-model="userName" placeholder="请输入持卡人姓名" />
				</view>

				<view class="uni-form-item uni-column flex-start">
					<span class="flex2 title">银行名称</span>
					<input class="uni-input" hidden disabled :value="array[index]" />
					<picker class="flex5" @change="bindPickerChange" :value="index" :range="array">
						<view class="uni-input">{{bankName||array[index]}}</view>
					</picker>
					<uni-icon type="forward" class="forward flex1" size="20" color="#999999"></uni-icon>
				</view>

				<view class="uni-form-item uni-column flex-start">
					<span class="flex2 title">银行账号</span>
					<input class="uni-input flex5" type="number" v-model="bankNumber" placeholder="请输入16-19位银行卡号" />
				</view>
				<view class="uni-form-item uni-column flex-start">
					<span class="flex2 title">开户行</span>
					<input class="uni-input flex5" v-model="bankAddress" placeholder="请输入开户行" />
				</view>
				<view class="tips">
					*请务必确保银行信息正确，如因错误的银行信息导致收款失败，会员自行承担责任。
				</view>

				<view class="uni-btn-v">
					<button formType="submit">{{flag?'提交':'正在处理中...'}}</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	import common from '../../common/common.js'
	import { config } from '../../common/config.js'
	import { djRequest } from '../../common/request.js'
	export default {
		data() {
			return {
				array: [
					'中国银行',
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
					'其他银行',
				],
				index: 0,
				flag: true,
				bankAddress: '', //所属银行地方
				bankName: '', //开户行
				bankNumber: '', //银行卡号
				userName: '', //开户人
				id: ''
			}
		},
		components: {
			uniIcon
		},
		onNavigationBarButtonTap(e) {
			this.del();
		},
		onLoad(options) {
			this.id = options.id
		},
		created() {
			let that = this;
			that.getUserName();
			that.bankName = that.array[that.index];

		},
		onShow() {
			this.getBank();
		},
		methods: {
			bindPickerChange: function(e) {
				this.index = e.target.value,
					this.bankName = this.array[this.index];
			},
			del() {
				let that = this;
				djRequest({
					url: '/api/bank/delete',
					data: {
						"Id": that.id,
					},
					method: "GET",
					success: function(res) {
						if (res.data.status === 200) {
							common.TostUtil(res.data.message);
							uni.navigateBack({
								delta: 1
							});
						}
					}
				})
			},
			/* 展示数据 */
			getBank() {
				let that = this;
				djRequest({
					url: '/api/bank/show',
					method: 'GET',
					data: {
						Id: that.id
					},
					success: function(res) {
						that.bankName = res.data.data.bankName;
						that.bankNumber = res.data.data.bankNumber;
						that.userName = res.data.data.bankAccountName;
						that.bankAddress = res.data.data.bankAddress;
					}
				})
			},
			/* 获取用户名 */
			getUserName() {
				let that = this;
				uni.getStorage({
					key: 'loginInfo',
					success(e) {
						that.userName = JSON.parse(e.data).realName;
						that.sessionid = JSON.parse(e.data).sessionId;
					}
				})
			},
			/* 修改银行卡 */
			formSubmit() { //确定提交
				let that = this;
				if (that.flag) {
					that.flag = false;
					if (!common.RegUtil.isMatchRealName(that.userName)) {
						common.TostUtil('请输入开户人！');
						that.flag = true;
						return
					}
					if (!common.RegUtil.isMatchBankNumber(that.bankNumber)) {
						common.TostUtil('请输入16~19位银行卡号！');
						that.flag = true;
						return
					}
					if (that.bankAddress === '') {
						common.TostUtil('请输入开户行！');
						that.flag = true;
						return
					}
				}
				djRequest({
					url: '/api/bank/update',
					data: {
						bankId: that.id,
						bankName: that.bankName,
						bankNumber: that.bankNumber,
						bankAddress: that.bankAddress,
						bankAccountName:that.userName,
						status: 'yes'
					},
					method: 'POST',
					success: function(res) {
						common.TostUtil(res.data.message);
						that.flag = true;
						setTimeout(function(){
							uni.navigateBack();
						},1000)
					},
					fail: function(res) {
						console.log(res)
					}
				})
			},
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

	.dj_form .uni-form-item .forward {
		text-align: right;
	}

	.dj_form .tips {
		padding: 20upx;
		margin-top: 1em;
		font-size: 24upx;
		color: #D03C29;
	}
</style>
