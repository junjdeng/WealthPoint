import {djRequest} from './request.js'
import {config} from './config.js'

const isNotNull = function(text, title) {
	if (text == null || text == undefined || text.length == 0 || text == "" || text.replace(/\s+/g, '') == "") {
		uni.showToast({
			title: title + '不可为空',
			icon: 'none'
		});
		return false;
	}
	return true;
}

const isBankId = function(num) {
	var re = new RegExp(/^\d{16,19}$/);
	if (re.test(num)) {
		return true;
	} else {
		uni.showToast({
			title: '银行卡账号错误！',
			icon: 'none'
		});
		return false;
	}
}

const isTrueSellPw = function(text, result) {
	djRequest({
		url: '/api/member/verify_security',
		data: {
			"password": text
		},
		success: function(res) {
			result(res);
		}
	})
}

const getBalance = function(result) {
	djRequest({
		url: '/api/member/balance',
		method: 'GET',
		success: function(res) {
			if (res.data.status === 200) {
				config.Balance = res.data.data;
				result(res);
			}
		}
	})
}

const aa= function(ss){
	
	return ss+'hahah';
}



export default {
	isNotNull,
	isBankId,
	isTrueSellPw,
	getBalance,
	aa,
}
