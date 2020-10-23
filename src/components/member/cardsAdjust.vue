<template>
  <div>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
      <el-form-item label="会员">
        <div>{{theData.NAME}}</div>
      </el-form-item>
      <el-form-item label="商品" prop="GoodsId">
        <el-autocomplete
          class="full-width"
          v-model="goodsdata"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          :trigger-on-focus="true"
          clearable
          @select="handleSelect"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="调整次数" prop="Qty">
        <el-input placeholder="请输入调整次数" v-model.number="ruleForm.Qty" :min="0">
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
      <el-form-item label="限制时间" prop="EndDate">
        <el-switch v-model="ruleForm.IsInvalid" active-text="限制" inactive-text="不限"></el-switch>
        <el-date-picker
          v-if="ruleForm.IsInvalid"
          v-model="ruleForm.EndDate"
          type="date"
          value-format="timestamp"
          placeholder="选择有效时间"
          class="pull-right"
        ></el-date-picker>
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
  <!-- 计次卡调整 -->
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
        Remark: "",
        IsSms: false,
        GoodsId: "",
        Qty: 0,
        EndDate: "",
        IsInvalid: true // false=不限，true=限制
      },
      rules: {
        ShopId: [{ required: true, message: "请选择门店", trigger: "change" }],
        GoodsId: [{ required: true, message: "请选择商品", trigger: "change" }],
        Qty: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error("请选择限制时间"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        EndDate: [
          {
            required: false,
            validator: (rule, value, callback) => {
              if (!value && this.ruleForm.IsInvalid) {
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
      numberState: 0,
      goodsdata: "",
      timeDown: {
        seconds: 0,
        isClick: false
      }
    };
  },
  computed: {
    ...mapGetters({
      shopList: "shopList",
      dataInfo: "memberItemInfo",
      dataState: "memberCAdjustState",
      goodsList: "goodsList",
      goodsListState: "goodsListState",
      dataProfile: "memberItemProfile",
    })
  },
  watch: {
    theState(v) {
      if (v) {
        this.ruleForm = {
          ShopId: "",
          VipId: "",
          Remark: "",
          IsSms: false,
          GoodsId: "",
          Qty: 0,
          EndDate: "",
          IsInvalid: true // false=不限，true=限制
        };
        this.goodsdata = "";
        this.defaultData();
      }
    },
    dataState(data) {
      this.loading = false;
      if (data.success) {
        this.$emit("resetData");
      } else {
        this.$message.error(data.message);
      }
    },
    goodsListState(data) {
      this.timeDown = {
        seconds: 0,
        isClick: false
      };
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
            Qty:
              this.numberState == 1
                ? parseFloat(-this.ruleForm.Qty)
                : parseFloat(this.ruleForm.Qty)
          });
          console.log(data);
          this.$store.dispatch("memberCardsAdjust", data).then(() => {
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
    },
    querySearch(queryString, cb) {
        var restaurants = this.dataProfile.objCount?[...this.dataProfile.objCount]:[];
        for(let i=0;i<restaurants.length;i++){
          restaurants[i].value = restaurants[i].GOODSNAME;
          restaurants[i].id = restaurants[i].GOODSID;
        }
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
    handleSelect(item) {
      this.ruleForm.GoodsId = item.id;
    }
  },
  mounted() {
    this.defaultData();
  }
};
</script>
