<template>
    <div class="container" >
       <div class="cu-bar bg-white solid-bottom ">
        <div class="action">
          <text class="icon-titles text-orange"></text> 订单状态
        </div>
      </div>
      <div class="box" @tap="more1">
          <div class="d-d-t">未审核订单<text class="more">更多</text></div>
          <div v-if="flag" class="txzt" style="margin:60rpx 0 30rpx 0">{{txzt}}</div>
          <div v-else style="margin:60rpx 0 30rpx 0">
              <div v-for="(item , index) in lists1" v-if="index<5" :key="index" :index="index">
                  <div class="d-d" @click.stop="details1(item.sid)">
                      <span class="username">{{item.name}}</span>
                      <span class="fwname">{{item.fwname}}</span>
                      <span class="dateline" >{{item.dateline}}</span>
                  </div>
              </div>
          </div>
       </div>
       <div class="box " style="margin-top:50rpx" @tap="more2">
            <div class="d-d-t">待派发订单<text class="more" >更多</text></div>
           <div v-if="flag1" class="txzt" style="margin:60rpx 0 30rpx 0">{{txzt}}</div>
            <div v-else style="margin:60rpx 0 30rpx 0">
                <div v-for="(item , index) in lists2" v-if="index<5" :key="index" :index="index">
                    <div class="d-d" @click.stop="details2(item.sid)">
                        <span class="username">{{item.name}}</span>
                        <span class="fwname">{{item.fwname}}</span>
                        <span class="dateline">{{item.dateline}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="cu-bar bg-white solid-bottom margin-top">
            <div class="action">
                <text class="icon-titles text-orange"></text> 护士状态
                <div class="c-b" @tap="add">添加护士</div>
            </div>
        </div>
        <div class="nurse-list">
            <div class="nur-state">
                <div>空闲中</div>
                <div>服务中</div>
                <div>休假中</div>
                <div>值班中</div>
            </div>
            <div class="list" v-if="lists3.length>0">
                <div class="list1">
                    <div v-for="(item,index) in lists3" :key="index" :index="index" >
                        <div v-if="item.statue==0" style="padding:20rpx 0" @click.stop="nurdetail(item.nid)">
                            <div style="font-size:30rpx">{{item.name}}</div>
                            <div style="font-size:24rpx;color:orange">({{item.ksname}})</div>
                        </div>
                    </div>
                </div>
                <div class="list1" style="border-left:1rpx solid #ccc;border-right:1rpx solid #ccc">
                    <div v-for="(item,index) in lists3" :key="index" :index="index" >
                        <div v-if="item.statue==1" style="padding:20rpx 0" @click.stop="nurdetail(item.nid)">
                            <div style="font-size:30rpx">{{item.name}}</div>
                            <div style="font-size:24rpx;color:orange">({{item.ksname}})</div>
                        </div>
                    </div>
                </div>
                <div class="list1" style="border-right:1rpx solid #ccc">
                    <div v-for="(item,index) in lists3" :key="index" :index="index" >
                        <div v-if="item.statue==2" style="padding:20rpx 0" @click.stop="nurdetail(item.nid)">
                            <div style="font-size:30rpx">{{item.name}}</div>
                            <div style="font-size:24rpx;color:orange">({{item.ksname}})</div>
                        </div>
                    </div>
                </div>
                <div class="list1">
                    <div v-for="(item,index) in lists3" :key="index" :index="index" >
                        <div v-if="item.statue==3" style="padding:20rpx 0" @click.stop="nurdetail(item.nid)">
                            <div style="font-size:30rpx">{{item.name}}</div>
                            <div style="font-size:24rpx;color:orange">({{item.ksname}})</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="list" v-else>
                <div class="txzt">{{txzt}}</div>
            </div>
        </div>
        <div class="cu-bar bg-white solid-bottom margin-top">
            <div class="action">
                <text class="icon-titles text-orange"></text> 数量统计
            </div>
        </div>
        <div >
            <div style="background-color:var(--white);padding:30rpx">
                <div class="t-l" @click.stop="serlist">
                    <span class="t-l-b">发布服务总数</span>
                    <span class="hos-item-color;">{{num}}条</span>
                </div>
                <div class="t-l">
                    <span class="t-l-b">服务预约排名</span>
                </div>
                <div v-if="SerNum.length>0" class="t-l" style="height:200rpx;padding:0 60rpx">
                    <div v-for="(item,index) in SerNum" v-if="index<3" :key="index" :value="index" >
                        <div style="display:flex;font-size:30rpx">
                            <div style="color:red">{{index+1}}</div>
                            <div style="margin-left:30rpx;width:300rpx">{{item.name}}</div>
                            <div style="font-size:26rpx;color:#8799a3;margin-left:50rpx">{{item.count}}人预约</div>
                        </div>
                    </div>
                </div>
                <div v-else class="t-l" style="height:200rpx;padding:0 60rpx">
                    <div class="txzt">{{txzt}}</div>
                </div>
            </div>
            <div style="background-color:var(--white);margin-top:20rpx;padding:30rpx">
                <div class="t-l" @click.stop="optlist">
                    <span class="t-l-b">未审核订单数</span>
                    <span class="hos-item-color">{{num1}}条</span>
                </div>
                <div class="t-l" @click.stop="optlist">
                    <span class="t-l-b">待派发订单数</span>
                    <span class="hos-item-color">{{num2}}条</span>
                </div>
                <div class="t-l" @click.stop="optlist">
                    <span class="t-l-b">已派发订单数</span>
                    <span class="hos-item-color">{{num3}}条</span>
                </div>
                <div class="t-l" @click.stop="optlist" style="border-bottom:1rpx solid #f2f2f2">
                    <span class="t-l-b">已完成订单数</span>
                    <span class="hos-item-color">{{num4}}条</span>
                </div>
                <div class="t-l" style="display:flex;justify-content:space-between">
                    <div></div>
                    <div>
                        <span style="">合计：</span>
                        <span class="hos-item-color">{{num5}}条</span>
                    </div>
                </div>
            </div>
            <div style="background-color:var(--white);margin-top:20rpx;padding:30rpx">
                <div class="t-l">
                    <span class="t-l-b">医药、器械耗材情况：</span>
                </div>
                <div style="padding:10rpx 60rpx;color:#8799a3;font-size:29rpx;">
                    医药、器械消耗情况
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      guid:"",
      lists1:[],
      lists2:[],
      lists3:[],
      SerNum:[],
      txzt:"————  还没有数据哟(*_*)  ————",
      flag:false,
      flag1:false,
      num:0,
      num1:0,
      num2:0,
      num3:0,
      num4:0,
      num5:0,
    }
  },
    onLoad(){
        this.insert()
    },
    async onPullDownRefresh () {
        console.log('下拉')
        this.getList()
        wx.stopPullDownRefresh()
    },
    mounted () {        // 调用应用实例的方法获取全局数据
    this.getList()
    },
    methods:{
        async getList () {
          const data1 = await this.insert1()
          const data2 = await this.insert2()
          const data3 = await this.insert3()
          const data4 = await this.insert4()
          const data5 = await this.insert5()
          const data6 = await this.insert6()
          const data7 = await this.insert7()
          this.lists1 = data1
          this.lists1.forEach((item) => {
              item.dateline = item.dateline.substr(0, 19)      //将返回的时间格式进行处理
          })
          this.lists2 = data2
          this.lists2.forEach((item) => {
              item.dateline = item.dateline.substr(0, 19)      //将返回的时间格式进行处理
          })
          wx.hideNavigationBarLoading()
      },
      insert(){
         this.$fly.all(
              [this.insert1(),this.insert2(),this.insert3(),this.insert4(),this.insert5(),this.insert6(),this.insert7()]
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
              url:this.$https.state.patientInfo,  // 未审核订单列表接口
              body:{
                  guid:wx.getStorageSync('guid')
              }
          }).then(res =>{
              this.lists1=res.rows
              if(this.lists1.length==0){
                  this.flag=true
              }else{
                  this.flag=false
              }
              this.num1 = this.lists1.length
              this.lists1.forEach((item) => {
                  item.dateline = item.dateline.substr(0, 19)      //将返回的时间格式进行处理
              })
          })
      },
      insert2(){
          this.$fly.request({
              method:"post", //post/get 请求方式
              url:this.$https.state.sendoptlist,   // 待派发订单列表接口
              body:{
                  guid:wx.getStorageSync('guid')
              }
          }).then(res =>{
              this.lists2=res.rows
              if(this.lists2.length==0){
                  this.flag1=true
              }else{
                  this.flag1=false
              }
              this.num2 = this.lists2.length
              this.lists2.forEach((item) => {
                  item.dateline = item.dateline.substr(0, 19)      //将返回的时间格式进行处理
              })
          })
      },
     insert3(){
         this.$fly.request({
                method:"post", //post/get 请求方式
                url:this.$https.state.AllNurList,   // 所有护士列表
                body:{
                    guid:wx.getStorageSync('guid')
                }
            }).then(res =>{
              this.lists3=res.rows
            })
      },
      insert4(){
          this.$fly.request({
                method:"post", //post/get 请求方式
                url:this.$https.state.serlist,   // 服务列表
                body:{
                    guid:wx.getStorageSync('guid')
                }
            }).then(res =>{
                if(res.rows.length>0){
                    this.lists=res.rows
                    this.num=this.lists.length   //发布服务总数
              }
            })
      },
       insert5(){
            this.$fly.request({
                method:"post", //post/get 请求方式
                url:this.$https.state.endlist,   // 已派发订单列表
                body:{
                    guid:wx.getStorageSync('guid')
                }
            }).then(res =>{
                this.num3=res.rows.length   //已派发订单总数
            })
        },
        insert6(){
            console.log(wx.getStorageSync('guid'))
            this.$fly.request({
                method:"post", //post/get 请求方式
                url:this.$https.state.auditinglist,   // 已完成订单列表
                body:{
                    guid:wx.getStorageSync('guid')
                }
            }).then(res =>{
                this.num4=res.rows.length   //已完成订单总数
                this.num5=this.num1+this.num2+this.num3+this.num4
            })
        },

        insert7(){
            this.$fly.request({
                method:"post", //post/get 请求方式
                url:this.$https.state.sernum,          // 服务预约的次数
                body:{
                    guid:wx.getStorageSync('guid')
                }
            }).then(res =>{
                this.SerNum = res.rows
            })
        },

      more1(){
          mpvue.reLaunch({url: '../sendoptlist/main'})
      },
      more2(){
          mpvue.reLaunch({url: '../sendoptlist/main'})
      },
      details1(e){
          mpvue.navigateTo({url: '../auditingdetails/main?sid='+e})
      },
      details2(e){
          mpvue.navigateTo({url: '../sendoptdetails/main?sid='+e})
      },
      serlist(){
          mpvue.reLaunch({url: '../servicelist/main'})          //跳转到服务列表
      },
      optlist(){
          mpvue.reLaunch({url: '../sendoptlist/main'})          //跳转到订单列表
      },
      nurdetail(e){
          mpvue.navigateTo({url: '../nursedetails/main?nid='+e})
      },
      add(){
          mpvue.navigateTo({url: '../nurseinfo/main'})
      },
  }
}
</script>
<style lang="less" scoped>
 .box{
        border-radius:20rpx;
        padding:20rpx 40rpx
    }
 .d-d-t{
     font-size:32rpx;
     color:#000;
     padding-bottom:20rpx;
     border-bottom:1rpx solid #f2f2f2;
 }
.details{
    margin:10rpx 20rpx;
}
.username{
    font-size:30rpx;
    color:#000;
    width: 140rpx;
    display:inline-block;
}
.fwname{
    font-size:26rpx;
    display:inline-block;
    width:210rpx
}
.dateline{
    font-size:24rpx;
}

/*护士状态列表*/
.nurse-list{
    background-color:var(--white);
    padding:30rpx;
}
.nur-state{
    display:flex;
    justify-content:space-around;
    padding:20rpx 0;
    font-size:30rpx;
    background-color:#0081ff;
    color:#fff;
    border-top-left-radius:20rpx;
    border-top-right-radius:20rpx;
}
.list{
    display:flex;
    justify-content:space-around;
    border:1rpx solid #ccc;
    border-bottom-left-radius:20rpx;
    border-bottom-right-radius:20rpx;
}
.list1{
    display:flex;
    flex-direction:column;
    width:25%;
    text-align:center;
}
.lists2{
    text-align:center;
    border-bottom-left-radius:20rpx;
    border:1rpx solid #ccc;
    border-bottom-right-radius:20rpx;
}


/*统计情况列表*/

.hos-item-color{
    display:inline-block;
    padding:0 20rpx;
    height:50rpx;
}
 .t-l{
     height:60rpx;
     line-height:60rpx;
     padding:0 20rpx;
 }
 .t-l-b{
     font-size:30rpx;
 }
</style>
