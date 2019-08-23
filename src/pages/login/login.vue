
<!--登录页面-->

<template>
 <div class="container">
     <image style="width:140rpx;height:180rpx;position:static;top:0;left:0"  src="../../static/images/bg-top.png"></image>
     <div class="login">
         <scroll-view :scroll-left="scrollleft" id="fixd" :class="fixtop? 'fix':''" scroll-x="true" class="tap-bg">
             <div class="nav">
                 <div :id="'navitem' +index" @click="tabClick(index)" v-for="(item,index) in nav" :key="index" class="nav_item" :class="activeIndex == index? 'active':''">{{item}}</div>
             </div>
         </scroll-view>
         <swiper :style="'height:'+swiperHeight+'px'" class="swiper" duration="200" :current="activeIndex" @change="swiperChange">

<!--   登陆导航显示-->
             <block>
                 <swiper-item>
                     <div class="content">
                        <div class="login-user">
                            <div class="login-user-img">
                                <image style="width:50rpx;height:50rpx" src="../../static/images/user.png" alt="" />
                            </div>
                            <div class="login-user-input">
                                <input type="text" maxlength="11" placeholder="输入手机号" :value="username" @blur="setusername">
                            </div>
                        </div>
                        <div class="login-user" style="margin-top:40rpx">
                             <div class="login-user-img">
                                 <image style="width:50rpx;height:50rpx" src="../../static/images/pwd.png" alt=""/>
                             </div>
                             <div class="login-user-input">
                                 <input type="password" maxlength="11" placeholder="输入密码" :value="password" @blur="setpassword" >
                             </div>
                         </div>
                         <div class="login-btn" @tap="login">登录</div>
                     </div>
                 </swiper-item>
             </block>

             <!-- 注册导航显示-->
             <block>
                 <swiper-item>
                     <div class="content">
                         <div class="login-user m-b">
                             <div class="login-user-input" style="width:600rpx">
                                 <input type="text"  placeholder="医院名称" :value="hosname" @blur="sethosname">
                             </div>
                         </div>
                         <div class="login-user m-b">
                             <div class="login-user-input" style="width:600rpx">
                                 <input type="text"  placeholder="联系人姓名" :value="name" @input="setname">
                             </div>
                         </div>
                         <div class="login-user m-b">
                             <div class="login-user-input" style="width:600rpx">
                                 <input type="text"  placeholder="联系人手机号码" :value="mobile" @blur="setmobile"  maxlength="11">
                             </div>
<!--                             <div class="yzm" @tap="SendYzm(mobile)">发送验证码</div>-->
                         </div>
                         <div class="login-user m-b">
                             <picker @change="changelevel" :value="index" :range="hoslevel" range-key="name" style="width:600rpx;position:relative;">
                                 <view class="picker">
                                     {{hoslevel.length>0 ? hoslevel[index].name : '暂时无法选择'}}
                                 </view>
                                 <image class="down" src="../../static/images/down.svg" alt=""/>
                             </picker>
                         </div>
                         <div class="login-user">
                             <picker mode="region" @change="bindRegionChange" :value="region" :custom-item="customItem" style="width:600rpx;position:relative;">
                                 <view class="picker">
                                     {{region? region:'请选择省市区'}}
                                 </view>
                                 <image class="down" src="../../static/images/down.svg" alt=""/>
                             </picker>
                         </div>
                         <div class="login-btn" style="margin-top:70rpx" @tap="register">注册</div>
                     </div>
                 </swiper-item>
             </block>
         </swiper>
     </div>
     <image style="width:140rpx;height:280rpx;position:absolute;right:0;top:520rpx" src="../../static/images/bg-left.png" ></image>
     <image style="width:180rpx;height:420rpx;position:absolute;left:0;bottom:0" src="../../static/images/bg-bottom.png" ></image>
  </div>
</template>

<script>
  export default {
      data () {
          return {
              username: "13658651316",
              password: "123456",
              guid: "",
              index:"0",
              hoslevel:this.$https.state.hoslev, //医院等级
              region:"",    //地址
              hosname:"",   //医院名称
              name:"",      //负责人姓名
              mobile: "",   //手机号
              hoslocation:"",


              nav: ["登录", "注册"],
              fixtop: false, //是否吸顶
              top: 0, //导航栏初始到屏幕顶部高度
              activeIndex: 0, //选项卡及swiper位置
              scrollleft: 0, //scroll-view 横向滚动条位置
              windowWidth: 0, //窗口宽度
              swiperHeight: 400 //此处为swiper高度
          }
      },
      onLoad () {
          let that = this
          let res = wx.getSystemInfoSync()
          that.windowWidth = res.windowWidth
          const query = wx.createSelectorQuery()
          query.select("#fixd", ".nav").boundingClientRect()
          query.exec(function (res) {
              that.top = res[0].top;
          })
      },
      // onPageScroll: function(e) {
      //       var that = this;
      //       console.log(that.top);
      //       if (e.scrollTop >= that.top) {
      //           that.fixtop = true;
      //       } else {
      //           that.fixtop = false;
      //       }
      //   },
      methods: {
          // tab导航
          tabClick (e) {
              this.activeIndex = e;
          },
          swiperChange (e) {
              this.activeIndex = e.mp.detail.current;
              let that = this;
              const query = wx.createSelectorQuery();
              query.select("#navitem" + this.activeIndex).boundingClientRect();
              query.exec(function (res) {
                  if (res[0].right > that.windowWidth) {
                      that.scrollleft = res[0].right;
                  } else if (res[0].left < 0) {
                      that.scrollleft = res[0].left;
                  }
              })
          },
          setusername (e) {
              this.username = e.mp.detail.value      // 获取输入账号
          },
          setpassword (e) {
              this.password = e.mp.detail.value      // 获取输入密码
          },
          sethosname (e) {
              this.hosname = e.mp.detail.value      // 获取医院名称
              if(this.hosname){
                  this.$fly.request({
                      method: "post",
                      url: this.$https.state.hosselect,
                      body: {
                          name:this.hosname
                      }
                  }).then(res => {
                      console.log(res.rows)
                      if(res.rows.length > 0){
                          wx.showModal({
                              title: '抱歉!',
                              content: '该医院已经注册过啦！',
                          })
                      }
                  })
              }
          },
          setname (e) {
              this.name = e.mp.detail.value         // 获取负责人姓名
          },
          setmobile (e) {
              this.mobile = e.mp.detail.value
              if (this.mobile.length < 11 || !(/^1[34578]\d{9}$/.test(this.mobile))) {   //判断输入的手机号是否合法
                  wx.showModal({
                      title: "手机号码输入不合法！",
                      content: "请重新输入！"
                  })
              }else if(this.mobile){
                  this.$fly.request({
                      method: "post",
                      url: this.$https.state.hosselect,
                      body: {
                          mobile:this.mobile
                      }
                  }).then(res => {
                      console.log(res.rows)
                      if(res.rows.length > 0){
                          wx.showModal({
                              title: '抱歉！',
                              content: '该手机号已经注册过啦！',
                          })
                      }
                  })
              }
          },

          changelevel(e){
              this.index=e.mp.detail.value      //医院类型
          },
          bindRegionChange(e){                  //医院地址信息
              this.region = e.mp.detail.value
          },

          //医院登录
          login () {
              if(this.username=="" || this.password==""){
                  wx.showModal({
                      title:'注意！',
                      content:'账号和密码不能为空！'
                  })
              }else if(this.username.length < 11 || !(/^1[34578]\d{9}$/.test(this.username))){
                  wx.showModal({
                      title:'注意！',
                      content:'账号输入不合法！'
                  })
              }else{
                  this.$fly.request({
                      method: "post", //post/get 请求方式
                      url: this.$https.state.login,           // 医院登录
                      body: {
                          username: this.username,
                          password: this.password
                      }
                  }).then(res => {
                      if(res == '用户名或者密码错误'){
                          wx.showModal({
                              title:'注意！',
                              content:'用户名或者密码错误！'
                          })
                      }else{
                          wx.setStorage({                       //将获取到的guid写入缓存
                              key: 'guid',
                              data:res.rows[0].guid
                          })

                          wx.setStorage({                       //将获取到的username写入缓存
                              key: 'username',
                              data:res.rows[0].usernamehos
                          })

                          wx.setStorage({                        //将获取到的password写入缓存
                              key: 'password',
                              data:res.rows[0].passwordhos
                          })
                          wx.setStorage({                        //将获取到的locate写入缓存
                              key: 'locate',
                              data:res.rows[0].locate
                          })

                          wx.request({
                              method: "post",
                              url: this.$https.state.login1,      //第一次登陆验证
                              data: {
                                  username: this.username,
                                  password: this.password
                              },
                              header: {
                                  'content-type': 'application/x-www-form-urlencoded' // 默认值
                              },
                              success (res) {
                                  wx.setStorageSync('passcode', res.header['Set-Cookie'])
                              }
                          })
                          wx.reLaunch({
                              url: '../index/main',
                          })
                      }
                  })
              }
          },

          //医院注册
          register(){
              if(this.hosname=="" || this.name=="" || this.mobile=="" || this.region==""){
                  wx.showModal({
                      title:'注意！',
                      content:'输入内容不能为空！'
                  })
             }
             else{
                 this.$fly.request({
                     method: "post", //post/get 请求方式
                     url: this.$https.state.hoslocation,       // 医院地址
                     body: {
                         address:this.region[1]+this.hosname
                     }
                 }).then(res => {
                     console.log(res.result)
                     this.hoslocation='('+res.result.location.lat + ',' + res.result.location.lng +')'    //医院地址坐标
                     if(this.hoslocation){
                         this.$fly.request({
                             method: "post", //post/get 请求方式
                             url: this.$https.state.hosregister,       // 医院注册
                             body: {
                                 value1:this.hosname,                  //医院名称
                                 value2:this.name,                     //负责人姓名
                                 value3:this.mobile,                   //联系电话
                                 value4:this.hoslevel[this.index].id,  //等级
                                 value5:JSON.stringify(this.region),   //地址
                                 value7:this.hoslocation
                             }
                         }).then(res => {
                             wx.showModal({
                                 title:'注册成功！',
                                 content:'请登录！'
                             })
                                 this.hosname="",                  //医院名称
                                 this.name="",                     //负责人姓名
                                 this.mobile="",                   //联系电话
                                 this.index=0,                     //等级
                                 this.region="",                   //地址
                                 this.activeIndex=0
                         }).catch((err)=>{
                             if(err.status==500){
                                 wx.showModal({
                                     title:'抱歉！',
                                     content:'注册失败！'
                                 })
                             }
                             wx.hideLoading();
                         })
                     }
                 })

              }
          }
      }
  }
</script>

<style>
    page{
        background-color:#fff;
    }
    .tap-bg{
        padding:0 170rpx;
        white-space:nowrap;
        box-sizing: border-box;
    }
    .nav {
        width: 100%;
        display: flex;
        height: 50px;
        color:#999;
        box-sizing: border-box;
        font-size:34rpx;
        position:static;
        top:4rpx;
        z-index:99
    }
    .nav_item {
        flex: auto;
        text-align: center;
        border-bottom:1px solid #999;
        line-height: 50px;
        padding: 0 20px;
        font-size:34rpx;
    }
    .active {
        color: #00c8ff;
        border-bottom:3px solid #00c8ff;
    }
    .fix {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 10;
        animation: move 0.2s linear;
    }
    @keyframes move {
        from {
            opacity: 0.7;
        }
        to {
            opacity: 1;
        }
    }
    .login{
        position:absolute;
        top:140rpx;
        left:60rpx;

    }
    .content{
        margin:100rpx 0;
        padding:0 20rpx;
    }
    .m-b{
        margin-bottom:30rpx;
    }
    .picker{
        margin:15rpx 30rpx;
    }
    .login-user{
        height:77rpx;
        border:2rpx solid #00c8ff;
        border-radius:20rpx;
        display:flex;
        position:relative;
    }
    .login-user input{
        width:460rpx;
        font-size:30rpx;
        margin:11rpx 30rpx;
        text-align:left
    }
    .login-user-img{
        width:75rpx;
        background-color:#00c8ff;
        border-top-left-radius:16rpx;
        border-bottom-left-radius:16rpx;

    }
    .login-user-img>image{
        position:absolute;
        top:10rpx;
        left:15rpx;
    }
    .login-btn{
        margin-top:300rpx;
        font-size:34rpx;
        text-align:center;
        color:#fff;
        border-radius:20rpx;
        padding:15rpx;
        background-color:#00c8ff;
    }
    .yzm{
        border-radius:14rpx;
        color:#fff;
        background-color:#00c8ff;
        z-index:99;
        padding:0 20rpx;
        font-size:28rpx;
        height:60rpx;
        line-height:60rpx;
        position:absolute;
        right:7rpx;
        top:7rpx;
    }
    .footer{
        position:absolute;
        padding:0 75rpx;
        bottom:180rpx;
    }
    .f1{
        display:flex;
    }
    .h-x{
        height:0;
        width:200rpx;
        border-top:1rpx solid #000;
    }
    .f2{
        display:flex;
        position:absolute;
        top:40rpx;
        left:190rpx
    }
    .down{
        position:absolute;
        top:13rpx;
        right:30rpx;
        width:45rpx;
        height:45rpx;
    }
</style>

