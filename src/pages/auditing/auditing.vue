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
                    <div class="hos-item-title">出生日期：</div>
                    <div class="hos-item-color">{{lists.birthday}}</div>
                </div>
                <div class="hos-item">
                    <div class="hos-item-title">手机号码：</div>
                    <div class="hos-item-color">{{lists.mobile}}</div>
                </div>
                <div style="display:flex">
                    <div class="hos-item-title">详细地址：</div>
                    <div class="hos-item-color" style="width:450rpx">{{lists.address}}</div>
                </div>
            </div>
            <div class="x-q-x-x">
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
        sid:"",
      }
    },
    onLoad(options){
        this.sid=options.sid
        this.$fly.request({
                method:"post", //post/get 请求方式
                url:this.$https.state.auditingdetails, //已完成订单详情
                body:{
                    sid:this.sid
                }
            }).then(res =>{
                this.lists = res.rows[0];
                this.lists.birthday=this.lists.birthday.split(' ')[0]
                this.lists.address=this.lists.address.substr(2,this.lists.address.length-4).split('","').join(' ')+' '+this.lists.addressdetail
            })
    },
    methods: {

    }
  }
</script>

<style>
    .van-cell{
        padding:20rpx 0 !important;
        font-size:30rpx !important;
    }
</style>
