<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px">
      <el-form-item label="支出项目" prop="ItemId">
        <el-select v-model="ruleForm.ItemId" size='small' clearable placeholder="请选择支出项目" style="width:220px;">
          <el-option v-for="item in paymentList" :key="item.ID" :label="item.NAME" :value="item.ID">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="支出金额">
        <el-input v-model.number="ruleForm.Money" size='small' placeholder="请输入支出金额" type="number" min=0  style="width:220px;"></el-input>
      </el-form-item>
      <el-form-item label="付款方式" prop="PayTypeId">
        <el-select v-model="ruleForm.PayTypeId" clearable size='small' placeholder="请选择付款方式" style="width:220px" >
          <el-option v-for="item in paywayList" :key="item.ID" :label="item.NAME" :value="item.ID">  
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="店铺" prop="ShopId">  
        <el-select v-model="ruleForm.ShopId" size='small' clearable placeholder="请选择店铺" style="width:220px;">
          <el-option v-for="item in shopList" :key="item.ID" :label="item.NAME" :value="item.ID">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="支出日期" >
        <el-date-picker v-model="ruleForm.BillDate" size='small' type="date" value-format="timestamp" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="经手人" prop="EmpId">
        <el-select v-model="ruleForm.EmpId" size='small' clearable placeholder="请选择经手人" style="width:220px;">
          <el-option v-for="(item,ii) in employeeList" :key="ii" :label="item.NAME" :value="item.ID"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="备注">
        <el-input type="textarea" size='small' :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="ruleForm.Remark">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit"  :loading="loading">保 存</el-button>
        <el-button @click="closeModal">取 消</el-button>
      </el-form-item>
    </el-form>
    <!-- sel -->
    <el-dialog width="700px" title="选择会员" :visible.sync="isShowFirstPopup" append-to-body style="max-width:100%;">
      <components :is="componentName" @closeModal="isShowFirstPopup=false"></components>
    </el-dialog>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import MIXINS from "@/mixins/index";
import { getHomeData } from "@/api/index";
export default {
  props: {
    dealType: {
      type: Object,
      default: function() {
        return {
          type: "add",
          state: false
        };
      }
    }
  },
  mixins: [MIXINS.IS_SHOW_POPUP],
  data() {
    return {
      ruleForm: {
        ShopId: getHomeData().shop.SHOPID,
        BillDate: "",
        ItemId: "",
        Money: 0,
        PayTypeId: "",
        EmpId: "",
        Remark: ""
      },
      rules: {
        ShopId: [
          {
            required: true,
            message: "请选择店铺",
            trigger: "change"
          }
        ],
        ItemId: [
          {
            required: true,
            message: "请选择支出项目",
            trigger: "change"
          }
        ],
        PayTypeId: [
          {
            required: true,
            message: "请选择支付方式",
            trigger: "change"
          }
        ],
        EmpId: [
          {
            required: true,
            message: "请选择经手人",
            trigger: "change"
          }
        ]
      },
      loading: false,
      componentName: "",
      paywayList:[]
    };
  },
  computed: {
    ...mapGetters({
      dataItem: "defrayItem",
      dataState: "defrayState",
      shopList: "shopList",
      paymentList: "paymentList",
      employeeList: "employeeList",
      paywayListState:'paywayListState'
    })
  },
  watch: {
    dealType(data) {
      this.defaultData();
    },
    paywayListState(data){
      for(var i in data.data.List){
        if(data.data.List[i].NAME == '余额支付'){
          data.data.List.splice(i, 1)
        }
      }
      this.paywayList = data.data.List
    },
    dataState(data) {
      this.loading = false;
      this.$message({
        message: data.message,
        type: data.success ? "success" : "error"
      });
      if (data.success) {
        this.closeModal("resetList");
      }
    }
  },
  methods: {
    closeModal(type) {
      if (this.$refs.ruleForm) this.$refs.ruleForm.resetFields();
      if (type == "resetList") {
        this.$emit("resetList")
      } else {
        this.$emit("closeModal")
      }
    },
    handleSubmit() {
      let sendData = Object.assign({}, this.ruleForm);

      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$store
            .dispatch("dealDefrayItem", {
              type: this.dealType.type,
              data: sendData
            })
            .then(() => {
              this.loading = true;
            });
        }
      });
    },
    showComponent(name) {
      this.componentName = name;
      setTimeout(() => {
        this.isShowFirstPopup = true;
      }, 300);
    },
    defaultData() {
      this.ruleForm.BillDate = new Date().getTime();
      if (this.$refs.ruleForm) this.$refs.ruleForm.resetFields();

      if (this.paymentList.length == 0) {
        this.$store.dispatch("getPaymentList");
      }
      if (this.shopList.length == 0) {
        this.$store.dispatch("getShopList");
      }
      if (this.paywayList.length == 0) {
        this.$store.dispatch("getPaywayList");
      }
      if (this.employeeList.length == 0) {
        this.$store.dispatch("getEmployeeList",{});
      }
    }
  },
  mounted() {
    this.defaultData();
  },
  components: {
    selMember: () => import("@/components/selected/selmember"),
    selGoods: () => import("@/components/selected/selgoods")
  }
};
</script>
