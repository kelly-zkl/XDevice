import Vue from "vue";
import Router from "vue-router";
import DeviceList from "../components/device/DeviceList.vue";
import DeviceAdd from "../components/device/DeviceAdd.vue";
import TerminalList from "../components/terminal/TerminalList.vue";
import Login from "../components/Login.vue";
import Index from "../components/Index.vue";
import AdminAdd from "../components/admin/AdminAdd.vue";
import WarningManager from "../components/warning/WarningManager.vue";
import WarningSet from "../components/warning/WarningSet.vue";
import BlackManager from "../components/terminal/BlackManager.vue";
import WhiteManager from "../components/terminal/WhiteManager.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: '设备管理',
      component: Index,
      children: [
        {path: '/deviceList', component: DeviceList, name: '设备列表'},
        {path: '/deviceAdd', component: DeviceAdd, name: '添加设备'},
        {path: '/terminalList', component: TerminalList, name: '终端列表'},
        {path: '/blackManager', component: BlackManager, name: ''},
        {path: '/whiteManager', component: WhiteManager, name: ''},
        {path: '/warningManager', component: WarningManager, name: '告警管理'},
        {path: '/warningSet', component: WarningSet, name: ''},
        {path: '/adminAdd', component: AdminAdd, name: '添加管理员'},
      ]
    },
    {
      path: '/login',
      name: "登录",
      component: Login
    }
  ]
})
