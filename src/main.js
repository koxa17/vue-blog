import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import VueNoty from 'vuejs-noty'
import 'vuejs-noty/dist/vuejs-noty.css'
import Dialog from 'vue-dialog-loading'
Vue.config.productionTip = false;


Vue.use(VueNoty, {  layout: 'bottomRight', theme: 'metroui'})
Vue.use(Dialog, {
  dialogBtnColor: '#0f0'
})


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
