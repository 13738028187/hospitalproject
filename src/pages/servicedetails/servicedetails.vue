
<!--科室详情页-->

<template>
    <div>
        <div class="cu-bar bg-white margin-top">
            <div class="action">
                <text class="icon-titles text-orange"></text> 服务照片
            </div>
        </div>
        <swiper class="card-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
                :autoplay="true" interval="4000" duration="500" @change="cardSwiper" indicator-color="#8799a3"
                indicator-active-color="#0081ff">
            <div v-if="imgroute.length>0">
                <swiper-item v-for="(item,index) in imgroute" :key="index" :class="cardCur==index?'cur':''">
                    <div class="swiper-item">
                        <image class="del-img" @tap="del(image1[index].uuid)" src="../../static/images/del.png" />
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

<!--        <swiper class="card-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"-->
<!--                :autoplay="true" interval="4000" duration="500" @change="cardSwiper" indicator-color="#8799a3"-->
<!--                indicator-active-color="#0081ff">-->
<!--            <div v-if="imgroute.length>0">-->
<!--                <swiper-item v-for="(item,index) in imgroute" :key="index" :class="cardCur==index?'cur':''">-->
<!--                    <div class="swiper-item">-->
<!--                        <div class="del-img" @tap="del(image1[index].uuid)">X</div>-->
<!--                        <image v-if="imgroute" :src="item" mode="aspectFill"></image>-->
<!--                        <image v-else src="../../static/images/null.jpg" />-->
<!--                    </div>-->
<!--                </swiper-item>-->
<!--            </div>-->
<!--            <div v-else>-->
<!--                <image src="../../static/images/null.jpg" />-->
<!--            </div>-->
<!--        </swiper>-->
        <div class="hos out-shadow">
            <div class="xq-title">{{lists.name}}</div>
            <div class="hos-item">
                <div >服务内容：</div>
            </div>
            <div  class="hos-item-color" style="text-indent:2em">{{lists.content}}</div>
            <div class="hos-item">
                <div >服务等级：</div>
                <div  class="hos-item-color">{{serlevel}}</div>
            </div>
            <div class="hos-item">
                <div>服务对象性别：</div>
                <div  class="hos-item-color">{{lists.sex}}</div>
            </div>
            <div class="hos-item">
                <div>适合年龄段：</div>
                <div  class="hos-item-color">{{lists.age}}岁</div>
            </div>
            <div class="hos-item">
                <div>服务人群：</div>
                <div  class="hos-item-color">{{lists.target}}</div>
            </div>
            <div class="hos-item">
                <div>服务时长：</div>
                <div  class="hos-item-color">{{lists.duration}}/小时</div>
            </div>
            <div class="hos-item" >医药器械包：</div>
            <div v-for="(item , index) in machines" :key="index" :index="index" style="padding:0 40rpx" @tap="look(item.uuid)">
                <div class="hos-item-color"><span style="color:red;margin-right:10rpx">{{index+1}}.</span><span>{{item.name}}</span></div>
            </div>
            <div class="hos-item">
                <div>服务价格：</div>
                <div class="text-price hos-item-color">{{lists.price}}</div>
            </div>
        </div>
        <button class="cu-btn block bg-orange lg" style="margin:40rpx" @click.stop="Revise(pid)">修改</button>
    </div>
</template>

<script>
  export default {
    data() {
      return {
          cardCur:0,
          lists:[],
          machines:[],
          pid:"",
          uuid:"",
          image1:[],
          serlevel:"",
          hllevel:this.$https.state.hllevel,
          imgroute:[]
      }
    },

    onLoad(options){
        this.pid=options.pid
        this.imgroute=[]
        this.$fly.request({
            method:"post", //post/get 请求方式
            url:this.$https.state.serdetails,   // 服务详情
            body:{
              pid:this.pid
            }
          }).then(res =>{
              console.log(this.lists)
              this.lists=res.rows[0]
              this.machines=JSON.parse(this.lists.machine)
                if(this.lists.sex==0){
                    this.lists.sex='男'
                }else if(this.lists.sex==1){
                    this.lists.sex='女'
                }else{
                    this.lists.sex='不限'
                }
              this.hllevel.forEach((item,index)=>{
                  if(item.id==this.lists.level){
                     this.serlevel=item.name
                  }
              })
              this.level=this.lists.level
              this.image1 = JSON.parse(this.lists.image)
              this.image1.forEach(data=>{
                   this.imgroute.push("https://www.ty5m.com:8088/phy/upload/" + data.dateline.slice(0,10)+ '/' + data.address)
               })
        })
  },
    methods: {
        Revise(e){
            mpvue.navigateTo({url: '../serviceinfo/main?pid='+e})
        },
        cardSwiper(e) {
            this.cardCur = e.mp.detail.current
        },
        look(e){    //查看医药器械包详情
            mpvue.navigateTo({url: '../apparatuspackdetails/main?uuid='+e})
        },

        //执行照片删除操作
        del(e){
            this.$fly.request({
                method:"post", //post/get 请求方式
                url:this.$https.state.imgdel,  //照片删除
                body:{
                    uuid:e
                }
            }).then(res => {

            })
            mpvue.reLaunch({url: '../servicelist/main'})
        }


    }
  }
</script>

<style>
</style>


