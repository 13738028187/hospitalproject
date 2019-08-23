
<!--医院详情页-->

<template>
    <div>

        <div class="cu-bar bg-white margin-top">
            <div class="action">
                <text class="icon-titles text-orange"></text> 照片展示
            </div>
        </div>
        <swiper class="card-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
                :autoplay="true" interval="4000" duration="500" @change="cardSwiper" indicator-color="#8799a3"
                indicator-active-color="#0081ff">
            <div v-if="imgroute.length>0">
                <swiper-item v-for="(item,index) in imgroute" :key="index" :class="cardCur==index?'cur':''">
                    <div class="swiper-item">
                        <image class="del-img"  @tap="del(image1[index].uuid)" src="../../static/images/del.png" />
                        <image :src="item" mode="aspectFill"></image>
                    </div>
                </swiper-item>
            </div>
            <div v-else>
                <swiper-item  :class="cardCur==index?'cur':''">
                    <div class="swiper-item">
                        <image src="../../static/images/null.jpg" />
                    </div>
                </swiper-item>
            </div>
        </swiper>
        <div class="hos" >
            <div class="xq-title">{{lists.name}}</div>
            <div class="hos-item" >
                <div>地址：</div>
                <div class="hos-item-color">{{lists.address}}</div>
            </div>
            <div class="hos-item"  >
                <div>评分：</div>
                <div class="hos-item-color" >{{lists.score}}</div>
            </div>
            <div class="hos-item" >
                <div>等级：</div>
                <div class="hos-item-color">{{level}}</div>
            </div>
            <div class="hos-item" >
                <div>联系人：</div>
                <div class="hos-item-color">{{lists.cname}}</div>
            </div>
            <div class="hos-item" >
                <div>联系人电话：</div>
                <div class="hos-item-color">{{lists.mobile}}</div>
            </div>
            <div>注册编号，许可证书：</div>
            <scroll-view scroll-x="true" class="s-x">
                <div v-if="imgroute1.length>0">
                    <div class="z-z-i" v-for="(item,index) in imgroute1" :key="index">
                        <image class="i-d del-img" @tap="del(image2[index].uuid)" src="../../static/images/del.png" />
                        <image :src="item" @tap="ViewImage(index)"  class="f-img"></image>
                    </div>
                </div>
               <div v-else>
                   <image src="../../static/images/null.jpg" class="f-img"/>
               </div>
            </scroll-view>
            <div class="hos-item" >
                <div>类型：</div>
                <div class="hos-item-color">{{type}}</div>
            </div>
            <div class="hos-item" >
                <div>医院简介：</div>
            </div>
            <div class="hos-item-color" style="text-indent:2em">{{lists.introduce}}</div>
        </div>
        <button class="cu-btn block bg-orange lg" style="margin:40rpx" @click.stop="insertinto">完善本院信息</button>
    </div>
</template>

<script>
    import Upload from '@/components/uploadimg'
    import GLOBAL from '@/components/Global'
    export default {
    data(){
      return {
          image1:[],   //临时存放医院照片地址
          image2:[],    //临时存放证件照片地址
          cardCur:0,
          uuid:"",
          lists:[],
          level:"",
          hoslevel:this.$https.state.hoslev,
          hostype:this.$https.state.hostp,
          address:"",
          type:"",
          imgroute:[],
          imgroute1:[],
          guid:""
      }
    },

    onLoad(options){
        this.imgroute=[]
        this.imgroute1=[]
        this.$fly.request({
            method:"post", //post/get 请求方式
            url:this.$https.state.hosinfo,// 医院信息
            body:{
                guid:wx.getStorageSync('guid')
            }
          }).then(res =>{
            this.lists = res.rows[0]
            this.hoslevel.forEach((item,index)=>{       //向页面返回医院等级信息
                if(item.id==this.lists.level){
                    this.level=item.name
                }
            })

            if(this.lists.type == null) {
                this.type = "暂未填写"
            }else{
                this.hostype.forEach((item,index)=>{
                    if(item.id == this.lists.type){
                        this.type=item.name
                    }
                })
            }

            if(this.lists.score == null){         //医院评分
                this.lists.score = "暂未填写"
            }

            if(this.lists.introduce == null){      //医院简介
                this.lists.introduce = "暂未填写"
            }

            this.lists.address = this.lists.address.substr(2, this.lists.address.length - 4).split('","').join(' ')

            this.image1 = JSON.parse(this.lists.images)         //处理返回的医院照片地址
            this.image1.forEach(data=>{
                if(data.imgdate !== null){
                    this.imgroute.push("https://www.ty5m.com:8088/phy/upload/" + data.imgdate.slice(0,10)+ '/' + data.imgroute)
                }
            })

            this.image2 =JSON.parse(this.lists.datasub)          //处理返回的证书照片地址
            this.image2.forEach(data=>{
                if(data.imgdate !== null){
                    this.imgroute1.push("https://www.ty5m.com:8088/phy/upload/" + data.imgdate.slice(0,10)+ '/' + data.imgroute)
                }
            })
        })
    },
    methods: {
        insertinto(){
            mpvue.navigateTo({url: '../hosinfo/main'})
        },
        cardSwiper(e) {
            this.cardCur = e.mp.detail.current;
        },
        del(e){
            console.log(121123)
            this.$fly.request({
                method:"post", //post/get 请求方式
                url:this.$https.state.imgdel,  //照片删除
                body:{
                    uuid:e
                }
            }).then(res => {

            })
            mpvue.reLaunch({url: '../my/main'})
        },
        //预览图片
        ViewImage(index) {
            wx.previewImage({
                urls:this.imgroute1,
                current:this.imgroute1[index]
            })
        },
    }
  }
</script>

<style>
</style>


