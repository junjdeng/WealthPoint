import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
Vue.filter('dateTimeFormat', function (value,fmt) {
	if (!value) return '' 
	let dateTime = new Date(Number(value) * 1000);
	var o = {   
    "M+" : dateTime.getMonth()+1,                 //月份   
    "d+" : dateTime.getDate(),                    //日   
    "h+" : dateTime.getHours(),                   //小时   
    "m+" : dateTime.getMinutes(),                 //分   
    "s+" : dateTime.getSeconds(),                 //秒   
    "q+" : Math.floor((dateTime.getMonth()+3)/3), //季度   
    "S"  : dateTime.getMilliseconds()             //毫秒   
  };
	 
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (dateTime.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;
})

Vue.filter('ressetTimeFormat', function (value,circle,fmt) {	
		let endTime=((new Date().getTime())/1000 - Number(value));//当前减去激活时间，得出到现在为止已经过去了多久时间；
		let remain = Math.floor(circle*60*60 - endTime%(circle*60*60))
		let d = Math.floor(remain / (60 * 60 * 24));
		let h = Math.floor((remain - d * 24 * 60 * 60) / 3600);
		let m = Math.floor((remain - d * 24 * 60 * 60 - h * 3600) / 60);
		let dd=d.toString().split('');
		dd=dd[dd.length-1];
    return (Array(2).join(0) + dd).slice(-2)+'天'+(Array(2).join(0) + h).slice(-2)+'小时'+(Array(2).join(0) + m).slice(-2)+'分';
})

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
