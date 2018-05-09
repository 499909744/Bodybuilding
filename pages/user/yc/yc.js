// pages/user/yc/yc.js
const getGymListUrl = require('../../../config').getGymListUrl;
const serialUrl = require('../../../config').serialUrl;

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [],
    currentItem: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGymList();
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
  bindPickerChange: function (e) {
    let index = e.detail.value;
    let _currentItem = this.data.array[index];
    this.setData({
      index: e.detail.value,
      currentItem: _currentItem
    })
  },
  /**
  * 获取健身房集合
  */
  getGymList: function () {
    wx.showLoading();
    let that = this;
    wx.request({
      url: getGymListUrl,
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'token_id': app.globalData.token
      },
      success: function (res) {
        console.log(res);
        that.setData({
          array: res.data
        });
      },
      fail: function (res) {
        console.log(res)
      },
      complete: function () {
        wx.hideLoading();
      }
    })
  },
  getYcKm: function () {
    wx.showLoading();
    let that = this;
    if (!this.data.currentItem.serials) {
      wx.showToast({
        icon: 'loading',
        title: '请选择位置',
      });
      return;
    }
    wx.request({
      url: `${serialUrl}/${this.data.currentItem.serials}/serial`,
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'token_id': app.globalData.token
      },
      success: function (res) {
        if (res.statusCode == 200 && res.data.result == "SUCCESS") {
          wx.showToast({
            title: '开门成功',
          })
        } else {
          console.log(res);
        }
      },
      fail: function (res) {
        console.log(res)
      },
      complete: function () {
        
      }
    })
  },

})