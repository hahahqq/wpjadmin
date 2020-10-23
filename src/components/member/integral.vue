<template>
  <div>
    <div v-if="pagelist.length>0" class="m-bottom-sm">
      <span>{{pagelist[0].CAPTION1}}</span>
      <el-button-group class="m-left-sm">
        <el-button size="mini" class="m-left-sm" type="primary" @click="changeFun">调整</el-button>
      </el-button-group>
    </div>
    <!--列表-->
    <el-table
      border
      :data="pagelist"
      v-loading="loading"
      height="350"
      size='small'
      header-row-class-name="bg-f1f2f3"
      style="width: 100%;"
    >
      <el-table-column prop="BILLDATE" label="时间" width="150" sortable :formatter="formatDate"></el-table-column>
      <el-table-column prop="SM" label="说明" width="270"></el-table-column>
      <el-table-column prop="GETINTEGRAL" label="获得积分"></el-table-column>
      <el-table-column prop="CURRINTEGRAL" label="获得后积分"></el-table-column>
      <el-table-column prop="SHOPNAME" label="消费店铺"></el-table-column>
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
    <el-dialog width="500px" title="积分调整" :visible.sync="isShowDeal" append-to-body>
      <adjust
        @closeModal="isShowDeal=false"
        @resetData="getNewData();isShowDeal=false"
        :theState="isShowDeal"
        :theData="dataInfo"
      ></adjust>
    </el-dialog>


  </div>
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
      dataList: "memberIntegralList",
      dataListState: "memberIntegralState",
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
    changeFun(){
      if(!this.isPurViewFun(91040119)){
        this.$message.warning('没有此功能权限，请联系管理员授权!')
        return
      }
      this.isShowDeal = true
    },
    formatDate: function(row, column) {
      return this.filterTime(new Date(row.BILLDATE));
    },
    getNewData() {
      if (Object.keys(this.dataInfo).length == 0) {
        this.$message.error("会员信息出错！");
        return;
      }
      this.$store.dispatch("getMemberIntegral", this.dataInfo).then(() => {
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
  },components:{
    "adjust":()=>import("@/components/member/integralAdjust.vue"),
  },
};
</script>

