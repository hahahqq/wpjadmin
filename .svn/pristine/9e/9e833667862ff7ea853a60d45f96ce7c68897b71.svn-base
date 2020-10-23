<template>
    <div v-loading="loading">
        <el-form ref="form" :model="formData" :rules="rules" label-width="100px">
            <el-form-item label="名称" prop="Name">
                <el-input v-model="formData.Name" clearable :disabled="formData.IsDefault"></el-input>
            </el-form-item>
            <el-form-item label="计价方式">
                <el-radio-group v-model="formData.Type">
                    <el-radio :label="0">计数</el-radio>
                    <!-- <el-radio :label="1">计量</el-radio> -->
                </el-radio-group>
            </el-form-item>
            <el-form-item label>
                <el-input
                    type="number"
                    v-model.number="formData.MinQty"
                    clearable
                    min="1"
                    style="width:100px"
                ></el-input>
                <span>件内</span>
                <el-input
                    type="number"
                    v-model.number="formData.MinMoney"
                    clearable
                    min="0"
                    style="width:100px"
                ></el-input>
                <span>元</span>
            </el-form-item>
            <el-form-item label>
                <span>每增加</span>
                <el-input
                    type="number"
                    v-model.number="formData.AddQty"
                    clearable
                    min="0"
                    style="width:100px"
                ></el-input>
                <span>件，运费增加</span>
                <el-input
                    type="number"
                    v-model.number="formData.AddMoney"
                    clearable
                    min="0"
                    style="width:100px"
                ></el-input>
                <span>元</span>
            </el-form-item>
            <!-- <el-form-item label="是否默认">
                <el-switch v-model="formData.IsDefault"></el-switch>
            </el-form-item>-->
            <el-form-item>
                <el-button type="primary" @click="onSubmit()">保存</el-button>
                <el-button @click="$emit('closeModal')">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
    props: ["pageState"],
    data() {
        return {
            loading: false,
            formData: {
                Name: "",
                Type: 0, // 计价方式 0=计数，1=计量
                MinQty: 1, // 最低数量
                MinMoney: 6, // 最低运费
                AddQty: 0, //新增数量
                AddMoney: 0, // 新增运费
                IsDefault: false // 是否默认
            },
            rules: {
                Name: [
                    {
                        required: true,
                        message: "请输入活动名称",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    computed: {
        ...mapGetters({
            dataItem: "mallFreightItem",
            dataState: "mallFreightState"
        })
    },
    watch: {
        pageState(v) {
            if (v) {
                console.log(v)
                console.log(this.dataItem)
                let type = Object.keys(this.dataItem).length > 0 ? 1 : 0;
                this.defaultData(type);
                this.$refs.form.clearValidate();
            }
        },
        dataState(data) {
            if (this.loading) {
                if (data.success) {
                    this.$emit("resetModal");
                }
                this.$message({
                    type: data.success ? "success" : "error",
                    message: data.message
                });
                this.loading = false;
            }
        }
    },
    methods: {
        onSubmit() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.$store
                        .dispatch("editMallFreight", this.formData)
                        .then(() => {
                            this.loading = true;
                        });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        defaultData(type) { console.log(type)
            if (type == 1) {
                for (let k in this.formData) {
                    let kk = k.toUpperCase();
                    this.formData[k] = this.dataItem[kk];
                }
                this.formData.IsDefault = this.formData.IsDefault
                    ? true
                    : false;
                this.formData.id = this.dataItem.ID;
                this.formData.Type = 0;
            } else {
                this.formData = {
                    Name: "",
                    Type: 0, // 计价方式 0=计数，1=计量
                    MinQty: 1, // 最低数量
                    MinMoney: 6, // 最低运费
                    AddQty: 0, //新增数量
                    AddMoney: 0, // 新增运费
                    IsDefault: false // 是否默认
                };
            }
            this.loading = false;
        }
    },
    created() { 
        if (this.pageState && Object.keys(this.dataItem).length > 0) {
            this.defaultData(1);
        } else {
            this.defaultData(0);
        }
    }
};
</script>