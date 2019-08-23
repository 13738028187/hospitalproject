<template>
  <div>
      <div class="cu-bar bg-white search fixed" :style="[{top:CustomBar + 'px'}]">
          <div style="padding:20rpx;font-size:32rpx;color:#0081ff" @tap="add">发布服务</div>
          <div class="search-form round">
              <text class="icon-search"></text>
              <input type="text" placeholder="请输入服务名称" style="text-align:left" @input="setsearch($event)"></input>
          </div>
          <div class="action">
              <button style="color:#fff" class="cu-btn shadow-blur round" @tap="searchserver">搜索</button>
          </div>
      </div>
      <div v-if="flag" class="txzt" style="margin-top:100rpx">{{fwlb}}</div>
      <div v-else style="margin-top:100rpx">
          <div class="service-group" v-for="(item , index) in lists" :key="index" :index="index" @click.stop="details1(item.pid)">
              <div style="padding:30rpx 0;">
                  <image v-if="lists" class="f-img" :src="['https://www.ty5m.com:8088/phy/upload/'+item.imgdateline+'/'+item.image]"></image>
                  <image v-else class="f-img" src="../../static/images/null.jpg" />
              </div>
              <div style="font-size:28rpx;">
                  <div style="display:flex;justify-content:space-between">
                      <span style="font-size:32rpx">{{item.name}}</span>
                      <span class="text-price" style="color:red">{{item.price}}</span>
                  </div>
                  <div style="margin:15rpx 0;"><span class="font-hidden">{{item.content}}</span></div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
  import GLOBAL from '@/components/Global'
  export default {
    data(){
      return{
          lists:[],
          searchstr:"",
          flag:false,
          fwlb:"亲，您还没有发布服务哟,请回到‘我的’，选择‘服务发布’",
          guid:"",
          pid:"",
          fwnr:"",
          CustomBar:this.CustomBar
      }
    },

    onLoad(e){
       this.$fly.request({
            method:"post", //post/get 请求方式
            url:this.$https.state.serlist,  // 服务列表
            body:{
              guid:wx.getStorageSync('guid'),
            }
          }).then(res =>{
              this.lists=res.rows
           if(this.lists.length== 0){
               this.flag=true
            }else{
               this.flag=false
           }
        })
    },
    methods:{
        details1(e){
            mpvue.navigateTo({url: '../servicedetails/main?pid='+e})   //查看详情
        },
        setsearch(e){
            this.searchstr=e.mp.detail.value
        },
        searchserver(){
            if(this.searchstr==''){
                wx.showToast({
                    title: '请输入搜索词',
                    icon: 'loading',
                    duration: 1500
                })
            }else{
                this.$fly.request({
                    method:"post",  //post/get 请求方式
                    url:this.$https.state.sersearch,    //服务搜索
                    body:{
                        guid:wx.getStorageSync('guid'),
                        searchname:this.searchstr
                    }
                }).then(res =>{
                    console.log(res)
                    if(res.rows.length>0){
                        mpvue.navigateTo({url:'../searchservice/main?searchstr='+this.searchstr})
                    }else{
                        wx.showModal({
                            title: '抱歉！',
                            content: '未搜索到该服务！',
                        })
                    }
                })

            }
        },
        add(){
            mpvue.navigateTo({url: '../serviceinfo/main'})   // 添加服务
        }
    }
  }

</script>

<style>
  .service-group{
      background-color:  var(--white);
      padding: 1rpx 40rpx;
      border-bottom:1rpx solid #e5e5e5;
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
      font-size:26rpx;
      width:380rpx;
  }
</style>
