
<!--订单详情页-->

<template>
  <div>
    <div class="cu-bar margin-top">
        <div class="action">
            <text class="icon-title text-red "></text> 未通过原因
        </div>
    </div>
    <div class="nopass">
        <textarea placeholder="请输入原因"  v-model="reason"></textarea>
    </div>
    <button class="cu-btn block bg-blue margin-tb-sm lg" @tap="submit">提交</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
          lists:[],
          sid:"",
          reason:""
      }
    },
    onLoad(options){
        this.sid=options.sid
  },
    methods: {
      submit(){
          //审核不通过
          this.$fly.request({
              method:"post", //post/get 请求方式
              url:this.$https.state.nopass,
              body:{
                  sid:this.sid,
                  reason:this.reason
              }
          }).then(res =>{
              mpvue.reLaunch({url: '../index/main'})
          }).catch((err)=>{
              console.log(err)
              if(err.status==500){
                  wx.hideLoading();
                  wx.showModal({
                      title:'抱歉！',
                      content:'提交失败！'
                  })
              }
          })
      },
    }
  }
</script>

<style>
    .nopass{
      background-color:var(--white);
      padding:20rpx 50rpx;
      border:1rpx solid #eee;
      border-radius: 20rpx;
      margin:10rpx 20rpx;
    }
  button{
    margin:60rpx 40rpx;
  }
</style>


