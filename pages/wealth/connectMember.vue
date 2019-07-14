<template>
	<view class="content">
		<view class="main">
			<view class="main-top">
				<view class="img">
					<image src="../../static/images/ft.png"></image>
				</view>
				<view class="nick">
					<view>用户昵称: <text>{{buyerName}}</text></view>
					<view>性别: 保密</view>
				</view>
			</view>
			<!-- 个性签名 -->
			<view class="sign"><view>个性签名: </view><view class="self" :title="signature">{{signature}}</view></view>
			
			<!-- 投诉 -->
			<view class="bank" @click="complain"  v-show="dist==2">
				<view>帐户信息错误投诉</view>
			</view>
			<!-- 个人信息 -->
			<view class="aset" v-show="dist==1">
				<view class="realName-title">联系信息</view>
				<view class="realName-content">
					<view class="realName-item">
						<view>收款人</view>
						<view>{{realName}}</view>
						<view class="copy" @click="copy(realName)">复制</view>
					</view>
					<view class="realName-item">
						<view>联系电话</view>
						<view>{{phone}}</view>
						<view class="copy" @click="copy(phone)">复制</view>
					</view>
				</view>
			</view>
			<view v-show="dist==2">
				<!-- 银行信息 -->
				<view class="aset">
					<view class="realName-title">银行信息</view>
					<view class="realName-content" v-for="(item,index) in list" :key="index">
						<view class="realName-item">
							<view>收款人</view>
							<view>{{item.bankAccountName}}</view>
							<view class="copy" @click="copy(item.bankAccountName)">复制</view>
						</view>
						<view class="realName-item">
							<view>银行名称</view>
							<view>{{item.bankName}}</view>
							<view class="copy" @click="copy(item.bankName)">复制</view>
						</view>
						<view class="realName-item">
							<view>银行帐号</view>
							<view>{{item.bankNumber}}</view>
							<view class="copy" @click="copy(item.bankNumber)">复制</view>
						</view>
						<view class="realName-item">
							<view>开户行</view>
							<view>{{item.bankAddress}}</view>
							<view class="copy"  @click="copy(item.bankAddress)">复制</view>
						</view>
						<view class="realName-item">
							<view>联系电话</view>
							<view>{{phone}}</view>
							<view class="copy" @click="copy(phone)">复制</view>
						</view>
					</view>
				</view>
				<!-- 支付宝信息 -->
				<view class="aset" v-show="alipayList.length>0">
					<view class="realName-title">支付宝信息</view>
					<view class="realName-content">
						<view class="realName-item" v-for="(temp,index) in alipayList" :key="index" v-if="temp.name!==''">
							<view>帐号</view>
							<view>{{temp.name}}</view>
							<view class="copy" @click="copy(temp.name)">复制</view>
						</view>
					</view>
				</view>
				<!-- 二维码信息 -->
				<view class="code"  v-show="len>0"><!-- -->
					<view class="code-title" @click="showOrHide">二维码信息</view>
					<view class="had-card column" v-if="show">
						<view class="bg-pay-code-wx flex-justify-center column" :class="item.type==='alipay'?'aplay-pay-color':''" v-for="(item,index) in list2"
						 :key="index" v-if="(item.status==='yes')&&(item.images!=='http://api.wealth-point.com/')">
							<view class="wx-img-code">
								<img @click="saveImg(item.images)" :src="item.images" alt="">
							</view>
							<view v-if="item.type==='alipay'&&item.status==='yes'">扫-扫支付宝付款</view>
							<view v-if="item.type==='wechat'&&item.status==='yes'">扫-扫微信付款</view>
							<view v-if="item.status==='no'">已停用</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import common from '../../common/common.js'
	import "@/components/ican-clipBoard/ican-clipBoard.js"
	import { config } from '../../common/config.js'
	import { djRequest } from '../../common/request.js'
	export default {
		data() {
			return {
				buyerName: '', //买方会员的名字或昵称
				buyerSignature: '', //买方会员的个性签名
				phone: '',
				id: 0,
				dist: 1,
				signature:'',
				type: '',
				realName: '',
				personId: 0,
				list: [],
				list2: [],
				show: false,
				alipayList: [],
				isShowPhoto:false,
				len:0
			}
		},
		onLoad(options) {
			this.id = options.id;
			this.dist = options.dist;
			this.type = options.type;
			this.personId = options.personId;
		},
		onShow() {
			this.getUser();
			this.getInfo();
		},
		methods: {
			hidePhoto(){
				this.isShowPhoto=!this.isShowPhoto
			},
			saveImg(url) {//保存图片
				uni.showModal({
					content: '是否保存图片?',
					success: function(res) {
						if (res.confirm) {
							uni.downloadFile({
								url: url,
								success: (res) => {
									if (res.statusCode === 200) {
										uni.saveImageToPhotosAlbum({
											filePath: res.tempFilePath,
											success: function() {
												uni.showToast({
													title: "保存成功",
													icon: "none"
												});
											},
											fail: function() {
												uni.showToast({
													title: "保存失败，请稍后重试",
													icon: "none"
												});
											}
										});
									}
								}
							})
						}
					}
				})
			
			},
			copy(txt){
				uni.setClipboardData({
					data:txt
				})
			},
			/* 投诉 */
			complain(){
				let that = this;
				uni.navigateTo({
					url:'complaint?id='+that.id+'&type='+that.type
				})
			},
			getInfo() {
				let that = this;
				/*卖方会员的银行卡列表*/
				djRequest({
					url: '/api/bank/member',
					method: 'GET',
					data: {
						Id: Number(that.personId)
					},
					success: function(res2) {
						if (res2.data.status === 200) {
							that.list = res2.data.data;
						}
					}
				})

				//二维码
				djRequest({
					url: '/api/qrcode/member',
					method: 'GET',
					data: {
						Id: Number(that.personId)
					},
					success: function(res) {
						if (res.data.status === 200) {
							let arr = res.data.data;
							let as=[];
							arr.forEach(item => {
								if (item.images !== '') {
									item.images = 'http://api.wealth-point.com' + item.images
									as.push(item);
								}
								if (item.type === 'alipay') {
									that.alipayList.push(item);
								}
							});
							that.list2 = as;
							that.len=that.list2.length;
						}
					}
				})
			},
			showOrHide(){
        this.show=!this.show
      },
			getUser() {
				let that = this;
				djRequest({
					url: '/api/member',
					data: {
						Id: Number(that.personId)
					},
					method: 'GET',
					success: function(res) {
						if (res.data.status === 200) {
							that.buyerName = res.data.data.username;
							that.phone = res.data.data.phone;
							that.realName = res.data.data.realName;
							that.signature=res.data.data.signature;
						}
					}
				})
			}
		}
	}
</script>

<style>
	.aset>view {
		padding: 10px 0;
		border-bottom: 1px solid #f7f7f7;
	}

	.realName-item {
		width: 100%;
		box-sizing: border-box;
		margin-bottom: 10upx;
		padding: 8px 5px 8px 0;
	}

	.realName-item>view:first-child {
		margin-right: 10px;
		font-size: 14px;
		color: #000;
		font-weight: 500;
		width: 80px;
		display: inline-block;
	}

	.realName-item>view:nth-child(2) {
		font-size: 14px;
		display: inline-block;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
		vertical-align: middle;
		width: 60%;
		color: #333;
	}

	.copy {
		border: 1px solid #CCA366;
		padding: 3px 5px;
		color: #CCA366;
		border-radius: 4px;
		font-size: 14px;
	}

	/* main */
	.main {
		background: #fff;
		box-sizing: border-box;
		width: 100%;
		height: auto;
		padding: 10px 0;
	}

	.main-top {
		box-sizing: border-box;
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		padding: 5px 2%;
	}

	.img {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		overflow: hidden;
		margin-right: 10px;
	}

	.img image {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.nick>view:first-child {
		font-size: 14px;
		color: #000;
		font-weight: 500;
	}

	.nick>view:last-child {
		font-size: 12px;
		color: #666;
	}
	
	.aset,
	.sign,
	.bank {
		box-sizing: border-box;
		padding: 15px 2%;
		width: 100%;
	}
	.aset {
		padding: 0 2% 10px;
	}

	.sign {
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
	}

	.sign {
		color: #000;
		font-weight: bold;
		font-size: 16px;
		margin-right: 5px;
	}
.sign>view:first-child {
		width:25%;
	}

	.sign>view:last-child {
		font-size: 14px;
		display: inline-block;
		width: 70%;
		color: #333;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		word-break: break-all;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
	}

	.bank {
		padding: 10px 2%;
	}

	.bank view {
		width: 140px;
		height: 30px;
		font-size: 14px;
		border: 1px solid #CCA366;
		border-radius: 6px;
		line-height: 30px;
		margin: 0 auto;
		color: #CCA366;
		text-align: center;
	}

	.realName-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.code{
    border-top: 10px solid #f7f7f7;
    padding: 0 2% 10px;
  }
  .code-title{
    padding: 10px 0;
    border-bottom: 1px solid #f7f7f7;
    margin-bottom:10px;
    font-size:16px;
  }
  /* 有卡的时候 */
  .had-card {
    width: 100%;
    padding: 5px;
    height: auto;
    display:flex;
    box-sizing: border-box;
    justify-content: flex-start;
    align-items:center;
    margin: 0 auto;
    flex-wrap:wrap;
  }
  .hard-card>view{
    width:49%!important;
  }
  .bg-pay-code-wx {
    width:49%!important;
    height: 250px;
    background: #00AD47;
    border-radius: 5px;
    color: #fff;
    padding: 10px;
    margin-bottom:10px;
    box-sizing: border-box;
    text-align: center;
  }
  view.bg-pay-code-wx:nth-child(2n){
    margin-left:2%!important;
  }
  .bg-pay-code-wx image {
    width: 100%;
    height: 100%;
  }

  .aplay-pay-color {
    background: #0DA1E6;
  }

  .wx-img-code {
    width: 150px;
    height: 200px;
    margin: 0 auto 5px;
  }
</style>
