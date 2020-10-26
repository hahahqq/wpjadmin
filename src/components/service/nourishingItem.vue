<template>
  <div>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="9" :lg="9" :xl="9">
        <div class="row-flex flex-items-start flex-start">
          <div class="p-right-sm">
            <img
              :src="dataItem.VipObj.IMAGEURL ? dataItem.VipObj.IMAGEURL : img"
              class="block"
              style="width: 60px"
            />
          </div>
          <div class="col-flex flex-between" style="height: 60px">
            <span>{{ dataItem.VipObj.VIPNAME }}</span>
            <span>{{ dataItem.VipObj.MOBILENO }}</span>
          </div>
        </div>
        <div v-for="(item, i) in VipObj" :key="i" class="font-16 marginTB-sm" v-show="i > 2">
          <span class="inline-block" style="width: 120px">{{ item.label }}：</span>
          <span class="inline-block" v-if="item.value == 'LASTTIME'">
            {{ new Date(dataItem.VipObj.LASTTIME) | time }}
          </span>
          <span class="inline-block" v-else>{{ dataItem.VipObj[item.value] }}</span>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="15" :lg="15" :xl="15">
        <div v-for="(item, i) in pageList" :key="i" class="font-16 marginTB-sm">
          <span class="inline-block" style="width: 120px">{{ item.label }}：</span>
          <span class="inline-block">{{ dataItem[item.value] }}</span>
        </div>
        <div class="paddingTB-xs"></div>
        <div v-for="(item, i) in GoodsObj" :key="i" class="font-16 marginTB-sm">
          <span class="inline-block" style="width: 120px">{{ item.label }}：</span>
          <span class="inline-block">{{ dataItem.GoodsObj[item.value] }}</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import img from "@/assets/userdefault.png";
export default {
  data() {
    return {
      img: img,
      VipObj: [
        { label: "会员名称", value: "VIPNAME" },
        { label: "编号", value: "VIPCODE" },
        { label: "电话号码", value: "MOBILENO" },
        { label: "余额", value: "MONEY" },
        { label: "积分", value: "INTEGRAL" },
        { label: "消费次数", value: "PAYCOUNT" },
        { label: "消费金额", value: "PAYMONEY" },
        { label: "最近一次消费", value: "LASTTIME" },
        { label: "单次最高消费", value: "MAXMONEY" },
        { label: "单次平均消费", value: "AVGPRICE" }
      ],
      GoodsObj: [
        { label: "商品", value: "GOODSNAME" },
        { label: "价格", value: "PRICE" },
        { label: "数量", value: "QTY" },
        { label: "支付价格", value: "PAYPRICE" },
        { label: "销售数量", value: "SALECOUNT" },
        { label: "回访次数", value: "CYCLEDAY" },
        { label: "剩余次数", value: "CALCCOUNT" }
      ],
      pageList: [
        { label: "回访日期", value: "CycleTime" },
        { label: "回访内容", value: "CycleRemark" },
        { label: "回访员工", value: "CycleEmp" },
        { label: "提醒方式", value: "CycleType" }
      ]
    };
  },
  computed: {
    ...mapGetters({
      dataItem: "sNourishingItem",
      shopList: "shopList"
    }),
    shopName() {
      return this.shopList.filter((item) => item.ID == this.dataItem.BillObj.SHOPID);
    }
  },
  methods: {
    farDate(date) {
      var day1 = new Date(date);
      var day2 = new Date();
      var dateNum = (day2 - day1) / (1000 * 60 * 60 * 24);
      if (dateNum >= 1) {
        dateNum = parseInt(dateNum);
      } else {
        dateNum = 0;
      }
      return dateNum;
    }
  }
};
</script>
