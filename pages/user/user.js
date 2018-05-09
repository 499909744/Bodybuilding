// pages/user/user.js
const depositRefundUrl = require('../../config').depositRefundUrl;

//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    phone: '',
    vip: '未开通',
    isVip: 1,
    points: 0,
    userType: 1,

  },
  //事件处理函数
  linkRecord: function () {
    wx.navigateTo({
      url: '../user/record/record'
    })
  },
  refund: function () {

    let that = this;
    wx.showLoading({
      title: '加载中',
    })

    wx.request({
      url: depositRefundUrl,
      header: {
        "content-type": "application/json",
        "token_id": app.globalData.token
      },
      method: "post",
      success: function (res) {
        if (res.statusCode == 200) {
          wx.showModal({
            content: '您的业务已受理，押金将在3-5个工作日内退还',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
        } else if (res.data.code == "repeatedApply.NotRule") {
          wx.showModal({
            content: '退还押金业务正在受理中，请勿重复提交！',
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
  linkCoupon: function () {
    wx.navigateTo({
      url: '../user/coupon/coupon'
    })
  },
  linkFault: function () {
    wx.navigateTo({
      url: '../user/fault/fault'
    })
  },
  onLoad: function () {
    this.setData({
      isVip: app.globalData.isVip,
      points: app.globalData.points,
      userType: app.globalData.userType,
    });
    if (!app.globalData.userInfo) {
      wx.getUserInfo({
        success: res => {
          console.log(res);
          this.setData({
            userInfo: res.userInfo,
            phone: app.globalData.phone
          })
        }
      })
    }
  },
  /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function () {
    return {
      title: '享跑盒子',
      path: '/pages/login/login',
      imageUrl: '../../images/login/logo1.png',
      success: function (res) {
        wx.showToast({
          title: '分享成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  goVip: function () {
    wx.navigateTo({
      url: '/pages/user/openVip/openVip',
    })
  },
  linkYz:function(){
    wx.navigateTo({
      url: '/pages/user/yz/yz',
    })
  },

  linkYc: function () {
    wx.navigateTo({
      url: '/pages/user/yc/yc',
    })
  },
})
