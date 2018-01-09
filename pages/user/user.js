// pages/user/user.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    phone:''
  },
  //事件处理函数
  linkRecord: function () {
    wx.navigateTo({
      url: '../user/record/record'
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
  }
})
