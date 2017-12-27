// page/user/record/record.js
const app = getApp()
const scanRecordListUrl = require('../../../config').scanRecordListUrl;
const utils = require('../../utils/utils.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordLists: {}
  },
  /**
  *  健身记录列表
  */
  scanRecordList: function () {
    let that = this;
    wx.showLoading({
      title: '加载中',
    })

    wx.request({
      url: scanRecordListUrl,
      header: {
        "content-type": "application/json",
        "token_id": "9f1fc10966b046dc9906520f9020ebc2"
      },
      method: "get",
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200) {
          let content = res.data.content;
          content.forEach(function (value, index) {
            value.pastAt = Math.abs(parseInt(value.createTime) - parseInt(value.enterTime)) / 1000 / 60;
            value.enterTime = utils.toDate(value.enterTime);
            value.createTime = utils.toDate(value.createTime);
            if (!value.price) {
              value.price = 0;
            }
          });
          that.setData({
            recordLists: res.data
          });
        } else if (res.statusCode == 404) {
          wx.showModal({
            content: '暂无健身记录，加油哦！',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
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
    this.scanRecordList();
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