const generateOwnerQrCodeUrl = require('../../../config').generateOwnerQrCodeUrl;

const app = getApp();
var QR = require("../../utils/qrcode.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  getYcKm: function () {
    wx.showLoading();
    let that = this;
    wx.request({
      url: `${generateOwnerQrCodeUrl}`,
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'token_id': app.globalData.token
      },
      success: function (res) {
        if (res.data) {
          var initUrl = res.data;
          that.createQrCode(initUrl, "mycanvas", 200, 200);
          wx.showToast({
            title: '生成成功',
          })
        }else{
          wx.hideLoading();
        }
      },
      fail: function (res) {
        console.log(res);
        wx.hideLoading();
      },
      complete: function () {

      }
    })
  },
})