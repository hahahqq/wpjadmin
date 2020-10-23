<template>
    <section v-loading="loading" class="bg-white-">
        <div class="paddingTB-md bg-white m-bottom-sm">
            <div class="content-center">
                <div class="row-flex flex-between flex-items-center">
                    <div>
                        <div class="m-bottom-md">
                            <span
                                class="inline-block vertical-middle font-14"
                                style="width:90px;"
                            >快递发货</span>
                            <el-switch v-model="isUse"></el-switch>
                            <span
                                v-if="isUse"
                                class="inline-block vertical-middle font-14 m-right-md m-left-sm text-theme4"
                            >已开启</span>
                        </div>
                        <div>启用后，买家下单可以选择快递发货，由你安排快递送货上门。</div>
                    </div>
                    <div>
                        <el-button type="primary" size="small" @click="handleEdit('add',{})">新建运费模板</el-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="paddingTB-md bg-white">
            <div class="content-center">
                <div v-for="(item,i) in pageList" :key="i" class="box-shadow2 m-bottom-md">
                    <div
                        class="paddingLR-sm paddingTB-xs bg-f8 row-flex flex-between flex-items-center"
                    >
                        <div>
                            <span class="m-right-sm">{{item.NAME}}</span>
                            <el-tag v-if="item.ISDEFAULT" effect="plain" size="mini">默认模板</el-tag>
                        </div>
                        <div>
                            <span>修改日期：{{new Date(item.WRITETIME)|formatTime}}</span>
                            <div class="inline-block m-left-md text-theme4">
                                <el-button type="text" @click="handleEdit(i, item)">编辑</el-button>
                                <span>|</span>
                                <el-button type="text" @click="showGoodsList(item)">查看商品</el-button>
                                <span v-if="i>0">|</span>
                                <el-button v-if="i>0" type="text" @click="handleDel(i, item)">删除</el-button>
                            </div>
                        </div>
                    </div>
                    <div class="paddingLR-sm paddingTB-md">
                        <span>{{item.MINQTY}}</span>
                        <span>件内</span>
                        <span>{{item.MINMONEY}}</span>
                        <span>元</span>
                        <span>，每增加</span>
                        <span>{{item.ADDQTY}}</span>
                        <span>件，运费增加</span>
                        <span>{{item.ADDMONEY}}</span>
                        <span>元</span>
                    </div>
                </div>
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
        <!-- goods -->
        <el-dialog append-to-body title="查看商品" :visible.sync="goodsData.isShow" width="980px">
            <selGoodsPage :pageState="goodsData" @closeModal="goodsData.isShow=false"></selGoodsPage>
        </el-dialog>
    </section>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import itemPage from "./item.vue";
import selGoodsPage from "../selected/selGoods";
export default {
    components: { itemPage, selGoodsPage },
    data() {
        return {
            pageList: [],
            loading: false,
            dialogVisible: false,

            goodsData: {
                isShow: false,
                data: {},
            },
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
        showGoodsList(item) {
            console.log(item);
            console.log("查看商品");
            this.goodsData = {
                isShow: true,
                data: item,
            };
        },
    },
    mounted() {
        this.getNewData();
    },
};
</script>

<style scoped>
</style>