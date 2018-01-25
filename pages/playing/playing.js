// pages/playing/playing.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    h: 0,
    m: 0,
    s: 0,
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
    let _url = 'https://xiao2.dandaojiuye.com/gym';
    wx.request({
      url: `${_url}/api/v1/gym/scanRecord/getScanRecord/${orderSerial}/serialNo`,
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'token_id': app.globalData.token
      },
      success: function (res) {
        if (res.statusCode == 200) {
          that.setData({
            h: parseInt(res.data.leftSeconds / 60 / 60),
            m: parseInt(res.data.leftSeconds / 60 % 60),
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
    let h = this.data.h;
    if (s < 0) {
      s == 1
    }
    if (h == 0 && m == 0 && s == 1) {
      clearInterval(i);
      this.setData({
        dis: false,
      })
      return;
    } else if (h == 0 && m == 0 && s == 0) {
      clearInterval(i);
      this.setData({
        dis: false,
      })
      return;
    } else if (h < 0 || m < 0 || s < 0) {
      clearInterval(i);
      this.setData({
        h: 0,
        m: 0,
        s: 0,
        dis: false,
      })
      return;
    }
    this.setData({
      s: s - 1,
    })
    if (m == 0) {
      m = 60;
      if (h >= 1) {
        this.setData({
          h: h - 1,
        })
      }
    }
    if (s == 1 || s == 0) {
      this.setData({
        m: m - 1,
        s: 59
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
      url: '/pages/map/map',
    })
  }
})