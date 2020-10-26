<template>
  <el-tabs v-model="activeName" @tab-click="handleClick" :before-leave="tabClick">
    <el-tab-pane label="支出明细" name="first">
      <defrayPage></defrayPage>
    </el-tab-pane>

    <el-tab-pane label="支出项目" name="second">
      <paymentPage></paymentPage>
    </el-tab-pane>
    <el-tab-pane label="支付账户" name="third">
      <accountPage></accountPage>
    </el-tab-pane>
    <el-tab-pane label="支出分析" name="fourth">
      <reportPage></reportPage>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import defrayPage from "./defray.vue";
import paymentPage from "../selected/payment.vue";
import accountPage from "./account.vue";
import reportPage from "../ReportAnalysis/defrayReport.vue";
export default {
  data() {
    return {
      activeName: "first"
    };
  },
  components: {
    defrayPage,
    paymentPage,
    accountPage,
    reportPage
  },
  methods: {
    handleClick(tab, event) {},
    tabClick(activeName, oldActiveName) {
      if (activeName == "third") {
        if (!this.isPurViewFun(91040106)) {
          this.$message.warning("没有此功能权限，请联系管理员授权");
          return false;
        }
      } else if (activeName == "second" || activeName == "fourth" || activeName == "first") {
        if (!this.isPurViewFun(91040113)) {
          this.$message.warning("没有此功能权限，请联系管理员授权");
          return false;
        }
      }
    }
  }
};
</script>

