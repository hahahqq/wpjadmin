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

              <div class="inline-block m-right-md marginTB-sm padding-sm border" style="width:150px">
                <div>销售额</div>
                <div><span class='text-red'>{{dataData.obj.MONEY}}</span></div>
              </div>
              <div class="inline-block m-right-md marginTB-sm padding-sm border" style="width:150px">
                <div>销售数</div>
                <div><span class='text-red'>{{dataData.obj.QTY}}</span></div>
              </div>
              <div class="inline-block m-right-md marginTB-sm padding-sm border" style="width:150px">
                <div>毛利</div>
                <!-- <div><span class='text-red'>{{dataData.obj.PROFIT}}</span></div> -->
                <div>
                  <span class='text-red'>
                  {{ !isPurViewFun(91040112) ? '****' : dataData.obj.PROFIT ? dataData.obj.PROFIT : 0}}
                  </span>
                </div>
              </div>

              <!-- table-->
              <el-table
                border size='small'
                :data="tableList"
                header-row-class-name="bg-f1f2f3"
                class="full-width"
                :height="tableHeight"
              >
                <el-table-column label="员工" >
                  <template slot-scope='scope'>
                    <div>
                      <span>{{scope.row.SALEEMPNAME}}</span>
                      <el-progress
                        :text-inside="true"
                        :stroke-width="18"
                        :percentage="(scope.row.percentage).toFixed(4) * 100"
                        :color="getColor(scope.row.percentage * 1)"
                      ></el-progress>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="MONEY" label="销售额" align="center"></el-table-column>
                <el-table-column prop="QTY" label="销售数" align="center"></el-table-column>
                <el-table-column prop="PROFIT" label="毛利" align="center">
                  <template slot-scope="scope">
                    {{isPurViewFun(91040112) ? scope.row.PROFIT : '****'}}
                  </template>
                </el-table-column>
                <el-table-column label="更多" width="80">
                  <template slot-scope="scope">
                    <el-button type="text" @click="getNewList(scope.row)" class="no-padding">详情</el-button>
                  </template>
                </el-table-column>
              </el-table>

              <!-- list -->
              <el-dialog :title="title" :visible.sync="isShowList" width="90%" style="max-width:100%;">
                <listPage @closeModal="isShowList=false" :dataType="{'data':ruleFrom2,'state':isShowList}">
                    <div
                      class="inline-block m-right-md marginTB-sm padding-sm border"
                      style="width:150px"
                    >
                      <div>销售额</div>
                      <div >
                        <span class='text-red' >{{dataItemTop.PAYMONEY}}</span>
                      </div>
                    </div>

                    <div
                      class="inline-block m-right-md marginTB-sm padding-sm border"
                      style="width:150px"
                    >
                      <div>笔 数</div>
                      <div >
                        <span class='text-red' >{{dataItemTop.NUM}}</span>
                      </div>
                    </div>


                    <div
                      class="inline-block m-right-md marginTB-sm padding-sm border"
                      style="width:150px"
                    >
                      <div>数 量</div>
                      <div >
                        <span class='text-red' >{{dataItemTop.QTY}}</span>
                      </div>
                    </div>



                  <!-- <slot>
                    <div class="text-left">
                      <el-button
                        plain
                        v-for="(item, i) in pageList"
                        :key="i"
                        v-if="i>2"
                        @click="getNewList2(item.index)"
                        class="marginTB-sm paddingLR-sm font-14 as-el-button"
                        :class="{'active':autofocus==item.index}"
                        style="width:150px"
                      >
                        <div>{{item.label}}</div>
                        <div class="m-top-xs">
                          <span v-text="dataListState2[item.value]?dataListState2[item.value]:0"></span>
                        </div>
                      </el-button>
                </div>
                  </slot> -->
                </listPage>
              </el-dialog>

            </div>
          </div>
        </div>
      </el-container>
  </el-container>
</el-container>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import MIXINS_REPORT from "@/mixins/report";
import MIXINS_INDEX from "@/mixins/index";
import MIXNINS_EXPORT from "@/mixins/exportData.js";
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
      tableHeight: document.body.clientHeight - 280,
      tableList: [],
      tableObj:{},
      isShowItem: false,
      autofocus: 0,
      dataListState2:{},
      dataItemTop:{},
      shopCheckText: "",
      ruleFrom: {
          ShopId: "",
          BeginDate: "1",
          EndDate: "9999999999999"
      },
      isShowDate: false,
      dateBE: [],
      chooseDateIdx: 0,
    }
  },
  computed: {
    ...mapGetters({
      dataData: "achievementReportData",
      dataState: "achievementReportState",
      dataList: "achievementReportList",
      dataListState: "achievementReportListState",
      dataListArr: "achievementReportListARR",
      dataItem: "achievementReportItem",
      dataObj : 'achievementReportObj',
      shopList: "shopList"
    })
  },
  watch: {
    dataData(data){
      console.log(data)
      let param = data.EmpMoneyList, newParam = [], obj =data.obj
      for(var i in param){
        param[i].percentage = param[i].MONEY / obj.MONEY
        newParam.push(param[i])
      }
      this.tableList = newParam
    },
    dataObj(data){
      console.log(data)
      this.dataItemTop = data
    },
    dataState(data) {
      this.loading = false;
    },
    dataItem(data) {
      console.log(data)
      this.isShowItem = data.success;
      if (!data.success) {
        this.$message.error(data.message);
      }
    },
    dataListState(data){
      if(this.autofocus==0)
      this.dataListState2 = Object.assign({},data.data)
    }
  },
  methods: {
    ExportRowFun(){
      var list = this.tableList
      var head = [ "员工", "销售额", "销售数","毛利"];
      var val =  [ "SALEEMPNAME", "MONEY", "QTY", "PROFIT"]

      var title = "员工分析报表" + this.getNowDateTime();
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
      this.$store.dispatch("getachievementReportData", sendData).then(() => {
        this.loading = true;
        this.ruleFrom = Object.assign({}, sendData);
      });
    },
    getNewList(item) {
      this.autofocus = 0;
      let index = 0;
      let sendData = {
        obj: { index: index, obj: "achievement" },
        data: Object.assign({}, this.ruleFrom, { id: item.SALEEMPID })
      };
      console.log(sendData)
      this.ruleFrom2 = Object.assign({}, sendData);
      this.$store.dispatch("clearachievementReportList", index).then(() => {
        this.$store.dispatch("getachievementReportList", sendData);
        this.title = this.dataListArr[index].title;
      })
    },
    getNewList2(index){
      this.autofocus = index;
      this.ruleFrom2.obj.index = index;
      this.$store.dispatch("clearachievementReportList", index).then(() => {
        this.$store.dispatch("getachievementReportList", this.ruleFrom2);
        this.title = this.dataListArr[index].title;
      });
    },
    formatSex: function(row, column) {
      return row.SEX == 1 ? "女" : "男";
    },
    getColor: function(v) {
      if (v > 0.9) {
        return "#67c23a";
      } else if (v > 0.6) {
        return "rgba(142, 113, 199, 0.7)";
      } else if (v > 0.3) {
        return "#409eff";
      } else {
        return "#f56c6c";
      }
    }
  },
  created() {
    let sendData = {
      ShopId: getHomeData().shop.ID,
      BeginDate: this.getTimeStamp(),
      EndDate: new Date().getTime()
    }
    this.$store.dispatch("getachievementReportData", sendData).then(() => {
      this.loading = true;
      this.ruleFrom.ShopId = this.theShopId;
    })

    this.shopCheckText = getHomeData().shop.NAME;
  },
  components: {
    listPage: () => import("@/components/reports/management/tableList"),
    headerPage: () => import("@/components/header")
  }
};
</script>

<style scoped>
.as-el-button.active {
  color: #c9607b;
  border-color: #c9607b;
}
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
