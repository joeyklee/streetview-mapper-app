import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

// console.log(process.env)
// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config({ path: './.env.development' });
// } else {
//   require('dotenv').config({ path: './.env' });
// }

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
