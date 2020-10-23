<template>
  <div>
    <div v-if="pagelist.length>0" class="m-bottom-sm">
      <span class="inline-block">储值余额：{{pagelist[0].CURRMONEY}}元</span>
      <el-button-group class="m-left-sm">
        <el-button size="mini" type="primary" @click="changeFun('recharge')">充值</el-button>
        <el-button size="mini" type="primary" @click="changeFun('balanceAdjust')">调整</el-button>
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
      <el-table-column prop="BILLDATE" label="时间" width="140" sortable :formatter="formatDate"></el-table-column>
      <el-table-column prop="BILLTYPENAME" label="类型" width="120" align="center"></el-table-column>
      <el-table-column prop="MONEY" label="金额" width="100" align="center">
        <template slot-scope="scope">
            <span :style="`color: ${Number(scope.row.MONEY) >= 0 ? '#008000' : '#ff6655'}`">{{scope.row.MONEY}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="CURRMONEY" label="余额" width="100" align="center"></el-table-column>
      <el-table-column prop="PAYREMARK" label="说明">
        <template slot-scope="scope">
          <span v-if='scope.row.PAYREMARK != undefined'>{{`【${scope.row.SHOPNAME}】【${scope.row.PAYTYPENAME}】${scope.row.PAYREMARK}`}}</span>
        </template>
      </el-table-column>
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
    <el-dialog :width="width" :title="title" :visible.sync="isShowDeal" append-to-body>
      <components :is="componentName" 
        @closeModal="isShowDeal=false"
        @resetData="getNewData();isShowDeal=false"
        :theState="isShowDeal"
        :theData="dataInfo"
      ></components>
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
      isShowDeal:false,
      componentName:'',
      title:'',
      width:"50%",
    };
  },
  computed: {
    ...mapGetters({
      dataList: "memberBalanceList",
      dataListState: "memberBalanceState",
      dataInfo: "memberItemInfo",
      memberItem:'memberItem'
    })
  },
  watch: {
    pageState(value) {
      if (!value) return;
      this.getNewData()
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
      this.$store.dispatch("getMemberBalance", this.dataInfo).then(() => {
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
    },
    changeFun(name){
      this.componentName = name;
      this.width = "500px";
      switch(name){
        case 'recharge':
          if(!this.isPurViewFun(91040117)){
            this.$message.warning('没有此功能权限，请联系管理员授权!')
            return 
          }
          this.title='储值卡充值';
          this.width = "800px";
          break;
        case 'balanceAdjust':
          if(!this.isPurViewFun(91040118)){
            this.$message.warning('没有此功能权限，请联系管理员授权!')
            return
          }
          this.title='余额调整';
          break;
      }
      this.$store.dispatch("getMarketingRechargeStatus",{})
      this.isShowDeal = true;
    },
  },
  mounted() {
    this.getNewData()
  },
  components:{
    "balanceAdjust":()=>import("@/components/member/balanceAdjust.vue"),
    "recharge":()=>import("@/components/member/storageCardRecharge.vue"),
  },
};
</script>

