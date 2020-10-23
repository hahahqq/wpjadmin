<template>
    <div v-loading="loading">
        <el-form ref="form" :model="formMoney" :rules="rules" label-width="80px">
            <el-form-item label="付款金额" prop="PayMoney">
                <el-input type="number" v-model.number="formMoney.PayMoney" min="0" clearable></el-input>
            </el-form-item>
            <el-form-item label="运费" prop="FreightMoney">
                <el-input type="number" v-model.number="formMoney.FreightMoney" min="0" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button size="small" type="primary" @click="handleSubmit(1)">确认</el-button>
                <el-button size="small" @click="handleSubmit(0)">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
    props: {
        pageData: {
            type: Object,
            default: {
                PayMoney: 0,
                FreightMoney: 0,
                isShow: false
            }
        }
    },
    data() {
        var checkNumber = (rule, value, callback) => {
            var myreg = /^((0{1}\.\d{1,2})|([1-9]\d*\.{1}\d{1,2})|([1-9]+\d*))$/;
            if (!myreg.test(value)) {
                callback(new Error("请输入小数保留两位的正整数数值"));
            } else {
                callback();
            }
        };
        var checkNumber2 = (rule, value, callback) => {
            var myreg = /^[+]{0,1}(\d+)$/;
            if (!myreg.test(value)) {
                callback(new Error("请输入正整数数值"));
            } else {
                callback();
            }
        };
        return {
            loading: false,
            formMoney: {
                BillId: null,
                PayMoney: 0,
                FreightMoney: 0,
                Remark: ""
            },
            rules: {
                PayMoney: [
                    {
                        required: true,
                        validator: checkNumber,
                        trigger: "blur"
                    }
                ],
                FreightMoney: [
                    {
                        required: true,
                        validator: checkNumber2,
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    computed: {
        ...mapGetters({
            dataState: "mallOrderState"
        })
    },
    watch: {
        pageData(data) {
            if (data.isShow) {
                this.formMoney = Object.assign({}, data);
                console.log(222, this.formMoney)
            }
        },
        dataState(data) {
            if (this.loading) {
                if (data.success) {
                    this.$emit("resetModal");
                }
                this.$message({
                    showClose: true,
                    message: data.message,
                    type: data.success ? "success" : "error"
                });
            }
            this.loading = false;
        }
    },
    methods: {
        handleSubmit(type) { console.log(this.formMoney)
            if (type == 1) {
                // this.$emit("resetModel");
                // 订单修改
                if (!this.formMoney.BillId) {
                    this.$message.error("订单号不存在");
                    return;
                }

                this.$refs['form'].validate(valid => {
                    if (valid) {
                        this.$store
                            .dispatch("changeMallOrderMoney", this.formMoney)
                            .then(() => {
                                this.loading = true;
                            });
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            } else {
                this.$emit("closeModal");
            }
        }
    },
    created(){
         if (this.pageData.isShow) {
                this.formMoney = Object.assign({}, this.pageData);
                console.log(2223333, this.formMoney)
            }
    }
};
</script>