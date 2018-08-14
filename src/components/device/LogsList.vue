<template>
  <section class="content">
    <el-row>
      <el-col :span="4" style="text-align: left;margin: 10px auto">
        <el-button type="text" @click="closeShow">返回</el-button>
      </el-col>
      <el-col :span="8" :offset="12">
        <!--<el-button type="success" @click="">导出日志</el-button>-->
        <!--<el-button type="success" style="margin-left: 10px" @click="">清空日志</el-button>-->
      </el-col>
    </el-row>
    <el-table :data="logList" border v-loading="listLoading" class="center-block">
      <el-table-column align="center" type="index" label="序号"
                       width="65"></el-table-column>
      <el-table-column align="center" prop="deviceId" label="设备ID"
                       min-width="150"></el-table-column>
      <el-table-column align="center" prop="info" label="日志内容"
                       min-width="200"></el-table-column>
      <el-table-column align="center" prop="createTime" label="时间"
                       min-width="200" :formatter="formatTime"></el-table-column>
    </el-table>
    <div class="block" style="margin-top: 20px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="pageChange"
        :current-page="query.page"
        :page-sizes="[10]"
        :page-size="query.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count"></el-pagination>
    </div>
  </section>
</template>

<script>

  export default {
    props: ['deviceId'],
    data() {
      return {
        deviceId1: this.deviceId,
        logList: [],
        query: {
          page: 1,
          size: 10
        },
        count: 0,
        listLoading: false
      }
    },
    watch: {
      retrievalRate: function () {
        this.deviceId1 = this.deviceId;
        this.getLogList();
      }
    },
    created() {
      this.deviceId1 = this.deviceId;
      this.getLogList();
    },
    methods: {
      pageChange(index) {
        this.query.page = index;
        this.getLogList();
      },
      handleSizeChange(val) {
        this.query.size = val;
        this.getLogList();
      },
      getLogList() {
        this.listLoading = true;
        this.$post('cmd/queryDeviceLog/' + this.deviceId1, this.query).then((data) => {
          this.listLoading = false;
          this.count = data.data.count;
          if (data.code === '000000') {
            this.logList = data.data.list;
          }
        })
      },
      formatTime(row, column) {
        return row.createTime ? this.getLocalTime(row.createTime) : '--';
      },
      getLocalTime(nS) {
        return new Date(parseInt(nS)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
      },
      closeShow() {
        this.$emit('showLogList', true);
      }
    },
    mounted() {
      this.getLogList();
    }
  }
</script>
