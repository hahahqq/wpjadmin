<template>
  <div>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
      <el-form-item label="会员">
        <div>{{theData.NAME}}</div>
      </el-form-item>
      <el-form-item label="调整积分" prop="Integral">
        <el-input placeholder="请输入调整积分" v-model.number="ruleForm.Integral">
          <el-select v-model="numberState" slot="prepend" placeholder="请选择" style="min-width:80px">
            <el-option label="增加" :value="0"></el-option>
            <el-option label="减少" :value="1"></el-option>
          </el-select>
        </el-input>
      </el-form-item>
      <el-form-item label="门店" prop="ShopId">
        <el-select v-model="ruleForm.ShopId" placeholder="请选择门店" class="full-width">
          <el-option v-for="item in shopList" :key="item.ID" :label="item.NAME" :value="item.ID"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否发短信">
        <el-switch v-model="ruleForm.IsSms"></el-switch>
      </el-form-item>
      <el-form-item label="备注说明">
        <el-input v-model="ruleForm.Remark" placeholder="请输入备注说明"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="loading">保 存</el-button>
        <el-button @click="closeModal">取 消</el-button>
      </el-form-item>
    </el-form>
  </div>
  <!-- 积分调整 -->
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
        Integral: 0,
        Remark: "",
        IsSms: false
      },
      rules: {
        ShopId: [{ required: true, message: "请选择门店", trigger: "change" }],
        Integral: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error("请填写有效数值"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ]
      },
      loading: false,
      numberState: 0
    };
  },
  computed: {
    ...mapGetters({
      shopList: "shopList",
      dataInfo: "memberItemInfo",
      dataState: "memberIAdjustState"
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
        this.$store.dispatch("clearMember", 5);
        this.$store.dispatch('getMemberItem', { ID: this.theData.ID})
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
          let data = Object.assign({}, this.ruleForm, {
            Integral: this.numberState == 1 ? parseFloat(-this.ruleForm.Integral) : parseFloat(this.ruleForm.Integral)
          });
          this.$store.dispatch("memberIntegralAdjust", data).then(() => {
            this.loading = true;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    defaultData() {
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
