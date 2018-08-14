<template>
  <section class="content">
    <label style="width: 100%;text-align: left;margin-top: 10px">设备重启</label>
    <el-row>
      <el-col :span="10" style="text-align: left;margin: 10px auto">单击右侧按钮将使该设备重启设备</el-col>
      <el-col :span="4" :offset="1">
        <el-button type="success" style="width: 100%" @click="restart">重启</el-button>
      </el-col>
    </el-row>
    <label style="width: 100%;text-align: left;margin-top: 10px">恢复出厂设置</label>
    <el-row style="margin: 10px auto">
      <el-col :span="10" style="text-align: left">单机右侧按钮将恢复该设备的出厂设置，
        并丢失当前数据
      </el-col>
      <el-col :span="4" :offset="1">
        <el-button type="success" style="width: 100%" @click="resetDefault">恢复出厂设置</el-button>
      </el-col>
    </el-row>
    <!--<label style="width: 100%;text-align: left;margin-top: 10px">下载升级包</label>-->
    <!--<el-row>-->
    <!--<el-col :span="10" style="text-align: left;margin: 10px auto">单机右侧按钮将获取最新版本升级包-->
    <!--</el-col>-->
    <!--<el-col :span="4" :offset="1">-->
    <!--<el-button type="success" style="width: 100%" @click="downloadZip">下载</el-button>-->
    <!--</el-col>-->
    <!--</el-row>-->
    <label style="width: 100%;text-align: left;margin-top: 10px">远程升级</label>
    <el-row>
      <el-col :span="10" style="text-align: left;margin: 10px auto">单机右侧按钮将开始远程升级</el-col>
      <el-col :span="4" :offset="1">
        <el-button type="success" style="width: 100%" @click="updateSys">升级</el-button>
      </el-col>
    </el-row>
    <label style="width: 100%;text-align: left;margin-top: 10px">参数下发</label>
    <el-row>
      <el-col :span="10" style="text-align: left;margin: 10px auto">单机右侧按钮将开始下发设备参数</el-col>
      <el-col :span="4" :offset="1">
        <el-button type="success" style="width: 100%" @click="sendDown">下发</el-button>
      </el-col>
    </el-row>
    <label style="width: 100%;text-align: left;margin-top: 10px">回传速率诊断</label>
    <el-row style="margin: 10px auto">
      <el-col :span="10" style="text-align: left">
        <el-input disabled v-model="retrievalRate1">
          <template slot="append">/秒</template>
        </el-input>
      </el-col>
      <el-col :span="4" :offset="1">
        <el-button type="success" style="width: 100%" @click="diagnose" :loading="logining">诊断</el-button>
      </el-col>
    </el-row>
    <label style="width: 100%;text-align: left;margin-top: 10px">调试日志</label>
    <el-row>
      <el-col :span="10" style="text-align: left;margin: 10px auto">查看设备上报的调试日志，以便排查问题
      </el-col>
      <el-col :span="4" :offset="1">
        <el-button type="success" style="width: 100%" @click="checkOut">查看</el-button>
      </el-col>
    </el-row>
  </section>
</template>
<script>
  export default {
    props: ['retrievalRate', 'deviceId'],
    data() {
      return {
        retrievalRate1: this.retrievalRate,
        deviceId1: this.deviceId,
        logining: false
      }
    },
    watch: {
      retrievalRate: function () {
        this.retrievalRate1 = this.retrievalRate;
      },
      deviceId: function () {
        this.deviceId1 = this.deviceId;
      }
    },
    created() {
      this.retrievalRate1 = this.retrievalRate;
      this.deviceId1 = this.deviceId;
    },
    methods: {
      //重启
      restart() {
        this.$post('cmd/restart/' + this.deviceId1, {}, "重启指令下发成功", "重启指令下发失败").then((data) => {
        })
      },
      //恢复出厂设置
      resetDefault() {
        this.$post('cmd/reset/' + this.deviceId1, {}, "恢复出厂设置指令下发成功", "恢复出厂设置指令下发失败").then((data) => {
        })
      },
      //下载
      downloadZip() {

      },
      //升级
      updateSys() {
        this.$post('vsersion/upgrade/' + this.deviceId1, {}, "升级指令下发成功", "升级指令下发失败").then((data) => {
        })
      },
      //下发
      sendDown() {
        this.$post('device/deliverDevice/' + this.deviceId1, {}, "参数下发成功", "参数下发失败").then((data) => {
        })
      },
      //诊断
      diagnose() {
        this.logining = true;
        this.$post('cmd/deliverGetRate/' + this.deviceId1, {}, '诊断成功', '诊断失败').then((data) => {
          if (data.code === '000000') {
            this.$emit('subRate', false);
          }
          setTimeout(() => {
            this.logining = false
          }, 5000);
        })
      },
      //查看
      checkOut() {
        this.closeShow();
      },
      closeShow() {
        this.$emit('showLog', false);
      },
    },
    mounted() {
    }
  }
</script>
