import Vue from "vue";
import ElementUI from 'element-ui'
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  // 整体架子
  {
    path: '/publicShell',
    name: 'publicShell',
    component: (resolve) =>
      require(['@/components/publicShell.vue'], resolve),
    meta: {
      title: '首页',
      requiresAuth: true,
    },
    // 重定向
    redirect() {
      return '/onePageOne'
    },
    children: [
      // 用户管理 - 企业用户路由
      {
        path: '/onePageOne',
        name: 'onePageOne',
        component: (resolve) =>
          require(['@/views/onePage/one.vue'], resolve),
        meta: {
          title: '企业用户',
          requiresAuth: true,
        },
      },
    ],
  },
  // 登录
  {
    path: '/',
    name: 'login',
    component: (resolve) => require(['@/views/login.vue'], resolve),
    meta: {
      title: 'login',
    },
  },
  // 404
  {
    path: '*',
    name: '404',
    component: (resolve) => require(['@/views/_404.vue'], resolve),
    meta: {
      title: '404',
    },
  },
];

const router = new VueRouter({
  routes
});

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title + '- 某公司名称'
  } else {
    document.title = '某公司名称'
  }
  //获取store里面的token
  let token = localStorage.getItem('token')
  //判断要去的路由有没有requiresAuth
  if (to.meta.requiresAuth) {
    if (token) {
      next()
    } else {
      localStorage.clear();
      ElementUI.Message.error('登录已失效，请重新登录');
      next({
        path: '/',
        query: { redirect: to.fullPath }, // 将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由
      })
    }
  } else {
    next() // 没有启动守卫 - 随他去吧
  }
})

export default router;
