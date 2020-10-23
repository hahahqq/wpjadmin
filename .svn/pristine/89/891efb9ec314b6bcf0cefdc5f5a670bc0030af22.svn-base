<template>
  <el-container>
    <div class="content-new-fex"  v-loading="loading">
      <div class="report row-flex flex-start">
        <section class="full-width">
          <div class="content-eighty m-bottom-sm bg-white">
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

          <div class="content-table4">
            <div class="content-table-center">
              <el-table
                border
                :data="checkoutReportPayData"
                header-row-class-name="bg-f1f2f3"
                class="full-width"
                :height="tableHeight"
              >
                <el-table-column prop="PAYTYPENAME" label="支付方式" width="180"></el-table-column>
                <el-table-column prop="MONEY" label="金额"></el-table-column>
                <el-table-column prop="BILLCOUNT" label="单据数"></el-table-column>
                <el-table-column label="更多" width="80">
                  <template slot-scope="props">
                    <el-button type="text" @click="getNewList(props.row)" class="no-padding">详情</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>

        </section>
      </div>
    </div>
      <el-dialog :title="title" :visible.sync="isShowList" width="90%" style="max-width:100%;">
        <listPage @closeModal="isShowList=false" :dataType="{'data':ruleFrom2,'state':isShowList}"></listPage>
      </el-dialog>
  </el-container>
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
      autofocus: -1,
      ruleFrom3: {
        UserId: "",
        PayTypeId: ""
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
      tableHeight: document.body.clientHeight - 200
    };
  },
  computed: {
    ...mapGetters({
      dataData: "checkoutReportData",
      dataState: "checkoutReportState",
      dataList: "checkoutReportList",
      dataListState: "checkoutReportListState",
      dataListArr: "checkoutReportListARR",
      checkoutReportPayData: "checkoutReportPayData",
      shopList: "shopList"
    })
  },
  watch: {
    dataState(data) {
      this.loading = false;
    }
  },
  methods: {
    ExportRowFun(){
      var list = this.checkoutReportPayData
      var head = [ "支付方式", "金额", "单据数"];
      var val =  [ "PAYTYPENAME", "MONEY", "BILLCOUNT"]

      var title = "收银对账报表" + this.getNowDateTime();
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
    getNewData(data) {
      let sendData = Object.assign({}, data, { UserId: this.ruleFrom3.UserId });
      this.$store.dispatch("getcheckoutReportPayData", sendData).then(() => {
        this.loading = true;
        this.ruleFrom = Object.assign({}, sendData);
      });
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
    getNewList(item) {
      this.ruleFrom3.PayTypeId = item.PAYTYPEID;
      let index = 0;
      let sendData = {
        obj: { index: index, obj: "checkout" },
        data: Object.assign({}, this.ruleFrom, this.ruleFrom3)
      };
      this.ruleFrom2 = Object.assign({}, sendData);
      this.$store.dispatch("clearcheckoutReportList", index).then(() => {
        this.$store.dispatch("getcheckoutReportList", sendData);
        this.title = this.dataListArr[index].title + '：' + item.PAYTYPENAME;
      });
    },
    getNewPayData(id, index) {
      this.ruleFrom3.UserId = id;
      this.autofocus = index;
      console.log(this.ruleFrom)
      this.getNewData(this.ruleFrom);
    }
  },
  created() {
    this.$store.dispatch("getcheckoutReportData", {ShopId: this.theShopId});
    this.$store.dispatch("getcheckoutReportPayData", {ShopId: this.theShopId}).then(() => {
        this.loading = true;
        this.ruleFrom.ShopId = this.theShopId
    });
  },
  mounted(){
      if (this.shopList.length == 0) {
          this.$store.dispatch("getShopList", {});
      }
      this.ruleFrom = {
          ShopId: getHomeData().shop.ID,
          BeginDate: this.getTimeStamp(),
          EndDate: new Date().getTime()
      };
      this.shopCheckText = getHomeData().shop.NAME;
  },
  components: {
    'listPage': () => import("@/components/reports/management/tableList")
  }
};
</script>
<style scoped>
.content-eightys{
    display: flex;
    align-items: center;
    width: 100%;
    height: 80px;
    background: #fff;
}

.active {
  background: #fff;
  border-color: #409eff;
  color: #409eff;
}
</style>




