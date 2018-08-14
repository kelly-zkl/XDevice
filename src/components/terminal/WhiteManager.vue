<template>
  <section class="content">
    <el-row style="margin-top: 30px">
      <el-col :span="4">
        <el-input placeholder="终端imsi" v-model="query.imsi"></el-input>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" icon="search" style="width: 80px;"
                   @click="getData">搜索
        </el-button>
        <el-button style="width: 80px;margin-left: 20px" @click="clearData">清除
        </el-button>
      </el-col>
      <el-col :span="2" :offset="10">
        <el-button type="success" icon="plus" style="width: 130px"
                   @click="runningStatusVisible = true">添加白名单
        </el-button>
      </el-col>
    </el-row>
    <el-table :data="deviceList" border v-loading="listLoading" class="center-block" style="margin-top: 20px">
      <el-table-column align="center" type="index" label="序号"
                       width="80"></el-table-column>
      <el-table-column align="center" prop="imsi" label="终端imsi"
                       min-width="200"></el-table-column>
      <el-table-column align="center" label="创建时间"
                       min-width="200" :formatter="formatTime"></el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template scope="scope">
          <el-button @click.stop="deleteData(deviceList[scope.$index].imsi)"
                     type="danger" style="margin: 5px 0" size="small">删除
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

    <el-dialog title="添加白名单" :visible.sync="runningStatusVisible">
      <el-form :model="device" label-width="100px" :rules="rules">
        <el-form-item label="白名单" prop="imsi" required>
          <el-input v-model="device.imsi" placeholder="请输入白名单"></el-input>
        </el-form-item>
      </el-form>
      <el-row>
        <el-col :span="8" :offset="8">
          <el-button type="primary" @click="addImsi" style="width: 80px;margin-right: 20px">确认</el-button>
          <el-button @click="runningStatusVisible = false;device.imsi=''" style="width: 80px;">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </section>
</template>
<script>
  export default {
    data() {
      let imsiValidator = (rule, value, callback) => {
        if (!/^[A-Za-z0-9_]{3,16}$/.test(value)) {
          callback(new Error("请输入正确的白名单，由3-16位英文字母、数字、下划线组成"));
        }
        else {
          callback();
        }
      };
      return {
        listLoading: false,
        deviceList: [],
        count: 0,
        query: {
          page: 1,
          size: 10,
          imsi: ''
        },
        runningStatusVisible: false,
        device: {
          imsi: ''
        },
        rules: {
          imsi: [
            {required: true, message: '请输入白名单', trigger: 'blur'},
//            {validator: imsiValidator, trigger: "change,blur"}
          ]
        }
      }
    },
    methods: {
      clearData() {
        this.query = {
          page: 1,
          size: 10,
          imsi: ''
        };
        this.getData();
      },
      pageChange(index) {
        this.query.page = index;
      },
      handleSizeChange(val) {
        this.query.size = val;
      },
      formatTime(row, column) {
        return row.createTime ? this.getLocalTime(row.createTime) : '--';
      },
      getLocalTime(nS) {
        return new Date(parseInt(nS)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
      },
      addImsi() {
        if (!this.device.imsi) {
          this.$message.error('请输入白名单');
          return;
        }
        this.$post("bwTerminate/addWhite", this.device, "添加成功", "添加失败")
          .then(() => {
            this.getData();
            this.runningStatusVisible = false;
          });
      },
      deleteData(imsi) {
        this.$confirm('确定要删除该白名单吗？', '提示', {
          type: 'warning'
        }).then(() => {
          this.$post("bwTerminate/deleteWhite", {"imsi": imsi}, "删除成功", "删除失败")
            .then(() => {
              this.getData();
            });
        }).catch(() => {
        });
      },
      getData() {
        this.listLoading = true;
        this.$post("bwTerminate/queryWhite", this.query).then((data) => {
          this.count = data.data.count;
          this.deviceList = data.data.list;
          setTimeout(() => {
            this.listLoading = false
          }, 500);
        })
      }
    },
    mounted() {
      sessionStorage.setItem("active", 2);
      this.getData();
    }
  }
</script>
