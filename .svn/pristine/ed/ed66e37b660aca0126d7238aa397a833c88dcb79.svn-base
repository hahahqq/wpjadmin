<template>
  <div>
    <div class="m-bottom-md">
      <el-date-picker
        v-model="dateBE"
        type="daterange"
        value-format="timestamp"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
      <div class="inline-block m-left-md m-right-xs">状态</div>
      <el-select v-model="pageData.Status" placeholder="请选择" style="width:150px;">
        <el-option label="全部" value="-1"></el-option>
        <el-option label="未回访" value="0"></el-option>
        <el-option label="已回访" value="1"></el-option>
      </el-select>
      <div class="inline-block m-left-md m-right-xs">店铺</div>
      <el-select v-model="pageData.ShopId" placeholder="请选择" style="width:150px;">
        <!-- <el-option label="全部" value=""></el-option> -->
        <el-option v-for="item in shopList" :key="item.ID" :label="item.NAME" :value="item.ID"></el-option>
      </el-select>
      <el-button type="primary" class="m-left-md" @click="getNewData" :loading="loading">查询</el-button>
    </div>
    <!--列表-->
    <el-table
      border
      :data="pagelist"
      v-loading="loading"
      height="500"
      header-row-class-name="bg-f1f2f3"
      style="width: 100%;"
    >
      <el-table-column prop="BILLDATE" label="日期" width="190" :formatter="formatDate"></el-table-column>
      <el-table-column prop="VIPNAME" label="会员" width="130"></el-table-column>
      <el-table-column prop="MOBILENO" label="手机号码" width="130"></el-table-column>
      <el-table-column prop="SEXNAME" label="性别" width="80"></el-table-column>
      <el-table-column prop="GOODSNAME" label="消费项目"></el-table-column>

      <el-table-column prop="VISITEMPNAME" label="回访人"></el-table-column>
      <el-table-column prop="VISITREMARK" label="回访说明"></el-table-column>
      <el-table-column label="操作" width="90" fixed="right">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
          <div class="hide">{{scope.row}}</div>
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
        layout="total, prev, pager, next, jumper"
        :total="pagination.TotalNumber"
        class="text-center"
      ></el-pagination>
    </div>
    <!-- item -->
    <el-dialog title="会员回访详情" :visible.sync="showItem" width="770px" style="max-width:100%;">
      <item-page @closeModal="showItem=false" :pageState="showItem"></item-page>
    </el-dialog>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import { getHomeData } from "@/api/index";
export default {
  data() {
    return {
      pagelist: [],
      loading: true,
      pagination: {
        TotalNumber: 0,
        PageNumber: 0,
        PageSize: 20,
        PN: 0
      },
      pageData: {
        ShopId: "",
        BeginDate: "",
        EndDate: "",
        Status: "-1", // -1=全部，0=未回访，1=已回访
        PN: 1
      },
      dateBE: [],
      multipleSelection: [],
      showItem: false,
      showItemIng: false
    };
  },
  computed: {
    ...mapGetters({
      dataList: "serviceRevisitList",
      dataState: "serviceRevisitState",
      shopList: "shopList",
      dataItem: "serviceRevisitItem"
    })
  },
  watch: {
    dataState(data) {
      if (this.loading) {
        this.loading = false;
        this.pagelist = [...this.dataList];
        if (data.success) {
          this.pagination = {
            TotalNumber: data.paying.TotalNumber,
            PageNumber: data.paying.PageNumber,
            PageSize: data.paying.PageSize,
            PN: data.paying.PN
          };
        }
      }
      if (this.showItemIng) {
        this.showItemIng = false;
        this.showItem = true;
      }
    }
  },
  methods: {
    formatDate: function(row, column) {
      return this.filterTime(new Date(row.BILLDATE));
    },
    formatSex: function(row, column) {
      //性别显示转换
      return row.SEX == 0 ? "男" : "女";
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handlePageChange: function(currentPage) {
      if (this.pageData.PN == currentPage || this.loading) {
        return;
      }
      this.pageData.PN = parseInt(currentPage);
      this.getNewData();
    },
    getNewData() {
      if (this.dateBE.length > 0) {
        this.pageData.BeginDate = this.dateBE[0];
        this.pageData.EndDate = this.dateBE[1];
      } else {
        this.pageData.BeginDate = "1";
        this.pageData.EndDate = "9999999999999";
      }
      this.$store.dispatch("getServiceRevisitList", this.pageData).then(() => {
        this.loading = true;
      });
    },
    handleEdit(idx, item) {
      console.log(item);
      if (this.dataItem.BillId && this.dataItem.DetailId) {
        if (
          this.dataItem.BILLID == item.BILLID &&
          this.dataItem.DETAILID == item.DETAILID
        ) {
          this.showItemIng = false;
          this.showItem = true;
          return;
        }
      }
      this.$store.dispatch("getServiceRevisitItem", item).then(() => {
        this.showItemIng = true;
      });
    }
  },
  components: {
    itemPage: () => import("@/components/service/revisitItem")
  },
  beforeCreate() {
    let list = this.$store.state.service.serviceRevisitList;
    if (list.length == 0) {
      this.$store.dispatch("getServiceRevisitList", {
        Status: -1,
        ShopId: getHomeData().shop.ID,
        PN: 1
      });
    }
  },
  mounted() {
    if (this.shopList.length == 0) {
      this.$store.dispatch("getShopList");
    }
    if (this.dataList.length > 0) {
      this.pagelist = [...this.dataList];
      this.loading = false;
    }
    this.pageData.ShopId = getHomeData().shop.ID;
  }
};
</script>
