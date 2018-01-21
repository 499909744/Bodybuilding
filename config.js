var host = 'https://xiao2.dandaojiuye.com/gym'

var config = {
  host,
  getTokenIdUrl: `${host}/api/v1/gym/userInfo/login`,//获取接口权限凭证
  getGymListUrl: `${host}/api/v1/gym/gymHourse/list`,
  getUserInfoUrl: `${host}/api/v1/gym/userInfo/getUserInfo`,//获取用户信息
  saveUserInfoUrl: `${host}/api/v1/gym/userInfo/auth`,//保存用户信息
  sendMsgUrl: `${host}/api/v1/gym/common/sendMsg`,//发送验证码
  authMsgUrl: `${host}/api/v1/gym/common/authMsg`,//校验验证码
  reportFaultUrl: `${host}/api/v1/gym/reportFault/save`,//上报故障
  scanRecordListUrl: `${host}/api/v1/gym/scanRecord/list`,//获取扫卡记录
  paymentUrl: `${host}/api/v1/gym/wxPay/pay`, //支付
  getMoneys:`${host}/api/v1/gym/common/getPrice`,//获取全部价格
  getLogs: `${host}/api/v1/gym/logs/getLogs`,//扫卡记录
};
module.exports = config 