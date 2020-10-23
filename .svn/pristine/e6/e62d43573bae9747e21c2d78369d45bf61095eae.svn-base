<template>

  <el-container>
    <el-header style="height:50px;">
      <headerPage></headerPage>
    </el-header>
    <el-container>
      <el-aside width="100px">
          <section style="min-width:100px;">
            <memberMenu :activePath="activePath" :routesList="routesList" :width="100"></memberMenu>
          </section>
      </el-aside>
      <el-container>
        <div class="content-new-fex">

          <div class="content-eighty">
            <div class="content-center">
                <div class="m-bottom-sm">
                  <el-select v-model="pageData.ShopId" clearable size='small' placeholder="请选择店铺" class style="width:180px;">
                    <el-option v-for="item in shopList" :key="item.ID" :label="item.NAME" :value="item.ID"></el-option>
                  </el-select>
                  <el-date-picker size='small' 
                    v-model="dateBE"
                    type="daterange"
                    value-format="timestamp"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    style="width:290px"
                  ></el-date-picker>
                  <el-button type="primary" @click="getNewData(1)" size="small" class :loading="loading">查 询</el-button>
                </div>
            </div>
          </div>

          <div class="content-table4">
            <div class="content-table-center">
              <!--列表-->
              <el-table
                border size='small'
                :data="dataList"
                v-loading="loading"
                :height="tableHeight"
                header-row-class-name="bg-f1f2f3"
              >
                <el-table-column prop="ITEMNAME" label="名称" width="120" sortable></el-table-column>
                <el-table-column prop="BILLCOUNT" label="数量"></el-table-column>
                <el-table-column prop="FRATE" label="概率"></el-table-column>
                <el-table-column prop="MONEY" label="金额"></el-table-column>
              </el-table>
              <!-- 分页 -->
              <div class="m-top-sm clearfix elpagination">
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
          </div>
        </div>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import { getHomeData } from "@/api/index";
import MIXINS_DEFRAY from "@/mixins/defray.js";

export default {
  mixins: [MIXINS_DEFRAY.DEFRAY_MENU],
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
      tableHeight: document.body.clientHeight - 240
    };
  },
  components: {
    headerPage: () => import("@/components/header")
  },
  computed: {
    ...mapGetters({
      dataList: "reportList",
      dataListState: "reportListState",
      shopList: "shopList"
    })
  },
  watch: {
    dataListState(data) {
      this.loading = false;
      if (data.success) {
        this.pagination = {
          TotalNumber: data.paying.TotalNumber,
          PageNumber: data.paying.PageNumber,
          PageSize: data.paying.PageSize,
          PN: data.paying.PN
        };
      } else {
        this.$message.error(data.message);
      }
    }
  },
  methods: {
    getNewData(type) {
      let sendData = Object.assign({}, this.pageData);
      sendData.BeginDate = this.dateBE[0];
      sendData.EndDate = this.dateBE[1];
      if (type == 1) {
        sendData.PN = 1;
      } else {
        delete sendData.PN;
      }
      this.$store.dispatch("getReportList", { obj: "defrayReport", data: sendData }).then(() => {
        this.loading = true;
      });
    },
    handlePageChange: function(currentPage) {
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
      this.pageData.ShopId = getHomeData().shop.ID
      this.getNewData(1)
    }
  },
  mounted() {
    this.defaultData()
  }
};
</script>


<style scoped>
.member-header{
  display: flex;
  align-items: center;
  height: 50px;
}
.center-title{
  width: 100px;
  text-align: center;
  height: 50px;
  line-height: 50px;
  border: solid 1px #EDEEEE;
}
.center-cont{
  width: 100px;
  text-align: center;
  height: 50px;
  line-height: 50px;
}
.el-header{
  padding: 0 !important;
}
.shop{
  display: flex;
  align-items: center;
  height: 50px;
  position: relative;
}
.shop .name{
  position: absolute;
  right: 50px;
  height: 50px;
  line-height: 50px;
  width: 150px;
  text-align: center;
  top: 0;
  /* background: rebeccapurple; */
}
  .el-header, .el-footer {
    background-color: #fff;
    color: #333;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #F4F5FA;
    color: #333;
  }
  .member-main-top{
    width: 99%;
    margin-left: 0.5%;
    margin-right: 0.5%;
    height: 150px;
    background: #fff;
  }
  .member-main-table{
    margin-top: 8px;
    width: 99%;
    margin-left: 0.5%;
    margin-right: 0.5%;
    height: 600px;
    background: #fff;
  }
  .member-main-top-buttom{
    height: 70px;
    width: 100%;
    line-height: 70px;
  }
  .member-main-top-type{
    height: 70px;
    width: 100%;
    line-height: 70px;
  }
  .defray-index-top{
    width: 98%;
    margin-left: 1%;
    margin-right: 1%;
    background: #fff;
    height: 80px;
    line-height: 80px;
    margin-top: 5px;
    margin-bottom: 15px;
  }
  .defray-index-top-cont{
    width: 96%;
    margin-left: 2%;
    margin-right: 2%;
  }
  .defray-table{
    width: 98%;
    margin-left: 1%;
    margin-right: 1%;
    background: #fff;
  }
</style>



