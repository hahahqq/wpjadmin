<template>
  <div>
    <el-row v-if="dataItem" :gutter="10">
      <el-col :xs="9" :sm="9" :md="9" :lg="9" :xl="9">
        <div class="row-flex flex-items-stretch">
          <div class>
            <img
              :src="dataItem.SumInfo.IMAGEURL?dataItem.SumInfo.IMAGEURL:img"
              class="block"
              style="WIDTH: 60px; max-width: 70px;"
            >
          </div>
          <div class="col-flex flex-between full-width p-left-sm">
            <span>{{dataItem.SumInfo.NAME}}</span>
            <span class="hide">{{dataItem.SumInfo.CODE}}</span>
            <span class="hide">{{dataItem.SumInfo.SEX==0?'男':'女'}}</span>
            <span>{{dataItem.SumInfo.MOBILENO}}</span>
          </div>
        </div>
        <ul class="text-right clearfix m-top-md">
          <li class="paddingTB-sm">
            <span class="pull-left">余额<i class="opacity">余额</i>：{{dataItem.SumInfo.MONEY}}</span>
          </li>
          <li class="paddingTB-sm">
            <span class="pull-left">消费金额：{{dataItem.SumInfo.PAYMONEY}}</span>
          </li>
          <li class="paddingTB-sm">
            <span class="pull-left">消费次数：{{dataItem.SumInfo.PAYCOUNT}}</span>
          </li>
          <li class="paddingTB-sm">
            <span class="pull-left">积分<i class="opacity">积分</i>：{{dataItem.SumInfo.INTEGRAL}}</span>
          </li>
          <li class="paddingTB-sm">
            <span class="pull-left">次卡<i class="opacity">次卡</i>：{{dataItem.SumInfo.COUPONNUM}}</span>
          </li>
        </ul>
        <ul class="m-top-md">
            <li class="marginTB-sm">
              <span>最近一次消费：</span>
              <span v-text="dataItem.LastSaleTime?dataItem.LastSaleTime:'无'"></span>
            </li>
            <li class="marginTB-sm">
              <span>最高消费金额：</span>
              <span v-if="dataItem.MaxSaleMoney">{{dataItem.MaxSaleMoney}}</span>
              <span v-else>0</span>
            </li>
            <li class="marginTB-sm">
              <span>平均消费金额：</span>
              <span v-if="dataItem.OneSaleMoney">{{dataItem.OneSaleMoney}}</span>
              <span v-else>0</span>
            </li>
          </ul>
      </el-col>
      <el-col :xs="15" :sm="15" :md="15" :lg="15" :xl="15">
          <div v-if="goodsList.length>0" class="m-bottom-sm">
            <div>常消费商品</div>
            <div
              v-for="(item,i) in goodsList"
              :key="i"
              class="inline-block m-right-md marginTB-sm padding-sm border"
              style="min-width:150px"
            >
              <div>{{item.GOODSNAME}}</div>
              <div>
                <span>&yen;{{item.MONEY}}</span>
                <span class="pull-right">{{item.QTY}}</span>
              </div>
            </div>
          </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import img from "@/assets/userdefault.png";
export default {
  props: {
    dataType: {
      type: Object,
      default: {
        obj: { index: 1, obj: "surplus" },
        data: { ShopId: "", BeginDate: "1", EndDate: "9999999999999" }
      }
    }
  },
  data() {
    return {
      img: img
    };
  },
  computed: {
    ...mapGetters({
      goodsList: "memberReportList",
      dataItemState: "memberReportListState",
      dataItem: "memberReportItem"
    })
  }
};
</script>
<style scoped>
.infoText {
  height: 40px;
  line-height: 40px;
  padding: 0 10px;
}
.infoText span:first-child {
  display: inline-block;
  width: 60px;
}
</style>

