<template>
  <div class="setup row-flex flex-start">
    <section style="min-width:130px;margin-left:-10px;">
      <sidebarMenu :activePath="activePath" :routesList="routesList" :width="130"></sidebarMenu>
    </section>
    <section class="bg-white marginLR-sm paddingTB-sm paddingLR-md full-width">
      <ul>
        <li class="paddingTB-sm marginTB-xs border-bottom">
          <div class="font-16">售卡提成设置</div>
          <div v-for="(item,i ) in tableList1" :key="i" class="marginTB-sm">
            <div class="inline-block">等级名称</div>
            <div
              class="inline-block paddingLR-sm paddingTB-xs border rounded-xs"
              style="min-width:100px;"
            >{{item.NAME}}</div>
            <div class="inline-block marginLR-sm">按</div>
            <div
              class="inline-block paddingLR-sm paddingTB-xs border rounded-xs marginLR-xs border-color"
            >
              <span
                v-text="item.EMPMONEYMODE == 1 ? '固定金额' : '售卡金额'"
                class="inline-block"
                style="min-width:40px;"
              ></span>
              <i class="el-icon-caret-right pull-right-"></i>
            </div>
            <div class="inline-block border rounded-xs border-color">
              <span
                class="inline-block paddingTB-xs p-left-sm"
                style="min-width:40px;"
                v-text="item.EMPMONEYMODE == 1?item.EMPMONEY*100:item.EMPMONEY"
              ></span>
              <span
                v-text="item.EMPMONEYMODE == 1 ? '%' : '元'"
                class="inline-block bg-f1f2f3 paddingTB-xs text-center"
                style="min-width:30px;"
              ></span>
            </div>
            <div class="inline-block">进行提成</div>
            <el-button
              size="small"
              type="primary"
              @click="showHandleDeal(item,i )"
              class="m-left-sm"
            >设置</el-button>
          </div>
        </li>
        <li class="paddingTB-sm marginTB-xs border-bottom">
          <div class="font-16">充值提成设置</div>
          <div class="marginTB-sm">
            <div class="inline-block">消费方式</div>
            <div
              class="inline-block paddingLR-sm paddingTB-xs border rounded-xs"
              style="min-width:100px;"
            >充值提成</div>
            <div class="inline-block marginLR-sm">按</div>
            <div
              class="inline-block paddingLR-sm paddingTB-xs border rounded-xs marginLR-xs border-color"
            >
              <span v-text="'充值金额'" class="inline-block" style="min-width:40px;"></span>
              <i class="el-icon-caret-right pull-right-"></i>
            </div>
            <div class="inline-block border rounded-xs border-color">
              <span
                class="inline-block paddingTB-xs p-left-sm"
                style="min-width:40px;"
              >{{parseInt(EmpAddRate*100)}}</span>
              <span
                v-text="'%'"
                class="inline-block bg-f1f2f3 paddingTB-xs text-center"
                style="min-width:30px;"
              ></span>
            </div>
            <div class="inline-block">进行提成</div>
            <el-button
              type="primary"
              size="small"
              @click="handleDeal2(1)"
              class="m-left-sm"
              :loading="loading1"
            >设置</el-button>
          </div>
        </li>
        <li class="paddingTB-sm marginTB-xs border-bottom">
          <div class="font-16">快速消费提成设置</div>
          <div class="marginTB-sm">
            <div class="inline-block">消费方式</div>
            <div
              class="inline-block paddingLR-sm paddingTB-xs border rounded-xs"
              style="min-width:100px;"
            >快速消费</div>
            <div class="inline-block marginLR-sm">按</div>
            <div
              class="inline-block paddingLR-sm paddingTB-xs border rounded-xs marginLR-xs border-color"
            >
              <span v-text="'充值金额'" class="inline-block" style="min-width:40px;"></span>
              <i class="el-icon-caret-right pull-right-"></i>
            </div>
            <div class="inline-block border rounded-xs border-color">
              <span
                class="inline-block paddingTB-xs p-left-sm"
                style="min-width:40px;"
              >{{parseInt(EmpSaleRate*100)}}</span>
              <span
                v-text="'%'"
                class="inline-block bg-f1f2f3 paddingTB-xs text-center"
                style="min-width:30px;"
              ></span>
            </div>
            <div class="inline-block">进行提成</div>
            <el-button
              type="primary"
              size="small"
              @click="handleDeal2(2)"
              class="m-left-sm"
              :loading="loading2"
            >设置</el-button>
          </div>
        </li>
        <li class="paddingTB-sm marginTB-xs border-bottom">
          <div class="font-16">商品消费提成设置</div>
          <div class="marginTB-sm">
            <el-button type="primary" size="small" @click="pageMode=0;isShowGoods=true">设置</el-button>
          </div>
        </li>
        <li class="paddingTB-sm marginTB-xs">
          <div class="font-16">服务消费提成设置</div>
          <div class="marginTB-sm">
            <el-button type="primary" size="small" @click="pageMode=1;isShowGoods=true">设置</el-button>
          </div>
        </li>
      </ul>
    </section>
    <el-dialog title="商品单位" :visible.sync="isShowDeal" width="400px">
      <el-form ref="theform1" :model="form1" :rules="rules" label-width="80px">
        <el-form-item label="名称">
          <span>{{tabActiveItem.item.NAME}}</span>
        </el-form-item>
        <el-form-item label="类型">
          <el-switch v-model="form1.Mode" active-text="按比例" inactive-text="按金额"></el-switch>
        </el-form-item>
        <el-form-item :label="form1.Mode?'比例':'金额'" prop="Money">
          <el-input v-model.number="form1.Money" type="number" min="0" placeholder="只保留两位数字"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm" :loading="tabActiveItem.loading">保存</el-button>
          <el-button @click="resetForm">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :title="(pageMode==1?'服务':'商品') +'消费提成设置'" :visible.sync="isShowGoods" width="80%">
      <goods-royalty-page
        @closeModal="isShowGoods=false"
        :pageState="isShowGoods"
        :pageMode="pageMode"
      ></goods-royalty-page>
    </el-dialog>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import qrcode from "@/assets/qrcode.png";
import MIXINS_SETUP from "@/mixins/setup";
export default {
  mixins: [MIXINS_SETUP.SIDERBAR_MENU],
  data() {
    return {
      loading: false,
      loading1: false,
      loading2: false,
      activeName: "first",
      tableList1: [],
      tabActiveItem: { index: 0, item: {}, loading: false },
      isShowDeal: false,
      form1: {
        id: "",
        Mode: true,
        Money: 0
      },
      rules: {
        Money: [
          {
            validator: (rule, value, callback) => {
              var patrn = /^\d+(\.\d+)?$/;
              if (!patrn.exec(value)) {
                // if (!Number.isInteger(value)) {
                callback(new Error("请输入正确的数字"));
              } else {
                if (value < 0) {
                  callback(new Error("数值必须大于0"));
                } else {
                  callback();
                }
              }
            },
            trigger: ["blur", "change"]
          }
        ]
      },
      isShowGoods: false,
      pageMode: 0 // 0=商品 1=服务
    };
  },
  computed: {
    ...mapGetters({
      SCListState: "sellingCardsListState",
      SCState: "sellingCardsState",
      EmpAddRate: "EmpAddRate",
      RState: "rechargeState",
      EmpSaleRate: "EmpSaleRate",
      FCState: "fastConsumeState",
      RvalueState: "rechargeValueState",
      FvalueState: "fastConsumeValueState"
    })
  },
  watch: {
    SCListState(data) {
      this.loading = false;
      this.tableList1 = [...this.SCListState.data.List];
    },
    SCState(data) {
      this.$message({
        message: data.message,
        type: data.success ? "success" : "error"
      });
      this.tabActiveItem.loading = false;
      if (data.success) {
        this.$store
          .dispatch("getSellingCardsList", { LevelId: "" })
          .then(() => {
            this.loading = true;
            this.resetForm();
          });
      }
    },
    RvalueState(data) {
      this.loading1 = false;
    },
    RState(data) {
      this.loading = false;
      if (!data.success) {
        this.$message({
          message: data.message,
          type: "error"
        });
        this.loading1 = false;
      } else {
        this.$store.dispatch("getRechargeValue").then(() => {
          this.loading1 = true;
        });
      }
    },
    FvalueState(data) {
      this.loading2 = false;
    },
    FCState(data) {
      this.loading = false;
      if (!data.success) {
        this.$message({
          message: data.message,
          type: "error"
        });
        this.loading2 = false;
      } else {
        this.$store.dispatch("getFastConsumeValue").then(() => {
          this.loading2 = true;
        });
      }
    }
  },
  methods: {
    showHandleDeal(item, index) {
      this.tabActiveItem.item = Object.assign({}, item);
      this.isShowDeal = true;
    },
    submitForm() {
      let item = this.tabActiveItem.item;
      let sendData = Object.assign({}, this.form1, {
        id: item.ID,
        Money: this.form1.Mode
          ? parseFloat(this.form1.Money / 100).toFixed(2)
          : parseFloat(this.form1.Money).toFixed(2)
      });
      this.$store.dispatch("setSellingCards", sendData).then(() => {
        this.tabActiveItem.loading = true;
      });
    },
    resetForm() {
      this.isShowDeal = false;
      this.tabActiveItem = { item: {}, loading: false };
      this.form1 = {
        id: "",
        Mode: true,
        Money: 0
      };
    },
    handleDeal2(type) {
      let phValue = "%", method = "";
      if (type == 1) {
        phValue = this.EmpAddRate * 100;
        method = "setRecharge";
      } else {
        phValue = this.EmpSaleRate * 100;
        method = "setFastConsume";
      }
      this.$prompt("请输入提成数值", "充值提成设置", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^[1-9]\d*|0$/,
        inputErrorMessage: "数值不正确",
        inputType: "number",
        inputPlaceholder: phValue > 0 ? phValue + "%" : "只保留两位数字",
        inputValue: phValue > 0 ? phValue : null
      }).then(({ value }) => {
        let rate = parseFloat(value / 100).toFixed(2);
        this.$store.dispatch(method, { Rate: rate }).then(() => {
          if (type == 1) {
            this.loading1 = true;
          } else {
            this.loading2 = true;
          }
        });
      });
    }
  },
  mounted() {
    if (this.SCListState.data.List.length == 0) {
      this.$store.dispatch("getSellingCardsList", { LevelId: "" }).then(() => {
        this.loading = true;
      });
    } else {
      this.tableList1 = [...this.SCListState.data.List];
    }
  },
  components: {
    goodsRoyaltyPage: () => import("@/components/setup/goodsRoyalty.vue")
  }
};
</script>