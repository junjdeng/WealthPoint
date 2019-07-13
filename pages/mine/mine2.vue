<template>
	<view class="container">
		<view class="section1">
			<view class="title">当前云用户等级</view>
			<view class="num wpgold">{{dj}}</view>
			<span class="flex1 want" data-url="buyAP" @tap="navTo">等级规则</span>
		</view>

		<view class="section2">
			<view class="section_title">我的云用户</view>

			<view class="tree_wrap">
				<view class="tree_first">
					<view class="tree_first_title tree_txt" @tap="clickTree(treeData)" >
						<uni-icon :type="treeData.isShow" class="forward" size="16" color="#999999"></uni-icon>{{treeData.username}} ({{treeData.levelName}})
					</view>
					<view class="tree_second" v-if="treeData.isShow=='minus-filled'" v-for="(item, index) in treeData.subData" :key="index">
						<view class="tree_second_title tree_txt" @tap="clickTree(item)">
							<uni-icon :type="item.isShow" class="forward" size="16" color="#999999"></uni-icon>{{item.username}} ({{item.levelName}})
						</view>
						<view class="tree_third tree_txt" v-if="item.isShow=='minus-filled'" v-for="(item11, index11) in item.subData"
						 :key="index11">{{item11.username}} ({{item11.levelName}})</view>
					</view>
				</view>
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
				dj: config.User.levelName,
				treeData: [],
			}
		},
		components: {
			uniIcon
		},
		onLoad() {
			let that = this;
			djRequest({
				url: '/api/network',
				method: 'GET',
				success: function(res) {
					if (res.data.status == 200) {
						console.log(res)
						var orignData = res.data.data;
						orignData.isShow = 'plus-filled';
						for (var i = 0; i < orignData.subData.length; i++) {
							var obj = orignData.subData[i];
							obj.isShow = 'plus-filled';
						}
						that.treeData = orignData;
						//console.log(that.treeData);
					}
				}
			})
		},
		methods: {
			clickTree(item) {
				if (item.isShow == 'plus-filled') {
					item.isShow = 'minus-filled';
				} else {
					item.isShow = 'plus-filled';
				}
			}
		}
	}
</script>

<style>
	.section1 {
		width: 750upx;
		padding: 40upx 0;
		background: linear-gradient(137deg, #CEA15A, #F3CB84);
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
		color: #FFFFFF;
		font-size: 32upx;
		border: 1px solid #FFFFFF;
		border-radius: 16upx;
		padding: 10upx 30upx;
		margin: 0 40upx;
	}

	.section_title {
		color: #333333;
		font-size: 28upx;
		font-weight: bold;
		line-height: 2em;
	}

	.section2 {
		margin: 20upx;
		width: 710upx;
	}

	.tree_wrap {
		font-size: 14px;
		color: #888888;
		margin-top: 20upx;
		padding: 10upx;
		background: #ffffff;
		line-height: 28upx;
	}

	.tree_wrap .tree_first {position:relative;z-index:1}

	.tree_wrap .tree_first_title {
		
	}

	.tree_wrap .tree_second {
		position:relative;
		z-index:10;
	}

	.tree_wrap .tree_second_title {
		text-indent: 1em;
	}
	.tree_wrap .tree_second_title::before{
		position:absolute;
		content:'';
		width:2upx;
		height:calc(100%);
		background: #999999;
		top:-10upx;
		left:16upx;
	}
	.tree_wrap .tree_second::before {
		position:absolute;
		content:'';
		width:44upx;
		height:2upx;
		background: #999999;
		top:24upx;
		left:16upx;
	}
	.tree_wrap .tree_second::after {
		position:absolute;
		content:'';
		width:2upx;
		height:30upx;
		background: #999999;
		top:24upx;
		left:-60upx;
		z-index:100;
	}
	.tree_wrap .tree_third {
		text-indent: 4em;
		position:relative;
	}
	.tree_wrap .tree_third::before {
			position:absolute;
			content:'';
			width:40upx;
			height:calc(86%);
			background: transparent;
			top:-30%;
			left:70upx;
			z-index:1;
			border-left:2upx solid #999999;
			border-bottom:2upx solid #999999;
			
		}
	.tree_wrap .tree_txt {
		padding: 10upx 0;
	}
</style>
