<template>
  <div>
    <div>
      <el-select v-model="pageData.ShopId" placeholder="请选择店铺" class style="width: 180px">
        <el-option label="请选择店铺" value></el-option>
        <el-option
          v-for="item in shopList"
          :key="item.ID"
          :label="item.NAME"
          :value="item.ID"
        ></el-option>
      </el-select>
      <el-select v-model="pageData.PayTypeId" placeholder="请选择帐户" class style="width: 180px">
        <el-option label="请选择帐户" value></el-option>
        <el-option
          v-for="item in payWayList"
          :key="item.PAYTYPEID"
          :label="item.PAYTYPENAME"
          :value="item.PAYTYPEID"
        ></el-option>
      </el-select>
      <el-date-picker
        v-model="dateBE"
        type="daterange"
        value-format="timestamp"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        style="width: 290px"
      ></el-date-picker>
      <div class="clesrfix m-top-sm"></div>
      <el-button
        type="primary"
        @click="getNewData(1)"
        size="small"
        class="pull-right"
        :loading="loading"
      >
        查 询
      </el-button>
      <div>
        <span class="inline-block paddingTB-sm m-right-sm">
          合计单数:
          <span class="text-red">{{ count.BillCount }}</span>
        </span>
        <span class="inline-block paddingTB-sm m-right-sm">
          收入金额合计:
          <span class="text-red">{{ count.CMoney }}</span>
        </span>
        <span class="inline-block paddingTB-sm m-right-sm">
          支出金额合计:
          <span class="text-red">{{ count.DMoney }}</span>
        </span>
        <span class="inline-block paddingTB-sm m-right-sm">
          账户余额:
          <span class="text-red">{{ count.PayTypeAmount }}</span>
        </span>
      </div>
    </div>
    <!--列表-->
    <el-table
      border
      :data="dataList"
      v-loading="loading"
      height="300"
      header-row-class-name="bg-f1f2f3"
    >
      <el-table-column prop="BILLTYPENAME" label="名称" width="100" sortable></el-table-column>
      <el-table-column prop="DMONEY" label="期初金额" width="80" align="center"></el-table-column>
      <el-table-column prop="MONEY" label="金额" width="80" align="center"></el-table-column>
      <el-table-column
        prop="CMONEY"
        label="收入金额合计"
        width="110"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="PAYTYPENAME"
        label="支付方式"
        width="80"
        align="center"
      ></el-table-column>
      <el-table-column prop="DATESTR" label="时间"></el-table-column>
      <el-table-column prop="SM" label="说明"></el-table-column>
      <el-table-column prop="REMARK" label="备注" show-overflow-tooltip></el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="m-top-sm clearfix elpagination" v-if="pagination.TotalNumber > 20">
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
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import dayjs from "dayjs";
export default {
  data() {
    return {
      loading: false,
      pageData: {
        ShopId: "",
        PayTypeId: "",
        PN: 1,
        BeginDate: "",
        EndDate: ""
      },
      pagination: {
        TotalNumber: 0,
        PageNumber: 0,
        PageSize: 20,
        PN: 0
      },
      dateBE: [new Date(this.getCustomDay(-7)).getTime(), new Date().getTime()],
      count: {
        BillCount: 0,
        CMoney: 0,
        DMoney: 0,
        PayTypeAmount: 0
      }
    };
  },
  computed: {
    ...mapGetters({
      dataList: "accountFlowList",
      dataListState: "accountFlowListState",
      shopList: "shopList",
      paymentList: "paymentList",
      payWayList: "accountList",
      payWayState: "accountListState"
    })
  },
  watch: {
    payWayState(data) {},
    dataListState(data) {
      this.loading = false;
      if (data.success) {
        this.pagination = {
          TotalNumber: data.paying.TotalNumber,
          PageNumber: data.paying.PageNumber,
          PageSize: data.paying.PageSize,
          PN: data.paying.PN
        };
        this.count = {
          BillCount: data.data.BillCount,
          CMoney: data.data.CMoney,
          DMoney: data.data.DMoney,
          PayTypeAmount: data.data.PayTypeAmount
        };
      } else {
        this.$message.error(data.message);
      }
    }
  },
  methods: {
    getNewData(type) {
      let sendData = Object.assign({}, this.pageData);
      sendData.BeginDate = dayjs(this.dateBE[0]).format("YYYY-MM-DD");
      sendData.EndDate = dayjs(this.dateBE[1]).format("YYYY-MM-DD");

      if (type == 1) {
        sendData.PN = 1;
      } else {
        delete sendData.PN;
      }
      this.$store.dispatch("gerAccountFlow", sendData).then(() => {
        this.loading = true;
      });
    },
    handlePageChange: function (currentPage) {
      if (this.pageData.PN == currentPage || this.loading) {
        return;
      }
      this.pageData.PN = parseInt(currentPage);
      this.getNewData(0);
    },
    defaultData() {
      if (this.shopList.length == 0) {
        this.$store.dispatch("getShopList");
      }
      this.$store.dispatch("getAccountList", {});
    }
  },
  mounted() {
    this.defaultData();
  }
};
</script>

