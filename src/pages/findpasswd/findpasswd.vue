<template>
  <div class="findpasswd_container">
    <div class="phone">
      <span style="padding:10rpx;">手机号</span>
      <input class="inputtype" v-model="value1" type="number" maxlength="11" placeholder="输入手机号" @blur="cha"/>
    </div>
    <div class="code">
      <span style="padding:10rpx;">验证码</span>
      <div class="getmessage">
        <input class="inputtype" v-model="value1" type="idcard"  placeholder="输入验证码" />
        <button type="primary" class="yz" @click="tap" >获取验证码</button>
      </div>
    </div>
    <button type="primary" class="cu-btn bg-green margin-tb-sm lg" style="fonf-size:36rpx;margin-top:150rpx;height:100rpx" @tap="trans">下一步</button>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        phonenum: false,
        code: true,
        num: 0
      }
    },
    methods: {
      tap(){
        wx.showModal({
          title:'验证码已发送，请注意查收！'
        })
      },
      cha (e) {
        var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
        this.num = this.value1 = e.target.value
        if (this.num == '' || this.num == 'undefined') {
          wx.showModal({
            title: '号码不能为空'
          })
        } else if (!(reg.test(this.num))) {
          wx.showModal({
            title: '手机号码有误'
          })
        } else {
          this.phonenum = true
        }
      },
      trans () {
        mpvue.navigateTo({url: '../searchservice/main'})
      }
    }
  }
</script>

<style>
  .findpasswd_container{
    display: flex;
    flex-direction: column;
    width: 94%;
    margin-left: 3%;
    padding-top: 15rpx;
  }
  .inputtype{
    width: 94%;
    margin-left: 3%;
    border-bottom:1rpx solid #ccc;
    padding: 5rpx;
  }
  .phone,.code{
    font-size:32rpx;
    margin:20rpx 10rpx;
  }
  .yz{
    font-size:25rpx;
  }
  .sub{
    margin-top:200rpx;
    padding: 0rpx 240rpx;
  }
  .code{
    display: flex;
    flex-direction: column;
  }
  .code input{
    line-height: 60rpx;
  }
  .code button{
    position: absolute;
    right: 30rpx;
    font-size: 26rpx;
    margin-top: -30px;
    vertical-align: middle;
    text-align: center;
    height: 60rpx;
    line-height: 60rpx;
  }
</style>

