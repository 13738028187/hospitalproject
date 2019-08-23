
<!--

      医药器械管理

      -->

<template>
  <div>
    <form>
      <div class="cu-form-group">
          <image src="../../static/images/112.svg" class="xx"/>
        <div class="title">名称</div>
        <input style="margin-left:50rpx" placeholder="请输入医药器械名称" :value="name" @blur="setname">
      </div>
      <div class="cu-form-group">
          <image src="../../static/images/112.svg" class="xx"/>
        <div class="title">生产厂家</div>
        <input style="margin-left:50rpx" placeholder="请输入生产厂家" :value="manufacturers" @blur="setmanufacturers" >
      </div>
        <div class="cu-form-group">
            <image src="../../static/images/112.svg" class="xx"/>
            <div class="title">有效期至</div>
            <picker mode="date" :value="date" start="2019-07-05" end="2050-01-01" @change="DateChange" >
                <div class="picker" >
                    {{date}}
                </div>
            </picker>
        </div>
      <div class="cu-form-group">
          <image src="../../static/images/112.svg" class="xx"/>
        <div class="title">批准文号</div>
        <input style="margin-left:50rpx"  placeholder="请输入批准文号" :value="batch" @blur="setbatch">
      </div>
      <div class="cu-form-group">
          <image src="../../static/images/112.svg" class="xx"/>
        <div class="title">类型</div>
          <picker @change="Pickertype" :value="index1" :range="machinetype" range-key="name">
              <view class="picker">
                  {{machinetype.length>0 ? machinetype[index1].name :'暂时无法选择'}}
              </view>
          </picker>
      </div>
      <div class="cu-form-group">
          <image src="../../static/images/112.svg" class="xx"/>
        <div class="title">库存数量</div>
        <input placeholder="请输入库存数量" :value="num" @blur="setnum">
      </div>
      <div class="cu-form-group">
          <image src="../../static/images/112.svg" class="xx"/>
        <div class="title">单价(元)</div>
        <input placeholder="请输入价格" :value="price" @blur="setprice">
      </div>
      <div class="cu-form-group">
          <image src="../../static/images/112.svg" class="xx"/>
           <div class="title">物价(元)</div>
           <input placeholder="请输入价格" :value="avgprice" @blur="setavgprice">
      </div>
        <div class="cu-form-group">
            <image src="../../static/images/112.svg" class="xx"/>
            <div class="title">主要用途</div>
        </div>
        <div class="textarea" style="height:500rpx">
            <textarea placeholder="请输入主要用途" maxlength="500" :value="value" @input="setvalue"></textarea>
        </div>
        <button v-if="mid" class="cu-btn block bg-orange margin-tb-sm lg"  @click.stop="insertinto">确认修改</button>
      <button v-else class="cu-btn block bg-blue margin-tb-sm lg" @click.stop="inspect">完成</button>
    </form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        mid:"",
        date:"2019-07-05",
        guid:"",
        index1:0,
        name:"",
        machinetype:this.$https.state.mac,
        manufacturers:"",
        effective:"",
        batch:"",
        price:10,
        num:1,
        value:"",
        avgprice:3,
        apparatusinfo:[],
        aprlist:[]
      };
    },

    onLoad(options){
        this.index1=0
        this.mid=options.mid
        if(this.mid){
            //器械查询接口
            this.$fly.request({
                method:"post", //post/get 请求方式
                url:this.$https.state.aprdetails,
                body:{
                    mid:this.mid
                }
            }).then(res =>{
                this.apparatusinfo = res.rows[0]
                this.name=this.apparatusinfo.name
                this.price=this.apparatusinfo.price
                this.manufacturers=this.apparatusinfo.manufacturers
                this.date=this.apparatusinfo.effective.split(' ')[0]
                this.batch=this.apparatusinfo.batch
                this.num=this.apparatusinfo.num
                this.value=this.apparatusinfo.value
                // this.machinetype.forEach((item,index)=>{
                //     if(item.id==this.apparatusinfo.type){
                //         this.machinetype[this.index1].name=item.name
                //     }
                // })

                this.avgprice=this.apparatusinfo.avgprice
            })
        }else{
            this.name=""
            this.price=""
            this.manufacturers=""
            this.date="2019-07-05"
            this.batch=""
            this.num=""
            this.value=""
            this.avgprice=""
        }
    },
    methods: {
        setname(e){ this.name = e.mp.detail.value  },                         //医药器械名称
        setmanufacturers(e){ this.manufacturers = e.mp.detail.value },        //生产厂家
        DateChange(e) {this.date = e.mp.detail.value},                        //有效期
        setbatch(e){ this.batch = e.mp.detail.value },                        //批准文号
        setnum(e) { this.num = e.mp.detail.value },                           //库存数量
        setvalue(e){ this.value = e.mp.detail.value },                        //主要用途
        setprice(e){ this.price = e.mp.detail.value },                        //单价
        setavgprice(e) { this.avgprice = e.mp.detail.value },                 //物价

        Pickertype(e){
            this.index1=e.mp.detail.value
        },



        //点击“修改”按钮的下一步操作
        insertinto(){
            this.$fly.request({
                method:"post", //post/get 请求方式
                url:this.$https.state.apralter,
                body:{
                    mid:this.mid,
                    guid:wx.getStorageSync('guid'),
                    name:this.name,
                    price:this.price,
                    manufacturers:this.manufacturers,
                    effective:this.date,
                    batch:this.batch,
                    num:this.num,
                    value:this.value,
                    type:this.machinetype[this.index1].id,
                    avgprice:this.avgprice,
                }
            }).then(res =>{
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


        //点击“完成”按钮的下一步操作
        inspect(){
            let flag=false
            this.$fly.request({
                method:"post", //post/get 请求方式
                url:this.$https.state.aprlist,  //查询医药器械列表信息
                body:{
                    guid:wx.getStorageSync('guid'),
                }
            }).then(res =>{
                this.aprlist = res.rows
                this.aprlist.forEach((item,index)=>{
                    if(this.name === item.name ){
                        flag=true
                        wx.showModal({
                            title: '注意！',
                            content: '此药品或器械已存在，请勿重复添加！',
                        })
                    }
                })
                if(!flag){
                    this.$fly.request({
                        method:"post", //post/get 请求方式
                        url:this.$https.state.apradd,
                        body:{
                            guid:wx.getStorageSync('guid'),
                            name:this.name,
                            price:this.price,
                            manufacturers:this.manufacturers,
                            effective:this.date,
                            batch:this.batch,
                            num:this.num,
                            value:this.value,
                            type:this.machinetype[this.index1].id,
                            avgprice:this.avgprice
                        }
                    }).then(res =>{
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
            })
        }
     }
  }
</script>

<style>
    .cu-btn{
        margin:60rpx 40rpx;
    }
</style>
