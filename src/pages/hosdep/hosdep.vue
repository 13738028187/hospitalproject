
<template>
    <div>
        <div class="cu-bar bg-white search fixed" :style="[{top:CustomBar + 'px'}]">
            <div style="padding:20rpx;font-size:32rpx;color:#0081ff" @tap="add">科室添加</div>
            <div class="search-form round">
                <text class="icon-search"></text>
                <input type="text" placeholder="搜索科室名称" style="text-align:left" @input="setsearch" :value="str"></input>
            </div>
            <div class="action">
                <button style="color:#fff" class="cu-btn shadow-blur round" @tap="search">取消</button>
            </div>
        </div>
        <div style="margin-top:100rpx" v-if="searchresult.length>0">
            <div class="cu-form-group" style="justify-content:space-between" v-for="(item , index) in searchresult" :key="index" :index="index"  @click="details(item.uuid)">
                <div style="padding:0 30rpx">{{item.name}}</div>
                <image src="../../static/images/right.svg" style="width:40rpx;height:40rpx"/>
            </div>
        </div>
        <div v-else class="txzt" style="margin-top:100rpx">{{txzt}}</div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                lists:[],
                searchresult:[],
                str:"",
                uuid:"",
                txzt:"————  还没有数据哟(*_*)  ————",
            }
        },
        onLoad(){
            this.$fly.request({
                method:"post", //post/get 请求方式
                url:this.$https.state.deplist,       //科室列表
                body:{
                    guid:wx.getStorageSync('guid'),
                }
            }).then(res =>{
               this.lists= res.rows
               this.searchresult=res.rows
            })
        },
        methods:{
            setsearch(e){       //监听搜索框的内容变化，显示相关的结果
                this.searchresult=[]
                this.str=e.mp.detail.value
                for(let i=0;i<this.lists.length;i++){
                    if((this.lists[i].name).includes(this.str)){   //判断数组中是否包含了输入的内容
                        this.searchresult.push(this.lists[i]) //把获取到的名称插入到数组中
                    }
                }
            },
            search(){   //点击取消按钮，还原列表
                this.str=""
                this.searchresult=this.lists
            },
            details(e){
                mpvue.navigateTo({url: '../depdetails/main?uuid='+e})
            },
            add(){
                mpvue.navigateTo({url: '../depinfo/main'})
            }
        }
    }
</script>

<style>
    .cu-form-group{
        font-size:31rpx;
        justify-content:space-between;
    }

</style>
