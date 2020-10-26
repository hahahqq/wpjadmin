<template>
  <el-container>
    <el-header style="height: 50px">
      <headerPage></headerPage>
    </el-header>
    <el-container>
      <el-aside width="100px">
        <section style="min-width: 100px">
          <memberMenu :activePath="activePath" :routesList="routesList" :width="100"></memberMenu>
        </section>
      </el-aside>
      <el-container>
        <div class="content-new-fex" id="printTest">
          <div class="content-eighty">
            <div class="content-center">
              <el-button size="small" @click="showAddPayWay = true" icon="el-icon-plus">
                新增
              </el-button>
              <el-button size="small" @click="showForm = true" icon="el-icon-plus">
                账户互转
              </el-button>
              <el-button size="small" @click="showForm2 = true" icon="el-icon-plus">
                账户流水
              </el-button>
            </div>
          </div>

          <div class="content-table4">
            <div class="content-table-center">
              <!--列表-->
              <el-table
                border
                size="small"
                :data="dataList"
                v-loading="loading"
                :height="tableHeight"
                header-row-class-name="bg-f1f2f3"
              >
                <el-table-column
                  prop="PAYTYPENAME"
                  label="名称"
                  width="120"
                  sortable
                ></el-table-column>
                <el-table-column prop="FIRSTMONEY" label="期初金额"></el-table-column>
                <el-table-column prop="CURMONEY" label="余额"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="small"
                      type="text"
                      @click="handleEdit(scope.row)"
                      icon="el-icon-edit"
                    >
                      编辑
                    </el-button>
                    <el-button
                      size="small"
                      type="text"
                      @click="handleDel(scope.row, scope.$index)"
                      icon="el-icon-delete"
                    >
                      删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>

        <!-- form1 -->
        <el-dialog
          width="500px"
          title="帐户互转"
          :visible.sync="showForm"
          append-to-body
          style="max-width: 100%"
        >
          <div>
            <el-form ref="ruleForm1" :model="ruleForm1" :rules="rules1" label-width="80px">
              <el-form-item label="转出帐户" prop="OutPaytypeId">
                <el-select
                  v-model="ruleForm1.OutPaytypeId"
                  placeholder="请选择转出帐户"
                  class="full-width"
                >
                  <el-option
                    v-for="(item, i) in dataList"
                    :key="i"
                    :label="item.PAYTYPENAME"
                    :value="item.PAYTYPEID"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="转入帐户" prop="InPaytypeId">
                <el-select
                  v-model="ruleForm1.InPaytypeId"
                  placeholder="请选择转入帐户"
                  class="full-width"
                >
                  <el-option
                    v-for="(item, i) in dataList"
                    :key="i"
                    :label="item.PAYTYPENAME"
                    :value="item.PAYTYPEID"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="转出金额">
                <el-input v-model.number="ruleForm1.Money" type="number"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input type="textarea" v-model="ruleForm1.Remark"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="transferfun" :loading="formLoading">
                  保 存
                </el-button>
                <el-button @click="resetForm('ruleForm1')">取 消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-dialog>

        <!-- flow -->
        <el-dialog
          width="70%"
          title="账户流水"
          :visible.sync="showForm2"
          append-to-body
          style="max-width: 100%"
        >
          <flowPage v-if="showForm2"></flowPage>
        </el-dialog>

        <el-dialog
          title="新增支付账户"
          width="400px"
          style="max-width: 100%"
          :visible.sync="showAddPayWay"
          append-to-body
        >
          <el-form ref="addRuleForm" :model="addRuleForm" :rules="addRules" label-width="80px">
            <el-form-item label="支付名称" prop="Name">
              <el-input v-model="addRuleForm.Name" placeholder="请输入支付账户名称"></el-input>
            </el-form-item>
            <el-form-item label="备 注">
              <el-input
                v-model="addRuleForm.Remark"
                maxlength="20"
                placeholder="不超过20字"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitPayWay()">确认</el-button>
              <el-button
                type="info"
                @click="
                  showAddPayWay = false;
                  addRuleForm.Name = '';
                  addRuleForm.Remark = '';
                "
              >
                取消
              </el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import MIXINS_DEFRAY from "@/mixins/defray.js";
export default {
  mixins: [MIXINS_DEFRAY.DEFRAY_MENU],
  data() {
    var checkTitme = (rule, value, callback) => {
      if (
        (this.ruleForm1.OutPaytypeId || this.ruleForm1.InPaytypeId) &&
        this.ruleForm1.OutPaytypeId == this.ruleForm1.InPaytypeId
      ) {
        return callback(new Error("转出转入帐户不能相同"));
      } else {
        return callback();
      }
    };
    return {
      loading: false,
      ruleForm1: {
        OutPaytypeId: "",
        InPaytypeId: "",
        Money: 0,
        Remark: ""
      },
      addRuleForm: {
        Name: "",
        Remark: ""
      },
      addRules: {
        Name: [{ required: true, message: "请输入名称", trigger: "blur" }]
      },
      rules1: {
        OutPaytypeId: [
          {
            required: true,
            message: "请选择转出帐户",
            validator: checkTitme,
            trigger: "change"
          }
        ],
        InPaytypeId: [
          {
            required: true,
            message: "请选择转入帐户",
            validator: checkTitme,
            trigger: "change"
          }
        ]
      },
      dealType: "add",
      showForm: false,
      formLoading: false,
      showForm2: false,
      showAddPayWay: false,
      curDelIndex: 0,
      tableHeight: document.body.clientHeight - 190
    };
  },
  computed: {
    ...mapGetters({
      dataList: "accountList",
      dataListState: "accountListState",
      dataState: "accountState",
      dealState: "dealAccountState",
      addPayWayInfoState: "addPayWayInfoState",
      delPayWayInfoState: "delPayWayInfoState"
    })
  },
  watch: {
    addPayWayInfoState(data) {
      this.$message({
        type: data.success ? "success" : "error",
        message: data.message
      });
      if (data.success) {
        this.getNewData();
        this.$refs["addRuleForm"].resetFields();
      }
    },
    delPayWayInfoState(data) {
      this.$message({
        type: data.success ? "success" : "error",
        message: data.message
      });
      if (data.success) {
        this.dataList.splice(this.curDelIndex, 1);
      }
    },
    dataListState(data) {
      this.loading = false;
    },
    dealState(data) {
      if (data.success) {
        this.getNewData();
        this.formLoading = false;
        this.showForm = false;
        this.$refs["ruleForm1"].resetFields();
        this.ruleForm1.Money = 0;
      }
      this.$message({
        message: data.message,
        type: data.success ? "success" : "error"
      });
    }
  },
  methods: {
    handleDel(item, idx) {
      this.$confirm("确认删除 【" + item.PAYTYPENAME + "】?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch("delPayWayState", { ID: item.PAYTYPEID }).then(() => {
            this.curDelIndex = idx;
          });
        })
        .catch(() => {});
    },
    resetForm(formName) {
      this.showForm = false;
      this.$refs[formName].resetFields();
    },
    getNewData() {
      this.$store.dispatch("getAccountList", {}).then(() => {
        this.loading = true;
      });
    },
    handleEdit(item) {
      if (this.$refs.form) this.$refs.form.resetFields();
      if (Object.keys(item).length > 0) {
        this.dealType = "edit";
        this.$prompt("", "请输入期初金额", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputPattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
          inputPlaceholder: "请输入最多两位小数点的数值",
          inputType: "number",
          inputErrorMessage: "金额格式不正确"
        })
          .then(({ value }) => {
            this.$message({ type: "success", message: "你的金额是: " + value });
            this.$store
              .dispatch("setFirstAccountMoney", { id: item.PAYTYPEID, money: value })
              .then(() => {
                this.loading = true;
              });
          })
          .catch(() => {});
      } else {
        this.dealType = "add";
      }
    },
    transferfun() {
      this.$refs.ruleForm1.validate((valid) => {
        if (valid) {
          this.$store.dispatch("inoutAccountPay", this.ruleForm1).then(() => {
            this.formLoading = true;
          });
        }
      });
    },
    flowfun() {},
    submitPayWay() {
      this.$refs.addRuleForm.validate((valid) => {
        if (valid) {
          this.$store
            .dispatch("addPayWayState", {
              Name: this.addRuleForm.Name,
              Remark: this.addRuleForm.Remark
            })
            .then(() => {
              this.showAddPayWay = false;
            });
        }
      });
    }
  },
  mounted() {
    this.getNewData();
  },
  components: {
    flowPage: () => import("./flowDetails.vue"),
    headerPage: () => import("@/components/header")
  }
};
</script>


<style scoped>
.member-header {
  display: flex;
  align-items: center;
  height: 50px;
}
.center-title {
  width: 100px;
  text-align: center;
  height: 50px;
  line-height: 50px;
  border: solid 1px #edeeee;
}
.center-cont {
  width: 100px;
  text-align: center;
  height: 50px;
  line-height: 50px;
}
.el-header {
  padding: 0 !important;
}
.shop {
  display: flex;
  align-items: center;
  height: 50px;
  position: relative;
}
.shop .name {
  position: absolute;
  right: 50px;
  height: 50px;
  line-height: 50px;
  width: 150px;
  text-align: center;
  top: 0;
  /* background: rebeccapurple; */
}
.el-header,
.el-footer {
  background-color: #fff;
  color: #333;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #f4f5fa;
  color: #333;
}
.member-main-top {
  width: 99%;
  margin-left: 0.5%;
  margin-right: 0.5%;
  height: 150px;
  background: #fff;
}
.member-main-table {
  margin-top: 8px;
  width: 99%;
  margin-left: 0.5%;
  margin-right: 0.5%;
  height: 600px;
  background: #fff;
}
.member-main-top-buttom {
  height: 70px;
  width: 100%;
  line-height: 70px;
}
.member-main-top-type {
  height: 70px;
  width: 100%;
  line-height: 70px;
}
.defray-index-top {
  width: 98%;
  margin-left: 1%;
  margin-right: 1%;
  background: #fff;
  height: 80px;
  line-height: 80px;
  margin-top: 5px;
  margin-bottom: 15px;
}
.defray-index-top-cont {
  width: 96%;
  margin-left: 2%;
  margin-right: 2%;
}
.defray-table {
  width: 98%;
  margin-left: 1%;
  margin-right: 1%;
  background: #fff;
}
</style>

