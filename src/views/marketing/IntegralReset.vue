<template>
    <div class="integralReset">
        <div >
            <el-button icon="el-icon-plus" size="small" type="primary" @click="handleNew" plain>添加积分清零</el-button>
        </div>

        <el-table :data='tableData' v-loading='loading' border size='small' header-row-class-name="bg-f1f2f3" class='m-top-sm' :height="tableHeight" width='100%'>
            <el-table-column prop='DATESTR' label="日期"></el-table-column>
            <el-table-column prop='VIPCOUNT' label="对象"></el-table-column>
            <el-table-column prop='REMARK' label="备注"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click='handleView(scope.row, scope.$index)'>详情</el-button>
                    <el-button type="text" size="small" @click='showDelDialog = true; BillId = scope.row.BILLID'>删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="m-top-sm clearfix elpagination" v-if='tableData.length > 0'>
            <el-pagination 
                background
                @size-change="handlePageChange"
                @current-change="handlePageChange"
                :current-page.sync="pagination.PN"
                :page-size="pagination.PageSize" 
                layout="total,prev,pager,next,jumper" 
                :total="pagination.TotalNumber" 
                class="text-center">
            </el-pagination>
        </div>

        <!-- 积分清零删除 -->
        <el-dialog title='积分清零删除' :visible.sync="showDelDialog" append-to-body width="24%">
            <el-row>
                <el-col :span="24">
                    <span>短信通知 : </span>
                    <span>
                        <el-switch v-model="IsSms" inactive-color='#999999' ></el-switch>
                    </span>
                </el-col>
            </el-row>
            <el-row class="m-top-md">
                <el-col :span="24">
                    <span>微信通知 : </span>
                    <span>
                        <el-switch v-model="IsWeChat" inactive-color='#999999' ></el-switch>
                    </span>
                </el-col>
            </el-row>
            <el-row style="margin-top:30px">
                <el-col :span="24" class='text-center'>
                    <el-button @click="showDelDialog = false; IsSms = false, IsWeChat = false">取 消</el-button>
                    <el-button type="primary" @click='submitDel'>确 定</el-button>
                </el-col>
            </el-row>
        </el-dialog>

        <!-- 新增积分清零 -->
        <el-dialog :title="title" :visible.sync="showEditAddDialog" append-to-body width="30%">
            <div :class="isAll?'block':'inline-block'" style="padding:0 0 6px 0">
                <span>是否全选</span>
                <el-switch v-model="isAll" @change="isAllFun"></el-switch>
                <span v-if="isAll" class="pull-right">总人数：{{VipCount}}</span>
            </div>
            <el-button v-if="!isAll" @click="isShowFirstPopup=true;" size="small" class="pull-right" >添加会员</el-button>

            <el-input type="textarea" :rows="5" placeholder="请在这里填写备注内容..." v-model="Remark" class="marginTB-sm" ></el-input>

            <div v-show="!isAll && selmemberArr.length > 0" class='m-top-sm'>
                <el-collapse>
                    <el-collapse-item>
                        <template slot="title">
                            <i class="header-icon el-icon-view"></i>
                            查看已选会员 （{{selmemberArr.length}} )
                        </template>
                        <div style="max-height:230px; overflow:auto">
                            <div v-for="(item ,i) in selmemberArr" :key="i">
                                <span>{{item.NAME}}</span>
                                <span>{{item.MOBILENO}}</span>
                            </div>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </div>

            <div class='m-top-sm'>
                <el-checkbox v-model='isCheckWeChat'>微信通知</el-checkbox>
                <el-checkbox v-model="isCheckSms">短信通知</el-checkbox>
            </div>

            <div class='text-center' style="margin-top:40px" v-if='dialogState == "add"'>
                <el-button type="primary" style="width:100%" @click='addIntegralResetSubmit'>确 认  <span v-if='isCheckSms'> （ 剩余短信 {{companyInfo.SMSNumber}} 条 ）</span>  </el-button>
            </div>
        </el-dialog>

        <!-- 选择会员 -->
        <el-dialog width="70%" title="选择会员" :visible.sync="isShowFirstPopup" append-to-body style="max-width:100%;">
            <selMember @closeModal="isShowFirstPopup=false" :isArr="true"></selMember>
        </el-dialog>

    </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { getHomeData, getUserInfo } from "@/api/index";
export default {
    data(){
        return{
            curPN: 1,
            curVipPn:1,
            tableData:[],
            loading: false,
            showDelDialog: false,
            showEditAddDialog: false,
            isShowFirstPopup: false,
            IsWeChat: false,
            IsSms: false,
            isCheckWeChat: false,
            isCheckSms: false,
            BillId:'',
            pagination: {
                TotalNumber: 0,
                PageNumber: 0,
                PageSize: 20,
                PN: 0
            },
            title:'积分清零',
            tableHeight: document.body.clientHeight - 160,
            isAll: false,
            VipCount:'',
            Remark:'',
            companyInfo:{},
            dialogState:'add'
        }
    },
    computed: {
        ...mapGetters({
            dataListState: 'IntegralResetListState',
            delState: 'delIntegralResetState',
            saveState: 'saveIntegralResetState',
            detailState: 'detailIntegralResetState',
            selmemberArr: "selmemberArr",
            memberCount:'memberCount',
            marketingSmStage:"marketingSmStage"
        })
    },
    watch:{ 
        detailState(data){
            if(data.success){
                let obj = data.data.Obj
                let PageData = data.data.PageData
                this.Remark = obj.REMARK
                this.isCheckSms = obj.ISSMS
                this.isCheckWeChat = obj.ISWACHAT
                if(this.VipCount == obj.VIPCOUNT){
                    this.isAll = true
                }else{
                    this.isAll = false
                    this.$store.dispatch("selectingMember", {
                        isArr: true,
                        data: PageData.DataArr
                    })
                }
            }else{
                this.$message.error(data.message)
            }
        },
        saveState(data){
            this.loading = false
            if(data.success){
                this.showEditAddDialog = false
                this.getNewData()
                this.$store.dispatch("getSmsSign",{})
            }
            this.$message({
                type: data.success ? 'success' : 'error',
                message: data.message
            })
        },
        delState(data){
            this.loading = false
            if(data.success){
                this.getNewData()
            }
            this.$message({
                type: data.success ? 'success' : 'error',
                message: data.message
            })
        },
        dataListState(data){
            this.loading = false
            if(data.success){
                this.tableData = data.data.PageData.DataArr
                this.pagination = {
                    TotalNumber: data.data.PageData.TotalNumber,
                    PageNumber: data.data.PageData.PageNumber,
                    PageSize: data.data.PageData.PageSize,
                    PN: data.data.PageData.PN
                };
            }else{
                this.$message.error(data.message)
            }
        },
        isAll(data){
            if(data){
                this.$store.dispatch('getMemberCount')
            }
        },
        memberCount(data){
            this.VipCount = data.success?data.data.VipCount:0;
        },
        marketingSmStage(data){
            this.companyInfo = data
        }
    },
    methods: {
        isAllFun(){
          if(this.isAll == false){
            this.VipCount = 0
          }
        },
        handlePageChange: function (currentPage) {
            this.curPN = parseInt(currentPage);
            this.getNewData();
        },
        handleNew(){
            this.title = '新增积分清零'
            this.dialogState = 'add'
            this.showEditAddDialog = true
            this.isAll = false
            this.Remark = ''
            this.isCheckWeChat = false
            this.isCheckSms = false
            this.$store.dispatch("selectingMember", {
                isArr: true,
                data: []
            })
        },
        addIntegralResetSubmit(){
            let newArr = [], isNumber = true;
            if(!this.isAll){
                for (let i = 0; i < this.selmemberArr.length; i++) {
                    if (isNaN(this.selmemberArr[i].MOBILENO)) {
                        isNumber = false;
                        break;
                    }

                    newArr.push({
                        VIPID: this.selmemberArr[i].ID,
                    })
                }
            }

            if (!isNumber) {
                this.$message({
                    type: "error",
                    message: "会员电话号码存在问题！"
                });
                return;
            }
            if(this.isAll){ 
                if(this.companyInfo.SMSNumber == 0 || this.VipCount > this.companyInfo.SMSNumber){
                    this.$message.error('剩余短信条数不足2 ！')
                    return
                }
            }
            if(!this.isAll && newArr.length > this.companyInfo.SMSNumber){
                this.$message.error('剩余短信条数不足111 ！')
                return
            }

            let sendData = {
                Remark: this.Remark ,
                IsSms: this.isCheckSms,
                IsWeChat: this.isCheckWeChat,
                AllVip: this.isAll ,
                VipId: this.isAll ? JSON.stringify([]) : JSON.stringify(newArr)
            }
            this.$store.dispatch('saveIntegralReset', sendData).then(()=>{
                this.loading = true
            })
        },
        handleView(row, idx){
            this.title = '积分清零详情'
            this.dialogState = 'view'
            this.$store.dispatch('detailIntegralReset', { BillId: row.BILLID, PN: this.curVipPn }).then(()=>{
                this.showEditAddDialog = true
            })
        },
        submitDel(){
            this.$store.dispatch('delIntegralReset', {
                IsSms: this.IsSms ? 1 : 0,
                IsWeChat: this.IsWeChat ? 1 : 0,
                BillId: this.BillId
            }).then(()=>{
                this.loading = true
                this.showDelDialog = false
            })
        },
        getNewData(){
            this.$store.dispatch('getIntegralResetList', { PN: this.curPN}).then(()=>{
                this.loading = true
            })
        }
    },
    mounted(){
        this.getNewData()
        this.$store.dispatch("getSmsSign",{})
        this.$store.dispatch('getMemberCount')
    },
    components: {
        selMember: () => import("@/components/selected/selmember")
    },
}

</script>