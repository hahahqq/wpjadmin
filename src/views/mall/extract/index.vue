<template>
    <section v-loading="loading">
        <div class="paddingTB-md bg-white m-bottom-sm">
            <div class="content-center">
                <div class="row-flex flex-between flex-items-center">
                    <div>
                        <div class>
                            <span
                                class="inline-block vertical-middle font-14"
                                style="width:90px;"
                            >快递发货</span>
                            <el-switch v-model="isUse"></el-switch>
                            <span
                                class="inline-block vertical-middle font-14 m-right-md m-left-sm"
                                :class="{'text-theme4':isUse}"
                            >启用后，卖家下单可以选择到店自提</span>
                        </div>
                    </div>
                    <div>
                        <el-button type="primary" size="small" @click="handleEdit('add',{})">新建自提点</el-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="paddingTB-md bg-white m-bottom-sm">
            <div class="content-center">
                <div>
                    <span class="inline-block vertical-middle font-14" style="width:90px;">提货有效期</span>
                    <el-switch v-model="form.isUse"></el-switch>
                    <span
                        v-if="form.isUse"
                        class="inline-block vertical-middle font-14 m-right-md m-left-sm text-theme4"
                    >已开启</span>
                </div>
                <div class="m-top-md" style="padding-left:90px;">
                    <div class="padding-sm rounded-sm bg-elMain">
                        <div class="padding-sm">
                            <span>备货完成</span>
                            <el-input
                                type="number"
                                v-model.number="form.day"
                                placeholder
                                size="mini"
                                style="width:50px;"
                            ></el-input>
                            <span>天后，停止提货</span>
                            <span class="text-muted">填写0天，即仅限当天可提货</span>
                        </div>
                        <div class="padding-sm">
                            <span>已过期订单处理</span>
                            <el-radio-group v-model="form.timeout" class="m-left-md">
                                <el-radio :label="0">过期后，订单将自动完成，不退款</el-radio>
                                <el-radio :label="1">过期后，订单将自动向买家退款</el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="paddingTB-md bg-white">
            <div class="content-center">
                <el-table
                    size="small"
                    :data="pageList"
                    header-row-class-name="bg-f8 text-4e"
                    style="width: 100%;"
                >
                    <el-table-column prop="NAME" label="自提点名称" width="120"></el-table-column>
                    <el-table-column prop="TYPE" label="自提点地址"></el-table-column>
                    <el-table-column prop="MINQTY" label="联系电话"></el-table-column>
                    <el-table-column prop="MINMONEY" label="营业时间"></el-table-column>
                    <el-table-column width="150" fixed="right">
                        <template slot="header" slot-scope="scope">
                            <div class="hide">{{scope.row}}</div>
                            <el-button-group class="no-padding">
                                <el-button
                                    size="mini"
                                    type="primary"
                                    @click="handleEdit('add',{})"
                                >新增</el-button>
                                <el-button size="mini" @click="getNewData()">刷新</el-button>
                            </el-button-group>
                        </template>
                        <template slot-scope="scope">
                            <el-button-group>
                                <el-button
                                    type="primary"
                                    size="mini"
                                    @click="handleEdit(scope.$index, scope.row)"
                                >编辑</el-button>
                                <el-button
                                    size="mini"
                                    @click="handleDel(scope.$index, scope.row)"
                                >删除</el-button>
                            </el-button-group>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>

        <!-- // item -->
        <el-dialog append-to-body
            title="运费设置详情"
            :visible.sync="dialogVisible"
            width="680px"
            top="2%"
            style="max-width:100%;"
        >
            <item-page
                :pageState="dialogVisible"
                @closeModal="dialogVisible=false"
                @resetModal="dialogVisible=false;getNewData()"
            ></item-page>
        </el-dialog>
    </section>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import itemPage from "./item.vue";
export default {
    components: { itemPage },
    data() {
        return {
            pageList: [],
            loading: false,
            dialogVisible: false,

            isUse: true,
            form: {
                isUse: true,
                day: null,
                timeout: 0,
            },
        };
    },
    computed: {
        ...mapGetters({
            dataListState: "mallFreightListState",
            dataList: "mallFreightList",
            dataItem: "mallFreightItem",
            dataState: "mallFreightState",
        }),
    },
    watch: {
        dataListState(data) {
            if (data.success & this.loading) {
                let arr = [...this.dataList],
                    firstItem = {};
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].ISDEFAULT) {
                        firstItem = arr[i];
                        arr.splice(i, 1);
                        break;
                    }
                }
                if (firstItem.ID) arr.unshift(firstItem);
                this.pageList = [...arr];
            }
            if (!data.success & this.loading) {
                this.$message({
                    message: data.message,
                    type: "error",
                });
            }
            this.loading = false;
        },
        dataState(data) {
            if (this.loading && this.dealType == "delete") {
                if (data.success) {
                    this.getNewData();
                }
                this.$message({
                    type: data.success ? "success" : "error",
                    message: data.message,
                });
            }
            this.loading = false;
        },
    },
    methods: {
        getNewData() {
            this.$store.dispatch("getMallFreightList").then(() => {
                this.loading = true;
            });
        },
        handleEdit(idx, item) {
            this.$store.dispatch("getMallFreightItem", item).then(() => {
                this.dialogVisible = true;
                this.dealType = idx == "add" ? "add" : "edit";
            });
        },
        handleDel(index, item) {
            this.$confirm("此操作将永久删除, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    this.$store
                        .dispatch("delMallFreight", { id: item.ID })
                        .then(() => {
                            this.loading = true;
                            this.dealType = "delete";
                        });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
        },
        showGoodsList() {
            console.log("查看商品");
        },
    },
    mounted() {
        this.getNewData();
    },
};
</script>

<style scoped>
</style>