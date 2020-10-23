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
            <el-container class="marginTB-sm paddingTB-sm" :style="`height:${windowHeight}px; overflow:auto`">
              <section class="bg-white marginLR-sm paddingTB-sm paddingLR-md full-width" v-loading="loading">
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
                          <a @click="ExportRowFun()"><i class="el-icon-upload el-icon--right"></i> 导出表格 </a>
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

                <!-- page -->

                <!-- chat -->
                <echart-pie :pieData="echartData"
                class="border padding-sm m-top-sm m-bottom-lg"
                  style="border-width:5px;"
                  ></echart-pie>

                <!-- table-->
                <el-table
                  border size='small'
                  :data="tebleList"
                  :height="tableHeight"
                  header-row-class-name="bg-f1f2f3"
                  class="full-width"
                >
                  <el-table-column prop="RN" label="排名" width="80"></el-table-column>
                  <el-table-column prop="ITEMNAME" label="支出项目"></el-table-column>
                  <el-table-column prop="MONEY" label="支出金额">
                    <template slot-scope="props">
                      <span>&yen;{{props.row.MONEY}}</span>
                      <el-progress
                        :text-inside="true"
                        :stroke-width="18"
                        :percentage="props.row.FRATE>0?props.row.FRATE*100:0"
                        :color="getColor(props.row.FRATE*100)"
                      ></el-progress>
                    </template>
                  </el-table-column>
                  <el-table-column prop="FRATE" label="占比"></el-table-column>
                  <el-table-column prop="BILLCOUNT" label="单据数量"></el-table-column>
                  <el-table-column label="更多" width="80">
                    <template slot-scope="props">
                      <el-button type="text" @click="getNewItem(props.row.ITEMID)" class="no-padding">详情</el-button>
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
              </section>
              <el-dialog :title="title" :visible.sync="isShowList" width="90%" style="max-width:100%;">
                <listPage @closeModal="isShowList=false" :dataType="{'data':ruleFrom2,'state':isShowList}"></listPage>
              </el-dialog>
            </el-container>
        </el-container>
  </el-container>
  <!-- 支出分析 -->
</template>
<script>
import { mapState, mapGetters } from "vuex";
import MIXINS_REPORT from "@/mixins/report";
import MIXNINS_EXPORT from "@/mixins/exportData.js";
import MIXINS_INDEX from "@/mixins/index";
import { getHomeData } from "@/api/index";
import dayjs from 'dayjs'

export default {
  mixins: [
    MIXINS_REPORT.SIDERBAR_MENU,
    MIXINS_REPORT.COMMOM_PAGE,
    MIXINS_INDEX.IS_SHOW_POPUP,
    MIXNINS_EXPORT.TOEXCEL, 
    MIXNINS_EXPORT.TODATA
  ],
  data() {
    return {
      windowHeight:window.innerHeight -80,
      tableHeight: document.body.clientHeight - 100,
      pageList: [],
      tebleList: [],
      pagination: {
        TotalNumber: 0,
        PageNumber: 0,
        PageSize: 20,
        PN: 0
      },
      pageData: { PN: 1 },
      echartData: {
        title: "支出分析",
        legend: [],
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
      chooseDateIdx: 0,
    };
  },
  computed: {
    ...mapGetters({
      dataData: "defrayReportData",
      dataState: "defrayReportState",
      dataList: "defrayReportList",
      dataListState: "defrayReportListState",
      dataListArr: "defrayReportListARR",
      shopList: "shopList",
      exportDataState: 'defrayReportExportState'
    })
  },
  watch: {
    exportDataState(data){
      console.log(data)
      if(data.success){
        let list = data.data.List
        var head = [ "支出项目", "支出金额", "占比", "单据数量"];
        var val =  [ "ITEMNAME", "MONEY", "FRATE", "BILLCOUNT"]

        var title = "支出分析报表" + this.getNowDateTime();
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
      let sendData = {
        ShopId: this.ruleFrom.ShopId,
        BeginDate: this.ruleFrom.BeginDate,
        EndDate: this.ruleFrom.EndDate
      }
      this.$store.dispatch('defrayReportExport', sendData )
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
      this.$store.dispatch("cleardefrayReportList2").then(() => {
        this.$store.dispatch("getdefrayReportData", sendData);
        this.loading = true;
        this.ruleFrom = Object.assign({}, sendData);
        this.pageData.PN = 1;
      });
    },
    getNewItem(id) { // 详细
      let index = 0;
      let sendData = {
        obj: { index: index, obj: "defray" },
        data: Object.assign({},this.ruleFrom,{'id':id})
      };
      this.ruleFrom2 = Object.assign({}, sendData);
      this.$store.dispatch("cleardefrayReportList", index).then(() => {
        this.$store.dispatch("getdefrayReportList", sendData);
        this.title = this.dataListArr[index].title;
      });
    },
    handlePageChange: function(currentPage) {
      if (this.pageData.PN == currentPage || this.loading) {
        return;
      }
      this.pageData.PN = parseInt(currentPage);
      this.$store.dispatch(
        "getdefrayReportData",
        Object.assign({}, this.ruleFrom, this.pageData)
      ).then(() => {
        this.loading = true;
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
      this.drawPie();
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
    drawPie() {
      // 绘图
      this.echartData.legend=[]
      this.echartData.series=[]
      for(let i=0; i<this.tebleList.length;i++){
        if(this.tebleList[i].MONEY<0) continue;
        this.echartData.legend.push(this.tebleList[i].ITEMNAME)
        this.echartData.series.push({
          value: this.tebleList[i].MONEY,
          name: this.tebleList[i].ITEMNAME
        })
      }
      this.isChangePropsState = !this.isChangePropsState;
    }
  },

  created() {
      let sendData = {
        ShopId: getHomeData().shop.ID,
        BeginDate: this.getTimeStamp(),
        EndDate: new Date().getTime()
      }
      this.$store.dispatch("getdefrayReportData", sendData ).then(() => {
          this.loading = true;
          this.ruleFrom.ShopId = this.theShopId
      });
      this.shopCheckText = getHomeData().shop.NAME;
  },
  components: {
    "echart-pie": () => import("@/components/other/echartPie.vue"),
    'listPage': () => import("@/components/reports/management/tableList"),
    headerPage: () => import("@/components/header")
  }
};
</script>

<style scoped>
.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}
</style>





