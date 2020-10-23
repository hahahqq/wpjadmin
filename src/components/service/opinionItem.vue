<template>
  <div>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="9" :lg="9" :xl="9">
        <div v-for="(item,i) in VipObj" :key="i" class="font-16 marginTB-sm">
          <span class="inline-block" style="width:120px;">{{item.label}}：</span>
          <span class="inline-block" v-if="item.value=='LASTTIME'">{{new Date(dataItem.VipObj.LASTTIME) |time }}</span>
          <span class="inline-block" v-else>{{dataItem.VipObj[item.value]}}</span>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="15" :lg="15" :xl="15">
        <div v-for="(item,i) in BillObj" :key="i" class="font-16 marginTB-sm">
          <div v-if="i==6" class="paddingTB-xs"></div>
          <div v-if="i==4" class="font-16 marginTB-sm">
            <span class="inline-block" style="width:120px;">店铺：</span>
            <span class="inline-block">{{shopName[0].NAME}}</span>
          </div>
          <span class="inline-block" style="width:120px;">{{item.label}}：</span>
          <span class="inline-block" v-if="item.value=='BILLDATE'||item.value=='WRITETIME'||item.value=='CHECKTIME'">{{new Date(dataItem.BillObj[item.value]) |time }}</span>
          <span class="inline-block" v-else-if="item.value=='ISCHECK'||item.value=='ISCANCEL'">{{dataItem.BillObj[item.value]?'是':'否' }}</span>
          <span class="inline-block" v-else>{{dataItem.BillObj[item.value]}}</span>
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
      BillObj: [
        { label: "单据号", value: "BILLNO" },
        { label: "单据日期", value: "BILLDATE" },
        { label: "操作人", value: "WRITER" },
        { label: "操作时间", value: "WRITETIME" },
        { label: "备注", value: "REMARK" },
        { label: "是否作废", value: "ISCANCEL" },
        { label: "是否已回复", value: "ISCHECK" },
        { label: "回复人", value: "CHECKER" },
        { label: "回复时间", value: "CHECKTIME" },
        { label: "回复内容", value: "CHECKREMARK" },
      ]
    };
  },
  computed: {
    ...mapGetters({
      dataItem: "sOpinionItem",
      shopList:'shopList'
    }),
    shopName(){
      return this.shopList.filter(item => item.ID == this.dataItem.BillObj.SHOPID)
    },
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
