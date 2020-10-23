<template>
  <div>
    <div class="row-flex">
      <div class="paddingLR-sm rounded-xs" style="width:100px;">
        <img :src="goodsImg" :onerror="imgError" class="block">
      </div>
      <div class="full-width">
        <div style="height:38px;">{{dataType.item.NAME}}</div>
        <div>
          <span class="inline-block text-theme">&yen;{{dataType.item.PRICE}}</span>
          <span class="inline-block m-left-sm">成本 &yen;{{dataType.item.PURPRICE}}</span>
        </div>
      </div>
      <div class="text-center" style="width:150px">
        <div style="height:38px;" class="font-20 font-600">{{dataType.item.STOCKQTY}}</div>
        <div>当前库存</div>
      </div>
    </div>
    <div class="m-top-sm">
      <!--列表-->
      <el-table
        border
        :data="dataList"
        v-loading="loading"
        max-height="500"
        header-row-class-name="bg-f1f2f3"
        style="width: 100%;"
      >
        <el-table-column prop="DATESTR" label="时间" sortable></el-table-column>
        <el-table-column prop="BILLTYPENAME" label="方式"></el-table-column>
        <el-table-column prop="QTY" label="数量"></el-table-column>
        <el-table-column prop="USERNAME" label="操作员"></el-table-column>
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
        <!-- <div class="text-center clearfix">
          <span class="inline-block">共{{pagination.TotalNumber}}条，每页{{pagination.PageSize}}条</span>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { GOODS_IMGURL } from "@/util/define.js";
import img from "@/assets/default.png";
export default {
  props: {
    dataType: {
      type: Object,
      default: {
        item: { NAME: "", STOCKQTY: 0 },
        list: [],
        isShow: false
      }
    }
  },
  data() {
    return {
      goodsImg: "",
      imgError: 'this.src="' + img + '"',
      pagination: {
        TotalNumber: 0,
        PageNumber: 0,
        PageSize: 20,
        PN: 0
      },
      pageData: { PN: 1 },
      loading: false
    };
  },
  computed: {
    ...mapGetters({
      dataList: "goodsInventoryList",
      dataListState: "goodsInventoryListState"
    })
  },
  watch: {
    dataType(data) {
      if (data.isShow) {
        this.defaultData();
      } else {
        this.goodsImg = img;
      }
    }
  },
  methods: {
    closeModal(type) {
      if (type == "resetList") {
        this.$emit("resetList");
      } else {
        this.$emit("closeModal");
      }
    },
    handlePageChange: function(currentPage) {
      if (this.pageData.PN == currentPage || this.loading) {
        return;
      }
      this.pageData.PN = parseInt(currentPage);
      this.$store.dispatch("getGoodsInventory", {
        ID: this.dataType.item.ID,
        PN: this.pageData.PN
      });
    },
    defaultData() {
      this.pagination = {
        TotalNumber: this.dataListState.paying.TotalNumber,
        PageNumber: this.dataListState.paying.PageNumber,
        PageSize: this.dataListState.paying.PageSize,
        PN: this.dataListState.paying.PN
      };
      this.pageData.PN = this.dataListState.paying.PN;
      this.goodsImg =
        GOODS_IMGURL + this.dataType.item.ID + ".png?" + Math.random();
    }
  },
  mounted() {
    this.defaultData();
  }
};
</script>

<style>
</style>
