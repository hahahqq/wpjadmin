<template>
    <div>
        <!-- 运费模板 -->
        <el-table
            ref="selgoodsclassTable"
            :data="tableList"
            border
            size="small"
            highlight-current-row
            @current-change="handleCurrentChange"
            header-row-class-name="bg-theme text-white"
            style="width: 100%"
        >
            <el-table-column prop="NAME" label="名称" width="160"></el-table-column>
            <el-table-column label="状态" width="120">
                <template slot-scope="scope">
                    <span>{{ scope.row.ISDEFAULT?'默认':'' }}</span>
                </template>
            </el-table-column>
            <el-table-column prop label width></el-table-column>
        </el-table>
        <!-- 分页 -->
        <!-- <div v-if="pagination.TotalNumber > 20" class="m-top-sm clearfix elpagination">
            <el-pagination
                @size-change="handlePageChange"
                @current-change="handlePageChange"
                :current-page.sync="pagination.PN"
                :page-size="pagination.PageSize"
                layout="total, prev, pager, next, jumper"
                :total="pagination.TotalNumber"
                class="text-center"
            ></el-pagination>
        </div>-->
        <div class="paddingTB-sm text-right">
            <div class="pull-left">
                <span>已选择：</span>
                <span>{{chooseData.NAME}}</span>
            </div>
            <el-button size="small" @click="handleSubmit(0)">取消</el-button>
            <el-button type="primary" size="small" @click="handleSubmit(1)">确定</el-button>
        </div>
    </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
    props: ["pageState"],
    data() {
        return {
            loading: false,
            pagination: {
                TotalNumber: 0,
                PageNumber: 0,
                PageSize: 20,
                PN: 0
            },
            tableList: [],
            pageData: {
                PN: 1
            },
            chooseData: {}
        };
    },
    computed: {
        ...mapGetters({
            dataListState: "mallFreightListState",
            dataList: "mallFreightList"
        })
    },
    watch: {
        pageState(data) {
            if (data.isShow) {
                if (this.dataList.length > 0) {
                    this.tableList = [...this.dataList];
                } else this.getNewData();
            }
        },
        dataListState(data) {
            if (this.loading) {
                if (data.success) {
                    // this.pagination = {
                    //     TotalNumber: data.paying.TotalNumber,
                    //     PageNumber: data.paying.PageNumber,
                    //     PageSize: data.paying.PageSize,
                    //     PN: data.paying.PN
                    // };
                    // this.pageData.PN = data.paying.PN;
                    this.tableList = [...this.dataList];
                } else {
                    this.$message.error(data.message);
                }
            }
            this.loading = false;
        }
    },
    methods: {
        getNewData() {
            this.$store.dispatch("getMallFreightList").then(() => {
                this.loading = true;
            });
        },
        handleCurrentChange(val) {
            this.chooseData = Object.assign({}, val);
        },
        handleSubmit(type) {
            if (type == 1) {
                if (!this.chooseData.ID) {
                    this.$message.error("请选择");
                } else this.$emit("sendData", this.chooseData);
            } else {
                this.$emit("closeModal");
            }
        }
    },
    created() {
        if (this.pageState.isShow) {
            if (this.dataList.length > 0) {
                this.tableList = [...this.dataList];
            } else this.getNewData();
        }
    }
};
</script>