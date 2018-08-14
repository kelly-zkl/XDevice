<template>
  <div>
    <section class="content-header text-left">
      <h1>
        设备
        <small>设备列表</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="javascript:void(0)"><i class="fa fa-dashboard"></i> Home</a></li>
        <li><a href="javascript:void(0)">设备</a></li>
        <li class="active">列表</li>
      </ol>
    </section>
    <section class="content">
      <div class="center-block">
        <el-row class="panel-body">
          <el-col :span="18" class="text-left">
            <el-cascader expand-trigger="hover" :options="provinceList" v-model="selectedOptions2"
                         :props="props" @change="areaChange" placeholder="区域"
                         style="width: 150px;margin-right: 10px;margin-top: 10px">
            </el-cascader>
            <el-select v-model="query.operations" placeholder="运营商"
                       style="width: 100px;margin-right: 10px;margin-top: 10px">
              <el-option
                v-for="item in options1" :key="item.value"
                :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="query.networks" placeholder="网络"
                       style="width: 100px;margin-right: 10px;margin-top: 10px">
              <el-option
                v-for="item in options2" :key="item.value"
                :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <!--<el-select v-model="query.status" placeholder="在线状态"-->
            <!--style="width: 110px;margin-right: 10px;margin-top: 10px">-->
            <!--<el-option-->
            <!--v-for="item in options3" :key="item.value"-->
            <!--:label="item.label" :value="item.value">-->
            <!--</el-option>-->
            <!--</el-select>-->
            <el-input placeholder="设备名称/ID" v-model="query.deviceName"
                      style="width: 150px;margin-right: 10px;margin-top: 10px"></el-input>
            <el-button type="primary" icon="search" style="width: 80px;;margin-top: 10px"
                       @click="getData">搜索
            </el-button>
            <el-button style="width: 80px;;margin-top: 10px" @click="clearData">清除
            </el-button>
          </el-col>
          <el-col :span="6">
            <el-button type="success" style="width: 100px;margin-top: 10px" @click=""
                       :disabled="this.sels.length===0">批量升级
            </el-button>
            <el-button type="success" icon="plus" style="width: 130px;margin-top: 10px"
                       @click="$router.push('deviceAdd')">添加设备
            </el-button>
          </el-col>
        </el-row>

        <el-table :data="deviceList" border v-loading="listLoading" class="center-block"
                  @selection-change="selsChange" @row-dblclick="rowClick">
          <el-table-column type="selection" width="40" align="center"></el-table-column>
          <el-table-column fixed align="center" prop="deviceId" label="设备ID"
                           min-width="200"></el-table-column>
          <el-table-column align="center" prop="deviceName" label="设备名称"
                           min-width="200"></el-table-column>
          <el-table-column align="center" prop="model" label="型号"
                           min-width="200"></el-table-column>
          <el-table-column align="center" prop="operations" :formatter="formatterOperations"
                           label="运营商" min-width="160"></el-table-column>
          <el-table-column align="center" prop="networks" :formatter="formatterArray" label="网络制式"
                           min-width="140"></el-table-column>
          <el-table-column align="center" label="经纬度" :formatter="formatterLatLon"
                           width="200"></el-table-column>
          <el-table-column align="center" prop="detailAddress" label="位置"
                           min-width="200" :formatter="formatterAddress"></el-table-column>
          <el-table-column align="center" prop="lineStatus" label="在线状态"
                           width="180" :formatter="formatterAddress"></el-table-column>
          <el-table-column fixed="right" align="center" label="操作" width="220">
            <template scope="scope">
              <el-button
                @click.stop="runningStatus(deviceList[scope.$index],'1');runningStatusVisible=true"
                size="small" type="info" style="margin-right: 5px">详情
              </el-button>
              <el-button @click.stop="gotoTerminal(deviceList[scope.$index].deviceId)"
                         size="small" type="info" style="margin-right: 5px">终端
              </el-button>
              <el-button @click.stop="clickDelete(deviceList[scope.$index].id)" size="small"
                         type="danger">删除
              </el-button>
            </template>
          </el-table-column>
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
      <el-dialog title="" :visible.sync="runningStatusVisible">
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane v-bind:label="deviceName" name="0" disabled>
          </el-tab-pane>
          <el-tab-pane label="基本信息" name="1">
            <baseInfo v-bind:Id="Id" @baseClose="closeDialog"></baseInfo>
          </el-tab-pane>
          <el-tab-pane label="参数设置" name="2">
            <setParam v-bind:deviceId="deviceId" @setClose="closeDialog"></setParam>
          </el-tab-pane>
          <el-tab-pane label="设备状态" name="3">
            <deviceStatus v-bind:deviceId="deviceId"></deviceStatus>
          </el-tab-pane>
          <el-tab-pane label="网络数据" name="4">
            <networkData v-bind:deviceId="deviceId"></networkData>
          </el-tab-pane>
          <el-tab-pane label="升级维护" name="5">
            <update v-bind:retrievalRate="retrievalRate" v-bind:deviceId="deviceId" v-if="isShow == true"
                    @showLog="showList" @subRate="changeSub"></update>
            <logList v-bind:deviceId="deviceId" v-else @showLogList="showList"></logList>
          </el-tab-pane>
        </el-tabs>
      </el-dialog>
    </section>
  </div>
</template>

<script>
  import baseInfo from '../device/BaseInfo'
  import setParam from '../device/SetParam'
  import networkData from '../device/NetworkData'
  import deviceStatus from '../device/DeviceStatus'
  import update from '../device/Update'
  import logList from '../device/LogsList'

  import json from '../../assets/city.json';

  export default {
    data() {
      return {
        props: {
          value: 'id',
          label: 'n',
          children: 's'
        },
        selectedOptions2: [],
        provinceList: json,
        listLoading: false,
        deviceList: [],
        query: {
          page: 1,
          size: 10,
          areaCode: '',
          operations: '',
          networks: '',
//          status: '',
          deviceName: ''
        },
        count: 0,
        runningStatusVisible: false,
        activeName: '1',
        deviceName: '',
        options1: [{
          value: '',
          label: '全部'
        }, {
          value: 'T',
          label: '电信'
        }, {
          value: 'M',
          label: '移动'
        }, {
          value: 'U',
          label: '联通'
        }],
        options2: [{
          value: '',
          label: '全部'
        }, {
          value: '2G',
          label: '2G'
        }, {
          value: '3G',
          label: '3G'
        }, {
          value: '4G',
          label: '4G'
        }],
        options3: [{
          value: '',
          label: '全部'
        }, {
          value: '选项2',
          label: '在线'
        }, {
          value: '选项3',
          label: '离线'
        }],
        sels: [],
        Id: '',
        deviceId: '',
        retrievalRate: '',
        client: {},
        isShow: true
      }
    },
    methods: {
      closeDialog(msg) {
        this.runningStatusVisible = msg;
      },
      showList(msg) {
        this.isShow = msg;
      },
      rowClick(row, event, column) {
        this.runningStatus(row, '1');
        this.runningStatusVisible = true;
      },
      gotoTerminal(deviceId) {
        this.$parent.$data.active = 2;
        this.$router.replace({path: 'terminalList', query: {deviceId: deviceId}});
      },
      runningStatus(device, type) {
        this.activeName = type;
        this.isShow = true;
        this.deviceName = device.deviceName;
        this.deviceId = device.deviceId;
        this.Id = device.id;
      },
      selsChange(sels) {
        this.sels = sels;
      },
      clickDelete(id) {
        this.$confirm('确定要删除该设备吗？', '提示', {
          type: 'warning'
        }).then(() => {
          this.$post("device/delete/" + id, {}, "删除成功", "删除失败")
            .then(() => {
              this.getData();
            });
        }).catch(() => {
        });
      },
      getData() {
        this.listLoading = true;
        let operations = [], networks = [];
        if (this.query.operations) {
          operations.push(this.query.operations);
        }
        if (this.query.networks) {
          networks.push(this.query.networks);
        }
        let data = {
          page: this.query.page,
          size: this.query.size,
          areaCode: this.query.areaCode,
          operations: operations,
          networks: networks,
//          status: this.query.status,
          deviceName: this.query.deviceName
        };

        this.$post("device/query", data).then((data) => {
          this.deviceList = data.data.list;
          this.count = data.data.count;
          setTimeout(() => {
            this.listLoading = false
          }, 500);
        });
        setTimeout(() => {
          if (this.listLoading) {
            this.listLoading = false;
            this.deviceList = [];
          }
        }, 3000);
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
        this.query = {
          page: 1,
          size: 10,
          areaCode: '',
          operations: '',
          networks: '',
//          status: '',
          deviceName: ''
        };
        this.selectedOptions2 = [];
        this.getData();
      },
      formatterArray(row, column) {
        if (row[column.property].length > 0) {
          return row[column.property].join(",");
        } else {
          return '--';
        }
      },
      formatterOperations(row, column) {
        if (row.operations.length > 0) {
          let str = '';
          for (let item of row.operations) {
            str += item === 'U' ? '联通' : item === 'M' ? '移动' : '电信';
            str += ',';
          }
          return str.substr(0, str.length - 1);
        } else {
          return '--';
        }
      },
      formatterLatLon(row, column) {
        return row.lon + "," + row.lat;
      },
      formatterAddress(row, column) {
        return row[column.property] && row[column.property] !== "null" ? row[column.property] : '--';
      },
      areaChange(value) {
        this.query.areaCode = value[1];
      },
      initMqtt() {
        let _this = this;
        this.client = new Paho.MQTT.Client("117.48.193.122", Number(38083), sessionStorage.getItem("clientId"));//建立客户端实例

        this.client.onConnectionLost = this.onConnectionLost;//注册连接断开处理事件
        this.client.onMessageArrived = this.onMessageArrived;//注册消息接收处理事件

        this.client.connect({
          onSuccess: _this.onConnect,
          userName: "fc69d333449f4c728bd5a4c55e0c618c",
          password: "1ec3a8887f694925916a3cd6b189df59"
        });//连接服务器并注册连接成功处理事件
      },
      onConnect() {
        console.log("onConnected");
      },
      changeSub(msg) {
        console.log('订阅 = ' + this.deviceId);
        this.client.subscribe("fc69d333449f4c728bd5a4c55e0c618c/WEBUI/" + this.deviceId);//订阅主题
      },
      onMessageArrived(message) {
        console.log("收到消息message.payloadString = " + message.payloadString);
        let msg = JSON.parse(message.payloadString).metaInfo;
        let data = JSON.parse(msg.content);
        console.log(data);
        if (this.deviceId) {
          if (this.deviceId === data.deviceId) {
            this.retrievalRate = data.rate;
          }
        }
      },
      onConnectionLost(responseObject) {
        if (responseObject.errorCode !== 0) {
          console.log("连接已断开onConnectionLost:" + responseObject.errorMessage);
          this.initMqtt();
        }
      },
      //用于生成uuid
      S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      },
      guid() {
        return (this.S4() + this.S4() + "-" + this.S4() + "-" + this.S4() + "-" +
          this.S4() + "-" + this.S4() + this.S4() + this.S4());
      }
    },
    mounted() {
      sessionStorage.setItem("active", 1);
      let clientId = this.guid();
      let client_id = sessionStorage.getItem("clientId");
      console.log(client_id);
      if (client_id === null || client_id === undefined || client_id === '') {
        sessionStorage.setItem("clientId", clientId);
      }
      this.getData();
//      this.initMqtt();
    },
    components: {
      baseInfo,
      setParam,
      networkData,
      deviceStatus,
      update,
      logList
    }
  }
</script>

<style>
</style>
