
<!--信息管理-->

<template>
    <div>
        <div class="cu-bar bg-white solid-bottom ">
            <div class="action">
                <text class="icon-title text-orange "></text>科室信息
                <button class='cu-btn bg-orange shadow' style="margin-left:340rpx" @click.stop="Revise(uuid)">修改</button>
            </div>
        </div>
        <div class="dep-list" >
            <div class="hos-item" >
                <div >科室名称：</div>
                <div class="hos-item-color">{{lists.name}}</div>
            </div>
            <div class="hos-item">
                <div >科室电话：</div>
                <div class="hos-item-color">{{lists.mobile}}</div>
            </div>
            <div class="hos-item">
                <div >科室主任：</div>
                <div class="hos-item-color">{{kszr}}</div>
            </div>
            <div class="hos-item">
                <div >科室类型：</div>
                <div class="hos-item-color">{{deptp}}</div>
            </div>
            <div class="hos-item">
                <div >是否为强科：</div>
                <div class="hos-item-color">{{lists.strong == 0 ? '是':'否'}}</div>
            </div>

        </div>

        <div class="cu-bar bg-white solid-bottom margin-top">
            <div class="action">
                <text class="icon-title text-orange"></text> 护士信息
                <button class='cu-btn bg-blue shadow' style="margin-left:340rpx" @tap="add">添加</button>
            </div>
        </div>
        <div v-if="flag" class="txzt">{{hslb}}</div>
        <div v-else >
            <div class="nur-list" v-for="(item , index) in lists1" :key="index" :index="index">
                <div @click.stop="details(item.nid)">
                    <div style="font-size:30rpx;position:relative;">
                        <span style="margin-right:20rpx">{{item.name}}</span>
                        <span style="margin-right:40rpx">({{item.sex==0?'男':'女'}})</span>
                        <span class="hos-item-color">{{item.statue}}</span>
                    </div>
                    <div style="margin-top:10rpx">
                        <image class="images" src="../../static/images/mobile.svg"/>
                        <span class="hos-item-color">{{item.mobile}}</span>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
  export default {
    data() {
        return {
            lists: [],
            lists1: [],
            index: "",
            hslb: "亲，该科室还没有添加护士呢！",
            flag: false,
            deptype: this.$https.state.deptp,
            deptp: "",
            uuid: "",
            kszr:"",
            nid:""
        }
    },
    onLoad(options){
        var that = this
        that.uuid=options.uuid
        this.$fly.request({
            method:"post", //post/get 请求方式
            url:this.$https.state.depdetails, // 科室查询
            body:{
              id:that.uuid
            }
          }).then(res =>{
           that.lists = res.rows[0];
           that.deptype.forEach((item,index)=>{
               if(item.id==that.lists.type){
                   that.deptp=item.name
               }
           })
        })

        this.$fly.request({
             method:"post", //post/get 请求方式
             url:this.$https.state.nurlist1,  // 护士列表
             body:{
                 depid:that.uuid,
                 guid:wx.getStorageSync('guid')
             }
            }).then(res =>{
            that.lists1 = res.rows
                console.log(that.lists1.nid)
                if(that.lists1.length==0){
                    that.flag=true
                }else{
                    that.flag=false
                }

                if(that.lists1.address == "null"){
                    that.lists1.address = "暂未填写"
                }

                if(that.lists.nid==null){
                    that.kszr="暂未填写"
                }else{
                    that.lists1.forEach((item,index)=>{
                        if(item.nid==that.lists.nid){
                            that.kszr=item.name
                        }
                    })
                }

                that.lists1.forEach((item,index)=>{
                    if(item.statue=="0"){
                        item.statue="空闲中"
                    }else if(item.statue=="1"){
                        item.statue="服务中"
                    }else if(item.statue=="2"){
                        item.statue="休假中"
                    }else{
                        item.statue="值班中"
                    }
                })
            })
    },
    methods: {
        Revise(e){
            console.log(e)
            mpvue.navigateTo({url: '../depinfo/main?uuid='+e})
        },
        details(e){
            mpvue.navigateTo({url: '../nursedetails/main?nid='+e})
        },
        add(){
            mpvue.navigateTo({url: '../nurseinfo/main'})
        },
    }
  }
</script>

<style>
    .dep-list{
        padding:30rpx 60rpx;
        font-size:30rpx;
        background-color: var(--white);
        position:relative;
        top:0;
        left:0
    }
    .hos-item-color{
        color:#8799a3;
        font-size:27rpx;
    }
    .nur-list{
        display:flex;
        justify-content:space-between;
        padding:30rpx 60rpx;
        background-color:var(--white);
        margin:0 0 20rpx 0;
    }
    .images{
        width:40rpx;
        height:40rpx;
        top:10rpx;
    }
    .hos-item-color{
        margin-left:20rpx
    }
</style>


