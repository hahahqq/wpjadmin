<template>
<el-container>
  <div class="content-new-fex">
    <div class="content-eighty">
        <div class="content-center">
          <el-button-group>
            <el-button
              plain
              type="primary"
              size="small"
              @click="ruleFrom.Type=0;getNewData()"
              :class="{'isActive':ruleFrom.Type==0}"
            >日报</el-button>
            <el-button
              plain
              type="primary"
              size="small"
              @click="ruleFrom.Type=1;getNewData()"
              :class="{'isActive':ruleFrom.Type==1}"
            >月报</el-button>
          </el-button-group>
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
        <el-table
          border
          :data="tebleList"
          header-row-class-name="bg-f1f2f3"
          class="full-width"
          :height="tableHeight"
        >
          <el-table-column prop="RN" label="排名" width="80"></el-table-column>
          <el-table-column prop="BILLDATE" label="日期"></el-table-column>
          <el-table-column label="会员数">
            <template slot-scope="props">
              <span>{{props.row.VIPCOUNT}}</span>
              <!-- <el-progress
                :text-inside="true"
                :stroke-width="18"
                :percentage="props.row.VIPCOUNT/TotalNumber"
                :color="getColor(props.row.VIPCOUNT*100/TotalNumber)"
              ></el-progress> -->
            </template>
          </el-table-column>
          <!-- <el-table-column prop="FRATE" label="占比"></el-table-column>
          <el-table-column prop="BILLCOUNT" label="单据数量"></el-table-column> -->
          <el-table-column label="更多" width="80">
            <template slot-scope="props">
              <el-button type="text" @click="getNewItem(props.row.BILLDATE)" class="no-padding">详情</el-button>
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

    <el-dialog title="注册统计详情" :visible.sync="isShowList" width="90%" style="max-width:100%;">
      <!-- <listPage @closeModal="isShowList=false" :dataType="{'data':ruleFrom2,'state':isShowList}">
        <div>合计人数: {{TotalQty}}</div>
      </listPage> -->

      <div>合计人数: {{TotalQty}}</div>


      <el-table :data="tableData" size='small' header-row-class-name="bg-f1f2f3" border class="full-width">
        <el-table-column prop="NAME" label="名称"></el-table-column>
        <el-table-column prop="MOBILENO" label="手机号"></el-table-column>
        <el-table-column prop="SEXNAME" label="性别"></el-table-column>
        <el-table-column prop="LEVELNAME" label="等级"></el-table-column>
        <el-table-column prop="CREATEDATE" label="注册时间">
          <template slot-scope="scope">
            {{new Date(scope.row.CREATEDATE) | timehf }}
          </template>
        </el-table-column>
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

  </div>
</el-container>

  <!-- </div> -->
  <!-- 会员注册统计 -->
</template>
<script>
import { mapState, mapGetters } from "vuex";
import MIXINS_REPORT from "@/mixins/report";
import MIXINS_INDEX from "@/mixins/index";
import { getHomeData } from "@/api/index";
export default {
  mixins: [MIXINS_REPORT.SIDERBAR_MENU],
  data() {
    return {
      tableHeight: document.body.clientHeight - 220,
      ruleFrom: {
        ShopId: "",
        Type: 0
      },
      ruleFrom2: {},
      isShowList: false,
      loading: false,
      title: "",
      pageList: [],
      tebleList: [],
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
      pageData: { PN: 1 },
      pageData1: { PN: 1 },
      TotalNumber: 1,
      TotalQty: 0,
      shopCheckText: "",
      shopCheckidx: "",
      tableData: [],
      dateStr: ''
    };
  },
  computed: {
    ...mapGetters({
      dataData: "registeredReportData",
      dataState: "registeredReportState",
      dataListState: "registeredReportListState",
      shopList: "shopList"
    })
  },
  watch: {
    dataListState(data) {
      console.log(data)
      this.loading = false;
      if (data.success) {
          this.TotalQty = data.data.TotalQty;
          let _data = data.data.PageData
          this.pagination1 =  {
            TotalNumber: _data.TotalNumber,
            PageNumber: _data.PageNumber,
            PageSize: _data.PageSize,
            PN: _data.PN
          }
          this.tableData = _data.DataArr
      } else {
        this.$message.error(data.message);
      }
    },
    dataState(data) {
      this.loading = false;
      if (data.success) {
        this.defaultData();
      }
    }
  },
  methods: {
    getNewData() {
      this.$store.dispatch("clearregisteredReportList2").then(() => {
        this.$store.dispatch("getregisteredReportData", this.ruleFrom);
        this.loading = true;
        this.pageData.PN = 1;
      });
    },
    getNewItem(dateStr) {
      this.dateStr = dateStr
      // 详细
      // let index = 0;
      let sendData = {
        obj: {},
        data: Object.assign({}, this.ruleFrom, { str: dateStr, PN: this.pageData1.PN })
      };
      this.$store.dispatch("getregisteredReportList", sendData).then(()=>{
        this.isShowList = true;
      })
    },
    handlePageChange: function(currentPage) {
      if (this.pageData.PN == currentPage || this.loading) {
        return;
      }
      this.pageData.PN = parseInt(currentPage);
      this.$store.dispatch(
        "getregisteredReportData",
        Object.assign({}, this.ruleFrom, this.pageData)
      ).then(() => {
        this.loading = true;
      })
    },
    handlePageChange1: function(currentPage) {
      this.pageData1.PN = parseInt(currentPage);
      this.getNewItem(this.dateStr)
    },
    defaultData() {
      this.tebleList = [...this.dataData.List];
      this.pagination = {
        TotalNumber: this.dataData.paying.TotalNumber,
        PageNumber: this.dataData.paying.PageNumber,
        PageSize: this.dataData.paying.PageSize,
        PN: this.dataData.paying.PN
      };
      this.pageData.PN = this.dataData.paying.PN;
      this.TotalNumber = this.dataData.paying.TotalNumber;
    },
    formatSex: function(row, column) {
      return row.SEX == 1 ? "女" : "男";
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
    }
  },
  created() {
    this.$store.dispatch("getregisteredReportData", {ShopId: this.theShopId}).then(() => {
      this.loading = true;
      this.ruleFrom.ShopId = this.theShopId;
      this.shopCheckText = getHomeData().shop.NAME
    })
  },
  components: {
    listPage: () => import("@/components/reports/management/tableList")
  }
};
</script>





