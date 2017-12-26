// pages/user/user.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {}
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
  linkShare: function () {
    wx.navigateTo({
      url: '../user/share/share'
    })
  },
  linkFault: function () {
    wx.navigateTo({
      url: '../user/fault/fault'
    })
  },
  onLoad: function () {
    this.setData({
      userInfo: app.globalData.userInfo
    })
  }
})
