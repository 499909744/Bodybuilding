const getMoneys = require('../../config').getMoneys
const paymentUrl = require('../../config').paymentUrl
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mon: [],
    info: '',
    scanPriceVip: [],
    scanPriceNotVip: [],
    depositPrice: {},
    vipPrice: {},
    isVip: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      isVip: app.globalData.isVip,
    })
    this.getMoney();
  },
  getMoney: function () {
    let that = this;
    wx.request({
      url: getMoneys,
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'token_id': app.globalData.token
      },
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200) {
          that.setData({
            scanPriceVip: res.data.scanPriceVipPlus,
            scanPriceNotVip: res.data.scanPriceNotVipPlus,
            depositPrice: res.data.depositPrice,
            vipPrice: res.data.vipPrice
          })
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

  goPay: function (e) {
    let that = this;
    wx.navigateTo({
      url: '/pages/payment/payment?hours=' + e.currentTarget.dataset.hours,
    })
  }
})