const getGymListUrl = require('../../config').getGymListUrl

var markersData = [];
Page({
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    textData: {},
    textShow: false,
    controls: [],
    windowHeight: 0,
    windowWidth: 0,
    circles: []
  },
  /**
   * 点击坐标点出现详情
   */
  makertap: function (e) {
    var id = e.markerId;
    var that = this;
    that.showMarkerInfo(markersData, id);
  },
  /**
   * 点击控件
   * @param e
   */
  controltap: function (e) {
    var that = this;
    if (e.controlId == 1) {
      that.getCurrentLocation();
    } else if (e.controlId == 2) {
      wx.navigateTo({
        url: '/pages/user/user',
      })
    }
  },
  onLoad: function () {
    var that = this;
    that.getCurrentLocation();
    that.getGymList();
    that.getSystemInfo();
    that.getControls();
  },
  /**
   * 获取屏幕尺寸
   */
  getSystemInfo: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        });
      },
    })
  },
  /**
   * 获取健身房详细内容
   */
  showMarkerInfo: function (data, i) {
    var that = this;
    that.setData({
      textData: {
        name: data[i].name,
        desc: data[i].gymItems
      },
      textShow: true
    });
  },
  /**
   * 获取当前位置
   */
  getCurrentLocation: function () {
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var latitude = res.latitude;
        var longitude = res.longitude;
        var speed = res.speed;
        var accuracy = res.accuracy;
        that.setData({
          latitude: latitude,
          longitude: longitude,
          circles: [{
            latitude: res.latitude,
            longitude: res.longitude,
            color: '#7cb5ec88',
            fillColor: '#7cb5ec88',
            radius: 3000,
            strokeWidth: 1,
          }]
        });
        that.setData({});

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
        console.log(res);
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
          markers: _markers,
          textData: {
            name: markersData[0].name,
            desc: markersData[0].gymItems
          },
          textShow: true
        });
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  /**
   * 跳转用户中心
   */
  linkUserInfo: function () {
    wx.navigateTo({
      url: '../user/user'
    })
  },
  /**
   * 扫码
   */
  getScanCode: function () {
    wx.scanCode({
      success: (res) => {
        alert(res);
      }
    })
  },
  /**
   * 获取地图控件
   */
  getControls: function () {
    var that = this;
    var _controls = [
      {
        id: 1,
        iconPath: '../../images/map/location.png',
        position: {
          left: 10,
          top: that.data.windowHeight - that.data.windowHeight / 2.4,
          width: 50,
          height: 50
        },
        clickable: true
      },
      {
        id: 2,
        iconPath: '../../images/map/user.png',
        position: {
          left: that.data.windowWidth - 60,
          top: that.data.windowHeight - that.data.windowHeight / 2.4,
          width: 50,
          height: 50
        },
        clickable: true
      },
    ];
    that.setData({
      controls: _controls
    });
  },
  /**
   * 跳转二维码
   */
  linkPlay: function () {
    wx.navigateTo({
      url: '/pages/play/play',
    })
  }

})