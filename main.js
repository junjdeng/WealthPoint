import Vue from 'vue'
import App from './App'
import './common/filter.js'
import './static/font/iconfont.css'
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
	...App
})
uni.getStorage({ //如果存在sessionid则跳到首页，否则去登陆页
	key: 'sessionid',
	success(e) {
		uni.switchTab({
			url: 'pages/index/index'
		})
	},
	fail(e) {
		uni.reLaunch({
			url: '/pages/login/login'
		})
	}
})
let times = null;
uni.getStorage({
	key: 'time',
	success(e) {
		times = JSON.parse(e.data)
	}
})
if (new Date().getTime() - times > (1000 * 60 * 60 * 24 * 3)) { //大于七天清除本地存储1000 * 60 * 60 * 24 * 3
	uni.clearStorage();
	uni.showToast({
		title: '登录状态已失效,请重新登录',
		icon: 'none'
	})
	setTimeout(function(){
		uni.reLaunch({
			url: '/pages/login/login'
		})
		
	}, 800)

}
app.$mount()
