
<!--医院详情页-->

<template>
    <div>
        <map-route :route-info="routeInfo"></map-route>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                routeInfo: {
                    startLat:31.880238  ,    //起点经度 选填
                    startLng:120.51608 ,    //起点纬度 选填
                    startName: "我的位置",   // 起点名称 选填
                    endLat: 31.90398,    // 终点经度必传s
                    endLng: 120.722582,  //终点纬度 必传
                    endName: "护士位置",  //终点名称 必传
                    mode: "car"  //算路方式 选填
                },
                hoslocate:wx.getStorageSync('locate'),      //获取当前医院地址坐标
                sid:"",
                method:'',
                lists:[],
                flag:true
            }
        },
        onLoad(options){
            this.sid=options.sid
            this.flag=true

            let locate1 = this.hoslocate.substring(1,this.hoslocate.length-1).split(',')   //医院坐标点截取经，纬度
            this.routeInfo.startLat=parseFloat(locate1[0])     //医院经度
            this.routeInfo.startLng=parseFloat(locate1[1])     //医院纬度

            this.startSetInter()
        },
        onUnload(){
            this.flag=false
            clearInterval(this.method)
        },
        onhide(){
            this.method=''
        },
        onShow(){
            let plugin = requirePlugin("myPlugin")
            this.startSetInter()
        },
        methods:{
            startSetInter(){
                this.getroute()
                //将计时器赋值给setInter
                if(this.flag){
                    this.method = setInterval(this.getroute, 180*1000)
                }
            },

            getroute(){
                this.$fly.request({
                    method:"post",
                    url:this.$https.state.nurroute,        //查询护士位置
                    body:{
                        sid:this.sid
                    }
                }).then(res=>{
                    this.lists=res.rows[0]
                    if(this.lists.length>0){
                        let locate=(this.lists.position.substring(1,this.lists.position.length-1)).split(',')
                        this.routeInfo.endLat=locate[0]
                        console.log(this.routeInfo.endLat)
                        this.routeInfo.endLng=locate[1]
                        console.log(this.routeInfo.endLng)
                    }
                })
            }
        }
    }
</script>

<style>

</style>
