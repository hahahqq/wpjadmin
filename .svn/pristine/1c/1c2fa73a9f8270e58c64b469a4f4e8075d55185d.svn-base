<template>
  <div>
    <div v-if="Object.keys(dataState.Item).length>0" class="p-bottom-sm">
      <img :src="img" class="pull-left m-right-sm" style="height:50px;">
      <div class="p-bottom-sm font-600">
        <span class="font-16">{{dataState.Item.GOODSNAME}}</span>
        <span class="pull-right text-center font-18" style="width:100px;">{{dataState.Item.QTY}}</span>
      </div>
      <div>
        <span class="text-danger">&yen;{{dataState.Item.PRICE}}</span>
        <span class="inline-block paddingLR-sm">成本&yen;{{dataState.Item.COSTPRICE}}</span>
        <span class="pull-right text-center" style="width:100px;">当前库存</span>
      </div>
    </div>
    <!-- table-->
    <el-table
      border
      :data="tebleList"
      header-row-class-name="bg-f1f2f3"
      class="full-width"
      max-height="500px"
    >
      <el-table-column prop="DATESTR" label="时间" width="180"></el-table-column>
      <el-table-column prop="BILLTYPENAME" label="类型"></el-table-column>
      <el-table-column prop="QTY" label="数量"></el-table-column>>
      <el-table-column prop="WRITER" label="操作人"></el-table-column>
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
      <!-- <div class="text-center clearfix">
        <span class="inline-block">共{{pagination.TotalNumber}}条，每页{{pagination.PageSize}}条</span>
      </div> -->
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import img from "@/assets/default.png";
export default {
  data() {
    return {
      tebleList: [],
      pagination: {
        TotalNumber: 0,
        PageNumber: 0,
        PageSize: 20,
        PN: 0
      },
      pageData: { PN: 1 },
      loading: false,
      img: img
    };
  },
  computed: {
    ...mapGetters({
      dataState: "salesDetailsState"
    })
  },
  watch: {
    dataState(data) {
      console.log(data)
      this.defaultData();
    }
  },
  methods: {
    handlePageChange: function(currentPage) {
      if (this.pageData.PN == currentPage || this.loading) {
        return;
      }
      this.pageData.PN = parseInt(currentPage);
      this.$store
        .dispatch(
          "getSalesDetails",
          Object.assign({}, this.dataState.Item, this.pageData)
        )
        .then(() => {
          this.loading = true;
        });
    },
    defaultData() {
      this.tebleList = [...this.dataState.List];
      this.pagination = {
        TotalNumber: this.dataState.paying.TotalNumber,
        PageNumber: this.dataState.paying.PageNumber,
        PageSize: this.dataState.paying.PageSize,
        PN: this.dataState.paying.PN
      };
      this.pageData.PN = this.dataState.paying.PN;
    }
  },
  mounted() {
    this.defaultData();
  }
};
</script>
