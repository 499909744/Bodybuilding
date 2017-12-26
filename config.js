var host = 'https://xiao2.dandaojiuye.com/gym'

var config = {
  host,
  getTokenIdUrl: `${host}/api/v1/userInfo/login`,
  getGymListUrl: `${host}/api/v1/gymHourse/list`,
  saveUserInfo: `${host}/api/v1/userInfo/auth`
};
module.exports = config 