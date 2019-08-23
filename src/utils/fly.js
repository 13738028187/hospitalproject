import Fly from 'flyio/dist/npm/wx'
const fly = new Fly()
const host = "http://"
const Promise = require('es6-promise').Promise

//添加请求拦截器
fly.interceptors.request.use((request) => {
  wx.showLoading({
    title: "加载中",
    mask:true
  });
  console.log(request);
  // request.headers["X-Tag"] = "flyio";
  // request.headers['content-type']= 'application/json';
  request.headers = {
    "X-Tag": "flyio",
    'Cookie':wx.getStorageSync('passcode'),
    'content-type': 'application/x-www-form-urlencoded'
  };

  let authParams = {
    //公共参数
    "categoryType": "SaleGoodsType@sim",
    "streamNo": "wxapp153570682909641893",
    "reqSource": "MALL_H5",
    "appid": "string",
    "timestamp": new Date().getTime(),
    "sign": "string"
  };

  request.body && Object.keys(request.body).forEach((val) => {
    if(request.body[val] === ""){
      delete request.body[val]
    };
  });
  request.body = {
    ...request.body,
    ...authParams
  }
  return request;
});

//添加响应拦截器
fly.interceptors.response.use(
  (response) => {
    wx.hideLoading();
    return response.data;//请求成功之后将返回值返回
  },
  (err) => {
    //请求出错，根据返回状态码判断出错原因
      if(err.status == '401'){
          mpvue.reLaunch({url: '../login/main'})
          wx.hideLoading();
      }else if(err.status == '0' || err.status == '1'){
          wx.showModal({
              title:'抱歉！',
              content:'网络连接异常！'
          })
          wx.hideLoading();
      }else if(err.status == '500'){
          return err
          wx.hideLoading();
      }else{
          return err
      }
    }
);

fly.config.baseURL = host;

export default fly;
