<template>
	<view class="out">
		<view class="content">
			<view>
				<text>道具:</text><text>{{text}}</text>
			</view>
			<view>
				<text>售价:</text><text>{{price}} Ap</text>
			</view>
			<view>
				<text>购买数量:</text><text>1 张</text>
			</view>
			<view>
				<text>付款钱包:</text><label @click="change" class="radio">
					<radio value="ecash" :checked="!sel" color="#CCA366" />希望钱包</label>
				<label @click="change" class="radio">
					<radio value="bonus" :checked="sel" color="#CCA366" />奖金钱包</label>
			</view>
			<view class="intro">
				<view>*使用说明</view>
				<view v-if="id==0">
					1.只适用于本账号<br>
					2.有交易中的买入或卖出订单都不能改。如果是为了方便和对方联系，可在个性签名处备注常用电话
				</view>
				<view v-if="id==1">
					1.只适用于本账号<br>
					2. 账号如果有待匹配或未完成的卖出订单，不能使用<br>
					3.使用后，银行账号和支付宝 二维码会被清空，需要完善后才可以卖出AP
				</view>
				<view v-if="id==2">
					1.适用于领导人为伞下会员解封<br>
					2.适用于一个计时周期未排单被封号的账号
				</view>
				<view v-if="id==3">
					1.适用于领导人为伞下会员解封<br>
					2.适用于超时不打款和上传假凭证被封的账号
				</view>
			</view>
		</view>
		<view class="uni-btn-v" @click="submit">
			<button>{{flag?"提交":"处理中..."}}</button>
		</view>
	</view>
</template>

<script>
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	import common from '../../common/common.js'
	import {
		config
	} from '../../common/config.js'
	import {
		djRequest
	} from '../../common/request.js'
	export default {
		data() {
			return {
				text: '',
				price: 0,
				id: 0,
				selName: '',
				sel: false,
				source: 'ecash',
				flag: true
			}
		},
		onLoad(options) {
			this.text = options.text;
			this.price = options.price;
			this.id = options.id;
			this.selName = options.name;
		},
		methods: {
			change() { //选择钱包
				this.sel = !this.sel;
				if (this.sel) {
					this.source = "bonus";
				} else {
					this.source = "ecash";
				}
			},
			submit() {
				let that = this;
				uni.showModal({
					title: '购买',
					content: '确定购买1张' + that.text + '?',
					success: function(res) {
						if (res.confirm) {
							if (that.flag) {
								that.flag = false;
								djRequest({
									url: '/api/gift/buy',
									method: 'POST',
									data: {
										name: that.selName,
										source: that.source,
										quantity: 1
									},
									success: function(res) {
										common.TostUtil(res.data.message);
										that.flag = true;
										if (res.data.status === 200) {
											common.balance();
											setTimeout(function() {
												uni.navigateTo({
													url: 'mine7Cards'
												})
											}, 1000)

										}
									}
								})
							}
						}
					}
				})

			}
		}
	}
</script>

<style>
	.content {
		width: 100%;
		height: 100%;
		background: #fff;
		box-sizing: border-box;
		padding: 4%;
		font-size: 28upx;
		color: #333;
	}

	.content>view {
		width: 100%;
		padding: 20upx 0;
	}

	.content>view>text:first-child {
		margin-right: 20upx;
	}

	.content>view+view {
		border-top: 2upx solid #f7f7f7;
	}

	.intro>view:first-child {
		font-size: 28upx !important;
		color: #e4393c;
	}

	.intro>view+view {
		font-size: 20upx !important;
		line-height: 1.8;
	}

	.uni-btn-v {
		width: 94%;
		margin: 30upx auto;
		background: #CCA366;
		color: #fff;
		border-radius: 10upx;
		overflow: hidden;
	}

	.uni-btn-v button {
		background: #CCA366;
		border: none;
		outline: none;
		color: #fff;

	}

	.uni-radio-wrapper {
		transform: scale(0.5)
	}

	label {
		margin-right: 10upx;
	}
</style>
