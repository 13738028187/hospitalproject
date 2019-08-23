
<!--订单详情页-->

<template>
  <div>
    <div class="hos " style="margin:30rpx 50rpx">
        <div class="hos-item">
          <div class="t-w">服务对象：</div>
          <div class="hos-item-color">{{lists.name}}</div>
        </div>
        <div class="hos-item">
          <div class="t-w">性别：</div>
          <div class="hos-item-color">{{lists.sex == 0 ? '男':'女'}}</div>
        </div>
        <div class="hos-item">
            <div class="t-w">出生日期：</div>
            <div class="hos-item-color">{{lists.birthday}}</div>
        </div>
        <div class="hos-item">
          <div class="t-w">手机号码：</div>
          <div class="hos-item-color">{{lists.mobile}}</div>
        </div>
        <div style="display:flex">
            <div class="t-w">详细地址：</div>
            <div class="hos-item-color" style="width:400rpx">{{lists.address}}</div>
        </div>
        <div class="hos-item">
             <div>药品、器械清单：</div>
        </div>
        <div class="hos-item-color">
             <div v-for="(item , index) in machines" :key="index" :index="index" style="padding:0 50rpx;">
                 <div style="padding:5rpx 0;display:flex;align-items:center;">
                     <span style="display:inline-block;width:300rpx">{{item.name}}</span>
                     <span style="margin:0 10rpx 0 20rpx">x</span>
                     <span style="display:inline-block;width:70rpx">{{item.num}}</span>
                     <span style="display:inline-block;background-color:#1cbbb4;color:#fff;padding:0 10rpx;font-size:24rpx">数量</span>
                 </div>
             </div>
        </div>
        <div class="hos-item">
            <div class="t-w">服务名称：</div>
            <div class="hos-item-color">{{lists.proname}}</div>
        </div>
        <div class="hos-item">
            <div class="t-w">服务价格：</div>
            <div class="text-price hos-item-color">{{lists.price}}</div>
        </div>
        <div class="hos-item">
            <div class="t-w">服务内容：</div>
        </div>
        <div class="hos-item-color" style="text-indent:2em">{{lists.content}}</div>
    </div>
      <div style="display:flex;justify-content:space-around">
          <button class="cu-btn bg-green shadow" @tap="inspect(this.sid)">审核通过</button>
          <button class="cu-btn bg-red shadow"  @tap="nopass()">未通过</button>
      </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
          lists:[],
          index:'',
          sid:'',
          machines:[]
      }
    },

    // 订单查询接口 http://192.168.2.27:8080/hi/main?hi=2495YYMEFKYN
    onLoad(options){
        this.sid=options.sid,
       this.$fly.request({
            method:"post", //post/get 请求方式
            url:this.$https.state.orderdetails1,
            body:{
              sid:this.sid
            }
          }).then(res =>{
            this.lists = res.rows[0];
            this.lists.birthday=this.lists.birthday.split(' ')[0]
            this.lists.address=this.lists.address.substr(2,this.lists.address.length-4).split('","').join(' ')+' '+this.lists.addressdetail
            this.machines = JSON.parse(this.lists.machine)
            console.log(res)
        })
  },
    methods: {
        Pickernurse(e){
            this.index = e.mp.detail.value
        },

        //审核通过
        inspect(options){
            //订单审核
            this.$fly.request({
                method:"post", //post/get 请求方式
                url:this.$https.state.yes,
                body:{
                    sid:this.sid
                }
            }).then(res =>{
            })
            wx.reLaunch({url: '../index/main'})
        },

        //审核未通过
        nopass(){
            mpvue.navigateTo({url: '../nopass/main?sid='+this.sid})
        }
    }
  }
</script>

<style>
    button{
        margin:60rpx 40rpx;
        font-size:30rpx;
        height:90rpx;
        padding:0 45rpx;
    }
    .t-w{
        width:150rpx;
    }

</style>


