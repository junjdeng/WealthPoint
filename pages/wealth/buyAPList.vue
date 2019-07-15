<template>
	<view class="container">
		<uni-segmented-control class="segmented" :current="current" :values="items" @clickItem="onClickItem" style-type="text"
		 active-color="#CCA366">
		</uni-segmented-control>

		<view class="content">
			<view>
				<view class="list">
					<view class="item" v-for="(temp,index) in list" :key="index" v-show="temp.type==='buy'">
						<view class="first">{{temp.orderId}}</view>
						<div class="tw">
							<view>{{temp.number}} <text>AP</text></view>
							<view>
								<!-- 待匹配 -->
								<view v-show="current===0">申请时间: {{temp.time | formatDate(1)}}</view>
								<!-- 待付款 -->
								<view v-show="current===1">匹配时间: {{temp.matchTime | formatDate(1)}}</view>
								<!-- 待确认 -->
								<view v-show="current===2">付款时间: {{temp.payTime | formatDate(1)}}</view>
								<!-- 待评价 -->
								<view v-show="current===3">确认时间: {{temp.confirmTime | formatDate(1)}}</view>
								<view v-show="current!==0">卖方会员: {{temp.sellerUsername}}</view>
							</view>
						</div>
						<view class="sum">
							<view>剩余时间：<text class='time'>{{temp.rever | formatLeftDate}}</text></view>
							<view>合计: <text class="money">{{temp.number * 2000 | yuan}}</text>元</view>
						</view>
						<view class="contect">
							<view @click="connect(temp,2)" v-show="current!==0"> 联系会员</view>
							<!--v-show="current!==0">  -->
							<view v-show="current===1" @click="showOrHid(temp.id)">上传凭证</view>
							<!--待付款v-show="current===1"-->
							<view v-show="current===2" :data-url="'OrderConfirm?id='+temp.id" @click="navTo">查看凭证</view>
							<!--待确认-->
							<view v-show="current===3" :data-url="'GoEvaluate?id='+temp.id" @click="navTo">去评价</view>
							<!--待评价-->
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="pop" v-show="showOrHide">
			<view class="pop-title">请上传付款凭证</view>
			<view class="chose">
				<input class="" @click="chooseImg" v-show="inputShow" ref="files" type="file" />
				<image v-show="gif" class="pop-img" src="/static/images/loading.gif"></image>
				<view class="place" v-show="proof">请点击上传付款凭证</view>
				<view class="txt" v-show="sucs">上传成功</view>
			</view>
			<view class="btns">
				<view class="lt" @click="submit">{{flag?'提交':'处理中'}}</view>
				<view class="rt" @click="cal">取消</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniSegmentedControl from "@/components/uni-segmented-control2/uni-segmented-control.vue"
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	import common from '../../common/common.js'
	import {
		config
	} from '../../common/config.js'
	import {
		djRequest,
		djPostForm
	} from '../../common/request.js'
	export default {
		data() {
			return {
				items: [{
						name: '待匹配',
						type:'match',
						num: 0
					},
					{
						name: '待付款',
						type:'pay',
						num: 0
					},
					{
						name: '待确认',
						type:'confirm',
						num: 0
					},
					{
						name: '待评价',
						type:'evaluate',
						num: 0
					},

				],
				current: 0,
				list: [],
				showOrHide: false, //弹出框显示或隐藏
				txtShowOrHide: true,
				url: '',
				imageFile: null,
				proof: true, //是否显示 text
				sucs: false, //是否显示‘上传成功提示’
				flag: true,
				gif: false,
				inputShow: true
			}
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: 'buyRecord'
			})
		},
		components: {
			uniSegmentedControl,
			uniLoadMore
		},
		onShow() {
			this.info('match');
			this.info('pay');
			this.info('confirm');
			this.info('evaluate');
			if (this.current == 0) {
				this.getList('match');
			} else if (this.current == 1) {
				this.getList('pay');
			} else if (this.current == 2) {
				this.getList('confirm');
			} else if (this.current == 3) {
				this.getList('evaluate');
			}

		},
		methods: {
			navTo(e) {
				uni.navigateTo({
					url: e.currentTarget.dataset.url
				})
			},
			showOrHid(id) {
				this.id = id;
				this.showOrHide = !this.showOrHide;
			},
			cal() {
				this.showOrHide = !this.showOrHide;
				this.proof = true;
				this.sucs = false;
				this.flag = true;
				this.gif = false;
				that.inputShow = true;
				this.$refs.files.value = null;
			},
			chooseImg() {
				let that = this;
				uni.chooseImage({
					sizeType: ['original', 'compressed'],
					sourceType: ['album'],
					count: 1,
					success: (imageFile) => {
						this.url = imageFile.tempFilePaths[0];
						var _this = this;
						that.gif = true;
						that.inputShow = false;
						that.proof = false;
						djPostForm({
							url: "/api/uploads",
							filePath: _this.url,
							fileType: 'image',
							name: 'files',
							success: function(result) {
								var res = JSON.parse(result.data);
								if (res.status == 200) {
									that.gif = false;
									that.sucs = true;
									_this.url = config.BASE_URL + res.data.filePath + res.data.fileName;
									_this.imageFile = res.data;
								} else {
									uni.showToast({
										title: res.data.message,
										icon: "none"
									})
								}
							}
						})
					}
				})
			},
			submit() { //确定提交
				let that = this;
				if (!common.isNotNull(that.url, "收款码图片")) return;

				if (that.flag) {
					var imageUrl = that.imageFile.filePath + that.imageFile.fileName;

					var data = {
						'payment_file': imageUrl,
						'Id': that.id
					}

					that.flag = false;
					djRequest({
						url: '/api/order/uniapp_payment',
						data: data,
						method: 'POST',
						success: function(res) {
							that.flag = true;
							that.showOrHide = !that.showOrHide;
							that.sucs = false;
							that.proof = true;
							that.inputShow = true;
							if (res.data.status === 200) {
								common.TostUtil(res.data.message);
								that.getList('pay');

							} else {
								common.TostUtil(res.data.message);
							}
						},
						fail: function(res) {
							common.TostUtil(res.data.message);
						}
					})

				}
			},
			info(idx) {
				let that = this;
				djRequest({
					url: '/api/order',
					method: 'POST',
					data: {
						start: 0,
						length: 50,
						status: idx,
						type: 'buy'
					},
					success: function(res) {
						let arr = res.data.data.data;
						let ars = [];
						that.items.forEach((item, index) => {
						  if (idx === item.type) {
							  arr.forEach(temp=>{
								  if(temp.type==='buy'){
									  ars.push(temp);
								  }
							  });
							  item.num = ars.length;
						  }
						});
					},
				})
			},
			/* 联系会员 */
			connect(temp, dist) {
				uni.navigateTo({
					url: 'connectMember?dist=' + dist + '&id=' + temp.id + '&personId=' + temp.sellerMemberId + '&type=' + temp.type
				})
			},
			onClickItem(index) {
				let that = this;
				let ars = ['match', 'pay', 'confirm', 'evaluate'];
				if (this.current !== index) {
					this.current = index;
					that.list = [];
					that.getList(ars[index]);
				}
			},
			//获取数据
			getList(idx) {
				let that = this;
				djRequest({
					url: '/api/order',
					method: 'POST',
					data: {
						start: 0,
						length: 50,
						status: idx,
						type: 'buy'
					},
					success: function(res) {
						that.list = [];
						if (res.data.status === 200) {
							if (res.data.data.data.length > 0) {
								let arr = res.data.data.data;
								let time24ms = 24 * 3600 * 1000;
								for (let i = 0; i < arr.length; i++) {
									let curOrder = arr[i];
									let orderTime
									if (idx === 'match') {
										orderTime = Number(curOrder.time) * 1000; //订单时间
									} else if (idx === 'pay') {
										orderTime = Number(curOrder.matchTime) * 1000; //匹配时间
									} else if (idx === 'confirm') {
										orderTime = Number(curOrder.payTime) * 1000; //付款时间
									} else if (idx === 'evaluate') {
										orderTime = Number(curOrder.confirmTime) * 1000 //确认时间
									}
									if (!curOrder.hasOwnProperty("rever")) {
										let orderOffsetTime = (Date.now() - orderTime) % time24ms;
										let orderStart = time24ms - orderOffsetTime;
										curOrder.rever = orderStart;
									}
									that.list = [];
									that.list = arr;
									that.getData(idx);
								}
							}
						}
					}
				})
			},
			getData(idx) {
				let that = this;
				let arrs = that.list;
				arrs.forEach(item => {
					if (that.orderTimer != null) {
						clearInterval(that.orderTimer);
					}
					that.orderTimer = setInterval(function() {
						item.rever -= 1000;
						if (item.rever <= 0) {
							item.rever = 24 * 3600 * 1000;
						}
					}, 1000)
				})
				that.list = arrs;
			},
		}
	}
</script>

<style>
	.container {
		position: relative;
	}

	.pop-img {
		width: 48upx;
		height: 48upx;
		margin: 10upx 252upx;
	}

	.txt {
		width: 50%;
		height: 100%;
		margin-left: 25%;
		color: #CCA366;
		font-size: 28upx;
		text-align: center;
		line-height: 80upx;
	}

	.pop {
		width: 600upx;
		height: 300upx;
		background: #fff;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		background: #fff;
		border-radius: 10px;
		margin: auto;
		box-shadow: 0 0 10upx #BEBEBE;
	}

	.pop-title {
		padding: 20upx 10upx 10upx;
		box-sizing: border-box;
		text-align: center;
		font-size: 32upx;
		color: #666;
	}

	.chose {
		width: 100%;
		height: 80upx;
		position: relative;
		box-sizing: border-box;
		margin-top: 20upx;
	}

	input[type='file'] {
		position: absolute;
		display: block;
		width: 50%;
		height: 100%;
		top: 0;
		left: 25%;
		z-index: 1000;
	}

	.btns {
		width: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		font-size: 28upx;
		margin-top: 30upx;
	}

	.btns>view {
		padding: 12upx 30upx;
		border-radius: 10upx;
		overflow: hidden;
		color: #fff;
	}

	.lt {

		background: #CCA366;
	}

	.rt {
		background: #ccc;
	}

	.place {
		width: 50%;
		height: 100%;
		margin-left: 25%;
		border: 1px solid #CCA366;
		color: #CCA366;
		border-radius: 12upx;
		font-size: 28upx;
		text-align: center;
		line-height: 80upx;
	}

	.segmented {
		background: #FFFFFF;
		width: 750upx;
		height: 68upx;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.list {
		margin-top: 20upx;
	}

	.list .item {
		background: #FFFFFF;
		width: 670upx;
		padding: 20upx;
		margin: 0 20upx 20upx 20upx;
		border-radius: 8upx;
		font-size: 28upx;
		line-height: 2em;
		color: #333333;
	}

	.list .item .first {
		color: #999999;
		border-bottom: 2upx solid #f7f7f7;
	}

	.list .item .date {
		float: right;
	}

	.list .item .time {
		color: #D03C29;
	}

	.contect {
		border-top: 2upx solid #f7f7f7;
		padding-top: 20upx;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.contect>view {
		width: 20%;
		text-align: center;
		padding: 5upx;
		background: #CCA366;
		border-radius: 6upx;
		color: #fff;
		overflow: hidden;
	}

	.contect>view+view {

		margin-left: 20upx;
	}

	.tw {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding: 10upx 0;
	}

	.sum {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.tw>view:first-child {
		width: 160upx;
		margin-right: 60upx;
		font-size: 60upx;
		color: #CCA366;
		text-align: center;
	}

	.tw>view:first-child text {
		font-size: 24upx !important;
		position: relative;
		bottom: 2upx;
	}

	.money {
		font-size: 40upx !important;
		font-weight: 600;
		margin: 0 10upx;
	}
</style>
