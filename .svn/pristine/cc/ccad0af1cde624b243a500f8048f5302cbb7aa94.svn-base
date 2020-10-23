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
                            <el-row :gutter="10" class="content-center-cont">
                                <el-col :span="8">
                                    <el-button  type="primary" size="small" @click="handleNew">新建活动</el-button>
                                </el-col>
                                <el-col :span="10" class="text-right">
                                    <el-radio-group @change="onChange" v-model="radio2" size="small">
                                        <el-radio-button label="-1" >全部</el-radio-button>
                                        <el-radio-button label="2">未开始</el-radio-button>
                                        <el-radio-button label="1">进行中</el-radio-button>
                                        <el-radio-button label="0">已结束</el-radio-button>
                                    </el-radio-group>
                                </el-col>
                                <el-col :span="6">
                                    <el-input type="default" placeholder="请输入活动名称" v-model="searchText" size="small">
                                        <el-button slot="append" type="default" icon="el-icon-search" @click="searchfun2(1)"></el-button>
                                    </el-input>
                                </el-col>
                            </el-row>
                        </div>
                    </div>

                    <div class="content-table4">
                        <div class="content-table-center">
                            <!--列表-->
                            <el-table
                            border size='small'
                            :data="pagelist"
                            :height="tableHeight"
                            header-row-class-name="bg-f1f2f3"
                            style="width: 100%;"
                            >
                            
                            <el-table-column prop="NAME" label="活动名称"></el-table-column>
                            <el-table-column prop="WRITETIME" label="活动时间" sortable :formatter="formatDate">
                                <template slot-scope="scope">
                                    <span>{{new Date(scope.row.BEGINDATE) | time}} 至 {{new Date(scope.row.ENDDATE) | time}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="活动店铺">
                                <template slot-scope="scope">
                                    {{scope.row.SHOPLIST.split(',').length}} 家
                                </template>
                            </el-table-column>
                            <el-table-column label="活动状态">
                                <template slot-scope="scope">
                                    {{scope.row.VALIDTYPE == 0 ? '已结束' : scope.row.VALIDTYPE == 1 ? '进行中' : '未开始'}}
                                </template>
                            </el-table-column>
                            <el-table-column label="操作"  fixed="right">
                                <template slot-scope="scope">
                                    <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                                    <el-button @click="handleDel(scope.row)" type="text" size="small">删除</el-button>
                                </template>
                            </el-table-column>
                            </el-table>
                            <!-- 分页 -->
                            <div v-show="pagination.TotalNumber > 20" class="m-top-sm clearfix elpagination">
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
                        </div>
                    </div>

                    <el-dialog
                        :title="dealType=='add'?'新增'+title:'编辑'+title"
                        :visible.sync="dialogVisibles"
                        width="55%"
                        >
                        <addPage @closeModal="dialogVisibles=false"
                                @resetList="getNewData(1);dialogVisibles=false"
                                :dealType="{type:dealType,state:dialogVisibles,itemData:itemData}"
                        ></addPage>
                    </el-dialog>
                </div>
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
            radio2:'-1',
            title: "充值赠送",
            dealType: "add",
            itemData:{},
            dialogVisibles:false,
            searchText:"",
            pagelist:[],
            pagination: {
                TotalNumber: 0,
                PageNumber: 0,
                PageSize: 20,
                PN: 0
            },
            pageData: {
                PN: 1,
                Filter: "",
                IsValid: -1
            },
            tableHeight: document.body.clientHeight - 280
        }
    },
    computed: {
        ...mapGetters({
            dataList: "marketingRechargeList",
            dataListState: "marketingRechargeListState",
            marketingRechargedetailed:"marketingRechargedetailed",
            marketingRechargeDel:"marketingRechargeDel"
        })
    },
    watch : {
        dataListState(data) {
            this.loading = false;
            this.isFilter = false;
            this.pagelist = [...this.dataList];
            if (data.success) {
                this.pagination = {
                TotalNumber: data.paying.TotalNumber,
                PageNumber: data.paying.PageNumber,
                PageSize: data.paying.PageSize,
                PN: data.paying.PN
                };
            }
        },
        marketingRechargeDel(data){
            if(data.success){
                if(this.pagination.TotalNumber - 1 < 21)
                    this.PN = 1
                this.getNewData()
            }
            this.$message({ type: data.success ? 'success' : 'error', message: data.message })
        },
        marketingRechargedetailed(data){
            this.itemData=data.data;
        }
    },
    mounted(){
        this.$store.dispatch("getMarketingRechargeList", {
          Filter: "", PN: 1, IsValid:-1,
        })
    },
    methods:{
        handleNew() {
            this.dealType = "add";
            this.dialogVisibles = true;
        },
        searchfun2(type) {
            this.pageData.Filter = this.searchText;
            this.getNewData();
        },
        handlePageChange: function(currentPage) {
            if (this.pageData.PN == currentPage || this.loading) {
                return;
            }
            this.pageData.PN = parseInt(currentPage);
            this.getNewData();
        },
        onChange(index) {
           this.pageData.IsValid=index;
           this.getNewData();
        },
        getNewData() {
            this.$store.dispatch("getMarketingRechargeList", this.pageData).then(() => {
                this.loading = true;
            });
        },
        formatDate: function(row, column) {
            return this.filterTimeOut(new Date(row.WRITETIME));
        },
        handleClick(index ,i) {
           this.$store.dispatch("getMarketingRechargeDetailed",index.ID);
           this.dialogVisibles=true;
           this.dealType = "edit";
        },
        handleDel(index ,i){
            this.$confirm('确认删除活动 【'+ index.NAME +' 】?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
            this.$store.dispatch("getMarketingRechargeDel",index.ID)
            }).catch(() => { })

        }

    },
    components: {
        addPage: () => import("@/components/marketing/addRecharge"),
        headerPage: () => import("@/components/header")
    }
}
</script>

<style scoped>
.header-top{
    width: 100%;
    margin-bottom:10px;
    background: #F7F8FA;
}
.main-top{
    height: 50px;
    line-height: 50px;
    widows: 100%;
    background: #fff;
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


