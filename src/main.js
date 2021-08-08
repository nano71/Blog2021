import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";
import VuetifyIcon from "vuetify/lib";
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import VueDOMPurifyHTML from "vue-dompurify-html";

Vue.use(VueDOMPurifyHTML);
Vue.use(VuetifyIcon);
Vue.use(mavonEditor);
//生产信息
Vue.config.productionTip = false;
Vue.config.silent = true;
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
