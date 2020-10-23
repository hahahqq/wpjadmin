<template>
    <section>
        <!-- 交易设置 -->
        <el-form ref="form" :model="form" label-width="140px">
            <div class="bg-white padding-sm m-bottom-sm">
                <div class="myShop-bacse">
                    <div class="dmt"></div>
                    <div>
                        <span class="h5">店铺设置</span>
                    </div>
                </div>
                <div class="myShop-bacse-content">
                    <el-form-item label="显示商品销量">
                        <el-switch v-model="DisplaySaleQty" @change="DisplaySaleQty_fun"></el-switch>
                        <div style="line-height: 1;">启用后，微商城店铺首页及全店商品详情页将显示销量</div>
                    </el-form-item>
                    <!-- <el-form-item label="显示商品评价">
                        <el-switch v-model="DisplayEvaluate" @change="DisplayEvaluate_fun"></el-switch>
                        <div style="line-height: 1;">启用后，微商城商品详情页将显示评价</div>
                    </el-form-item>-->
                </div>
            </div>
            <div class="bg-white padding-sm m-bottom-sm">
                <div class="myShop-bacse">
                    <div class="dmt"></div>
                    <div>
                        <span class="h5">交易设置</span>
                    </div>
                </div>
                <div class="myShop-bacse-content">
                    <!-- <el-form-item label="店铺最低消费">
                        <el-switch v-model="MinMoney.isUse" @change="MinMoney_switch"></el-switch>
                        <el-button
                            v-if="MinMoney.isUse"
                            size="mini"
                            type="text"
                            class="marginLR-sm"
                            @click="dialogVisible1=true"
                        >设置</el-button>
                        <div style="line-height: 1;">开启后，买家下单时需达到店铺最低消费条件后才能正常支付购买。多个条件时，需要同时满足才能下单</div>
                    </el-form-item>-->
                    <el-form-item label="订单自动关闭时间">
                        <div>
                            <div class="inline-block" style="height: 41px;width:120px;">
                                <span>{{AutoOrder.time}}小时</span>
                                <span>{{AutoOrder.time2}}分钟</span>
                            </div>
                            <el-button
                                size="mini"
                                type="text"
                                @click="AutoOrder.isShow=true"
                                class="marginLR-sm"
                            >设置</el-button>
                            <div class="inline-block m-left-md" v-if="AutoOrder.isShow">
                                <el-select
                                    v-model="AutoOrder.num"
                                    placeholder="请选择"
                                    size="mini"
                                    style="width:80px"
                                >
                                    <el-option
                                        v-for="(value, name) in new Array(49)"
                                        :key="value"
                                        :label="name"
                                        :value="name"
                                        v-show="name>0"
                                    ></el-option>
                                </el-select>
                                <span class="m-right-sm">小时</span>
                                <el-select
                                    v-model="AutoOrder.num2"
                                    placeholder="请选择"
                                    size="mini"
                                    style="width:80px"
                                >
                                    <el-option
                                        v-for="(value, name) in new Array(60)"
                                        :key="value"
                                        :label="name"
                                        :value="name"
                                    ></el-option>
                                </el-select>
                                <span class="m-right-sm">分钟</span>
                                <el-button size="mini" plain @click="AutoOrder_fun(1)">确认</el-button>
                                <el-button size="mini" plain @click="AutoOrder_fun(0)">取消</el-button>
                            </div>
                        </div>
                        <div style="line-height: 1;">设置后买家未在此时间内付款，待付款订单将自动关闭，状态由待付款变为已关闭</div>
                    </el-form-item>
                </div>
            </div>
            <div class="bg-white padding-sm m-bottom-sm">
                <div class="myShop-bacse">
                    <div class="dmt"></div>
                    <div>
                        <span class="h5">物流／发货</span>
                    </div>
                </div>
                <div class="myShop-bacse-content">
                    <el-form-item label="自动确认收货时间">
                        <div>
                            <div class="inline-block" style="height: 41px;width:120px;">
                                <span>{{AutoSaleDay.day}}天</span>
                            </div>
                            <el-button
                                size="mini"
                                type="text"
                                @click="AutoSaleDay.isShow=true"
                                class="marginLR-sm"
                            >设置</el-button>
                            <div class="inline-block m-left-md" v-if="AutoSaleDay.isShow">
                                <el-select
                                    v-model="AutoSaleDay.num"
                                    placeholder="请选择"
                                    size="mini"
                                    style="width:80px"
                                >
                                    <el-option
                                        v-for="(value, i) in autoSaleDayOptions"
                                        :key="i"
                                        :label="value+'天'"
                                        :value="value"
                                    ></el-option>
                                </el-select>
                                <span class="m-right-sm">天</span>
                                <el-button
                                    size="mini"
                                    plain
                                    @click="AutoSaleDay_fun(1)"
                                    type="primary"
                                >确认</el-button>
                                <el-button size="mini" plain @click="AutoSaleDay_fun(0)">取消</el-button>
                            </div>
                        </div>
                        <div style="line-height: 1;">开启后，买家下单时需达到店铺最低消费条件后才能正常支付购买。多个条件时，需要同时满足才能下单</div>
                    </el-form-item>
                    <!-- <el-form-item label="退货地址设置(x)">
                        <div>
                            <div class="inline-block" style="height: 41px;width:120px;">
                                <span>未添加</span>
                            </div>
                            <el-button size="mini" type="text" class="marginLR-sm">设置</el-button>
                        </div>
                        <div style="line-height: 1;">设置默认退货地址，买家申请退货，若您超时未及时处理将通知买家把货物退回至该地址，避免资金损失</div>
                    </el-form-item>
                    <el-form-item label="是否允许到店自提(x)">
                        <el-switch v-model="form.delivery"></el-switch>
                        <div style="line-height: 1;">开启后，客户下单时支持选择到店自提方式</div>
                    </el-form-item>-->
                </div>
            </div>
            <div class="bg-white padding-sm m-bottom-sm">
                <div class="myShop-bacse">
                    <div class="dmt"></div>
                    <div>
                        <span class="h5">库存设置</span>
                    </div>
                </div>
                <div class="myShop-bacse-content">
                    <!-- <el-form-item label="退款自动增加库存(x)">
                        <el-switch v-model="form.delivery"></el-switch>
                        <div style="line-height: 1;">开启后，待发货状态，若产生全额退款，库存自动增加</div>
                    </el-form-item>-->
                    <el-form-item label="减库存方式">
                        <el-radio-group v-model="ReduceStockType" @change="ReduceStockType_fun">
                            <el-radio :label="0">拍下减库存</el-radio>
                            <el-radio :label="1">付款减库存</el-radio>
                        </el-radio-group>
                        <div style="line-height: 1;">拍下减库存：建议库存充足的店家使用；</div>
                        <div style="line-height: 1;">付款减库存：建议库存紧张、需要防止被占用的店家使用</div>
                    </el-form-item>
                </div>
            </div>
        </el-form>

        <!-- 最低消费设置 -->
        <el-dialog append-to-body title="最低消费设置" :visible.sync="dialogVisible1" width="450px">
            <div>
                <el-form label-width="120px">
                    <el-form-item label="最低消费金额">
                        <el-switch v-model="MinMoney.isMoney"></el-switch>
                        <el-input
                            v-if="MinMoney.isMoney"
                            type="number"
                            v-model.number="MinMoney.money"
                            min="1"
                            clearable
                            class="m-left-sm"
                            style="width:200px"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="最低消费数量">
                        <el-switch v-model="MinMoney.isQty"></el-switch>
                        <el-input
                            v-if="MinMoney.isQty"
                            type="number"
                            v-model.number="MinMoney.qty"
                            min="1"
                            clearable
                            class="m-left-sm"
                            style="width:200px"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="最低起送价是否含运费">
                        <el-switch v-model="MinMoney.isFreight"></el-switch>
                        <el-radio-group
                            v-if="MinMoney.isFreight"
                            v-model="MinMoney.freight"
                            class="m-left-sm"
                        >
                            <el-radio :label="0">不包含</el-radio>
                            <el-radio :label="1">包含</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="MinMoney_fun(1)">保存</el-button>
                        <el-button @click="dialogVisible1=false">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </section>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
    data() {
        return {
            loading: false,
            form: {
                delivery: false,
                resource: 0
            },
            isSetTime: false,
            value1: 1,
            value2: 0,

            dialogVisible1: false,
            MinMoney: {
                // 最低消费设置
                isUse: false,
                isMoney: false,
                money: 1,
                isQty: false,
                qty: 1,
                isFreight: false,
                freight: 0
            },
            AutoOrder: {
                time: 0,
                num: 24,
                time2: 0,
                num2: 24,
                isShow: false
            },
            AutoSaleDay: {
                day: 0,
                num: 7,
                isShow: false
            },
            autoSaleDayOptions: [7, 10, 15, 20, 25, 30],
            ReduceStockType: 0,
            DisplayEvaluate: false, // 商品评价设置
            DisplaySaleQty: false
        };
    },
    computed: {
        ...mapGetters({
            dataSate: "mallsetupState",
            mallState: "mallState",
            dataData: "mallData"
        })
    },
    watch: {
        mallState(data) {
            if (this.loading) {
                if (data.success) {
                    this.defaultData();
                } else {
                    this.$message.error(data.message);
                }
            }
            this.loading = false;
        },
        dataSate(data) {
            if (this.loading) {
                if (data.success && data.type == "setMallMinMoney") {
                    this.MinMoney_fun(0);
                }
                if (data.success && data.type == "setMallAutoSaleDay") {
                    this.AutoSaleDay.day = this.AutoSaleDay.num;
                    this.AutoSaleDay_fun(0);
                }
                if (data.success && data.type == "setMallAutoOrder") {
                    this.AutoOrder.time = this.AutoOrder.num;
                    this.AutoOrder.time2 = this.AutoOrder.num2;
                    this.AutoOrder_fun(0);
                }
                this.$message({
                    message: data.message,
                    type: data.success ? "success" : "error"
                });
            }
            this.loading = false;
        }
    },
    methods: {
        MinMoney_fun(type) {
            if (type == 0) {
                this.dialogVisible1 = false;
                this.MinMoney.money = 1;
                this.MinMoney.qty = 1;
            } else {
                this.$store
                    .dispatch("setMallMinMoney", this.MinMoney)
                    .then(() => {
                        this.loading = true;
                    });
            }
        },
        MinMoney_switch(v) {
            console.log(v);
            if (v) {
                this.dialogVisible1 = true;
            } else {
                this.$confirm("确定关闭最低消费设置?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        this.MinMoney = {
                            isUse: false,
                            isMoney: false,
                            money: 0,
                            isQty: false,
                            qty: 0,
                            isFreight: false,
                            freight: 0
                        };
                        this.MinMoney_fun(1);
                    })
                    .catch(() => {});
            }
        },
        AutoOrder_fun(type) {
            if (type == 0) {
                this.AutoOrder.isShow = false;
                this.AutoOrder.num = 24;
                this.AutoOrder.num2 = 0;
            } else {
                let v =
                    parseInt(this.AutoOrder.num) * 60 +
                    parseInt(this.AutoOrder.num2);
                this.$store
                    .dispatch("setMallAutoOrder", {
                        value: v
                    })
                    .then(() => {
                        this.loading = true;
                    });
            }
        },
        AutoSaleDay_fun(type) {
            if (type == 0) {
                this.AutoSaleDay.isShow = false;
                this.AutoSaleDay.num = 7;
            } else {
                this.$store
                    .dispatch("setMallAutoSaleDay", {
                        value: this.AutoSaleDay.num
                    })
                    .then(() => {
                        this.loading = true;
                    });
            }
        },
        ReduceStockType_fun(v) {
            this.$store
                .dispatch("setMallReduceStockType", { value: v })
                .then(() => {
                    this.loading = true;
                });
        },
        DisplayEvaluate_fun(v) {
            this.$store
                .dispatch("setMallDisplayEvaluate", { value: v })
                .then(() => {
                    this.loading = true;
                });
        },
        DisplaySaleQty_fun(v) {
            this.$store
                .dispatch("setMallDisplaySaleQty", { value: v })
                .then(() => {
                    this.loading = true;
                });
        },

        defaultData() {
            let dd = Object.assign({}, this.dataData);
            this.AutoSaleDay.day = dd.AUTOSALEDAY; // 自动确认收货时间
            this.AutoSaleDay.num = dd.AUTOSALEDAY;
            this.DisplaySaleQty = dd.DISPLAYSALEQTY; // 显示商品销量
            this.DisplayEvaluate = dd.DISPLAYEVALUATE; // 显示商品评价
            this.AutoOrder.time = parseInt(dd.AUTOORDER / 60); // 订单自动关闭时间,分钟
            this.AutoOrder.num = parseInt(dd.AUTOORDER / 60);
            this.AutoOrder.time2 = parseInt(dd.AUTOORDER % 60);
            this.AutoOrder.num2 = parseInt(dd.AUTOORDER % 60);
            this.ReduceStockType = ~~dd.REDUCESTOCKTYPE; // 减库存方式

            this.MinMoney = {
                // 最低消费设置
                isUse:
                    dd.MINMONEY > 0 && dd.MINQTY > 0 && dd.ISPLUSFREIGHT
                        ? true
                        : false,
                isMoney: dd.MINMONEY > 0 ? true : false,
                money: dd.MINMONEY > 0 ? dd.MINMONEY : 1,
                isQty: dd.MINQTY > 0 ? true : false,
                qty: dd.MINQTY > 0 ? dd.MINQTY : 1,
                isFreight: dd.ISPLUSFREIGHT ? true : false,
                freight: dd.ISPLUSFREIGHT ? 1 : 0
            };
        }
    },
    mounted() {
        if (this.dataData.STOCKSHOPID) {
            this.defaultData();
        } else {
            this.$store.dispatch("getSettingMall").then(() => {
                this.loading = true;
            });
        }
    }
};
</script>
<style scoped>
.myShop-bacse {
    display: flex;
    align-items: center;
    height: 40px;
    width: 100%;
    margin-bottom: 10px;
    background: #f7f8fa;
}
.myShop-bacse .dmt {
    margin-left: 15px;
    margin-right: 10px;
    height: 16px;
    width: 6px;
    background: #3399ff;
}
.myShop-bacse-content {
    margin-left: 30px;
}
</style>