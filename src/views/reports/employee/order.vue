<template>
  <div class="report row-flex flex-start">
    <section style="min-width:130px;margin-left:-10px;">
      <sidebarMenu :activePath="activePath" :routesList="routesList" :width="130"></sidebarMenu>
    </section>
    <section class="bg-white marginLR-sm paddingTB-sm paddingLR-md full-width" v-loading="loading">
      <!-- head -->
      <el-dropdown @command="shopCheckfun" class="marginTB-sm pull-right">
        <el-button type="primary" size="small">
          <span v-text="shopCheckText?shopCheckText:'请选择状态'"></span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(item,i) in pageList" :key="i" :command="i">{{item.label}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <filtePage @getNewData="getNewData"></filtePage>

      <!-- table-->
      <el-table
        border
        :data="tebleList"
        header-row-class-name="bg-f1f2f3"
        max-height="500"
        class="full-width"
      >
        <el-table-column prop="BILLNO" label="单号" width="180"></el-table-column>
        <el-table-column prop="BILLTYPENAME" label="单据类型"></el-table-column>
        <el-table-column prop="VIPNAME" label="会员名称"></el-table-column>
        <el-table-column prop="MONEY" label="金额"></el-table-column>
        <el-table-column prop="PAYTYPENAME" label="支付方式"></el-table-column>
        <el-table-column prop="DATESTR" label="日期" width="100"></el-table-column>
        <el-table-column prop="WEEKNAME" label="星期"></el-table-column>
        <el-table-column prop="ISEMPMONEY" label="是否设置" :formatter="formatState"></el-table-column>
        <el-table-column prop="EMPMONEYLIST" label="设置内容"></el-table-column>
        <el-table-column prop="EMPMONEY" label="设置金额"></el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="m-top-sm clearfix elpagination" v-if='pagination.TotalNumber > 20'>
        <el-pagination
          background
          @size-change="handlePageChange"
          @current-change="handlePageChange"
          :current-page.sync="pagination.PN"
          :page-size="pagination.PageSize"
          layout="total, prev, pager, next, jumper"
          :total="pagination.TotalNumber"
          class="text-center"
        ></el-pagination>
      </div>
    </section>
  </div>
  <!-- 单据业绩核对 -->
</template>
<script>
import { mapState, mapGetters } from "vuex";
import MIXINS_REPORT from "@/mixins/report";

export default {
  mixins: [MIXINS_REPORT.SIDERBAR_MENU, MIXINS_REPORT.COMMOM_PAGE],
  data() {
    return {
      pageList: [
        { label: "全部", value: "" },
        { label: "已设置", value: "1" },
        { label: "未设置", value: "0" }
      ],
      tebleList: [],
      pagination: {
        TotalNumber: 0,
        PageNumber: 0,
        PageSize: 20,
        PN: 0
      },
      pageData: { PN: 1, IsEmpMoney: "" },
      shopCheckText: ""
    };
  },
  computed: {
    ...mapGetters({
      dataData: "orderReportData",
      dataState: "orderReportState",
      dataList: "orderReportList",
      dataListState: "orderReportListState"
    })
  },
  watch: {
    dataState(data) {
      this.loading = false;
      if (data.success) {
        this.defaultData();
      }
    }
  },
  methods: {
    getNewData(data) {
      let sendData = Object.assign({}, data, {
        IsEmpMoney: this.pageData.IsEmpMoney
      });
      this.$store.dispatch("clearorderReportList2").then(() => {
        this.$store.dispatch("getorderReportData", sendData);
        this.loading = true;
        this.ruleFrom = Object.assign({}, sendData);
        this.pageData.PN = 1;
      });
    },
    handlePageChange: function(currentPage) {
      if (this.pageData.PN == currentPage || this.loading) {
        return;
      }
      this.pageData.PN = parseInt(currentPage);
      this.$store
        .dispatch(
          "getorderReportData",
          Object.assign({}, this.ruleFrom, this.pageData)
        )
        .then(() => {
          this.loading = true;
        });
    },
    defaultData() {
      this.tebleList = [...this.dataData.List];
      this.pagination = {
        TotalNumber: this.dataData.paying.TotalNumber,
        PageNumber: this.dataData.paying.PageNumber,
        PageSize: this.dataData.paying.PageSize,
        PN: this.dataData.paying.PN
      };
      this.pageData.PN = this.dataData.paying.PN;
    },
    formatState: function(row, column) {
      return row.ISEMPMONEY == 1 ? "已设置" : "未设置";
    },
    shopCheckfun(index) {
      this.shopCheckText = this.pageList[index].label;
      this.pageData.IsEmpMoney = this.pageList[index].value;
      this.getNewData(this.ruleFrom);
    }
  },
  // beforeCreate() {
  //   this.$store.dispatch("getorderReportData", {});
  // },
  created() {
    this.$store
      .dispatch("getorderReportData", { ShopId: this.theShopId })
      .then(() => {
        this.loading = true;
        this.ruleFrom.ShopId = this.theShopId;
      });
  }
};
</script>
<style scoped>
.active {
  background: #fff;
  border-color: #409eff;
  color: #409eff;
}
</style>




