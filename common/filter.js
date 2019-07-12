import Vue from 'vue'
//全局过滤器
Vue.filter('formatDate',function(value,type){
	let date = new Date(Number(value) * 1000);
        let YY = date.getFullYear();
        let MM = date.getMonth() + 1;
        let d = date.getDate();
        let h = date.getHours();
        let m = date.getMinutes();
        let s = date.getSeconds();
		MM = MM < 10 ? ('0' + MM) : MM;
		d = d < 10 ? ('0' + d) : d;
		 h = h < 10 ? ('0' + h) : h;
		m = m < 10 ? ('0' + m) : m;
		s = s < 10 ? ('0' + s) : s;
		switch(type){
			case 1:
			return YY + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
			break;
			case 2:
			return YY + '-' + MM + '-' + d;
			break;
			case 3:
			return h + ':' + m + ':' + s;
			break;
			case 4:
			return MM + '-' + d;
			break;
		}
})
Vue.filter('yuan',function(value){
	return isNaN(value) ? 0.00 : parseFloat(value).toFixed(2);
})
Vue.filter('formatLeftDate',function(value){
        let totalSeconds = value / 1000;
        let h = Math.floor(totalSeconds / (60 * 60));
        totalSeconds = totalSeconds - h * 60 * 60;
        let m = Math.floor(totalSeconds / 60);
        totalSeconds = totalSeconds - m * 60;
        let s = Math.floor(totalSeconds);

        h = h < 10 ? ('0' + h) : h;
        m = m < 10 ? ('0' + m) : m;
        s = s < 10 ? ('0' + s) : s;
        return ' ' + h + ':' + m + ':' + s
})
let formatDate=Vue.filter('formatDate');
let yuan = Vue.filter('yuan');
let formatLeftDate = Vue.filter('formatLeftDate');
export default{
	formatDate,
	yuan,
	formatLeftDate
}