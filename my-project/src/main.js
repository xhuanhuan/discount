// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import AMap from 'vue-amap'
import {config} from './config'

Vue.use(config)
Vue.use(AMap)
Vue.use(iView)
Vue.config.productionTip = false

// 初始化vue-amap
AMap.initAMapApiLoader({
  // 高德的key
  key: '1b8112ff01a85d4dcde9887e064562d6',
  // 插件集合
  plugin: ['AMap.Driving', 'AMap.Walking', 'AMap.Transfer', 'AMap.Geolocation', 'AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor']
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
