<template>
	<view class="container">
		<view class="form_wrap">
			<form class="dj_form" @submit="pwd">
				<view class="uni-form-item uni-column flex-start">
					<span class="flex2 title">买入数量:</span>
					<input class="uni-input" hidden disabled :value="array[index]" />
					<picker class="flex5" @change="bindPickerChange2" :value="index2" :range="array2">
						<view class="uni-input">{{ array2[index2] }} pcs</view>
					</picker>
					<uni-icon type="forward" class="forward " size="20" color="#999999"></uni-icon>
				</view>

				<view class="uni-form-item uni-column flex-start">
					<span class="flex2 title">时间间隔:</span>
					<input class="uni-input" hidden disabled :value="array[index]" />
					<picker class="flex5" @change="bindPickerChange" :value="index" :range="array">
						<view class="uni-input">{{ array[index] }} H</view>
					</picker>
					<uni-icon type="forward" class="forward" size="20" color="#999999"></uni-icon>
				</view>
				<view class="uni-form-item uni-column flex-start">
					<span class="flex2 title">安全密码:</span>
					<input class="uni-input flex5" type="password" v-model="safePwd" placeholder="六位安全密码" />
				</view>
				<view class="uni-form-item uni-column flex-start">
					<span class="flex2 title">是否开启:</span>
					<switch v-if="sel" checked color="#CCA366" @change="switch1Change" />
					<switch v-else color="#CCA366" @change="switch1Change" />
				</view>
				<view class="uni-btn-v">
					<button formType="submit">{{ flag ? '提交' : '正在处理中...' }}</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
import uniIcon from '@/components/uni-icon/uni-icon.vue';
import common from '../../common/common.js';
import { config } from '../../common/config.js';
import { djRequest, djPostForm } from '../../common/request.js';
export default {
	data() {
		return {
			array: [72,96,120,144],
			array2: [2, 4, 6, 8, 10],
			index: 0,
			index2: 0,
			flag: true,
			safePwd: '',
			sel: false,
			status: 'no',
			txt:''
		};
	},
	components: {
		uniIcon
	},
	onShow() {
		let that = this;
		djRequest({
			url: '/api/automation/index',
			method: 'GET',
			success: function(res) {
				if (res.data.status === 200) {
					if (res.data.data.status) {
						that.status = res.data.data.status;
						if (res.data.data.status === 'yes') {
							that.sel = true;
							let numsel=Number(res.data.data.number).toFixed(0);
							let timesel=Number(res.data.data.interval_time/3600).toFixed(0);
							that.array2.forEach((item,index)=>{
								if(numsel==that.array2[index]){
									that.index2=index;
								}
							})
							that.array.forEach((item,index)=>{
								if(timesel==that.array[index]){
									that.index=index;
								}
							})
						} else {
							that.sel = false;
						}
					}else{
						that.txt=res.data.message;
					}
				}
			}
		});
	},
	created() {},
	methods: {
		switch1Change: function(e) {
			let that = this;
			if (e.target.value) {
				that.status = 'yes';
			} else if (!e.target.value) {
				that.status = 'no';
			}
		},
		bindPickerChange: function(e) {
			this.index = e.target.value;
		},
		bindPickerChange2: function(e) {
			this.index2 = e.target.value;
		},
		pwd() {
			let that = this;
			if (that.safePwd === '') {
				common.TostUtil('请输入安全密码！');
				return;
			}
			if (that.status === 'no') {
				common.TostUtil('请点击开启按钮');
				return;
			}
			if(that.txt!=='尚未设置'){
				common.TostUtil('已经设置，不能更改与关闭');
				return;
			}
			uni.showModal({
				title:'是否开启自动买入?',
				content: '一旦开启将不能更改与关闭。',
				success: function(res) {
					if (res.confirm) {
						djRequest({
							//校验安全密码
							url: '/api/member/verify_security',
							data: {
								password: that.safePwd
							},
							success: function(res) {
								if (res.data.status === 200) {
									//安仔密码正确可以买入；
									that.formSubmit();
								} else {
									//错误提示用户信息
									common.TostUtil(res.data.message);
									return;
								}
							},
							fail: function(res) {
								that.safePwd = '';
							}
						});
					}
				}
			});
		},
		formSubmit() {
			//确定提交
			let that = this;
			if (that.flag) {
				that.flag = false;
				djRequest({
					url: '/api/automation/setting',
					data: {
						number: Number(that.array[that.index]),
						interval_time: Number(that.array2[that.index2]),
						status: that.status
					},
					method: 'POST',
					success: function(res) {
						that.flag = true;
						if (res.data.status === 200) {
							if(that.status=='yes'){
								common.TostUtil('自动买入设置已开启')
							}else if(that.status=='no'){
								common.TostUtil('自动买入设置已关闭');
							}
							
							/* uni.navigateBack(); */
						} else {
							common.TostUtil(res.data.message);
						}
					},
					fail: function(res) {
						common.TostUtil(res.data.message);
					}
				});
			}
		}
	}
};
</script>

<style>
.form_wrap {
	margin-top: 20upx;
}
.form_wrap .dj_form {
	display: inline-block;
	width: 750upx;
	position: relative;
}
.dj_form .uni-form-item {
	margin-bottom: 2upx;
	padding: 20upx;
	background: #ffffff;
}
/* .dj_form .uni-form-item image{width:100upx; height: 100upx; border-radius: 50upx;} */
.dj_form .uni-form-item .title {
	color: #333333;
	font-size: 28upx;
	line-height: 2em;
}
.dj_form .uni-input {
	color: #333333;
	font-size: 28upx;
	text-align: right;
}
.dj_form .uni-btn-v {
	position: absolute;
	bottom: -200upx;
	left: 20upx;
	width: 710upx;
}
.dj_form .uni-btn-v button {
	background: #cca366;
	font-size: 32upx;
	color: #ffffff;
}
.dj_form .uni-form-item .forward {
	text-align: right;
}
.getImg {
	width: 160upx;
	height: 160upx;
	border: 1px solid #f7f7f7;
	position: relative;
	margin-left: 40upx;
	background-image: url('./../../static/images/bgs.png');
	background-size: 100% 100%;
}
.getImg input {
	display: block;
	width: 100%;
	height: 100%;
	opacity: 1;
	position: absolute;
	left: 0;
	top: 0;
	z-index: 100;
}
.showImg {
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
	z-index: 99;
}
.showImg image {
	width: 100%;
	height: 100%;
	object-fit: cover;
}
</style>
