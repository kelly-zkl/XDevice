<template>
  <div class="main hold-transition login-page">
    <div class="main-header">
      <i class="fa  fa-tv" style="margin-right: 8px"></i>
      <strong>侦码设备管理后台</strong>
    </div>
    <div class="login-box">
      <div class="login-logo">登录后台</div>
      <!-- /.login-logo -->
      <div class="login-box-body">
        <form>
          <div class="form-group has-feedback" style="margin-top: 30px">
            <input class="form-control" placeholder="账号" v-model="account.loginId">
            <span class="glyphicon glyphicon-user form-control-feedback"></span>
          </div>
          <div class="form-group has-feedback">
            <input type="password" class="form-control" placeholder="密码" v-model="account.password">
            <span class="glyphicon glyphicon-lock form-control-feedback"></span>
          </div>
          <div class="row">
            <div class="col-xs-8">
              <!--<div class="checkbox icheck">-->
              <!--<label>-->
              <!--<input type="checkbox"> Remember Me-->
              <!--</label>-->
              <!--</div>-->
            </div>
            <!-- /.col -->
            <div class="col-xs-4">
              <el-button type="primary" class="btn btn-primary btn-block btn-flat" @click="login()"
                         :loading="logining">登录
              </el-button>
            </div>
            <!-- /.col -->
          </div>
        </form>

        <!--<a href="#">忘记密码</a><br>-->
        <!--<a href="register.html" class="text-center">Register a new membership</a>-->

      </div>
      <!-- /.login-box-body -->
    </div>
    <footer class="main-footer">
      <strong>Copyright &copy; 2017 </strong> All rights reserved.
    </footer>
  </div>
</template>

<script>
  import md5 from 'js-md5';

  export default {
    data() {
      return {
        logining: false,
        account: {
          loginId: '',
          password: ''
        }
      }
    },
    methods: {
      login() {
        this.logining = true;
        this.$post("account/login", this.account, "登录成功", "用户名或密码不正确,请重新登录")
          .then((data) => {
            this.logining = false;
            if (data) {
              sessionStorage.setItem("user", JSON.stringify(data.data));
              this.$router.push("/deviceList");
            }
          });
      }
    },
    mounted() {
      sessionStorage.removeItem("active");
    }
  }
</script>
<style scoped>
  .main-header {
    position: absolute;
    top: 0;
    width: 100%;
    margin: 0;
    background: rgba(0, 0, 0, 0.7);
    color: #409EFF;
    border-top: none;
    font-size: 25px;
    padding: 20px 50px;
    text-align: left;
  }

  .main-footer {
    position: absolute;
    bottom: 0;
    height: 60px;
    width: 100%;
    margin: 0;
    background: rgba(0, 0, 0, 0.7);
    color: #959493;
    border-top: none;
    font-size: 18px;
  }

  .login-logo {
    font-size: 28px;
    text-align: center;
    margin: 0;
    font-weight: 300;
    color: #409EFF
  }

  .main {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    background-image: url("../assets/img/bg_login.png");
    background-repeat: no-repeat;
    background-size: cover
  }

  .login-box {
    background-color: rgba(20, 27, 43, 0.6);
    padding-top: 30px;
    margin: 15% auto;
  }

  .login-box-body {
    background-color: rgba(0, 0, 0, 0);
    color: #C3C6CB;
  }

  .form-control {
    background-color: rgba(20, 27, 43, 0.6);
    border: #409EFF 1px solid;
    border-radius: 4px;
    color: #C3C6CB;
  }
</style>
