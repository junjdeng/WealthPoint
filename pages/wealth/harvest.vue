<template>
	<view class="content">
		<view class="out" v-for="(item,index) in dataList" :key="index">
			<view>{{item.total}} AP</view>
			<view>分红天数:{{item.count}}天</view>
			<view class="comfire" :class="((item.count>=7)&&(item.flagTime))?'sel':''" @click="toGet(item.number,item.count,item.id)">提取</view>
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
				dataList: []
			}
		},
		onShow() {
			this.getData();
		},
		methods: {
			toGet(number, count, id) {
				let that = this;
				if ((count >= 7) && (number > 0)) { //若AP数量大于0并且生长天数大于等于最小收割天数，则表示可以提取
					djRequest({
						url: '/api/seed/harvest',
						method: 'POST',
						data: {
							Id: id
						},
						success: function(res) {
							if (res.data.status === 200) {
								that.getData();
							}
							common.TostUtil(res.data.message);
						}
					})

				} else if (number <= 0) { //否则不能提取
					common.TostUtil('暂无分红中的AP！');
				} else if (number < 7) {
					common.TostUtil('最低分红7天方可提取！');
				}
			},
			getData() {
				let that = this;
				
				djRequest({
					url: '/api/seed',
					method: 'POST',
					data: {
						start: 0,
						length: 500
					},
					success: function(res) {
						if (res.data.status === 200) {
							let arr1 = res.data.data.data,
								arr = [];
							arr1.forEach((item, index) => {
								if (item.status === 'growing') {
									arr.push(item);
								}
							});
							if (that.growTimer != null) {
								clearInterval(that.growTimer);
							}
							that.growTimer = setInterval(() => {
								for (let i = 0; i < arr.length; i++) {
									let curGrow = arr[i];
									let sowingTime = Number(curGrow.time) * 1000; //播种时间
									if (!curGrow.hasOwnProperty("sowingTime")) {
										let sowingOffsetTime = (Date.now() - sowingTime); //从播种到现在已经过去的毫秒时间
										if (!curGrow.hasOwnProperty('flagTime')) {
											curGrow.flagTime = false;
										}
										if (!curGrow.hasOwnProperty("count")) {
											curGrow.count = Math.floor(sowingOffsetTime / (1000 * 24 * 3600));
											if ((curGrow.count >= 7) && (curGrow.number > 0)) { //
												curGrow.flagTime = true;
												//提示可以收割
											} else {
												curGrow.flagTime = false;
											}
										}
									}
									if (!curGrow.hasOwnProperty('total')) {
										curGrow.total = (Number(curGrow.number) + Number(curGrow.harvestNumber)).toFixed(4);
									}
								}
								that.dataList = arr;
							}, 1000);
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
		margin-top: 2upx;
	}

	.out {
		width: 100%;
		padding: 20upx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #fff;
		font-size: 28upx;
		border-bottom:2upx solid #f7f7f7;
	}

	.comfire {
		width: 80upx;
		padding: 10upx 30upx;
		border-radius: 10upx;
		background: #ccc;
		color: #333;
		text-align: center;
		font-size: 28upx;
	}

	.sel {
		background: #CCA366;
		color: #fff;
	}
</style>
