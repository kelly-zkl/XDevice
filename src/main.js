// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//ionicons

import Vue from "vue";
import App from "./App";
import router from "./router";
import ElementUI from "element-ui";
import axios from "axios";
import VueAxios from "vue-axios";

import "./assets/css/bootstrap.min.css";
import "./assets/js/bootstrap.min";

import "./assets/css/font-awesome.min.css";
import "element-ui/lib/theme-default/index.css";
//AdminLTE
import "./assets/css/skins/_all-skins.min.css";
import "./assets/css/AdminLTE.min.css";
import "./assets/js/app.min.js";

import "./common/js/util.js";
// import $ from "jquery";
import 'babel-polyfill'

import "./assets/css/el-custom.css";

axios.get("serverconfig.json").then((result) => {
  localStorage.setItem("ApiUrl", result.data.ApiUrl);
}).catch((error) => {
  window.console.log(error)
});
axios.defaults.baseURL = localStorage.getItem("ApiUrl");
//http://119.147.36.2:58080/CriminalCode-admin-web/device/
// axios.defaults.baseURL = "http://119.147.36.2:58080/CriminalCode-admin-web/";
// axios.defaults.baseURL = "http://211.95.45.250:18080/CriminalCode-admin-web";
// axios.defaults.baseURL = "http://192.168.31.21:8090/CriminalCode-admin-web";
// axios.defaults.baseURL = "http://119.23.232.135:9191/CriminalCode-admin-web";
// axios.defaults.baseURL = "http://www.mm-all.com:36002/CriminalCode-admin-web/";

Vue.config.productionTip = true;
Vue.prototype.$post = function (path, param, successMsg, failMsg) {
  // window.console.log("请求地址：" + path);
  // window.console.log("请求参数：" + JSON.stringify(param));
  return axios.post(path, param).then((res) => {
    // window.console.log("返回参数：" + JSON.stringify(res));
    let data = res.data;
    if ("000000" === data.code) {
      if (successMsg !== undefined) {
        this.$message({
          message: successMsg,
          type: 'success'
        });
      }
      if (data === undefined) {
        data = {};
      }
      return data;
    }
    if (failMsg !== undefined) {
      return Promise.reject(failMsg);
    }
    return Promise.reject(data.msg);
  }).catch((err) => {
    vue.$message.error(err);
  });
};

Vue.use(VueAxios, axios);
Vue.use(ElementUI);

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path !== '/login') {
    next({path: '/login'})
  } else {
    next()
  }
});

const vue = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
});
