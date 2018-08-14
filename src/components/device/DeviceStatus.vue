<template>
  <section class="content">
    <el-tabs v-model="tanName" @tab-click="handleClick">
      <el-tab-pane v-bind:label="tab.name" v-bind:name="tab.type" v-for="tab in activeName"
                   :key="tab.type">
        <el-row>
          <el-col :span="11" style="text-align: left">
            <label>状态监控</label>
          </el-col>
          <el-col :span="11" :offset="2" style="text-align: left">
            <label>告警</label>
          </el-col>
        </el-row>
        <el-row style="margin-top: 20px">
          <el-col :span="11">
            <el-form label-width="120px" label-position="left">
              <el-form-item label="温度：">{{deviceStatus.temperature}}°</el-form-item>
              <el-form-item label="cpu占用率：">{{deviceStatus.cpu}}%</el-form-item>
              <el-form-item label="内存占用率：">{{deviceStatus.memory}}%</el-form-item>
              <el-form-item label="侦码状态：">上报，{{deviceStatus.criminalCodeStatus}}/min(单路)
              </el-form-item>
              <el-form-item label="抓取记录：">{{deviceStatus.catchNum}}条</el-form-item>
              <el-form-item label="持续工作时间：">{{deviceStatus.workDuration}}秒</el-form-item>
              <el-form-item label="输出功率：">{{deviceStatus.power}}mW</el-form-item>
              <el-form-item label="驻波比：">{{deviceStatus.stationedInBobbi}}</el-form-item>
            </el-form>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-form>
              <el-form-item>
                <el-row>
                  <el-col :span="3">
                    <div
                      v-bind:class="[isMin('temperature','temperature',0,'low')? 'green_circle':'gray_circle']"></div>
                  </el-col>
                  <el-col :span="3">
                    <div
                      v-bind:class="[isMin('temperature','temperature','low','mid')? 'yellow_circle':'gray_circle']"></div>
                  </el-col>
                  <el-col :span="3">
                    <div
                      v-bind:class="[isMin('temperature','temperature','mid','high')? 'red_circle':'gray_circle']"></div>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item>
                <el-row>
                  <el-col :span="3">
                    <div
                      v-bind:class="[isMin('cpu','cpu',0,'low')? 'green_circle':'gray_circle']"></div>
                  </el-col>
                  <el-col :span="3">
                    <div
                      v-bind:class="[isMin('cpu','cpu','low','mid')? 'yellow_circle':'gray_circle']"></div>
                  </el-col>
                  <el-col :span="3">
                    <div
                      v-bind:class="[isMin('cpu','cpu','mid','high')? 'red_circle':'gray_circle']"></div>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item>
                <el-row>
                  <el-col :span="3">
                    <div
                      v-bind:class="[isMin('memory','memory',0,'low')? 'green_circle':'gray_circle']"></div>
                  </el-col>
                  <el-col :span="3">
                    <div
                      v-bind:class="[isMin('memory','memory','low','mid')? 'yellow_circle':'gray_circle']"></div>
                  </el-col>
                  <el-col :span="3">
                    <div
                      v-bind:class="[isMin('memory','memory','mid','high')? 'red_circle':'gray_circle']"></div>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item>
                <el-row>
                  <el-col :span="3">
                    <div class="green_circle" v-if="deviceStatus.isCriminalCode == true"></div>
                    <div class="gray_circle" v-else></div>
                    <!--<div-->
                    <!--v-bind:class="[isMin('criminalCodeStatus','criminalStatus',0,'low')? 'green_circle':'gray_circle']"></div>-->
                  </el-col>
                  <el-col :span="3">
                    <div class="gray_circle"></div>
                    <!--<div-->
                    <!--v-bind:class="[isMin('criminalCodeStatus','criminalStatus','low','mid')? 'yellow_circle':'gray_circle']"></div>-->
                  </el-col>
                  <el-col :span="3">
                    <div class="gray_circle" v-if="deviceStatus.isCriminalCode == true"></div>
                    <div class="red_circle" v-else></div>
                    <!--<div-->
                    <!--v-bind:class="[isMin('criminalCodeStatus','criminalStatus','mid','high')? 'red_circle':'gray_circle']"></div>-->
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item>
                <el-row>
                  <el-col :span="3">
                    <div
                      v-bind:class="[isMin('catchNum','catchNum',0,'low')? 'green_circle':'gray_circle']"></div>
                  </el-col>
                  <el-col :span="3">
                    <div
                      v-bind:class="[isMin('catchNum','catchNum','low','mid')? 'yellow_circle':'gray_circle']"></div>
                  </el-col>
                  <el-col :span="3">
                    <div class="gray_circle"></div>
                    <!--<div-->
                    <!--v-bind:class="[isMin('catchNum','catchNum','mid','high')? 'red_circle':'gray_circle']"></div>-->
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item>
                <el-row>
                  <el-col :span="3">
                    <div
                      v-bind:class="[isMin('workDuration','durationWork',0,'low')? 'green_circle':'gray_circle']"></div>
                  </el-col>
                  <el-col :span="3">
                    <div
                      v-bind:class="[isMin('workDuration','durationWork','low','mid')? 'yellow_circle':'gray_circle']"></div>
                  </el-col>
                  <el-col :span="3">
                    <div class="gray_circle"></div>
                    <!--<div-->
                    <!--v-bind:class="[isMin('workDuration','durationWork','mid','high')? 'red_circle':'gray_circle']"></div>-->
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item>
                <el-row>
                  <el-col :span="3">
                    <div
                      v-bind:class="[isMin('power','power',0,'low')? 'green_circle':'gray_circle']"></div>
                  </el-col>
                  <el-col :span="3">
                    <div
                      v-bind:class="[isMin('power','power','low','mid')? 'yellow_circle':'gray_circle']"></div>
                  </el-col>
                  <el-col :span="3">
                    <div
                      v-bind:class="[isMin('power','power','mid','high')? 'red_circle':'gray_circle']"></div>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item>
                <el-row>
                  <el-col :span="3">
                    <div
                      v-bind:class="[isMin('stationedInBobbi','stationedInBobbi',0,'low')? 'green_circle':'gray_circle']"></div>
                  </el-col>
                  <el-col :span="3">
                    <div
                      v-bind:class="[isMin('stationedInBobbi','stationedInBobbi','low','mid')? 'yellow_circle':'gray_circle']"></div>
                  </el-col>
                  <el-col :span="3">
                    <div
                      v-bind:class="[isMin('stationedInBobbi','stationedInBobbi','mid','high')? 'red_circle':'gray_circle']"></div>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </section>
</template>
<script>
  export default {
    props: ['deviceId'],
    data() {
      return {
        deviceStatus: {},
        warning: {},
        activeName: [{
          name: '电信',
          type: 'T'
        }, {
          name: '移动',
          type: 'M'
        }, {
          name: '联通',
          type: 'U'
        }],
        tanName: 'T',
        deviceId1: this.deviceId,
        intervalid: null
      }
    },
    //页面关闭时停止更新设备在线状态
    beforeDestroy() {
      clearInterval(this.intervalid);
    },
    watch: {
      deviceId: function () {
        this.deviceId1 = this.deviceId;
        this.tanName = 'T';
        this.getDeviceStatus();
      }
    },
    created() {
      this.deviceId1 = this.deviceId;
      this.tanName = 'T';
      this.getDeviceStatus();
    },
    methods: {
      handleClick(tab, event) {
        this.tanName = tab.name;
        this.getDeviceStatus();
      },
      //定时刷新设备的在线状态
      statusTask() {
        if (!this.intervalid) {
          this.intervalid = setInterval(() => {
            this.getDeviceStatus();
          }, 5000);
        }
      },
      getDeviceStatus() {
        this.deviceStatus = {};
        this.$post('device/get/deviceStatus/' + this.deviceId1 + '/' + this.tanName, {}).then(
          (data) => {
            if (data.code === '000000') {
              if (data.data) {
                this.deviceStatus = data.data;
                this.deviceStatus.cpu = parseInt(parseFloat(this.deviceStatus.cpu) * 100);
                this.deviceStatus.memory = parseInt(parseFloat(this.deviceStatus.memory) * 100);
              }
            }
          })
      },
      getWarning() {
        this.warning = {};
        this.$post("alarm/query", {operationType: this.tanName}).then((data) => {
          if (data.code === '000000') {
            if (data.data) {
              this.warning = data.data[0];
              this.warning.cpu.low = parseInt(parseFloat(this.warning.cpu.low) * 100);
              this.warning.cpu.mid = parseInt(parseFloat(this.warning.cpu.mid) * 100);
              this.warning.cpu.high = parseInt(parseFloat(this.warning.cpu.high) * 100);
              this.warning.memory.low = parseInt(parseFloat(this.warning.memory.low) * 100);
              this.warning.memory.mid = parseInt(parseFloat(this.warning.memory.mid) * 100);
              this.warning.memory.high = parseInt(parseFloat(this.warning.memory.high) * 100);
            }
          }
        })
      },

      isMin(a, b, bMin, bMax) {
        if (this.deviceStatus === undefined || this.warning === undefined || this.deviceStatus[a] === undefined) {
          return false;
        }
        if (bMin === 0) {
          return this.deviceStatus[a] >= 0 && this.deviceStatus[a] <= this.warning[b][bMax];
        } else {
          if (this.warning[b][bMin] === undefined || this.warning[b][bMax] === undefined) {
            return false;
          }
          if (bMax === 'high') {
            if (this.deviceStatus[a] > this.warning[b][bMax]) {
              return true;
            } else {
              return this.deviceStatus[a] > this.warning[b][bMin] && this.deviceStatus[a]
                <= this.warning[b][bMax];
            }
          } else {
            return this.deviceStatus[a] > this.warning[b][bMin] && this.deviceStatus[a]
              <= this.warning[b][bMax];
          }
        }
      }
    },
    mounted() {
      this.tanName = 'T';
      this.getWarning();
      this.getDeviceStatus();
      this.statusTask();
    }
  }
</script>
<style>
  .gray_circle {
    background-color: #CCCCCC;
    border-radius: 50%;
    width: 33px;
    height: 33px;
    margin-top: 6px;
  }

  .green_circle {
    background-color: #4CD963;
    border-radius: 50%;
    width: 33px;
    height: 33px;
    margin-top: 6px;
  }

  .yellow_circle {
    background-color: #FFC906;
    border-radius: 50%;
    width: 33px;
    height: 33px;
    margin-top: 6px;
  }

  .red_circle {
    background-color: #FF0000;
    border-radius: 50%;
    width: 33px;
    height: 33px;
    margin-top: 6px;
  }
</style>
