<template>

<el-container >
      <el-container :style="`height:${windowHeight}px; overflow:auto`" v-if="this.isPurViewFun(91040407)">
        <div class="content-new-fex-goods full-width padding-sm"  >
          <div class="content-eighty" >
              <div class="content-center">
                <div class="pull-right marginTB-sm" style="display:none">
                  <el-input
                    type="default"
                    size="small"
                    v-model="searchText"
                    placeholder="会员手机号/卡号/姓名"
                    style="width: 250px;"
                  >
                    <el-popover slot="append" placement="bottom-end" width="660" trigger="click" title="搜索结果">
                      <div class="border border-color">
                        <el-table
                          border
                          :data="memberList"
                          v-loading="loading2"
                          :height='tableHeight'
                          class="full-width"
                        >
                          <el-table-column prop="NAME" label="会员名"></el-table-column>
                          <el-table-column prop="CODE" label="会员编号"></el-table-column>
                          <el-table-column prop="SEX" label="性别" :formatter="formatSex"></el-table-column>
                          <el-table-column prop="MOBILENO" label="手机号" width="110"></el-table-column>
                          <el-table-column prop="SHOPNAME" label="店铺"></el-table-column>
                          <el-table-column prop="PAYMONEY" label="消费金额"></el-table-column>
                          <el-table-column label="更多">
                            <template slot-scope="props">
                              <el-button type="text" @click="getNewItem(props.row.ID)" class="no-padding">详情</el-button>
                            </template>
                          </el-table-column>
                        </el-table>
                      </div>
                      <el-button slot="reference" type="default" icon="el-icon-search" @click="searchfun"></el-button>
                    </el-popover>
                  </el-input>
                </div>

                <filtePage @getNewData="getNewData" :isAll="true"></filtePage>
              </div>
          </div>

          <div class="content-table-goods bg-white m-top-sm">
            <div class="content-table-center" >

              <div class="inline-block m-right-md m-bottom-sm padding-sm border" style="width:150px">
                <div>新增会员</div>
                <div><span class='text-red'>{{dataInfo.AddVip}}</span></div>
              </div>
              <div class="inline-block m-right-md m-bottom-sm padding-sm border" style="width:150px">
                <div>会员总数</div>
                <div><span class='text-red'>{{dataInfo.VipCount}}</span></div>
              </div>
              <div class="inline-block m-right-md m-bottom-sm padding-sm border" style="width:150px">
                <div>会员充值</div>
                <div><span class='text-red'>{{dataInfo.AddMoney}}</span></div>
              </div>
              <div class="inline-block m-right-md m-bottom-sm padding-sm border" style="width:150px">
                <div>会员消费</div>
                <div><span class='text-red'>{{dataInfo.SaleVipMoney}}</span></div>
              </div>
              <!-- chat -->
              <echart-pie
                :pieData="echartData"
                class="border padding-sm m-top-sm m-bottom-sm"
                style="border-width:5px;"
              ></echart-pie>

              <!-- table-->
              <el-table size='small'
                border
                :data="tebleList"
                header-row-class-name="bg-f1f2f3"
                class="full-width"
                :height="tableHeight"
              >
                <el-table-column prop="RN" label="排名" width="80" align="center"></el-table-column>
                <el-table-column prop="VIPNAME" label="会员名"></el-table-column>
                <el-table-column prop="VIPCODE" label="会员编号"></el-table-column>
                <el-table-column prop="SEX" label="性别" :formatter="formatSex" align="center"></el-table-column>
                <el-table-column prop="MOBILENO" label="手机号"></el-table-column>
                <el-table-column prop="SHOPNAME" label="店铺"></el-table-column>
                <el-table-column prop="SALEMONEY" label="消费金额"></el-table-column>
                <el-table-column label="更多" width="80">
                  <template slot-scope="props">
                    <el-button type="text" @click="getNewItem(props.row.VIPID)" class="no-padding">详情</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <!-- 分页 -->
              <div class="m-top-sm clearfix elpagination" v-if='pagination.TotalNumber > 20'>
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

              <el-dialog :title="title" :visible.sync="isShowList" width="66%" style="max-width:100%;">
                <itemPage @closeModal="isShowList=false" :dataType="{'data':ruleFrom2,'state':isShowList}"></itemPage>
              </el-dialog>

            </div>

          </div>
        </div>
      </el-container>

      <div v-else style="height: 500px; width: 100%; background:#fff; text-align:center; color:#999; margin: 10px 10px" >
        <img src="static/images/emptyData.png" alt="" style="margin-top: 100px">
        <div>没有此功能权限，请联系管理员授权</div>
      </div>

</el-container>
  <!-- 会员分析 -->
</template>
<script>
import { mapState, mapGetters } from "vuex";
import MIXINS_REPORT from "@/mixins/report";
import MIXINS_INDEX from "@/mixins/index";
export default {
  mixins: [
    MIXINS_REPORT.SIDERBAR_MENU,
    MIXINS_REPORT.COMMOM_PAGE,
    MIXINS_INDEX.IS_SHOW_POPUP
  ],
  data() {
    return {
      windowHeight:window.innerHeight -80,
      tableHeight: document.body.clientHeight - 200,
      pageList: [
        { label: "新增会员", value: "VIPADDQTY" },
        { label: "会员总数", value: "VIPQTY" },
        { label: "会员充值", value: "ADDMONEY" },
        { label: "会员消费", value: "VIPMONEY" },
        { label: "VIPTOTALQTY", value: "VIPTOTALQTY" },
        { label: "会员消费比率", value: "VIPRATE" },
        { label: "客户数", value: "CLIENTQTY" },
        { label: "客户消费", value: "CLIENTMONEY" },
        { label: "客户消费比率", value: "CLIENTRATE" },
        { label: "总额", value: "MONEY" }
      ],
      tebleList: [],
      pagination: {
        TotalNumber: 0,
        PageNumber: 0,
        PageSize: 20,
        PN: 0
      },
      pageData: { PN: 1 },
      echartData: {
        title: "会员分析",
        legend: ["散客", "会员"],
        series: []
      },
      searchText: "",
      searchOptions: [],
      loading2: false,
      dataInfo1:{}
    };
  },
  computed: {
    ...mapGetters({
      dataData: "memberReportData",
      dataState: "memberReportState",
      dataInfo:'memberReportDataObj',
      dataList: "memberReportList",
      dataListState: "memberReportListState",
      dataListArr: "memberReportListARR",
      memberList: "memberList",
      memberListState: "memberListState"
    })
  },
  watch: {
    dataState(data) {
      this.loading = false;
      if (data.success) {
        this.defaultData();
      }
    },
    memberListState(data) {
      this.loading2 = false;
      this.searchText = "";
    }
  },
  methods: {
    getNewData(data) {
      if(!this.isPurViewFun(91040407)){
        this.$message.warning('没有此功能权限，请联系管理员授权!')
        return
      }
      let sendData = Object.assign({}, data);
      this.$store.dispatch("clearmemberReportList2").then(() => {
        let shopList = sendData.ShopId.split(',')
        let str = '', id = ''
        for(let i in shopList){
            str += "'"+shopList[i] + "',"
        }
        if(str.length>0){  //去掉最后一个逗号
            str=str.substring(0,str.length-1)
        }
        sendData.ShopId = str

        this.$store.dispatch("getmemberReportData", sendData);
        this.loading = true;
        this.ruleFrom = Object.assign({}, sendData);
        this.pageData.PN = 1;
      });
    },
    getNewItem(id) {
      let index = 0;
      let sendData = {
        obj: { index: index, obj: "member" },
        data: Object.assign({}, this.ruleFrom, { VipId: id })
      };
      this.ruleFrom2 = Object.assign({}, sendData);
      this.$store.dispatch("clearmemberReportList", index).then(() => {
        this.$store.dispatch("getmemberReportList", sendData);
        this.title = this.dataListArr[index].title;
      });
    },
    handlePageChange: function(currentPage) {
      if (this.pageData.PN == currentPage || this.loading) {
        return;
      }
      this.pageData.PN = parseInt(currentPage);
      this.$store.dispatch(
        "getmemberReportData",
        Object.assign({}, this.ruleFrom, this.pageData)
      ).then(() => {
        this.loading = true;
      });
    },
    defaultData() {
      this.tebleList = [...this.dataData.List];
      this.pagination = {
        TotalNumber: this.dataData.paying.TotalNumber,
        PageNumber: this.dataData.paying.PageNumber,
        PageSize: this.dataData.paying.PageSize,
        PN: this.dataData.paying.PN
      }
      this.pageData.PN = this.dataData.paying.PN;
      this.drawPie();
    },
    formatSex: function(row, column) {
      return row.SEX == 1 ? "女" : "男";
    },
    drawPie() {
      // 绘图
      this.echartData.series = [
        {
          value: this.dataInfo.AmountPercent[0].PAYMONEY,
          name: "散客",
          itemStyle: { color: "#87CEFA" }
        },
        {
          value: this.dataInfo.AmountPercent[1].PAYMONEY,
          name: "会员",
          itemStyle: { color: "#6495ED" }
        }
      ];
      this.isChangePropsState = !this.isChangePropsState;
    },
    searchfun() {
      if (this.searchText) {
        this.$store
          .dispatch("getMemberList", { Filter: this.searchText, PN: 1 })
          .then(() => {
            this.loading2 = true;
          });
      }
    }
  },
  created() {
    if(!this.isPurViewFun(91040407)){
      // this.$message.warning('没有此功能权限，请联系管理员授权!')
      this.tebleList = []
      return
    }
    this.$store.dispatch("getmemberReportData", {ShopId: "'"+this.theShopId+"'"}).then(() => {
        this.loading = true;
        this.ruleFrom.ShopId = this.theShopId
    });
  },
  components: {
    "echart-pie": () => import("@/components/other/echartPie.vue"),
    itemPage: () => import("@/components/reports/analysis/member.vue"),
    headerPage: () => import("@/components/header")
  }
};
</script>

<style scoped>
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





