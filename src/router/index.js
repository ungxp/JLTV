import Vue from 'vue'
import Router from 'vue-router'
import orderManagementPage from '../pages/orderManagementPage/orderManagementPage.vue' //表单管理页面
import realTimeStatusPage from '../pages/realTimeStatusPage/realTimeStatusPage.vue' //实时状态页面
import ChassisPage from '../pages/ChassisPage/ChassisPage.vue' //安灯闪烁看板
import DetailsPage from '../pages/DetailsPage/DetailsPage.vue' //订单分布及生产进度跟踪
import homePage from '../pages/home/homePage.vue' //订单分布及生产进度跟踪
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/homePage'
    },
    {
      name: 'homePage',
      path: '/homePage',
      component: homePage
    },
    {
      name: 'orderManagementPage',
      path: '/orderManagementPage',
      component: orderManagementPage
    },
    {
      name: 'realTimeStatusPage',
      path: '/realTimeStatusPage/:WorkShopGUID',
      component: realTimeStatusPage
    },
    {
      name: 'ChassisPage',
      path: '/ChassisPage/:watchPoint',
      component: ChassisPage
    },
    {
      name: 'DetailsPage',
      path: '/DetailsPage',
      component: DetailsPage
    }
  ]
})
