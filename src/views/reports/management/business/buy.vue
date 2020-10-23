<template>
  <div class="full-width">
    <!-- <section class="bg-white marginLR-sm paddingTB-sm paddingLR-md full-width" v-loading="loading"> -->

      <div class="content-new-fex" v-if="this.isPurViewFun(91040108)">
        <div class="content-eighty m-bottom-sm bg-white">
            <div class="content-center">
              <filtePage @getNewData="getNewData" :isAll="true"></filtePage>
            </div>
        </div>

        <div class="content-table4">
            <div class="content-table-center">
              <div v-if='Object.keys(dataData).length>0' :style="`height:${tableHeight}px; margin-top: 10px`">
                <div v-for="(item, i) in pageList" :key="i">
                  <div class="p-top-sm">
                    <span class>{{item.title}}</span>
                  </div>
                  <div v-for="(sub, j) in item.children" :key="j" class="inline-block margin-sm padding-sm border" style="width:150px">
                    <div>
                      <span>{{sub.label}}</span>
                      <el-button type="text" v-if="sub.label != '积分兑换' && sub.label != '商品库存'" :disabled='dataData[sub.value] == 0' @click="isIndexSix=false;getNewList(sub.id, dataData[sub.value], sub.label)" class="pull-right no-padding" >详情</el-button>
                    </div>
                    <div class="text-left p-top-sm">
                      <span v-if="i==0">&yen;</span>
                      <span v-if="i==1 && j== 0">&yen;</span>
                      <span v-text="dataData[sub.value] ? dataData[sub.value] : 0" class="font-600"></span>
                      <span v-if="i==1 && j== 1">次</span>
                      <span v-if="i==1 && j== 3">积分</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>

      <div v-else style="height: 500px; background:#fff; text-align:center; color:#999; margin: 10px 10px" >
        <img src="static/images/emptyData.png" alt="" style="margin-top: 100px">
        <div>没有此功能权限，请联系管理员授权</div>
      </div>
    <!-- </section> -->

    <el-dialog
      :title="title"
      :visible.sync="isShowList"
      width="90%"
      top="6%"
      style="max-width:100%;"
    >

    <!-- {{ruleFrom2.obj}} -->
      <listPage
        v-if="isShowList"
        @closeModal="isShowList=false"
        @resetModel="getNewList2"
        :dataType="{'data':ruleFrom2,'state':isShowList}"
      >
        <slot>
          <div style="display:none">
            <!-- date -->
            <el-date-picker
              v-model="dateBE"
              type="daterange"
              value-format="timestamp"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              class
            ></el-date-picker>
            <!-- search -->
            <el-input
              type="default"
              v-model.trim="searchText"
              placeholder="会员手机号/卡号/姓名"
              class="m-bottom-sm"
              style="width: 250px;"
            >
              <el-button
                slot="append"
                type="default"
                @click="isIndexSix=true;getNewList(6)"
              >查询</el-button>
            </el-input>
            <!-- shop -->
            <el-dropdown @command="shopCheckfun" class="m-left-sm pull-right">
              <el-button type="primary" size="small" plain>
                <span v-text="shopCheckText?shopCheckText:'请选择店铺'"></span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="-1">全部店铺</el-dropdown-item>
                <el-dropdown-item v-for="(item,i) in shopList" :key="i" :command="i">{{item.NAME}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </slot>
      </listPage>
    </el-dialog>
  </div>
  <!-- 营业概况 -->
</template>
<script>
import { mapState, mapGetters } from "vuex";
import MIXINS_REPORT from "@/mixins/report";
export default {
  mixins: [MIXINS_REPORT.SIDERBAR_MENU, MIXINS_REPORT.COMMOM_PAGE],
  data() {
    return {
      tableHeight: document.body.clientHeight - 100,
      pageList: [
        {
          title: "充值",
          totalMoney: 0,
          children: [
            { label: "储值充值", value: "AddMoney", id: 2 },
          ]
        },
        {
          title: "消费",
          totalMoney: 0,
          children: [
            // { label: "快速消费", value: "QuickSaleMoney", id: 5 },
            { label: "商品消费", value: "GoodsSaleMoney", id: 6 },
            { label: "积分兑换", value: "ExchangeCount", id: 8 }
          ]
        },
        {
          title: "其它",
          totalMoney: 0,
          children: [
            { label: "支出统计", value: "ChargesMoney", id: 9 },
            { label: "新增会员", value: "NewVipQty", id: 10 },
            { label: "商品库存", value: "StockQty", id: 11 }
          ]
        }
      ],
      searchText: "",
      dateBE: [],
      sshopStr: "",
      sshopID: "",
      shopCheckText: "全部店铺",
      shopCheckidx: -1,
      isIndexSix: false
    };
  },
  computed: {
    ...mapGetters({
      dataData: "businessReportData",
      dataState: "businessReportState",
      dataList: "businessReportList",
      dataListState: "businessReportListState",
      dataListArr: "businessReportListARR",
      shopList: "shopList"
    })
  },
  watch: {
    dataListArr(data){
      console.log(data)
    },
    dataState(data) {
      this.loading = false;
    }
  },
  methods: {
    getNewData(data) {
      // 当前数据
      this.dateBE[0] = data.BeginDate;
      this.dateBE[1] = data.EndDate;
      this.$store.dispatch("getbusinessReportData", data).then(() => {
        this.loading = true;
        this.ruleFrom = Object.assign({}, data);
        this.isIndexSix = false;
      });
    },
    getNewList(index, value, title) {
      console.log(value)
      console.log(index)
      console.log(title)
      if(value == 0){
        this.$message(`${title} ，暂无数据`)
      }else{
        let sendData = {
          obj: { index: index, obj: "business" },
          data: Object.assign({}, this.ruleFrom)
        };
        if (index == 6 && this.isIndexSix) {
          sendData.data = {
            ShopId: this.shopCheckidx == -1 ? this.sshopStr : this.sshopID,
            BeginDate: this.dateBE[0],
            EndDate: this.dateBE[1],
            Filter: this.searchText
          }
          this.loading = false;
        } else {
          this.sshopID = "";
          this.dateBE = [];
          this.searchText = "";
          this.loading = true;
        }
        this.ruleFrom2 = Object.assign({}, sendData);
        // this.$store.dispatch("clearbusinessReportList", index).then(() => {
          this.$store.dispatch("getbusinessReportList", sendData);
          this.title = this.dataListArr[index].title;
        // });
        this.sshopStrFun();
      }
    },
    getNewList2(data){
      console.log(data)
      // this.getNewList(data.index)
    },
    sshopStrFun() {
      if (!this.sshopStr) {
        let str = "";
        for (let i = 0; i < this.shopList.length; i++) {
          str += this.shopList[i].ID;
          if (i < this.shopList.length - 1) {
            str += ",";
          }
        }
        this.sshopStr = str;
        this.$store.dispatch("selectingShop", {})
      }
    },
    shopCheckfun(index) {
      if (index == -1) {
        this.shopCheckidx = -1;
        this.shopCheckText = "全部店铺";
        this.sshopStrFun();
        this.sshopID = '';
      } else {
        this.shopCheckidx = index;
        this.shopCheckText = this.shopList[index].NAME;
        this.sshopID = this.shopList[index].ID;
        this.$store.dispatch("selectingShop", {
          ID: this.shopList[index].ID,
          NAME: this.shopList[index].NAME
        })
      }
      this.isIndexSix = true;
      this.getNewList(6);
    }
  },
  created() {
    let sendData = {
      ShopId: this.theShopId,
      BeginDate: this.getTimeStamp(),
      EndDate: new Date().getTime()
    }
    this.$store.dispatch("getbusinessReportData", sendData).then(() => {
      this.loading = true;
      this.ruleFrom.ShopId = this.theShopId;
      this.$store.dispatch("selectingShop", {
        ID: this.theShopId,
        NAME: this.theShopName
      })
    });
  },
  components: {
    listPage: () => import("@/components/reports/management/tableList")
  }
};
</script>