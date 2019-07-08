<template>
	<view class="coms">
		<textarea class="area" v-model.trim="txt" placeholder="请输入您要投诉的内容" />
		<view class="submit" @click="submit">{{flag?'提交':'处理中...'}}</view>
	</view>
</template>

<script>
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	import common from '../../common/common.js'
	import {config} from '../../common/config.js'	
	import {djRequest} from '../../common/request.js'
	export default{
		data(){
			return {
				txt:'',
				flag:true,
				id:0,
				type:''
			}
		},
		onLoad(options){
			this.id = options.id;
			this.type = options.type;
		},
		methods:{
			submit () {
			  let that = this;
			  if(that.flag){
				  that.flag=false;
				if (that.txt === '') {
				  common.TostUtil('请输入您要投诉的内容！');
				  that.flag=true;
				  return;
				}	
				djRequest({
					url:'/api/order/complaint',
					method:'POST',
					data:{
						remark:that.txt,
						Id:that.id,
						type:that.type
					},
					success:function(res){
						console.log(res)
						if(res.data.status===200){
							that.txt='';
							that.flag=true;
							common.TostUtil(res.data.message);
						}else{
							common.TostUtil(res.data.message);
						}
						
					}
				})
			  }
      }
			
		}
	}
</script>

<style>
	.coms{
		width:710upx;
		margin:20upx 0 0 20upx;
		box-sizing:border-box;
	}
	.area{
		display:block;
		width:710upx;
		box-sizing:border-box;
		border:2upx solid #f7f7f7;
		border-radius:10upx;
		padding:20upx 10upx;
		font-size: 32upx;
		color:#333;
		background: #fff;
	}
	.submit {
		margin:40upx 0;
		width: 710upx;
		background: #CCA366;
		font-size: 32upx;
		color: #ffffff;
		text-align: center;
		height: 80upx;
		line-height: 80upx;
		box-sizing:border-box;
		border-radius:5upx;
	}
	
</style>
