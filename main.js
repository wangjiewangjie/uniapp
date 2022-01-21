import Vue from 'vue';
import App from './App';

Vue.config.productionTip = false;

App.mpType = 'app';

// 引入全局uView
import uView from 'uview-ui';
Vue.use(uView);

import { router, RouterMount } from './util/router'; //路径换成自己的
Vue.use(router);

const app = new Vue({
  ...App,
});

// http拦截器，将此部分放在new Vue()和app.$mount()之间，才能App.vue中正常使用
import httpInterceptor from '@/util/http.interceptor.js';
Vue.use(httpInterceptor, app);

// http接口API集中管理引入部分
import httpApi from '@/api/http.api.js';
Vue.use(httpApi, app);

/* uni-simple-router配置 */
//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
RouterMount(app, router, '#app');
// #endif

// #ifndef H5
app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif
