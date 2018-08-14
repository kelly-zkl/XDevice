<template>
  <div>
    <section class="content-header text-left">
      <h1>告警
        <small>列表</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="javascript:void(0)"><i class="fa fa-dashboard"></i> Home</a></li>
        <li><a href="javascript:void(0)">告警</a></li>
        <li class="active">列表</li>
      </ol>
    </section>
    <section class="content">
      <div class="center-block">
        <el-row class="panel-body">
          <el-col :span="24" class="text-left">
            <el-select v-model="alarmType" placeholder="告警类型"
                       style="width: 300px;margin-right: 10px" multiple @change="handleChange">
              <el-option
                v-for="item in options1" :key="item.value"
                :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="query.alarmLevel" placeholder="告警等级" style="width: 120px">
              <el-option
                v-for="item in options" :key="item.value"
                :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-button type="primary" icon="search" style="width: 80px;margin-left: 10px"
                       @click="getData">搜索
            </el-button>
            <el-button style="width: 80px;" @click="clearData">清除</el-button>
            <el-button style="width: 120px;" type="success" @click="$router.push('warningSet')">
              告警设置
            </el-button>
          </el-col>
        </el-row>
        <el-table :data="warningList" border v-loading="listLoading" class="center-block">
          <el-table-column align="center" prop="deviceId" label="设备ID"
                           min-width="200"></el-table-column>
          <el-table-column align="center" prop="deviceName" label="设备名称"
                           min-width="200"></el-table-column>
          <el-table-column align="center" prop="model" label="型号"
                           min-width="200"></el-table-column>
          <el-table-column align="center" label="经纬度" width="200"
                           :formatter="formatterLatLon"></el-table-column>
          <el-table-column align="center" prop="detailAddress" label="位置"
                           min-width="200"></el-table-column>
          <el-table-column align="center" label="告警类型" :formatter="formatterArray"
                           min-width="300"></el-table-column>
          <el-table-column align="center" label="告警等级" :formatter="formatterLevel"
                           width="150"></el-table-column>
        </el-table>
        <div class="block" style="margin-top: 20px">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="pageChange"
            :current-page="query.page"
            :page-sizes="[10, 15, 20, 30]"
            :page-size="query.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="count"></el-pagination>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        warningList: [],
        listLoading: false,
        count: 0,
        query: {
          page: 1,
          size: 10,
          alarmLevel: ''
        },
        alarmType: [],
        options: [{
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '低'
        }, {
          value: '2',
          label: '中'
        }, {
          value: '3',
          label: '高'
        }],
        options1: [{
          value: 'isTemperatureAlarm',
          label: '温度'
        }, {
          value: 'isCpuAlarm',
          label: 'CPU占用率'
        }, {
          value: 'isMemoryAlarm',
          label: '内存占用率'
        }, {
          value: 'isCriminalCodeStatusAlarm',
          label: '侦码状态'
        }, {
          value: 'isPowerAlarm',
          label: '输出功率'
        }, {
          value: 'isStationedInBobbiAlarm',
          label: '驻波比'
        }]
      }
    },
    methods: {
      pageChange(index) {
        this.query.page = index;
        this.getData();
      },
      handleSizeChange(val) {
        this.query.size = val;
        this.getData();
      },
      handleChange(val) {
        this.alarmType = val;
      },
      clearData() {
        this.query = {
          page: 1,
          size: 10,
          alarmLevel: ''
        };
        this.alarmType = [];
        this.clearType();
        this.getData();
      },
      clearType() {
        let type = ['isTemperatureAlarm', 'isCpuAlarm', 'isMemoryAlarm',
          'isCriminalCodeStatusAlarm', 'isPowerAlarm', 'isStationedInBobbiAlarm'];
        for (let item of type) {
          this.query[item] = undefined;
        }
      },
      getData() {
        this.clearType();
        if (this.alarmType) {
          for (let item of this.alarmType) {
            this.query[item] = true;
          }
        }
        this.$post("alarm/device/list", this.query).then((data) => {
          this.warningList = data.data.list;
          this.count = data.data.count;
        })
      },
      formatterArray(row, column) {
        let str = '';
        if (row.isCpuAlarm === true) {
          str += 'CPU占用率，';
        }
        if (row.isCriminalCodeStatusAlarm === true) {
          str += '侦码状态，';
        }
        if (row.isMemoryAlarm === true) {
          str += '内存占用率，';
        }
        if (row.isPowerAlarm === true) {
          str += '输出功率，';
        }
        if (row.isStationedInBobbiAlarm === true) {
          str += '驻波比，';
        }
        if (row.isTemperatureAlarm === true) {
          str += '温度，';
        }
        if (str === '') {
          str = '--，'
        }

        return str.substr(0, str.length - 1);
      },
      formatterLatLon(row, column) {
        return row.lon + "," + row.lat;
      },
      formatterLevel(row, column) {
        return row.alarmLevel === 1 ? '低' : row.alarmLevel === 2 ? '中' : row.alarmLevel === 3 ? '高' : '--';
      }
    },
    mounted() {
      sessionStorage.setItem("active", 3);
      this.getData();
    }
  }
</script>
