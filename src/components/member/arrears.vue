<template>
  <div>
    <div v-if="pagelist.length>0" class="m-bottom-sm">
      <span>{{pagelist[0].OWEMONEYTEXT}}</span>
      <el-button-group class="m-left-sm">
        <el-button size="mini" type="primary" @click="isShowDeal=true">调整</el-button>
      </el-button-group>
    </div>
    <!--列表-->
    <el-table
      border
      size='small'
      :data="pagelist"
      v-loading="loading"
      height="350"
      header-row-class-name="bg-f1f2f3"
      style="width: 100%;"
    >
      <el-table-column prop="BILLDATE" label="时间" width="150" sortable :formatter="formatDate"></el-table-column>
      <el-table-column prop="BILLTYPE" label="类型"></el-table-column>
      <el-table-column prop="MONEYTEXT" label="金额"></el-table-column>
      <el-table-column prop="OWEMONEYTEXT" label="欠款金额"></el-table-column>
      <el-table-column prop="SHOPNAME" label="消费店铺"></el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="m-top-sm clearfix elpagination" v-if='pagination.TotalNumber > 20'>
      <el-pagination background
        @size-change="handlePageChange"
        @current-change="handlePageChange"
        :current-page.sync="pagination.PN"
        :page-size="pagination.PageSize"
        layout="total, prev, pager, next, jumper"
        :total="pagination.TotalNumber"
        class="text-center"
      ></el-pagination>
    </div>
    <el-dialog width="500px" title="会员还款" :visible.sync="isShowDeal" append-to-body>
      <repayment
        @closeModal="isShowDeal=false"
        @resetData="getNewData();isShowDeal=false"
        :theState="isShowDeal"
        :theData="dataInfo"
      ></repayment>
    </el-dialog>
  </div>
  <!-- 欠款记录 -->
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  props: ["pageState"],
  data() {
    return {
      pagelist: [],
      loading: false,
      pagination: {
        TotalNumber: 0,
        PageNumber: 0,
        PageSize: 20,
        PN: 0
      },
      SumBillCount: 0,
      SumMoney: 0,
      pageData: { PN: 1 },
      isShowDeal: false
    };
  },
  computed: {
    ...mapGetters({
      dataList: "memberArrearsList",
      dataListState: "memberArrearsState",
      dataInfo: "memberItemInfo"
    })
  },
  watch: {
    pageState(value) {
      if (!value) return;
      this.getNewData();
    },
    dataListState(data) {
      this.loading = false;
      this.pagelist = [...this.dataList];
      if (data.success) {
        this.pagination = {
          TotalNumber: data.paying.TotalNumber,
          PageNumber: data.paying.PageNumber,
          PageSize: data.paying.PageSize,
          PN: data.paying.PN
        };
        this.SumBillCount = data.SumBillCount ? parseInt(data.SumBillCount) : 0;
        this.SumMoney = data.SumMoney ? parseInt(data.SumMoney) : 0;
      }
    }
  },
  methods: {
    formatDate: function(row, column) {
      return this.filterTime(new Date(row.BILLDATE));
    },
    getNewData() {
      if (Object.keys(this.dataInfo).length == 0) {
        this.$message.error("会员信息出错！");
        return;
      }
      this.$store.dispatch("getMemberArrears", this.dataInfo).then(() => {
        this.loading = true;
      });
    },
    handlePageChange: function(currentPage) {
      if (this.pageData.PN == currentPage || this.loading) {
        return;
      }
      this.pageData.PN = parseInt(currentPage);
      this.dataInfo.PN = this.pageData.PN
      this.getNewData();
    }
  },
  mounted() {
    this.getNewData();
  },
  components:{
    "repayment":()=>import("@/components/member/repayArrears.vue"),
  },
};
</script>

