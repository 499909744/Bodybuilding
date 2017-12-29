const tokenIdUrl = require('./config').getTokenIdUrl
const getUserInfoUrl = require('./config').getUserInfoUrl;

App({
  /**
   * 获取用户tokenid
   */
  getUserTokenId: function (successFun) {
    var self = this
    if (self.globalData.token) {
        self.getUserInfo(successFun)
    } else {
      wx.login({
        success: function (data) {
          wx.request({
            url: tokenIdUrl + '?code=' + data.code,
            method: 'POST',
            success: function (res) {
              self.globalData.token = res.data.token
              self.getUserInfo(successFun)
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
  getUserInfo: function (successFun) {
    wx.showLoading({
      title: '加载中',
    })
    let that = this;
    wx.request({
      url: getUserInfoUrl,
      header: {
        "content-type": "application/json",
        "token_id": that.globalData.token
      },
      method: "GET",
      success: function (res) {
        if (typeof successFun == 'function') {
          successFun(res);
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
   
  },

  globalData: {
    token: null,
    authUserInfo: false,
  }
})