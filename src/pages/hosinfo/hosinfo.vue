
<!--   医院信息修改  -->

<template>
    <div >
      <div class="cu-form-group">
          <image src="../../static/images/112.svg" class="xx"/>
        <div class="title">修改医院名称</div>
        <input style="margin-left:50rpx" placeholder="请输入医院名称" :value="name" @blur="setname">
      </div>
      <div class="cu-form-group">
          <image src="../../static/images/112.svg" class="xx"/>
        <div class="title">修改评分</div>
        <input placeholder="分数范围（0-100）" :value="score" @blur="setscore">
      </div>
      <div class="cu-form-group">
          <image src="../../static/images/112.svg" class="xx"/>
          <div class="title" style="width:100px;">修改等级</div>
          <picker @change="changelevel" :value="index" :range="hoslevel" range-key="name">
              <view class="picker">
                  {{hoslevel[index].name ? hoslevel[index].name : '请选择等级'}}
              </view>
          </picker>
      </div>
      <div class="cu-form-group">
          <image src="../../static/images/112.svg" class="xx"/>
        <div class="title" style="width:100px;">修改地址</div>
          <picker mode="region" @change="bindRegionChange" :value="region" :custom-item="customItem">
            <view class="picker">
              {{region? region:'选择地址'}}
            </view>
          </picker>
      </div>
      <div class="cu-form-group">
          <image src="../../static/images/112.svg" class="xx"/>
        <div class="title">修改手机号</div>
        <input placeholder="请输入手机号" :value="mobile" @blur="setmobile">
      </div>
      <div class="cu-form-group">
          <image src="../../static/images/112.svg" class="xx"/>
        <div class="t-c-i">
            <span>医院照片上传(示例)</span>
            <image src="https://www.ty5m.com:8088/phy/upload/2019-07-05/e195544b71cd803bea2ebf06806aef56.jpg" class="s-l-img"/>
        </div>
      </div>
        <Upload width="155rpx" height="155rpx" max="6"  type="getidimg" @choosed="choosed" :srcs="imgroute" @delete=""  @getidimg="setidimg" />


        <div class="cu-form-group">
            <image src="../../static/images/112.svg" class="xx"/>
            <div class="t-c-i">
                <span>注册编号，许可证书上传(示例)</span>
                <image src="https://www.ty5m.com:8088/phy/upload/2019-07-05/22f4ab03c507818421ac41d849e6d0e8.jpg" class="s-l-img"/>
            </div>
        </div>
        <Upload width="155rpx" height="155rpx" max="6"  type="getidimg" @choosed="choosed" :srcs="imgroute1" @delete=""  @getidimg="setidimg1" />
       <div class="cu-form-group">
           <image src="../../static/images/112.svg" class="xx"/>
            <div class="title">医院类型</div>
            <picker @change="PickerTitle" :value="index1" :range="hostype" range-key="name">
                <view class="picker">
                    {{hostype.length>0?hostype[index1].name:'暂时无法选择'}}
                </view>
            </picker>
        </div>
        <div class="cu-form-group">
            <image src="../../static/images/112.svg" class="xx"/>
            <div class="title">修改医院简介</div>
        </div>
        <div class="textarea" style="height:500rpx">
            <textarea placeholder="请输入该医院的简介" maxlength="500" :value="introduce" @input="setintroduce"></textarea>
        </div>
        <button class="cu-btn block bg-orange margin-tb-sm lg" @tap="insertinto" >确认修改</button>
    </div>
</template>

<script>
  import Upload from '@/components/uploadimg'
  import GLOBAL from '@/components/Global'
  export default {
    data() {
      return {
          name:"",
          score:"",
          region:"",
          mobile:"",
          introduce:"",
          index:0,
          index1:0,
          level:"",
          hoslevel:this.$https.state.hoslev,
          hostype:this.$https.state.hostp,
          hosinfo:[],
          imgroute:[],
          img:"",
          imgroute1:[],
          img1:"",
          guid:""
      }
    },
    onLoad(options) {
            this.imgroute=[]
            this.img=""
            this.imgroute1=[]
            this.img1=""
            this.index1=0
            this.index=0
            this.$fly.request({
                method:"post", //post/get 请求方式
                url:this.$https.state.hosinfo,     //医院信息
                body:{
                    guid:wx.getStorageSync('guid')
                }
            }).then(res =>{
                this.hosinfo=res.rows[0]
                this.name=this.hosinfo.name
                this.region=this.hosinfo.address.substr(2, this.hosinfo.address.length - 4).split('","')
                console.log(this.region)
                this.introduce=this.hosinfo.introduce
                this.hoslevel.forEach((item,index)=>{
                    if(item.id==this.hosinfo.level){
                        this.hoslevel[this.index].name=item.name
                    }
                })
                this.hostype.forEach((item,index)=>{
                    if(item.id==this.hosinfo.type){
                        this.hostype[this.index1].name=item.name
                    }
                })

                this.mobile=this.hosinfo.mobile
                this.score=this.hosinfo.score
            })
    },
    components:{Upload},
    methods: {
        PickerTitle(e){
            this.index1 = e.mp.detail.value                         //选择医院类型
        },
        changelevel(e){
            this.index = e.mp.detail.value                          //选择医院等级
        },

        bindRegionChange(e){this.region = e.mp.detail.value},       //获取地址
        setname(e){this.name=e.mp.detail.value},                    //获取用户输入的名字
        setmobile(e){this.mobile=e.mp.detail.value},                //获取输入的电话
        setintroduce(e){this.introduce=e.mp.detail.value},          //获取医院简介
        setlevel(e){this.level=e.mp.detail.value},                  //获取医院等级
        setscore(e){this.score=e.mp.detail.value},                  //获取医院评分


        //医院信息修改
        insertinto(){
            this.$fly.request({
                method:"post", //post/get 请求方式
                url:this.$https.state.hosalter,  //医院修改
                body:{
                    value1:this.name,
                    value2:this.mobile,
                    value3:this.hoslevel[this.index].id,        //医院等级
                    value4:this.score,                          //评分
                    value5:JSON.stringify(this.region),         //医院地址
                    value6:this.hostype[this.index1].id,        //医院类型
                    introduce:this.introduce,                   //医院简介
                    img:this.img,                               //医院照片
                    datasub:this.img1,                          //资质证书照片
                    value7:wx.getStorageSync('guid')
                }
            }).then(res => {
                mpvue.reLaunch({url: '../my/main'})
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

        //获取医院图片地址
        setidimg(e){
            this.img=JSON.stringify(e)
        },
        //获取医院资质照片地址
        setidimg1(e){
            this.img1=JSON.stringify(e)
        }
    }
  }
</script>

<style>
    button{
        margin:60rpx 40rpx;
  }
    .textarea{
        height:400rpx;
        background-color:var(--white);
    }
.textarea textarea{
    height:400rpx;
    width:92%;
    border:1rpx solid #ccc;
    border-radius:20rpx;
    margin:0 30rpx;
    padding:20rpx;
    font-szie:28rpx;
}
</style>
