<template>
  <section class="content">
    <el-tabs v-model="tanName" @tab-click="handleClick">
      <el-tab-pane v-bind:label="tab.name" v-bind:name="tab.type" v-for="tab in activeName"
                   :key="tab.type">
        <el-form label-width="120px" label-position="left">
          <!--<el-form-item label="运营商编码">-->
          <!--<el-input v-model="opDeviceParameter.operationCode" disabled></el-input>-->
          <!--</el-form-item>-->
          <el-form-item label="band" prop="band" align="left">
            <el-select v-model="opDeviceParameter.band" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"
                         @change="changeBand">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上行频点" prop="upFrequency">
            <el-input v-model="opDeviceParameter.upFrequency" disabled></el-input>
          </el-form-item>
          <el-form-item label="下行频点">
            <el-input v-model="opDeviceParameter.downFrequency" @change="changeDown"></el-input>
          </el-form-item>
          <el-form-item label="PCI" prop="pci">
            <el-input v-model="opDeviceParameter.pci"></el-input>
          </el-form-item>
          <el-form-item label="TAC" prop="tac">
            <el-input v-model="opDeviceParameter.tac"></el-input>
          </el-form-item>
          <el-form-item label="TACperiod" prop="tacPeroid">
            <el-input v-model="opDeviceParameter.tacPeroid"></el-input>
          </el-form-item>
          <el-form-item label="bsic" prop="bsic" align="left">
            {{opDeviceParameter.bsic}}
            <!--<el-input v-model="opDeviceParameter.bsic" disabled></el-input>-->
          </el-form-item>
          <el-form-item label="CID" prop="cid" align="left">
            {{opDeviceParameter.cid}}
            <!--<el-input v-model="opDeviceParameter.cid" disabled></el-input>-->
          </el-form-item>
          <!--<el-form-item label="功率等级">-->
          <!--<el-input v-model="opDeviceParameter.powerLevel"></el-input>-->
          <!--</el-form-item>-->
          <el-form-item label="BandWidth">
            <el-row>
              <el-col :span="12" align="left">
                <el-select v-model="opDeviceParameter.bandWidth" placeholder="带宽BandWidth">
                  <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <!--<el-form-item label="扫频时间">-->
          <!--<el-input v-model="opDeviceParameter.sweepFrequcency"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="帧偏移">-->
          <!--<el-input v-model="opDeviceParameter.frameOffset" disabled></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="开启/关闭侦码">-->
          <!--<el-switch on-color="#13ce66" off-color="#BFCBD9" on-text="" off-text=""-->
          <!--v-model="opDeviceParameter.isCriminalCode">-->
          <!--</el-switch>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="数据上报">-->
          <!--<el-switch on-color="#13ce66" off-color="#BFCBD9" on-text="" off-text=""-->
          <!--v-model="opDeviceParameter.isPauseDataUpload">-->
          <!--</el-switch>-->
          <!--</el-form-item>-->
          <el-form-item>
            <el-row>
              <el-col :span="2" :offset="8">
                <el-button type="primary" @click="updateParam">确定</el-button>
              </el-col>
              <el-col :span="2" style="margin-left: 20px">
                <el-button @click="closeDialog">取消</el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </section>
</template>
<script>
  import {numValid} from '../../api'

  export default {
    props: ['deviceId'],
    data() {
      return {
        opDeviceParameter: {
          bandWidth: '',
          band: 0,
          pci: 0,
          tac: 0,
          tacPeroid: 0,
          bsic: 0,
          cid: 0,
          isCriminalCode: false,
          isPauseDataUpload: false,
        },
        activeName: [{name: '电信', type: 'T'}, {name: '移动', type: 'M'}, {name: '联通', type: 'U'}],
        options1: [{value: '1', label: '3MHz'}, {value: '2', label: '5MHz'}, {value: '3', label: '10MHz'},
          {value: '4', label: '15MHz'}, {value: '5', label: '20MHz'}],
        tanName: 'T',
        deviceId1: this.deviceId,
        options: [{value: '1', label: '1'}, {value: '3', label: '3'}]
      }
    },
    watch: {
      deviceId: function () {
        this.deviceId1 = this.deviceId;
        this.tanName = 'T';
        this.options = [{value: '1', label: '1'}, {value: '3', label: '3'}];
        this.getParam();
      }
    },
    created() {
      this.deviceId1 = this.deviceId;
      this.tanName = 'T';
      this.options = [{value: '1', label: '1'}, {value: '3', label: '3'}];
      this.getParam();
    },
    methods: {
      //下行频点变化
      changeDown(val) {
        if (!this.opDeviceParameter.band) {
          this.$message.error('请选择band值');
          return;
        }
        if (this.tanName == 'M') {
          if (this.opDeviceParameter.band == 38) {
            this.opDeviceParameter.upFrequency = val;
          } else if (this.opDeviceParameter.band == 39) {
            this.opDeviceParameter.upFrequency = val;
          } else if (this.opDeviceParameter.band == 40) {
            this.opDeviceParameter.upFrequency = val;
          } else if (this.opDeviceParameter.band == 41) {
            this.opDeviceParameter.upFrequency = val;
          }
        } else {
          if (this.opDeviceParameter.band == 1) {
            this.opDeviceParameter.upFrequency = parseInt(val) + 18000;
          } else if (this.opDeviceParameter.band == 3) {
            this.opDeviceParameter.upFrequency = parseInt(val) + 18000;
          }
        }
      },
      //band值发生变化
      changeBand(val) {

      },
      handleClick(tab, event) {
        this.tanName = tab.name;
        if (this.tanName == 'M') {
          this.options = [{value: '38', label: '38'}, {value: '39', label: '39'},
            {value: '40', label: '40'}, {value: '41', label: '41'}];
        } else {
          this.options = [{value: '1', label: '1'}, {value: '3', label: '3'}];
        }
        this.getParam();
      },
      getParam() {
        this.$post('device/get/deviceParameter/' + this.deviceId1 + '/' + this.tanName, {}).then((data) => {
          this.opDeviceParameter = $.Bean.copyProperty(data.data, this.opDeviceParameter);
          if (this.opDeviceParameter.bandWidth === 0 || this.opDeviceParameter.bandWidth === "undefined" ||
            this.opDeviceParameter.bandWidth === undefined) {
            this.opDeviceParameter.bandWidth = '';
          } else {
            this.opDeviceParameter.bandWidth = '' + this.opDeviceParameter.bandWidth + '';
          }
          if (this.opDeviceParameter.isCriminalCode === "undefined" || this.opDeviceParameter.isCriminalCode === undefined) {
            this.opDeviceParameter.isCriminalCode = false
          }
          if (this.opDeviceParameter.isPauseDataUpload === "undefined" || this.opDeviceParameter.isPauseDataUpload === undefined) {
            this.opDeviceParameter.isPauseDataUpload = false
          }
          this.opDeviceParameter.bsic = 0;
          this.opDeviceParameter.cid = 0;
        })
      },
      updateParam() {
        this.opDeviceParameter.operationType = this.tanName;
        console.log(this.opDeviceParameter.band);
        if (!numValid(this.opDeviceParameter.band)) {
          this.$message.error('band只能输入整数');
          return;
        }
        if (!numValid(this.opDeviceParameter.pci)) {
          this.$message.error('PCI只能输入整数');
          return;
        }
        if (!numValid(this.opDeviceParameter.tac)) {
          this.$message.error('TAC只能输入整数');
          return;
        }
        if (!numValid(this.opDeviceParameter.tacPeroid)) {
          this.$message.error('TACPeroid只能输入整数');
          return;
        }
//        if (!numValid(this.opDeviceParameter.bsic)) {
//          this.$message.error('bsic只能输入整数');
//          return;
//        }
//        if (!numValid(this.opDeviceParameter.cid)) {
//          this.$message.error('CID只能输入整数');
//          return;
//        }
        if (this.opDeviceParameter.bandWidth === '' || this.opDeviceParameter.bandWidth === "undefined" ||
          this.opDeviceParameter.bandWidth === undefined) {
          this.opDeviceParameter.bandWidth = 0;
        }
        this.opDeviceParameter.catchModel = 1;
        this.opDeviceParameter.isPauseDataUpload = false;
        this.$post('device/modify/deviceParameter/' + this.deviceId1, this.opDeviceParameter,
          '修改成功', '修改失败').then((data) => {
          this.getParam();
          setTimeout(() => {
            this.closeDialog();
          }, 500);
        })

      },
      closeDialog() {
        this.$emit('setClose', false);
      }
    },
    mounted() {
      this.tanName = 'T';
      this.getParam();
    }
  }
</script>
