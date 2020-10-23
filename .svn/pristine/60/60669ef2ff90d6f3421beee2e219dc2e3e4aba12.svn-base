<template>
    <section class="mallOrder bg-white p-bottom-sm" v-loading="loading">
        <div class="content-center paddingTB-sm">
            <div class="padding-sm">
                <span>下单时间</span>
                <el-date-picker
                    v-model="dateBE"
                    type="daterange"
                    value-format="timestamp"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    class="m-left-sm vertical-middle"
                    @change="dateChangeFun"
                    size="small"
                ></el-date-picker>
                <el-button-group>
                    <el-button
                        size="small"
                        :type="activeDate==0?'primary':''"
                        @click="dateClickFun(0)"
                    >今天</el-button>
                    <el-button
                        size="small"
                        :type="activeDate==3?'primary':''"
                        @click="dateClickFun(3)"
                    >近三天</el-button>
                    <el-button
                        size="small"
                        :type="activeDate==7?'primary':''"
                        @click="dateClickFun(7)"
                    >近七天</el-button>
                    <el-button
                        size="small"
                        :type="activeDate=='all'?'primary':''"
                        @click="dateClickFun('all')"
                    >全部</el-button>
                </el-button-group>
            </div>

            <div class="padding-sm">
                <el-input
                    placeholder="请输入内容"
                    v-model="formData.Filter"
                    class
                    style="width: 400px;"
                    size="small"
                >
                    <el-select
                        slot="prepend"
                        v-model="formData.FilterType"
                        placeholder="请选择"
                        style="width: 120px;"
                        size="small"
                    >
                        <el-option
                            v-for="(item,i) in filterTypeList"
                            :key="i"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                    <el-button slot="append" size="small" @click="searchFun()">搜索</el-button>
                </el-input>
            </div>
        </div>
        <div class="bg-elMain padding-xs" @click="setListHeight"></div>
        <div class="content-table-center">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane
                    v-for="(tab, index) in tabPaneList"
                    :key="index"
                    :label="tab.title"
                    :name="tab.name"
                >
                    <!-- head -->
                    <div class="el-table bg-f8">
                        <table class="full-width">
                            <thead>
                                <tr class="bg-f8 text-4e">
                                    <template v-for="(item, idx) in tableHead">
                                        <th :key="idx" rowspan="1" :width="idx<2?'20%':'12%'">
                                            <div
                                                :class="idx>1?'text-center':'text-left'"
                                            >{{item.label}}</div>
                                        </th>
                                    </template>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <!-- body  -->
                    <div class="List overflowY-scroll" ref="List" :style="{height:ListHeight+'px'}">
                        <div v-for="(itemList, idx) in dataList" :key="idx" class="m-top-md">
                            <div class="el-table bg-f8 el-table--border">
                                <table class="full-width" style="border-spacing: 0px;">
                                    <thead>
                                        <tr class="bg-f8 text-4e">
                                            <th :colspan="tableHead.length">
                                                <div style="user-select: text;">
                                                    <span
                                                        class="m-right-sm"
                                                    >订单编号：{{itemList.BILLNO}}</span>
                                                    <span
                                                        class="m-right-sm"
                                                    >提交时间：{{new Date(itemList.BILLDATE)|formatTime}}</span>
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr
                                            v-for="(item, i) in itemList.subList"
                                            :key="i"
                                            class="el-table__row font-12"
                                        >
                                            <td rowspan="1" width="20%">
                                                <div class="row-flex">
                                                    <div style="min-width:54px">
                                                        <img
                                                            src="static/images/default.png"
                                                            v-real-img="theImgurl(item.GOODSID)"
                                                            style="width: 54px; height: 54px"
                                                        />
                                                    </div>
                                                    <div class="full-width p-left-sm">
                                                        <div
                                                            class="text-overflow-fag2"
                                                            style="min-height:30px;"
                                                        >{{item.GOODSNAME}}</div>
                                                        <div class="m-top-xs">
                                                            <b>&yen;{{item.PRICE}}</b>
                                                            <span>&times;{{item.QTY}}</span>
                                                            <span
                                                                class="pull-right"
                                                                v-if="itemList.STATUS==2"
                                                            >退款成功</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td
                                                v-if="i==0"
                                                :rowspan="itemList.subList.length"
                                                width="20%"
                                            >
                                                <div
                                                    v-if="itemList.RECEIPTNAME"
                                                    class="m-bottom-sm"
                                                >
                                                    <div>
                                                        <span>{{itemList.RECEIPTNAME}}</span>
                                                        <span
                                                            class="m-left-xs"
                                                        >{{itemList.RECEIPTPHONE}}</span>
                                                    </div>
                                                    <div>
                                                        <span>{{itemList.RECEIPTADDRESS}}</span>
                                                    </div>
                                                </div>
                                                <div
                                                    v-if="itemList.LOGISTICSCOMPANYNAME"
                                                    class="m-bottom-sm"
                                                >
                                                    <span>配送方式</span>
                                                    <span>{{itemList.LOGISTICSCOMPANYNAME}}</span>
                                                </div>
                                                <div class>
                                                    <span>备注：</span>
                                                    <span>{{itemList.REMARK}}</span>
                                                </div>
                                            </td>
                                            <td
                                                v-if="i==0"
                                                :rowspan="itemList.subList.length"
                                                width="12%"
                                            >
                                                <div class="text-center">
                                                    <span>&yen;{{itemList.PAYMONEY}}</span>
                                                </div>
                                                <div class="text-center">
                                                    <span class="text-muted">含运费</span>
                                                    <span
                                                        class="text-muted"
                                                    >&yen;{{itemList.FREIGHTMONEY}}</span>
                                                </div>
                                            </td>
                                            <td
                                                v-if="i==0"
                                                :rowspan="itemList.subList.length"
                                                width="12%"
                                            >
                                                <!-- 门店 -->
                                                <div class="text-center">{{itemList.shopName}}</div>
                                            </td>
                                            <td
                                                v-if="i==0"
                                                :rowspan="itemList.subList.length"
                                                width="12%"
                                            >
                                                <div class="text-center">订单状态</div>
                                            </td>
                                            <td
                                                v-if="i==0"
                                                :rowspan="itemList.subList.length"
                                                width="12%"
                                            >
                                                <div class="text-center">
                                                    <span v-text="formatterState2(itemList)"></span>
                                                </div>
                                            </td>
                                            <td
                                                v-if="i==0"
                                                :rowspan="itemList.subList.length"
                                                width="12%"
                                            >
                                                <div class="text-center">
                                                    <div>
                                                        <el-button
                                                            @click="toDetail(itemList)"
                                                            size="small"
                                                            type="text"
                                                        >
                                                            <span>查看详情</span>
                                                        </el-button>
                                                    </div>

                                                    <div v-if="itemList.STATUS==1">
                                                        <div class="m-top-sm">
                                                            <el-button
                                                                @click="resultState=true;handleButton(itemList)"
                                                                size="small"
                                                                type="primary"
                                                            >
                                                                <span>同意退款</span>
                                                            </el-button>
                                                        </div>
                                                        <div class="m-top-sm">
                                                            <el-button
                                                                @click="resultState=false;handleButton(itemList)"
                                                                size="small"
                                                                type="plain"
                                                            >
                                                                <span>拒绝退款</span>
                                                            </el-button>
                                                        </div>
                                                    </div>
                                                    <div v-if="itemList.STATUS==2" class="m-top-sm">
                                                        <el-button
                                                            @click="handleButton(itemList)"
                                                            size="small"
                                                            :type="itemList.STATUS==2?'primary':'text'"
                                                        >
                                                            <span v-text="formatterState(itemList)"></span>
                                                        </el-button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <!-- 分页 -->
                    <div v-if="dataList.length>0" class="m-top-smts clearfix elpagination">
                        <el-pagination
                            @size-change="handlePageChange"
                            @current-change="handlePageChange"
                            :current-page.sync="pagination.PN"
                            :page-size="pagination.PageSize"
                            layout="total,prev, pager, next, jumper"
                            :total="pagination.TotalNumber"
                            class="text-right"
                        ></el-pagination>
                    </div>
                    <div v-else class="padding-md text-center text-muted">
                        <span>暂无单据</span>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <!-- item -->
        <el-dialog append-to-body :title="itemTitle" :visible.sync="showItem" width="700px" style="max-width:100%">
            <itemPage :pageData="dataItem" @closeModal="showItem=false"></itemPage>
        </el-dialog>
    </section>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import { getHomeData } from "@/api/index";
import img from "@/assets/default.png";
import { GOODS_IMGURL } from "@/util/define.js";
export default {
    data() {
        return {
            img: img,
            loading: false,
            formData: {
                ShopId: "",
                PN: 1,
                Status: "-1",
                Filter: "",
                FilterType: "",
                BeginDate: "",
                EndDate: ""
            },
            dateBE: [],
            // -1=全部，0=已取消，1=待处理，2=待打款，3=已完成
            tabPaneList: [
                { title: "全部", name: "a", value: -1, btnText: "" },
                { title: "待处理", name: "b", value: 1, btnText: "处理退款" },
                { title: "待打款", name: "c", value: 2, btnText: "打款确认" },
                { title: "已完成", name: "d", value: 3, btnText: "查看" },
                { title: "已取消", name: "e", value: 0, btnText: "查看" }
            ],
            activeName: "a",
            // 1=会员姓名，2=会员编号，3=会员手机号，4=商品名称，5=订单号，6=备注，7=收货人名称，8=收货人手机号
            filterTypeList: [
                { label: "会员姓名", value: "1" },
                { label: "会员编号", value: "2" },
                { label: "会员手机号", value: "3" },
                { label: "商品名称", value: "4" },
                { label: "订单号", value: "5" },
                { label: "备注", value: "6" },
                { label: "收货人名称", value: "7" },
                { label: "收货人手机号", value: "8" }
            ],
            tableHead: [
                { label: "订单信息", value: "" },
                { label: "", value: "" },
                { label: "金额", value: "" },
                { label: "退款门店", value: "" },
                { label: "订单状态", value: "" },
                { label: "退款状态", value: "" },
                { label: "操作", value: "" }
            ],
            showState: 0,
            pagination: {
                TotalNumber: 0,
                PageNumber: 0,
                PageSize: 20,
                PN: 0
            },
            itemTitle: "",
            showItem: false,
            activeDate: "all",
            resultState: false, // 是否同意退款
            dataItem: {},
            ListHeight: 0
        };
    },
    computed: {
        ...mapGetters({
            dataListState: "mallRefundListState",
            dataList: "mallRefundList",
            dataData: "AgentInfo",
            dataState: "mallRefundState"
        })
    },
    watch: {
        dataState(data) {
            if (this.loading) {
                if (data.success) {
                    this.toSuccess(data);
                } else {
                    this.$message.error(data.message);
                }
            }
            this.loading = false;
        },
        dataListState(data) {
            if (data.success && this.loading) {
                this.pagination = {
                    TotalNumber: data.paying.TotalNumber,
                    PageNumber: data.paying.PageNumber,
                    PageSize: data.paying.PageSize,
                    PN: data.paying.PN
                };
                this.formData.PN = data.paying.PN;
                this.formData.Status = data.Status;
            }
            if (!data.success && this.loading) {
                this.$message.error(data.message);
            }
            this.loading = false;
            this.setListHeight();
        }
    },
    methods: {
        setListHeight() {
            let idx = this.tabPaneList.findIndex(
                item => item.name == this.activeName
            ),top=0;
            if(this.$refs["List"][idx]){
                top = this.$refs["List"][idx].getBoundingClientRect().top;
            }
            top = parseInt(top) ? parseInt(top) : 345;
            this.ListHeight = window.innerHeight - top - 85;
        },
        formatterState: function(data) {
            let idx = this.tabPaneList.findIndex(
                item => item.value == data.STATUS
            );
            return this.tabPaneList[idx].btnText;
        },
        formatterState2: function(data) {
            let idx = this.tabPaneList.findIndex(
                item => item.value == data.STATUS
            );
            return this.tabPaneList[idx].title;
        },
        theImgurl(id) {
            return GOODS_IMGURL + id + ".png";
        },
        handleClick(tab, event) {
            let d = this.tabPaneList.find(item => item.name == tab.name);
            this.formData.Status = d.value;
            this.$store.dispatch("clearMallOrderAll").then(() => {
                this.getNewData();
            });
        },
        getNewData() {
            let sendData = Object.assign({}, this.formData);
            this.$store.dispatch("getMallRefundList", sendData).then(() => {
                this.loading = true;
            });
        },

        dateChangeFun(data) {
            // 选择时间段
            this.formData.BeginDate = data[0];
            this.formData.EndDate = data[1];
            this.getNewData();
        },
        dateClickFun(num) {
            this.activeDate = num;
            // 选择近期时间
            if (num == "all") {
                this.formData.BeginDate = "";
                this.formData.EndDate = "";
                this.dateBE = [];
                this.formData.FilterType = "";
                this.formData.Filter = "";
                this.searchFun();
            } else {
                this.formData.BeginDate = this.getTimeStamp(num);
                this.formData.EndDate = new Date().getTime();
                this.dateBE[0] = this.getTimeStamp(num);
                this.dateBE[1] = new Date().getTime();
                this.dateBE = [...this.dateBE];
                this.getNewData();
            }
        },
        searchFun() {
            this.activeName = "a";
            this.formData.Status = -1;
            this.getNewData();
        },
        handlePageChange: function(currentPage) {
            if (this.formData.PN == currentPage || this.loading) {
                return;
            }
            this.formData.PN = parseInt(currentPage);
            this.getNewData();
        },
        handleButton(item) {
            this.dataItem = Object.assign({ isShow: false }, item);
            let s = item.STATUS; // 1=待处理，2=待打款
            if (s == 1) {
                this.$confirm(
                    "是否" + (this.resultState ? "同意" : "拒绝") + "退款?",
                    "提示",
                    {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    }
                )
                    .then(() => {
                        this.$store
                            .dispatch("resultMallRefund", {
                                BillId: item.BILLID,
                                type: this.resultState
                            })
                            .then(() => {
                                this.loading = true;
                            });
                    })
                    .catch(() => {});
            } else if (s == 2) {
                this.$confirm("是否确认打款?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        this.$store
                            .dispatch("repayMallRefund", {
                                BillId: item.BILLID
                            })
                            .then(() => {
                                this.loading = true;
                            });
                    })
                    .catch(() => {});
            } else {
                this.itemTitle =
                    "单据详情（" + this.formatterState2(item) + "单据）";
                this.dataItem.isShow = true;
                this.showItem = true;
                console.log(this.dataItem);
                // this.$store.dispatch("getMallRefundItem", {});
            }
        },
        toDetail(item) {
            this.$router.push({
                path: "/mall/refundItem",
                query: { id: item.BILLID }
            });
        },
        toSuccess(data) {
            let text = "";
            if (data.type == "resultRefund_yes") {
                text = "已同意退款";
                this.$confirm(text + ", 是否打款确认?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        this.dataItem.STATUS = 2;
                        this.$store
                            .dispatch("repayMallRefund", {
                                BillId: this.dataItem.BILLID
                            })
                            .then(() => {
                                this.loading = true;
                            });
                    })
                    .catch(() => {
                        this.$store.dispatch("clearMallOrderList").then(() => {
                            this.getNewData();
                        });
                    });
                return;
            }
            if (data.type == "resultRefund_no") {
                text = "拒绝退款";
            }
            if (data.type == "repayRefund") {
                text = "已确认打款";
            }
            if (text) {
                this.$message({
                    showClose: true,
                    message: text,
                    type: "success"
                });
            }
            this.$store.dispatch("clearMallOrderList").then(() => {
                this.getNewData();
            });
        },

        defaultData() {}
    },
    mounted() {
        this.getNewData();
    },
    components: {
        itemPage: () => import("./item.vue")
    }
};
</script>
<style scoped>
.el-table th,
.el-table td {
    padding-left: 7px;
    padding-right: 7px;
}
.div-tabel {
    display: table;
    border-spacing: 20px; /*边距*/
    width: 100%;
}
.div-tabel-row {
    display: table-row;
}
.div-table-cell {
    display: table-cell;
}

.text-overflow-fag2 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
}
</style>
