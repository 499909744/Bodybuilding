var host = 'https://xiao2.dandaojiuye.com/gym'

var config = {
  host,
  getTokenIdUrl: `${host}/api/v1/userInfo/login`,//获取接口权限凭证
  getGymListUrl: `${host}/api/v1/gymHourse/list`,
  getUserInfoUrl: `${host}/api/v1/userInfo/getUserInfo`,//获取用户信息
  saveUserInfoUrl: `${host}/api/v1/userInfo/auth`,//保存用户信息
  sendMsgUrl: `${host}/api/v1/wine/common/sendMsg`,//发送验证码
  reportFaultUrl: `${host}/api/v1/reportFault/save`,//上报故障
};
module.exports = config 