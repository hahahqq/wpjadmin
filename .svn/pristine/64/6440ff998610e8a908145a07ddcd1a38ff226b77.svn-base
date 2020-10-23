<template>
    <section v-loading="loading" class="bg-white">
        <div class="content-table-center p-bottom-md">
            <el-table
                border
                size="small"
                :data="pageList"
                header-row-class-name="bg-f8 text-4e"
                style="width: 100%;"
            >
                <el-table-column prop="NAME" label="名称" width="120" sortable></el-table-column>
                <el-table-column prop="TYPE" label="计价方式" :formatter="formatType"></el-table-column>
                <el-table-column prop="MINQTY" label="最低数量"></el-table-column>
                <el-table-column prop="MINMONEY" label="最低运费"></el-table-column>
                <el-table-column prop="ADDQTY" label="新增数量"></el-table-column>
                <el-table-column prop="ADDMONEY" label="新增运费"></el-table-column>
                <el-table-column prop="ISDEFAULT" label="状态" :formatter="formatStatus"></el-table-column>
                <el-table-column width="150" fixed="right">
                    <template slot="header" slot-scope="scope">
                        <div class="hide">{{scope.row}}</div>
                        <el-button-group class="no-padding">
                            <el-button size="mini" type="primary" @click="handleEdit('add',{})">新增</el-button>
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
                            <el-button size="mini" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                        </el-button-group>
                    </template>
                </el-table-column>
            </el-table>
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
                if (firstItem.ID) {
                    arr.unshift(firstItem);
                }
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
        formatType: function (row, column) {
            //    0=计数，1=计量
            return row.TYPE == 1 ? "计量" : "计数";
        },
        formatStatus: function (row, column) {
            // 是否默认
            return row.ISDEFAULT ? "默认" : "--";
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
    },
    mounted() {
        this.getNewData();
    },
};
</script>

<style scoped>
</style>