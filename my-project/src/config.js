var baseurl = 'http://localhost:3000'
var config = {}
config.install = function (Vue) {
  Vue.prototype.myconfig = {
    baseurl
  }
}

export {config}