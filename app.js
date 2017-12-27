const tokenIdUrl = require('./config').getTokenIdUrl
const getUserInfoUrl = require('./config').getUserInfoUrl;

App({
  /**
   * 获取用户tokenid
   */
  getUserTokenId: function () {
    var self = this
    if (self.globalData.token) {
    } else {
      wx.login({
        success: function (data) {
          console.log(data.code);
          console.log(tokenIdUrl)
          wx.request({
            url: tokenIdUrl + '?code=' + data.code,
            method: 'POST',
            success: function (res) {
              console.log(res)
              self.globalData.token = res.token
              self.getUserInfo();
            },
            fail: function (res) {
              console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res)
            }
          })
        },
        fail: function (err) {
          console.log('wx.login 接口调用失败，将无法正常使用开放接口等服务', err)
        }
      })
    }
  },
  /**
   * 获取用户基本信息
   */
  getUserInfo: function () {
    wx.showLoading({
      title: '加载中',
    })
    let that = this;
    wx.request({
      url: getUserInfoUrl,
      header: {
        "content-type": "application/json",
        "token_id": "9f1fc10966b046dc9906520f9020ebc2"
      },
      method: "GET",
      success: function (res) {
        console.log(res);
        if (res.statusCode == 200) {
          if (!res.data.mobile) {
            wx.redirectTo({
              url: '/pages/login/login',
            })
          } else {
            that.globalData.authUserInfo = true;
          }
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
      }, complete: function () {
        wx.hideLoading()
      }

    })
  },
  onLaunch: function () {
    let that = this;
    that.getUserTokenId();
    if (!that.globalData.userInfo) {
      wx.getUserInfo({
        success: res => {
          that.globalData.userInfo = res.userInfo
        }
      })
    }
  },

  globalData: {
    token: null,
    userInfo: null,
    authUserInfo: false
  }

})