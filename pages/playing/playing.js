// pages/playing/playing.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    m: '',
    s: '',
    dis: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.getStorage({
      key: 'orderSerial',
      success: function (res) {
        console.log(res);
        that.getOrder(res.data);
      },
    })

    let i = setInterval(() => {
      that.ds(i);
    }, 1000)
  },

  getOrder: function (orderSerial) {
    let that = this;
    wx.request({
      url: `https://xiao2.dandaojiuye.com/gym/api/v1/gym/scanRecord/getScanRecord/${orderSerial}/serialNo `,
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'token_id': app.globalData.token
      },
      success: function (res) {
        if (res.statusCode == 200) {
          that.setData({
            m: parseInt(res.data.leftSeconds / 60),
            s: res.data.leftSeconds % 60
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
  ds: function (i) {
    let s = this.data.s;
    let m = this.data.m;
    if (m == 0 && s == 1) {
      clearInterval(i);
      this.dis = false;
      return;
    }
    this.setData({
      s: s - 1,
    })
    if (s == 1) {
      this.setData({
        m: m - 1,
        s: 60
      })
    }

  },
  /**
   * 拨打电话
   */
  call: function () {
    wx.makePhoneCall({
      phoneNumber: '88888888' //仅为示例，并非真实的电话号码
    })
  },
  pay: function () {
    wx.reLaunch({
      url: '/pages/user/user',
    })
  }
})