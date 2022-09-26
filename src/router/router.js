import App from "../App";
import Router from "vue-router";

import home from "@/page/home/home";
import Login from "@/page/login/Login";
import city from "@/page/city/city";
import profile from "@/page/profile/profile";
import msite from "@/page/msite/msite";
// Vue.use(Router);

export default [
  {
    path: "/",
    component: App, //顶层路由，对应index.html
    children: [
      //所有商铺列表页
      {
        path: "/msite",
        component: msite,
        meta: { keepAlive: true },
      },
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
