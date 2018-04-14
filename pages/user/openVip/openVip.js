// pages/user/openVip/openVip.js
const paymentUrl = require('../../../config').paymentUrl
const getUserInfoUrl = require('../../../config').getUserInfoUrl;
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: 0,
    windowWidth: 0,
    s: '',
  },

  joinVip: function () {

  },
  lookAgainVip: function () {
    wx.navigateTo({
      url: '/pages/map/map',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSystemInfo();
  },
  /**
     * 获取屏幕尺寸
     */
  getSystemInfo: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res);
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        });
      },
    })
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
          } else if (res.data.isVip == 2) {
            clearInterval(s);
            app.globalData.isVip = 2;
            wx.redirectTo({
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
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearInterval(this.data.s);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(this.data.s);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})