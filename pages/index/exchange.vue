<template>
	<view class="content">
		<view class="title">
			<view>我的积分</view>
			<view>{{total}}</view>
		</view>
		<view class="main">
			<view class="input">
				<input type="number" v-model.trim="integral" placeholder="请输入您要兑换的积分">
			</view>
			<view class="btn" @click="change">兑换AP</view>
		</view>
		<view class="tips">
			*兑换的积分，必须是大于等于5000且是5000的倍数<br/>
			*每5000积分可兑换0.25AP
		</view>
	</view>
</template>

<script>
	import common from '../../common/common.js'
	import {
		config
	} from '../../common/config.js'
	import { djRequest } from '../../common/request.js'
	export default{
		data () {
			return {
				total:0,
				integral:''
			}
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: 'alreadyfinish'
			})
		},
		onShow(){
			this.record();
		},
		methods:{
			change(){
				if (this.total <5000) {
					common.TostUtil('积分不足,无法兑换');
					return;
				}
				if (this.integral <5000) {
					common.TostUtil('输入积分须是5000的整数倍');
					return;
				}
				var _this = this;
				uni.showModal({
					content: '确定将您的签到积分兑换为AP？',
					success: function (res) {
						if (res.confirm) {
							djRequest({
								url:'/api/sign/exchange',
								data:{
									integral:Number(_this.integral)
								},
								method:'POST',
								success:function(res) {	
									if (res.data.status == 200){
										common.TostUtil(res.data.message);
										(function(){
											djRequest({
												url: '/api/member/balance',
												method: 'GET',
												success: function(res) {
													if (res.data.status === 200) {
														config.balance = res.data.data;
														_this.total = config.balance.sign;
													}
												}
											})
										})();
									}else{
										common.TostUtil(res.data.message);
										_this.integral='';
									}
								}
							})	
						}
					}
				});
				
			},
			record () {
				let that = this;
				djRequest({
					url: '/api/member/balance',
					method: 'GET',
					success: function(res) {
						if (res.data.status === 200) {
							config.balance = res.data.data;
							that.total = config.balance.sign;
						}
					}
				})
			}
		}
	}
</script>

<style>
	.content{
		background: #fff;
	}
	.title,.list{
		width:750upx;
		display:flex;
		justify-content: space-between;
		align-items:center;
	}
	.title>view:last-child{
		font-size: 50upx;
		color:#FF3333;
		text-align: right;
		padding-right:40upx;
		box-sizing:border-box;
	}
	.title>view:first-child{
		font-size: 32upx;
		color:#333;
		padding-left:20upx;
		box-sizing:border-box;
	}
	.list>view{
		width:375upx;
		text-align: center;
		padding:20upx 0;
		font-size: 28upx;
		color:#666;
	}
	.title:first-child{
		border-bottom:2upx solid #f7f7f7;
		border-top:2upx solid #f7f7f7;
	}
	.tips {
		padding: 20upx;
		margin-top: 1em;
		font-size: 24upx;
		color: #FF3333;
	}
	.main{
		width:600upx;
		margin:20upx auto;
		display:flex;
		justify-content: center;
		align-items:center;
		font-size: 28upx;
	}
	input{
		border:2upx solid #f7f7f7;
		border-radius:8upx;
		outline:none;
		padding:10upx 10upx;
	}
	.main>view:last-child{
		color: #FF3333;
		font-size: 28upx;
		 border:1px solid #FF3333; 
		 border-radius: 16upx;
		 padding:12upx 20upx;
		 margin-left:20upx;
	}
</style>
