<template>
  <div>
    <slot></slot>
    <!-- {{tableColumn}} -->
    <div class="hide">{{pagelist}}</div>
    <!--列表-->
    <el-table
      border size='small'
      :data="pagelist"
      v-loading="loading"
      height='400px'
      header-row-class-name="bg-f1f2f3"
      style="width: 100%;"
    >
      <el-table-column v-for="(item,i) in tableColumn" :key="i" :label="item.label">
        <template slot-scope="scope">
          <div v-if="dataObj.obj=='business'">
            <img
              v-if="item.prop=='IMAGEURL'"
              :src="scope.row[item.prop]"
              style="width:78px;"
              alt="图片"
            >
            <span v-else-if="item.prop=='ISCANCEL'">{{scope.row[item.prop]?'启用':'作废'}}</span>

            <span v-else-if="item.prop=='RECEVINGPIRCE' || item.prop=='PROFITMONEY'">
              {{ isPurViewFun(91040112) ? scope.row[item.prop] : '***' }}
            </span>

            <span v-else>{{scope.row[item.prop]}}</span>

          </div>

          <div v-else-if="dataObj.obj=='registered'">
            <span v-if="item.prop=='CREATEDATE'">{{new Date(scope.row[item.prop])| time}}</span>
            <span v-else>{{scope.row[item.prop]}}</span>
          </div>

          <div v-else>
            <img
              v-if="item.prop=='IMAGEURL'"
              :src="scope.row[item.prop]"
              style="width:40px; height:40px"
              alt="图片"
            >
            <span v-else-if="item.prop=='STATUS'">{{scope.row[item.prop]?'启用':'作废'}}</span>
            <span v-else-if="item.prop=='BILLDATE'">{{new Date(scope.row[item.prop])| time}}</span>
            <!-- <span v-else>{{scope.row[item.prop]}}</span> -->
            <span v-if="item.label != '毛利'">
              {{scope.row[item.prop]}}
            </span>

            <span v-if="item.label == '毛利'">
              <i v-if="!isPurViewFun(91040112)"> **** </i>
              <i v-else>{{scope.row[item.prop]}}</i>
            </span>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        label="状态"
        v-if="dataObj.obj=='business'&&dataListArr[dataObj.index].caneclCode"
      >
        <template slot-scope="props">
          <div v-if="props.row.BILLID||props.row.ID">{{props.row.ISCANCEL?'已作废':'已启用'}}</div>
        </template>
      </el-table-column>
      <!-- <el-table-column
        label="更多"
        v-if="dataObj.obj=='business'"
        :width="dataListArr[dataObj.index].caneclCode?120:80"
      >
        <template slot-scope="props">
          <div v-if="props.row.BILLID||props.row.ID||props.row.GOODSID">
            <div v-if="dataListArr[dataObj.index].caneclCode">
              <el-button v-if='!props.row.ISCANCEL' type="text" plain @click="toCancelFun(props.row)" size="small">{{props.row.ISCANCEL ? '' : '作废'}}</el-button>
              <el-button style='marign-left:20px' type="text" @click="toPrintFun(props.row)" size="small">打印</el-button>
            </div>
            <div v-else>
              <el-button
                v-if="
              dataObj.index==6||
              dataObj.index== 8 ||
              dataObj.index==7||
              dataObj.index==10||
              dataObj.index==11"
                type="text"
                plain
                size="small"
                @click="getItemFun(props.row)"
              >详情</el-button>
              <el-button v-else type="text" style='marign-left:20px' @click="toPrintFun(props.row)" size="small">打印</el-button>
            </div>
          </div>
        </template> -->
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

    <!-- item -->
    <el-dialog v-if='dataObj.index != 10' width="800px" :title="title" :visible.sync="isShowItem" append-to-body>
      <components v-if='dataObj.index != 10'
        :is="componentName"
        @closeModal="isShowItem=false"
        :pageState="isShowItem"
        :isReport="componentName=='memberItem'?true:false"
      ></components>

        <!-- 会员详情 -->
        <components v-else
        :is="componentName"
        @closeModal="isShowItem=false"
        :pageState="isShowItem"
        :dataProfile='dataProfile'
        :isReport="componentName=='memberItem'?true:false"
      ></components>
    </el-dialog>

  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import { columnData } from "./Table";
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
      pagelist: [],
      loading: false,
      pagination: {
        TotalNumber: 0,
        PageNumber: 0,
        PageSize: 20,
        PN: 0
      },
      pageData: { PN: 0 },
      tableColumn: [],
      dataObj: {},
      isShowItem: false,
      componentName: "",
      title: "",
      dataProfile:{
        obj:{},
        total:{}
      }
    };
  },
  computed: {
    ...mapGetters({
        dataList: "businessReportList",
      // businessReportGroup: "businessReportListState",
      dataListState: "businessReportListState",
      dataListArr: "businessReportListARR",
      selshop: "selshop",
      dataState: "memberState",
      dataState2: 'memberState2',
      cancelState: "cancelbusinessState",
      dataListState1: "surplusReportListState",
      // saleReportListState
    }),
    // dataList: function() {
    //   let name = this.$route.meta.name;
    //   if (name == "balance") {
    //     return this.$store.state["report_" + name].integralBalanceList;
    //   }
    //   let data = this.$store.state["report_" + name][name + "ReportList"];
    //   return data;
    // },
    // dataListState: function() {
    //   let name = this.$route.meta.name;
    //   if (name == "balance") {
    //     return this.$store.state["report_" + name].integralBalanceListState;
    //   }
    //   let data = this.$store.state["report_" + name][name + "ReportListState"];
    //   return data;
    // }
  },
  watch: {
    dataList(data){
      console.log(data)
    },
    dataListState(data){
      this.loading = false;
      if (data.success) {
        console.log(this.dataObj)
        this.tableColumn = columnData[this.dataObj.obj][this.dataObj.index];
        this.pagelist = data.List
        console.log(data.List)
        this.pagination = {
          TotalNumber: data.paying.TotalNumber,
          PageNumber: data.paying.PageNumber,
          PageSize: data.paying.PageSize,
          PN: data.paying.PN
        };
        this.pageData.PN = data.paying.PN;

      } else {
        this.pagelist = [];
      }
    },
    dataListState1(data){
      this.loading = false;
      if (data.success) {
        this.pagelist = data.List
        this.pagination = {
          TotalNumber: data.paying.TotalNumber,
          PageNumber: data.paying.PageNumber,
          PageSize: data.paying.PageSize,
          PN: data.paying.PN
        };
        this.pageData.PN = data.paying.PN;

      } else {
        this.pagelist = [];
      }
    },
    dataType(data) {
      // this.pagelist = [];
      if (data.state) {
        // console.log('23')
        this.defaultData();
      }
    },
    isShowItem(v) {
      this.loading = false;
    },
    dataState(data) {
      if (data.success) {
        this.showItem = true;
        this.dataProfile.obj = data.data.obj
      }
    },
    dataState2(data){
      if(data.success){
        this.dataProfile.total = data.data
      }
    },
    cancelState(data) {
      this.$message({
        message: data.success ? "作废成功" : data.message,
        type: data.success ? "success" : "error"
      });
      if (data.success) {
        this.$emit("resetModel", this.dataObj);
      }
    }
  },
  methods: {
    getNewData() {
      let obj = Object.assign({}, this.dataType.data.data, this.pageData);
      let sendData = {
        obj: this.dataType.data.obj,
        data: obj
      }

      this.$store.dispatch(this.dataType.data.obj.obj == 'business' ? 'getbusinessReportList' : 'getsurplusReportList', sendData).then(() => {
        this.loading = true;
      });
    },
    handlePageChange: function(currentPage) {
      if (this.pageData.PN == currentPage || this.loading) {
        return;
      }
      this.pageData.PN = parseInt(currentPage);
      this.getNewData();
    },
    defaultData() {
      // this.dataObj = this.dataType.data.obj;
      // console.log(this.dataObj.obj, this.dataObj.index)
      // this.tableColumn = columnData[this.dataObj.obj][this.dataObj.index];

      // this.pagelist = [...this.dataList];
      // this.pagination = {
      //   TotalNumber: this.dataListState.paying.TotalNumber,
      //   PageNumber: this.dataListState.paying.PageNumber,
      //   PageSize: this.dataListState.paying.PageSize,
      //   PN: this.dataListState.paying.PN
      // };
      // this.pageData.PN = this.dataListState.paying.PN;
      this.dataObj = this.dataType.data.obj;

      console.log(this.dataObj)

      this.tableColumn = columnData[this.dataObj.obj][this.dataObj.index];
      let obj = Object.assign({}, this.dataType.data.data, this.pageData);
      let sendData = {
        obj: this.dataType.data.obj,
        data: obj,
        dateStr: this.dataType.data.data
      }

      this.$store.dispatch(this.dataType.data.obj.obj == 'business' ? 'getbusinessReportList' : 'getsurplusReportList', sendData).then(() => {
        this.loading = true;
      });


    },
    getItemFun(item) {
      console.log(this.dataObj)
      // 详情
      // this.loading = true;
      if (this.dataObj.obj == "achievement") { // 业绩统计
        //   [
        //   { label: "售卡提成", value: "EmpMoney1", index: 1 },
        //   { label: "充值提成", value: "EmpMoney2", index: 2 },
        //   { label: "快速消费提成", value: "EmpMoney3", index: 3 },
        //   { label: "商品消费提成", value: "EmpMoney4", index: 4 },
        //   { label: "计次消费提成", value: "EmpMoney5", index: 5 }
        // ]
      }
      if (this.dataObj.obj == "business") {
        if (this.dataObj.index == 6) {
          this.componentName = "goodsItem";
          this.title = "商品消费单号：" + item.BILLNO;
          this.$store.dispatch("getCCGoodsItem", {
            BillId: item.BillId,
            ShopId: item.SHOPID
          });
        }
        if (this.dataObj.index == 7) {
          this.componentName = "numberItem";
          this.title = "计次消费单号：" + item.BILLNO;
          this.$store.dispatch("getCCNumberItem", {
            BillId: item.BillId,
            ShopId: item.SHOPID
          });
        }
        if (this.dataObj.index == 10) {
          this.componentName = "memberItem";
          this.title = "会员详情";
          console.log(item)
          this.$store.dispatch("getMemberItem", item).then(() => {
            this.$store.dispatch("getMemberItem2", item);
          });
        }
        if (this.dataObj.index == 11) {
          this.componentName = "goodsItem";
          this.title = "商品出入记录：" + item.GOODSNAME;
          this.$store.dispatch('getSalesDetails',item)
        }
      }
      // setTimeout(() => {
        this.isShowItem = true;
      // }, 500);
    },
    toCancelFun(item) {
      // 作废 营业概况 this.dataObj.obj=='business'
      if (!this.dataListArr[this.dataObj.index].caneclCode) return;
      let title = this.dataListArr[this.dataObj.index].caneclTitle;
      title += "：" + item.BILLNO;
      this.$confirm(title, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let sendData = {
            obj: this.dataObj,
            data: { BillId: item.BILLID }
          };
          if (this.dataObj.index == 8) {
            sendData.ShopId = item.SHOPID;
          }
          this.$store.dispatch("cancelbusinessBills", sendData);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消作废"
          });
        });
    },
    toPrintFun(item) {
      // 打印
      console.log(item);
    }
  },
  mounted() {
    this.defaultData();
  },
  updated(){
    console.log(this.dataType)
  },
  components: {
    goodsItem: () => import("@/components/consumptionCheckout/CCGoodsItem.vue"),
    numberItem: () =>
      import("@/components/consumptionCheckout/CCNumberItem.vue"),
    memberItem: () => import("@/views/member/item.vue"),
    'goodsItem':() => import("@/components/reports/management/goods.vue"),
  }
};
</script>

