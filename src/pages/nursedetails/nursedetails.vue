<template>
  <div>
      <div class="cu-bar bg-white solid-bottom">
          <div class="action">
              <text class="icon-title text-orange "></text>护士详情
          </div>
      </div>
      <div class="hos" style="margin-top:30rpx">
          <div class="hos-item">
              <div >姓名：</div>
              <div class="hos-item-color">{{lists.name}}</div>
          </div>
          <div class="hos-item">
              <div>性别：</div>
              <div class="hos-item-color">{{lists.sex == 0 ? '男':'女'}}</div>
          </div>
          <div class="hos-item">
              <div >所属科室：</div>
              <div class="hos-item-color">{{lists.dep_id}}</div>
          </div>
          <div class="hos-item">
              <div >出生日期：</div>
              <div class="hos-item-color">{{lists.birthday}}</div>
          </div>
          <div style="display:flex;">
              <div>当前住址：</div>
              <div class="hos-item-color" style="width:430rpx">{{lists.address}}</div>
          </div>
          <div class="hos-item">
              <div >身份证号：</div>
              <div class="hos-item-color">{{lists.idcard}}</div>
          </div>
          <div >身份证手持照正/反面：</div>
          <scroll-view scroll-x="true" class="s-x">
              <div v-if="imgroute.length>0">
                  <div class="z-z-i" v-for="(item,index) in imgroute" :key="index">
                      <image class="i-d del-img" @tap="del(image1[index].uuid)" src="../../static/images/del.png" />
                      <image :src="item" @tap="ViewImage(index)"  class="f-img"></image>
                  </div>
              </div>
              <div v-else>
                  <image src="../../static/images/null.jpg" class="f-img"/>
              </div>
          </scroll-view>
          <div class="hos-item">
              <div >手机号：</div>
              <div class="hos-item-color">{{lists.mobile}}</div>
          </div>
          <div class="hos-item">
              <div >职称：</div>
              <div class="hos-item-color">{{zc}}</div>
          </div>
          <div class="hos-item">
              <div >职务：</div>
              <div class="hos-item-color">{{zw}}</div>
          </div>
          <div class="hos-item">
              <div >是否为负责人：</div>
              <div class="hos-item-color">{{lists.director == 0 ? '是':'否'}}</div>
          </div>
          <div>相关资质证书：</div>
          <scroll-view scroll-x="true" class="s-x">
              <div v-if="imgroute1.length>0">
                  <div class="z-z-i" v-for="(item,index) in imgroute1" :key="index">
                      <image class="i-d del-img" @tap="del(image2[index].uuid)" src="../../static/images/del.png" />
                      <image :src="item" @tap="ViewImage1(index)"  class="f-img"></image>
                  </div>
              </div>
              <div v-else>
                  <image src="../../static/images/null.jpg" class="f-img"/>
              </div>
          </scroll-view>
          <div class="hos-item">
              <div >个人简介：</div>
          </div>
          <div class="hos-item-color" style="text-indent:2em">{{lists.instruction}}</div>
      </div>
      <button class="cu-btn block bg-orange lg" style="margin:40rpx" @click.stop="Revise(nid)">修改</button>
  </div>
</template>

<script>
  export default {
      data () {
          return {
              lists:[],
              image1:[],
              image2:[],
              nursezw:this.$https.state.nurzw,
              nursezc:this.$https.state.nurzc,
              imgroute:[],      //个人照片
              imgroute1:[],     //资质证书
              zw:"",
              zc:"",
              nid:"",
              index:0,
          };
      },
      onLoad (options) {
          this.nid = options.nid
          this.imgroute=[]
          this.imgroute1=[]
          this.$fly.request({
              method: "post", //post/get 请求方式
              url: this.$https.state.nurdetails,    //护士查询
              body: {
                  id:this.nid
              }
          }).then(res => {
              this.lists = res.rows[0];
              this.lists.birthday = this.lists.birthday.split(' ')[0]
              if(this.lists.address == "null"){
                  this.lists.address = "暂未填写"
              }

              //个人照片
              if(this.lists.image !==null ){
                  this.image1 = JSON.parse(this.lists.image)
                  this.image1.forEach(data => {
                      this.imgroute.push("https://www.ty5m.com:8088/phy/upload/" + data.dateline.split(' ')[0] + '/' + data.image)
                  })
              }

              //资质证书
                if(this.lists.datasub!==null){
                    this.image2 = JSON.parse(this.lists.datasub)
                    this.image2.forEach(data => {
                        this.imgroute1.push("https://www.ty5m.com:8088/phy/upload/" + data.dateline.split(' ')[0] + '/' + data.image)
                    })
                }

              this.nursezw.forEach((item,index)=>{
                 if(item.id==this.lists.pid){
                     this.zw=item.name
                 }
              })
              this.nursezc.forEach((item,index)=>{
                  if(item.id==this.lists.tid){
                      this.zc=item.name
                  }
              })
          })

      },

      methods: {
          //预览图片
          ViewImage(index) {
              wx.previewImage({
                  urls:this.imgroute,
                  current:this.imgroute[index]
              });
          },
          //预览图片
          ViewImage1(index) {
              wx.previewImage({
                  urls:this.imgroute1,
                  current:this.imgroute1[index]
              });
          },
          //删除照片
          del(e){
              console.log(e)
              this.$fly.request({
                  method:"post", //post/get 请求方式
                  url:this.$https.state.imgdel,  //照片删除
                  body:{
                      uuid:e
                  }
              }).then(res => {

              })
              mpvue.reLaunch({url: '../index/main'})
          },
          Revise(e){
              mpvue.navigateTo({url: '../nurseinfo/main?nid='+e})
          },
      }
  }

</script>

<style>

</style>

