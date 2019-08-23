
<!--订单详情页-->

<template>
  <div>
      <div class="cu-bar bg-white solid-bottom">
          <div class="action">
              <text class="icon-title text-orange "></text>药品、器械入库
              <button class='cu-btn bg-orange shadow' @click.stop="Revise(mid)">修改</button>
          </div>
      </div>
      <div class="apr-details">
        <div class="hos-item">
            <div class="hos-item-f-d">名&nbsp;&nbsp;&nbsp;称</div>
            <div class="hos-item-color" style="width:500rpx">{{lists.name}}</div>
        </div>
          <div class="hos-item">
              <div class="hos-item-f-d">价&nbsp;&nbsp;&nbsp;格</div>
              <div class="text-price hos-item-color" >{{lists.price}}</div>
          </div>
          <div class="hos-item">
              <div class="hos-item-f-d">物&nbsp;&nbsp;&nbsp;格</div>
              <div class="text-price hos-item-color" >{{lists.avgprice}}</div>
          </div>
          <div style="display:flex;">
              <div class="hos-item-f-d">类&nbsp;&nbsp;&nbsp;型</div>
              <div class="hos-item-color">{{mactp}}</div>
          </div>
        <div class="hos-item">
            <div class="hos-item-f-d">有效期至</div>
            <div class="hos-item-color">{{lists.effective}}</div>
        </div>
        <div class="hos-item">
            <div class="hos-item-f-d">批准文号</div>
            <div class="hos-item-color" style="width:500rpx">{{lists.batch}}</div>
        </div>
          <div class="hos-item">
              <div class="hos-item-f-d">生产厂家</div>
              <div class="hos-item-color" style="width:500rpx">{{lists.manufacturers}}</div>
          </div>
          <div class="hos-item">
            <div class="hos-item-f-d">库存数量</div>
            <div class="hos-item-color">{{lists.num}}</div>
        </div>
          <div class="hos-item">
              <div class="hos-item-f-d">入库时间</div>
              <div class="hos-item-color">{{lists.lasttime}}</div>
          </div>
        <div class="hos-item">
            <div class="hos-item-f-d">主要用途</div>
        </div>
        <div class="hos-item-color" style="padding:0 0 0 70rpx">{{lists.value}}</div>
    </div>


<!--      下面是药品、器械出库的数据-->
<!--      <div class="cu-bar bg-white solid-bottom">-->
<!--          <div class="action">-->
<!--              <text class="icon-title text-orange "></text>药品、器械出库-->
<!--          </div>-->
<!--      </div>-->
<!--      <div class="apr-details">-->
<!--          <div class="hos-item">-->
<!--              <div class="hos-item-f-d">出库时间</div>-->
<!--              <div class="hos-item-color">{{lists.lasttime}}</div>-->
<!--          </div>-->
<!--          <div class="hos-item">-->
<!--              <div class="hos-item-f-d">使用人</div>-->
<!--              <div class="hos-item-color">李传芳</div>-->
<!--          </div>-->
<!--          <div class="hos-item">-->
<!--              <div class="hos-item-f-d">剩余数量</div>-->
<!--              <div class="hos-item-color">783</div>-->
<!--          </div>-->
<!--          <div class="hos-item">-->
<!--              <div class="hos-item-f-d">耗材情况</div>-->
<!--          </div>-->
<!--          <div class="hos-item" style="display:flex;padding:0 30rpx">-->
<!--              <div class="hos-item-color">护理服务包</div>-->
<!--              <div class="hos-item-color">10</div>-->
<!--          </div>-->
<!--      </div>-->
  </div>
</template>

<script>
  export default {
    data() {
      return {
          lists:[],
          mid:"",
          machinetype:this.$https.state.mac,   //器械类型字典表
          mactp:""
      }
    },

    onLoad(options){
        this.mid=options.mid
        this.insert()
        console.log(this.machinetype)
        console.log(this.lists)

  },
    methods:{
        insert(){
            this.$fly.all(this.insert1()).then(this.$fly.spread((records,projects)=>{

            })).catch(error=>{
                console.log(error)
            })
        },

        //器械查询接口
        insert1(){
            return this.$fly.request({
                method:"post", //post/get 请求方式
                url:this.$https.state.aprdetails,
                body:{
                    mid:this.mid
                }
            }).then(res =>{
                this.lists = res.rows[0]
                this.lists.lasttime = this.lists.lasttime.substr(0,19);


                // 通过判断该物品是药品还是器械，
                // 如果为器械的话单位为（个/台），
                // 如果为药品的话单位为（盒/包）
                if(parseInt(this.lists.type)>2){
                    this.lists.num=this.lists.num+"（个/台）"
                }else{
                    this.lists.num=this.lists.num+"（盒/包）"
                }
                this.lists.effective=this.lists.effective.split(' ')[0]
                this.machinetype.forEach((item,index)=>{
                    if(item.id==this.lists.type){
                        this.mactp=item.name
                    }
                })
                console.log(this.mactp)
            })
        },
        Revise(e){
            mpvue.navigateTo({url: '../apparatusinfo/main?mid='+e})
        }
    }
  }
</script>

<style>
    .apr-details{
        margin-bottom:30rpx;
        padding:20rpx 30rpx 400rpx 30rpx;
        font-size:30rpx;
        background-color: var(--white);
    }
    .cu-btn{
        position:absolute;
        top:15rpx;
        right:50rpx;
    }
    .hos-item-color{
        margin-left:20rpx
    }

</style>


