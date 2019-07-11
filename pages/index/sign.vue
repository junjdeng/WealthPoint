<template>
	<view class="container">
		<view class="section1">
			<view class="title">云积分</view>
			<view class="num wpgold">{{signNum}}</view>
			<span class="want" data-url="exchange" @tap="navTo">兑换AP</span>
		</view>

		<view class=" section section2">
			<!-- <switch checked @change="switch1Change" color="#CCA366" /><span>签到提醒</span> -->
			<view class="section_title">签到日历</view>
			<view class="list flex-start">
				<view class="flex1 item">
					<view class="num" :class="signList[1] ? '':'cover'">+{{signList[1] ? signList[1].integral : '5'}}</view>
					<view class="point"></view>
					<view calss="date">昨天</view>
				</view>
				<view class="flex1 item" :class="signList[0] ? '':'cover'">
					<view class="num">+{{signList[0] ? signList[0].integral : '5'}}</view>
					<view class="point"></view>
					<view calss="date">今天</view>
				</view>
				<view class="flex1 item cover">
					<view class="num">+5</view>
					<view class="point"></view>
					<view calss="date">明天</view>
				</view>
				<view class="flex1 item cover">
					<view class="num">+5</view>
					<view class="point"></view>
					<view calss="date">05.20</view>
				</view>
				<view class="flex1 item cover">
					<view class="num">+5</view>
					<view class="point"></view>
					<view calss="date">05.20</view>
				</view>
				<view class="flex1 item cover">
					<view class="num">+5</view>
					<view class="point"></view>
					<view calss="date">05.20</view>
				</view>
				<view class="flex1 item cover">
					<view class="num">+5</view>
					<view class="point"></view>
					<view calss="date">05.20</view>
				</view>
			</view>
			<!-- <view class="line"></view> -->
		</view>

		<view class="signBtn" @tap="sign">{{signTxt}}</view>

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
				dateList: []
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
			navTo(e) {
				uni.navigateTo({
					url: e.currentTarget.dataset.url
				})
			},
			getDate() {
				var currentDate = new Date()
				var timesStamp = currentDate.getTime();
				var currenDay = currentDate.getDay();
				var dates = [];
				for (var i = 0; i < 7; i++) {
					let item = (new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 6) % 7)).toLocaleDateString().replace(
						/\//g, '.')).slice(5)
					dates.push(item);
				}
				console.log(dates)
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
						console.log(res);
						if (res.data.status == 200) {
							common.TostUtil(res.data.message);
							_this.signTxt = "今日已签到";
							common.balance();
							setTimeout(function() {
								_this.signNum = config.balance.sign;
							}, 300)

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
	.section1 {
		width: 750upx;
		height: 360upx;
		border-bottom-left-radius: 40upx;
		border-bottom-right-radius: 40upx;
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
		font-size: 12upx;
		color: #333333;
		padding: 20upx 0;
	}

	.item.cover {
		opacity: 0.3;
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

	.item .point {
		width: 20upx;
		height: 20upx;
		margin: 10upx auto;
		border-radius: 10upx;
		background: #FF5533;
		z-index: 100;
	}

	.item.cover .point {
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
</style>
