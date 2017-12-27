// pages/user/user.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    authUserInfoIdCard: ""
  },
  //事件处理函数
  linkRecord: function () {
    wx.navigateTo({
      url: '../user/record/record'
    })
  },
  linkAuth: function () {
    wx.navigateTo({
      url: '../user/auth/auth'
    })
  },
  linkCoupon: function () {
    wx.navigateTo({
      url: '../user/coupon/coupon'
    })
  },
  // linkShare: function () {
  //   wx.navigateTo({
  //     url: '../user/share/share'
  //   })
  // },
  linkFault: function () {
    wx.navigateTo({
      url: '../user/fault/fault'
    })
  },
  onLoad: function () {
    this.setData({
      userInfo: app.globalData.userInfo,
      authUserInfoIdCard: app.globalData.authUserData.authUserInfoIdCard
    })
  },
  /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function () {
    return {
      title: '都来健身',
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
