const getGymListUrl = require('../../config').getGymListUrl
const app = getApp()

var markersData = [];
Page({
  data: {
    windowHeight: 0,
    windowWidth: 0,
    getGymList: [],
  },
  onLoad: function () {
    wx.showLoading()
    this.init();
  },
  /**
   * 初始化
   */
  init: function (res) {
    var that = this;
    that.getGymList();
    that.getSystemInfo();
  },
  /**
   * 获取屏幕尺寸
   */
  getSystemInfo: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        });
      },
    })
  },

  /**
   * 获取健身房集合
   */
  getGymList: function () {
    var that = this;
    wx.request({
      url: getGymListUrl,
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'token_id': app.globalData.token
      },
      success: function (res) {
        console.log(res);
        that.setData({
          getGymList: res
        });
      },
      fail: function (res) {
        console.log(res)
      },
      complete: function () {
        wx.hideLoading();
      }
    })
  },
  /**
   * 跳转用户中心
   */
  linkUserInfo: function () {
    wx.navigateTo({
      url: '../user/user'
    })
  },
  /**
   * 跳转二维码
   */
  linkPlay: function (e) {
    console.log(e);
    let item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '/pages/choosePay/choosePay?item=' + JSON.stringify(item),
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '享跑盒子',
      path: '/pages/login/login',
      imageUrl: '../../images/login/logo1.png',
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
})