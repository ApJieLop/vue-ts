import Vue from "vue";
import App from "./App.vue";

// 路由
import router from "./router";

// vuex
import store from "./store";

// 请求
import axios from 'axios'
import vueAxios from 'vue-axios'
Vue.use(vueAxios, axios)

// ElementUI框架
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../element-variables.scss'
Vue.use(ElementUI)

// echarts
import echarts from 'echarts'
import china from 'echarts/map/json/china.json'
echarts.registerMap('china', china)
Vue.prototype.$echarts = echarts

// QS
import Qs from "qs";
Vue.prototype.$Qs = Qs

// MD5加密
import md5 from "js-md5";
Vue.prototype.$md5 = md5

// 引用封装请求 - api
import httpApi from './assets/js/api'
Vue.prototype.$httpApi = httpApi

// 引用封装的方法 - 函数
import encapsulationFunction from '@/assets/js/requireFunction'
Vue.prototype.encapsulationFunction = encapsulationFunction

// 公共的css
import '../src/assets/css/public.css' 

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");