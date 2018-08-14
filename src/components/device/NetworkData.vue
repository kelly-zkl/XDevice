<template>
  <section class="content">
    <el-table :data="networkData" v-loading="listLoading" border class="center-block">
      <el-table-column align="left" type="index" label="序号"
                       width="65"></el-table-column>
      <el-table-column align="left" prop="earfcn" label="频点"
                       min-width="100" max-width="200"></el-table-column>
      <el-table-column align="left" prop="pci" label="PCI"
                       min-width="100" max-width="200"></el-table-column>
      <el-table-column align="left" prop="band" label="band"
                       min-width="100" max-width="200"></el-table-column>
      <el-table-column align="left" prop="rssi" label="rssi"
                       min-width="100" max-width="200"></el-table-column>
      <el-table-column align="left" prop="rsrp" label="rsrp"
                       min-width="100" max-width="200"></el-table-column>
      <el-table-column align="left" prop="network" label="network"
                       min-width="100" max-width="200" :formatter="formatterAddress"></el-table-column>
      <el-table-column align="left" prop="frameOffset" label="帧偏移"
                       min-width="100" max-width="200"></el-table-column>
      <el-table-column align="left" prop="freqOffset" label="频偏"
                       min-width="100" max-width="200"></el-table-column>
      <el-table-column align="left" prop="plmnID" label="PlmnID"
                       min-width="100" max-width="200"></el-table-column>
      <el-table-column align="left" prop="priority" label="小区优先级"
                       min-width="100" max-width="200"></el-table-column>
    </el-table>
    <!--<el-tabs v-model="tanName" @tab-click="handleClick">-->
    <!--<el-tab-pane v-bind:label="tab.name" v-bind:name="tab.type" v-for="tab in activeName"-->
    <!--:key="tab.type">-->
    <!--<el-form label-width="160px" label-position="left">-->
    <!--<el-form-item label="自动扫频">-->
    <!--<el-input disabled v-model="networkData.enableSweepFrequency"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="帧偏移">-->
    <!--<el-input disabled v-model="networkData.frameOffset"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="扫描开关">-->
    <!--<el-input disabled v-model="networkData.enableScan"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="当前小区运营商编码">-->
    <!--<el-input disabled v-model="networkData.zoneOperationCode"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="当前小区上下行频点">-->
    <!--<el-input disabled v-model="networkData.zoneDownFrequcency"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="当前小区band">-->
    <!--<el-input disabled v-model="networkData.zoneBand"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="当前小区PCI">-->
    <!--<el-input disabled v-model="networkData.zonePCI"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="当前小区TAC">-->
    <!--<el-input disabled v-model="networkData.zoneTAC"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="当前小区LAC">-->
    <!--<el-input disabled v-model="networkData.zoneLAC"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="当前小区TACCperiod">-->
    <!--<el-input disabled v-model="networkData.zoneTACCperiod"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="当前小区bsic">-->
    <!--<el-input disabled v-model="networkData.zoneBsic"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="当前小区CID">-->
    <!--<el-input disabled v-model="networkData.zoneCID"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="当前小区场强">-->
    <!--<el-input disabled v-model="networkData.zoneFieldStrength"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="当前小区C1,C2">-->
    <!--<el-input disabled v-model="networkData.zoneC1C2"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="相邻小区运营商编码">-->
    <!--<el-input disabled v-model="networkData.adjoiningZoneOperationCode"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="相邻小区上下行频点">-->
    <!--<el-input disabled v-model="networkData.adjoiningZoneDownFrequcency"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="相邻小区band">-->
    <!--<el-input disabled v-model="networkData.adjoiningZoneBand"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="相邻小区PCI">-->
    <!--<el-input disabled v-model="networkData.adjoiningZonePCI"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="相邻小区TAC">-->
    <!--<el-input disabled v-model="networkData.adjoiningZoneTAC"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="相邻小区LAC">-->
    <!--<el-input disabled v-model="networkData.adjoiningZoneLAC"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="相邻小区PCI">-->
    <!--<el-input disabled v-model="networkData.adjoiningZonePCI"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="相邻小区TACCperiod">-->
    <!--<el-input disabled v-model="networkData.adjoiningZoneTACCperiod"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="相邻小区bsic">-->
    <!--<el-input disabled v-model="networkData.adjoiningZoneBsic"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="相邻小区CID">-->
    <!--<el-input disabled v-model="networkData.adjoiningZoneCID"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="相邻小区场强">-->
    <!--<el-input disabled v-model="networkData.adjoiningZoneFieldStrength"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="相邻小区C1,C2">-->
    <!--<el-input disabled v-model="networkData.adjoiningZoneC1C2"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item label="相邻小区重选优先等级">-->
    <!--<el-input disabled v-model="networkData.adjoiningZoneReselectPeriod"></el-input>-->
    <!--</el-form-item>-->
    <!--</el-form>-->
    <!--</el-tab-pane>-->
    <!--</el-tabs>-->
  </section>
</template>
<script>
  export default {
    props: ['deviceId'],
    data() {
      return {
        networkData: [],
//        activeName: [{
//          name: '电信',
//          type: 'T'
//        }, {
//          name: '移动',
//          type: 'M'
//        }, {
//          name: '联通',
//          type: 'U'
//        }],
//        tanName: 'T',
        deviceId1: this.deviceId
      }
    },
    watch: {
      deviceId: function () {
        this.deviceId1 = this.deviceId;
//        this.tanName = 'T';
        this.getNetworkData();
      }
    },
    created() {
      this.deviceId1 = this.deviceId;
//      this.tanName = 'T';
      this.getNetworkData();
    },
    methods: {
//      handleClick(tab, event) {
//        this.tanName = tab.name;
//        this.getNetworkData();
//      },
      //格式化内容   有数据就展示，没有数据就显示--
      formatterAddress(row, column) {
        return row[column.property] && row[column.property] != "null" ? row[column.property] : '--';
      },
      getNetworkData() {
        this.listLoading = true;
        this.$post('device/get/byDeviceId/' + this.deviceId1, {}).then((data) => {
          setTimeout(() => {
            this.listLoading = false
          }, 500);
          if (data.code === '000000') {
            if (data.data) {
              this.networkData = data.data.sweepFrequencyList;
            } else {
              this.networkData = [];
            }
          } else {
            this.networkData = [];
          }
        }).catch((err) => {
          this.listLoading = false;
          this.networkData = [];
          this.$message.error(err);
        });
      }
//      getNetworkData() {
//        this.$post('device/get/deviceNetworkParameter/' + this.deviceId1 + '/' + this.tanName,
//          {}).then((data) => {
//          if (data.code === '000000') {
//            if (data.data) {
//              this.networkData = data.data;
//              if (this.networkData.enableSweepFrequency === true) {
//                this.networkData.enableSweepFrequency = '开启';
//              } else {
//                this.networkData.enableSweepFrequency = '关闭';
//              }
//              if (this.networkData.enableScan === true) {
//                this.networkData.enableScan = '开启';
//              } else {
//                this.networkData.enableScan = '关闭';
//              }
//            } else {
//              this.networkData = {};
//            }
//          } else {
//            this.networkData = {};
//          }
//        })
//      }
    }
    ,
    mounted() {
//      this.tanName = 'T';
      this.getNetworkData();
    }
  }
</script>
