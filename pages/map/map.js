// page/map/map.js
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
    var that = this;
    that.showMarkerInfo(markersData, id);
    that.changeMarkerColor(markersData, id);
  },
  onLoad: function () {
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
        console.log(res);
      }
      
    })
    var that = this;
    
    wx.request({
      url: 'http://192.168.1.102:1314/api/v1/gymHourse/list',
      method:'GET',
      header: {
        'content-type': 'application/json',
        'code':'123'
      },
      success: function (res) {
        markersData = res.data;
      
        var _markers = []
        for (var i = 0; i < res.data.length; i++) {
          var latitude = Number(res.data[i].latitude);
          var longitude = Number(res.data[i].longitude);
          var id = Number(res.data[i].id);
          var marker = {
            latitude: latitude,
            longitude: longitude,
            iconPath: "../../images/map/marker.png",
            id:id,
            width:50,
            height:50
          }
          _markers.push(marker)
        }
        console.log(_markers)
        that.setData({
          markers: _markers
        });
      },
      fail:function (res){
        console.log(res)
      }
    })
    // var myAmapFun = new amapFile.AMapWX({ key: '8c52e30969e901461b1796ae95525543' });
    // myAmapFun.getPoiAround({
    //   iconPathSelected: '../../images/map/marker.png', //如/：..­/..­/img/marker_checked.png
    //   iconPath: '../../images/map/marker.png', //如：..­/..­/img/marker.png
    //   success: function (data) {
    //     markersData = data.markers;
    //     that.setData({
    //       markers: markersData
    //     });
    //     that.setData({
    //       latitude: markersData[0].latitude
    //     });
    //     that.setData({
    //       longitude: markersData[0].longitude
    //     });
    //     console.log(markersData)
    //     that.showMarkerInfo(markersData, 0);
    //   },
    //   fail: function (info) {
    //     wx.showModal({ title: info.errMsg })
    //   }
    // })
  },
  showMarkerInfo: function (data, i) {
    var that = this;
    that.setData({
      textData: {
        name: data[i].name,
        desc: data[i].gymItems
      }
    });
  },
  changeMarkerColor: function (data, i) {
    var that = this;
    var markers = [];
    console.log(data);
    for (var j = 0; j < data.length; j++) {
      if (j == i) {
        data[j].iconPath = "../../images/map/marker.png"; //如：..­/..­/img/marker_checked.png
      } else {
        data[j].iconPath = "../../images/map/marker.png"; //如：..­/..­/img/marker.png
      }
      markers.push(data[j]);
    }
    that.setData({
      markers: markers
    });
  }

})