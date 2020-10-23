<template>
  <div>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="9" :lg="9" :xl="9">
        <div v-if="dataItem.VipObj" class="">
          <div class="row-flex flex-items-start flex-start">
            <div class="p-right-sm"><img :src="img" class="block" style="width:60px" /></div>
            <div class="col-flex flex-between" style="height:60px">
              <span>{{dataItem.VipObj.VIPNAME}}</span>
              <span>{{dataItem.VipObj.MOBILENO}}</span>
            </div>
          </div>
          <ul class="m-top-sm">
            <li class="paddingTB-sm paddingLR-xs border-bottom">
              <span>余额：</span><span class="pull-right text-red">{{dataItem.VipObj.MONEY}}</span>
            </li>
            <li class="paddingTB-sm paddingLR-xs border-bottom">
              <span>积分：</span><span class="pull-right text-red">{{dataItem.VipObj.INTEGRAL}}</span>
            </li>
            <li class="paddingTB-sm paddingLR-xs border-bottom">
              <span>次卡：</span><span class="pull-right text-red">{{dataItem.VipObj.COUPONNUM}}</span>
            </li>
            <li class="paddingTB-sm paddingLR-xs border-bottom">
              <span>欠款：</span><span class="pull-right text-red">{{dataItem.VipObj.OWEMONEY}}</span>
            </li>
            <li class="paddingTB-sm paddingLR-xs border-bottom">
              <span>消费次数：</span><span class="pull-right text-red">{{dataItem.VipObj.PAYCOUNT}}</span>
            </li>
            <li class="paddingTB-sm paddingLR-xs border-bottom">
              <span>消费金额：</span><span class="pull-right text-red">&yen;{{dataItem.VipObj.PAYMONEY}}</span>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="15" :lg="15" :xl="15">
        <div class="paddingLR-sm m-left-md">
          <ul v-if="dataItem.VipObj" class="border-bottom">
            <li class="p-bottom-md paddingLR-xs ">
              <span>最近一次消费：</span>
              <span class="">{{new Date(dataItem.VipObj.LASTTIME) | time}}</span>
              <span>【距今：<span v-text="farDate(dataItem.VipObj.LASTTIME)" class="text-red"></span>天】</span>
            </li>
            <li class="p-bottom-md paddingLR-xs ">
              <span>单次最高消费：</span><span class="text-red">&yen;{{dataItem.VipObj.MAXMONEY}}</span>
            </li>
            <li class="p-bottom-md paddingLR-xs ">
              <span>单次平均消费：</span><span class="text-red">&yen;{{dataItem.VipObj.AVGPRICE}}</span>
            </li>
          </ul>
          <div class="p-bottom-sm m-top-md">本次消费 <span class="m-left-sm inline-blcok">{{dataItem.SaleTime}}</span></div>
          <div>
            <img :src="img" class="block pull-left m-right-xs" style="width:38px" />
            <div>{{dataItem.GoodsObj.GOODSNAME}}</div>
            <div>{{dataItem.GoodsObj.QTY}}次</div>
          </div>

        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import {
    mapState,
    mapGetters
  } from "vuex";
  import img from "@/assets/userdefault.png"
  export default {
    data() {
      return {
        img: img,
      }
    },
    computed: {
      ...mapGetters({
        dataItem: 'serviceRevisitItem',
      })
    },
      methods:{
        farDate(date){
          var day1 = new Date(date);
          var day2 = new Date();
          var dateNum = (day2 - day1) / (1000 * 60 * 60 * 24)
          if(dateNum>=1){
            dateNum = parseInt(dateNum)
          }else{
            dateNum = 0
          }
          return dateNum
        }
      },
  }

</script>
