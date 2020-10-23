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
            <div>
              <el-button type="primary" size='small' @click="handleNew" :disabled="!isPurViewFun(91040113)" class="m-bottom-sm">新增</el-button>
              <el-select v-model="pageData.ShopId" size='small' clearable placeholder="请选择店铺"  class="m-bottom-sm">
                <el-option v-for="item in shopList" :key="item.ID" :label="item.NAME" :value="item.ID"></el-option>
              </el-select>
              <el-select v-model="pageData.ItemId" size='small' clearable placeholder="请选择支出项目"  class="m-bottom-sm">
                <el-option v-for="item in paymentList"  :key="item.ID" :label="item.NAME" :value="item.ID"></el-option>
              </el-select>
              <el-select v-model="pageData.PayTypeId" size='small' clearable placeholder="请选择付款方式"  class="m-bottom-sm">
                <el-option v-for="item in paywayList" :key="item.ID" :label="item.NAME" :value="item.ID"></el-option>
              </el-select>

              <el-date-picker size='small'
                v-model="dateBE"
                type="daterange"
                value-format="timestamp"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期" class="m-bottom-sm"
              ></el-date-picker>

              <el-button type="primary" size='small' @click="getNewData(1)" :disabled="!isPurViewFun(91040113)" class="m-bottom-sm">查 询</el-button>
            </div>
          </div>
        </div>

        <div class="content-table4">
              <div class="content-table-center">

                <!-- 列表 -->
                <el-table
                  border size='small'
                  :data="dataList"
                  v-loading="loading"
                  :height="tableHeight"
                  :empty-text="!isPurViewFun(91040113) ? '没有此功能权限，请联系管理员授权!' : '暂无数据' " 
                  header-row-class-name="bg-f1f2f3"
                  style="width: 100%"
                >
                  <el-table-column prop="ITEMNAME" label="支出项目"></el-table-column>
                  <el-table-column prop="EXPENDMONEY" label="支出金额"></el-table-column>
                  <el-table-column prop="DATESTR" label="支出时间"></el-table-column>
                  <el-table-column prop="EMPNAME" label="经手人"></el-table-column>
                  <el-table-column prop="PAYTYPENAME" label="付款方式"></el-table-column>
                  <el-table-column prop="REMARK" label="备注" show-overflow-tooltip></el-table-column>
                  <el-table-column label="操作" width="70" fixed="right">
                    <template slot-scope="scope">
                        <el-button size="small" type="text" @click="handleCancel(scope.$index, scope.row)">作废</el-button>
                      <div class="hide">{{scope.row}}</div>
                    </template>
                  </el-table-column>
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

        <el-dialog
          :title="dealType=='add'?'新增'+title:'编辑'+title"
          :visible.sync="showItem"
          width="600px"
          style="max-width:100%"
        >
          <itemPage
            @closeModal="showItem=false"
            @resetList="showItem=false;getNewData(1)"
            :dealType="{type:dealType,state:showItem}"
          ></itemPage>
        </el-dialog>

      </div>
    </el-container>
  </el-container>
</el-container>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import { getHomeData } from "@/api/index";
import MIXINS_DEFRAY from "@/mixins/defray.js";
import dayjs from 'dayjs'
export default {
  mixins: [MIXINS_DEFRAY.DEFRAY_MENU],
  data() {
    return {
      obj: "",
      title: "费用支出",
      dealType: "add",
      loading: false,
      loadingShop: false,
      loadingItem: false,
      showItem: false,
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
        PayTypeId: "",
        ItemId: "",
        PN: 1
      },
      dateBE: [new Date(this.getCustomDay(-7)).getTime(), new Date().getTime()],
      tableHeight: document.body.clientHeight - 230,
      paywayList:[]
    };
  },
  computed: {
    ...mapGetters({
      dataListState: "defrayListState",
      dataList: "defrayList",
      shopList: "shopList",
      paymentList: "paymentList",
      paywayListState:'paywayListState',
      defrayState:'defrayState'
    })
  },
  watch: {
    defrayState(data){
      this.$message({
        type: data.success ? 'success' : 'error',
        message: data.message
      })
      this.getNewData(1)
    },
    paywayListState(data){
      for(var i in data.data.List){
        if(data.data.List[i].NAME == '余额支付'){
          data.data.List.splice(i, 1)
        }
      }
      this.paywayList = data.data.List
    },
    dataListState(data) {
      console.log(data)
      this.loading = false;
      if (data.success) {
        this.pagination = {
          TotalNumber: data.paying.TotalNumber,
          PageNumber: data.paying.PageNumber,
          PageSize: data.paying.PageSize,
          PN: data.paying.PN
        };
      }
    },
    dataState(data) {
      this.loading = false;
      this.$message({
        message: data.message,
        type: data.success ? "success" : "error"
      });
    }
  },
  methods: {
    handlePageChange: function(currentPage) {
      if (this.pageData.PN == currentPage || this.loading) {
        return;
      }
      this.pageData.PN = parseInt(currentPage);
      this.getNewData(0);
    },
    getNewData(type) {
      let sendData = Object.assign({}, this.pageData);
      sendData.BeginDate = dayjs(this.dateBE[0]).format('YYYY-MM-DD')
      sendData.EndDate = dayjs(this.dateBE[1]).format('YYYY-MM-DD')
      if (type == 1) {
        sendData.PN = 1;
      }
      this.$store.dispatch("getDefrayList", sendData).then(() => {
        this.loading = true;
      });
    },
    handleNew() {
      this.dealType = "add";
      this.showItem = true;
    },
    handleEdit(index, row) {},
    handleCancel(index, row) {
      this.$confirm("作废: " + row.ITEMNAME + ", 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$store.dispatch("cancelDefray", {
          type: "del",
          data: row
        })
      })
    },
    defaultData() {
      if (this.shopList.length == 0) {
        this.$store.dispatch("getShopList");
      }
      if (this.paymentList.length == 0) {
        this.$store.dispatch("getPaymentList", {});
      }
      this.$store.dispatch("getPaywayList");

      this.pageData.ShopId = getHomeData().shop.ID;
      if (this.isPurViewFun(91040113)) {
        this.getNewData(1)
      }
    }
  },
  mounted() {
    this.defaultData()
  },
  components: {
    itemPage: () => import("./item.vue"),
    headerPage: () => import("@/components/header"),
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



