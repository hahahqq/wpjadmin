<template>
<el-container>
  <div class="content-new-fex">
    <div class="content-eighty">
      <div class="content-center">
        <filtePage @getNewData="getNewData" :isAll="true"></filtePage>
      </div>
    </div>

    <div class="content-table4">
      <div class="content-table-center">
        <el-tabs type="border-card" v-model="activeName">
          <el-tab-pane name="first">
            <span slot="label">
              <i class="el-icon-date"></i> 积分调整
            </span>
            <integralPage :ruleFrom="ruleFrom" :pageState="activeName=='first'?true:false"></integralPage>
          </el-tab-pane>
          <el-tab-pane label="余额调整" name="second">
            <balance-page :ruleFrom="ruleFrom" :pageState="activeName=='second'?true:false"></balance-page>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</el-container>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import MIXINS_REPORT from "@/mixins/report";
import MIXINS_INDEX from "@/mixins/index";
import { getHomeData } from "@/api/index";
export default {
  mixins: [MIXINS_REPORT.SIDERBAR_MENU, MIXINS_INDEX.IS_SHOW_POPUP],
  data() {
    return {
      activeName: "first",
      ruleFrom: {
        ShopId: "",
        BeginDate: "1",
        EndDate: "9999999999999"
      },
      
    };
  },
  methods: {
    getNewData(data) {
      this.ruleFrom = Object.assign({}, data);
    },
  },
  components: {
    filtePage: () => import("@/views/reports/filte"),
    balancePage: () => import("@/components/reports/member/balanceAdjust.vue"),
    integralPage: () => import("@/components/reports/member/integralAdjust.vue")
  },
  created(){
    this.ruleFrom = Object.assign({}, {ShopId:this.theShopId});
  },
};
</script>
