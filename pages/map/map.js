const getGymListUrl = require('../../config').getGymListUrl

var markersData = [];
Page({
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    textData: {}
  },
  makertap: function (e) {
    var id = e.markerId;
    console.log(id);
    var that = this;
    that.showMarkerInfo(markersData, id);
  },
  onLoad: function () {
    var that = this;
    that.getCurrentLocation();
    that.getGymList();
  },
  /**
   * 获取健身房详细内容
   */
  showMarkerInfo: function (data, i) {
    console.log(data);
    var that = this;
    that.setData({
      textData: {
        name: data[i].name,
        desc: data[i].gymItems
      }
    });
  },
  /**
   * 获取当前位置
   */
  getCurrentLocation: function () {
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        that.setData({
          latitude: latitude
        });
        that.setData({
          longitude: longitude
        });
      },
      fail: function (error) {
        console.log(error);
      }
    })
  },
  /**
   * 获取健身房集合
   */
  getGymList: function () {
    var that = this;
    wx.request({
      url: getGymListUrl,
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'token_id': '1bf44795b55046c8be22088b1207e0f5'
      },
      success: function (res) {
        markersData = res.data;
        var _markers = []
        for (var i = 0; i < res.data.length; i++) {
          var latitude = Number(res.data[i].latitude);
          var longitude = Number(res.data[i].longitude);
          var marker = {
            id: i,
            latitude: latitude,
            longitude: longitude,
            iconPath: "../../images/map/marker.png",
            width: 50,
            height: 50
          }
          _markers.push(marker)
        }
        that.setData({
          markers: _markers
        });
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },

  linkUserInfo: function () {
    wx.navigateTo({
      url: '../user/user'
    })
  }
})