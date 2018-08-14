<template>
  <div>
    <section class="content-header text-left">
      <h1 @click="$router.back();">
        设备
        <small>添加</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="javascript:void(0)"><i class="fa fa-dashboard"></i> Home</a></li>
        <li><a href="javascript:void(0)">设备</a></li>
        <li class="active">添加</li>
      </ol>
    </section>
    <section class="content">
      <el-form ref="form" :model="form" :rules="rules" label-width="150px" style="width: 50%">
        <el-form-item label="设备名称" class="item" prop="deviceName">
          <el-input v-model="form.deviceName" placeholder="请输入设备名称"></el-input>
        </el-form-item>
        <el-form-item label="设备ID" class="item" prop="deviceId">
          <el-input v-model="form.deviceId" placeholder="请输入设备ID"></el-input>
        </el-form-item>
        <el-form-item label="设备型号" class="item" prop="model">
          <el-input v-model="form.model" placeholder="请输入设备型号"></el-input>
        </el-form-item>
        <el-form-item label="运营商" class="item" prop="operations" required>
          <el-checkbox-group v-model="form.operations" class="text-left">
            <el-checkbox label="T">电信</el-checkbox>
            <el-checkbox label="M">移动</el-checkbox>
            <el-checkbox label="U">联通</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="网络制式" class="item" prop="networks" required>
          <el-checkbox-group v-model="form.networks" class="text-left">
            <el-checkbox label="2G" name="type"></el-checkbox>
            <el-checkbox label="3G" name="type"></el-checkbox>
            <el-checkbox label="4G" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="经纬度" class="item text-left" required>
          <el-col :span="9">
            <el-input v-model="form.lon" placeholder="请输入经度" readonly>
              <template slot="prepend">经度</template>
            </el-input>
          </el-col>
          <el-col :span="9" :offset="1">
            <el-input v-model="form.lat" placeholder="请输入纬度" readonly>
              <template slot="prepend">纬度</template>
            </el-input>
          </el-col>
          <el-col :span="2" :offset="1">
            <el-button type="primary" @click="mapVisible = true">地图选址</el-button>
          </el-col>
        </el-form-item>
        <el-form-item label="所在城市" class="item text-left" prop="areaCode">
          <el-cascader expand-trigger="hover" :options="provinceList" v-model="selectedOptions2"
                       :props="props" @change="areaChange">
          </el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" class="item">
          <el-input v-model="form.detailAddress" placeholder="请输入详细地址"></el-input>
        </el-form-item>
        <el-form-item label="备注" class="item" prop="remake">
          <el-input v-model="form.remake" placeholder="请输入200字以内的备注" type="textarea"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
          <el-button @click="$router.back();">取消</el-button>
        </el-form-item>
      </el-form>
    </section>
    <el-dialog title="" :visible.sync="mapVisible">
      <MapView @getLocation="getLocation"></MapView>
      <el-row>
        <el-col :span="8" :offset="8" style="margin-top: 10px">
          <el-button type="primary" @click="setLocation">确定</el-button>
          <el-button @click="mapVisible = false">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>

  import MapView from '../device/map'

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
        mapVisible: false,
        position: {},
        map: {},
        geolocation: {},
        form: {
          deviceName: '',
          deviceId: '',
          model: '',
          operations: [],
          networks: [],
          lon: '',
          lat: '',
          detailAddress: '',
          remake: '',
          areaCode: ''
        },
        operation: [],
        rules: {
          deviceName: [
            {required: true, message: '请输入设备名称', trigger: 'blur'}
          ],
          deviceId: [
            {required: true, message: '请输入设备id', trigger: 'blur'}
          ],
          model: [
            {required: true, message: '请输入设备型号', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      submitForm() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
//            if (this.operation.length === 0) {
//              this.$message.error('请选择运营商');
//              return;
//            }
//            if (this.form.networks.length === 0) {
//              this.$message.error('请选择网络制式');
//              return;
//            }
//            if (this.form.lon.length === 0 || this.form.lat.length === 0) {
//              this.$message.error('请选择经纬度');
//              return;
//            }
//            let arr = [];
//            for (let item of this.operation) {
//              arr.push(item === '电信' ? 'T' : item === '移动' ? 'M' : 'U');
//            }
//            this.form.operations = [];
//            this.form.operations = arr;
            this.$post("device/add", this.form, "创建成功");
            this.$router.back();
          }
        });
      },
      areaChange(value) {
        this.form.areaCode = value[1];
      },
      setLocation() {
        this.form.lon = this.position.getLng();
        this.form.lat = this.position.getLat();
        this.mapVisible = false;
      },
      getLocation(pos) {
        this.position = pos;
      }
    },
    mounted() {
      sessionStorage.setItem("active", 1);
    },
    components: {
      MapView
    }
  }
</script>



