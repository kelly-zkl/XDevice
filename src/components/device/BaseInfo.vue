<template>
  <section class="content">
    <el-form label-width="100px" label-position="left">
      <el-form-item label="设备名称">
        <el-input disabled v-model="deviceMonitor.deviceName"></el-input>
      </el-form-item>
      <el-form-item label="设备型号">
        <el-input disabled v-model="deviceMonitor.model"></el-input>
      </el-form-item>
      <el-form-item label="设备ID">
        <el-input disabled v-model="deviceMonitor.deviceId"></el-input>
      </el-form-item>
      <el-form-item label="运营商">
        <el-input disabled v-model="operations"></el-input>
      </el-form-item>
      <el-form-item label="网络制式">
        <el-input disabled v-model="network"></el-input>
      </el-form-item>
      <el-form-item label="经纬度">
        <el-row>
          <el-col :span="10" style="margin-right: 10px">
            <el-input disabled v-model="deviceMonitor.lon">
              <template slot="prepend">经度</template>
            </el-input>
          </el-col>
          <el-col :span="10">
            <el-input disabled v-model="deviceMonitor.lat">
              <template slot="prepend">纬度</template>
            </el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="所在位置">
        <el-row>
          <el-col :span="8">
            <el-cascader expand-trigger="hover" :options="provinceList" v-model="selectedOptions2"
                         :props="props" @change="areaChange">
            </el-cascader>
          </el-col>
          <el-col :span="15" :offset="1">
            <el-input v-model="deviceMonitor.detailAddress"></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="工作时间">
        <el-row>
          <el-col :span="10" style="margin-right: 10px">
            <el-time-select
              v-model="startTime" placeholder="开始时间"
              :picker-options="{start:'00:00',step:'00:15',end:'23:59'}" style="width: 100%">
            </el-time-select>
          </el-col>
          <el-col :span="2">至</el-col>
          <el-col :span="10">
            <el-time-select
              v-model="endTime"
              :picker-options="{start: '00:00',step: '00:15',end: '23:59',minTime: startTime}"
              style="width: 100%" placeholder="结束时间">
            </el-time-select>
          </el-col>
        </el-row>
      </el-form-item>
      <!--<el-form-item label="设备时间">-->
        <!--<el-date-picker v-model="deviceMonitor.deviceTime" type="datetime"-->
                        <!--placeholder="选择设备时间" style="width: 100%"></el-date-picker>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="服务器">-->
        <!--<el-row>-->
          <!--<el-col :span="2">地址</el-col>-->
          <!--<el-col :span="12">-->
            <!--<el-input v-model="deviceMonitor.serverInfo" type="number"></el-input>-->
          <!--</el-col>-->
          <!--<el-col :span="2" :offset="1">端口</el-col>-->
          <!--<el-col :span="4">-->
            <!--<el-input v-model="deviceMonitor.serverPort" type="number"></el-input>-->
          <!--</el-col>-->
        <!--</el-row>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="备用服务器">-->
        <!--<el-row>-->
          <!--<el-col :span="2">地址</el-col>-->
          <!--<el-col :span="12">-->
            <!--<el-input v-model="deviceMonitor.backServerInfo" type="number"></el-input>-->
          <!--</el-col>-->
          <!--<el-col :span="2" :offset="1">端口</el-col>-->
          <!--<el-col :span="4">-->
            <!--<el-input v-model="deviceMonitor.backServerPort" type="number"></el-input>-->
          <!--</el-col>-->
        <!--</el-row>-->
      <!--</el-form-item>-->
      <el-form-item label="心跳间隔">
        <el-input v-model="deviceMonitor.heartbeat" type="number">
          <template slot="append">秒</template>
        </el-input>
      </el-form-item>
      <!--<el-form-item label="回传速率">-->
        <!--<el-input v-model="deviceMonitor.retrievalRate" type="number">-->
          <!--<template slot="append">/秒</template>-->
        <!--</el-input>-->
      <!--</el-form-item>-->
      <el-form-item label="设备IP">
        <el-input v-model="deviceMonitor.ip" type="number"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="deviceMonitor.remake"></el-input>
      </el-form-item>
      <el-form-item>
        <el-row>
          <el-col :span="2" :offset="8">
            <el-button type="primary" @click="updateBaseInfo">确定</el-button>
          </el-col>
          <el-col :span="2" style="margin-left: 20px">
            <el-button @click="closeDialog">取消</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </section>
</template>
<script>
  import json from '../../assets/city.json';

  export default {
    props: ['Id'],
    data() {
      return {
        props: {
          value: 'id',
          label: 'n',
          children: 's'
        },
        selectedOptions2: [],
        provinceList: json,
        runningStatusVisible: false,
        deviceMonitor: {
//          serverInfo: '',
//          backServerInfo: '',
          ip: '',
          endTime: 0,
          startTime: 0,
//          deviceTime: ''
        },
        operations: '',
        network: '',
        Id1: this.Id
      }
    },
    watch: {
      Id: function () {
        this.Id1 = this.Id;
        this.getBaseInfo();
      }
    },
    created() {
      this.Id1 = this.Id;
      this.getBaseInfo();
    },
    computed: {
      // 计算属性的 getter
      startTime: {
        get() {
          return this.getTimeStr(this.deviceMonitor.startTime);
        },
        set(newValue) {
          this.deviceMonitor.startTime = this.getTimeNum(newValue);
        },
      },
      endTime: {
        get() {
          return this.getTimeStr(this.deviceMonitor.endTime);
        },
        set(newValue) {
          this.deviceMonitor.endTime = this.getTimeNum(newValue);
        },
      }
    },
    methods: {
      getTimeStr(time) {
        if (isNaN(time) || time === 0) {
          return '00:00';
        }
        let hour = Math.floor(time / 60 / 60);
        let minute = time / 60 % 60;
        if (hour < 10) {
          hour = "0" + hour;
        }
        if (minute < 10) {
          minute = "0" + minute;
        }
        return hour + ":" + minute;
      },
      getTimeNum(newValue) {
        let hour = parseInt(newValue.substring(0, 2), 10);
        let minute = parseInt(newValue.substring(3, 5), 10);
        if (isNaN(hour) || isNaN(minute)) {
          return 0
        } else {
          return (hour * 60 + minute) * 60;
        }
      },
      getBaseInfo() {
        this.selectedOptions2 = [];
        this.$post("device/get/" + this.Id1, {}).then((data) => {
          data.data = $.Bean.copyProperty(data.data, this.deviceMonitor);
          if (data.code === '000000') {
            if (data.data) {
              this.deviceMonitor = data.data;
              let str = '';
              for (let item of this.deviceMonitor.operations) {
                str += item === 'U' ? '联通' : item === 'M' ? '移动' : '电信';
                str += ',';
              }
              this.operations = str.substr(0, str.length - 1);
              let str2 = '';
              for (let item of this.deviceMonitor.networks) {
                str2 += item;
                str2 += ',';
              }
              this.network = str2.substr(0, str2.length - 1);
              if (data.data.areaCode) {
                json.forEach((province) => {
                  province.s.forEach((city) => {
                    if (this.deviceMonitor.areaCode === city.id) {
                      this.selectedOptions2 = [province.id, city.id];
                    }
                  })
                });
              } else {
                this.selectedOptions2 = [];
              }
            }
          }
        })
      },
      updateBaseInfo() {
        this.$post("device/modify/baseinfo", this.deviceMonitor, '修改成功', '修改失败').then((data) => {
          this.getBaseInfo();
          setTimeout(() => {
            this.closeDialog();
          }, 500);
        })
      },
      closeDialog() {
        this.$emit('baseClose', false);
      },
      areaChange(value) {
        this.deviceMonitor.areaCode = value[1];
      }
    },
    mounted() {
      this.getBaseInfo();
    }
  }
</script>

