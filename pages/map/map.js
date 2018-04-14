const getGymListUrl = require('../../config').getGymListUrl
const app = getApp()

var markersData = [];
Page({
  data: {
    windowHeight: 0,
    windowWidth: 0,
    getGymList:[],
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
    // that.getOrder();
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
  linkPlay: function () {
    wx.navigateTo({
      url: '/pages/choosePay/choosePay',
    })
  },

  getOrder: function () {
    let orderSerial = wx.getStorageSync('orderSerial')
    let _url = 'https://xiao2.dandaojiuye.com/gym';
    wx.request({
      url: `${_url}/api/v1/gym/scanRecord/getScanRecord/${orderSerial}/serialNo`,
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'token_id': app.globalData.token
      },
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200) {
          if (res.data.leftSeconds > 0 && res.data.status == 5) {
            wx.reLaunch({
              url: '/pages/playing/playing',
            })
          }
        }
      },
      fail: function (res) {
        console.log(res)
      },
      complete: function () {
        wx.hideLoading();
      }
    })
  },

})