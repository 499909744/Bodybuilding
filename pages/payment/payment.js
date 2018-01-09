// pages/index/payment/payment.js
const paymentUrl = require('../../config').paymentUrl
const app = getApp()
var QR = require("../utils/qrcode.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canvasHidden: true,
    maskHidden: true,
    imagePath: '',
    placeholder: ''//默认二维码生成文本
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.showLoading();
    wx.request({
      url: paymentUrl,
      method: 'POST',
      data: {},
      header: {
        'content-type': 'application/json',
        "token_id": app.globalData.token
      },
      success: function (res) {
        wx.requestPayment({
          'timeStamp': res.data.timeStamp,
          'nonceStr': res.data.nonceStr,
          'package': res.data.package,
          'signType': 'MD5',
          'paySign': res.data.paySign,
          'success': function (_res) {
            let s = setInterval(() => {
              that.getCode(res.data.orderSerial, s);
            }, 1000);
          },
          'fail': function (res) {
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 1000)
          }
        })
      },
      fail: function (error) {
      },
      complete: function () {
        wx.hideLoading();
      }
    })
  },
  /**
   * 获取二维码
   */
  getCode: function (code, s) {
    wx.showLoading();
    let that = this;
    wx.request({
      url: `https://xiao2.dandaojiuye.com/gym/api/v1/gym/scanRecord/getVisitQrCode/${code}/serialNo`,
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json',
        "token_id": app.globalData.token
      },
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200 && res.data.result) {
          wx.hideLoading();
          clearInterval(s);
          var initUrl = res.data.result;
          that.createQrCode(initUrl, "mycanvas", 300, 300);
        }
      },
      fail: function (error) {
        wx.hideLoading();
      },
      complete: function () {

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

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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
  createQrCode: function (url, canvasId, cavW, cavH) {
    //调用插件中的draw方法，绘制二维码图片
    QR.api.draw(url, canvasId, cavW, cavH);
    this.setData({
      canvasHidden: false
    });
    //setTimeout(() => { this.canvasToTempImage(); }, 1000);

  },
  //获取临时缓存照片路径，存入data中
  canvasToTempImage: function () {
    var that = this;
    wx.canvasToTempFilePath({
      canvasId: 'mycanvas',
      success: function (res) {
        var tempFilePath = res.tempFilePath;
        that.setData({
          imagePath: tempFilePath,
          canvasHidden: false
        });
      },
      fail: function (res) {
        console.log(res);
      }
    });
  }
})