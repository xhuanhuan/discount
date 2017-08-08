var baseurl = 'http://localhost:3001'

// var baseurl = 'https://api.xiaoboma.cn:3000'
var config = {}
config.install = function (Vue) {
  Vue.prototype.myconfig = {
    baseurl
  }
}

export {config}
