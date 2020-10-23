<template>
  <div class="row-flex flex-start">
    <!-- 营业概况 -->
    <section style="min-width:130px;margin-left:-10px;">
      <sidebarMenu :activePath="activePath" :routesList="routesList"></sidebarMenu>
    </section>
    <section class="bg-white marginLR-sm paddingTB-sm paddingLR-md full-width" :loading="loading">
      <div class="marginTB-sm">
        <el-button-group>
          <el-button
            v-for="(label,i) in ['今天','昨天','本月','上月','其它','全部']"
            :key="i"
            @click="chooseDate(i)"
            type="primary"
            size="small"
          >{{label}}</el-button>
        </el-button-group>

        <el-dropdown @command="shopCheckfun" class="m-left-sm">
          <el-button type="primary" size="small">
            <span v-text="shopCheck?shopList[shopCheckidx].NAME:'请选择店铺'"></span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item,i) in shopList" :key="i" :command="i">{{item.NAME}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div v-if="isShowDate" class="marginTB-sm">
        <el-date-picker
          ref="dateBE"
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
      <!--  -->
      <!-- <div v-if='Object.keys(dataData).length > 0' v-for="(item, i) in pageList" :key="i"></div> -->
      
    </section>

    <el-dialog :title="title" :visible.sync="isShowList" width="80%" style="max-width:80%;">
      <listPage @closeModal="isShowList=false" :dataType="{'data':ruleFrom2,'state':isShowList}"></listPage>
    </el-dialog>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import MIXINS_REPORT from "@/mixins/report";
export default {
  mixins: [MIXINS_REPORT.SIDERBAR_MENU],
  data() {
    return {
      pageList: [
        {
          title: "充值",
          totalMoney: 0,
          children: [
            // { label: "售卡金额", value: "RegVipMoney", id: 1 },
            { label: "储值充值", value: "AddMoney", id: 2 },
            // { label: "计次充值", value: "AddCountMoney", id: 3 },
            // { label: "套餐充值", value: "AddPackMoney", id: 4 }
          ]
        },
        {
          title: "消费",
          totalMoney: 0,
          children: [
            { label: "快速消费", value: "QuickSaleMoney", id: 5 },
            { label: "商品消费", value: "GoodsSaleMoney", id: 6 },
            // { label: "计次消费", value: "CountSaleQty", id: 7 },
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
      shopCheck: "",
      shopCheckidx: "",
      ruleFrom: {
        ShopId: "",
        BeginDate: "1",
        EndDate: "9999999999999"
      },
      isShowDate: false,
      dateBE: [],
      ruleFrom2: {},
      isShowList: false,
      loading: false,
      title: "",
    }; 
  },
  computed: {
    ...mapGetters({
      dataData: "businessData",
      dataState: "businessState",
      shopList: "shopList",
      dataList: "businessList",
      dataListState: "businessListState",
      dataListArr: "businessListARR"
    })
  },
  watch: {
    dataListState(data) {
      this.loading = false;
      if (data.success) {
        if (this.dataListArr[this.ruleFrom2.obj.index].List.length == 0) {
          this.$message(this.title + "，暂无数据");
        } else {
          this.isShowList = true;
        }
      } else {
        this.$message.error(data.message);
      }
    },
    dataState(data) {
      this.loading = false;
    },
  },
  methods: {
    getNewData() {
      this.$store.dispatch("getbusinessData", this.ruleFrom).then(() => {
        this.loading = true;
      })
    }, 
    shopCheckfun(index) {
      this.shopCheckidx = index;
      this.shopCheck = this.shopList[index];
      this.ruleFrom.ShopId = this.shopList[index];
      this.getNewData();
    },
    chooseDate(i) {
      switch (i) {
        case 0:
          this.ruleFrom.BeginDate = this.getTimeStamp();
          this.ruleFrom.EndDate = new Date().getTime();
          this.getNewData();
          break;
        case 1:
          this.ruleFrom.BeginDate = this.getTimeStamp(1);
          this.ruleFrom.EndDate = new Date().getTime();
          this.getNewData();
          break;
        case 2:
          let arr2 = this.getAroundMonth();
          this.ruleFrom.BeginDate = new Date(arr2[0]).getTime();
          this.ruleFrom.EndDate = new Date(arr2[1]).getTime();
          this.getNewData();
          break;
        case 3:
          let arr3 = this.getAroundMonth(this.getCustomDay(-28));
          this.ruleFrom.BeginDate = new Date(arr3[0]).getTime();
          this.ruleFrom.EndDate = new Date(arr3[1]).getTime();
          this.getNewData();
          break;
        case 4:
          this.isShowDate = !this.isShowDate;
          break;
        default:
          this.ruleFrom.BeginDate = "1";
          this.ruleFrom.EndDate = "9999999999999";
          this.getNewData();
      }
    },
    chooseDate2(v) {
      this.ruleFrom.BeginDate = v[0];
      this.ruleFrom.EndDate = v[1];
      this.getNewData();
    },
    defaultData() {
      if (this.shopList.length == 0) {
        this.$store.dispatch("getShopList", {});
      }
      this.ruleFrom = { ShopId: "", BeginDate: "1", EndDate: "9999999999999" }
    },
    // getNewList(index) {
    //   let sendData = { obj: { index: index },  data: Object.assign({}, this.ruleFrom) }
    //   this.ruleFrom2 = Object.assign({}, sendData);
    //   this.$store.dispatch("clearbusinessList",index).then(()=>{
    //     this.$store.dispatch("getbusinessList", sendData);
    //     this.title = this.dataListArr[index].title;
    //   });
    // }
  },
  beforeCreate() {
    this.$store.dispatch("getbusinessData", {});
  },
  components: {
    listPage: () => import("@/components/reports/management/tableList")
  }
};
</script>

