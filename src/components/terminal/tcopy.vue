<template>
  <div>
    <section class="content-header text-left">
      <h1>
        侦码
        <small>数据列表</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="javascript:void(0)"><i class="fa fa-dashboard"></i> Home</a></li>
        <li><a href="javascript:void(0)">侦码</a></li>
        <li class="active">列表</li>
      </ol>
    </section>
    <section class="content">
      <el-row class="panel-body">
        <el-col :span="24" class="text-left">
          <el-select v-model="type" placeholder="黑白名单"
                     style="width: 110px;margin-right: 10px">
            <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-select v-model="query.isp" placeholder="运营商" style="width: 110px;margin-right: 10px">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-input placeholder="设备ID" v-model="query.deviceId" style="width: 160px"></el-input>
          <el-input placeholder="终端imsi" v-model="query.imsi" style="width: 160px;margin-left: 10px"></el-input>
          <el-button type="primary" icon="search" style="width: 80px;margin-left: 10px" @click="getData">搜索
          </el-button>
          <el-button style="width: 80px;" @click="clearData">清除</el-button>
          <label style="margin:0 15px;">{{count}}条</label>
          <el-button style="width: 120px;" type="success" @click="$router.push('blackManager')">
            黑名单管理
          </el-button>
          <el-button style="width: 120px;" type="success" @click="$router.push('whiteManager')">
            白名单管理
          </el-button>
        </el-col>
      </el-row>
      <el-table :data="list" v-loading="listLoading" border class="center-block">
        <el-table-column align="center" type="index" label="序号" width="80"></el-table-column>
        <el-table-column align="center" prop="deviceId" label="设备ID" min-width="200"></el-table-column>
        <!--<el-table-column align="center" prop="imei" label="终端imei"-->
        <!--min-width="200"></el-table-column>-->
        <el-table-column align="center" prop="imsi" label="终端imsi" min-width="200"></el-table-column>
        <!--<el-table-column align="center" prop="tmsi" label="终端tmsi"-->
        <!--min-width="200"></el-table-column>-->
        <el-table-column align="center" prop="uptime" label="上报时间" min-width="200"
                         :formatter="formatTime"></el-table-column>
        <el-table-column align="center" prop="isp" label="运营商" min-width="150"
                         :formatter="formatOperator"></el-table-column>
        <el-table-column align="center" prop="netType" label="网络类型" min-width="150"></el-table-column>
        <el-table-column align="center" label="归属地" min-width="150" :formatter="formatArea"></el-table-column>
      </el-table>

      <div class="block" style="margin-top: 20px">
        <el-pagination @size-change="handleSizeChange" @current-change="pageChange" :current-page="query.page"
                       :page-sizes="[10, 15, 20, 30]" :page-size="query.size" :total="count"
                       layout="total, sizes, prev, pager, next, jumper"></el-pagination>
      </div>
    </section>
  </div>
</template>

<script>
  import json from '../../assets/city.json';

  export default {
    data() {
      return {
        count: 0,
        listLoading: false,
        list: [],
        query: {page: 1, size: 10, isp: '', deviceId: this.$route.query.deviceId || '', imsi: ''},
        options: [{value: '', label: '全部'}, {value: '2', label: '电信'}, {value: '0', label: '移动'},
          {value: '1', label: '联通'}],
        options1: [{value: '', label: '全部'}, {value: 'isBlack', label: '黑名单'}
//          ,{
//          value: 'isWhite',
//          label: '白名单'
//        }
        ],
        type: ''
      }
    },
    methods: {
      formatTime(row, column) {
        return row.uptime ? this.getLocalTime(row.uptime) : '--';
      },
      formatOperator(row, column) {
        return row.isp === 0 ? '移动' : row.isp === 1 ? '联通' : '电信';
      },
      formatArea(row, column) {
        let str = '--';
        if (row.areaCode) {
          json.forEach((province) => {
            province.s.forEach((city) => {
              if (row.areaCode === city.id) {
                str = province.n + '  ' + city.n;
              }
            })
          });
        }
        return str;
      },
      clearType() {
        let type = ['isBlack', 'isWhite'];
        for (let item of type) {
          this.query[item] = undefined;
        }
      },
      getData() {
        this.clearType();
        if (this.type) {
          this.query[this.type] = true;
        }
        this.listLoading = true;
        this.$post("terminate/query", this.query).then((data) => {
          this.count = data.data.count;
          this.list = data.data.list;
          setTimeout(() => {
            this.listLoading = false
          }, 500);
        })
      },
      pageChange(index) {
        this.query.page = index;
        this.getData();
      },
      handleSizeChange(val) {
        this.query.size = val;
        this.getData();
      },
      clearData() {
        this.query = {page: 1, size: 10, isp: '', deviceId: '', imsi: ''};
        this.type = '';
        this.clearType();
        this.getData();
      },
      getLocalTime(nS) {
        return new Date(parseInt(nS)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
      }
    },
    mounted() {
      sessionStorage.setItem("active", 2);
      this.getData();
    }
  }
</script>


//登录
<template>
  <div class="main hold-transition login-page">

    <div class="login-box">
      <div class="login-logo">
        <a href="javascript:void(0)"><b>侦码设备</b>管理后台</a>
      </div>
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
<style>
  .main {
    height: 100%;
    width: 100%;
    position: absolute;
  }
</style>


