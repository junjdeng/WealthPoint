<template>
	<view class="container">
		<view class="section">
			<view>周期剩余时间</view>
			<view class="reset_time">
				<span>{{restime.day}}</span>天
				<span>{{restime.hour}}</span>时
				<span>{{restime.muinite}}</span>分
			</view>
			<view>承租次数</view>
			<view class="title wpred">{{dealCounts}}次</view>
		</view>
		
		<view class="form_wrap">
			<form class="dj_form" @submit="formSubmit">
				<view class="uni-form-item uni-column flex-start">
					<span class="flex2 title">承租数量</span>
					<input class="uni-input flex5" name='number' type="number" :value="number" @input="onKeyInput" />
				</view>
				
				<view class="uni-form-item uni-column flex-start">
					<span class="flex2 title">支付金额</span>
					<input class="uni-input flex5" type="number" disabled  :value="number*2000" />
				</view>
				
				<view class="uni-form-item uni-column flex-start">
					<span class="flex2 title">安全密码</span>
					<input class="uni-input flex5" name="password" type="password" placeholder="请输入六位安全密码" />
				</view>
				
				<view class="uni-btn-v">
					<button formType="submit">完成</button>
				</view>
			</form>
		</view>
		
	</view>
</template>

<script>
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	import {djRequest} from '../../common/request.js'
	import {config} from '../../common/config.js'
	import common from '../../common/common.js'
	export default {
		data() {
			return {
				restime:{},
				dealCounts:0,
				number:1
			}
		},
		components: {
			uniIcon
		},
		onLoad(){
		  let endTime=((new Date().getTime())/1000 - Number(config.User.activationTime));//当前减去激活时间，得出到现在为止已经过去了多久时间；
		  let remain = Math.floor(240*60*60 - endTime%(240*60*60))
	      let d = Math.floor(remain / (60 * 60 * 24));
		  let h = Math.floor((remain - d * 24 * 60 * 60) / 3600);
		  let m = Math.floor((remain - d * 24 * 60 * 60 - h * 3600) / 60);
		  let dd=d.toString().split('');
		  dd=dd[dd.length-1];
		  this.restime = {
			  'day':this.PrefixInteger(dd,2),
			  'hour':this.PrefixInteger(h,2),
			  'muinite':this.PrefixInteger(m,2),
		  }
		    var _this = this;
			djRequest({
				url:'/api/order',
				data:{
					start: 0,
					length: 200,
					status: 'finish',
					type: 'buy'
				  },
				success:function(res) {
					//console.log(res);						
					if (res.data.status == 200){
						 let arr=res.data.data.data;
						 let n = Math.floor((((new Date().getTime())/1000 - Number(config.User.activationTime))/(240*60*60)));
						 let end = Number((config.User.activationTime)+(240*60*60)*n);
						 var count = 0;
						  arr.forEach((item,index)=>{
							  if(item.type==='buy'){
								if(Number(item.payTime)>Number(end)){
								  count++;
								}
							  }
						  });
						  _this.dealCounts = count;
					}	
				}
			})		
		},		
		methods: {
			PrefixInteger(num, n) {
				return (Array(n).join(0) + num).slice(-n);
			},
			onKeyInput: function(event) {
				this.number = event.target.value
			},
			formSubmit: function(e) {
				//表单校验
				var data = e.detail.value;
				if (!common.isNotNull(data.number, "承租数量")) return;
				if (data.number < 1){
					uni.showToast({
						title:'最少承租1AP！',
						icon:"none"
					})
					return;
				}
				if (data.number > 10){
					uni.showToast({
						title:'单次承租数量不能大于10个！',
						icon:"none"
					})
					return;
				}
				if (data.number % 0.25 !=0){
					uni.showToast({
						title:'单次承租数量必须为0.25的整数倍！',
						icon:"none"
					})
					return;
				}
				if (!common.isNotNull(data.password, "安全密码")) return;	
							
				var _this = this;
				console.log('---');
				common.isTrueSellPw(data.password,function(res){
					console.log(res);
					if (res.data.status == 200) {
						_this.buyAP(data);
					} else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				});	
            },			
			buyAP:function(data){
				djRequest({
					url:"/api/order/buy",
					data:data,
					success:function(res) {	
						console.log(res);
						if (res.data.status == 200){
							   uni.showToast({
								title:res.data.message,
								icon:"none",
								duration:1000,
								success() {
									uni.navigateBack()
								}
							   })
						}else{
							uni.showToast({
								title:res.data.message,
								icon:"none"
							})
						}	
					}
				})					
			}			  
		}
	}
</script>

<style>
.section{text-align: center; color: #999999; padding: 20upx 0; font-size: 28upx; line-height: 2em;}
.section .title{font-size: 32upx; }
.section .reset_time{ margin: 40upx 0;}
.section .reset_time span{font-size: 64upx;line-height: 1.6em; background: #D03C29; color: #FFFFFF; border-radius: 8upx; 
padding: 5upx 10upx; margin: 0 10upx;}

.form_wrap{ margin-top: 20upx;}
.form_wrap .dj_form{display: inline-block; width: 750upx;position: relative;}
.dj_form .uni-form-item{ margin-bottom: 2upx; padding: 20upx; background: #ffffff;}
.dj_form .uni-form-item .title{color: #333333; font-size: 28upx; line-height: 2em;}
.dj_form .uni-input{color: #333333; font-size: 28upx;  text-align: left;}
.dj_form .uni-btn-v{position: absolute; bottom: -200upx; left: 20upx; width: 710upx; }
.dj_form .uni-btn-v button{background: #CCA366; font-size: 32upx; color: #ffffff;}
</style>
