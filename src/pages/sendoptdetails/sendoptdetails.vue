
<!--未派发订单详情-->

<template>
    <div style="margin:0 0 100rpx 0">
        <div class="hos" style="margin-top:30rpx">
            <div class="hos-item">
                <div >服务对象：</div>
                <div class="hos-item-color">{{lists.name}}</div>
            </div>
            <div class="hos-item">
                <div >性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</div>
                <div class="hos-item-color">{{lists.sex == 0 ? '男':'女'}}</div>
            </div>
            <div class="hos-item">
                <div >生&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日：</div>
                <div class="hos-item-color">{{lists.birthday}}</div>
            </div>
            <div class="hos-item">
                <div >手机号：</div>
                <div class="hos-item-color">{{lists.mobile}}</div>
            </div>
            <div class="hos-item">详细地址：</div>
            <div class="hos-item" style="margin:10rpx 50rpx 50rpx 50rpx;">
                <div class="hos-item-color">{{lists.address}}</div>
            </div>
            <div class="hos-item">
                <div>药品、器械清单：</div>
            </div>
            <div class="hos-item-color">
                <div v-for="(item , index) in machines" :key="index" :index="index" style="padding:0 50rpx;">
                    <div style="padding:5rpx 0;">
                        <span style="display:inline-block;width:330rpx">{{item.name}}</span>
                        <span style="margin-right:10rpx">x</span>
                        <span style="display:inline-block;width:60rpx">{{item.num}}</span>
                        <span style="display:inline-block;background-color:#1cbbb4;color:#fff;padding:0 10rpx;font-size:24rpx">数量</span>
                    </div>
                </div>
            </div>
            <div class="hos-item">
                <div >服务价格：</div>
                <div class="text-price hos-item-color">{{lists.price}}</div>
            </div>
            <div class="hos-item">
                <div >服务名称：</div>
                <div class="hos-item-color">{{lists.proname}}</div>
            </div>
            <div class="hos-item">
                <div >服务内容：</div>
            </div>
            <div class="hos-item-color" style="text-indent:2em">{{lists.content}}</div>
            <div class="cu-form-group" style="padding:0">
                <div >指定护士:</div>
                <picker @change="Pickername" :value="index" :range="lists1" range-key="name">
                    <view class="picker">
                        {{lists1.length>0 ?  lists1[index].name :'请指定护士'}}
                    </view>
                </picker>
            </div>
        </div>
        <button class="cu-btn block bg-blue margin-tb-sm lg" @tap="send(this.sid)">派发</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                lists:[],
                lists1:[],
                index:0,
                sid:'',
                nid:'',
                machines:[],
            }
        },
        onLoad(options){
            this.sid=options.sid
            this.nid=options.nid
            this.insert()
        },
        methods: {
            insert(){
                this.$fly.all(
                    [this.insert1(),this.insert2()]
                ).then(this.$fly.spread((records,projects)=>{
                        console.log(records,projects)
                    })
                ).catch(error=>{
                    console.log(error)
                })
            },
            insert1(){
                this.$fly.request({
                    method:"post", //post/get 请求方式
                    url:this.$https.state.nurlist,   //护士列表
                    body:{
                        guid:wx.getStorageSync('guid')
                    }
                }).then(res =>{
                    this.lists1=res.rows
                    console.log(this.lists1)
                })
            },

            insert2(){
                this.$fly.request({
                    method:"post", //post/get 请求方式
                    url:this.$https.state.orderdetails1,   // 订单查询
                    body:{
                        sid:this.sid,
                    }
                }).then(res =>{
                    this.lists = res.rows[0];
                    this.lists.birthday = this.lists.birthday.split(' ')[0]
                    this.lists.address=this.lists.address.substr(2,this.lists.address.length-4).split('","').join(' ')+' '+this.lists.addressdetail
                    this.machines = JSON.parse(this.lists.machine)
                })
            },

            Pickername(e){
                this.index = e.mp.detail.value
            },
            send(sid){
                this.$fly.request({
                    method:"post", //post/get 请求方式
                    url:this.$https.state.orderdetails2,     //订单派发
                    body:{
                        sid:this.sid,
                        nid:this.lists1[this.index].nid
                    }
                }).then(res =>{
                    mpvue.reLaunch({url: '../index/main'})
                })
            }
        }
    }


</script>

<style>
    button{
        margin:60rpx 40rpx;
    }
    .title{
        color:#000;
        width:180rpx;
    }
</style>


