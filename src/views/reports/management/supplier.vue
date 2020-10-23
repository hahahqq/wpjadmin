<template>
    <el-container>
        <div class="content-new-fex">
            <div class="content-eightys">
                <div class="content-center bg-white">
                    <span class="pull-left reportInfo">
                        <el-button type="primary" size="small" icon='el-icon-plus' @click="handlePayMoney('',{}, 1)" plain>还款</el-button>
                        <el-button type="primary" size="small" icon='el-icon-plus' @click="handleFirstMoney('',{}, 1)" plain>期初欠款</el-button>
                    </span>
                    <span class='pull-right'>
                        <el-button icon="el-icon-upload" size="small"  type="primary" plain @click="ExportRowFun()">导出表格</el-button>
                        <el-input
                            type="default" size="small"
                            v-model="Filter"
                            placeholder="请输入供应商名称、联系人或手机号码"
                            class="pull-right"
                            @keyup.enter.native='searchfun()'
                            style="width: 300px; margin-left: 20px"
                        >
                            <el-button slot="append" type="default" icon="el-icon-search" @click="searchfun()"></el-button>
                        </el-input>
                    </span>
                </div>
            </div>

            <div class="content-table4">
                <div class="content-table-center">
                    <el-table
                        border size='small'
                        :data='tableList'
                        :height="tableHeight"
                        v-loading='loading'
                        element-loading-text='数据加载中...'
                        header-row-class-name="bg-f1f2f3"
                        class="full-width m-top-sm"
                        show-summary
                        :summary-method="getSummaries"
                    >   
                        <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
                        <el-table-column prop='NAME' label="供应商名称"></el-table-column>
                        <el-table-column prop='LINKER' label="联系人" width="80px" align="center"></el-table-column>
                        <el-table-column prop='PHONENO' label="手机号" align="center" width="120"></el-table-column>
                        <el-table-column prop='FIRSTMONEY' label="期初欠款" width="90px" align='right' ></el-table-column>
                        <el-table-column prop='PURCHASEMONEY' label="增加应付款" width="90px" align='right'></el-table-column>

                        <el-table-column prop='PAYMONEY' label="支付金额" width="90px" align='right'></el-table-column>
                        <el-table-column prop='CURRMONEY' label="欠供应商款" width="90px" align='right'></el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click='handleView(scope.$index, scope.row)'>详情</el-button>
                                <el-button type='text' size="small" @click="handlePayMoney(scope.$index,scope.row, '2')">还款</el-button>
                                <el-button type='text' size="small" @click="handleFirstMoney(scope.$index,scope.row, '2')">期初调整</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>

            <el-dialog title='详情' :visible.sync="showDialog" width='80%' append-to-body >
                <el-row :gutter="24">
                    <el-col :span="3">期初结存 :  {{itemObj.FIRSTMONEY}}</el-col>
                    <el-col :span="4">增加应付款 :  {{itemObj.ADDMONEY}}</el-col>
                    <el-col :span="4">支付合计 :  {{itemObj.PAYMONEY}}</el-col>
                    <el-col :span="4">期末欠款 :  {{itemObj.EndMONEY}}</el-col>
                    <el-col :span="8" class="pull-right">
                        <el-date-picker size="small"
                            v-model="dateChoose"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="timestamp"
                            class="full-width pull-right"
                            @change='chooseDateFun'
                        ></el-date-picker>
                    </el-col>
                </el-row>

                <el-table border size='small' :data='tableItem' v-loading='ItemLoading' element-loading-text='数据加载中...' height="400" header-row-class-name="bg-f1f2f3" class="full-width m-top-sm">
                    <el-table-column label="时间" align="center">
                        <template slot-scope="scope">
                            <span>{{ new Date(scope.row.BILLDATE) | timehf}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop='BILLNO' label="单号" align="center"></el-table-column>
                    <el-table-column prop='BILLTYPE' label="单据类型" align="center"></el-table-column>
                    <el-table-column prop='ADDMONEY' label="增加金额" align="center"></el-table-column>
                    <el-table-column prop='PAYMONEY' label="实付金额" align="center"></el-table-column>
                    <el-table-column prop='CURMONEY' label="累计应付金额" align="center"></el-table-column>
                    <!-- <el-table-column label="操作">
                        <template slot-scope='scope'>
                            <el-button type='text' @click='handleViewItem($scope.$index, scope.row)'>详情</el-button>
                        </template>
                    </el-table-column> -->
                </el-table>

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
            </el-dialog>

            <el-dialog title='供应商还款' :visible.sync="showPayMoneyDialog" width="50%" append-to-body>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" :hide-required-asterisk='true' label-width="100px">
                    <el-row :gutter="10">
                        <el-col :span="24">
                            <el-form-item label="供应商名称：" prop="SupplierId">
                            <span v-if='isSelectSupplier == 1'>
                                    <el-select v-model="ruleForm.SupplierId" @change='referData' size='small' clearable placeholder="请选择供应商" style='width:70%' >
                                        <el-option v-for="(item,i) in supplierList" :key="i" :label="item.NAME" :value="item.ID"></el-option>
                                    </el-select>
                            </span>
                            <span v-else>{{ruleForm.NAME}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24" v-if='isSelectSupplier == 2'>
                            <el-form-item label="应付金额：">{{ruleForm.CURRMONEY}}</el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="业务时间：">{{ new Date(BillDate) | time}}</el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="付款账户：" prop="PayTypeId">
                                <el-select size="small" v-model="ruleForm.PayTypeId" @change='referData' clearable style="width:70%" placeholder="选择账户">
                                    <el-option v-for="item in SelectPaywayList" :key="item.ID" :label="item.NAME" :value="item.ID"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="实付金额：" prop="PayMoney">
                                <el-input type="number" size="small" placeholder="请输入实付金额" style="width:70%" v-model='ruleForm.PayMoney'></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="备注：">
                                <el-input size="small" type="textarea" placeholder="请输入备注" style="width:70%" v-model='ruleForm.Remark'></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item>
                                <el-button @click="showPayMoneyDialog = false; $refs.ruleForm.resetFields()">取消</el-button>
                                <el-button type="primary" @click="submitForm">保存</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-dialog>

            <el-dialog title='供应商期初欠款' :visible.sync="showFirstMoneyDialog" width="30%" append-to-body>
                <el-form :model="ruleFirstForm" :rules='rulesFirst' ref='ruleFirstForm' :hide-required-asterisk='true' label-width="100px">
                    <el-row :gutter="10">
                        <el-col :span="24">
                            <el-form-item label="供应商名称：" prop='ID'>
                            <span v-if='isSelectSupplier == 1'>
                                    <el-select v-model="ruleFirstForm.ID" size='small' @change='referData' clearable placeholder="请选择供应商" style='width:80%' >
                                        <el-option v-for="(item,i) in supplierList" :key="i" :label="item.NAME" :value="item.ID"></el-option>
                                    </el-select>
                            </span>
                            <span v-else>{{ruleFirstForm.NAME}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="期初欠款：" prop='Money'>
                                <el-input type="number" size="small" placeholder="请输入期初欠款金额" style="width:80%" v-model='ruleFirstForm.Money'></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="24">
                            <el-form-item>
                                <el-button @click="showFirstMoneyDialog = false; $refs.ruleFirstForm.resetFields()">取消</el-button>
                                <el-button type="primary" @click="submitFirstForm">保存</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-dialog>
        </div>
    </el-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import MIXINS_REPORT from "@/mixins/report"; 
import dayjs from 'dayjs'
export default {
    mixins: [MIXINS_REPORT.SIDERBAR_MENU, MIXINS_REPORT.COMMOM_PAGE],
    data() {
        return {
            dateChoose: '',
            tableList:[],
            tableItem:[],
            Filter:'',
            loading: false,
            showDialog: false,
            ItemLoading: false,
            pagination: {
                TotalNumber: 0,
                PageNumber: 0,
                PageSize: 20,
                PN: 1
            },
            isSelectSupplier: 1,
            pageData:{
                BeginDate: 1,
                EndDate:9999999999999,
                SupplierId: '',
                PN:1
            },
            itemObj:{},
            tableHeight: document.body.clientHeight - 200,
            showPayMoneyDialog: false,
            showFirstMoneyDialog: false,
            BillDate: dayjs(),
            ruleForm:{ SupplierId:'' },
            rules:{
                SupplierId: [{ required: true, message: '请选择供应商', trigger: 'change' }],
                PayTypeId:[{ required: true, message: '请选择付款方式', trigger: 'change' }],
                PayMoney:[{ required: true, message: '请输入实付金额', trigger: 'blur' }]
            },
            rulesFirst:{
                ID: [{ required: true, message: '请选择供应商', trigger: 'change' }],
                Money: [{required: true, message: '请输入期初金额', trigger: 'blur' }]
            },
            ruleFirstForm:{
                ID:'', NAME: '', Money:''
            },
            supplierList:[],
            SelectPaywayList:[]
        }
    },
    methods:{
        ExportRowFun(){
            var list = this.tableList
            var head = [ "供应商名称", "联系人", "手机号", "期初欠款", "增加应付款", "支付金额", "欠供应商款"];
            var val =  [ "NAME", "LINKER", "PHONENO", "FIRSTMONEY", "PURCHASEMONEY", "PAYMONEY", "CURRMONEY"]

            var title = "供应商对账报表" + this.getNowDateTime();
            this.export2Excel(head, val, list, title);
        },
        searchfun(){
            this.$store.dispatch('getSupplilerReport', { Filter: this.Filter }).then(()=>{
                this.loading = true
            })
        },
        referData(value){
            this.$forceUpdate()
        },
        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '合计';
                    return;
                }
                if(index == 3){
                    sums[index] = ''
                    return
                }

                const values = data.map(item => Number(item[column.property]));
                if (!values.every(value => isNaN(value))) {
                sums[index] = values.reduce((prev, curr) => {
                    const value = Number(curr);
                    if (!isNaN(value)) { return prev + curr }
                    else { return prev }
                }, 0);
                sums[index] += '';
                } else {
                sums[index] = '';
                }
            })

            return sums;
        },
        handleView(idx, row){
            this.pageData.SupplierId = row.ID
            let sendData = { BeginDate: this.getMonthoneTime(), EndDate: this.getNonthlastTime(), SupplierId: row.ID, PN: 1}
            this.dateChoose = [ this.getMonthoneTime(), this.getNonthlastTime()]
            
            this.$store.dispatch('getSupplierReportItem', sendData).then(()=>{
                this.showDialog = true
                this.ItemLoading = true
            })
            this.itemObj = {}
        },
        handlePayMoney(idx, row, type){
            if(row.CURRMONEY <= 0){
                this.$message('当前供应商无欠供应商款')
                return
            }
            this.showPayMoneyDialog = true
            this.isSelectSupplier = type
            if(type == 1){
                this.ruleForm = {
                    SupplierId: '',
                    PayTypeId:'',
                    PayMoney:'',
                    Remark: ''
                }
                this.$store.dispatch("getGoodssupplierList",{})
            }else{
                this.ruleForm = row
                this.ruleForm.SupplierId = row.ID
            }
        },
        handleFirstMoney(idx, row, type){
            this.showFirstMoneyDialog = true
            this.isSelectSupplier = type
            if(type == 1){
                this.ruleFirstForm.ID = ''
                this.ruleFirstForm.NAME = ''
                this.$store.dispatch("getGoodssupplierList",{})
            }else{
                this.ruleFirstForm = {
                    ID: row.ID,
                    NAME: row.NAME,
                    Money: row.FIRSTMONEY
                }
            }
        },
        handlePageChange: function(currentPage) {
            if (this.pageData.PN == currentPage) {
                return;
            }
            this.pageData.PN = parseInt(currentPage);
            this.searchItemData()
        },
        chooseDateFun(){
            this.pageData.BeginDate = this.dateChoose == null ? '1' : this.dateChoose[0]
            this.pageData.EndDate = this.dateChoose == null ? '9999999999999' : this.dateChoose[1]
            this.pageData.PN = 1
            this.searchItemData()
        },
        searchItemData(){
            let sendData = {
                BeginDate : this.pageData.BeginDate, 
                EndDate: this.pageData.EndDate,
                SupplierId: this.pageData.SupplierId,
                PN: this.pageData.PN
            }
            this.$store.dispatch('getSupplierReportItem', sendData).then(()=>{
                this.ItemLoading = true
            })
        },
        submitForm(){
            let sendData = Object.assign({}, this.ruleForm);
            sendData.BillDate = dayjs().valueOf()
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    this.$store.dispatch("payMoneySupplier", {
                        data: sendData
                    }).then(() => {
                        this.showPayMoneyDialog = false
                    })
                }
            })
        },
        submitFirstForm(){
            this.$refs.ruleFirstForm.validate(valid => {
                if(valid){
                    this.$store.dispatch('setSupplierFirstMoney', { ID: this.ruleFirstForm.ID, Money: this.ruleFirstForm.Money}).then(()=>{
                        this.showFirstMoneyDialog = false
                    })
                }
            })
        }
    },
    computed: {
        ...mapGetters({
            supplierReportState:'supplierReportState',
            supplierReportItem:'supplierReportItem',
            paywayList: "paywayList",
            payMoneySupplierState:'payMoneySupplierState',
            datasupplierList:"goodssupplierList",
            supplierFirstMoney:'supplierFirstMoney'
        })
    },
    watch:{
        paywayList(data){
            let param = data, newParam = []
            for(var i in param){
                if(param[i].NAME != '余额支付' && param[i].NAME != '欠款' && param[i].NAME != '扫码支付'){
                    newParam.push(param[i])
                }
            }
            this.SelectPaywayList = newParam
        },
        datasupplierList(data){
            this.supplierList = data
        },
        supplierFirstMoney(data){
            this.Filter = ''
            this.ruleFirstForm.ID = ''
            this.$refs.ruleFirstForm.resetFields()
            if(data.success){
                this.searchfun()
            }
            this.$message({ type: data.success ? 'success' : 'error', message: data.message })
        },
        payMoneySupplierState(data){
            this.Filter = ''
            this.ruleForm.SupplierId = ''
            this.$refs.ruleForm.resetFields()
            if(data.success){
                this.searchfun()
            }
            this.$message({ type: data.success ? 'success' : 'error', message: data.message })
        },
        supplierReportState(data){
            this.loading = false
            if(data.success){
                this.tableList = [...data.data.List]
            }else{
                this.$message.error(data.message)
            }
        },
        supplierReportItem(data){
            this.ItemLoading = false
            if(data.success){
                this.tableItem = [...data.data.PageData.DataArr]
                this.pagination = {
                    TotalNumber: data.data.PageData.TotalNumber,
                    PageNumber: data.data.PageData.PageNumber,
                    PageSize: data.data.PageData.PageSize,
                    PN: data.data.PageData.PN
                }
                this.itemObj = data.data.Obj
            }else{
                this.$message.error(data.message)
            }            
        }
    },
    mounted(){
        this.searchfun()
        this.$store.dispatch("getPaywayList", {})
    }
}
</script>

<style scoped>
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

    .el-header{
        padding: 0 !important;
    }
    .shop{
        display: flex;
        align-items: center;
        height: 50px;
        position: relative;
    }
    .shop .name{
        position: absolute;
        right: 50px;
        height: 50px;
        line-height: 50px;
        width: 150px;
        text-align: center;
        top: 0;
    }
    .el-header, .el-footer {
        background-color: #fff;
        color: #333;
    }
  
    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .content-eightys{
        display: flex;
        align-items: center;
        width: 100%;
        height: 80px;
        background: #fff;
    }
</style>