
<!--

      医药器械打包

      -->

<template>
  <div>
    <form>
        <div class="cu-form-group">
            <div class="title" style="color:#353535">打包名称</div>
            <input type="text" placeholder="请输入打包" @blur="setpackname">
        </div>
        <div v-for="(item,index) in arr" :key="index">
            <div v-if="index<flag" class="box shadow-warp">
                <div class="cu-form-group" style="justify-content: space-between">
                    <div class="title" style="color:#353535">医药器械</div>
                    <div>{{arrayname[index]}}</div>
                </div>
                <div class="cu-form-group" style="justify-content: space-between">
                    <div class="title" style="color:#353535">数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;目</div>
                    <div  style="text-align:right">
                        {{arraynum[index]}}
                    </div>
                </div>
                <div class="cu-form-group" style="justify-content: space-between">
                    <div class="title" style="color:#353535">价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格</div>
                    <div class="text-price" style="margin-left:20rpx">{{arrayprice[index]}}</div>
                </div>
            </div>

            <div v-else class="box shadow-warp">
                <div class="cu-form-group" style="justify-content: space-between">
                    <div class="title" style="color:#353535">医药器械</div>
                    <picker @change="Pickername" :value="index1" :range="lists" range-key="name">
                        <view class="picker">
                            {{lists.length>0 ?  lists[index1].name :'暂时无法选择'}}
                        </view>
                    </picker>
                </div>
                <div class="cu-form-group" style="justify-content: space-between">
                    <div class="title" style="color:#353535">数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;目</div>
                    <div  style="text-align:right">
                        <input type="text" placeholder="请输入数目" :value="num" @blur="setnum">
                    </div>
                </div>
                <div class="cu-form-group" style="justify-content: space-between">
                    <div class="title" style="color:#353535">价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格</div>
                    <div class="text-price" style="margin-left:20rpx">{{lists[index1].price}}</div>
                </div>
            </div>
        </div>
        <div style="width:100%;padding:10rpx 0 50rpx 0">
            <button class="cu-btn block bg-orange margin-tb-sm lg btn"  @tap="add">+</button>
        </div>
    </form>
      <button class="cu-btn block bg-blue margin-tb-sm lg" style="margin:60rpx 40rpx" @tap="inspect">完成</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
          index1:0,
          arr:[1],
          lists:[],
          num:0,
          flag:0,
          arrayname:[],     //存放医药器械名称
          arraynum:[],      //存放医药器械数量
          arrayprice:[],    //存放医药器械价格
          packname:'',
          arraymid:[],      //存放医药器械id
          guid:wx.getStorageSync('guid')
      };
    },
        //药器列表信息
   onLoad(){
       this.packname=''
       this.index1=0
       this.arr=[1]
       // this.lists=[]
       this.num=0
       this.flag=0
       this.arrayname=[]
       this.arraynum=[]
       this.arraumid=[]
       this.arrayprice=[]
          this.$fly.request({
              method:"post", //post/get 请求方式
              url:this.$https.state.aprlist,
              body:{
                  guid:this.guid,
              }
          }).then(res =>{
              this.lists = res.rows
              if(this.lists.length < 0){
                  wx.showModal({
                      title:"抱歉，您还没有可选的医药、器械！",
                      content:"请先添加医药、器械！"
                  })
              }
          })
      },

    methods: {
        setpackname(e){
            this.packname=e.mp.detail.value
        },
        add(){
            this.arrayname.push(this.lists[this.index1].name)
            this.arraynum.push(this.num)
            this.arrayprice.push(this.lists[this.index1].price)
            this.arraymid.push(this.lists[this.index1].mid)
            this.flag = this.flag+1
            this.arr.push(1)
            this.num=0
            this.index1=0
        },
        inspect(){
            this.arrayname.push(this.lists[this.index1].name)
            this.arraynum.push(this.num)
            this.arrayprice.push(this.lists[this.index1].price)
            this.arraymid.push(this.lists[this.index1].mid)
            this.$fly.request({
                method:"post", //post/get 请求方式
                url:this.$https.state.findaprpack,              //查询服务包
                body:{
                    guid:this.guid,
                    name:this.packname
                }
            }).then(res =>{
                if(res.rows.length>0){
                    return
                }else{
                    this.$fly.request({
                        method:"post", //post/get 请求方式
                        url:this.$https.state.addaprpack,  //服务包增加
                        body:{
                            guid:this.guid,
                            name:this.packname,
                            cuid:this.guid
                        }
                    }).then(res =>{
                        let uuid=res.rows[0].uuid
                        for(let i=0;i<this.arrayname.length;i++){
                            this.$fly.request({
                                method:"post", //post/get 请求方式
                                url:this.$https.state.addapr,  //服务器械增加
                                body:{
                                    uuid:uuid,
                                    num:this.arraynum[i],
                                    mid:this.arraymid[i]
                                }
                            }).then(res =>{
                                console.log(res);
                            })
                        }
                        mpvue.reLaunch({ url: '../my/main' })
                    }).catch((err)=>{
                        if(err.status==500){
                            wx.showModal({
                                title:'抱歉！',
                                content:'提交失败,请检查！'
                            })
                        }
                        wx.hideLoading();
                    })
                }
            })
        },
        Pickername(e){
            this.index1=e.mp.detail.value
        },
        setnum(e){
            this.num = e.mp.detail.value
        }
    }
  }
</script>

<style>
  .cu-form-group .title {
    min-width: calc(4em + 15px);
  }
  .btn{
      margin:0 auto;
      height:60rpx;
      width:60rpx;
      border-radius:50%;
      font-size:30rpx;
  }

</style>
