<template>
  <div>
    <div class="paddingTB-sm font-16">共 {{num}} 单，合计积分 &yen;{{money}}</div>
    <!-- table-->
    <el-table
      border
      :data="tebleList"
      v-loading="loading"
      header-row-class-name="bg-f1f2f3"
      class="full-width"
      :height="tableHeight"
    >
      <el-table-column prop="DATESTR" label="日期" width="180"></el-table-column>
      <el-table-column prop="SHOPNAME" label="门店"></el-table-column>
      <el-table-column prop="VIPNAME" label="会员名"></el-table-column>
      <el-table-column prop="INTEGRAL" label="调整积分"></el-table-column>
      <el-table-column prop="NOWINTEGRAL" label="调整后积分"></el-table-column>
      <el-table-column prop="WRITER" label="操作员"></el-table-column>
      <el-table-column prop="REMARK" label="备注" show-overflow-tooltip></el-table-column>
      <!-- <el-table-column label="更多" width="80">
        <template slot-scope="props">
          <el-button type="text" @click="getNewItem(props.row.ITEMID)" class="no-padding">详情</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <!-- 分页 -->
    <div  class="m-top-sm clearfix elpagination">
      <el-pagination
        background
        @size-change="handlePageChange"
        @current-change="handlePageChange"
        :current-page.sync="pagination.PN"
        :page-size="pagination.PageSize"
        layout="total, prev, pager, next, jumper"
        :total="pagination.TotalNumber"
        class="text-right"
      ></el-pagination>
    </div>
  </div>
  <!-- 积分调整统计 -->
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  props: {
    ruleFrom: {
      type: Object,
      default: {
        ShopId: "",
        BeginDate: "1",
        EndDate: "9999999999999"
      }
    },
    pageState: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tableHeight: document.body.clientHeight - 320,
      tebleList: [],
      pagination: {
        TotalNumber: 0,
        PageNumber: 0,
        PageSize: 20,
        PN: 0
      },
      pageData: { PN: 1 },
      loading: false,
      num: 0,
      money: 0
    };
  },
  computed: {
    ...mapGetters({
      dataList: "integralAdjustList",
      dataListState: "integralAdjustListState"
    })
  },
  watch: {
    pageState(v) {
      this.getNewData();
    },
    ruleFrom(data){
      if(this.pageState){
        this.getNewData();
      }
    },
    dataListState(data) {
      this.loading = false;
      if (data.success) {
        this.defaultData();
      }
    }
  },
  methods: {
    getNewData() {
      this.$store.dispatch("clearAdjustList").then(() => {
        this.$store.dispatch("getintegralAdjustList", this.ruleFrom);
        this.loading = true;
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
          "getintegralAdjustList",
          Object.assign({}, this.ruleFrom, this.pageData)
        )
        .then(() => {
          this.loading = true;
        });
    },
    defaultData() {
      this.tebleList = [...this.dataList];
      if(this.tebleList.length == 0) {
        this.pagination = {
          TotalNumber: 0,
          PageNumber: 0,
          PageSize: 20,
          PN: 0
        }
      }else{
        this.pagination = {
          TotalNumber: this.dataListState.paying.TotalNumber,
          PageNumber: this.dataListState.paying.PageNumber,
          PageSize: this.dataListState.paying.PageSize,
          PN: this.dataListState.paying.PN
        };
      }

      this.pageData.PN = this.dataListState.paying.PN;
      if (this.dataListState.data) {
        this.num = this.dataListState.data.BillCount>0
          ? this.dataListState.data.BillCount
          : 0;
        this.money = this.dataListState.data.TotalMoney>0
          ? this.dataListState.data.TotalMoney
          : 0;
      }
    },
    getColor: function(v) {
      if (v > 75) {
        return "#67c23a";
      } else if (v > 50) {
        return "rgba(142, 113, 199, 0.7)";
      } else if (v > 25) {
        return "#409eff";
      } else {
        return "#f56c6c";
      }
    },
  },
  beforeCreate() {
    console.log(1111);
  },
  mounted() {
    this.getNewData();
  }
};
</script>
