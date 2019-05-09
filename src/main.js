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
axios.defaults.baseURL = 'http://192.168.100.15/JLDPWebApi/Api'
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.filter('time', function (value, formatString) {
  formatString = formatString || 'YYYY-MM-DD';
  return moment(value).format(formatString);
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
