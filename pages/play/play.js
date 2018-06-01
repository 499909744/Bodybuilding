// pages/play/play.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _item: '',
    latitude: '',
    longitude: '',
    markers: [],
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(JSON.parse(options.item));
    let _item = JSON.parse(options.item);
    this.setData({
      _item: options.item
    });

    let _markers = [];
    let _marker = {
      iconPath: "../../images/login/logo1.png",
      id: _item.id,
      latitude: _item.latitude,
      longitude: _item.longitude,
      width: 80,
      height: 50,
      callout: {
        content: _item.location,
        display: 'ALWAYS',
        fontSize: 18
      }
    };
    _markers.push(_marker);
    this.getCurrentLocation();
    this.setData({
      markers: _markers
    })

    console.log(this.data.markers)
  },
  /**
   * 拨打电话
   */
  call: function () {
    wx.makePhoneCall({
      phoneNumber: '18691631441' //仅为示例，并非真实的电话号码
    })
  },
  /**
   * 健身中
   */
  linkPlaying: function () {
    wx.redirectTo({
      url: '/pages/map/map',
    })
  },

  getCurrentLocation: function () {
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        that.setData({
          latitude: latitude,
          longitude: longitude,
        });
      },
      fail: function (error) {
        console.log(error);
      }
    })
  },
})