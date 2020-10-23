<template>
    <!-- 退款 -->
    <div v-loading="loading">
        <div v-if="goodsList.length>0" class="m-bottom-md">
            <div v-for="(item, i) in goodsList" :key="i" class="bg-white">
                <div class="row-flex">
                    <div class style="min-width:30px">
                        <el-checkbox v-model="item.checked" @change="handleChange"></el-checkbox>
                    </div>
                    <div style="min-width:40px">
                        <img
                            src="static/images/default.png"
                            v-real-img="theImgurl(item.GOODSID)"
                            style="width: 40px; height: 40px"
                            @click="item.checked=!item.checked"
                        />
                    </div>
                    <div class="full-width p-left-sm">
                        <div>{{item.NAME}}</div>
                        <div class="m-top-xs">
                            <b>&yen;{{item.PRICE}}</b>
                            <span>&times;{{item.QTY}}</span>
                        </div>
                    </div>
                    <div>
                        <el-input-number
                            v-if="item.checked"
                            v-model="item.num"
                            @change="handleChange"
                            :min="1"
                            :max="item.QTY"
                            size="mini"
                            label="退款商品数量"
                            :disabled="item.QTY>1?false:true"
                            class="pull-right"
                        ></el-input-number>
                    </div>
                </div>
            </div>
            <div class="text-right">
                <div>
                    <span>商品总金额</span>
                    <span class="text-theme font-14">&yen;{{goodsMoney}}</span>
                </div>
                <div>
                    <span>运费</span>
                    <span class="text-theme font-14">&yen;{{form.freight}}</span>
                </div>
            </div>
        </div>
        <el-form ref="form" :model="form" label-width="80px" label-position="left">
            <el-form-item label="退款原因">
                <el-select v-model="form.reason" placeholder="请选择" class="full-width">
                    <el-option
                        v-for="(item,i) in ['缺货','协商一致退款','其它原因']"
                        :key="i"
                        :label="item"
                        :value="item"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="退款金额">
                <el-input
                    v-model.number="form.PayMoney"
                    type="number"
                    clearable
                    placeholder="请输入金额"
                ></el-input>
            </el-form-item>
            <el-form-item label="退款说明">
                <el-input v-model="form.Remark" clearable type="textarea" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item v-if="goodsList.length>0">
                <el-button type="primary" @click="onSubmit()">确定</el-button>
                <el-button @click="closeModal()">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import { GOODS_IMGURL } from "@/util/define.js";

export default {
    props: ["pageData"],
    data() {
        return {
            loading: false,
            goodsMoney: 0,
            goodsList: [],

            form: {
                VipId: "",
                gList: "",
                Remark: "",
                PayMoney: 0, // 退款金额
                BillId: "",
                reason: "",
                freight: 0 // 运费
            }
        };
    },
    computed: {
        ...mapGetters({
            dataItem: "mallOrderItem",
            dataState: "mallRefundState"
        })
    },
    watch: {
        pageData(data) {
            if (data.isShow) {
                this.defautlData(data);
            }
        },
        dataState(data) {
            if (this.loading) {
                this.$message({
                    showClose: true,
                    message: data.message,
                    type: data.success ? "success" : "error"
                });
                if (data.success) {
                    this.$emit("resetModel");
                }
            }
        }
    },
    methods: {
        closeModal() {
            this.$emit("closeModal");
        },
        theImgurl(id) {
            return GOODS_IMGURL + id + ".png";
        },
        handleChange(value) {
            console.log(value);
            this.totalMoney()
        },
        totalMoney() {
            let tmoney = 0;
            this.goodsList.forEach(element => {
                if (element.checked) {
                    tmoney += element.PRICE * element.num;
                }
            });
            this.form.PayMoney = tmoney;
        },
        onSubmit() {
            if (!this.form.reason) {
                this.$message({
                    showClose: true,
                    message: "请选择退款原因",
                    type: "error"
                });
                return;
            }
            let arr = [];
            this.goodsList.forEach(element => {
                if (element.checked && element.num > 0) {
                    arr.push({
                        GoodsId: element.GOODSID,
                        Qty: element.num,
                        Price: element.PRICE,
                        Discount: element.DISCOUNT
                    });
                }
            });
            let sendData = Object.assign({}, this.form);
            if (arr.length == 0) {
                this.$message({
                    showClose: true,
                    message: "请选择退款商品",
                    type: "error"
                });
                return;
            }
            sendData.gList = JSON.stringify(arr);
            this.$store.dispatch("applyMallRefund", sendData).then(() => {
                this.loading = true;
            });
        },

        defautlData(data) {
            console.log(data);
            this.goodsMoney = 0;
            this.goodsList = [];
            if (data.goodsList && data.goodsList.length) {
                data.goodsList.forEach(element => {
                    this.goodsList.push(
                        Object.assign(
                            { checked: true, num: element.QTY },
                            element
                        )
                    );
                    this.goodsMoney += element.PRICE * element.QTY;
                });
            }

            this.form = {
                BillId: data.Obj.BILLID,
                VipId: data.VipObj.ID,
                gList: "",
                Remark: "",
                PayMoney: 0, // 退款金额
                reason: "",
                freight: data.Obj.FREIGHTMONEY // 运费
            };
        }
    },
    created() {
        this.defautlData(this.dataItem);
    }
};
</script>

<style scoped>
</style>