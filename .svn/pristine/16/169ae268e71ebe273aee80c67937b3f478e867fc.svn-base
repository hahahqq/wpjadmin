<template>
  <div>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
      <el-form-item label="会员">
        <div>{{theData.NAME}}</div>
      </el-form-item>
      <el-form-item label="还款金额" prop="Money">
        <el-input v-model.number="ruleForm.Money"></el-input>
      </el-form-item>
      <el-form-item label="还款方式" prop="PayTypeId">
        <el-select v-model="ruleForm.PayTypeId" placeholder="请选择还款方式" class="full-width">
          <el-option v-for="item in paywayList" :key="item.ID" :label="item.NAME" :value="item.ID"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="门店" prop="ShopId">
        <el-select v-model="ruleForm.ShopId" placeholder="请选择门店" class="full-width">
          <el-option v-for="item in shopList" :key="item.ID" :label="item.NAME" :value="item.ID"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="ruleForm.Remark"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="loading">保 存</el-button>
        <el-button @click="closeModal">取 消</el-button>
      </el-form-item>
    </el-form>
  </div>
    <!-- 会员还款 -->
</template>
<script>
import { mapGetters } from "vuex";
import { getHomeData } from "@/api/index";
export default {
  props: {
    theState: { type: Boolean, default: false },
    theData: { type: Object, default: { ID: "", NAME: "" } }
  },
  data() {
    return {
      ruleForm: {
        ShopId: "",
        VipId: "",
        Money: 0,
        PayTypeId: "",
        Remark: ""
      },
      rules: {
        ShopId: [{ required: true, message: "请选择门店", trigger: "change" }],
        PayTypeId: [
          { required: true, message: "请选择还款方式", trigger: "change" }
        ],
        Money: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error("请填写有效金额"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ]
      },
      loading: false
    };
  },
  computed: {
    ...mapGetters({
      paywayList: "paywayList",
      shopList: "shopList",
      dataState: "repayMemberArrears",
      dataInfo: "memberItemInfo"
    })
  },
  watch: {
    theState(v) {
      if (v) {
        this.ruleForm.Money = 0;
        this.defaultData();
      }
    },
    dataState(data) {
      this.loading = false;
      if (data.success) {
        this.$store.dispatch('clearMember',6)
        this.$emit("resetData");
      }else{
        this.$message.error(data.message);
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
    onSubmit() {
      this.ruleForm.VipId = this.theData.ID;
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.$store.dispatch("repayMemberArrears", this.ruleForm).then(() => {
            this.loading = true;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    defaultData() {
      if (this.paywayList.length == 0) {
        this.$store.dispatch("getPaywayList", {});
      }
      if (this.shopList.length == 0) {
        this.$store.dispatch("getShopList", {});
      }
      this.$refs["ruleForm"].resetFields();
      if (!this.ruleForm.ShopId) {
        this.ruleForm.ShopId = getHomeData().shop.ID;
      }
    }
  },
  mounted() {
    this.defaultData();
  }
};
</script>
