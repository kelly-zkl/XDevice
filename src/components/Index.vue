<template>
  <div class="main wrapper">
    <header class="main-header">
      <!-- Logo -->
      <a href="javascript:void(0)" class="logo">
        <!-- mini logo for sidebar mini 50x50 pixels -->
        <span class="logo-mini"><b>me</b>nu</span>
        <!-- logo for regular state and mobile devices -->
        <span class="logo-lg"><b>侦码设备</b>管理后台</span>
      </a>
      <!-- Header Navbar: style can be found in header.less -->
      <nav class="navbar navbar-static-top">
        <!-- Sidebar toggle button-->
        <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button"><span
          class="sr-only">Toggle navigation</span>
        </a>
        <div class="navbar-custom-menu">
          <ul class="nav navbar-nav" style="margin-right:30px;">
            <!-- User Account: style can be found in dropdown.less -->
            <li class="dropdown user user-menu">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                <img src="../assets/img/user2-160x160.jpg" class="user-image" alt="User Image">
                <span class="hidden-xs">{{userName}}</span>
                <small>，已登录</small>
              </a>
              <ul class="dropdown-menu">
                <!-- Menu Footer-->
                <li class="user-header">
                  <div>
                    <a class="btn btn-primary" style="margin-top: 15px">修改资料</a>
                  </div>
                  <div>
                    <a class="btn btn-primary">修改密码</a>
                  </div>
                  <div>
                    <a @click="loginOut()" class="btn btn-primary">退出</a>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </header>
    <aside class="main-sidebar">
      <section class="sidebar text-left">
        <ul class="sidebar-menu">
          <li :class="{active:this.active==1}">
            <a @click="navClick(1,'deviceList')">
              <i class="fa  fa-tv" style="margin-right: 8px"></i>
              <span>设备管理</span>
            </a>
          </li>
          <li :class="{active:this.active==2}">
            <a @click="navClick(2,'terminalList')">
              <i class="fa fa-cloud" style="margin-right: 8px"></i>
              <span>侦码数据</span>
            </a>
          </li>
          <li :class="{active:this.active==3}">
            <a @click="navClick(3,'warningManager')">
              <i class="fa fa-warning" style="margin-right: 8px"></i>
              <span>告警管理</span>
            </a>
          </li>
          <li :class="{active:this.active==4}">
            <a @click="navClick(4,'adminAdd')">
              <i class="fa fa-user-md" style="margin-right: 8px"></i>
              <span>管&nbsp;&nbsp;理&nbsp;&nbsp;员</span>
            </a>
          </li>
        </ul>
      </section>
    </aside>

    <div class="content-wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        msg: '',
        userName: JSON.parse(sessionStorage.getItem("user")).name,
        active: sessionStorage.getItem("active") || 1
      }
    },
    methods: {
      navClick(index, path) {
        this.active = index;
        this.path = path;
        this.$router.replace({path: path});
      },

      loginOut() {
        sessionStorage.setItem("user", null);
        this.$router.replace("/login");
      }
    },

    mounted() {

    }
  }
</script>
<style scoped>
  .content-wrapper {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 230px;
    margin: 0;
  }

  .sidebar-mini.sidebar-collapse .content-wrapper {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 50px;
    margin: 0 !important;
  }

  .main-sidebar {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
  }

  .main {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
  }

  .navbar-nav > .user-menu > .dropdown-menu {
    padding: 0;
    border-top-width: 0;
    margin-top: 13px;
    min-width: 80px;
    width: 130px;
    z-index: 9999;
    -moz-box-shadow: -3px 3px 6px rgba(40, 40, 40, .5); /*firefox*/
    -webkit-box-shadow: -3px 3px 6px rgba(40, 40, 40, .5); /*webkit*/
    box-shadow: -3px 3px 6px rgba(40, 40, 40, .5); /*opera或ie9*/
  }

  .navbar-nav > .user-menu > .dropdown-menu:before {
    content: '';
    background-color: #3C8DBC;
    width: 20px;
    height: 20px;
    position: absolute;
    left: 55px;
    top: -8px;
    border-radius: 3px;
    overflow: hidden;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  .navbar-nav > .user-menu > .dropdown-menu > li.user-header {
    height: 120px;
    text-align: center;
    border-radius: 4px;
    padding: 0;
  }

  .btn {
    width: 100%;
    border: none;
    border-radius: 0;
  }

  .btn-primary {
    width: 100%;
    border: none;
    border-radius: 0;
  }
</style>
