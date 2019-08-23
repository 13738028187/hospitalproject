
<!--   科室信息录入  -->

<template>
    <form >
      <div class="cu-form-group">
          <image src="../../static/images/112.svg" class="xx"/>
          <div class="title">科室名称</div>
          <picker @change="PickerHosdep" :value="index1" :range="hosdep" range-key="name">
              <view class="picker">
                  {{hosdep.length>0 ? hosdep[index1].name:'暂时无法选择'}}
              </view>
          </picker>
       </div>
        <div class="cu-form-group">
            <image src="../../static/images/112.svg" class="xx"/>
            <div class="title">科室电话</div>
            <input placeholder="请输入科室电话" maxlength="11" :value="mobile" @input="setmobile">
        </div>
        <div class="cu-form-group">
            <image src="../../static/images/112.svg" class="xx"/>
            <div class="title">是否为强科</div>
            <radio-group @change="setstrong" style="position:absolute;right:30rpx">
                <label >
                    <radio v-if="strong==0" value="0" checked="true"></radio>
                    <radio v-else value="0"></radio>
                    是
                </label>
                <label >
                    <radio v-if="strong==1" value="1" checked="true"/></radio>
                    <radio v-else value="1"></radio>
                    否
                </label>
            </radio-group>
        </div>
        <div class="cu-form-group">
            <image src="../../static/images/112.svg" class="xx"/>
             <div class="title">科室类型</div>
             <picker @change="PickerChange" :value="index" :range="deptype" range-key="name">
                  <view class="picker">
                         {{deptype.length>0 ?  deptype[index].name:'暂时无法选择'}}
                  </view>
             </picker>
        </div>
        <div v-if="lists1.length==0" value="nid"></div>
        <div v-else class="cu-form-group">
            <image src="../../static/images/112.svg" class="xx"/>
            <div class="title">科室主任</div>
            <picker @change="PickerName" :value="index2" :range="lists1" range-key="name">
                <view class="picker">
                    {{lists1.length>0 ?  lists1[index2].name:'暂时无法选择'}}
                </view>
            </picker>
        </div>
        <button v-if="uuid" class="cu-btn block bg-orange margin-tb-sm lg" @tap="insertinto">确认修改</button>
        <button v-else class="cu-btn block bg-blue margin-tb-sm lg" @tap="depsubmit" >完成</button>

    </form>
</template>

<script>
  import GLOBAL from '@/components/Global'
  export default {
    data() {
      return {
          uuid:"",
          index:0,
          index1:0,
          index2:0,
          lists1:[],
          mobile:"",
          nid:"",
          nurlist:[],
          strong:0,
          hosdep:this.$https.state.hosdep,      //医院科室字典表
          deptype:this.$https.state.deptp,      //科室类型字典表
          guid:"",
          depinfo:[],
          deplist:[]
      }
    },
    onLoad(options){
            this.uuid = options.uuid
            this.insert()

            //页面加载时，将表单数据初始化
            this.mobile=""
            this.index=0
            this.strong=0
            this.nid=""
      },
    methods: {
        setmobile (e) {
            this.mobile = e.mp.detail.value       // 获取科室电话
            if(this.mobile.length > 11 || (this.mobile.length == 11 && !(/^1[34578]\d{9}$/.test(this.mobile)))){
                wx.showModal({
                    title: "手机号码输入不合法！",
                    content: "请重新输入！"
                })
            }
        },
       PickerName(e){
            this.index2 = e.mp.detail.value        //科室主任
        },
        setstrong (e) {
            this.strong = e.mp.detail.value;      // 科室是否为强科
        },
        PickerChange (e) {
            this.index = e.mp.detail.value        // 科室类型切换
        },
        PickerHosdep(e){
            this.index1 = e.mp.detail.value
            this.$fly.request({
                    method: "post", //post/get 请求方式
                    url: this.$https.state.deplist,    //科室列表查询
                    body: {
                        guid: wx.getStorageSync('guid')
                    }
                }).then(res => {
                    this.deplist = res.rows
                    this.deplist.forEach((item, index) => {
                        if (this.hosdep[this.index1].name == item.name) {
                            wx.showModal({
                                title: '注意！',
                                content: '此科室已存在，请勿重复添加！',
                            })
                        }
                    })
                })
        },
        insert(){
            this.$fly.all([this.insert1(),this.insert2()]).then(this.$fly.spread((records,projects)=>{
            })).catch(error=>{
                console.log(error)
            })
        },
        insert1(){
            this.$fly.request({
                method: "post", //post/get 请求方式
                url:this.$https.state.depdetails,       //科室信息查询
                body: {
                    id:this.uuid
                }
            }).then(res => {
                this.depinfo=res.rows[0]
                this.hosdep[this.index1].name=this.depinfo.name
                this.mobile=this.depinfo.mobile
                this.index=this.depinfo.type
                this.strong=this.depinfo.strong
            })
        },
        insert2(){
            this.$fly.request({
                method:"post", //post/get 请求方式
                url:this.$https.state.nurlist1,         // 护士列表
                body:{
                    depid:this.uuid
                }
            }).then(res =>{
                this.lists1 = res.rows
                if(this.lists1.length==0){
                    this.nid=""
                }else{
                    this.nid=this.lists1[this.index2].nid
                }
            })
        },


        //科室增加
        depsubmit () {
              this.$fly.request({
                    method: "post", //post/get 请求方式
                    url: this.$https.state.depadd, //添加科室信息
                    body: {
                         name:this.hosdep[this.index1].name,
                         mobile: this.mobile,
                         nid:this.nid,
                         strong: this.strong,
                         type: this.deptype[this.index].id,
                         guid: wx.getStorageSync('guid')
                    }
               }).then(res => {
                  mpvue.reLaunch({url: '../my/main'})
               }).catch((err)=>{
                  console.log(err)
                  if(err.status==500){
                      wx.showModal({
                          title:'抱歉！',
                          content:'提交失败！'
                      })
                  }
                  wx.hideLoading();
              })
        },

        //科室修改
        insertinto () {
            this.$fly.request({
                method: "post", //post/get 请求方式
                url: this.$https.state.depalter,    //科室修改
                body: {
                    name:this.hosdep[this.index1].name,
                    mobile: this.mobile,
                    nid:this.nid,
                    strong: this.strong,
                    type: this.deptype[this.index].id,
                    uuid:this.uuid
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
        }
    }
  }
</script>

<style>
  button{
    margin:60rpx 40rpx;
  }

</style>
