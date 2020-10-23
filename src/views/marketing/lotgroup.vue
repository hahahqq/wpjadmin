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
                <el-main style="padding: 10px">
                    <!-- <div> -->
                        <el-form ref="ruleForm" :model="ruleForm" label-width="80px">
                            <el-form-item label="会员">
                                <el-tooltip placement="right">
                                    <div slot="content">
                                        <div v-if="Object.keys(selmemberArr).length>0">
                                            <span v-for="(item ,i) in selmemberArr" :key="i">
                                                <i v-if="i>0">，</i>
                                                {{item.NAME}}
                                            </span>
                                        </div>
                                        <span v-else>请选择会员</span>
                                    </div>
                                    <el-button @click="isShowFirstPopup=true;">
                                        <span v-text="Object.keys(selmemberArr).length>0?'已选'+Object.keys(selmemberArr).length+'人':'请选择'"></span>
                                    </el-button>
                                </el-tooltip>
                            </el-form-item>

                            <el-form-item label="短信通知">
                                <el-switch v-model="ruleForm.IsSMS"></el-switch>
                            </el-form-item>

                            <el-form-item label="优惠卷">
                                <div @click="showCouponClick" style="color:#3ea9ff; cursor:pointer">选择优惠卷</div>
                            </el-form-item>

                            <el-form-item>
                                <!-- 优惠券列表 -->
                                <div class="coupont full-width pull-left select-list-cont" style='margin-bottom:30px'>
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
                            </el-form-item>

                            <el-form-item>
                                <div class='full-width' >
                                    <el-button type="primary" :disabled="ruleForm.CouponList.length == 0" @click="onSubmit">保 存</el-button>
                                </div>
                            </el-form-item>
                        </el-form>

                        <!-- 弹窗选择更多优惠卷 -->
                        <el-dialog title="优惠卷" :visible.sync="showCouponDialog" append-to-body width="54%">
                            <el-tabs v-model="activeName" @tab-click='handleClick'>
                                <el-tab-pane :label="`可用( ${ISINVALID} )`" name='first'></el-tab-pane>
                                <el-tab-pane :label="`不可用( ${ISNOTINVALID} )`" name='second'></el-tab-pane>
                            </el-tabs>

                            <div class="select-list">
                                <div v-if='CouponList.length == 0'> 无可用优惠券 </div>
                                <div v-else class="select-list-cont">
                                    <ul>
                                        <li v-for="(item,index) in CouponList" :key="index">
                                            <div class="coupont-list" @click="selectListCont(index,item)" :class="item.isSelect==true && activeName == 'first' ? 'select-border' : ''">
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

                            <div v-show="pagination.TotalNumber " class="m-top-sm clearfix elpagination">
                                <el-pagination
                                    @size-change="handlePageChange"
                                    @current-change="handlePageChange"
                                    :current-page.sync="pagination.PN"
                                    :page-size="pagination.PageSize"
                                    layout="total, prev, pager, next, jumper"
                                    :total="pagination.TotalNumber"
                                    class="text-center"
                                ></el-pagination>
                            </div>
                            <div class='full-width' style='margin-top:30px; display:table; text-align:center'>
                                <el-button type="primary" @click="ruleForm.CouponList = selectlist; showCouponDialog = false">确认</el-button>
                                <el-button @click='showCouponDialog = false'>取消</el-button>
                            </div>
                        </el-dialog>

                        <!-- memeberTable -->
                        <el-dialog width="80%" title="选择会员" :visible.sync="isShowFirstPopup" append-to-body style="max-width:100%;">
                            <selMember @closeModal="isShowFirstPopup=false" @resetList="isShowFirstPopup=false" :isArr="true"></selMember>
                        </el-dialog>
                    <!-- </div> -->

                    </el-main>
            </el-container>
        </el-container>
    </el-container>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import MIXINS_MARKETING from "@/mixins/marketing.js";
export default {
    mixins: [MIXINS_MARKETING.MARKETING_MENU],
    data() {
        return {
            activeName:'first',
            isShowFirstPopup:false,
            showCouponDialog:false,
            pagination: {
                TotalNumber: 0,
                PageNumber: 0,
                PageSize: 20,
                PN: 0
            },
            ruleForm: {
                IsSMS: false,
                CouponList:[],
                selMember:{}
            },
            CouponList:[],
            ISINVALID:'',
            ISNOTINVALID:''
        }
    },
    computed: {
        ...mapGetters({
            marketingLotList:"marketingLotList",
            couponListState: "marketingShopListState2",
            selmemberArr: "selmemberArr" //选择的会员
        })
    },
    watch: {
        marketingLotList(data) {
            this.$message({
                message: data.message,
                type: data.success ? "success" : "error"
            })

            if(data.success){
                this.$store.dispatch("selectingMember", { isArr: true, data: [] })
                this.ruleForm.CouponList = []
                this.CouponList = []
            }
        },
        couponListState(data){
            this.ISINVALID = data.ISINVALID
            this.ISNOTINVALID = data.ISNOTINVALID
            this.CouponList = []
            data.DataArr.forEach(item => {
                this.$set(item, "isSelect" , false)
                this.CouponList.push(item)
            })

            this.pagination = {
                PN: data.PN,
                PageNumber: data.PageNumber,
                PageSize: data.PageSize,
                TotalNumber: data.TotalNumber
            }
        },
    },
    methods: {
        onSubmit() {
            let couponList = [], memberList = []
            for(var i in this.ruleForm.CouponList){
                couponList.push({'BillId' : this.ruleForm.CouponList[i].BILLID })
            }

            this.selmemberArr.forEach(items => {
                memberList.push({
                    'VipID': items.ID,
                    'MobileNo': items.MOBILENO,
                    'MobileName': items.NAME
                })
            })
            this.$store.dispatch("getMarketingLotList", {
                'couponList': JSON.stringify(couponList),
                'selMember': JSON.stringify(memberList),
                'IsSMS': this.ruleForm.IsSMS
            })
        },
        showCouponClick(){
            if(this.activeName != 'first'){
                this.$store.dispatch('getMarketingShopList2', { PN : 1}).then(()=>{
                    this.activeName = 'first'
                })
            }
            this.showCouponDialog = true
        },
        seletDelete(item1, idx){
            this.ruleForm.CouponList.forEach(item => {
                if(item.BILLID==item1.BILLID){
                    this.ruleForm.CouponList.splice(idx,1);
                }
            })
        },
        handlePageChange: function(currentPage) {
            this.$store.dispatch('getMarketingShopList2', {PN: parseInt(currentPage), IsValid: this.activeName == 'first' ? 0 : 1 })
        },
        handleClick(tab, event){
            this.$store.dispatch('getMarketingShopList2', { IsValid : tab.name == 'first' ? 0 : 1 })
        },
        selectListCont(e,items) {
            this.CouponList[e].isSelect = !this.CouponList[e].isSelect;
            this.selectlist = this.CouponList.filter((item) => {
                return item.isSelect != false
            })
        },
    },
    mounted(){
        this.$store.dispatch('getMarketingShopList2', {})
    },
    components: {
        selMember: () => import("@/components/selected/selmember"),
        headerPage: () => import("@/components/header")
    }
}
</script>
<style scoped>
.coupont ul li{
    float: left;
    margin: 8px 20px 0 0
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
  width: 100%;
  max-height: 400px;
  min-height: 300px;
  overflow: auto;
}
.select-list ul li{
    float: left;
    margin: 10px 20px 0 0
}
.select-border{
  border: solid 2px #F8493B;
  cursor: pointer;
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
