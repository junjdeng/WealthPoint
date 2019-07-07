<template>
	<view class="uni-list">
		<radio-group @change="radioChange">
			<label class="uni-list-cell uni-list-cell-pd cell" v-for="(item, index) in items" :key="item.value" color="#CCA366">
				<view>
					<radio :value="item.value" :checked="index === current" color="#CCA366" />
				</view>
				<view class="text">{{item.name}}</view>
			</label>
		</radio-group>
		<view class="uni-btn-v" @click="submit()">
			<button>{{flag?'提交':'处理中...'}}</button>
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
				flag: true,
				items: [{
						value: '1',
						name: '1分'
					},
					{
						value: '2',
						name: '2分'
					},
					{
						value: '3',
						name: '3分'
					},
					{
						value: '4',
						name: '4分'
					},
					{
						value: '5',
						name: '5分',
						checked: 'true'
					}
				],
				current: 0,
				id: 0,
				val: 0
			}
		},
		methods: {
			radioChange: function(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						this.val = this.items[i].value;
						break;
					}
				}
			},
			onLoad(options) {
				this.id = options.id;
			},
			//提交
			submit() {
				let that = this;
				if (that.flag) {
					that.flag = false;
					djRequest({
						url: '/api/order/evaluate',
						method: 'POST',
						data: {
							Id: Number(that.id),
							score: Number(that.val)
						},
						success: function(res) {
							common.TostUtil(res.data.message);
							if (res.data.status === 200) {
								that.flag = true;
								setTimeout(function() {
									uni.navigateBack();
								}, 1000)
							}
						},
						fail: function(res) {
							common.TostUtil('网络错误,请稍后重试!')
							that.flag = true;
						}
					})
				}

			}
		}
	}
</script>

<style>
	.cell {
		display: flex;
		justify-content: flex-start;
		padding: 20upx;
		box-sizing: border-box;
		background: #fff;
		border-bottom: 2upx solid #f7f7f7;
	}

	.text {
		margin-left: 20upx;
	}

	.uni-btn-v {
		position: relative;
		top: 40upx;
		left: 20upx;
		width: 710upx;
	}

	.uni-btn-v button {
		background: #CCA366;
		font-size: 32upx;
		color: #ffffff;
	}
</style>
