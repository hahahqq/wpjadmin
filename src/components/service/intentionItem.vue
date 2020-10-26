<template>
  <div>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="名称" prop="Name">
            <el-input v-model="ruleForm.Name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="编号" prop="Code">
            <el-input
              v-if="dataType.dealState == 'edit' && ruleForm.Code"
              v-model="ruleForm.Code"
              disabled
            ></el-input>
            <el-input v-else v-model="ruleForm.Code"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="电话号码" prop="PhoneNo">
            <el-input v-model="ruleForm.PhoneNo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="性别">
            <!-- <el-input v-model="ruleForm.Sex"></el-input> -->
            <el-switch
              v-model="sexState"
              active-color="#ff4949"
              inactive-color="#13ce66"
              active-text="女士"
              inactive-text="先生"
            ></el-switch>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="生日">
            <el-date-picker
              v-model="ruleForm.BirthDate"
              type="date"
              value-format="timestamp"
              placeholder="选择日期"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="地址">
            <el-input v-model="ruleForm.Address"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="跟踪顾问">
            <!-- <el-input v-model="ruleForm.SaleEmpId"></el-input> -->
            <el-select v-model="ruleForm.SaleEmpId" placeholder="请选择跟踪顾问" class="full-width">
              <el-option
                v-for="item in employeeList"
                :key="item.ID"
                :label="item.NAME"
                :value="item.ID"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="店铺">
            <!-- <el-input v-model="ruleForm.ShopId"></el-input> -->
            <el-select v-model="ruleForm.ShopId" placeholder="请选择店铺" class="full-width">
              <el-option
                v-for="item in shopList"
                :key="item.ID"
                :label="item.NAME"
                :value="item.ID"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="意向金">
            <el-input v-model="ruleForm.WillMoney"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="标签">
            <el-input v-model="ruleForm.WillLevel"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="有效日期">
            <el-date-picker
              v-model="ruleForm.ValidDate"
              type="date"
              value-format="timestamp"
              placeholder="选择日期"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <el-form-item label="备注">
            <el-input v-model="ruleForm.Remark"></el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" v-if="dataItem.VISITLASTTIME">
          <el-form-item label="最近回访">
            <span>{{ new Date(dataItem.VISITLASTTIME) | time }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" v-if="isChange" @click="onSubmitBefore" :loading="loading">
          保 存
        </el-button>
        <el-button type="primary" v-else @click="onSubmit" :loading="loading">保 存</el-button>
        <el-button @click="closeModal('')">取 消</el-button>

        <el-button
          type="primary"
          v-if="dataType.dealState == 'edit'"
          @click="isShowBecome = true"
          class="pull-right"
        >
          转为正式会员
        </el-button>
      </el-form-item>
    </el-form>
    <!-- 意向客户转正 -->
    <el-dialog title="转为正式会员" :visible.sync="isShowBecome" append-to-body width="400px">
      <div>
        <el-form ref="ruleForm2" :model="ruleForm" :rules="rules2" label-width="80px">
          <el-form-item label="客户名称">
            <span>{{ ruleForm.Name }}</span>
          </el-form-item>
          <el-form-item label="会员编号" prop="VipCode">
            <el-input v-model="ruleForm2.VipCode"></el-input>
          </el-form-item>
          <el-form-item label="会员级别" prop="VipLevelId">
            <el-select v-model="ruleForm2.VipLevelId" placeholder="请选择等级" class="full-width">
              <el-option
                v-for="item in memberLevelList"
                :key="item.ID"
                :label="item.NAME"
                :value="item.ID"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="跟踪顾问" prop="SaleEmpId">
            <el-select
              v-model="ruleForm2.SaleEmpId"
              placeholder="请选择跟踪顾问"
              class="full-width"
            >
              <el-option
                v-for="item in employeeList"
                :key="item.ID"
                :label="item.NAME"
                :value="item.ID"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="店铺" prop="ShopId">
            <el-select v-model="ruleForm2.ShopId" placeholder="请选择店铺" class="full-width">
              <el-option
                v-for="item in shopList"
                :key="item.ID"
                :label="item.NAME"
                :value="item.ID"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit2" :loading="loading2">确 定</el-button>
            <el-button @click="isShowBecome = false">取 消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import img from "@/assets/userdefault.png";
export default {
  props: {
    dataType: {
      type: Object,
      default: function () {
        return { value: 1, dealState: "add" };
      }
    }
  },
  data() {
    return {
      img: img,
      ruleForm: {
        ShopId: "",
        Code: "",
        Name: "",
        PhoneNo: "",
        Sex: "",
        SaleEmpId: "",
        WillMoney: "",
        Remark: "",
        WillLevel: "",
        BirthDate: "",
        ValidDate: "",
        Address: ""
      },
      rules: {
        Name: [{ required: true, message: "请填写名称", trigger: "blur" }],
        Code: [{ required: true, message: "请填写编号", trigger: "blur" }],
        PhoneNo: [{ required: true, message: "请填写手机号码", trigger: "blur" }]
      },
      ruleForm2: {
        ShopId: "",
        ClientId: "",
        VipCode: "",
        VipLevelId: "",
        SaleEmpId: ""
      },
      rules2: {
        ShopId: [{ required: true, message: "请选择店铺", trigger: "change" }],
        VipCode: [{ required: true, message: "请填写会员编号", trigger: "blur" }],
        VipLevelId: [{ required: true, message: "请选择会员级别", trigger: "change" }],
        SaleEmpId: [{ required: true, message: "请选择跟踪顾问", trigger: "change" }]
      },
      sexState: true,
      loading: false,
      loading2: false,
      isShowBecome: false,
      isChange: false
    };
  },
  computed: {
    ...mapGetters({
      dataItem: "sIntentionItem",
      employeeList: "employeeList",
      shopList: "shopList",
      dataDeal: "sIntentionDeal",
      memberLevelList: "memberLevelList",
      dataChange: "sIntentionChange"
    })
  },
  watch: {
    dataType(data) {
      this.defaultData();
    },
    dataDeal(data) {
      if (data.success) {
        this.closeModal("resetData");
      }
      this.loading = false;
      this.$message({
        message: data.message,
        type: data.success ? "success" : "error"
      });
    },
    dataChange(data) {
      this.loading2 = false;
      if (data.success) {
        this.isChange = true;
        this.isShowBecome = false;
      }
    }
  },
  methods: {
    closeModal(type) {
      if (type == "resetData") {
        this.$emit("resetData");
      } else {
        this.$emit("closeModal");
      }
    },
    onSubmitBefore() {
      this.$confirm("该客户已是正式会员, 是否继续保存?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.onSubmit();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消保存"
          });
        });
    },
    onSubmit() {
      let sendData = Object.assign({}, this.ruleForm, {
        Sex: this.sexState ? 1 : 0
      });
      if (this.dataType.dealState == "edit") {
        sendData.Id = this.dataItem.ID;
      }
      this.$refs["ruleForm2"].validate((valid) => {
        if (valid) {
          this.$store.dispatch("dealSIntentionItem", sendData).then(() => {
            this.loading = true;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    onSubmit2() {
      console.log(this.ruleForm2);
      this.$refs["ruleForm2"].validate((valid) => {
        if (valid) {
          this.$store.dispatch("changeSIntentionItem", this.ruleForm2).then(() => {
            this.loading2 = true;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    defaultData() {
      if (this.dataType.dealState == "edit" && !this.ruleForm.Name) {
        for (let key in this.ruleForm) {
          let kk = key.toUpperCase();
          this.ruleForm[key] = this.dataItem[kk];
        }
        this.sexState = this.dataItem.SEX == 1 ? true : false; //0=男，1=女
        if (this.memberLevelList.length == 0) {
          this.$store.dispatch("getMemberLevel");
        }
        this.ruleForm2.ClientId = this.dataItem.ID;
        this.ruleForm2.VipCode = this.ruleForm.PhoneNo;
        this.ruleForm2.SaleEmpId = this.ruleForm.SaleEmpId;
        this.ruleForm2.ShopId = this.ruleForm.ShopId;
      }
      if (this.employeeList.length == 0) this.$store.dispatch("getEmployeeList", {});
      if (this.shopList.length == 0) this.$store.dispatch("getShopList", {});
    }
  },
  mounted() {
    this.defaultData();
  }
};
</script>
