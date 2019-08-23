
<!--
    订单管理列表
    -->

<template>
  <div>
      <scroll-view :scroll-left="scrollleft" id="fixd" :class="fixtop? 'fix':''" scroll-x="true" class="tap-bg">
          <div class="nav">
              <div :id="'navitem' +index" @click="tabClick(index)" v-for="(item,index) in nav" :key="index" class="nav_item" :class="activeIndex == index? 'active':''">{{item}}</div>
          </div>
      </scroll-view>
      <swiper :style="'height:'+swiperHeight+'px'" duration="300" :current="activeIndex" @change="swiperChange">
          <block>
              <swiper-item class="m-t">
                  <div v-if="flag" class="txzt">{{txzt}}</div>
                  <div v-else class="content">
                      <div class="p-f-l-b"  v-for="(item , index) in lists" :key="index" :index="index" @click.stop="details(item.sid)">
                          <div class="t-p">
                              <span>{{item.name}}</span>
                              <span style="margin-left:20rpx">({{item.sex==0?'男':'女'}})</span>
                              <span class="fw">{{item.fwname}}</span>
                              <image class="luyou" src="../../static/images/right.svg" style="width:40rpx;height:40rpx"/>
                          </div>
                          <div class="hos-item-color">
                              <span class="t-c">创建时间：</span>
                              <span>{{item.dateline}}</span>
                          </div>
                          <div class="hos-item-color f-w-d-z">
                              <span class="t-c">详细地址：</span>
                              <span style="width:460rpx">{{item.address}}</span>
                          </div>
                      </div>
                  </div>
              </swiper-item>
          </block>
          <block>
              <swiper-item class="m-t" >
                  <div v-if="flag1" class="txzt">{{txzt}}</div>
                  <div class="content">
                      <div class="p-f-l-b" v-for="(item , index) in lists1" :key="index" :index="index"  @click.stop="details1(item.sid)">
                          <div class="t-p">
                              <span>{{item.name}}</span>
                              <span style="margin-left:20rpx">({{item.sex==0?'男':'女'}})</span>
                              <span class="fw">{{item.fwname}}</span>
                              <image class="luyou" src="../../static/images/right.svg" style="width:40rpx;height:40rpx"/>
                          </div>
                          <div class="hos-item-color">
                              <span class="t-c">审核时间：</span>
                              <span>{{item.exatime}}</span>
                          </div>
                          <div class="hos-item-color f-w-d-z">
                              <span class="t-c">详细地址：</span>
                              <span style="width:460rpx">{{item.address}}</span>
                          </div>
                      </div>
                  </div>
              </swiper-item>
          </block>
          <block>
              <swiper-item class="m-t" >
                  <div v-if="flag2" class="txzt">{{txzt}}</div>
                  <div class="content">
                      <div class="p-f-l-b" v-for="(item , index) in lists2" :key="index" :index="index" @click.stop="details2(item.sid)">
                          <div class="t-p">
                              <span>{{item.name}}</span>
                              <span style="margin-left:20rpx">({{item.sex==0?'男':'女'}})</span>
                              <span class="fw">{{item.fwname}}</span>
                              <image class="luyou" src="../../static/images/right.svg" style="width:40rpx;height:40rpx"/>
                          </div>
                          <div class="hos-item-color">
                              <span class="t-c">派单护士：</span>
                              <span>{{item.nursename}}</span>
                              <span class="nur-ks">{{item.ksname}}</span>
                          </div>
                          <div class="hos-item-color">
                              <span class="t-c">派发时间：</span>
                              <span>{{item.sendtime}}</span>
                          </div>
                          <div class="hos-item-color f-w-d-z">
                              <span class="t-c">详细地址：</span>
                              <span style="width:460rpx">{{item.address}}</span>
                          </div>
                      </div>
                  </div>
              </swiper-item>
          </block>
          <block>
              <swiper-item class="m-t" >
                  <div v-if="flag3" class="txzt">{{txzt}}</div>
                  <div v-else class="content">
                      <div class="p-f-l-b" v-for="(item , index) in lists3" :key="index" :index="index" @click.stop="details3(item.sid)">
                          <div class="t-p">
                              <span>{{item.name}}</span>
                              <span style="margin-left:20rpx">({{item.sex==0?'男':'女'}})</span>
                              <span class="fw">{{item.fwname}}</span>
                              <image class="luyou" src="../../static/images/right.svg" />
                          </div>
                          <div class="hos-item-color">
                              <span class="t-c">派单护士：</span>
                              <span>{{item.nuersename}}</span>
                              <span class="nur-ks">{{item.ksname}}</span>
                          </div>
                          <div class="hos-item-color">
                              <span class="t-c">完成时间：</span>
                              <span>{{item.cpttime}}</span>
                          </div>
                          <div class="hos-item-color f-w-d-z">
                              <span class="t-c">详细地址：</span>
                              <span style="width:460rpx">{{item.address}}</span>
                          </div>
                      </div>
                  </div>
              </swiper-item>
          </block>
      </swiper>
  </div>
</template>

<script>
  export default {
    data() {
      return {
          lists:[],
          guid:'',
          txzt:"————  还没有数据哟(*_*)  ————",
          flag:false,
          flag1:false,
          flag2:false,
          flag3:false,
          lists:[],
          lists1:[],
          lists2:[],
          lists3:[],
          prolist:[],
          sid:"",

          nav: ["未审核", "待派发", "已派发", "已完成",],
          fixtop:true, //是否吸顶
          top: 100, //导航栏初始到屏幕顶部高度
          activeIndex:0, //选项卡及swiper位置
          scrollleft: 0, //scroll-view 横向滚动条位置
          windowWidth: 0, //窗口宽度
          swiperHeight: 2000 //此处为swiper高度
      };
    },
      onLoad(){
          this.insert()
          let that = this
          let res = wx.getSystemInfoSync()
          that.windowWidth = res.windowWidth
          const query = wx.createSelectorQuery()
          query.select("#fixd", ".nav").boundingClientRect()
          query.exec(function(res) {
              that.top = res[0].top;
          })
      },
      async onPullDownRefresh () {
          console.log('下拉')
          this.getList()
          wx.stopPullDownRefresh()
      },
      mounted () {        // 调用应用实例的方法获取全局数据
          this.getList()
      },

    // onPageScroll(e){
    //       var that = this;
    //       if (e.scrollTop > that.top) {
    //           that.fixtop = true;
    //       } else {
    //           that.fixtop = false;
    //       }
    //   },

      methods: {
          async getList () {
              const data1 = await this.insert1()
              const data2 = await this.insert2()
              const data3 = await this.insert3()
              const data4 = await this.insert4()
              this.lists = data1
              if(this.lists1.length>0){
                  this.lists.forEach((item) => {
                      item.dateline = item.dateline.substr(0,19)  //修改未审核订单数据格式
                      item.address = item.address.substr(2, item.address.length - 4).split('","').join('')
                  })
              }
              this.lists1 = data2
              if(this.lists1.length>0){
                  this.lists1.forEach((item) => {
                      item.exatime = item.exatime.substr(0,19)    //修改未派发订单数据格式
                      item.address = item.address.substr(2, item.address.length - 4).split('","').join('')
                  })
              }

              this.lists2 = data3
              if(this.lists2.length>0){
                  this.lists2.forEach((item) => {
                      item.sendtime = item.sendtime.substr(0,19)  //修改已派发订单数据格式
                      item.address = item.address.substr(2, item.address.length - 4).split('","').join('')
                  })
              }

              this.lists3 = data4
              if(this.lists.length>0){
                  this.lists3.forEach((item) => {
                      // item.cpttime = item.cpttime.substr(0, 19)      //修改已完成订单数据格式
                      item.address = item.address.substr(2, item.address.length - 4).split('","').join('') //将返回的地址格式进行处理
                  })
              }

              wx.hideNavigationBarLoading()
          },
          insert(){
              this.$fly.all(
                  [this.insert1(),this.insert2(),this.insert3(),this.insert4()]
              ).then(this.$fly.spread((records,projects)=>{
                      console.log(records,projects)
                  })
              ).catch(error=>{
                  console.log(error)
              })
          },
          insert1(){
              this.$fly.request({
                  method:"post", //post/get 请求方式
                  url:this.$https.state.patientInfo,   // 未审核订单列表
                  body:{
                      guid:wx.getStorageSync('guid'),
                  }
              }).then(res =>{
                  this.lists=res.rows
                  if(this.lists.length==0){
                      this.flag=true
                  }else{
                      this.flag=false
                      this.lists.forEach((item)=>{
                          item.dateline = item.dateline.substr(0,19)  //订单创建时间
                          item.address = item.address.substr(2, item.address.length - 4).split('","').join('') +' '+item.addressdetail
                      })
                  }
              })
          },
          insert2(){
              this.$fly.request({
                  method:"post", //post/get 请求方式
                  url:this.$https.state.sendoptlist,  // 待派发订单列表
                  body:{
                      guid:wx.getStorageSync('guid')
                  }
              }).then(res =>{
                  this.lists1=res.rows
                  if(this.lists1.length==0){
                      this.flag1=true
                  }else{
                      this.flag1=false
                      this.lists1.forEach((item)=>{
                          item.exatime = item.exatime.substr(0,19)    //订单审核时间
                          item.address = item.address.substr(2, item.address.length - 4).split('","').join('')+' '+item.addressdetail
                      })
                  }
              })
          },
          insert3(){
              this.$fly.request({
                  method:"post", //post/get 请求方式
                  url:this.$https.state.endlist,   //已派发订单列表
                  body:{
                      guid:wx.getStorageSync('guid')
                  }
              }).then(res =>{
                  this.lists2 = res.rows
                  if(this.lists2.length==0){
                      this.flag2=true
                  }else{
                      this.flag2=false
                      this.lists2.forEach((item)=>{
                          item.sendtime = item.sendtime.substr(0,19)  //订单派发时间
                          item.address = item.address.substr(2, item.address.length - 4).split('","').join('')+' '+item.addressdetail
                      })
                  }
              })
          },
          insert4(){
              this.$fly.request({
                  method:"post", //post/get 请求方式
                  url:this.$https.state.auditinglist,  // 已完成订单列表
                  body:{
                      guid:wx.getStorageSync('guid')
                  }
              }).then(res => {
                  this.lists3 = res.rows
                  if(this.lists3.length==0){
                      this.flag3=true
                  }else{
                      this.flag3=false
                      this.lists3.forEach((item) => {
                          if(item.cpttime !== null && item.address !== null){
                              item.cpttime = item.cpttime.substr(0, 19)      //将返回的时间格式进行处理
                              item.address = item.address.substr(2, item.address.length - 4).split('","').join('')+' '+item.addressdetail
                          }
                      })
                  }
              })
          },
          tabClick(e) {
              this.activeIndex = e;
          },
          swiperChange(e){
              this.activeIndex = e.mp.detail.current;
              let that = this;
              const query = wx.createSelectorQuery();
              query.select("#navitem" + this.activeIndex).boundingClientRect();
              query.exec(function(res) {
                  if (res[0].right > that.windowWidth) {
                      that.scrollleft = res[0].right;
                  } else if (res[0].left < 0) {
                      that.scrollleft = res[0].left;
                  }
              })
          },
        details(e){
            mpvue.navigateTo({url: '../auditingdetails/main?sid='+e})   //跳转到未审核订单详情
        },
        details1(e){
            mpvue.navigateTo({url: '../sendoptdetails/main?sid='+e})    //跳转到待派发订单详情
        },
        details2(e){
            mpvue.navigateTo({url: '../service/main?sid='+e})           //跳转到已派发订单详情
        },
        details3(e){
            mpvue.navigateTo({url: '../auditing/main?sid='+e})          //跳转到已完成订单详情
        }
    }
  }
</script>

<style>
    .m-t{
        margin-top:100rpx
    }
    .tap-bg{
        width:100%;
        white-space:nowrap;
        background-color:#fff;
        box-sizing: border-box;
    }
    .nav {
        width:100%;
        display:flex;
        height:100rpx;
        background-color:#fff;
        box-sizing:border-box;
        justify-content:space-around;
    }
    .nav_item {
        text-align:center;
        line-height:100rpx;
        padding:0 20rpx;
        font-size:32rpx;
        color:#999;
    }
    .active {
        color:#000;
        border-bottom:6rpx solid red;
    }
    .content {
        background-color: #f1f1f1;
        height: 2000px;
    }
    .fix {
        position:fixed;
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
    .f-w-d-z{
        display:flex;
    }
    .p-f-l-b{
        font-size:32rpx;
        background-color:var(--white);
        margin:15px 25px;
        position:relative;
        top:0;
        left:0;
        border:1rpx solid #ccc;
        padding:20rpx;
        border-radius:20rpx;
    }
    .ser-l{
        display:flex;
        flex-direction:column;
        font-size:30rpx;
        margin:0 20rpx;
        padding:10rpx 0;
        width:100%;
    }
    .ser-l div{
        padding:5rpx 0
    }
    .ser-l div span{
        color:#888;
        font-size:28rpx
    }
    .nur-ks{
        margin-left:30rpx;
        font-size:24rpx;
        color:orange;
    }
    .fw{
        margin-left:50rpx;
        color:#353535;
    }
    .luyou{
        position:absolute;
        top:25rpx;
        right:40rpx;
        width:40rpx;
        height:40rpx
    }
    .t-c{
        color:#333333;
    }
    .t-p{
        padding:8rpx 0;
    }
</style>


