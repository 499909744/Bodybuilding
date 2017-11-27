var host = 'http://127.0.0.1:1314'

var config = {
  host,
  getTokenIdUrl: `${host}/api/v1/userInfo/login`,
  getGymListUrl: `${host}/api/v1/gymHourse/list`,
  saveUserInfo: `${host}/api/v1/userInfo/auth`
};
module.exports = config 