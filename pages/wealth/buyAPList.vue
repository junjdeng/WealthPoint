<template>
	<view class="container">
		 <uni-segmented-control class="segmented" :current="current" 
		 :values="items" 
		 @clickItem="onClickItem" 
		 style-type="text" active-color="#CCA366">
		 </uni-segmented-control>
		 
        <view class="content">
            <view v-show="current === 0">
				<view class="list">
					<view class="item" v-for="item in list" :key="item.id">
						<view class="first">{{item.orderId}}<span class="date">{{item.time | dateTimeFormat('yyyy-MM-dd')}}</span></view>
						<view>交易数量：{{item.number}}</view>
						<view>合计：{{item.number * 2000}}</view>
						<view>匹配剩余时间：<span class='time'>{{item.time | ressetTimeFormat(24,'dd天hh小时mm分')}}</span></view>
					</view>
				</view>
            </view>
            <view v-show="current === 1">
                <view class="list">
					<view class="item" v-for="item in list" :key="item.id">
						<view class="first">{{item.orderId}}<span class="date">{{item.time | dateTimeFormat('yyyy-MM-dd')}}</span></view>
						<view>交易数量：{{item.number}}</view>
						<view>合计：{{item.number * 2000}}</view>
						<view>剩余时间：<span class='time'>{{item.matchTime | ressetTimeFormat(24,'dd天hh小时mm分')}}</span></view>
					    <view class="btngroup flex-start">
							<view class="actionBtn flex1">联系会员</view>
							<view class="actionBtn flex1">上传付款凭证</view>
						</view>
					</view>
				</view>
            </view>
            <view v-show="current === 2">
                <view class="list">
					<view class="item" v-for="item in list" :key="item.id">
						<view class="first">{{item.orderId}}<span class="date">{{item.time | dateTimeFormat('yyyy-MM-dd')}}</span></view>
						<view>交易数量：{{item.number}}</view>
						<view>合计：{{item.number * 2000}}</view>
						<view>匹配剩余时间：<span class='time'>3天9小时24分</span></view>
						 <view class="btngroup flex-start">
							<view class="actionBtn flex1">联系会员</view>
							<view class="actionBtn flex1">查看付款凭证</view>
						</view>
					</view>
				</view>
            </view>
			<view v-show="current === 3">
                <view class="list">
					<view class="item" v-for="item in list" :key="item.id">
						<view class="first">{{item.orderId}}<span class="date">{{item.time | dateTimeFormat('yyyy-MM-dd')}}</span></view>
						<view>交易数量：{{item.number}}</view>
						<view>合计：{{item.number * 2000}}</view>
						<view>匹配剩余时间：<span class='time'>3天9小时24分</span></view>
						<view class="btngroup flex-start">
							<view class="actionBtn flex1">联系会员</view>
							<view class="actionBtn flex1">去评价</view>
						</view>
					</view>
				</view>
            </view>
        </view>
		
	</view>
</template>

<script>
	import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue"
	import {djRequest} from '../../common/request.js'
	import {config} from '../../common/config.js'
	import common from '../../common/common.js'
	
	export default {
		data() {
			return {
				items: ['待匹配','待付款','待确认','待评价'],
				itemStatus:['match','pay','confirm','evaluate'],
				current: 0,
				list:[],
			}
		},
		components: {
			uniSegmentedControl
		},
		onLoad() {	
			this.getListData();			
		},
		methods: {
			onClickItem(index) {
				if (this.current !== index) {
					this.current = index;
				}
				this.list = [];
				this.getListData();				
			},
			getListData(){
				var _this = this;
				djRequest({
					url:"/api/order",
					data:{
						'start':0,
						'length':100,
						'status':_this.itemStatus[_this.current],//finish：已完成订单,fail：失败订单,cancel：已取消
						'type':'buy',	//buy:买入 sell:卖出						
					},
					success:function(res) {
						console.log(res);
						if (res.data.status == 200){
							  _this.list = res.data.data.data;  
						}	
					}
				})		
			},
		}
	}
</script>

<style>
.segmented{background: #FFFFFF; width: 750upx; height: 68upx;}
.list{margin-top: 20upx;}
.list .item{background: #FFFFFF; width: 670upx; padding: 20upx; margin: 0 20upx 20upx 20upx; 
border-radius: 8upx; font-size: 28upx; line-height: 2em; color: #333333;}
.list .item .first{color: #999999;}
.list .item .date{float: right;}
.list .item .time{color: #D03C29;}
.btngroup{text-align: center;}
.btngroup .actionBtn{border:1px solid #d5d5d5; border-radius: 8upx; margin: 10upx;}
</style>
