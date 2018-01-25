var QR = require("../utils/qrcode.js");
const utils = require('../utils/utils.js');
const getLogs = require('../../config').getLogs
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    payTime: '',
    s: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _info = JSON.parse(options.item);
    wx.setStorageSync('orderSerial', _info.orders.serialsNo)
    this.setData({
      info: _info,
      payTime: utils.toDate(_info.orders.createTime)
    })
    this.createQrCode(_info.visitQrCode, "mycanvas", 200, 200);

    if (_info.status == 3) {
      let s = setInterval(() => {
        this.getLogs(_info.visitQrCode, s);
      }, 2000)
      this.setData({
        s: s
      })
    }
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

  onUnload: function () {
    clearInterval(this.data._s);
    clearInterval(this.data.s);
  },
  onHide: function () {
    clearInterval(this.data._s);
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

  },
  /**
   * 拨打电话
   */
  call: function () {
    wx.makePhoneCall({
      phoneNumber: '88888888' //仅为示例，并非真实的电话号码
    })
  },
  /**
   * 健身中
   */
  linkPlaying: function () {
    wx.redirectTo({
      url: '/pages/map/map',
    })
  },
  createQrCode: function (url, canvasId, cavW, cavH) {
    //调用插件中的draw方法，绘制二维码图片
    QR.api.draw(url, canvasId, cavW, cavH);
    this.setData({
      canvasHidden: false
    });
    //setTimeout(() => { this.canvasToTempImage(); }, 1000);

  },
  back: function () {
    wx.redirectTo({
      url: '/pages/user/user',
    })
  },
  getLogs: function (code, s) {
    wx.request({
      url: `${getLogs}?qrCode=${code}`,
      method: 'POST',
      data: {},
      header: {
        'content-type': 'application/json',
        "token_id": app.globalData.token
      },
      success: function (res) {
        if (res.statusCode == 200) {
          clearInterval(s);
          wx.reLaunch({
            url: '/pages/playing/playing',
          })
          return;
        }
      },
      fail: function (error) {
      },
      complete: function () {

      }
    })
  },
})