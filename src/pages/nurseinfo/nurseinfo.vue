
<!--   护士信息录入  -->

<template>
    <div>
        <div class="cu-form-group">
            <image src="../../static/images/112.svg" class="xx"/>
            <div class="title">科室</div>
            <picker @change="Pickerdep" :value="index1" :range="lists" range-key="name">
                <view class="picker">
                    {{lists.length>0 ? lists[index1].name:'暂时无法选择'}}
                </view>
            </picker>
        </div>

      <div class="cu-form-group">
        <image src="../../static/images/112.svg" class="xx"/>
        <div class="title">姓名</div>
        <input placeholder="请输入姓名" :value="name" @blur="setname">
      </div>
      <div class="cu-form-group">
          <image src="../../static/images/112.svg" class="xx"/>
          <div class="title">身份证号</div>
          <input placeholder="请输入身份证号" :value="idcard" maxlength="18" @input ="setidcard">
      </div>
      <div class="cu-form-group">
          <image src="../../static/images/112.svg" class="xx"/>
          <div class="title">性别</div>
          <radio-group @blur="setsex" style="position:absolute;right:30rpx">
              <label >
                  <radio v-if="sex==0" value="0" checked="true"></radio>
                  <radio v-else value="0"></radio>
                  男
              </label>
              <label >
                  <radio v-if="sex==1" value="1" checked="true"/></radio>
                  <radio v-else value="1"></radio>
                  女
              </label>
          </radio-group>
      </div>
      <div class="cu-form-group">
          <image src="../../static/images/112.svg" class="xx"/>
          <div class="title">生日</div>
          <input :value="date" placeholder="根据身份证号自动补全">
      </div>
      <div class="cu-form-group">
          <image src="../../static/images/112.svg" class="xx"/>
          <div class="title">当前住址</div>
          <input placeholder="请输入住址" :value="address" @input ="setaddress" style="margin-left:100rpx">
      </div>
      <div class="cu-form-group">
          <image src="../../static/images/112.svg" class="xx"/>
        <div class="title">手机号码</div>
        <input placeholder="请输入手机" maxlength="11" :value="mobile" @blur="setmobile">
      </div>
        <div class="cu-form-group">
            <image src="../../static/images/112.svg" class="xx"/>
            <div class="t-c-i">
                <span style="width:290rpx">个人照片上传(示例)</span>
                <image src="https://www.ty5m.com:8088/phy/upload/2019-07-09/92d51e65d8a70feaf2ae33a5ce90017f.jpg" class="s-l-img"/>
            </div>

        </div>
        <Upload  width="155rpx" height="155rpx" max="8" type="getidimg"  @choosed="choosed" :srcs="imgroute"  @getidimg="setidimg" />
        <div class="cu-form-group">
            <image src="../../static/images/112.svg" class="xx"/>
            <div class="title">护师职称</div>
            <picker @change="PickerTitle1" :value="index2" :range="nursezc" range-key="name">
                <view class="picker">
                    {{nursezc.length>0 ?  nursezc[index2].name:'暂时无法选择'}}
                </view>
          </picker>
        </div>
        <div class="cu-form-group">
            <image src="../../static/images/112.svg" class="xx"/>
            <div class="title">护师职务</div>
            <picker @change="PickerTitle2" :value="index3" :range="nursezw" range-key="name">
                <view class="picker">
                    {{nursezw.length>0 ?  nursezw[index3].name:'暂时无法选择'}}
                </view>
            </picker>
        </div>
      <div class="cu-form-group">
          <image src="../../static/images/112.svg" class="xx"/>
        <div class="title">普通员工(是否为负责人)</div>
        <radio-group @change="setdirector" style="position:absolute;right:30rpx">
            <label>
                <radio v-if="director==0" value="0" checked="true"></radio>
                <radio v-else value="0"></radio>
                是
            </label>
            <label >
                <radio v-if="director==1" value="1" checked="true"/></radio>
                <radio v-else value="1"></radio>
                 否
            </label>
        </radio-group>
      </div>
        <div class="cu-form-group">
            <image src="../../static/images/112.svg" class="xx"/>
            <span >手持身份证正/反面照片，资质证书上传(示例)</span>
        </div>
        <div style="background-color:var(--white);display:flex;padding-bottom:30rpx;">
            <div v-for="(item,index) in lists1[0]" :key="index" :index="index">
                <image  :src="item" class="s-l-img"/>
            </div>
        </div>
        <Upload  width="155rpx" height="155rpx" max="8" type="getidimg"  @choosed="choosed" :srcs="imgroute1"  @getidimg="setidimg1" />
        <div class="cu-form-group">
            <image src="../../static/images/112.svg" class="xx"/>
            <div class="title">个人简介</div>
        </div>
        <div class="textarea">
            <textarea placeholder="请输入该护士的个人简介" maxlength="500" :value="instruction" @input="setinstruction"></textarea>
        </div>
        <div class="cu-form-group">
            <image src="../../static/images/112.svg" class="xx"/>
            <div class="title">分配护士账号</div>
            <input placeholder="账号" :value="nurseuser">
        </div>
        <div class="cu-form-group">
            <image src="../../static/images/112.svg" class="xx"/>
            <div class="title">分配护士密码</div>
            <input placeholder="密码" :value="nursepass">
        </div>
        <div v-if="flag" class="cu-form-group">
            <div class="title">修改护士状态</div>
            <picker @change="PickerTStatue" :value="index4" :range="nurstatue" range-key="name">
                <view class="picker">
                    {{nurstatue.length>0 ?  nurstatue[index4].name:'暂时无法选择'}}
                </view>
            </picker>
        </div>
        <button v-if="nid" class="cu-btn block bg-orange margin-tb-sm lg" @tap="insertinto" >确认修改</button>
        <button v-else class="cu-btn block bg-blue margin-tb-sm lg" @tap="nursesubmit" >完成</button>
    </div>

</template>

<script>
  import Upload from '@/components/uploadimg'
  import GLOBAL from '@/components/Global'
  export default {
    data() {
      return {
        nurstatue:this.$https.state.nurstatue,
        lists:[],
        lists1:[
            {
                img1:"https://www.ty5m.com:8088/phy/upload/2019-07-08/3a1383882bd7901def2f039cc85b9f08.jpg",
                img2:"https://www.ty5m.com:8088/phy/upload/2019-07-08/56fe5c6e0fa067a7138f37f4e81c9c5e.jpeg",
                img3:"https://www.ty5m.com:8088/phy/upload/2019-07-08/19a5c7fd88c7327a2bc5895467bbf549.jpg",
                img4:"https://www.ty5m.com:8088/phy/upload/2019-07-08/7ed7a4afa6e77afc2b722b21ddfe13c5.jpg"
            }
        ],
        index1:0,
        flag:false,
        index2:0,
        index3:0,
        index4:0,
        nursezw:this.$https.state.nurzw,
        nursezc:this.$https.state.nurzc,
        date:"",
        name:"",
        idcard:"",
        nurseuser:"",
        nursepass:"",
        sex:0,
        pid:"",
        tid:"",
        instruction:"",
        mobile:15225225255,
        idcardimg:"",
        idcardimg1:"",
        director:0,
        nurseinfo:[],
        nid:"",
        cid:wx.getStorageSync('guid'),
        guid:wx.getStorageSync('guid'),
        imgroute:[],
        imgroute1:[],
        address:"",
      };
    },
    onLoad(options) {
        var that = this
        console.log(that.lists1)
        that.nid = options.nid

        // 数据初始化
        that.dep_id=""
        that.date=""
        that.name=""
        that.idcard=""
        that.address=""
        that.cid=wx.getStorageSync('guid')
        that.guid=wx.getStorageSync('guid')
        that.mobile=""
        that.nurseuser=""
        that.nursepass=""
        that.idcardimg=""
        that.idcardimg1=""
        that.imgroute=[]
        that.imgroute1=[]
        that.instruction=""

        this.$fly.request({
            method:"post", //post/get 请求方式
            url:this.$https.state.deplist,   //科室列表
            body:{
                guid:that.guid
            }
        }).then(res =>{
            that.lists=res.rows
            if(that.lists.length==0){
                wx.showModal({
                    title:"抱歉！",
                    content:"您还未添加科室，请先添加科室！"
                })
            }
        })

        if(that.nid){
            this.$fly.request({
                method:"post", //post/get 请求方式
                url:this.$https.state.nurdetails,       //护士查询
                body:{
                    id:that.nid
                }
            }).then(res =>{
                that.nurseinfo=res.rows[0]
                that.nurseuser=that.nurseinfo.nurseuser
                that.nursepass=that.nurseinfo.nursepass
                that.date=that.nurseinfo.birthday.split(' ')[0]
                that.lists[that.index1].name=that.nurseinfo.dep_id
                that.name=that.nurseinfo.name
                that.address=that.nurseinfo.address
                that.sex=that.nurseinfo.sex
                that.idcard=that.nurseinfo.idcard
                that.nursezw.forEach((item,index)=>{
                    if(item.id==that.nurseinfo.pid){
                        that.nursezw[that.index3].name=item.name
                    }
                })
                that.nursezc.forEach((item,index)=>{
                    if(item.id==that.nurseinfo.tid){
                        that.nursezc[that.index2].name=item.name
                    }
                })
                that.mobile=that.nurseinfo.mobile
                that.nurseuser=that.nurseinfo.username
                that.nursepass='hs'+that.nurseinfo.username
                that.director=that.nurseinfo.director
                that.instruction=that.nurseinfo.instruction
                that.flag=true
            })
        }
    },
    components:{Upload},
    methods: {
        setname(e){this.name=e.mp.detail.value},                         // 获取护士姓名
        setidcard(e){
            this.idcard = e.mp.detail.value                              //获取护士身份证号
            if(this.idcard.length > 18 ||   (this.idcard.length == 18 && !(/^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/.test(this.idcard)))){
                wx.showModal({
                    title: "身份证号输入不合法！",
                    content: "请重新输入！"
                })
            }else{
                this.date = this.idcard.substring(6, 10) + "-" + this.idcard.substring(10, 12) + "-" + this.idcard.substring(12, 14)
                if(parseInt(this.idcard.substr(16, 1)) % 2 == 1){
                    this.sex=0
                }else{
                    this.sex=1
                }
            }
        },
        setaddress(e){this.address = e.mp.detail.value},                   //当前住址
        setmobile(e){
            this.mobile = e.mp.detail.value                              //获取手机号码
            if(this.mobile.length < 11 || !(/^1[34578]\d{9}$/.test(this.mobile))){
                wx.showModal({
                    title: "手机号码输入不合法！",
                    content: "请重新输入！"
                })
            }else if(this.mobile){
                this.nurseuser = this.mobile
                this.nursepass = 'hs'+ this.mobile

                this.$fly.request({
                    method: "post",
                    url: this.$https.state.nurselect,
                    body: {
                        mobile:this.mobile
                    }
                }).then(res => {
                    if(res.rows.length > 0){
                        wx.showModal({
                            title: '抱歉！',
                            content: '该手机号已经注册过啦！',
                        })
                    }
                }).catch((err)=>{
                    if(err.status==500){
                        wx.showModal({
                            title:'抱歉！',
                            content:'请求失败！'
                        })
                    }
                    wx.hideLoading();
                })
            }
        },
        setinstruction(e){
            this.instruction = e.mp.detail.value                  //获取护士个人简介
        },
        setdirector(e){
            this.director = e.mp.detail.value                     //获取普通员工（是否为负责人）
            console.log(this.director)
        },
        Pickerdep(e){
            this.index1 = e.mp.detail.value                        //获取科室信息
            console.log(this.index1)
        },

        PickerTitle1(e){
            this.index2 = e.mp.detail.value                      //获取职称信息
            console.log(this.index2)

        },
        PickerTitle2(e){
            this.index3 = e.mp.detail.value                      //获取职务信息
            console.log(this.index3)
        },
        PickerTStatue(e){
            this.index4 = e.mp.detail.value                      //获取护士状态
            console.log(this.index4)
        },

        //修改功能
        insertinto(){
            this.$fly.request({
                method:"post", //post/get 请求方式
                url:this.$https.state.nuralter,     //修改护士   http://192.168.2.27:8080/hi/main?hi=24969FGJJEIF
                body:{
                     nid:this.nid,
                     dep_id:this.lists[this.index1].uuid,
                     name:this.name,
                     sex:this.sex,
                     birthday:this.date,
                     idcard:this.idcard,
                     tid:this.nursezc[this.index2].id,           //职称
                     pid:this.nursezw[this.index3].id,           //职务
                     cid:this.cid,
                     mobile:this.mobile,
                     username:this.nurseuser,
                     password:this.nursepass,
                     img:this.idcardimg,
                     datasub:this.idcardimg1,
                     director:this.director,
                     instruction:this.instruction,
                     address:this.address
                    }
                }).then(res =>{
                mpvue.reLaunch({ url: '../index/main' })
            }).catch((err)=>{
                if(err.status==500){
                    wx.showModal({
                        title:'抱歉！',
                        content:'提交失败！'
                    })
                }
                wx.hideLoading();
            })
            this.$fly.request({
                method: "post", //post/get 请求方式
                url: this.$https.state.alertstatue,     //修改护士状态
                body: {
                    nid:this.nid,
                    statue:this.nurstatue[this.index4].id
                },
            }).then(res =>{

            })
        },
       //添加护士
      nursesubmit(){
            console.log(23131231)
          this.$fly.request({
            method:"post", //post/get 请求方式
            url:this.$https.state.nuradd,  //添加功能
            body:{
              dep_id:this.lists[this.index1].uuid,
              name:this.name,
              sex:this.sex,
              birthday:this.date,
              idcard:this.idcard,
              tid:this.nursezc[this.index2].id,         //职称id
              pid:this.nursezw[this.index3].id,         //职务id
              instruction:this.instruction,             //简介
              cid:this.cid,                             //单位id
              mobile:this.mobile,
              nurseuser:this.nurseuser,                 //护士账号
              nursepass:this.nursepass,                 //护士密码
              userName:this.nurseuser,
              pwd:this.nursepass,
              modelid:'249GTBY2RRYI',
              img:this.idcardimg,                       //护士个人照片
              datasub:this.idcardimg1,                  //护士资质证书
              director:this.director,
              address:this.address
            }
          }).then(res =>{
              mpvue.reLaunch({ url: '../index/main' })
          }).catch((err)=>{
              if(err.status==500){
                  wx.showModal({
                      title:'抱歉！',
                      content:'提交失败！'
                  })
              }
              wx.hideLoading();
          })
      },

        //获取图片地址
       setidimg(e){
            this.idcardimg=JSON.stringify(e)        //个人照片本地地址
       },
        setidimg1(e){
            this.idcardimg1=JSON.stringify(e)       //资质证书照片本地地址
        }
    }
  }
</script>

<style>
button{
    margin:60rpx 40rpx;
  }
</style>
