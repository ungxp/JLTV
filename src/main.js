// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/reset.css'
import 'swiper/dist/css/swiper.css'
import 'swiper/dist/js/swiper.min.js'
import './assets/icons/iconfont.css'
import './assets/iconfont/iconfont.css'
import axios from 'axios'
import moment from 'moment'
import 'whatwg-fetch'
import VueFetch from 'vue-fetch'
import 'babel-polyfill'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
Vue.use(VueFetch, {
  polyfill: true   //should vue-fetch load promise polyfill, set to false to use customer polyfill
});
// import Vconsole from 'vconsole';
// const vConsole = new Vconsole();
// Vue.use(vConsole)
// axios.defaults.baseURL = 'http://192.168.100.15/JLDPWebApi/Api'
Vue.prototype.$axios = axios
// if(localStorage.getItem('IP')) {
//   axios.defaults.baseURL = 'http://'+localStorage.getItem('IP')
// }else {
//   axios.defaults.baseURL = 'http://192.168.100.17'
// }
Vue.config.productionTip = false
Vue.filter('time', function (value, formatString) {
  formatString = formatString || 'YYYY-MM-DD';
  return moment(value).format(formatString);
})
// if (process.env.NODE_ENV === 'production') {
//   //生产环境
//   localStorage["host"] = "http://192.168.100.17"
//   axios.defaults.baseURL = 'http://192.168.100.17'; 
// } else if(process.env.NODE_ENV === 'test') {
//   //测试环境
//   localStorage["host"] = "http://192.168.100.17"
//   axios.defaults.baseURL = 'http://192.168.100.17';
// }else {
//   // 开发环境
//   localStorage["host"] = "http://192.168.100.17"
//   axios.defaults.baseURL = 'http://192.168.100.17';
// }
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
