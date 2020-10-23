<template>
  <div>
    <div class="m-bottom-sm">
      <span>累计消费</span>
      <span class="text-red marginLR-xs">{{SumBillCount}}</span>
      <span>笔，共</span>
      <span class="text-red marginLR-xs">{{SumMoney}}</span>元
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
      <el-table-column prop="GOODSNAME" label="商品名称" width="120" sortable></el-table-column>
      <el-table-column prop="MONEY" label="单价" width="100"></el-table-column>
      <el-table-column prop="QTY" label="数量" width="90"></el-table-column>
      <el-table-column label="消费金额" width="120">
        <template slot-scope="scope">
          <div class>{{parseFloat(scope.row.MONEY) * parseInt(scope.row.QTY)}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="DATESTR" label="消费时间"></el-table-column>
      <el-table-column label="消费店铺">
        <template slot-scope="scope">
          <div>{{shopName}}</div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="m-top-sm clearfix elpagination" v-if='pagination.TotalNumber > 20'>
      <el-pagination
        background
        @size-change="handlePageChange"
        @current-change="handlePageChange"
        :current-page.sync="pagination.PN"
        :page-size="pagination.PageSize"
        layout="total,prev, pager, next, jumper"
        :total="pagination.TotalNumber"
        class="text-center"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import { getHomeData } from "@/api/index";
export default {
  props: ["pageState"],
  data() {
    var shopName = getHomeData().SHOPNAME ? getHomeData().SHOPNAME : "";
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
      shopName: shopName,
      pageData: { PN: 1 }
    };
  },
  computed: {
    ...mapGetters({
      dataList: "memberSpendingList",
      dataListState: "memberSpendingState",
      dataInfo: "memberItemInfo"
    }),
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
        this.SumBillCount = data.data.SumBillCount ? parseInt(data.data.SumBillCount) : 0;
        this.SumMoney = data.data.SumMoney ? parseInt(data.data.SumMoney) : 0;
      }
    }
  },
  methods: {
    getNewData() {
      if (Object.keys(this.dataInfo).length == 0) {
        this.$message.error("会员信息出错！");
        return;
      }
      this.$store.dispatch("getMemberSpending", this.dataInfo).then(() => {
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
  }
};
</script>

