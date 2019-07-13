<script>
	export default {
		onLaunch: function() {
			// #ifdef APP-PLUS 
			let platform = '';
			uni.getSystemInfo({
				success: function (res) {
					 platform = res.platform;
				}
			});			
			//console.log(platform);			
			plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {				
				uni.request({  
					url: 'http://download.wealth-point.com/update2/GetVersion.php',   
					success: (result) => {
						if (result.data && result.data  !==  widgetInfo.version) {
							let downUrl = platform == 'ios' ? 'http://download.wealth-point.com/update2/ios.wgt':'http://download.wealth-point.com/update2/apk.wgt';
							//console.log(downUrl);	
							uni.downloadFile({  
								url: downUrl,  
								success: (downloadResult) => { 
									//console.log(downloadResult);
									if (downloadResult.statusCode === 200) {
										console.log('installing...'); 
										plus.runtime.install(downloadResult.tempFilePath, {  
											force: true  
										}, function() {  
											//console.log('install success...');  
											plus.runtime.restart();  
										}, function(e) {  
											//console.error('install fail...');  
										});  
									}  
								},
								fail(err) {
								 	console.log(err);
								}
							});  
						}  
					}  
				});  
			});  
			// #endif  
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	page{background: #f5f5f5;}
	
	.container {
		height: 100%;
		background: #f5f5f5;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
	}

	.section {
		background: #ffffff;
		margin: 0 20upx;
		width: 710upx;
		border-radius: 16upx;
		margin-top: 20upx;
	}

	.flex-center {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.flex-around {
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.flex-between {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.flex-start {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.flex1 {
		flex: 1;
	}

	.flex2 {
		flex: 2;
	}

	.flex3 {
		flex: 3;
	}

	.flex4 {
		flex: 4;
	}

	.flex5 {
		flex: 5;
	}

	.ellipsis {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.ellipsis2 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		word-break: break-all;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.ellipsis3 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		word-break: break-all;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
	}

	.ellipsis4 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		word-break: break-all;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 4;
	}

	.clear:after {
		content: "020";
		display: block;
		height: 0;
		clear: both;
		visibility: hidden;
	}
	
	.wpred{color: #FF5533;}
	.wpgreen{color: #7ED321;}
	.wpgold{color: #CCA366;}
	uni-radio.uni-radio-input-checked{
		background-color: #CCA366!important;
		border-color:#CCA366!important;
	}
</style>
