<template>
	<view class="container">
		<view class="section1">
			<view class="title">云积分</view>
			<view class="tip" @click="getKnow">签到说明 <text class="crl">!</text></view>
			<view class="num wpgold">{{signNum}}</view>
			<span class="want" data-url="exchange" @tap="navTo">兑换云果</span>
		</view>

		<view class=" section section2">
			<!-- <switch checked @change="switch1Change" color="#CCA366" /><span>签到提醒</span> -->
			<view class="section_title">签到日历</view>
			<view class="list flex-around">
				<view class=" item cover" v-for="(item,index) in dateList" :key="index">
					<view class="date">{{item.time}}</view>
					<!-- <view :class="[item.isSign?'point red':'point green']"></view> -->
					<image v-show="!item.isSign" src="/static/images/sign.png"></image>
					<image v-show="item.isSign" src="/static/images/alreadySign.png"></image>
				</view>
			</view>
			<!-- <view class="line"></view> -->
		</view>

		<view class="signBtn" @tap="sign">{{signTxt}}</view>
		<view class="eject" v-show="know" @click="inKnow">
			<view class="box">
				<view>每日签到说明
				</view>
				<view>1. 每日签到可获得相应云积分奖励
					<br />
					2. 云积分奖励大小根据签到连续性、购买云果付款时间、购买金额来判断

					<br />
					3. 云积分累计到一定额度可兑换云果、商品、云链等

					<br />
					4. 本签到积分最终解释权归W云积分生态系统所有

				</view>
				<view>我知道了</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	import {
		djRequest
	} from '../../common/request.js'
	import common from '../../common/common.js'
	import {
		config
	} from '../../common/config.js'

	export default {
		data() {
			return {
				signTxt: "签到领积分",
				signNum: 0,
				list: [],
				dateList: [],
				know: false,
				signList: []
			}
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: 'signRecord'
			})
		},
		onShow() {
			common.balance();
			this.signNum = config.balance.sign;
			let that = this;
			djRequest({
				url: '/api/sign/sign_list',
				method: 'POST',
				data: {
					start: 0,
					length: 50
				},
				success: function(res) {
					if (res.data.data.data.length == 0) {
						that.signTxt = "签到领积分";
					} else {
						let timer = res.data.data.data[0].time;
						let date = new Date(timer * 1000);
						let YY = date.getFullYear();
						let d = date.getDate();
						d = d < 10 ? ('0' + d) : d;
						let date1 = new Date();
						let d1 = date1.getDate();
						d1 = d1 < 10 ? ('0' + d1) : d1;
						if (d !== d1) {
							that.signTxt = "签到领积分";
						} else {
							that.signTxt = "今日已签到";
						}
					}
				}
			})

		},
		components: {
			uniIcon
		},
		onLoad() {
			var _this = this;
			_this.getDate()
			_this.signNum = config.balance.sign;
		},
		methods: {
			getKnow() {
				this.know = true;
			},
			inKnow() {
				this.know = !this.know;
			},
			navTo(e) {
				uni.navigateTo({
					url: e.currentTarget.dataset.url
				})
			},
			getDate() {
				let that = this;
				var currentDate = new Date()
				var timesStamp = currentDate.getTime();
				var currenDay = currentDate.getDay();
				var dates = [];
				for (var i = 0; i < 7; i++) {
					let item = {};
					item.time = (new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 6) % 7)).toLocaleDateString().replace(
						/\//g, '.')).slice(5)
					dates.push({
						time: item.time,
						isSign: false
					});
				}
				that.dateList = dates;
				djRequest({
					url: '/api/sign/sign_list',
					method: 'POST',
					data: {
						start: 0,
						length: 7
					},
					success: function(res) {
						let arr = res.data.data.data;
						let arr1 = [];
						let len = arr.length;
						for (i = 0; i < arr.length; i++) {
							let date = new Date(Number(arr[i].time) * 1000);
							let YY = date.getFullYear();
							let MM = date.getMonth() + 1;
							let d = date.getDate();
							let itemTime = MM + '.' + d;
							that.signList.push(itemTime);
						}
						for (let j = 0; j < that.dateList.length; j++) {
							for (let k = 0; k < that.signList.length; k++) {
								if (that.signList[k] == that.dateList[j].time) {
									that.dateList[j].isSign = true;
								}
							}
						}
					}
				})

				/* return dates */
			},
			sign() {
				if (this.signTxt == "今日已签到") {
					return;
				}
				var _this = this;
				djRequest({
					url: '/api/sign',
					data: {},
					success: function(res) {
						if (res.data.status == 200) {
							common.TostUtil(res.data.message);
							_this.getDate();
							_this.signTxt = "今日已签到";
							// common.balance();
							(function() {
								djRequest({
									url: '/api/member/balance',
									method: 'GET',
									success: function(res) {
										if (res.data.status === 200) {
											config.balance = res.data.data;
											_this.signNum = config.balance.sign;
										}
									}
								})
							})()
						} else {
							common.TostUtil(res.data.message);
						}
					}
				})
			},
			switch1Change: function(e) {
				console.log('switch1 发生 change 事件，携带值为', e.target.value)
			},
		}
	}
</script>

<style>
	.eject {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		background: rgba(0, 0, 0, .5)
	}

	.box {
		width: 600upx;
		max-height: 580upx;
		background: #fff;
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		border-radius: 20upx;
	}

	.box>view {
		width: 560upx;
		margin: 0 auto;
	}

	.box>view:nth-child(1) {
		font-size: 32upx;
		color: #333;
		text-align: center;
		padding: 20upx 0;
	}

	.box>view:nth-child(2) {
		font-size: 28upx;
		color: #888;
		text-align: left;
		line-height: 2;
	}

	.box>view:nth-child(3) {
		font-size: 32upx;
		color: #CCA366;
		text-align: center;
		margin-top: 20upx;
		border-top: 2upx solid #f7f7f7;
		padding: 20upx 0;
	}

	.section1 {
		width: 750upx;
		height: 360upx;
		border-bottom-left-radius: 40upx;
		border-bottom-right-radius: 40upx;
		padding: 40upx 0;
		background: linear-gradient(#CEA15A, #F3CB84);
		text-align: center;
		position: relative;
	}

	.tip {
		width: 180upx;
		position: absolute;
		right: 0;
		top: 20upx;
		text-align: center;
		color: #fff;
		font-size: 28upx;
	}

	.date {
		font-size: 28upx !important;
		color: #888 !important;
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

	.section1 .want {
		color: #FF5533;
		font-size: 32upx;
		border: 1px solid #FF5533;
		border-radius: 16upx;
		padding: 10upx 40upx;
	}

	.section2 {
		position: relative;
		top: -80upx;
	}

	.section_title {
		color: #333333;
		font-size: 28upx;
		font-weight: bold;
		line-height: 3em;
		padding: 0 10upx;
	}

	.section_title switch,
	.section_title span {
		float: right;
		margin-right: 10upx;
	}

	.section_title switch {
		transform: scale(0.8);
	}
	.item {
		text-align: center;
		font-size: 24upx;
		color: #888888;
		font-weight: 500;
		background: #f9f9f9;
		border-radius:6upx;
		overflow:hidden;
		padding: 16upx 20upx 11upx 20upx;
	}
	.item image{
		width:40upx;
		height:40upx;
		margin-top:10upx;
	}
	.item .num {
		width: 70upx;
		height: 70upx;
		line-height: 70upx;
		margin: 0 auto;
		font-size: 32upx;
		background: #CCA366;
		color: #FFFFFF;
		border-radius: 35upx;
		text-align: center;
	}

	.point {
		width: 20upx;
		height: 20upx;
		margin: 10upx auto;
		border-radius: 10upx;
	}

	.red {
		background: #FF5533;
	}

	.green {
		background: #E6E6E6;
	}

	.line {
		height: 1px;
		background: #E6E6E6;
		width: 600upx;
		position: absolute;
		bottom: 58upx;
		left: 50upx;
		z-index: 0;
	}

	.signBtn {
		background: linear-gradient(180deg, #EA6F53, #D03C29);
		width: 270upx;
		height: 270upx;
		border-radius: 50%;
		color: #FFFFFF;
		line-height: 270upx;
		font-size: 32upx;
		text-align: center;
	}

	.tip .crl {
		display: inline-block;
		width: 30upx;
		height: 30upx;
		background: #fff;
		border-radius: 50%;
		text-align: center;
		line-height: 30upx;
		color: #CCA366;
		margin-left: 5upx;
	}
</style>
