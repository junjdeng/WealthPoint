<template>
	<view class="container">
		<view class="section1">
			<view class="title">AP数量</view>
			<view class="num wpgold">{{wallet}}</view>
		</view>

		<view class="form_wrap">
			<form class="dj_form" @submit="formSubmit">
				<view class="uni-form-item uni-column flex-start">
					<span class="flex2 title">卖出数量</span>
					<input class="uni-input flex5" type="number" v-model="APNumber" />
				</view>

				<view class="uni-form-item uni-column flex-start">
					<span class="flex2 title">支付金额</span>
					<view class="uni-input flex5">{{cash*APNumber | yuan}}</view>
				</view>

				<view class="uni-form-item uni-column flex-start">
					<span class="flex2 title">安全密码</span>
					<input class="uni-input flex5" v-model="pwd" type="password" placeholder="请输入六位安全密码" />
				</view>

				<view class="uni-btn-v">
					<button formType="submit">{{flag?"提交":"处理中..."}}</button>
				</view>
			</form>
		</view>

	</view>
</template>

<script>
	import common from '../../common/common.js'
	import { config } from '../../common/config.js'
	import { djRequest } from '../../common/request.js'
	export default {
		data() {
			return {
				wallet: 0,
				type: '',
				status: 0,
				flag: true,
				pwd: '',
				APNumber: 0,
				cash: 2000
			}
		},
		onShow() {
			let that = this;
			that.wallets();
		},
		onLoad(options) {
			this.status = options.type;
		},
		components: {},


		methods: {
			/* 当前钱包资产 */
			wallets () {
				let that = this;			
			    common.balance({
					success:function(res){
						config.balance = res;
						if(that.status==1){
							that.wallet=parseFloat(config.balance.ecash).toFixed(4);//希望钱包
							that.type = 'ecash'
						}else if(that.status==2){
							that.wallet=parseFloat(config.balance.bonus).toFixed(4);//奖金钱包
							that.type = 'bonus'
						}						
					}
				});	
			},
			/* 判断钱包并判断规则 */
			getRule() {
				let that = this;
				let num;
				if (that.flag) {
					that.flag = false;
					if(that.pwd===''){
						common.TostUtil('请输入安全密码');
						that.flag = true;
						return;
					}
					if (that.status == 1) {
						num = ((that.APNumber) % 0.25).toFixed(2);
						if (num !== '0.00') {
							common.TostUtil('希望钱包退租数量必须为0.25的整数倍！');
							that.flag = true;
							return;
						}
						if (parseFloat(that.APNumber) > parseFloat(that.wallet)) {
							common.TostUtil('此钱包中AP数量不足！');
							that.APNumber = '';
							that.flag = true;
							return;
						}
						if (parseFloat(that.APNumber) > 20) {
							common.TostUtil('单次承退数量不能大于20个！');
							that.APNumber = '';
							that.flag = true;
							return;
						}
						// if (parseFloat(that.APNumber) < 1) {
						// 	common.TostUtil('最少1个！');
						// 	that.APNumber = '';
						// 	that.flag = true;
						// 	return;
						// }
						if (config.balance.ecashLock !== 'no') { //希望钱包是否被锁定
							common.TostUtil('希望钱包中AP已被锁定，不能卖出！');
							that.flag = true;
							return;
						}
						that.getPwd();
					} else if (that.status == 2) {
						num = ((that.APNumber) % 0.5).toFixed(2);
						if (num !== '0.00') {
							common.TostUtil('奖金钱包退租数量必须为0.5的整数倍！');
							that.flag = true;
							return;
						}
						if (parseFloat(that.APNumber) > parseFloat(that.wallet)) {
							common.TostUtil('此钱包中AP数量不足！');
							that.APNumber = '';
							that.flag = true;
							return;
						}
						if (parseFloat(that.APNumber) < 0.5) {
							common.TostUtil('最少0.5个！');
							that.flag = true;
							return;
						}
						if (config.balance.bonusLock !== 'no') { //奖金钱包是否被锁定
							common.TostUtil('奖金钱包中AP已被锁定，不能卖出！');
							that.flag = true;
							return;
						}
						that.getPwd();
					}
				}
			},
			sells() { //卖出
				let that = this;
				djRequest({
					url: '/api/order/sell',
					data: {
						source: that.type,
						number: Number(parseFloat(that.APNumber).toFixed(2))
					},
					method: 'POST',
					success: function(res) {
						if (res.data.status === 200) {
							//console.log(999);
							that.wallets();
						}
						that.APNumber = '';
						common.TostUtil(res.data.message);
						that.flag = true;
					},
					fail: function(res) {
						common.TostUtil(res.data.message);
						that.flag = true;
					}
				})
			},
			/* 验证安全密码 */
			getPwd() {
				let that = this;
				djRequest({
					url: '/api/member/verify_security',
					data: {
						password: that.pwd
					},
					method: 'POST',
					success: function(res) {
						if (res.data.status === 200) {
							that.sells();
						} else {
							common.TostUtil(res.data.message);
						}
						that.flag = true;
					},
					fail: function(res) {
						common.TostUtil(res.data.message);
						that.flag = true;
					}
				})
			},
			formSubmit() {
				let that = this;
				that.getRule();
			},
		}
	}
</script>

<style>
	.section1 {
		width: 750upx;
		padding: 40upx 0;
		background: linear-gradient(#CEA15A, #F3CB84);
		text-align: center;
	}

	.section1 .title {
		font-size: 32upx;
		color: #ffffff;
		line-height: 1.6em;
		margin-top: 10upx;
	}

	.section1 .num {
		font-size: 64upx;
		color: #ffffff;
		line-height: 1.6em;
		font-weight: bold;
		margin-bottom: 30upx;
	}

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

	.dj_form .uni-form-item .title {
		color: #333333;
		font-size: 28upx;
		line-height: 2em;
	}

	.dj_form .uni-input {
		color: #333333;
		font-size: 28upx;
		text-align: left;
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
</style>
