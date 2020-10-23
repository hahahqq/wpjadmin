<template>
<el-container>
  <el-header style="height:50px;">
    <headerPage></headerPage>
  </el-header>
  <el-container>
    <el-aside width="100px">
        <section style="min-width:100px;">
            <memberMenu :activePath="activePath" :routesList="routesList" :width="100"></memberMenu>
        </section>
    </el-aside>
    <el-container>
        <div class="content-new-fex-shop">
            <div class="content-eighty">
                <div class="content-center">
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

            <div class="content-table-shop" :style="{height:tablename+'px'}">
                <div class="content-table-center">
                    <div id='tableStock'>
                        <table class='tableStock' border="0" cellspacing='0' cellpadding='15' width='100%' style=" height:auto; empty-cells:show; background:#f8f8f8; text-align:center">
                            <tr>
                                <th style="border-right: 1px solid #ebeef5; text-align:center; border-bottom: 1px solid #ebeef5; padding: 8px 0" rowspan="2">店铺</th>
                                <th style="border-right: 1px solid #ebeef5; text-align:center; border-bottom: 1px solid #ebeef5; padding: 8px 0" rowspan="2">营业实收</th>
                                <th style="border-right: 1px solid #ebeef5; text-align:center; border-bottom: 1px solid #ebeef5; padding: 8px 0" rowspan="2">
                                    <el-tooltip class="item" effect="dark" content="客单价=销售金额/销售笔数" placement="top-start">
                                        <span>客单价 <i class="el-icon-info"></i></span>
                                    </el-tooltip>
                                </th>
                                <th style="border-right: 1px solid #ebeef5; text-align:center; border-bottom: 1px solid #ebeef5; padding: 8px 0" rowspan="2">
                                    <el-tooltip class="item" effect="dark" content="连带率=销售总数/单据笔数" placement="top-start">
                                        <span>连带率 <i class="el-icon-info"></i></span>
                                    </el-tooltip>
                                </th>
                                <th style="border-right: 1px solid #ebeef5; text-align:center; border-bottom: 1px solid #ebeef5; padding: 8px 0" colspan="2">充值</th>
                                <th style="border-right: 1px solid #ebeef5; text-align:center; border-bottom: 1px solid #ebeef5; padding: 8px 0" colspan="5">消费</th>
                                <!-- <th style="border-right: 1px solid #ebeef5; text-align:center; border-bottom: 1px solid #ebeef5; padding: 8px 0" rowspan="2">更多</th> -->
                            </tr>
                            <tr>
                                <td style="border-right: 1px solid #ebeef5; text-align:center; border-bottom: 1px solid #ebeef5; padding: 8px 0">笔数</td>
                                <td style="border-right: 1px solid #ebeef5; text-align:center; border-bottom: 1px solid #ebeef5; padding: 8px 0">充值实收</td>
                                <td style="border-right: 1px solid #ebeef5; text-align:center; border-bottom: 1px solid #ebeef5; padding: 8px 0">金额</td>
                                <td style="border-right: 1px solid #ebeef5; text-align:center; border-bottom: 1px solid #ebeef5; padding: 8px 0">笔数</td>
                                <td style="border-right: 1px solid #ebeef5; text-align:center; border-bottom: 1px solid #ebeef5; padding: 8px 0">余额支付</td>
                                <td style="border-right: 1px solid #ebeef5; text-align:center; border-bottom: 1px solid #ebeef5; padding: 8px 0">欠款</td>
                                <td style="border-right: 1px solid #ebeef5; text-align:center; border-bottom: 1px solid #ebeef5; padding: 8px 0">消费实收</td>
                            </tr>
                            <tr v-for="(item, index) in tableList" :key="index" v-show="tableList.length > 0">
                                <td style="border-right: 1px solid #ebeef5; text-align:center; border-bottom: 1px solid #ebeef5; padding: 8px 0">{{item.SHOPNAME}}</td>
                                <td style="border-right: 1px solid #ebeef5; text-align:center; border-bottom: 1px solid #ebeef5; padding: 8px 0">{{item.SHOPMONEY}}</td>
                                <td style="border-right: 1px solid #ebeef5; text-align:center; border-bottom: 1px solid #ebeef5; padding: 8px 0">{{ (item.SALEMONEY / item.SALECOUNT).toFixed(2) }}</td>
                                <td style="border-right: 1px solid #ebeef5; text-align:center; border-bottom: 1px solid #ebeef5; padding: 8px 0">{{ (item.SALEQTY / item.SALECOUNT).toFixed(2) }}</td>
                                <td style="border-right: 1px solid #ebeef5; text-align:center; border-bottom: 1px solid #ebeef5; padding: 8px 0">{{item.ADDCOUNT}}</td>
                                <td style="border-right: 1px solid #ebeef5; text-align:center; border-bottom: 1px solid #ebeef5; padding: 8px 0">{{item.ADDPAYMONEY}}</td>
                                <td style="border-right: 1px solid #ebeef5; text-align:center; border-bottom: 1px solid #ebeef5; padding: 8px 0">{{item.SALEMONEY}}</td>
                                <td style="border-right: 1px solid #ebeef5; text-align:center; border-bottom: 1px solid #ebeef5; padding: 8px 0">{{item.SALECOUNT}}</td>
                                <td style="border-right: 1px solid #ebeef5; text-align:center; border-bottom: 1px solid #ebeef5; padding: 8px 0">{{item.SALEVIPMONEY}}</td>
                                <td style="border-right: 1px solid #ebeef5; text-align:center; border-bottom: 1px solid #ebeef5; padding: 8px 0">{{item.SALEOWNMONEY}}</td>
                                <td style="border-right: 1px solid #ebeef5; text-align:center; border-bottom: 1px solid #ebeef5; padding: 8px 0">{{item.SALEPAYMONEY}}</td>

                                <!-- <td style="border-right: 1px solid #ebeef5; text-align:center; border-bottom: 1px solid #ebeef5; padding: 8px 0">
                                    <a @click="viewItem(item)" style="color:#409eff; cursor:pointer">详情</a>
                                </td> -->
                            </tr>
                            <tr v-show="tableList.length == 0" style="height: 300px; text-align:center; color:#999">
                                <td colspan="12">
                                    <img src="static/images/emptyData.png" alt="">
                                    <div>暂无数据</div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    </el-container>
  </el-container>
</el-container>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import MIXINS_REPORT from "@/mixins/report";
import MIXNINS_EXPORT from "@/mixins/exportData.js";
import { getHomeData } from "@/api/index";
import dayjs from 'dayjs'

export default {
    mixins: [
        MIXINS_REPORT.SIDERBAR_MENU,
        MIXINS_REPORT.COMMOM_PAGE,
        MIXNINS_EXPORT.TOEXCEL,
        MIXNINS_EXPORT.TODATA
    ],
    data() {
        return {
            shopCheckText: "",
            tableList: [],
            pageData: { PN: 1 },
            exportList: [],
            tablename:document.body.clientHeight-160,
            ruleFrom: {
                ShopId: "",
                BeginDate: "1",
                EndDate: "9999999999999"
            },
            isShowDate: false,
            dateBE: [],
            chooseDateIdx: 0
        };
    },
    computed: {
        ...mapGetters({
            reportShopList: "reportShopList",
            dataState: "goodsReportState",
            dataList: "goodsReportList",
            dataListState: "goodsReportListState",
            dataListArr: "goodsReportListARR",
            shopList: "shopList"
        })
    },
    watch: {
        reportShopList(data) {
            console.log(data)
            this.tableList=data.List
        },
    },
    methods: {
        ExportRowFun(){
            if(this.tableList.length == 0){
                this.$message.error('无相应数据')
            }else{
                console.log('13')
                var html = "<html><head><meta charset='utf-8' /></head><body>" + document.getElementById("tableStock").outerHTML + "</body></html>"
                var blob = new Blob([html], { type: "application/vnd.ms-excel" });
                var a = document.getElementById("Button1");
                a.href = URL.createObjectURL(blob);
                a.download = "店铺分析导出.xls";
            }
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

        viewItem(row){
            console.log(row)
        },
        exportState(data) {

        },
        getNewData(data) {
            let sendData = Object.assign({}, data);
            this.$store.dispatch("getReportShopList", sendData);
            this.loading = true;
            // this.ruleFrom = Object.assign({}, sendData);
        },
        handlePageChange: function(currentPage) {
            if (this.pageData.PN == currentPage || this.loading) {
                return;
            }
            this.pageData.PN = parseInt(currentPage);
            this.$store
                .dispatch(
                    "getReportShopList",
                    Object.assign({}, this.ruleFrom, this.pageData)
                )
                .then(() => {
                    this.loading = true;
                });
        },
        defaultData() {
            this.tableList = [...this.dataData.List];
        }
    },
    created() {
        this.$store.dispatch("getReportShopList", {
            ShopId: this.theShopId,
            BeginDate: this.getTimeStamp(),
            EndDate: new Date().getTime()
        })
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
        headerPage: () => import("@/components/header")
    }
};
</script>
<style scoped>
.el-header{
  padding: 0 !important;
}
.member-main-top{
  width: 99%;
  margin-left: 0.5%;
  margin-right: 0.5%;
  height: 100px;
  background: #fff;
}
.member-main-table{
  margin-top: 8px;
  width: 99%;
  margin-left: 0.5%;
  margin-right: 0.5%;
  height: 600px;
  background: #fff;
}
.content-new-fex-shop{
  padding: 10px !important;
  margin-left: 1px;
  background-color: #F4F5FA;
  color: #333;
  margin-bottom: 10px;
  font-size: 12px;
  position: absolute;
  top: 50px;
  bottom: 10px;
  left:100px;
  right:0px;
}
.content-table-shop{
  margin-top: 10px;
  /* height: 550px; */
  width: 100%;
  background: #fff;
}
.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.tableStock {
    border-top: 1px solid #ebeef5;
    border-left: 1px solid #ebeef5;
    color:#7c7b7b
}
.tableStock tr td, .tableStock tr th{
    border-right: 1px solid #ebeef5; border-bottom: 1px solid #ebeef5; padding: 8px 0
}

</style>
