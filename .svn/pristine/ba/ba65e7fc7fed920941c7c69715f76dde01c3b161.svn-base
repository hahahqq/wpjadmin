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
    <el-container :style="`height:${windowHeight}px; overflow:auto`">
      <div class="content-new-fex-goods full-width padding-sm" >
        <div class="content-eighty">
            <div class="content-center">
              <!-- <filtePage @getNewData="getNewData" :isAll="true"></filtePage> -->
              <el-row>
                <el-col :span="16">
                  <el-row>
                      <el-col :span="10">
                          <el-button-group>
                              <el-button
                                  plain
                                  v-for="(label,i) in ['今天','昨天','本月','上月','其它']"
                                  :key="i"
                                  @click="chooseDate(i)"
                                  type="primary"
                                  size="small"
                                  :class="{'isActive':chooseDateIdx==i}"
                              >{{label}}</el-button>
                          </el-button-group>
                      </el-col>
                      <el-col :span="12">
                          <div v-if="isShowDate">
                              <el-date-picker
                                  ref="dateBE"
                                  size="small"
                                  v-model="dateBE"
                                  @change="chooseDate2"
                                  type="daterange"
                                  value-format="timestamp"
                                  range-separator="至"
                                  start-placeholder="开始日期"
                                  end-placeholder="结束日期"
                                  style="width:400px;"
                                  class="inline-block"
                              ></el-date-picker>
                          </div>
                      </el-col>
                  </el-row>
                </el-col>

                <el-col :span="8" class="text-right">
                    <el-button type="primary" plain size="small" class="m-left-sm" >
                        <a id='Button1' @click="ExportRowFun()"><i class="el-icon-upload el-icon--right"></i> 导出表格 </a>
                    </el-button>

                    <el-dropdown @command="shopCheckfun" class="m-left-sm">
                    <el-button type="primary" size="small" plain>
                        <span v-text="shopCheckText?shopCheckText:'请选择店铺'"></span>
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item :command="-1">全部店铺</el-dropdown-item>
                        <el-dropdown-item v-for="(item,i) in shopList" :key="i" :command="i">{{item.NAME}}</el-dropdown-item>
                    </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
              </el-row>
            </div>
        </div>

        <div class="content-table-goods bg-white m-top-sm">
          <div class="content-table-center">

              <!-- page -->
              <div>
                <div
                  v-for="(item,i) in pageList"
                  :key="i"
                  v-if="i<4"
                  class="inline-block m-right-md marginTB-sm padding-sm border"
                  style="width:150px"
                >
                  <div>{{item.label}}</div>
                  <div >
                    <span v-if="item.label != '毛利润'" class='text-red' v-text="dataData.info[item.value]?dataData.info[item.value]:0"></span>
                    <span v-if="item.label == '毛利润'" class="text-red">
                      <i>{{ !isPurViewFun(91040112) ? '****' : dataData.info[item.value] ? dataData.info[item.value] : 0}}</i>
                    </span>
                  </div>
                </div>
              </div>

              <!-- table-->
              <el-table
                border size='small'
                :data="tebleList"
                header-row-class-name="bg-f1f2f3"
                class="full-width"
                :height="tableHeight"
              >
                <el-table-column prop="RN" label="排名" align="center"></el-table-column>
                <el-table-column prop="GOODSNAME" label="商品名称" align="center"></el-table-column>
                <el-table-column prop="DETAILQTY" label="数量" align="center"></el-table-column>
                <el-table-column prop="SALEMONEY" label="金额" sortable align="center"></el-table-column>
                <el-table-column prop="GROSSPROFITMONEY" label="毛利润" align="center">
                  <template slot-scope="scope">
                    {{isPurViewFun(91040112) ? scope.row.GROSSPROFITMONEY : '****'}}
                  </template>
                </el-table-column>
                <el-table-column prop='STOCKQTY' label="库存" align="center"></el-table-column>
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
          </div>
        </div>
      </div>
    </el-container>
  </el-container>
  </el-container>

  <!-- 商品分析 -->
</template>
<script>
import { mapState, mapGetters } from "vuex";
import MIXINS_REPORT from "@/mixins/report";
import MIXNINS_EXPORT from "@/mixins/exportData.js";
import { getHomeData } from "@/api/index";
import dayjs from 'dayjs'

export default {
  mixins: [MIXINS_REPORT.SIDERBAR_MENU, MIXINS_REPORT.COMMOM_PAGE, MIXNINS_EXPORT.TOEXCEL, MIXNINS_EXPORT.TODATA],
  data() {
    return {
      windowHeight:window.innerHeight -80,
      tableHeight: document.body.clientHeight - 100,
      pageList: [
        { label: "销售总额", value: "SALEMONEY" },
        { label: "毛利润", value: "GROSSPROFITMONEY" },
        // { label: "销售笔数", value: "BILLCOUNT" },
        { label: "销售数量", value: "QTY" },
        // { label: "盈利金额", value: "GAINMONE" }
      ],
      tebleList: [],
      pagination: {
        TotalNumber: 0,
        PageNumber: 0,
        PageSize: 20,
        PN: 0
      },
      pageData: { PN: 1 },
      shopCheckText: "",
      ruleFrom: {
          ShopId: "",
          BeginDate: "1",
          EndDate: "9999999999999"
      },
      isShowDate: false,
      dateBE: [],
      chooseDateIdx: 0,
    };
  },
  components: {
      headerPage: () => import("@/components/header")
  },
  computed: {
    ...mapGetters({
      dataData: "goodsReportData",
      dataState: "goodsReportState",
      dataList: "goodsReportList",
      dataListState: "goodsReportListState",
      dataListArr: "goodsReportListARR",
      exportData: 'getGoodsReportExportState',
      shopList: "shopList"
    })
  },
  watch: {
    exportData(data){
      if(data.success){
        var list = data.data.List
        var head = [ "商品名称", "数量", "金额","毛利润", "库存"];
        var val =  [ "GOODSNAME", "MONEY", "SALEMONEY","GROSSPROFITMONEY","STOCKQTY"]

        var title = "商品分析报表" + this.getNowDateTime();
        this.export2Excel(head, val, list, title);
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
    ExportRowFun(){
      this.$store.dispatch('exportGoodsReport', this.ruleFrom)
    },
    shopCheckfun(index) {
        if (index == -1) {
          this.shopCheckText = "全部店铺";
          let str = "";
          for (let i = 0; i < this.shopList.length; i++) {
            str += this.shopList[i].ID;
            if (i < this.shopList.length - 1) {
              str += ",";
            }
          }
          this.ruleFrom.ShopId = str;
          this.$store.dispatch("selectingShop", {});
        } else {
          this.shopCheckText = this.shopList[index].NAME;
          this.ruleFrom.ShopId = this.shopList[index].ID;
          this.$store.dispatch("selectingShop", {
            ID: this.shopList[index].ID,
            NAME: this.shopList[index].NAME
          });
        }
        this.getNewData(this.ruleFrom);
    },
    chooseDate(i) {
        this.chooseDateIdx = i;
        if (i < 4) {
            this.isShowDate = false;
        }
        switch (i) {
            case 0:
                this.ruleFrom.BeginDate = this.getTimeStamp();
                this.ruleFrom.EndDate = new Date().getTime();
                this.getNewData(this.ruleFrom);
                break;
            case 1:
                this.ruleFrom.BeginDate = this.getTimeStamp(1);
                this.ruleFrom.EndDate = this.ruleFrom.BeginDate+ 86400000 - 1;
                this.getNewData(this.ruleFrom);
                break;
            case 2:
                let arr2 = this.getAroundMonth();
                this.ruleFrom.BeginDate = new Date(arr2[0]).getTime();
                this.ruleFrom.EndDate = this.getTimeStampstatuesOutput(arr2[1])+ 86400000 - 1;
                this.getNewData(this.ruleFrom);
                break;
            case 3:
                var nowdays = new Date();  
                var year = nowdays.getFullYear();  
                var month = nowdays.getMonth();  
                if(month==0) {
                    month=12;
                    year=year-1;
                }  
                if (month < 10) {  
                    month = "0" + month;
                }  
                var firstDay = year + "-" + month + "-" + "01";//上个月的第一天  
                var myDate = new Date(year, month, 0);  //上个月最后一天
                var lastDay = year + "-" + month + "-" + myDate.getDate();//上个月的最后一天
                this.ruleFrom.BeginDate = dayjs(firstDay).valueOf()
                this.ruleFrom.EndDate = dayjs(lastDay).valueOf()

                this.getNewData(this.ruleFrom);
                break;
            case 4:
                this.isShowDate = !this.isShowDate;
                break;
        }
    },
    chooseDate2(v) {
        this.ruleFrom.BeginDate = v[0];
        this.ruleFrom.EndDate = v[1];
        this.getNewData(this.ruleFrom);
    },
    getNewData(data) {
      let sendData = Object.assign({}, data);
      this.$store.dispatch("cleargoodsReportList2").then(() => {
        this.$store.dispatch("getgoodsReportData", sendData);
        this.loading = true;
        this.ruleFrom = Object.assign({}, sendData);
        this.pageData.PN = 1;
      })
    },
    handlePageChange: function(currentPage) {
      if (this.pageData.PN == currentPage || this.loading) {
        return;
      }
      this.pageData.PN = parseInt(currentPage);
      this.$store.dispatch(
        "getgoodsReportData",
        Object.assign({}, this.ruleFrom, this.pageData)
      ).then(() => {
        this.loading = true
      })
    },
    defaultData() {
      this.tebleList = [...this.dataData.List];
      this.pagination = {
        TotalNumber: this.dataData.paying.TotalNumber,
        PageNumber: this.dataData.paying.PageNumber,
        PageSize: this.dataData.paying.PageSize,
        PN: this.dataData.paying.PN
      };
      this.pageData.PN = this.dataData.paying.PN
    },
  },
  created() {
    let sendData = {
      ShopId: getHomeData().shop.ID,
      BeginDate: this.getTimeStamp(),
      EndDate: new Date().getTime()
    }
    this.$store.dispatch("getgoodsReportData", sendData).then(() => {
        this.loading = true;
        this.ruleFrom.ShopId = this.theShopId
    });
  },
};
</script>


<style scoped>
.el-header{
  padding: 0 !important;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}
.center-title{
    width: 100px;
    text-align: center;
    height: 50px;
    line-height: 50px;
    border: solid 1px #d7d7d7;
}
.center-cont{
    width: 100px;
    text-align: center;
    height: 50px;
    line-height: 50px;
}
</style>