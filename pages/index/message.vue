<template>
	 <view class="main-this-galley">
      <view class="common-view-flex-this row flex-box-center" >
        <view class="icon-flex-this-view" style="background-image:url('/static/images/icon01.png')"></view>
        <view>订单消息</view>
      </view>
      <view class="common-view-flex-this row flex-box-center" data-url="mail" @click="navTo">
        <view class="icon-flex-this-view" style="background-image:url('/static/images/icon02.png')"></view>
        <view>留言信息</view>
      </view>
     <view class="common-view-flex-this row flex-box-center" data-url="complaint" @click="navTo" >
       <view class="icon-flex-this-view" style="background-image:url('/static/images/complain.png')"></view>
       <view>投诉信息</view>
     </view>
    </view>
</template>

<script>
	export default{
		methods:{
			navTo(e) {
				uni.navigateTo({
					url:e.currentTarget.dataset.url
				})
			}
		}
	}
</script>

<style>
	.flex-box-center {
    display: flex;
    align-items: center;
	font-size: 32upx;
  }

  .row {
    display: flex;
    flex-direction: row;
  }

  /* main */
  .main-this-galley {
    width: 100%;
    height: auto;
    background: #fff;
  }

  .common-view-flex-this {
    width: 86%;
    padding: 30upx 7%;
    height: auto;
    border-bottom: 1px solid #efefef;
  }

  .icon-flex-this-view {
    width: 80upx;
    height: 80upx;
    margin-right: 20upx;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }
</style>
