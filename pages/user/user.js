// pages/user/user.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    phone:'',
    vip:'未开通',
    isVip: 1,
  },
  //事件处理函数
  linkRecord: function () {
    wx.navigateTo({
      url: '../user/record/record'
    })
  },
  refund:function(){
    wx.showModal({
      content: '您的业务已受理，押金将在3-5个工作日内退还',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } 
      }
    })
  },
  linkCoupon: function () {
    wx.navigateTo({
      url: '../user/coupon/coupon'
    })
  },
  linkFault: function () {
    wx.navigateTo({
      url: '../user/fault/fault'
    })
  },
  onLoad: function () {
    this.setData({
      isVip: app.globalData.isVip,
    });
    if (!app.globalData.userInfo) {
      wx.getUserInfo({
        success: res => {
          console.log(res);
          this.setData({
            userInfo: res.userInfo,
            phone: app.globalData.phone
          })
        }
      })
    }
  },
  /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function () {
    return {
      title: '享跑盒子',
      path: '/pages/map/map',
      imageUrl: '../../images/user/yun.png',
      success: function (res) {
        wx.showToast({
          title: '分享成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  goVip:function(){
    wx.navigateTo({
      url: '/pages/user/vip/vip',
    })
  }
})
