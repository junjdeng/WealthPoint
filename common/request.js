import {
	config
} from './config.js'
if (config.Authorization == null) {
		 getAuth();
		
	} else {
		
	}
const djRequest = async function(opt) {
	
	var login;
	
	uni.getStorage({
		key: 'login',
		success: function(e) {
			login=e.data
		}
	})
	
	if (login) {
		text(opt)

	} else {
		console.log('进来')
		uni.getStorage({
			key: 'loginInfo',
			success: function(e) {
				if (!e.data) {
					uni.reLaunch({
						url: '/pages/login/login'
					});
					setTimeout(() => {
						return
					}, 20)
				} else {
					text()
				}
			}
		})
	}
}

function text(opt) {
	opt = opt || {};
	opt.url = opt.url || '';
	opt.data = opt.data || null;
	opt.method = opt.method || 'POST';
	opt.header = opt.header || {
		'content-type': 'application/x-www-form-urlencoded',
		'sessionid':config.User.sessionId
	};
	opt.success = opt.success || function() {};
	var first;
		uni.getStorage({
			key: 'login',
			success: function(e) {
				first=e.data
			}
		})
	// if (config.User != null) {
		if(!first){
			opt.header.sessionid = config.User.sessionId;
		}
	// }

	if (config.Authorization == null) {
		 getAuth();
		opt.header.authorization = config.Authorization;
	} else {
		opt.header.authorization = config.Authorization;
	}

	uni.request({
		url: config.BASE_URL + opt.url + '?t=' + Date.now(),
		data: opt.data,
		header: opt.header,
		method: opt.method,
		success: (res) => {
			if (res.data.status === 200) {
				opt.success(res);
				console.log('444')
			}else{
				console.log(res)
			}
		},
		fail: (res) => {
			console.log('失败'+res)
			/* console.log(res);
	        uni.showToast({
	            title: '请稍后重试',
				icon:'none'
	        }); */
		}
	});
}

const djPostForm = function(opt) {
	opt = opt || {};
	opt.url = opt.url || '';
	opt.data = opt.data || null;
	opt.method = opt.method || 'POST';
	opt.name = opt.name || 'files';
	opt.filePath = opt.filePath || null;
	opt.header = opt.header || {
		'content-type': 'multipart/form-data;charset=utf-8',
		'sessionid': config.User.sessionId,
		'authorization': config.Authorization
	};
	opt.success = opt.success || function() {};

	uni.uploadFile({
		url: config.BASE_URL + opt.url + '?t=' + Date.now(),
		header: opt.header,
		fileType: 'image',
		filePath: opt.filePath,
		name: opt.name,
		formData: opt.data,
		success: (res) => {
			// console.log('uploadImage success, res is:', res)
			// uni.showToast({
			// 	title: '上传成功',
			// 	icon: 'success',
			// 	duration: 1000
			// })
			opt.success(res);
		},
		fail: (err) => {
			//console.log('uploadImage fail', err);
			uni.showModal({
				content: err.errMsg,
				showCancel: false
			});
		}
	});
}


//获取auth
function getAuth() {
	return new Promise((resolve, reject) => {
		uni.request({
			url: config.BASE_URL + '/auth/token?t=' + Date.now(),
			data: {
				'username': 'admin',
				'password': 'admin'
			},
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			method: 'POST',
			success: (res) => {
				config.Authorization = res.data.token;
				resolve();
			},
			fail: (err) => {
				reject()
			}
		});
	})
}


export {
	djRequest,
	djPostForm
}
