<template>
    <div class='addSupplier'>
        <el-form :model='Info' :inline="false" :rules="rules" ref="Info" label-width="100px">
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form-item label="供应商名称" prop='SupplierName'>
                        <el-input size='small' autocomplete='off' v-model="Info.SupplierName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="联系人" prop='Linker'>
                        <el-input size='small' autocomplete="off" v-model="Info.Linker"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="手机号" prop='PhoneNo'>
                        <el-input size='small' autocomplete="off" v-model.Number="Info.PhoneNo"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="期初欠款">
                        <el-input size='small' v-model="Info.FirstMoney"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="电话">
                        <el-input size='small' v-model="Info.Tel"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="传真">
                        <el-input size='small' v-model="Info.Fax"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="邮箱">
                        <el-input size='small' v-model="Info.Email"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="银行名称">
                        <el-input size='small' v-model="Info.BankCardName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="银行账户">
                        <el-input size='small' v-model="Info.BankCardNo"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="持卡人">
                        <el-input size='small' v-model="Info.CardHolder"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="地址">
                        <el-cascader size='small'
                            :options="areaOptions"
                            v-model="selectedAreaOptions"
                            show-all-levels
                            expand-trigger="hover"
                            class="full-width"
                        ></el-cascader>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label='详细地址'>
                        <el-input size="small" v-model="Info.Address"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="备注">
                        <el-input size='small' type='textarea'  v-model="Info.Remark"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24">
                    <el-form-item class="fformFooter text-center">
                        <el-button @click="closeModal" type='info'>取 消</el-button>
                        <el-button type="primary" @click="submitForm">保 存</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
import { CityInfo } from "@/assets/js/area.js";
import { mapGetters, mapState } from 'vuex';
export default {
    props: {
        dealSupplier: {
            type: Object, 
            default: function() {
                return { value: 1, dealState: "add" }
            }
        }
    },
    data(){
        let checkTel = (rule, value, callback) => {
            if (!value) {
                return callback(new Error("手机号码不能为空"));
            }
            setTimeout(() => {
                let myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
                if (!myreg.test(value)) {
                    callback(new Error("请输入正确的手机号码"));
                } else {
                    callback();
                }
            }, 800);
        };

        let checkName = (rule, value, callback) => {
            if(!value){
                return callback(new Error("手机号码不能为空"));
            }
            setTimeout(() =>{
                let myreg = /^[0-9]*$/
                if(myreg.test(value)){
                    callback(new Error('供应商名称不能为纯数字'))
                }else{
                    callback()
                }
            }, 800)
        }
        
        return {
            Info: { },
            rules: {
                SupplierName: [{
                    required: true,
                    validator: checkName,
                    trigger: "blur"
                }],
                Linker: [{
                    required: true,
                    message: "请输入联系人",
                    trigger: "blur"
                }],
                PhoneNo: [{
                    required: true,
                    validator: checkTel,
                    trigger: "blur"
                }]
            },
            areaOptions: CityInfo,
            selectedAreaOptions: [],
            loading: false,
            supplierItemInfo:{}
        }
    },
    mounted(){ },
    computed:{
        ...mapGetters({
            addSupplierState : 'addSupplierState',
            goodssupplierState:'goodssupplierState',
            dataItem:'supplierItem'
        })
    },
    watch:{
        dataItem(data){
            this.supplierItemInfo = data
            this.defaultData()
        },
        goodssupplierState(data){
            this.$emit('resultSupplierArr', [...data.data.List])
        },
        addSupplierState(data){
            this.$message({ type: data.success ? 'success' : 'error', message: data.message })
            this.loading = false
            if(data.success) {
                this.$store.dispatch("getGoodssupplierList",{}).then(() => {
                    this.closeModal()
                })
            }
        },
    },

    methods:{
        closeModal() {
            this.$refs['Info'].resetFields();
            this.$emit("resetList");
        },
        defaultData(){
            let data = this.supplierItemInfo
            this.Info = {
                ID: data.ID,
                SupplierName: data.NAME,
                Linker: data.LINKER,
                PhoneNo: data.PHONENO,
                FirstMoney:data.FIRSTMONEY,
                Tel: data.TEL,
                Fax: data.FAX,
                Email: data.EMAIL,
                BankCardName: data.BANKCARDNAME,
                BankCardNo: data.BANKCARDNO,
                CardHolder: data.CARDHOLDER,
                Address: data.ADDRESS,
                Remark: data.REMARK,
                PROVINCEID: data.PROVINCEID,
                CITYID: data.CITYID,
                DISTRICTID: data.DISTRICTID
            }
        },
        submitForm() {
            let _this = this;
            this.$refs.Info.validate(valid => {
                if (valid) {
                    if(this.getAreaLabel() != ''){
                        let address = this.getAreaLabel().split(',')
                        this.Info.PROVINCEID = address[0]
                        this.Info.CITYID = address[1]
                        this.Info.DISTRICTID = address[2]
                    }
                    let sendData = this.Info
                    sendData.ID = this.Info.ID ? this.Info.ID : ''
                    sendData.Name = this.Info.SupplierName
                    this.$store.dispatch('addSupplier', sendData).then(()=>{
                        this.loading = true
                    })
                } else {
                    return false;
                }
            });
        },
        getAreaLabel() {
            let seled = [...this.selectedAreaOptions];
            let areaStr = "";
            if (seled.length == 0) return areaStr;
            for (let i = 0; i < this.areaOptions.length; i++) {
                if (this.areaOptions[i].value == seled[0]) {
                    areaStr += this.areaOptions[i].label + ",";
                    for (let j = 0; j < this.areaOptions[i].children.length; j++) {
                        if (this.areaOptions[i].children[j].value == seled[1]) {
                            areaStr += this.areaOptions[i].children[j].label + ",";
                            let karr = [...this.areaOptions[i].children[j].children];
                            for (let k = 0; k < karr.length; k++) {
                                if (karr[k].value == seled[2]) {
                                    areaStr += karr[k].label;
                                    break;
                                }
                            }
                            break;
                        }
                    }
                    break;
                }
            }
            return areaStr;
        },
        setAddress(address) {
            let seled = address.split(" ");
            let areaStr = [];
            let defauleArr = [...this.areaOptions];
            for (let i = 0; i < defauleArr.length; i++) {
                if (defauleArr[i].label == seled[0]) {
                    areaStr.push(defauleArr[i].value);
                    for (let j = 0; j < defauleArr[i].children.length; j++) {
                        if (defauleArr[i].children[j].label == seled[1]) {
                            areaStr.push(defauleArr[i].children[j].value);
                            let karr = [...defauleArr[i].children[j].children];
                            for (let k = 0; k < karr.length; k++) {
                                if (karr[k].label == seled[2]) {
                                    areaStr.push(karr[k].value);
                                    break;
                                }
                            }
                            break;
                        }
                    }
                    break;
                }
            }
            this.selectedAreaOptions = [...areaStr];
            this.ruleForm.address = seled[3];
        }
    }
}
</script>

