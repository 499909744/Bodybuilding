// page/login/login.js
//获取应用实例
const app = getApp()
const saveUserInfoUrl = require('../../config').saveUserInfoUrl;
const sendMsgUrl = require('../../config').sendMsgUrl;
const authMsgUrl = require('../../config').authMsgUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timer: '',
    second: '',
    inputPhone: '',
    inputVcode: '',
    serial: ''
  },
  linkMap: function () {
    wx.navigateTo({
      url: '../map/map'
    })
  },
  /**
   * 倒计时
   */
  startCountdown: function () {
    //验证手机号
    if (!(/^1[34578]\d{9}$/.test(this.data.inputPhone))) {
      wx.showModal({
        content: ' 手机号有误，请重新输入',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
          }
        }
      });
    } else {
      this.sendMsg();
      //显示倒计时
      this.setData({
        second: 60
      })
      let second = this.second = 60;
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        if (second > 0) {
          second--;
          this.setData({
            second: second
          })
        } else {
          clearInterval(this.timer);
        }
      }, 1000)
      return;
    }
  },
  /**
   * 发送验证码
   */
  sendMsg: function () {
    let that = this;
    wx.showLoading({
      title: '加载中',
    })

    wx.request({
      url: sendMsgUrl,
      header: {
        "content-type": "application/json",
        "token_id": "9f1fc10966b046dc9906520f9020ebc2"
      },
      method: "POST",
      data: {
        "mobile": that.data.inputPhone
      },
      success: function (res) {
       console.log(res);
        if (res.statusCode == 200) {
          that.setData({
            serial: res.data.result
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
   * 验证验证码
   */
  authMsg: function () {
    let that = this;
    wx.showLoading({
      title: '加载中',
    })

    wx.request({
      url: authMsgUrl,
      header: {
        "content-type": "application/json",
        "token_id": "9f1fc10966b046dc9906520f9020ebc2"
      },
      method: "POST",
      data: {
        "mobile": that.data.inputPhone,
        "serial": that.data.serial,
        "verify": that.data.inputVcode
      },
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200) {
          if (!app.globalData.authUserInfo){
            console.log(app.globalData.authUserInfo)
            that.saveUserInfo();
          }else{
            wx.redirectTo({
              url: '/pages/map/map',
            })
          }
       
        } else if (res.statusCode == 400) {
          wx.showModal({
            content: '效验失败',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                that.setData({
                  verify: ' '
                });
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
   * 更新&&认证 保存用户信息
   */
  saveUserInfo: function () {
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
      data: {
        "mobile": that.data.inputPhone,
        "idCard": "",
        "realName": ""
      },
      success: function (res) {
        if (res.statusCode == 200) {
          app.globalData.authUserInfo = true
          wx.redirectTo({
            url: '/pages/map/map',
          })
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
   * 获取手机号
   */
  bindKeyPhone: function (e) {
    this.setData({
      inputPhone: e.detail.value
    })
  },
  /**
   * 获取验证码
   */
  bindKeyVcode: function (e) {
    this.setData({
      inputVcode: e.detail.value
    })
  },
  linkMap: function () {
    if (!this.data.inputPhone || !this.data.inputVcode) {
      wx.showModal({
        content: '请补全信息',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      });
    } else {
      this.authMsg();
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.authUserInfo){
      wx.redirectTo({
        url: '/pages/map/map',
      })
    }
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
})