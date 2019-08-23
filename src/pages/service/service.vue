
<!--

    已派发详情页

    -->

<template>
  <div>
      <div class="x-q">
          <div class="x-q-x-x" style="margin:0">
              <div class="hos-item">
                  <div class="hos-item-title">服务对象：</div>
                  <div class="hos-item-color">{{lists.name}}</div>
              </div>
              <div class="hos-item">
                  <div class="hos-item-title">性别：</div>
                  <div class="hos-item-color">{{lists.sex == 0 ? '男':'女'}}</div>
              </div>
              <div class="hos-item">
                  <div class="hos-item-title">生日：</div>
                  <div class="hos-item-color">{{lists.birthday}}</div>
              </div>
              <div class="hos-item">
                  <div class="hos-item-title">手机号：</div>
                  <div class="hos-item-color">{{lists.mobile}}</div>
              </div>
              <div style="display:flex">
                  <div class="hos-item-title">详细地址：</div>
                  <div class="hos-item-color" style="width:450rpx">{{lists.address}}</div>
              </div>
          </div>
         <div class="x-q-x-x" style="display:flex;justify-content:space-between">
             <div>
                 <div class="hos-item">
                     <div class="hos-item-title">护士姓名：</div>
                     <div class="hos-item-color">{{lists.nursename }}</div>
                 </div>
                 <div class="hos-item">
                     <div class="hos-item-title">手机号码：</div>
                     <div class="hos-item-color">{{lists.nurmobile}}</div>
                 </div>
                 <div class="hos-item">
                     <div class="hos-item-title">所属科室：</div>
                     <div class="hos-item-color">{{lists.ksname}}</div>
                 </div>
             </div>
            <div>
                <div class="location" @tap="map(lists.sid)">
                    <div style="display:inline-block"><image class="images" src="../../static/images/left.svg"/></div>
                    <div style="color:#fff;display:inline-block;font-size:24rpx">位置</div>
                </div>
            </div>
         </div>
         <div class="x-q-x-x">
             <div class="hos-item">
                 <div class="hos-item-title">服务名称：</div>
                 <div class="hos-item-color">{{lists.proname}}</div>
             </div>
             <div class="hos-item">
                 <div class="hos-item-title">服务价格：</div>
                 <div class="text-price hos-item-color">{{lists.price}}</div>
             </div>
             <div style="display:flex">
                 <div class="hos-item-title">服务内容：</div>
                 <div class="hos-item-color" style="width:450rpx">{{lists.content}}</div>
             </div>
         </div>
      </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        lists:[],
        flag:0,
        sid:"",
        activeNames:""
      }
    },
    onLoad(options){
       this.$fly.request({
            method:"post", //post/get 请求方式
            url:this.$https.state.enddetails,  //已派发订单详情
            body:{
                sid:options.sid,
            }
          }).then(res =>{
            this.lists = res.rows[0];
            this.lists.birthday=this.lists.birthday.split(' ')[0]
            this.lists.address=this.lists.address.substr(2,this.lists.address.length-4).split('","').join(' ')+''+this.lists.addressdetail
            console.log(this.lists)
        })
    },
    methods: {
        map(e){
            console.log(e)
            mpvue.navigateTo({url: '../map/main?sid='+e})
        }
    }
  }
</script>

<style>
    .location{
        width:100rpx;
        height:100rpx;
        background-color:#0081ff;
        border-radius:50%;
        display:flex;
        flex-direction:column;
        align-items:center;
    }
    .images{
        width:40rpx;
        height:40rpx;
        top:10rpx;
    }
</style>

