<template>
    <el-container>
        <el-header style="height:50px; padding: 0">
            <headerPage></headerPage>
        </el-header>

        <el-container>

            <el-aside width="100px">
                <section style="min-width:100px;">
                    <memberMenu :activePath="activePath" :routesList="routesList" :width="100"></memberMenu>
                </section>
            </el-aside>

            <el-container>
                <div class="content-new-fex">
                    <div class="content-eighty">
                        <div class="content-center">
                            <el-button icon="el-icon-plus" size="small" type="primary" @click="handleNew" plain>创建活动</el-button>
                            <el-date-picker size="small"
                                v-model="dateBE"
                                type="daterange"
                                value-format="timestamp"
                                range-separator="至"
                                @change='defaultData'
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                class="m-left-sm"
                            ></el-date-picker>
                        </div>
                    </div>

                    <div class="content-table4">
                        <div class="content-table-center">

                            <!-- 注册有礼列表 -->
                            <el-table :data='tableData' border size='small' :loading='loading' header-row-class-name="bg-f1f2f3" style="width: 100%;">
                                <el-table-column label="活动名称" prop='NAME'></el-table-column>
                                <el-table-column label="活动时间">
                                    <template slot-scope="scope">
                                        <span>{{new Date(scope.row.BEGINDATE) | time}} 至 {{new Date(scope.row.ENDDATE) | time}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="活动状态">
                                    <template slot-scope="scope">
                                        {{scope.row.ISSTART == 1 ? '启用' : '停用'}}
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作">
                                    <template slot-scope='scope'>
                                        <el-button size='small' type="text" @click='editCurItem(scope.row)'>编辑</el-button>
                                        <el-button size='small' type="text" @click='delCurItem(scope.row)'>删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>

                            <!-- 分页 -->
                            <div class="m-top-sm clearfix elpagination">
                                <el-pagination
                                    @size-change="handlePageChange"
                                    @current-change="handlePageChange"
                                    :current-page.sync="pagination.PN"
                                    :page-size="pagination.PageSize"
                                    layout="total, prev, pager, next, jumper"
                                    :total="pagination.TotalNumber"
                                    class="text-right"
                                ></el-pagination>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 创建活动 -->
                <el-dialog :title='titleName' :visible.sync="showDialog" append-to-body width="50%" :before-close="cancelDialog">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
                        <el-form-item label="活动名称" prop="Name">
                            <el-input size="small" v-model="ruleForm.Name" placeholder="请输入活动名称" clearable style='width: 80%'></el-input>
                        </el-form-item>

                        <el-form-item label="活动时间" prop="dateBE">
                            <el-date-picker size="small"
                                v-model="ruleForm.dateBE"
                                type="daterange"
                                value-format="timestamp"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                style='width:80%'
                            ></el-date-picker>
                        </el-form-item>

                        <el-form-item label='是否启用'>
                            <el-switch v-model="ruleForm.IsStart" active-color="#409eff" inactive-color="#cccccc"></el-switch>
                        </el-form-item>

                        <el-form-item label="活动详情">
                            <el-input type='textarea' size='small' v-model='ruleForm.Remark' placeholder="请输入活动详情(不超过40字)" :maxlength="40" style='width:80%'></el-input>
                        </el-form-item>

                        <el-row :gutter="10">
                            <span :span='24' class='titleStyle'>营销内容</span>
                        </el-row>
                        
                        <el-row :gutter="10" style='margin-top:16px'>
                            <span :span='5' style='padding-left: 20px'><el-checkbox v-model="ruleForm.IsSendIntegtal">送积分</el-checkbox></span>
                            <span :span='19' >
                                <el-input placeholder="请输入积分" size="small" type="number" :disabled="!ruleForm.IsSendIntegtal" v-model.number="ruleForm.Integtal" style='width:65%; margin-left:20px'>
                                    <template slot="prepend">首次开卡送</template>
                                    <template slot='append'>积分</template>
                                </el-input>
                            </span>
                        </el-row>

                        <el-row :gutter="10" style='margin-top:16px'>
                            <span :span='5' style='padding-left: 20px'><el-checkbox v-model="ruleForm.IsSendMoney">送余额</el-checkbox></span>
                            <span :span='19' >
                                <el-input placeholder="请输入余额" size="small" type="number" :disabled="!ruleForm.IsSendMoney" v-model.number="ruleForm.Money" style='width:65%; margin-left:20px'>
                                    <template slot="prepend">首次开卡送</template>
                                    <template slot='append'>&nbsp;&nbsp;元&nbsp;</template>
                                </el-input>
                            </span>
                        </el-row>

                        <el-row :gutter="8" style='margin-top:16px;'>
                            <span :span='5' style='padding-left: 20px'><el-checkbox v-model="ruleForm.IsSendCoupon">送优惠券</el-checkbox></span>
                            <span :span='10'>
                                <el-button type='text' :disabled="!ruleForm.IsSendCoupon" size="small" @click='showCouponClick' style='margin-left:10px'>选择优惠券</el-button>
                            </span>
                        </el-row>

                        <div class="coupont full-width pull-left select-list-cont" style='padding-left:15%; margin-bottom:30px'>
                            <ul>
                                <li v-for="(item, i) in ruleForm.CouponList" :key="i">
                                    <div class="coupont-list">
                                        <div class="coupont-list-top">
                                            <div style="height:20px;width:100%;line-height: 20px;">
                                                <span style='font-size:20px'>￥{{item.MONEY}}</span>
                                                <span style='padding-left:4px; font-size:12px'>满{{item.LIMITMONEY}}元可用</span>
                                                <i @click="seletDelete(item, i)" class="el-icon-delete pull-right" style="margin-right:8px; color:#333;font-size:18px; cursor:pointer"></i>
                                            </div>
                                            <div style="height:20px;width:100%;line-height: 20px;font-size:12px;">
                                                <span>{{item.DATENAME.substr(0,3)}}{{item.DATENAME.substr(14, 24)}}</span>
                                            </div>
                                        </div>
                                        <div class="coupont-list-bottom">
                                            {{item.REMARK == undefined ? '[全品类]可用' : item.REMARK}}
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div class='text-align' style='margin-top:30px; width:100%; padding-left:16% '>
                            <el-button type="primary" @click='submitAdd'>保存</el-button>
                            <el-button @click='cancelDialog'>取消</el-button>
                        </div>
                        
                    </el-form>
                </el-dialog>

                <el-dialog title='选择优惠券' :visible.sync="showCouponDialog" append-to-body width='60%'>
                    <div class="select-list">
                        <div v-if='CouponList.length == 0'> 无可用优惠券 </div>
                        <div v-else class="select-list-cont">
                            <ul>
                                <li v-for="(item,index) in CouponList" :key="index">
                                    <div class="coupont-list" @click="selectListCont(index,item)" :class="item.isSelect==true?'select-border':''">
                                        <div class="coupont-list-top">
                                            <div style="height:20px;width:100%;line-height: 20px;">
                                                <span style='font-size:20px'>￥{{item.MONEY}}</span>
                                                <span style='padding-left:4px; font-size:12px'>满{{item.LIMITMONEY}}元可用</span>
                                            </div>
                                            <div style="height:20px;width:100%;line-height: 20px;font-size:12px;">
                                                <span>{{item.DATENAME.substr(0,3)}} {{item.DATENAME.substr(14, 24)}}</span>
                                            </div>
                                        </div>
                                        <div class="coupont-list-bottom">
                                            {{item.REMARK == undefined ? '[全品类]可用' : item.REMARK}}
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="m-top-sm clearfix elpagination">
                        <el-pagination
                            @size-change="handlePageChange1"
                            @current-change="handlePageChange1"
                            :current-page.sync="pagination1.PN"
                            :page-size="pagination1.PageSize"
                            layout="total, prev, pager, next, jumper"
                            :total="pagination1.TotalNumber"
                            class="text-center"
                        ></el-pagination>
                    </div>
                    <div class='full-width text-center m-top-md'>
                        <el-button type="primary" @click="ruleForm.CouponList = selectlist; showCouponDialog = false">确 认</el-button>
                        <el-button @click='showCouponDialog = false'>取 消</el-button>
                    </div>
                </el-dialog>
            </el-container>
        </el-container>
    </el-container>
    
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { getHomeData } from '@/api/index'
import MIXINS_MARKETING from "@/mixins/marketing.js";
export default {
    mixins: [MIXINS_MARKETING.MARKETING_MENU],
    data() {
        return {
        dateBE: [
            new Date(this.getCustomDay(-7)).getTime(),
            new Date().getTime()
        ],
        showDialog: false,
        showSelectC: false,
        showCouponDialog: false,
        titleName:'新增注册有礼',
        ruleForm:{
            Id: '',
            Name: '',
            dateBE: [],
            IsSendIntegtal: false,
            Integtal: '',
            CouponList: [],
            IsSendCoupon: false,
            IsSendMoney: false,
            IsStart: 1,
            Money: '',
            Remark: ''
        },
        rules:{
            Name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
            dateBE: [{ required: true, message: '请选择时间', trigger: 'change' }]
        },
        type: 'add',
        tableData: [],
        loading: false,
        pagination: {
            TotalNumber: 0,
            PageNumber: 0,
            PageSize: 20,
            PN: 1
        },
        pagination1: {
            TotalNumber: 0,
            PageNumber: 0,
            PageSize: 20,
            PN: 1
        },
        PN:1,
        CouponList:[]
        }
    },
    computed: {
        ...mapGetters({
            registerGiftsData:'registerGiftsData',
            registerGiftsDataState:'registerGiftsDataState',
            delRegisterGiftsState:'delRegisterGiftsState',
            dealRegisterGiftsState:'dealRegisterGiftsState',
            couponListState: "marketingShopListState2",
            registerGiftsItem:'registerGiftsItem'
        })
    },
    components: {
        headerPage: () => import("@/components/header")
    },
    watch:{
      registerGiftsItem(data){
        if(data.success){
            let obj = data.data.Obj
            this.ruleForm = {
                Id: obj.ID,
                Name: obj.NAME,
                dateBE:[obj.BEGINDATE, obj.ENDDATE],
                IsSendIntegtal: obj.ISSENDINTEGRAL,
                Integtal: obj.INTEGRAL == 0 ? '' : obj.INTEGRAL,
                CouponList: data.data.CouponObj,
                IsSendCoupon: obj.ISSENDCOUPON,
                IsSendMoney: obj.ISSENDMONEY,
                IsStart: obj.ISSTART == 1 ? true : false,
                Money: obj.MONEY == 0 ? '' : obj.MONEY,
                Remark: obj.REMARK == 'undefined' ? '' : obj.REMARK
            }
            this.showDialog = true
          }
      },
      couponListState(data){
        this.CouponList = []
        data.DataArr.forEach(item => {
            this.$set(item, "isSelect" , false)
            this.CouponList.push(item)
        })

        this.pagination1 = {
            PN: data.PN,
            PageNumber: data.PageNumber,
            PageSize: data.PageSize,
            TotalNumber: data.TotalNumber
        }
      },
      registerGiftsDataState(data){
        this.loading = false
        this.tableData = data.PageData.DataArr
        this.pagination = {
          TotalNumber: data.PageData.TotalNumber,
          PageNumber: data.PageData.PageNumber,
          PageSize: data.PageData.PageSize,
          PN: data.PageData.PN
        }
        this.PN = data.PageData.PN
      },
      dealRegisterGiftsState(data){
        this.cancelDialog()
        if(data.success){
            this.defaultData()
        }
        this.$message({ type: data.success ? 'success' : 'error', message: data.message })
      },
      delRegisterGiftsState(data){
        if(data.success){
            if(this.pagination.TotalNumber - 1 < 21)
                this.PN = 1
            this.defaultData()
        }
        this.$message({ type: data.success ? 'success' : 'error', message: data.message })
      }
    },
    methods:{
        cancelDialog(){
            this.showDialog = false
            this.$refs.ruleForm.resetFields();
            this.ruleForm = {
                Remark : '',
                Name : '',
                IsSendCoupon : false,
                IsSendIntegtal : false,
                IsSendMoney : false,
                CouponList : [],
                Integtal : '',
                Money : '',
                IsStart : 1
            }
        },
        editCurItem(row){
            this.$store.dispatch('getRegisterGiftsItem', { Id: row.ID }).then(()=>{
                this.type = 'edit'
                this.titleName ='编辑注册有礼'
            })
        },
        seletDelete(item1, idx){
            this.ruleForm.CouponList.forEach(item => {
                if(item.BILLID==item1.BILLID){
                    this.ruleForm.CouponList.splice(idx,1);
                }
            })
        },
        selectListCont(e,items) {
            this.CouponList[e].isSelect = !this.CouponList[e].isSelect;
            this.selectlist = this.CouponList.filter((item) => {
                return item.isSelect != false
            })
        },
        showCouponClick(){
            this.$store.dispatch('getMarketingShopList2', {}).then(()=>{
                this.showCouponDialog = true
            })
        },
        handlePageChange: function(currentPage) {
        if (this.PN == currentPage || this.loading) {
            return
        }
        this.PN = parseInt(currentPage);
        this.defaultData()
        },
        handlePageChange1: function(currentPage) {
            this.$store.dispatch('getMarketingShopList2', {PN: parseInt(currentPage) }).then(()=>{
                this.showCouponDialog = true
            })
        },
        submitAdd(){
            let arr = this.ruleForm.CouponList, CouponList = []
            for(var i in arr){
                CouponList.push({'BillId' : arr[i].BILLID })
            }
            let sendData = {
                Id: this.ruleForm.Id,
                Name: this.ruleForm.Name,
                BeginDate: this.ruleForm.dateBE[0],
                EndDate: this.ruleForm.dateBE[1],
                IsStart: this.ruleForm.IsStart == false ? 0 : 1,
                IsSendIntegtal: this.ruleForm.IsSendIntegtal == false ? 0 : 1,
                Integtal: this.ruleForm.IsSendIntegtal == false ? 0 : this.ruleForm.Integtal,
                IsSendMoney: this.ruleForm.IsSendMoney == false ? 0 : 1,
                Money: this.ruleForm.IsSendMoney == false ? 0 : this.ruleForm.Money,
                IsSendCoupon: this.ruleForm.IsSendCoupon == false ? 0 : 1,
                CouponList: this.ruleForm.IsSendCoupon == false ? JSON.stringify([]) :JSON.stringify(CouponList),
                Remark: this.ruleForm.Remark
            }

            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    this.$store.dispatch('DealRegisterGifts',{ type: this.type, data: sendData })
                }
            })
        },
        delCurItem(row){
            this.$confirm('确认删除活动 【'+ row.NAME +' 】?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$store.dispatch('delRegisterGiffs', { Id : row.ID })
            }).catch(() => { })
        },
        handleNew(){
            this.showDialog = true
            this.titleName = '新增注册有礼'
            this.type = 'add'
        },
        defaultData(){
            let sendData = {
                PN: this.PN,
                Filter: '',
                BeginDate: this.dateBE[0],
                EndDate: this.dateBE[1]
            }
            this.$store.dispatch('getRegisterGiftsData',sendData).then(()=>{
                this.loading = true
            })
        }
    },
    mounted(){
        this.defaultData()
    }
}
</script>

<style lang="scss" scoped >
.coupont ul li{
    float: left;
    margin-right: 20px;
    margin-top: 8px;
}
.coupont-list{
    width: 200px;
    height: 100px;
    border: solid 1px #3EA9FF;
    color: #fff;
}

.coupont-list-top{
    width: 100%;
    padding:10px 2px;
    height: 64px;
    background: #3EA9FF;
}
.coupont-list-bottom{
    height: 34px;
    width: 94%;
    padding: 0 3%;
    line-height: 35px;
    font-size: 11px;
    color: #666666;
}

.selectList{
  height: 50px;
  width: 100%;
  line-height: 50px;
  border-bottom: solid 1px #F4F6F8;
  border-top: solid 1px #F4F6F8;
}
.selectList ul li{
  float: left;
  width: 50%;
  text-align: center;
}
.select-list{
  margin-top: 20px;
  width: 100%;
  height:400px;
  overflow: auto;
}
.select-list ul li{
    float: left;
    margin-right: 20px;
    margin-top: 10px;
}
.select-border{ 
  border: solid 2px #F8493B;
}
.select-list-cont{
  position: relative;
}
.select-list-bottom{
  height: 100px;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.foot-bottom{
  margin-top: 20px;
  width: 100%;
  height: 80px;
  text-align: center;
}
.foot-con{
  margin-top: 20px;
  width: 100%;
  height: 80px;
  text-align: center;
}
.titleStyle{
    border:1px solid #ccc; background:#f2f2f2; margin-left:16px; padding: 4px 10px; width:80%; float:left;border-radius: 5px
}

    .member-header{
        display: flex;
        align-items: center;
        height: 50px;
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


