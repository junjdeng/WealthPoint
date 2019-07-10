<template>
  <view class="loading" v-show="loading">
    <view style="width: 170px;height: 85px;text-align: center;background: #fff;padding:10px 20px;box-sizing: border-box;border-radius:8px;">
      <image src="/static/images/loading.gif"></image>
      <view>正在加载中...</view>
    </view>
  </view>
</template>
<script>
  export default {
    name: 'loading',
    data() {
      return {
        loading: true
      }
    },
    created() {
      /* let that = this;
      this.$bus.$on('loading', function (data) {
        that.loading = !!data;
      }) */
    }
  }
</script>
<style scoped>
  .loading{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999998;
    width: 100%;
    height: 100%;
    color: #666;
    background: rgba(0,0,0,.05);
  }
  p {
    padding: .15rem .15rem .2rem;
    color: #fff;
    font-size: .16rem;
  }
  image {
    width: 1.5rem;
    height: 1.5rem;
  }
</style>
