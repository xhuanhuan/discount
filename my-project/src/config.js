var baseurl = 'http://localhost:3001'
var username=''
var userid=''
// var baseurl = 'https://api.xiaoboma.cn:3000'
var config = {}
config.install = function (Vue) {
  Vue.prototype.myconfig = {
    baseurl,
    userid,
    username
  }
}

export {config}
