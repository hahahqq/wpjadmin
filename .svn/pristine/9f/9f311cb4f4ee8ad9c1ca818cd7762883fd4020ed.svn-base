<template>
    <div>
        <!-- 商品 -->
        <el-table
            ref="selgoodsTable"
            :data="tableList"
            border
            size="small"
            highlight-current-row
            header-row-class-name="bg-f8"
            height="500px"
            style="width: 100%;margin-top:-20px;"
        >
            <el-table-column label="商品名称" width="200" sortable>
                <template slot-scope="scope">
                    <div style="line-height:36px;">
                        <img
                            src="static/images/default.png"
                            v-real-img="theImgurl(scope.row.ID)"
                            class="inline-block vertical-middle"
                            style="width: 36px; height: 36px;margin-right:2px;"
                        />
                        <span class="inline-block">{{scope.row.NAME}}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="CODE" label="商品编码" width="150"></el-table-column>
            <el-table-column prop="TYPENAME" label="商品分类" width="90"></el-table-column>
            <el-table-column prop="PRICE" label="商品价格"></el-table-column>
            <el-table-column prop="PURPRICE" label="商品成本" :formatter="formatPurprice"></el-table-column>
            <el-table-column prop="STOCKQTY" label="库存"></el-table-column>
            <el-table-column prop="STATUS" label="状态" width="50" :formatter="formatStatus"></el-table-column>
            <el-table-column prop="GOODSMODE" label="类型" width="60" :formatter="formatMode"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        size="small"
                        type="primary"
                        @click="handleEdit(scope.$index, scope.row)"
                    >查看详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div v-if="pagination.TotalNumber > 20" class="m-top-sm clearfix elpagination">
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
        <div class="text-right">
            <el-button size="small" @click="handleSubmit(0)">关闭</el-button>
        </div>

        <!-- 商品详情 -->
        <el-dialog append-to-body title="商品详情" :visible.sync="goodsData.isShow" width="980px">
            <goods-deal-page @closeModal="closeModalFun" :pageState="goodsData"></goods-deal-page>
        </el-dialog>
    </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import { GOODS_IMGURL } from "@/util/define.js";
import goodsDealPage from "../goods/deal.vue";
export default {
    props: ["pageState"],
    components: { goodsDealPage },
    data() {
        return {
            loading: false,
            pageData: {
                PN: 1,
                Filter: "",
                IsSale: -1,
                IsGift: -1
            },
            pagination: {
                TotalNumber: 0,
                PageNumber: 0,
                PageSize: 20,
                PN: 0
            },

            tableList: [],
            chooseData: {},

            goodsData: {
                isShow: false,
                data: {}
            }
        };
    },
    computed: {
        ...mapGetters({
            dataList: "mallGoodsList",
            dataListState: "mallGoodsListState",
            mallData: "mallData"
        })
    },
    watch: {
        pageState(data) {
            if (data.isShow) {
                this.getNewData();
            }
        },
        dataListState(data) {
            if (data.success) {
                this.pagination = {
                    TotalNumber: data.paying.TotalNumber,
                    PageNumber: data.paying.PageNumber,
                    PageSize: data.paying.PageSize,
                    PN: data.paying.PN
                };
                this.tableList = [...this.dataList];
            } else {
                this.tableList = [];
            }
            this.loading = false;
        }
    },
    methods: {
        formatPurprice: function(row, column) {
            return this.isPurViewFun(601050701) ? row.PURPRICE : "******";
        },
        theImgurl(id) {
            return GOODS_IMGURL + id + ".png";
        },
        formatStatus: function(row, column) {
            //// -1=全部，0=未上架，1=上架
            return row.ISSALE == 0 ? "下架" : "上架";
        },
        formatMode: function(row, column) {
            // 0=商品   1=服务项目
            return row.GOODSMODE == 0 ? "商品" : "服务项目";
        },
        getNewData() {
            let sendData = Object.assign(
                { shopId: this.mallData.STOCKSHOPID },
                this.pageData
            );
            this.$store.dispatch("getMallGoodsList", sendData).then(() => {
                this.loading = true;
            });
        },
        handlePageChange: function(currentPage) {
            if (this.pageData.PN == currentPage || this.loading) {
                return;
            }
            this.pageData.PN = parseInt(currentPage);
            this.getNewData();
        },

        handleSubmit(type) {
            if (type == 1) {
            } else {
                this.$emit("closeModal");
            }
        },

        handleEdit(idx, item) {
            let sendData = Object.assign(
                { shopId: this.mallData.STOCKSHOPID, id: item.ID },
                item
            );
            this.goodsData = {
                isShow: true,
                data: sendData
            };
        },
        closeModalFun() {
            this.goodsData = {
                isShow: false,
                data: {}
            };
        }
    },
    mounted() {
        if (this.pageState.isShow) {
            this.getNewData();
        }
    }
};
</script>