
<!--服务包详情页-->

<template>
  <div>
      <div v-for="(item , index) in lists" :key="index" :index="index" class="packs out-shadow">
        <div class="packs-details">
            <div style="display:flex">
                <div>名称：</div>
                <div class="hos-item-color" style="width:460rpx">{{item.name}}</div>
            </div>
            <div style="display:flex">
                <div>数量：</div>
                <div class="hos-item-color" >{{item.num}}</div>
            </div>
            <div style="display:flex">
                <div>价格：</div>
                <div class="text-price hos-item-color">{{item.price}}</div>
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
          uuid:""
      }
    },
    // 服务包详情
    onLoad(options) {
        this.$fly.request({
            method: "post", //post/get 请求方式
            url: this.$https.state.aprpackdetails,
            body: {
                uuid: options.uuid,
            }
        }).then(res => {
            this.lists = res.rows

        })
    },
    methods:{}
  }

</script>

<style>
   .packs{
       display:flex;
       font-size:30rpx;
       padding:20rpx;
       border-radius:20rpx;
       margin:50rpx 40rpx;
       background-color:var(--white);
   }
    .packs-details div{
        padding:10rpx
    }
</style>


