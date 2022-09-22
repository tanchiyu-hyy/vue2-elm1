import Vue from "vue";
import Vuex from "vuex";
import actions from "./action";
import mutations from './mutations'

Vue.use(Vuex);

const state = {
  userInfo: null, //用户信息
  login: true,//是否登录
};

export default new Vuex.Store({
  state,
  actions,
  mutations
});
