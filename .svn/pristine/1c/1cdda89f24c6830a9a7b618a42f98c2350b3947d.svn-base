<template>
    <div>
        <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="联系人">
                <!-- <el-input v-model="form.NAME" placeholder="请输入商城名称"></el-input> -->
                <span>{{form.NAME}}</span>
            </el-form-item>
            <el-form-item label="联系电话">
                <!-- <el-input v-model.number="form.MOBILENO" placeholder="请输入联系电话"></el-input> -->
                <span>{{form.MOBILENO}}</span>
            </el-form-item>
            <el-form-item label="联系地址">
                <el-select
                    v-model="form.PROVINCE"
                    placeholder="请选择省份"
                    @change="addressfun1"
                    style="width:32%"
                >
                    <el-option v-if="provinceList.length==0" label="请选择" value="-1"></el-option>
                    <el-option
                        v-for="(item,i) in provinceList"
                        :key="i"
                        :label="item.NAME"
                        :value="item.NAME"
                    ></el-option>
                </el-select>
                <el-select
                    v-model="form.CITY"
                    placeholder="请选择城市"
                    @change="addressfun2"
                    style="width:32%"
                >
                    <el-option v-if="cityList.length==0" label="请选择" value="-1"></el-option>
                    <el-option
                        v-for="(item,i) in cityList"
                        :key="i"
                        :label="item.NAME"
                        :value="item.NAME"
                    ></el-option>
                </el-select>
                <el-select v-model="form.DISTRICT" placeholder="请选择地区" style="width:32%">
                    <el-option v-if="districtList.length==0" label="请选择" value="-1"></el-option>
                    <el-option
                        v-for="(item,i) in districtList"
                        :key="i"
                        :label="item.NAME"
                        :value="item.NAME"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="详细地址">
                <el-input v-model="form.ADDRESS" clearable placeholder="请输入详细地址"></el-input>
            </el-form-item>
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
    props: ["pageData"],
    data() {
        return {
            form: {
                NAME: "",
                MOBILENO: "",
                PROVINCE: "",
                CITY: "",
                DISTRICT: "",
                ADDRESS: ""
            }
        };
    },
    computed: {
        ...mapGetters({
            provinceList: "provinceList",
            cityList: "cityList",
            districtList: "districtList"
        })
    },
    watch: {
        pageData(data) {
            if (data.state) {
                this.defaultData(data);
            }
        }
    },
    methods: {
        onSubmit() {
            this.$emit("resetModal", this.form);
        },
        addressfun1: function(v) {
            let item = this.provinceList.find(item => item.NAME == v);
            this.$store.dispatch("getCity", { Pid: item.ID }).then(() => {
                this.form.CITY = "";
            });
        },
        addressfun2: function(v) {
            let item = this.cityList.find(item => item.NAME == v);
            this.$store.dispatch("getDistrict", { Pid: item.ID }).then(() => {
                this.form.DISTRICT = "";
            });
        },
        defaultData(data) {
            let aArr = data.address.split(" ");
            this.form = {
                NAME: data.name,
                MOBILENO: data.phone,
                PROVINCE: "",
                CITY: "",
                DISTRICT: "",
                ADDRESS: data.address
            };
            if (this.provinceList.length == 0) {
                this.$store.dispatch("getProvince", {});
            }
        }
    },
    created() {
        this.defaultData(this.pageData);
    }
};
</script>