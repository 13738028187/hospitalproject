
<!--   添加服务  -->

<template>
    <form >
      <div class="cu-form-group">
        <image src="../../static/images/112.svg" class="xx"/>
        <div class="title">服务名称</div>
        <input placeholder="请输入服务名称" :value="name" @blur="setname">
      </div>
        <div class="cu-form-group">
            <image src="../../static/images/112.svg" class="xx"/>
            <div class="title">服务等级</div>
            <picker @change="Pickerlevel" :value="index" :range="hllevel" range-key="name">
                <view class="picker">
                    {{hllevel.length>0 ?  hllevel[index2].name:'暂时无法选择'}}
                </view>
            </picker>
        </div>
        <div class="cu-form-group">
            <image src="../../static/images/112.svg" class="xx"/>
            <div class="title">服务对象性别</div>
            <radio-group @change="setsex" style="position:absolute;right:30rpx">
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
                <label >
                    <radio v-if="sex==2" value="2" checked="true"/></radio>
                    <radio v-else value="2"></radio>
                    不限
                </label>
            </radio-group>
        </div>
        <div class="cu-form-group">
            <image src="../../static/images/112.svg" class="xx"/>
            <div class="title">服务对象年龄段</div>
            <input placeholder="服务对象年龄段" :value="age" @blur="setage">
        </div>
        <div class="cu-form-group">
            <image src="../../static/images/112.svg" class="xx"/>
            <div class="title">服务人群</div>
            <input placeholder="服务人群" :value="target" @blur="settarget">
        </div>
        <div class="cu-form-group">
            <image src="../../static/images/112.svg" class="xx"/>
            <div class="title">服务照片上传</div>
        </div>
        <Upload width="120rpx" height="120rpx" max="6"  type="getidimg" @choosed="choosed" :srcs="imgroute" @getidimg="setidimg" />
        <div class="cu-form-group">
            <image src="../../static/images/112.svg" class="xx"/>
            <div class="title">服务时长</div>
            <input placeholder="服务时长(小时)" :value="duration" @blur="setduration">
        </div>
        <div class="cu-form-group">
            <image src="../../static/images/112.svg" class="xx"/>
            <div class="title">服务价格</div>
            <input placeholder="请输入服务价格" :value="price" @blur="setprice">
        </div>
        <div v-for="(item,index) in arr" :key="index">
            <div v-if="index<flag" class="box shadow-warp">
                <div class="cu-form-group" style="justify-content: space-between">
                    <div class="title" style="color:#353535">医药器械包</div>
                    <div>{{arrayname[index]}}</div>
                </div>
            </div>
            <div v-else class="box shadow-warp">
                <div class="cu-form-group" style="">
                    <div class="title" style="color:#353535">医药器械包</div>
                    <picker @change="Pickername" :value="index1" :range="lists" range-key="name" >
                        <view class="picker">
                            {{lists.length>0 ?  lists[index1].name :'暂时无法选择'}}
                        </view>
                    </picker>
                </div>
            </div>
        </div>
        <div style="width:100%;padding:10rpx 0 50rpx 0">
            <button class="cu-btn block bg-orange margin-tb-sm lg btn"  @tap="add">+</button>
        </div>
        <div class="cu-form-group">
            <image src="../../static/images/112.svg" class="xx"/>
            <div class="title">服务内容</div>
        </div>
        <div class="textarea" style="height:500rpx">
            <textarea placeholder="请输入该服务的具体内容" maxlength="500" :value="content" @blur="setcontent"></textarea>
        </div>
        <button v-if="pid" class="cu-btn block bg-orange margin-tb-sm lg" @tap="insertinto" >确认修改</button>
        <button v-else class="cu-btn block bg-blue margin-tb-sm lg" @tap="ServiceSubmit" >完成</button>
    </form>
</template>

<script>
  import GLOBAL from '@/components/Global'
  import Upload from '@/components/uploadimg'
  export default {
    data() {
      return {
          arr:[1],
          index1:0,
          sex:"",
          flag:0,
          hllevel:this.$https.state.hllevel,
          index2:0,
          arrayname:[],     //存放医药器械包名称
          arrayuuid:[],     //存放医药器械包id
          pid:"",
          name:"",
          uid:"1212",
          content:"",
          level:"",
          age:"",
          guid:"",
          target:"",
          duration:"",
          price:"",
          lists:[],
          serviceinfo:[],   //存放所有从“服务详情”数据库中返回的值
          uuid:"",           //医药器械包唯一id
          imgroute:[],
          serviceimg:"",
          addpid:""
      };
    },
    onLoad(options){
        this.pid=options.pid
        this.insert()


        //点击添加按钮时，初始化页面中的值
        this.name=""
        this.uuid=""
        this.image=""
        this.uid=""
        this.content=""
        this.level=""
        this.age=""
        this.target=""
        this.duration=""
        this.price=""
        this.index=0
        this.index1=0
        this.index2=0
        this.serviceimg=""
        this.imgroute=[]
        this.sex=0
        this.arrayuuid=[]
        this.arrayname=[]
    },
    components:{ Upload },
    methods: {
        insert(){
                this.$fly.all([this.insert1(),this.insert2()]).then(this.$fly.spread((records,projects)=>{

                })).catch(error=>{
                    console.log(error)
                })
            },


        insert1(){
            return this.$fly.request({
                method:"post", //post/get 请求方式
                url:this.$https.state.aprpacklist, //服务包列表  http://192.168.2.27:8080/hi/main?hi=24987F6N1JHO
                body:{
                    guid:wx.getStorageSync('guid')
                }
            }).then(res =>{
                this.lists=res.rows
                if(this.lists.length==0){
                    wx.showModal({
                        title:'抱歉！',
                        content:'还没有可以选择的医药器械！'
                    })
                }
            })
        },
        insert2(){
            //服务详细信息
            return this.$fly.request({
                method:"post", //post/get 请求方式
                url:this.$https.state.serdetails,
                body:{
                    pid:this.pid
                }
            }).then(res =>{
                this.serviceinfo=res.rows[0]
                this.name=this.serviceinfo.name
                this.sex=this.serviceinfo.sex
                this.content=this.serviceinfo.content
                this.level=this.serviceinfo.level
                this.age=this.serviceinfo.age
                this.target=this.serviceinfo.target
                this.duration=this.serviceinfo.duration
                this.price=this.serviceinfo.price
            })
        },

        //点击添加按钮
        add(){
            this.arrayname.push(this.lists[this.index1].name)
            this.flag = this.flag+1
            this.arr.push(1)
            this.arrayuuid.push(this.lists[this.index1].uuid)
            console.log(this.arrayuuid.toString())
        },

        Pickername(e){
            this.index1=e.mp.detail.value                       //改变医药器械包名称
            console.log(this.index1)
        },
        Pickerlevel(e){
            this.index2 = e.mp.detail.value                     //服务等级切换
            console.log(this.index2)
        },

        setname(e){this.name=e.mp.detail.value},                 //获取服务名称
        setcontent(e){this.content=e.mp.detail.value},           //获取服务内容
        setsex(e) {
            this.sex = e.mp.detail.value                         //获取服务对象性别
            console.log(this.sex)
        },
        setlevel(e){this.level = e.mp.detail.value},             //获取服务等级
        setage(e){this.age=e.mp.detail.value},                   //获取服务对象年龄
        settarget(e){this.target = e.mp.detail.value},           //获取服务人群
        setduration(e){this.duration = e.mp.detail.value},       //获取服务时长
        setprice(e){this.price = e.mp.detail.value},             //获取服务价格

        //点击“确认修改”按钮的下一步操作
        insertinto(){
            this.arrayuuid.push(this.lists[this.index1].uuid)
            this.$fly.request({
                method:"post", //post/get 请求方式
                url:this.$https.state.seralert,           //服务修改接口
                body:{
                    pid:this.pid,       //服务项目id
                    name:this.name,
                    img:this.serviceimg,
                    uid:"1212",
                    content:this.content,
                    level:this.hllevel[this.index2].id,
                    sex:this.sex,
                    age:this.age,
                    target:this.target,
                    duration:this.duration,
                    price:this.price,
                    area:"((10.5,12.5),6)",
                    guid:wx.getStorageSync('guid')
                }
            }).then(res =>{
                this.arrayuuid.forEach((item,index)=>{
                    console.log(item)
                    this.$fly.request({
                        method:"post", //post/get 请求方式
                        url:this.$https.state.addseraprpack,     //服务服务包增加
                        body:{
                            pid:this.pid,
                            uuid:item,
                            statue:0
                        }
                    }).then(res =>{})
                })
                mpvue.reLaunch({ url: '../my/main' })
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

        //点击“完成”按钮的下一步操作
        ServiceSubmit(){
            this.arrayuuid.push(this.lists[this.index1].uuid)
            this.$fly.request({
                    method:"post", //post/get 请求方式
                    url:this.$https.state.findservice,         //服务查询
                    body:{
                        name:this.name,
                        guid:wx.getStorageSync('guid')
                    }
                }).then(res => {
                    console.log(res.rows)
                if (res.rows.length > 0) {
                    wx.showModal({
                        title:'抱歉!',
                        content:'服务已存在，请勿重复添加！'
                    })
                }else{
                    this.$fly.request({
                        method: "post", //post/get 请求方式
                        url: this.$https.state.seradd,       //服务增加
                        body: {
                            name: this.name,
                            image: this.serviceimg,
                            uid: "1212",
                            content: this.content,
                            level:this.hllevel[this.index2].id,
                            sex: this.sex,
                            age: this.age,
                            target: this.target,
                            duration: this.duration,
                            price: this.price,
                            area: "((10.5,12.5),6)",
                            guid: wx.getStorageSync('guid')
                        }
                    }).then(res => {
                        this.addpid = res.rows[0].pid
                        this.arrayuuid.forEach((item, index) => {
                            this.$fly.request({
                                method: "post", //post/get 请求方式
                                url: this.$https.state.addseraprpack,     //服务服务包增加
                                body: {
                                    pid: this.addpid,
                                    uuid: item,
                                    statue: 0
                                }
                            }).then(res => {
                            })
                        })
                        mpvue.reLaunch({ url: '../my/main' })
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
            })
      },

        //获取图片地址
        setidimg(e){
            this.serviceimg=JSON.stringify(e)
        }
    }
  }
</script>

<style>
.radio{
        border-top:1rpx solid #eee;
        border-bottom:1rpx solid #eee;
        background-color:var(--white);
        padding:1rpx 30rpx;
        display:flex;
        align-items:center;
        min-height:100rpx;
        justify-content:none;
        font-size: 30rpx
    }
  button{
    margin:60rpx 40rpx;
  }
.checkbox{
    font-size:30rpx;
    padding:0 30rpx;
    background-color:var(--white);

}
.btn{
    margin:0 auto;
    height:60rpx;
    width:60rpx;
    border-radius:50%;
    font-size:30rpx;
}
</style>
