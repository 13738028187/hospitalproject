<template>
  <div>
      <view class="cu-form-group">
          <view class="grid col-4 grid-square flex-sub">
              <view class="padding-xs bg-img" :style="'background-image:url(' + urls[index] +')'" v-for="(item,index) in upload_picture_list"
                    :key="index" @tap="ViewImage" :data-url="urls[index]">
              </view>
              <view class="padding-xs solids" @tap="uploadpic" v-if="upload_picture_list.length<8">
                  <text class='icon-cameraadd'></text>
              </view>
          </view>
      </view>
  </div>
</template>

<script>
  export default {
    props:["width","height","max","srcs","type"],
    data(){
      return {
        urls:[],
        upload_picture_list:[],//装image的数组
        flag:false,
        rearr:[],
        num:0
      }
    },
    onLoad(){
      this.urls=[]
      this.rearr=[]
      this.flag=false
      this.rearr=[]
      this.num=0
      this.upload_picture_list=[]
    },
    mounted(){
      this.urls = this.srcs || [];
    },
    methods:{
      //选择图片方法
      uploadpic(e) {
        var that = this//获取上下文
        var upload_picture_list = that.upload_picture_list
        //选择图片
        wx.chooseImage({
          count: this.max || 8, // 默认9，这里显示一次选择相册的图片数量
          sizeType: ['original', 'compressed'],// 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'],// 可以指定来源是相册还是相机，默认二者都有
          success: (res=> {// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            res.tempFilePaths.forEach(v=>{
              that.urls.push(v);
            })
            var tempFiles = res.tempFiles
            //把选择的图片 添加到集合里
            for (var i in tempFiles) {
              tempFiles[i]['upload_percent'] = 0
              tempFiles[i]['path_server'] = ''
              upload_picture_list.push(tempFiles[i])
            }
            //显示
            that.upload_picture_list=upload_picture_list
              setTimeout(this.uploadimage,2000)  // 选取图片后，延迟两秒，触发上传时间到服务器
          })
        })
      },
        // 点击图片预览
      ViewImage(e) {
            wx.previewImage({
                urls:this.urls,
                current: e.currentTarget.dataset.url
            });
        },
        // 删除图片
       // DelImg(e) {
       //      wx.showModal({
       //          title: '您好！',
       //          content: '确定要删除这段回忆吗？',
       //          cancelText: '再看看',
       //          confirmText: '再见',
       //          success: res => {
       //              if (res.confirm) {
       //                  this.upload_picture_list.splice(e.currentTarget.dataset.index, 1)
       //              }
       //          }
       //      })
       //  },
      // 点击上传事件
      uploadimage() {
        var page = this
        page.flag=true
        wx.showToast({
          title: '正在上传',
          icon: 'loading',
          duration: 3000
        })
        var upload_picture_list = page.upload_picture_list
        //循环把图片上传到服务器 并显示进度
        for (var j in upload_picture_list) {
          if (upload_picture_list[j]['upload_percent'] == 0) {
            page.upload_file_server(page, upload_picture_list, j)
          }
        }
        setTimeout(this.returnmsg,3000)
      },
      returnmsg(){
        this.$emit("getidimg",this.rearr)
      },
      //上传方法
      upload_file_server(that, upload_picture_list, j) {
        var time = new Date()
        console.log("开始上传" + j + "图片到服务器：")
        //上传返回值
        console.log(upload_picture_list,upload_picture_list[j]['path'])
        var upload_task = wx.uploadFile({
          url: 'https://www.ty5m.com:8088/phy/upload.php',//需要用HTTPS，同时在微信公众平台后台添加服务器地址
          filePath: upload_picture_list[j]['path'], //上传的文件本地地址
          name: 'file',
          formData: {
            'type':'1',
            'num': j
          },

          //附近数据，这里为路径
          success: function (res) {
            var data = JSON.parse(res.data) //字符串转化为JSON
            that.rearr.push(data.name)
            if (data.code == '1') {
              var filename = 'https://www.ty5m.com:8088/phy/upload'+'/'+data.date+'/'+data.name //存储地址 显示
              upload_picture_list[j]['path_server'] = filename
            } else {
              var filename = "https://127.0.0.1:8095/xx.png"//错误图片 显示
              upload_picture_list[j]['path_server'] = filename
            }
            that.upload_picture_list=upload_picture_list
            that.num+=1
            console.log(that.num)
          }
        })
        //上传 进度方法
        upload_task.onProgressUpdate((res) => {
          upload_picture_list[j]['upload_percent'] = res.progress
          this.upload_picture_list=upload_picture_list
        })
      }
    }
  }
</script>


<style>


</style>
