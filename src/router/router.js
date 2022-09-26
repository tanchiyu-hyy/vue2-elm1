import App from "../App";
import Router from "vue-router";

import home from "@/page/home/home";
import Login from "@/page/login/Login";
import city from "@/page/city/city";
import profile from "@/page/profile/profile";
// const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')

// Vue.use(Router);

export default [
  {
    path: "/",
    component: App, //顶层路由，对应index.html
    children: [
      {
        path: "",
        redirect: "/home",
      },
      {
        path: "/home",
        component: home,
      },
      //登录注册页
      {
        path: "/login",
        component: Login,
      },
      //当前选择城市页
      {
        path: "/city/:cityid",
        component: city,
      },
      //个人信息页
      {
        path: "/profile",
        component: profile,
      },
    ],
  },
];
