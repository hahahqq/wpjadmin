<template>
  <el-container >
    <el-header style="height:50px; padding: 0">
        <headerPage></headerPage>
    </el-header>
    <el-container>
        <el-aside width="100px">
            <section style="min-width:100px;">
              <memberMenu :activePath="activePath" :routesList="routesList" :width="100"></memberMenu>
            </section>
        </el-aside>
        <el-container class="" :style="`height:${windowHeight}px; overflow:auto`">
          <div class="content-new-fex-goods full-width padding-sm" >
            <div class="content-eighty">
              <div class="content-center">
                <filtePage @getNewData="getNewData" :isAll="true"></filtePage>
              </div>
            </div>

            <div class="content-table-goods bg-white m-top-sm">
              <div class="content-table-center">
                <!-- page -->
                <div>
                  <div class="inline-block m-right-md marginTB-sm padding-sm border" style="width:150px">
                    <div>销售总额</div>
                    <div><span class="text-red">{{dataInfo.MONEY}}</span></div>
                  </div>
                  <div class="inline-block m-right-md marginTB-sm padding-sm border" style="width:150px">
                    <div>毛利润</div>
                    <div><span class='text-red'>{{isPurViewFun(91040112) ? dataInfo.PROFIT : '****'}}</span></div>
                  </div>
                  <div class="inline-block m-right-md marginTB-sm padding-sm border" style="width:150px">
                    <div>销售笔数</div>
                    <div><span class='text-red'>{{dataInfo.NUM}}</span></div>
                  </div>
                  <div class="inline-block m-right-md marginTB-sm padding-sm border" style="width:150px">
                    <div>销售数量</div>
                    <div><span class='text-red'>{{dataInfo.QTY}}</span></div>
                  </div>
                </div>
                <!-- chat -->
                <echart-line
                  :lineData="{
                  title:echartData.title,
                  legend:echartData.legend,
                  xAxis:echartData.xAxis,
                  series:echartData.series
                  }"
                  class="border padding-sm m-top-sm m-bottom-sm"
                  style="border-width:5px;"
                ></echart-line>

                <!-- table-->
                <el-table
                  border size='small'
                  :data="tebleList"
                  header-row-class-name="bg-f1f2f3"
                  class="full-width"
                >
                  <el-table-column prop="DATESTR" label="日期" width="180" sortable align="center"></el-table-column>
                  <el-table-column prop="NUM" label="销售笔数" align="center"></el-table-column>
                  <el-table-column prop="QTY" label="销售数" align="center"></el-table-column>  
                  <el-table-column prop="MONEY" label="销售金额" align="center"></el-table-column>
                  <el-table-column prop="PROFIT" label="毛利润" align="center">
                    <template slot-scope="scope">
                      {{isPurViewFun(91040112) ? scope.row.PROFIT : '****'}}
                    </template>
                  </el-table-column>
                  <el-table-column>
                    <template slot="header" slot-scope="scope">
                      <el-tooltip class="item" effect="dark" content="客单价=销售金额/销售笔数" placement="top-start">
                          <span>客单价 <i class="el-icon-info"></i></span>
                      </el-tooltip>
                    </template>
                    <template slot-scope="scope">
                      {{(scope.row.MONEY / scope.row.NUM).toFixed(2)}}
                    </template>
                  </el-table-column>
                  <el-table-column>
                    <template slot="header" slot-scope="scope">
                      <el-tooltip class="item" effect="dark" content="连带率=销售总数/单据笔数" placement="top-start">
                          <span>连带率 <i class="el-icon-info"></i></span>
                      </el-tooltip>
                    </template>
                    <template slot-scope="scope">
                      {{(scope.row.QTY / scope.row.NUM).toFixed(2)}}
                    </template>
                  </el-table-column>
                  <el-table-column label="更多" width="80">
                    <template slot-scope="props">
                      <el-button type="text" @click="getNewList(props.row.DATESTR)" class="no-padding">详情</el-button>
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
                    class="text-center"
                  ></el-pagination>
                </div>
                <!-- </section> -->
                <el-dialog :title="title" :visible.sync="isShowList" width="90%" style="max-width:100%;">
                  <listPage @closeModal="isShowList=false" :dataType="{'data':ruleFrom2,'state':isShowList}">
                    <slot>

                      <div class="inline-block m-right-md marginTB-sm padding-sm border" style="width:150px">
                        <div>销售数</div>
                        <div><span>{{infoDialog.QTY}}</span></div>
                      </div>

                      <div class="inline-block m-right-md marginTB-sm padding-sm border" style="width:150px">
                        <div>销售额</div>
                        <div><span>{{infoDialog.MONEY}}</span></div>
                      </div>

                      <div class="inline-block m-right-md marginTB-sm padding-sm border" style="width:150px">
                        <div>销售毛利</div>
                        <div><span>{{isPurViewFun(91040112) ? infoDialog.GAINMONEY : '****'}}</span></div>
                      </div>

                    </slot>
                  </listPage>
                </el-dialog>
              </div>
            </div>
          </div>
          <!-- </div> -->
        </el-container>
    </el-container>
  </el-container>
  <!-- 销售分析 -->
</template>
<script>
import { mapState, mapGetters } from "vuex";
import MIXINS_REPORT from "@/mixins/report";
import MIXINS_INDEX from "@/mixins/index";
export default {
  mixins: [MIXINS_REPORT.SIDERBAR_MENU, MIXINS_REPORT.COMMOM_PAGE,MIXINS_INDEX.IS_SHOW_POPUP],
  data() {
    return {
      windowHeight:window.innerHeight -80,
      infoDialog: {},
      pageList: [
        { label: "销售总额", value: "MONEY" },
        { label: "毛利润", value: "GAINMONEY" },
        { label: "销售笔数", value: "BILLCOUNT" },
        { label: "销售数量", value: "QTY" },
        { label: "盈利金额", value: "GAINMONE" }
      ],
      tebleList: [],
      pagination: {
        TotalNumber: 0,
        PageNumber: 0,
        PageSize: 20,
        PN: 0
      },
      pageData: { PN: 1 },
      echartData: {
        title: "销售分析",
        legend: ["销售金额", "毛利润"],
        xAxis: [],
        series: []
      },
    };
  },
  computed: {
    ...mapGetters({
      dataData: "saleReportData",
      dataState: "saleReportState",
      dataInfo:'saleReportXSFXObj',
      dataList: "saleReportList",
      dataListState: "saleReportListState",
      dataListArr: "saleReportListARR"
    })
  },
  watch: {
    dataListState(data){
      console.log(data)
      this.infoDialog = data.data.SumInfo
    },
    dataState(data) {
      this.loading = false;
      if (data.success) {
        this.defaultData();
      }
    },
  },
  methods: {
    getNewData(data) {
      let sendData = Object.assign({}, data);
      this.$store.dispatch("clearsaleReportList2").then(() => {
        this.$store.dispatch("getsaleReportData", sendData);
        this.loading = true;
        this.ruleFrom = Object.assign({}, sendData);
        this.pageData.PN = 1;
      });
    },
    getNewList(str) {
      let index = 0;
      let sendData = {
        obj: { index: index, obj: "sale" },
        data: { ShopId: this.ruleFrom.ShopId, DateStr: str, OrderType: 0 }
      };
      this.ruleFrom2 = Object.assign({}, sendData);
      this.$store.dispatch("clearsaleReportList", index).then(() => {
        this.$store.dispatch("getsaleReportList", sendData);
        this.title = this.dataListArr[index].title;
      });
    },
    handlePageChange: function(currentPage) {
      if (this.pageData.PN == currentPage || this.loading) {
        return
      }
      this.pageData.PN = parseInt(currentPage);
      this.$store.dispatch("getsaleReportData",Object.assign({}, this.ruleFrom, this.pageData)).then(() => {
        this.loading = true;
      });
    },
    defaultData() {
      this.tebleList = [...this.dataData.List];
      console.log(this.dataData)
      this.pagination = {
        // TotalNumber: this.dataData.paying.TotalNumber,
        // PageNumber: this.dataData.paying.PageNumber,
        // PageSize: this.dataData.paying.PageSize,
        // PN:1
        TotalNumber: this.tebleList.length,
        PageNumber: 1,
        PageSize: this.tebleList.length,
        PN: 1
      };
      this.pageData.PN = this.dataData.paying.PN
      this.drawLine();
    },
    drawLine() {
      let dd = this.tebleList;
      let dateStr = [], arr1 = [], arr2 = [];
      for (let i = 0; i < dd.length; i++) {
        dateStr.push(dd[i].DATESTR);
        arr1.push(dd[i].MONEY);
        if(!this.isPurViewFun(91040112)){
          dd[i].PROFIT = '无权限'
        }
        arr2.push(dd[i].PROFIT);
      }
      this.echartData.xAxis = [...dateStr];
      this.echartData.series = [arr1, arr2];
      this.isChangePropsState = !this.isChangePropsState;
    }
  },
  created() {
    this.$store.dispatch("getsaleReportData", {ShopId: this.theShopId}).then(() => {
        this.loading = true;
        this.ruleFrom.ShopId = this.theShopId
    });
  },
  components: {
    "echart-line": () => import("@/components/other/echartLine.vue"),
    'listPage': () => import("@/components/reports/management/tableList"),
    headerPage: () => import("@/components/header")
  }
};
</script>

<style scoped>
.active {
  background: #fff;
  border-color: #409eff;
  color: #409eff;
}
.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}
</style>




