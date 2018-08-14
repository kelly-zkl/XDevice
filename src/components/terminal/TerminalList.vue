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
        <el-col :span="16" class="text-left" align="left">
          <el-select v-model="type" placeholder="黑白名单" style="width: 110px;margin-right: 10px;margin-top: 10px">
            <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-select v-model="query.isp" placeholder="运营商" style="width: 110px;margin-right: 10px;margin-top: 10px">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-input placeholder="设备ID" v-model="query.deviceId" style="width: 160px;margin-top: 10px"></el-input>
          <el-input placeholder="终端imsi" v-model="query.imsi" style="width: 160px;margin: 10px 0 0 10px"></el-input>
          <el-button type="primary" icon="search" style="width: 80px;margin-left: 10px;margin-top: 10px"
                     @click="getData">搜索
          </el-button>
          <el-button style="width: 80px;margin-top: 10px" @click="clearData">清除</el-button>
          <label style="margin:0 25px;font-size: 22px">{{count}}条</label>
        </el-col>
        <el-col :span="8" align="right">
          <el-button style="width: 120px;margin-top: 10px" type="success" @click="$router.push('blackManager')">
            黑名单管理
          </el-button>
          <el-button style="width: 120px;margin-top: 10px" type="success" @click="$router.push('whiteManager')">
            白名单管理
          </el-button>
        </el-col>
      </el-row>
      <el-table :data="list" v-loading="listLoading" border class="center-block" stripe>
        <el-table-column align="center" type="index" label="序号" width="80"></el-table-column>
        <el-table-column align="center" prop="deviceId" label="设备ID" min-width="200"></el-table-column>
        <el-table-column align="center" prop="imsi" label="终端imsi" min-width="200"></el-table-column>
        <el-table-column align="center" prop="uptime" label="上报时间" min-width="200"
                         :formatter="formatTime"></el-table-column>
        <el-table-column align="center" prop="operator" label="运营商" min-width="150"
                         :formatter="formatOperator"></el-table-column>
        <el-table-column align="center" prop="netType" label="网络类型" min-width="150"></el-table-column>
        <el-table-column align="center" label="归属地" min-width="150" :formatter="formatArea"></el-table-column>
      </el-table>
      <div class="block" style="margin-top: 20px">
        <el-pagination @size-change="handleSizeChange" @current-change="pageChange" :total="count"
                       :page-sizes="[10, 15, 20, 30]" :page-size="query.size" :current-page="query.page"
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
        options: [{value: '', label: '全部'}, {value: '2', label: '电信'},
          {value: '0', label: '移动'}, {value: '1', label: '联通'}],
        options1: [{value: '', label: '全部'}, {value: 'isBlack', label: '黑名单'}
//          ,{
//          value: 'isWhite',
//          label: '白名单'
//        }
        ],
        type: '',
        intervalid: null,
      }
    },
    //页面关闭时停止更新设备在线状态
    beforeDestroy() {
      clearInterval(this.intervalid);
    },
    methods: {
      //定时刷新设备的在线状态
      dataTask() {
        if (!this.intervalid) {
          this.intervalid = setInterval(() => {
            this.getData();
          }, 2000);
        }
      },
      formatTime(row, column) {
        return row.uptime ? this.getLocalTime(row.uptime) : '--';
      },
      formatOperator(row, column) {
        return row.operator === 0 ? '移动' : row.operator === 1 ? '联通' : row.operator === 2 ? '电信' : '--';
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
        this.$post("terminate/query", this.query).then((data) => {
          this.count = data.data.count;

          this.list = data.data.list;
        });
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
      this.dataTask();
    }
  }
</script>
