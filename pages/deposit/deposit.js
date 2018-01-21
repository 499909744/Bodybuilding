const getMoneys = require('../../config').getMoneys
const paymentUrl = require('../../config').paymentUrl
const getUserInfoUrl = require('../../config').getUserInfoUrl;
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mon: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMoney()
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
        if (res.statusCode == 200) {
          that.setData({
            mon: res.data.depositPrice.configValue
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
  /**
   * 支付押金
   */
  goPay: function () {
    wx.showLoading();
    let that = this;
    wx.request({
      url: `${paymentUrl}?type=1`,
      method: 'POST',
      header: {
        'content-type': 'application/json',
        'token_id': app.globalData.token
      },
      success: function (res) {
        wx.hideLoading();
        if (res.statusCode == 200) {
          wx.requestPayment({
            'timeStamp': res.data.timeStamp,
            'nonceStr': res.data.nonceStr,
            'package': res.data.package,
            'signType': 'MD5',
            'paySign': res.data.paySign,
            'success': function (_res) {
              wx.showLoading({
                title: '处理中...',
                icon: 'loading'
              });
              let s = setInterval(() => {
                that.goMap(s);
              }, 1000)
            },
            'fail': function (res) {

            }
          })
        }
      },
      fail: function (res) {
        wx.hideLoading();
        console.log(res)
      },
      complete: function () {

      }
    })
  },
  goMap: function (s) {
    wx.request({
      url: getUserInfoUrl,
      header: {
        "content-type": "application/json",
        "token_id": app.globalData.token
      },
      method: "GET",
      success: function (res) {
        if (res.statusCode == 200) {
          if (!res.data.mobile) {
            wx.reLaunch({
              url: '/pages/login/login',
            })
          } else if (res.data.isDeposit == 1) {
            wx.reLaunch({
              url: '/pages/deposit/deposit',
            })
          } else if (res.data.isDeposit == 2) {
            clearInterval(s);
            wx.reLaunch({
              url: '/pages/map/map',
            })
          }
        }
      },
      fail: function (res) {

      }, complete: function () {
        wx.hideLoading()
      }
    })
  }

})