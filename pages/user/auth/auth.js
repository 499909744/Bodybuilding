// page/user/auth/auth.js
const app = getApp()
const saveUserInfoUrl = require('../../../config').saveUserInfoUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    realName:'',
    idCard:'',
    authUserInfoIdCard:''
  },
  /**
   *  点击确定
   */
  formSubmit: function (e) {
    console.log(e.detail.value);
    let that = this;
    const dataPara = e.detail.value;
    dataPara.mobile = "";
    that.saveUserInfo(dataPara);
  },
  /**
   * 更新&&认证 保存用户信息
   */
  saveUserInfo: function (dataPara) {
    let that = this;
    wx.showLoading({
      title: '加载中',
    })

    wx.request({
      url: saveUserInfoUrl,
      header: {
        "content-type": "application/json",
        "token_id": "9f1fc10966b046dc9906520f9020ebc2"
      },
      method: "POST",
      data: dataPara,
      success: function (res) {
        if (res.statusCode == 200) {
          app.globalData.authUserData.authUserInfoIdCard = true;
          wx.showModal({
            content: '认证成功',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack({
                  delta: 1
                })
              }
            }
          });
        } else if (res.data.code == "notTrueInfo.auth.userInfo.NotRule ") {
          wx.showModal({
            content: '信息错误',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {

              }
            }
          });
        } else if (res.data.code == "repeatedAuth.auth.userInfo.NotRule") {
          wx.showModal({
            content: '重复认证',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {

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
    console.log(app.globalData.authUserData)
    this.setData({
      realName: app.globalData.authUserData.realName,
      idCard: app.globalData.authUserData.idCard,
      authUserInfoIdCard: app.globalData.authUserData.idCard,
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

  }
})