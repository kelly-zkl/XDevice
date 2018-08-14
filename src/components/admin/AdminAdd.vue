<template>
  <div>
    <section class="content-header text-left">
      <h1>
        管理员
        <small>列表</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="javascript:void(0)"><i class="fa fa-dashboard"></i> Home</a></li>
        <li><a href="javascript:void(0)">管理员</a></li>
        <li class="active">列表</li>
      </ol>
    </section>
    <section class="content">
      <el-row style="margin-bottom: 15px">
        <el-col :span="2" :offset="21">
          <el-button type="success" icon="plus" style="width: 130px"
                     @click="addInfo">添加管理员
          </el-button>
        </el-col>
      </el-row>
      <el-table :data="users" border v-loading="listLoading" class="center-block">
        <el-table-column align="center" prop="id" label="ID"
                         min-width="250"></el-table-column>
        <el-table-column align="center" prop="loginId" label="帐号"
                         min-width="250"></el-table-column>
        <el-table-column align="center" prop="name" label="名称"
                         min-width="250"></el-table-column>
        <el-table-column align="center" label="操作" width="250">
          <template scope="scope">
            <!--v-if="scope.row.loginId !== 'superadmin'"-->
            <el-button
              v-if="scope.row.loginId !== 'superadmin'"
              size="small" type="info" style="margin-right: 10px" @click.stop="updateInfo(scope.row)">修改
            </el-button>
            <el-button size="small" @click="deleteUser(scope.row.id)"
                       type="danger" v-if="scope.row.loginId !== 'superadmin'">删除
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
      <el-dialog :title="addUserTitle" :visible.sync="addUserVisible">
        <el-form ref="admin" :model="admin" label-width="80px" :rules="rules"
                 style="width: 60% ;;margin-left: 20%">
          <el-form-item label="帐号" prop="loginId">
            <el-input v-model="admin.loginId" placeholder="请输入帐号"></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="name">
            <el-input v-model="admin.name" placeholder="请输入昵称"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="admin.password" placeholder="请输入6-16位密码"></el-input>
          </el-form-item>
        </el-form>
        <el-row>
          <el-col :span="8" :offset="8">
            <el-button type="primary" @click="onSubmit('admin',addUserTitle)" style="width: 80px;">确认</el-button>
            <el-button @click="cancelSubmit(addUserTitle)" style="width: 80px;margin-left: 20px">取消</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </section>
  </div>
</template>

<script>
  import {JSONParse, mobileValidator, pwdValidator} from '../../api';

  export default {
    data() {
      let nameValidator = (rule, value, callback) => {
        if (!/^[A-Za-z0-9_]{3,16}$/.test(value)) {
          callback(new Error("请输入正确的帐号，由3-16位英文字母、数字、下划线组成"));
        }
        else {
          callback();
        }
      };
      let nickValidator = (rule, value, callback) => {
        if (!/^[A-Za-z0-9\u4e00-\u9fa5]{2,20}$/.test(value)) {
          callback(new Error("请输入正确的昵称，由2-20位汉字、数字、英文字母组成"));
        }
        else {
          callback();
        }
      };
      let pswValidator = (rule, value, callback) => {
        if (!/^[a-zA-Z0-9_]{6,16}$/.test(value)) {
          callback(new Error("请输入正确的密码，由6-16位英文字母、数字、下划线组成"));
        }
        else {
          callback();
        }
      };
      return {
        listLoading: false,
        addUserVisible: false,
        addUserTitle: '添加管理员',
        admin: {
          loginId: '',
          name: '',
          password: ''
        },
        rules: {
          loginId: [
            {required: true, message: '请输入帐号', trigger: 'blur'},
//            {validator: nameValidator, trigger: "change,blur"},
          ],
          name: [
            {required: true, message: '请输入昵称', trigger: 'blur'},
//            {validator: nickValidator, trigger: "change,blur"},
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
//            {validator: pswValidator, trigger: "change,blur"},
          ]
        },
        count: 0,
        query: {
          page: 1,
          size: 10
        },
        users: [],
        loginId: '',
        name: '',
        password: ''
      }
    },
    methods: {
      addInfo() {
        this.admin = {
          loginId: '',
          name: '',
          password: ''
        };
        this.addUserVisible = true;
        this.addUserTitle = '添加管理员';
      },
      updateInfo(row) {
        this.admin = row;
        this.admin.password = '';
        this.loginId = row.loginId;
        this.name = row.name;
        this.password = '';
        this.addUserVisible = true;
        this.addUserTitle = '修改管理员';
      },
      cancelSubmit(title) {
        this.addUserVisible = false;
        if (title === '修改管理员') {
          this.admin.loginId = this.loginId;
          this.admin.name = this.name;
          this.admin.password = '';
        }
      },
      getUserList() {
        this.listLoading = true;
        this.$post("account/query", this.query).then((data) => {
          this.users = data.data.list;
          this.count = data.data.count;
          setTimeout(() => {
            this.listLoading = false
          }, 500);
        })
      },
      pageChange(index) {
        this.query.page = index;
        this.getUserList();
      },
      handleSizeChange(val) {
        this.query.size = val;
        this.getUserList();
      },
      clearData() {
        this.query = {
          page: 1,
          size: 10
        };
        this.getUserList();
      },
      onSubmit(formName, title) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (!this.admin.loginId) {
              this.$message.error('请输入账号');
              return;
            }
            if (!this.admin.name) {
              this.$message.error('请输入昵称');
              return;
            }
            if (!this.admin.password) {
              this.$message.error('请输入密码');
              return;
            }

            let url = '/account/add';
            let msg = '添加成功';
            if (title === '修改管理员') {
              url = '/account/modify';
              msg = '修改成功';
            }
            this.$post(url, this.admin).then((data) => {
              if ("000000" === data.code) {
                this.$message({
                  message: msg,
                  type: 'success'
                });
                this.addUserVisible = false;
                this.getUserList();
              } else {
                this.$message.error(data.msg);
              }
            });
          }
        })
      },
      deleteUser(id) {
        this.$confirm('确定要删除该管理员吗？', '提示', {
          type: 'warning'
        }).then(() => {
          this.$post('/account/delete/' + id, {}).then((data) => {
            if ("000000" === data.code) {
              this.$message({
                message: '删除成功',
                type: 'success'
              });
              this.getUserList();
            } else {
              this.$message.error(data.msg);
            }
          });
        }).catch((err) => {
        });
      }
    },
    mounted() {
      sessionStorage.setItem("active", 4);
      this.getUserList();
    }
  }
</script>
