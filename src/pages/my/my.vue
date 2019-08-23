
<!--医院详情页-->

<template>
    <div>
        <div style="display:flex;padding:100rpx 50rpx 100rpx 100rpx" >
            <div style="text-align:center;">
                <image v-if="imgroute.length>0" :src="imgroute[0]" class="hos-img"/>
                <image v-else src="../../static/images/null.jpg"  class="hos-img" />
            </div>
            <div class="t-t">{{lists.name}}</div>
        </div>
        <div >
            <div class="cu-form-group" @click.stop="my">
                <div>
                    <image class="images" src="../../static/images/m1.png"/>
                    <span class="list-item">我的</span>
                </div>
                <div><image src="../../static/images/right.svg" class="images" /></div>
            </div>
            <div class="cu-form-group" @click.stop="list1">
                <div>
                    <image class="images" src="../../static/images/m2.png"/>
                    <span class="list-item">科室信息</span>
                </div>
                <div><image src="../../static/images/right.svg" class="images"/></div>
            </div>
            <div class="cu-form-group" @click.stop="list2">
                <div>
                    <image class="images" src="../../static/images/m3.png" />
                    <span class="list-item">医药器械</span>
                </div>
                <image src="../../static/images/right.svg" class="images"/>
            </div>
            <div class="cu-form-group" @click.stop="list3">
                <div>
                    <image class="images" src="../../static/images/m4.png" />
                    <span class="list-item">药器打包</span>
                </div>
                <div><image src="../../static/images/right.svg" class="images"/></div>
            </div>
            <div class="cu-form-group" @click.stop="list4">
                <div>
                    <image class="images" src="../../static/images/m5.png" />
                    <span class="list-item">服务发布</span>
                </div>
                <div><image src="../../static/images/right.svg" class="images"/></div>
            </div>
        </div>
    </div>
</template>

<script>
    // import Upload from '@/components/uploadimg'
    // import GLOBAL from '@/components/Global'
    export default {
    data(){
      return {
            lists:[],
            image1:[],
            imgroute:[]

      }
    },
    onLoad(options){
        this.imgroute=[]
        this.$fly.request({
            method:"post", //post/get 请求方式
            url:this.$https.state.hosinfo,// 医院信息
            body:{
                guid:wx.getStorageSync('guid')
            }
          }).then(res =>{
                this.lists=res.rows[0]
                this.image1 =JSON.parse(this.lists.images)
                    this.image1.forEach(data=>{
                        if(data.imgdate !== null){
                            this.imgroute.push("https://www.ty5m.com:8088/phy/upload/" + data.imgdate.slice(0,10)+ '/' + data.imgroute)
                        }
                    })
            })
    },
    methods: {
        my(){
            mpvue.navigateTo({url: '../hosdetails/main'})
        },
        list1(){
            mpvue.navigateTo({url: '../hosdep/main'})                //跳转到科室列表
        },
        list2(){
            mpvue.navigateTo({url: '../apparatuslist/main'})         //跳转到医药器械列表
        },
        list3(){
            mpvue.navigateTo({url: '../apparatuspacklist/main'})     //跳转到服务包列表
        },
        list4(){
            mpvue.navigateTo({url: '../serviceinfo/main'})           //跳转到服务发布
        }

    }
  }
</script>

<style>
    .del-img{
        color:red;
        position:absolute;
        top:50rpx;
        right:40rpx;
        z-index:1;
        font-weight:bold;
        font-size:32rpx;
    }
    .x-g{
        position:absolute;
        top:37rpx;
        right:70rpx;
        color:orange;
    }
    .hos-img{
        border-radius:70rpx;
        height:140rpx;
        width:140rpx;
    }
    .t-t{
        width:400rpx;
        font-size:30rpx;
        line-height:150rpx;
        margin-left:50rpx;
        overflow: hidden;
        white-space:nowrap;
        text-overflow:ellipsis;
    }
    .list-item{
        padding:0 30rpx;
        font-size:30rpx
    }
    .cu-form-group{
        justify-content:space-between
    }
    .images{
        width:45rpx;
        height:45rpx;
        top:10rpx;
    }

</style>


