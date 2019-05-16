// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/reset.css'
import 'swiper/dist/css/swiper.css'
import 'swiper/dist/js/swiper.min.js'
import './assets/icons/iconfont.css'
import axios from 'axios'
import moment from 'moment'
import 'whatwg-fetch'
import VueFetch from 'vue-fetch'
import 'babel-polyfill'
Vue.use(VueFetch, {
  polyfill: true   //should vue-fetch load promise polyfill, set to false to use customer polyfill
});
// axios.defaults.baseURL = 'http://192.168.100.15/JLDPWebApi/Api'
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.filter('time', function (value, formatString) {
  formatString = formatString || 'YYYY-MM-DD';
  return moment(value).format(formatString);
})
if (process.env.NODE_ENV === 'production') {
  //生产环境
  localStorage["host"] = "http://192.168.100.17"
  axios.defaults.baseURL = 'http://192.168.100.17/JLDPWebApi/Api'; 
} else if(process.env.NODE_ENV === 'test') {
  //测试环境
  localStorage["host"] = "http://192.168.100.15"
  axios.defaults.baseURL = 'http://192.168.100.15/JLDPWebApi/Api';
}else {
  // 开发环境
  localStorage["host"] = "http://192.168.100.15"
  axios.defaults.baseURL = 'http://192.168.100.15/JLDPWebApi/Api';
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
