<template>
  <section class="content" v-loading="listLoading">
    <el-tabs v-model="tanName" type="border-card" @tab-click="handleClick">
      <el-tab-pane v-bind:label="tab.name" v-bind:name="tab.type" v-for="tab in activeName"
                   :key="tab.type">
        <el-row style="margin-top: 50px">
          <el-col :span="3">
            <label style="margin-top: 10px">温度</label>
          </el-col>
          <el-col :span="5">
            <el-input v-model="warning.temperature.low" type="number">
              <template slot="append">°</template>
            </el-input>
          </el-col>
          <el-col :span="1">
            <div class="green_circle"></div>
          </el-col>
          <el-col :span="5" :offset="1">
            <el-input v-model="warning.temperature.mid" type="number">
              <template slot="append">°</template>
            </el-input>
          </el-col>
          <el-col :span="1">
            <div class="yellow_circle"></div>
          </el-col>
          <el-col :span="5" :offset="1">
            <el-input v-model="warning.temperature.high" type="number">
              <template slot="append">°</template>
            </el-input>
          </el-col>
          <el-col :span="1">
            <div class="red_circle"></div>
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col :span="3">
            <label style="margin-top: 10px">CPU占用率</label>
          </el-col>
          <el-col :span="5">
            <el-input v-model="warning.cpu.low" type="number">
              <template slot="append">%</template>
            </el-input>
          </el-col>
          <el-col :span="1">
            <div class="green_circle"></div>
          </el-col>
          <el-col :span="5" :offset="1">
            <el-input v-model="warning.cpu.mid" type="number">
              <template slot="append">%</template>
            </el-input>
          </el-col>
          <el-col :span="1">
            <div class="yellow_circle"></div>
          </el-col>
          <el-col :span="5" :offset="1">
            <el-input v-model="warning.cpu.high" type="number">
              <template slot="append">%</template>
            </el-input>
          </el-col>
          <el-col :span="1">
            <div class="red_circle"></div>
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col :span="3">
            <label style="margin-top: 10px">内存占用率</label>
          </el-col>
          <el-col :span="5">
            <el-input v-model="warning.memory.low" type="number">
              <template slot="append">%</template>
            </el-input>
          </el-col>
          <el-col :span="1">
            <div class="green_circle"></div>
          </el-col>
          <el-col :span="5" :offset="1">
            <el-input v-model="warning.memory.mid" type="number">
              <template slot="append">%</template>
            </el-input>
          </el-col>
          <el-col :span="1">
            <div class="yellow_circle"></div>
          </el-col>
          <el-col :span="5" :offset="1">
            <el-input v-model="warning.memory.high" type="number">
              <template slot="append">%</template>
            </el-input>
          </el-col>
          <el-col :span="1">
            <div class="red_circle"></div>
          </el-col>
        </el-row>
        <!--<el-row style="margin-top: 10px">-->
        <!--<el-col :span="3">-->
        <!--<label style="margin-top: 10px">侦码状态</label>-->
        <!--</el-col>-->
        <!--<el-col :span="5">-->
        <!--<el-input v-model="warning.criminalStatus.low" type="number">-->
        <!--<template slot="prepend">上报，</template>-->
        <!--<template slot="append">/min（单路）</template>-->
        <!--</el-input>-->
        <!--</el-col>-->
        <!--<el-col :span="1">-->
        <!--<div class="green_circle"></div>-->
        <!--</el-col>-->
        <!--<el-col :span="5" :offset="1">-->
        <!--<el-input v-model="warning.criminalStatus.mid" type="number">-->
        <!--<template slot="prepend">上报，</template>-->
        <!--<template slot="append">/min（单路）</template>-->
        <!--</el-input>-->
        <!--</el-col>-->
        <!--<el-col :span="1">-->
        <!--<div class="yellow_circle"></div>-->
        <!--</el-col>-->
        <!--<el-col :span="5" :offset="1">-->
        <!--<el-input v-model="warning.criminalStatus.high" type="number">-->
        <!--<template slot="prepend">上报，</template>-->
        <!--<template slot="append">/min（单路）</template>-->
        <!--</el-input>-->
        <!--</el-col>-->
        <!--<el-col :span="1">-->
        <!--<div class="red_circle"></div>-->
        <!--</el-col>-->
        <!--</el-row>-->
        <el-row style="margin-top: 10px">
          <el-col :span="3">
            <label style="margin-top: 10px">抓取记录</label>
          </el-col>
          <el-col :span="5">
            <el-input v-model="warning.catchNum.low" type="number">
              <template slot="append">条</template>
            </el-input>
          </el-col>
          <el-col :span="1">
            <div class="green_circle"></div>
          </el-col>
          <el-col :span="5" :offset="1">
            <el-input v-model="warning.catchNum.mid" type="number">
              <template slot="append">条</template>
            </el-input>
          </el-col>
          <el-col :span="1">
            <div class="yellow_circle"></div>
          </el-col>
          <!--<el-col :span="5" :offset="1">-->
          <!--<el-input v-model="warning.catchNum.high" type="number">-->
          <!--<template slot="append">条</template>-->
          <!--</el-input>-->
          <!--</el-col>-->
          <!--<el-col :span="1">-->
          <!--<div class="red_circle"></div>-->
          <!--</el-col>-->
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col :span="3">
            <label style="margin-top: 10px">持续工作时间</label>
          </el-col>
          <el-col :span="5">
            <el-input v-model="warning.durationWork.low" type="number">
              <template slot="append">秒</template>
            </el-input>
          </el-col>
          <el-col :span="1">
            <div class="green_circle"></div>
          </el-col>
          <el-col :span="5" :offset="1">
            <el-input v-model="warning.durationWork.mid" type="number">
              <template slot="append">秒</template>
            </el-input>
          </el-col>
          <el-col :span="1">
            <div class="yellow_circle"></div>
          </el-col>
          <!--<el-col :span="5" :offset="1">-->
          <!--<el-input v-model="warning.durationWork.high" type="number">-->
          <!--<template slot="append">秒</template>-->
          <!--</el-input>-->
          <!--</el-col>-->
          <!--<el-col :span="1">-->
          <!--<div class="red_circle"></div>-->
          <!--</el-col>-->
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col :span="3">
            <label style="margin-top: 10px">输出功率</label>
          </el-col>
          <el-col :span="5">
            <el-input v-model="warning.power.low" type="number">
              <template slot="append">mW</template>
            </el-input>
          </el-col>
          <el-col :span="1">
            <div class="green_circle"></div>
          </el-col>
          <el-col :span="5" :offset="1">
            <el-input v-model="warning.power.mid" type="number">
              <template slot="append">mW</template>
            </el-input>
          </el-col>
          <el-col :span="1">
            <div class="yellow_circle"></div>
          </el-col>
          <el-col :span="5" :offset="1">
            <el-input v-model="warning.power.high" type="number">
              <template slot="append">mW</template>
            </el-input>
          </el-col>
          <el-col :span="1">
            <div class="red_circle"></div>
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col :span="3">
            <label style="margin-top: 10px">驻波比</label>
          </el-col>
          <el-col :span="5">
            <el-input v-model="warning.stationedInBobbi.low" type="number"></el-input>
          </el-col>
          <el-col :span="1">
            <div class="green_circle"></div>
          </el-col>
          <el-col :span="5" :offset="1">
            <el-input v-model="warning.stationedInBobbi.mid" type="number"></el-input>
          </el-col>
          <el-col :span="1">
            <div class="yellow_circle"></div>
          </el-col>
          <el-col :span="5" :offset="1">
            <el-input v-model="warning.stationedInBobbi.high" type="number"></el-input>
          </el-col>
          <el-col :span="1">
            <div class="red_circle"></div>
          </el-col>
        </el-row>
        <el-row style="margin-top: 220px">
          <el-col :span="4" :offset="10">
            <el-button type="primary" @click="updateStatus">保存</el-button>
            <el-button @click="$router.back()" style="margin-left: 15px">取消</el-button>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </section>
</template>
<script>
  export default {
    data() {
      return {
        warning: {
          temperature: {low: '', mid: '', high: ''},
          cpu: {low: '', mid: '', high: ''},
          memory: {low: '', mid: '', high: ''},
//          criminalStatus: {low: '', mid: '', high: ''},
          catchNum: {low: '', mid: ''},
          durationWork: {low: '', mid: ''},
          power: {low: '', mid: '', high: ''},
          stationedInBobbi: {low: '', mid: '', high: ''}
        },
        connector: 'alarm/update',
        listLoading: false,
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
        tanName: 'T'
      }
    },
    methods: {
      handleClick(tab, event) {
        this.tanName = tab.name;
        this.queryStatus();
      },
      queryStatus() {//查询
        this.$post("alarm/query", {operationType: this.tanName}).then((data) => {
          if (data.data.length > 0) {
            this.connector = 'alarm/update';
            this.warning = data.data[0];
            this.warning.cpu.low = parseInt(parseFloat(this.warning.cpu.low) * 100);
            this.warning.cpu.mid = parseInt(parseFloat(this.warning.cpu.mid) * 100);
            this.warning.cpu.high = parseInt(parseFloat(this.warning.cpu.high) * 100);
            this.warning.memory.low = parseInt(parseFloat(this.warning.memory.low) * 100);
            this.warning.memory.mid = parseInt(parseFloat(this.warning.memory.mid) * 100);
            this.warning.memory.high = parseInt(parseFloat(this.warning.memory.high) * 100);
          } else {
            this.connector = 'alarm/add';
            this.warning = {
              temperature: {low: '', mid: '', high: ''},
              cpu: {low: '', mid: '', high: ''},
              memory: {low: '', mid: '', high: ''},
//              criminalStatus: {low: '', mid: '', high: ''},
              catchNum: {low: '', mid: ''},
              durationWork: {low: '', mid: ''},
              power: {low: '', mid: '', high: ''},
              stationedInBobbi: {low: '', mid: '', high: ''}
            };
          }
        })
      },
      updateStatus() {//增加==》修改
        if (!(this.warning.temperature.high > this.warning.temperature.mid
            && this.warning.temperature.mid > this.warning.temperature.low)) {
          this.$message.error('温度应为 高 > 中 > 低');
          return;
        }
        if (!(this.warning.cpu.high > this.warning.cpu.mid && this.warning.cpu.mid
            > this.warning.cpu.low)) {
          this.$message.error('cpu占用率应为 高 > 中 > 低');
          return;
        }
        if (!(this.warning.memory.high > this.warning.memory.mid && this.warning.memory.mid
            > this.warning.memory.low)) {
          this.$message.error('内存占用率应为 高 > 中 > 低');
          return;
        }
//        if (!(this.warning.criminalStatus.high > this.warning.criminalStatus.mid
//            && this.warning.criminalStatus.mid > this.warning.criminalStatus.low)) {
//          this.$message.error('侦码状态应为 高 > 中 > 低');
//          return;
//        }
        if (!(this.warning.catchNum.mid > this.warning.catchNum.low)) {
          this.$message.error('抓取记录应为 中 > 低');
          return;
        }
        if (!(this.warning.durationWork.mid > this.warning.durationWork.low)) {
          this.$message.error('持续工作时间应为 中 > 低');
          return;
        }
        if (!(this.warning.power.high > this.warning.power.mid && this.warning.power.mid
            > this.warning.power.low)) {
          this.$message.error('输出功率应为 高 > 中 > 低');
          return;
        }
        if (!(this.warning.stationedInBobbi.high > this.warning.stationedInBobbi.mid
            && this.warning.stationedInBobbi.mid > this.warning.stationedInBobbi.low)) {
          this.$message.error('驻波比应为 高 > 中 > 低');
          return;
        }
        this.listLoading = true;
        this.warning.cpu.low = parseFloat(this.warning.cpu.low) / 100;
        this.warning.cpu.mid = parseFloat(this.warning.cpu.mid) / 100;
        this.warning.cpu.high = parseFloat(this.warning.cpu.high) / 100;
        this.warning.memory.low = parseFloat(this.warning.memory.low) / 100;
        this.warning.memory.mid = parseFloat(this.warning.memory.mid) / 100;
        this.warning.memory.high = parseFloat(this.warning.memory.high) / 100;
        this.warning.operationType = this.tanName;
        this.$post(this.connector, this.warning).then((data) => {
          this.queryStatus();
          let str = '';
          if (this.connector === 'alarm/add') {
            str = '创建成功';
          } else {
            str = '修改成功';
          }
          setTimeout(() => {
            this.listLoading = false;
            this.$message({
              message: str,
              type: 'success'
            });
          }, 500);
        })
      }
    },
    mounted() {
      sessionStorage.setItem("active", 3);
      this.queryStatus();
    }
  }
</script>
<style>
  .green_circle {
    background-color: #4CD963;
    border-radius: 50%;
    width: 33px;
    height: 33px;
    margin-left: 10px;
  }

  .yellow_circle {
    background-color: #FFC906;
    border-radius: 50%;
    width: 33px;
    height: 33px;
    margin-left: 10px;
  }

  .red_circle {
    background-color: #FF0000;
    border-radius: 50%;
    width: 33px;
    height: 33px;
    margin-left: 10px;
  }
</style>
