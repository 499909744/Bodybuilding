const tokenIdUrl = require('./config').getTokenIdUrl

App({
  onLaunch: function () {
  },

  globalData: {
    token: null,
    userInfo: null
  },
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
            method:'POST',
            success: function (res) {
              console.log(res)
              self.globalData.token = res.token
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
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  }
})