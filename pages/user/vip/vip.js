const paymentUrl = require('../../../config').paymentUrl
const getUserInfoUrl = require('../../../config').getUserInfoUrl;

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    s: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
 * 支付押金
 */
  goPay: function () {
    wx.showLoading();
    let that = this;
    wx.request({
      url: `${paymentUrl}?type=2`,
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
              }, 2000)
              that.setData({
                s: s
              })
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
          } else if (res.data.isVip == 2) {
            clearInterval(s);
            app.globalData.isVip = 2;
            wx.redirectTo({
              url: '/pages/user/user',
            })
          }
        }
      },
      fail: function (res) {

      }, complete: function () {
        wx.hideLoading()
      }
    })
  },
  onUnload: function () {
    clearInterval(this.data._s);
    clearInterval(this.data.s);
  },
  onHide: function () {
    clearInterval(this.data._s);
    clearInterval(this.data.s);
  }
})