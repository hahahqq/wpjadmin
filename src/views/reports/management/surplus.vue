<template>
  <div class="row-flex flex-start full-width m-top-sm">
    <section class="bg-white marginLR-sm paddingTB-sm paddingLR-md full-width" v-loading="loading">
      <filtePage @getNewData="getNewData" :isAll="true"></filtePage>
      <!-- page -->
      <div class="row-flex paddingTB-sm flex-items-center full-width">
        <div class style="min-width:510px;">
          <div v-for="(item, i) in pageList" :key="i" v-if="i<6" class="inline-block m-right-md marginTB-sm padding-sm border" style="width:150px">
            <span>{{item.label}}</span>
            <el-button type="text" @click="getNewList(item.id,null)" class="pull-right no-padding">详情</el-button>
            <div class="text-left p-top-sm">
              <span v-text="dataData[item.value]?dataData[item.value]:0" class="font-600"></span>
            </div>
          </div>
        </div>
        <div class="full-width relative">
          <div class="inline-block border-top border-right border-bottom paddingTB-lg paddingLR-md">
            <span class="block paddingTB-sm"></span>
          </div>
          <div class="inline-block padding-sm border translateY-center marginLR-md" style="width:150px">
            <div class="p-bottom-sm">{{pageList[6].label}}</div>
            <div>
              <span v-text="dataData[pageList[6].value]?dataData[pageList[6].value]:0" class="font-600 font-16"></span>
            </div>
          </div>
        </div>
      </div>
      <!-- table-->
      <el-table
        border
        :data="paywayList"
        header-row-class-name="bg-f1f2f3"
        class="full-width"
        :height="tableHeight"
      >
        <el-table-column prop="PAYTYPENAME" label="支付方式" width="180"></el-table-column>
        <el-table-column label="金额">
          <template slot-scope="props">
            <span>&yen;{{props.row.MONEY}}</span>
            <el-progress
              :text-inside="true"
              :stroke-width="18"
              :percentage="props.row.FRATE>0?(props.row.FRATE<1?props.row.FRATE*10000/100 : 100):0"
              :color="getColor(props.row.FRATE*100)"
            ></el-progress>
          </template>
        </el-table-column>
        <el-table-column prop="FCOUNT" label="笔数"></el-table-column>
        <el-table-column label="占比">
          <template slot-scope="props">
            <span v-text="props.row.FRATE==1?'100%':parseFloat(props.row.FRATE)*10000 / 100 + '%'"></span>
          </template>
        </el-table-column>
        <el-table-column label="更多" width="80">
          <template slot-scope="props">
            <el-button type="text" @click="getNewList(8,props.row)" class="no-padding">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>

    <el-dialog :title="title" :visible.sync="isShowList" width="90%" style="max-width:100%;">
      <listPage @closeModal="isShowList=false" :dataType="{'data':ruleFrom2,'state':isShowList}"></listPage>
    </el-dialog>

  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import MIXINS_REPORT from "@/mixins/report";
export default {
  mixins: [MIXINS_REPORT.SIDERBAR_MENU, MIXINS_REPORT.COMMOM_PAGE],
  data() {
    return {
      tableHeight: document.body.clientHeight - 330,
      pageList: [
        { label: "营业额", value: "SaleMoney", num: "SaleCount", id: 1 },
        { label: "充值", value: "AddMoney", num: "AddCount", id: 3 },
        { label: "还款", value: "PayOweMoney", id: 7 },
        { label: "会员消费", value: "SaleVipMoney", num: "SaleVipCount", id: 2 },
        { label: "支出", value: "ExpMoney", num: "ExpCount", id: 4 },
        { label: "欠款", value: "OweMoney", id: 6 },
        { label: "收支结余", value: "GainMoney", id: null }
      ],
      paywayList: [] // 支付
    };
  },
  computed: {
    ...mapGetters({
      dataData: "surplusReportData",
      dataState: "surplusReportState",
      dataList: "surplusReportList",
      dataListState: "surplusReportListState",
      dataListArr: "surplusReportListARR"
    })
  },
  watch: {
    dataListState(data){
      console.log(data)

    },
    dataState(data) {
      this.loading = false;
      if (data.success) {
        this.paywayList = [...this.dataData.PayList];
      }
    }
  },
  methods: {
    getNewData(data) {
      let shopList = data.ShopId.split(',')
      let str = '', id = ''
      for(let i in shopList){
          str += "'"+shopList[i] + "',"
      }
      if(str.length>0){  //去掉最后一个逗号
          str=str.substring(0,str.length-1)
      }
      data.ShopIdList = str

      this.$store.dispatch("getsurplusReportData", data).then(() => {
        this.loading = true;
        this.ruleFrom = Object.assign({}, data);
      });
    },
    getNewList(index, item) {

      let shopList = this.ruleFrom.ShopId.split(',')
      let str = '', id = ''
      for(let i in shopList){
          str += "'"+shopList[i] + "',"
      }
      if(str.length>0){  //去掉最后一个逗号
          str=str.substring(0,str.length-1)
      }
      this.ruleFrom.ShopIdList = str

      let sendData = {
        obj: { index: index, obj: "surplus" },
        data: Object.assign({}, this.ruleFrom)
      };

      this.ruleFrom2 = Object.assign({}, sendData);
      this.title = this.dataListArr[index].title;
      if (item) {
        // 支付明细
        this.ruleFrom2.data.PayTypeId = item.PAYTYPEID;
        this.title += '：'+item.PAYTYPENAME
      }
      this.$store.dispatch("clearsurplusReportList", index).then(() => {
        this.$store.dispatch("getsurplusReportList", sendData);
        this.loading = true
      });
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
    }
  },
  created() {
    this.$store.dispatch("getsurplusReportData", {ShopId: this.theShopId}).then(() => {
        this.loading = true;this.ruleFrom.ShopId = this.theShopId
    });
  },
  components: {
    'listPage': () => import("@/components/reports/management/tableList")
  }
};
</script>

