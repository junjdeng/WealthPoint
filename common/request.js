import {config} from './config.js'
const djRequest = async function (opt){
	opt = opt || {};
    opt.url = opt.url || '';
    opt.data = opt.data || null;
    opt.method = opt.method || 'POST';
    opt.header = opt.header || {
        'content-type':'application/x-www-form-urlencoded'
    };
    opt.success = opt.success || function () {};
	
	let sessionid;
	uni.getStorage({
		key: 'sessionid',
		success(e) {
			if (e.data) {
				sessionid = e.data;
				opt.header.sessionid = sessionid;
			} else {
				uni.reLaunch({
					url: '/pages/login/login'
				});
			}
		}
	})
	if (config.Authorization == null) {
	    await getAuth();
		opt.header.authorization = config.Authorization;			
	} else{
		opt.header.authorization = config.Authorization;
	}		
	
	uni.request({
	　	url: config.BASE_URL + opt.url +'?t='+Date.now(),
		data: opt.data,
		header: opt.header,
		method: opt.method,
		success: (res) => {
			if(res.data.status == 403 && config.User == null){
				uni.reLaunch({
					url: '/pages/login/login'
				});
			}else{
				opt.success(res);
			}			
		},
		fail: (res) =>{
			console.log(res);
            uni.showToast({
                title: '请稍后重试'
            });
        }
	});		
}

const djPostForm = function(opt){
	opt = opt || {};
	opt.url = opt.url || '';
	opt.data = opt.data || null;
	opt.method = opt.method || 'POST';
	opt.name = opt.name || 'files';
	opt.filePath = opt.filePath || null;
    opt.header = opt.header || {
		'content-type':'multipart/form-data;charset=utf-8',
		'sessionid':config.User.sessionId,
		'authorization':config.Authorization
     };	
    opt.success = opt.success || function () {};
			
	uni.uploadFile({
			url: config.BASE_URL + opt.url +'?t='+Date.now(),
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
function  getAuth() {                  
	return new Promise((resolve, reject) => { 		
		uni.request({
		　	url: config.BASE_URL +'/auth/token?t='+Date.now(),
			data: {'username':'admin','password':'admin'},
			header: {'content-type':'application/x-www-form-urlencoded'},
			method: 'POST',
			success: (res) => {				
				config.Authorization = res.data.token;
				resolve();
			},
			fail: (err) =>{
				reject() 
			}
		});		
	})  
} 
 

export {
	djRequest,
	djPostForm
}
