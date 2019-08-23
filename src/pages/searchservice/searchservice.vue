<template>
  <div>
      <div class="service-group" v-for="(item , index) in lists" :key="index" :index="index" @click.stop="details1(item.pid)">
          <div style="padding:30rpx 0;">
              <image v-if="lists" style="display:inline-block;width:250rpx;height:250rpx;border-radius:20rpx" :src="imgroute[0]"></image>
              <image v-else class="f-img" src="../../static/images/null.jpg" />
          </div>
          <div style="font-size:28rpx;margin-left:30rpx">
               <div style="display:flex;justify-content:space-between">
                    <span style="color:red;font-size:32rpx;font-weight:bold">{{item.name}}</span>
                    <span class="details1" >详情...</span>
               </div>
               <div style="margin:15rpx 0;">服务内容：<span class="font-hidden">{{item.content}}</span></div>
               <div>价格：<span class="text-price" style="color:orange">{{item.price}}</span></div>
           </div>
      </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
          searchstr:"",
          lists:[],
          imgroute:[],
      }
    },
    onLoad(options){
        this.searchstr=options.searchstr
        console.log(this.searchstr)
        this.$fly.request({
            method:"post", //post/get 请求方式
            url:this.$https.state.sersearch,  // 服务搜索
            body:{
                guid:wx.getStorageSync('guid'),
                searchname:this.searchstr
            }
        }).then(res => {
            this.lists=res.rows
            let image1 = JSON.parse(this.lists.images)
                image1.forEach(data=>{
                this.imgroute.push("https://www.ty5m.com:8088/phy/upload/" + data.imgdate.slice(0,10)+ '/' + data.imgroute)
            })
        })
    },
    methods:{
        details1(e){
            mpvue.navigateTo({url: '../servicedetails/main?pid='+e})   //查看详情
        },
    }
  }
</script>

<style>
    .service-group{
        /*background-color:  var(--white);*/
        padding: 1rpx 40rpx;
        align-items:center;
        justify-content:space-between;
        display: flex;
    }
    .font-hidden{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp:2;
        overflow: hidden;
        color:#b2b2b2;
        margin:0 20rpx;
        text-indent:2em;
        font-size:25rpx;
        width:360rpx;
    }
</style>

