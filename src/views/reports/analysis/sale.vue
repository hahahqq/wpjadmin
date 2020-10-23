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

                      <!-- <el-dropdown @command="shopCheckfun" class="m-left-sm">
                      <el-button type="primary" size="small" plain>
                          <span v-text="shopCheckText?shopCheckText:'请选择店铺'"></span>
                          <i class="el-icon-arrow-down el-icon--right"></i>
                      </el-button>
                      <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item :command="-1">全部店铺</el-dropdown-item>
                          <el-dropdown-item v-for="(item,i) in shopList" :key="i" :command="i">{{item.NAME}}</el-dropdown-item>
                      </el-dropdown-menu>
                      </el-dropdown> -->
                  </el-col>
                </el-row>

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
                      {{scope.row.perTickerPrice}}
                    </template>
                  </el-table-column>
                  <el-table-column>
                    <template slot="header" slot-scope="scope">
                      <el-tooltip class="item" effect="dark" content="连带率=销售总数/单据笔数" placement="top-start">
                          <span>连带率 <i class="el-icon-info"></i></span>
                      </el-tooltip>
                    </template>
                    <template slot-scope="scope">
                      {{scope.row.jointRate}}
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
import MIXNINS_EXPORT from "@/mixins/exportData.js";
import { getHomeData } from "@/api/index";
import dayjs from 'dayjs'

export default {
  mixins: [MIXINS_REPORT.SIDERBAR_MENU, MIXINS_REPORT.COMMOM_PAGE,MIXINS_INDEX.IS_SHOW_POPUP, MIXNINS_EXPORT.TOEXCEL, MIXNINS_EXPORT.TODATA],
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
      shopCheckText: "",
      ruleFrom: {
          ShopId: "",
          BeginDate: "1",
          EndDate: "9999999999999"
      },
      isShowDate: false,
      dateBE: [],
      chooseDateIdx: 0
    };
  },
  computed: {
    ...mapGetters({
      dataData: "saleReportData",
      dataState: "saleReportState",
      dataInfo:'saleReportXSFXObj',
      dataList: "saleReportList",
      dataListState: "saleReportListState",
      dataListArr: "saleReportListARR",
      shopList: "shopList"
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
    ExportRowFun(){
      var list = this.tebleList
      var head = [ "日期", "销售笔数", "销售数", "销售金额", "毛利润", "客单价", "连带率"];
      var val =  [ "DATESTR", "NUM", "QTY", "MONEY", "PROFIT", "perTickerPrice", "jointRate"]

      var title = "销售分析报表" + this.getNowDateTime();
      this.export2Excel(head, val, list, title);
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
      // this.tebleList = [...this.dataData.List];
      let list = [...this.dataData.List], newList = []
      console.log(this.dataData)
      for(var i in list){
        list[i].perTickerPrice = (list[i].MONEY / list[i].NUM).toFixed(2)
        list[i].jointRate = (list[i].QTY / list[i].NUM).toFixed(2)
        newList.push(list[i])
      }
      this.tebleList = newList



      this.pagination = {
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
    let sendData = {
      ShopId: getHomeData().shop.ID,
      BeginDate: this.getTimeStamp(),
      EndDate: new Date().getTime()
    }
    this.$store.dispatch("getsaleReportData",  sendData).then(() => {
        this.loading = true;
        this.ruleFrom.ShopId = this.theShopId
    })
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




