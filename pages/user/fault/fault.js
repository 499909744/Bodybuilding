// page/user/fault/fault.js
const app = getApp()
const reportFaultUrl = require('../../../config').reportFaultUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  formSubmit: function (e) {
    console.log(e.detail.value)
    const dataPara = e.detail.value;
    if (!dataPara.gymHourseSerial) {
      wx.showModal({
        content: '请输入所在健身房',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      });

    } else if (!dataPara.title) {

      wx.showModal({
        content: '请输入故障说明',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      });

    } else if (!dataPara.description) {
      wx.showModal({
        content: '请输入故障详情',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      });
    } else {
      dataPara.openId = '1';
      this.reportFault(dataPara)
    }
  },
  /**
   * 上报故障
   */
  reportFault: function (dataPara) {
    let that = this;
    wx.showLoading({
      title: '加载中',
    })

    wx.request({
      url: reportFaultUrl,
      header: {
        "content-type": "application/json",
        "token_id": wx.getStorageSync('_token')
      },
      method: "POST",
      data: dataPara,
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200) {
          wx.showModal({
            content: '提交成功，我们尽快处理！',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack({
                  delta: 1
                })
              }
            }
          });
        } else {
          wx.showModal({
            content: '当前服务器繁忙，请稍后再试',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          });
        }

      },
      fail: function (res) {
        console.log(res);
      },
      complete: function () {
        wx.hideLoading()
      }

    })
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

  }
})