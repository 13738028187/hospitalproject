<!--

    查看当前医药器械列表

-->

<template>
  <div>
      <div class="cu-bar bg-white search fixed" :style="[{top:CustomBar + 'px'}]">
          <div style="padding:20rpx;font-size:32rpx;color:#0081ff" @click.stop="add">添加药器</div>
          <div class="search-form round">
              <text class="icon-search"></text>
              <input type="text" placeholder="搜索药品、器械名称" style="text-align:left" @input="setsearch" :value="str"></input>
          </div>
          <div class="action">
              <button style="color:#fff"  class="cu-btn shadow-blur round" @tap="search">取消</button>
          </div>
      </div>
      <div style="margin-top:100rpx" v-if="searchresult.length>0">
          <div class="cu-form-group" @click.stop="details(item.mid)"  v-for="(item , index) in searchresult" :key="index" :index="index">
               <div style="padding:0 30rpx;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">{{item.name}}</div>
               <image src="../../static/images/right.svg" style="width:40rpx;height:40rpx"/>
          </div>
      </div>
      <div v-else class="txzt" style="margin-top:100rpx">{{txzt}}</div>
  </div>
</template>

<script>
  import GLOBAL from '@/components/Global'
  export default {
    data(){
      return{
        lists:[],
        mid:"",
        yyqx:"",
        searchresult:[],
        str:"",
        txzt:"————  还没有数据哟(*_*)  ————",
        // page: 1,      // 当前页数
        // total_page: 0 // 总页数
      }
    },
    onLoad(e){
       this.$fly.request({
            method:"post", //post/get 请求方式
            url:this.$https.state.aprlist,
            body:{
              guid:wx.getStorageSync('guid'),
            }
          }).then(res =>{
               this.lists=res.rows
               this.searchresult=res.rows
        })
    },
      // created () {           // 实例创建完成后调用数据
      //     this.getList()
      // },
      // onReachBottom () {       // 上拉触底事件
      //     if (this.page > this.total_page) {
      //         console.log('数据加载完了')
      //     } else {
      //         this.page = this.page + 1   // 下一页
      //         this.getList()
      //     }
      // },
      // onPullDownRefresh () {   // 下拉刷新事件
      //     this.page = 1   // 初始化页码
      //     this.getList()
      // },


    methods:{
        // getList () {    // 获取数据方法
        //     const that = this
        //     console.log(that.page)
        //     this.$fly.request({
        //         method: 'post',
        //         url: this.$https.state.deplist,
        //         body: {
        //             guid: wx.getStorageSync('guid'),
        //             page: that.page // 传递页码
        //         }
        //     }).then(res =>{
        //         wx.stopPullDownRefresh()    // 关闭下拉刷新动画
        //         const data = res.rows       // 返回的数据
        //         if (that.page > 1) {        // 数据追加  data.list为返回的数据列表
        //             for(var i=0;i<data.length;i++){
        //                 this.lists.push(data[i])
        //             }
        //         } else {
        //             that.lists = data  // 数据
        //         }
        //         that.total_page = data.total_page // 总页数
        //     })
        // },

        setsearch(e){
            this.searchresult=[]    //监听搜索框的内容变化，显示相关的结果
            this.str=e.mp.detail.value
            for(let i=0;i<this.lists.length;i++){
                if((this.lists[i].name).includes(this.str)){   //判断数组中是否包含了输入的内容
                    this.searchresult.push(this.lists[i]) //把获取到的名称插入到数组中
                }
            }
        },
        //点击取消按钮，还原列表
        search(){
            this.str=""
            this.searchresult=this.lists
        },
        details(e){
          mpvue.navigateTo({url: '../apparatusdetails/main?mid='+e})
        },
         add(){
            mpvue.navigateTo({url: '../apparatusinfo/main'})
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
