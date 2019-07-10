<template>
	<view class="container">
		<view class="section">
			<view>周期剩余时间</view>
			<view class="reset_time">
				<span>{{d}}</span>天
				<span>{{h}}</span>时
				<span>{{m}}</span>分
			</view>
			<view>承租次数</view>
			<view class="title wpred">{{count}}次</view>
		</view>

		<view class="form_wrap">
			<form class="dj_form" @submit="formSubmit">
				<view class="uni-form-item uni-column flex-start">
					<span class="flex2 title">买入数量</span>
					<input class="uni-input flex5" v-model="APNumber" placeholder="您当前等级可买入AP数量为1个到10个" type="number" />
				</view>

				<view class="uni-form-item uni-column flex-start">
					<span class="flex2 title">支付金额</span>
					<input class="uni-input flex5" type="number" v-model="total" disabled value="2000" />
				</view>

				<view class="uni-form-item uni-column flex-start">
					<span class="flex2 title">安全密码</span>
					<input class="uni-input flex5" v-model="safePwd" type="password" placeholder="请输入六位安全密码" />
				</view>

				<view class="uni-btn-v">
					<button formType="submit">{{flag?'完成':'处理中...'}}</button>
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
				d: '00',
				h: '00',
				m: '00',
				cash: 2000,
				flag: true, //网络缓慢情况下，防止多次下单
				APNumber: '',
				safePwd: '',
				activeTime: 0, //激活时间
				cycle: 240 * 60 * 60, //10天为一个周期
				count: 0 ,//本周期完成订单数
				ends:0
			}
		},
		computed: {
			'total': function() {
				return this.APNumber * this.cash;
			}
		},
		components: {
			uniIcon
		},
		methods: {
			/* 周期剩余时间 */
			endTime() {
				let that = this;
				uni.getStorage({
					key: 'loginInfo',
					success(e) {
						let cycle = 240 * 60 * 60; //10天为一个周期
						let remain = 0; //当前周期的剩余时间
						let activeTime = Number(JSON.parse(e.data).activationTime); //激活时间
						that.activeTime = activeTime;
						let endTime = ((new Date().getTime()) / 1000 - activeTime); //当前减去激活时间，得出到现在为止已经过去了多久时间；
						that.ends = endTime;
						if (endTime > cycle) {
							//如果到目前为止已经至少过去了一个周期，那么剩余时间就等于周期减去当前的这个周期已经过去了的时间
							remain = cycle - endTime % cycle;
						} else {
							//如果当前周期是第一个周期，则剩余时间就等于周期减去从激活到现在已经过去的时间
							remain = cycle - endTime;
						}
						let d = Math.floor(remain / (60 * 60 * 24));
						let h = Math.floor((remain - d * 24 * 60 * 60) / 3600);
						let m = Math.floor((remain - d * 24 * 60 * 60 - h * 3600) / 60);
						let dd = d.toString().split('');
						dd = dd[dd.length - 1];
						if (dd < 10) {
							dd = '0' + dd;
						}
						if (h < 10) {
							h = '0' + h;
						}
						if (m < 10) {
							m = '0' + m;
						}
						that.d = dd;
						that.h = h;
						that.m = m;
					}
				})
			},
			buy(){
				let that = this;
				djRequest({
					url:'/api/order/buy',
					data:{
						number:Number(that.APNumber)
					},
					method:'POST',
					success:function(res){
						that.APNumber='';
						common.TostUtil(res.data.message);
						that.flag = true;
					}
				})
			},
			/* 提交订单 */
			formSubmit() {
				let that = this;
				if (that.flag) {
					that.flag = false;
					if (((that.APNumber) % 0.25).toFixed(2) !== '0.00') {
						common.TostUtil('单次承租数量必须为0.25的整数倍！');
						that.flag = true;
						return;
					}
					if (that.safePwd === '') {
						common.TostUtil('请输入安全密码！');
						that.flag = true;
						return;
					}
					if (that.APNumber > 10) {
						common.TostUtil('单次承租数量不能大于10个！');
						that.flag = true;
						return;
					}
					if (that.APNumber < 1) {
						common.TostUtil('单次承租数量不能小于1个！');
						that.flag = true;
						return;
					}
					djRequest({ //校验安全密码
						url: '/api/member/verify_security',
						data: {
							password: that.safePwd
						},
						success: function(res) {
							if (res.data.status === 200) { //安仔密码正确可以买入；
								that.buy();
							} else { //错误提示用户信息
								common.TostUtil(res.data.message);
								that.flag = true;
								return;
							}
						},
						fail: function(res) {
							that.safePwd = '';
							that.flag = true;
						}
					})
				}
			},
			/* 承租次数 */
			counts() {
				let that = this;
				djRequest({
					url: '/api/order',
					data: {
						start: 0,
						length: 200,
						status: 'finish',
						type: 'buy'
					},
					method: 'POST',
					success: function(res) {
						if (res.data.status === 200) {
							let arr = res.data.data.data;
							let arr1 = [];
							let n = Math.floor((that.ends / that.cycle)); //计算出过去了几个周期，在进行新一周期时，上一周期买入的次数都将清零
							//得到最近一个周期结束时的时间
							let end = that.activeTime + that.cycle * n;
							//循环找到只要是在这个时间后买入buy的就放入arr1，从而计算出在本周期中买入了几次
							arr.forEach((item, index) => {
								if (item.type === 'buy') {
									if (Number(item.payTime) > Number(end)) {
										arr1.push(item);
									}
								}
							});
							that.count = arr1.length; //得到在当前周期的买入成功次数
						}
					}

				});
			}
		},
		onShow() {
			let that = this;
			that.endTime();
			that.counts();
		}
	}
</script>

<style>
	.section {
		text-align: center;
		color: #999999;
		padding: 20upx 0;
		font-size: 28upx;
		line-height: 2em;
	}

	.section .title {
		font-size: 32upx;
	}

	.section .reset_time {
		margin: 40upx 0;
	}

	.section .reset_time span {
		font-size: 64upx;
		line-height: 1.6em;
		background: #D03C29;
		color: #FFFFFF;
		border-radius: 8upx;
		padding: 5upx 10upx;
		margin: 0 10upx;
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
