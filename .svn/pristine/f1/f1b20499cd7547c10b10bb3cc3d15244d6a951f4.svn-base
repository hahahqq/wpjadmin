<template>
    <section class="bg-white" v-loading="loading">
      <filtePage @getNewData="getNewData"></filtePage>

      <!-- table-->
      <el-table
        border
        :data="tebleList"
        max-height="500"
        header-row-class-name="bg-f1f2f3"
        class="full-width"
      >
        <el-table-column prop="BILLNO" label="单号" width="120"></el-table-column>
        <el-table-column label="图片" width="60">
          <template slot-scope="props">
            <img :src="props.row.IMAGEURL?props.row.IMAGEURL:dImg">
          </template>
        </el-table-column>
        <el-table-column prop="VIPNAME" label="会员" width="80"></el-table-column>
        <el-table-column prop="VIPCODE" label="会员编码" width="80"></el-table-column>
        <el-table-column prop="OLDQTY" label="次数" width="60"></el-table-column>
        <el-table-column prop="NOWQTY" label="余次" width="60"></el-table-column>
        <el-table-column prop="QTY" label="计次" width="60"></el-table-column>
        <el-table-column prop="GOODSNAME" label="商品"></el-table-column>
        <el-table-column prop="SM" label="详情"></el-table-column>
        <el-table-column prop="DATESTR" label="日期"></el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="m-top-sm clearfix">
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
        <!-- <div class="text-center clearfix">
          <span class="inline-block">共{{pagination.TotalNumber}}条，每页{{pagination.PageSize}}条</span>
        </div> -->
      </div>
    </section>
  <!-- 支出分析 -->
</template>
<script>
import { mapState, mapGetters } from "vuex";
import dImg from "@/assets/default.png";
import { getHomeData } from "@/api/index";
export default {
  props: {
    pageState: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      pageList: [],
      tebleList: [],
      pagination: {
        TotalNumber: 0,
        PageNumber: 0,
        PageSize: 20,
        PN: 0
      },
      pageData: { PN: 1 },
      dImg: dImg,
      ruleFrom: {},
      loading: false
    };
  },
  computed: {
    ...mapGetters({
      dataList: "numberBalanceList",
      dataListState: "numberBalanceListState"
    })
  },
  watch: {
    pageState(v) {
      this.getNewData2();
    },
    dataListState(data) {
      this.loading = false;
      if (data.success) {
        this.defaultData()
      }else{
        this.$message.error(data.message);
      }

    }
  },
  methods: {
    getNewData(data) {
      let sendData = Object.assign({}, data);
      this.$store.dispatch("clearBalanceList", 2).then(() => {
        this.$store.dispatch("getnumberBalanceList", sendData);
        this.loading = true;
        this.ruleFrom = Object.assign({}, sendData);
        this.pageData.PN = 1;
      });
    },
    getNewData2() {
      this.$store.dispatch("getnumberBalanceList", this.ruleFrom).then(() => {
        this.loading = true;
      });
    },
    handlePageChange: function(currentPage) {
      if (this.pageData.PN == currentPage || this.loading) {
        return;
      }
      this.pageData.PN = parseInt(currentPage);
      this.$store
        .dispatch(
          "getnumberBalanceList",
          Object.assign({}, this.ruleFrom, this.pageData)
        )
        .then(() => {
          this.loading = true;
        });
    },
    defaultData() {
      this.tebleList = [...this.dataList];
      this.pagination = {
        TotalNumber: this.dataListState.paying.TotalNumber,
        PageNumber: this.dataListState.paying.PageNumber,
        PageSize: this.dataListState.paying.PageSize,
        PN: this.dataListState.paying.PN
      };
      this.pageData.PN = this.dataListState.paying.PN;
    },
    formatSex: function(row, column) {
      return row.SEX == 1 ? "女" : "男";
    }
  },
  mounted() {
    this.ruleFrom.ShopId = getHomeData().shop.ID;
    this.getNewData2();
  },
  components: {
    filtePage: () => import("@/views/reports/filte")
  }
};
</script>





