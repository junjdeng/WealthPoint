import Vue from 'vue'
import App from './App'
import './common/filter.js'


import './static/font/iconfont.css'
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
    ...App
})
import savefile from './components/saveFile/saveFile.vue'
Vue.component('savefile',savefile)
uni.getStorage({//如果存在sessionid则跳到首页，否则去登陆页
	key:'sessionid',
	success(e){
		//console.log(999);
		uni.switchTab({
			url:'pages/index/index'
		})
	},
	fail(e){
		//console.log(333);
		uni.navigateTo({
			url:'pages/login/login'
		})
	}
})
let times=null;
uni.getStorage({
	key:'time',
	success(e){
		times=JSON.parse(e.data)
	}
})/*  */
if(new Date().getTime()-times>(1000 * 60 * 60 * 24 * 7)){//大于七天清除本地存储
	uni.clearStorage();
	uni.navigateTo({
		url:'pages/login/login'
	})
}
app.$mount()
