<template>
  <!-- <div class> -->
    <el-container>
      <div class="content-new-fex">
        <div class="content-eighty">
            <div class="content-center">
              <el-input
                type="default" size="small"
                v-model="searchText"
                placeholder="会员手机号/卡号/姓名"
                style="width: 300px;"
              >
                <el-button
                  slot="append"
                  type="default" size="small"
                  @click="pageData.VipCode=searchText;pageData.PN=1;getNewData()"
                >查询</el-button>
              </el-input>

              <el-dropdown @command="shopCheckfun" class="m-left-sm pull-right">
                <el-button plain type="primary" size="small">
                  <span v-text="shopCheckText?shopCheckText:'请选择店铺'"></span>
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :command="-1">全部店铺</el-dropdown-item>
                  <el-dropdown-item v-for="(item,i) in shopList" :key="i" :command="i">{{item.NAME}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
        </div>
      
        <div class="content-table4">
          <div class="content-table-center">
            <!--列表-->
            <el-table
              border size='small'
              :data="pagelist"
              header-row-class-name="bg-f1f2f3"
              class="full-width"
              :height="tableHeight"
            >
              <el-table-column prop="NAME" label="会员" width="120"></el-table-column> 
              <el-table-column prop="MOBILENO" label="手机号" width="120"></el-table-column>
              <el-table-column prop="INTEGRAL" label="积分"></el-table-column>
              <el-table-column prop="MONEY" label="余额"></el-table-column>
              <el-table-column label="最近消费日期">
                <template slot-scope="scope">
                  <span>{{new Date(scope.row.LASTTIME) | time}}</span>
                </template>
              </el-table-column>
              <el-table-column label="更多" width="70">
                <template slot-scope="scope">
                  <el-button size="small" type="text" @click="getNewIBList(scope.row.CODE)" >详情</el-button>
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
    </div>
    <!-- item -->
    <el-dialog title="余额积分统计" :visible.sync="isShowList" width="90%" style="max-width:100%;">
      <!-- <listPage @closeModal="isShowList=false" :dataType="{'data':ruleFrom2,'state':isShowList}"></listPage> -->

      <el-table :data="dataList" size='small' header-row-class-name="bg-f1f2f3" border class="full-width">
        <el-table-column label="头像" prop="IMAGEURL">
          <template slot-scope="scope">
            <img :src="scope.row.IMAGEURL" alt="" style="width: 45px; height: 45px; border-radius: 6px">
          </template>
        </el-table-column>
        <el-table-column prop="NAME" label="名称"></el-table-column>
        <el-table-column prop="MOBILENO" label="手机号"></el-table-column>
        <el-table-column align="right" prop="INTEGRAL" label="积分"></el-table-column>
        <el-table-column align="right" prop="ADDMONEY" label="增加金额"></el-table-column>
        <el-table-column align="right" prop="PAYMONEY" label="已用金额"></el-table-column>
        <el-table-column align="right" prop="MONEY" label="余额"></el-table-column>
        <el-table-column align="center" prop="SHOPNAME" label="店铺"></el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="m-top-sm clearfix elpagination">
        <el-pagination
          background
          @size-change="handlePageChange1"
          @current-change="handlePageChange1"
          :current-page.sync="pagination1.PN"
          :page-size="pagination1.PageSize"
          layout="total, prev, pager, next, jumper"
          :total="pagination1.TotalNumber"
          class="text-center"
        ></el-pagination>
      </div>

    </el-dialog>
    </el-container>
  <!-- </div> -->
  <!-- 余额积分 -->
</template>
<script>
import { mapState, mapGetters } from "vuex";
import MIXINS_REPORT from "@/mixins/report";
import MIXINS_INDEX from "@/mixins/index";
import { getHomeData } from "@/api/index";
export default {
  mixins: [
    MIXINS_REPORT.SIDERBAR_MENU,
    MIXINS_REPORT.COMMOM_PAGE,
    MIXINS_INDEX.IS_SHOW_POPUP
  ],
  props: {
    pageState: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tableHeight: document.body.clientHeight - 220,
      pagelist: [],
      pagination: {
        TotalNumber: 0,
        PageNumber: 0,
        PageSize: 20,
        PN: 0
      },
      pagination1: {
        TotalNumber: 0,
        PageNumber: 0,
        PageSize: 20,
        PN: 0
      },
      searchText: "",
      pageData: {
        PN: 1,
        VipCode: ""
      },
      pageData1: {
        PN: 1,
        VipCode: ""
      },
      shopCheckText: "",
      shopCheckidx: "",
      curVipCode: ''
    };
  },
  computed: {
    ...mapGetters({
      memberList: "memberList",
      memberListState: "memberListState",
      dataList: "integralBalanceList",
      dataListState: "integralBalanceListState",
      dataListArr: "integralBalanceListARR",
      shopList: "shopList",
      memberMoneyReport:'memberMoneyReport'
    })
  },
  watch: {
    dataListState(data){
      console.log(data)
      let  _data = data.paying
      this.pagination1 = {
        TotalNumber: _data.TotalNumber,
        PageNumber: _data.PageNumber,
        PageSize: _data.PageSize,
        PN: _data.PN
      };
      this.pageData1.PN = _data.PN;
    },
    memberMoneyReport(data){
      console.log(data)

      this.pagelist = data.data.PageData.DataArr;
      this.pagination = {
        TotalNumber: data.data.PageData.TotalNumber,
        PageNumber: data.data.PageData.PageNumber,
        PageSize: data.data.PageData.PageSize,
        PN: data.data.PageData.PN
      };
      this.pageData.PN = data.data.PageData.PN;
    },
    pageState(v) {
      console.log(v)
      this.getNewData();
    },
    memberListState(data) {
      this.loading = false;
      if (data.success) {
        this.defaultData();
      }
    },
  },
  methods: {
    getNewData() {
      let sendData = Object.assign({},this.ruleFrom,this.pageData);
      this.$store.dispatch("clearMemberList").then(() => {
        this.pageData.PN = 1;
        this.$store.dispatch("getMemeberMonerReport", sendData);
        this.loading = true;
      });
    },
    getNewIBList(code) { // 详细
      this.curVipCode = code
      let index = 0;
      let sendData = {
        obj: { index: index, obj: "balance" },
        data: Object.assign({},this.ruleFrom,{'code':code, PN: this.pageData1.PN })
      };
      this.$store.dispatch("getintegralBalanceList", sendData);
    },
    handlePageChange: function(currentPage) {
      this.pageData.PN = parseInt(currentPage);
      this.$store.dispatch(
        "getMemeberMonerReport",
        Object.assign({}, this.ruleFrom, this.pageData)
      ).then(() => {
        this.loading = true;
      });
    },

    handlePageChange1: function(currentPage) {
      this.pageData1.PN = parseInt(currentPage);
      this.getNewIBList(this.curVipCode)
    },
    shopCheckfun(index) { 
      if (index == -1) {
        // this.shopCheckidx = -1;
        // this.shopCheckText = "全部店铺";
        // this.ruleFrom.ShopId = "";
        
        this.shopCheckidx = -1;
        this.shopCheckText = "全部店铺";
        let str = "";
        for (let i = 0; i < this.shopList.length; i++) {
          str += this.shopList[i].ID;
          if (i < this.shopList.length - 1) {
            str += ",";
          }
        }
        this.ruleFrom.ShopId = str;
      } else {
        this.shopCheckidx = index;
        this.shopCheckText = this.shopList[index].NAME;
        this.ruleFrom.ShopId = this.shopList[index].ID;
      }
      this.getNewData();
    },
    defaultData() {
      this.pagelist = [...this.memberList];
      this.pagination = {
        TotalNumber: this.memberListState.paying.TotalNumber,
        PageNumber: this.memberListState.paying.PageNumber,
        PageSize: this.memberListState.paying.PageSize,
        PN: this.memberListState.paying.PN
      };
      this.pageData.PN = this.memberListState.paying.PN;
    }
  },
  mounted() {
      this.ruleFrom.ShopId = getHomeData().shop.ID;
      this.shopCheckText = getHomeData().shop.NAME
      this.getNewData();
  },
  components: {
    'listPage': () => import("@/components/reports/management/tableList")
  }
};
</script>
<style scoped>
</style>
