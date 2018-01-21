const getMoneys = require('../../config').getMoneys
const paymentUrl = require('../../config').paymentUrl
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mon: [],
    info: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
          let _info = res.data.scanPrice;
          _info.forEach(_f => {
            _f.isS = false;
          })

          that.setData({
            mon: _info
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
  isClick: function (e) {
    let _m = this.data.mon;
    let _i = e.currentTarget.dataset.index;
    _m.forEach(_r => {
      _r.isS = false;
    })
    _m[_i].isS = true;
    this.setData({
      mon: _m,
      info: _m[_i]
    });
    console.log(_m[_i]);
  },
  goPay: function () {
    let that = this;
    let _info = that.data.info;
    console.log(_info);
    if (!_info) {
      wx.showToast({
        icon: 'loading',
        title: '请选择支付',
      })
      return;
    }
    wx.navigateTo({
      url: '/pages/payment/payment?hours=' + that.data.info.hours,
    })
  }
})