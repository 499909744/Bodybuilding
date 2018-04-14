const getMoneys = require('../../config').getMoneys
const paymentUrl = require('../../config').paymentUrl
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        location: '',
        btnText: '立即使用',
        mon: [],
        info: '',
        scanPriceVip: [],
        scanPriceNotVip: [],
        depositPrice: {},
        vipPrice: {},
        isVip: 1,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            location: options.location,
            isVip: app.globalData.isVip,
        })
        this.getMoney();
        this.getTime();
    },
    /**
     * 获取时间
     */
    getTime: function () {
        let time1 = new Date();
        time1.setFullYear(2018, 3, 15);
        let time2 = new Date();
        time2.setFullYear(2018, 4, 15);
        let today = new Date();
        if (today >= time1 && today <= time2) {
            this.setData({
                'btnText': '会员免费试用'
            });
        }
    },
    getMoney: function () {
        let that = this;
        wx.request({
            url: getMoneys,
            method: 'GET',
            header: {
                'content-type': 'application/json',
                'token_id': app.globalData.token
            },
            success: function (res) {
                console.log(res);
                if (res.statusCode == 200) {
                    that.setData({
                        scanPriceVip: res.data.scanPriceVipPlus,
                        scanPriceNotVip: res.data.scanPriceNotVipPlus,
                        depositPrice: res.data.depositPrice,
                        vipPrice: res.data.vipPrice
                    })
                }
            },
            fail: function (res) {
                console.log(res)
            },
            complete: function () {
                wx.hideLoading();
            }
        })
    },

    goPay: function (e) {
        let that = this;
        console.log(e.currentTarget.dataset.hours);
        wx.navigateTo({
            url: '/pages/payment/payment?hours=' + e.currentTarget.dataset.hours,
        })
    }
})