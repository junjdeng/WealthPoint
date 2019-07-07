<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
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
