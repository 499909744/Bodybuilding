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
    placeholder: '',//默认二维码生成文本,
    _s: '',
    s: '',
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
        wx.hideLoading();

        console.log(res);
        if (res.data.visitQrCode) {
          wx.showModal({
            content: '会员免费体验',
            showCancel: false,
            success: function (_res) {
              wx.setStorageSync('orderSerial', res.data.serialsNo)
              if (_res.confirm) {
                that.createQrCode(res.data.visitQrCode, "mycanvas", 200, 200);
              }
              let s = setInterval(() => {
                that.getLogs(res.data.visitQrCode, s);
              }, 2000);
              that.setData({
                s: s
              })
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
            wx.setStorageSync('orderSerial', res.data.orderSerial)
            let s = setInterval(() => {
              that.getCode(res.data.orderSerial, s);
            }, 2000);
            that.setData({
              s: s
            })
          },
          'fail': function (res) {
            wx.navigateBack({
              delta: 1
            })
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
      url: `https://www.chinaxfit.com/gym/api/v1/gym/scanRecord/getVisitQrCode/${code}/serialNo`,
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
          that.createQrCode(initUrl, "mycanvas", 200, 200);

          let _s = setInterval(() => {
            that.getLogs(initUrl, _s);
          }, 2000)
          that.setData({
            _s: _s
          })
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
            url: '/pages/map/map',
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
  },
  onUnload: function () {
    clearInterval(this.data._s);
    clearInterval(this.data.s);
  },
  onHide: function () {
    clearInterval(this.data._s);
    clearInterval(this.data.s);
  },
  call: function () {
    wx.makePhoneCall({
      phoneNumber: '18691631441' //仅为示例，并非真实的电话号码
    })
  },
})