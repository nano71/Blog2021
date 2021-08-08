import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //要请求的后端地址
    url: "",
    //后台密钥
    key: "",
  },
  mutations: {},
  actions: {},
  modules: {},
});
