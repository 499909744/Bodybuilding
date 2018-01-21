// pages/index/payment/payment.js
const paymentUrl = require('../../config').paymentUrl
const getLogs = require('../../config').getLogs
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
      url: `${paymentUrl}?type=3&hours=${options.hours}`,
      method: 'POST',
      data: {},
      header: {
        'content-type': 'application/json',
        "token_id": app.globalData.token
      },
      success: function (res) {

        console.log(res);
        if (res.data.visitQrCode) {
          wx.showModal({
            content: '首单免费体验哦',
            showCancel: false,
            success: function (_res) {
              wx.setStorageSync('orderSerial', res.data.serialsNo)
              if (_res.confirm) {
                that.createQrCode(res.data.visitQrCode, "mycanvas", 300, 300);
              }
              let s = setInterval(() => {
                that.getCode(res.data.visitQrCode, s);
              }, 2000);
            }
          });
          return;
        }
        wx.requestPayment({
          'timeStamp': res.data.timeStamp,
          'nonceStr': res.data.nonceStr,
          'package': res.data.package,
          'signType': 'MD5',
          'paySign': res.data.paySign,
          'success': function (_res) {
            console.log(res);
            wx.setStorageSync('orderSerial', res.data.serialsNo)
            let s = setInterval(() => {
              that.getCode(res.data.visitQrCode, s);
            }, 2000);
          },
          'fail': function (res) {
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 2000)
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
        wx.hideLoading();
        console.log(res);
        if (res.statusCode == 200 && res.data.result) {
          wx.hideLoading();
          clearInterval(s);
          var initUrl = res.data.result;
          that.createQrCode(initUrl, "mycanvas", 300, 300);

          let _s = setInterval(() => {
            that.getLogs(initUrl, _s);
          }, 2000)
         
        }
      },
      fail: function (error) {
        wx.hideLoading();
      },
      complete: function () {
        wx.hideLoading();
      }
    })
  },
  back: function () {
    wx.navigateTo({
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
        console.log(res);
        if (res.statusCode == 200) {
          clearInterval(s);
          wx.redirectTo({
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