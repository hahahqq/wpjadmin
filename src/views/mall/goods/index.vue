<template>
	<div v-loading="loading" class="mallGoods bg-white p-bottom-sm">
		<div class="content-center paddingTB-sm">
			<el-dropdown @command="IsSaleFun">
				<el-button type="default" size="small" style="width: 120px" class="text-left">
					<span v-if="pageData.IsSale == -1">全部</span>
					<span v-if="pageData.IsSale == 1">上架</span>
					<span v-if="pageData.IsSale == 0">下架</span>
					<i class="el-icon-arrow-down el-icon--right pull-right"></i>
				</el-button>
				<el-dropdown-menu slot="dropdown" size="small" style="width: 120px">
					<el-dropdown-item command="-1">全部</el-dropdown-item>
					<el-dropdown-item command="1">上架</el-dropdown-item>
					<el-dropdown-item command="0">下架</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>

			<el-button
				type="default"
				size="small"
				icon
				@click="changeShelfFun(1)"
				class="m-left-sm"
			>
				批量上架
			</el-button>
			<el-button type="default" size="small" icon @click="changeShelfFun(0)">
				批量下架
			</el-button>

			<!-- search -->
			<el-input
				type="default"
				v-model="pageData.Filter"
				placeholder="请输入商品名称或编码"
				class="pull-right"
				style="width: 300px"
				size="small"
			>
				<el-button slot="append" type="default" icon="el-icon-search" @click="getNewData()">
					搜索
				</el-button>
			</el-input>
		</div>
		<div class="bg-elMain padding-xs" @click="setListHeight"></div>
		<div class="content-table-center" ref="List">
			<!--列表-->
			<el-table
				border
				:data="pagelist"
				v-loading="loading"
				@selection-change="handleSelectionChange"
				:height="ListHeight"
				header-row-class-name="bg-f8 text-4e"
				style="width: 100%"
			>
				<el-table-column type="selection" width="36" fixed="left"></el-table-column>
				<el-table-column label="商品名称" width="200" sortable>
					<template slot-scope="scope">
						<div style="line-height: 36px">
							<img
								:src="scope.row.src"
								:onerror="imgError"
								class="inline-block vertical-middle"
								style="width: 36px; height: 36px; margin-right: 2px"
							/>
							<span class="inline-block">{{ scope.row.NAME }}</span>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="CODE" label="商品编码" width="150"></el-table-column>
				<el-table-column prop="TYPENAME" label="商品分类" width="90"></el-table-column>
				<el-table-column prop="PRICE" label="商品价格"></el-table-column>
				<el-table-column
					prop="PURPRICE"
					label="商品成本"
					:formatter="formatPurprice"
				></el-table-column>
				<el-table-column prop="STOCKQTY" label="库存"></el-table-column>
				<el-table-column
					prop="STATUS"
					label="状态"
					width="50"
					:formatter="formatStatus"
				></el-table-column>
				<el-table-column
					prop="GOODSMODE"
					label="类型"
					width="60"
					:formatter="formatMode"
				></el-table-column>
				<el-table-column label="操作" width="150" fixed="right">
					<template slot-scope="scope">
						<el-button-group>
							<el-button
								size="small"
								type="primary"
								v-if="scope.row.ISSALE == 0"
								@click="changeShelf_oneFun(1, scope.row.ID)"
							>
								上架
							</el-button>
							<el-button
								size="small"
								type="primary"
								v-if="scope.row.ISSALE == 1"
								@click="changeShelf_oneFun(0, scope.row.ID)"
							>
								下架
							</el-button>
							<el-button size="small" @click="handleEdit(scope.$index, scope.row)">
								编辑
							</el-button>
						</el-button-group>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页 -->
			<div v-show="pagelist.length > 0" class="m-top-sm clearfix elpagination">
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

		<!-- 商品详情 -->
		<el-dialog title="商品详情" :visible.sync="goodsData.isShow" width="980px">
			<goods-deal-page @closeModal="closeModalFun" :pageState="goodsData"></goods-deal-page>
		</el-dialog>
	</div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import goodsDealPage from "./deal.vue";
import { GOODS_IMGURL } from "@/util/define.js";
let _ = require("lodash");
export default {
	components: {
		goodsDealPage
	},
	data() {
		return {
			pagelist: [],
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
			multipleSelection: [], // 选择的商品

			ListHeight: 0,
			goodsData: {
				isShow: false,
				data: {}
			},
			imgError: "static/images/default.png"
		};
	},
	computed: {
		...mapGetters({
			dataState: "mallGoodsState",
			dataList: "mallGoodsList",
			dataListState: "mallGoodsListState",
			mallData: "mallData",
			dataItem: "mallGoodsItem"
		})
	},
	watch: {
		dataListState(data) {
			if (data.success) {
				this.pagination = {
					TotalNumber: data.paying.TotalNumber,
					PageNumber: data.paying.PageNumber,
					PageSize: data.paying.PageSize,
					PN: data.paying.PN
				};
				let arr = [],
					v = ".png?v=" + Math.random();
				this.dataList.forEach((element) => {
					arr.push(Object.assign({ src: GOODS_IMGURL + element.ID + v }, element));
				});
				this.pagelist = [...arr];
			} else {
				this.pagelist = [];
			}
			this.loading = false;
			this.setListHeight();
		},
		dataState(data) {
			if (data.success && this.loading) {
				this.$message({
					message: data.message,
					type: "success"
				});
				this.multipleSelection = [];
				this.getNewData();
			}
			if (!data.success && this.loading) {
				this.$message({
					message: data.message,
					type: "error"
				});
			}
			this.loading = false;
		}
	},
	methods: {
		setListHeight() {
			let top = this.$refs["List"] ? this.$refs["List"].getBoundingClientRect().top : 0;
			top = parseInt(top) ? parseInt(top) : 200;
			this.ListHeight = window.innerHeight - top - 85;
		},
		getNewData() {
			let sendData = Object.assign({ shopId: this.mallData.STOCKSHOPID }, this.pageData);
			this.$store.dispatch("getMallGoodsList", sendData).then(() => {
				this.loading = true;
			});
		},
		formatPurprice: function (row, column) {
			return this.isPurViewFun(210040601) ? row.PURPRICE : "******";
		},
		formatStatus: function (row, column) {
			//// -1=全部，0=未上架，1=上架
			return row.ISSALE == 0 ? "下架" : "上架";
		},
		formatMode: function (row, column) {
			// 0=商品   1=服务项目
			return row.GOODSMODE == 0 ? "商品" : "服务项目";
		},
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},
		handlePageChange: function (currentPage) {
			if (this.pageData.PN == currentPage || this.loading) {
				return;
			}
			this.pageData.PN = parseInt(currentPage);
			this.getNewData();
		},
		IsSaleFun: function (val) {
			this.pageData.PN = 1;
			this.pageData.IsSale = val;
			this.getNewData();
		},
		changeShelf_oneFun(type, id) {
			this.multipleSelection = [{ ID: id }];
			this.changeShelfFun(type);
		},
		changeShelfFun(type) {
			// 上下架
			let arr = [];
			this.multipleSelection.forEach((element) => {
				arr.push({
					GoodsId: element.ID,
					IsSale: type
				});
			});
			if (arr.length == 0) {
				this.$message.error("请选择商品");
				return;
			}
			this.$store.dispatch("changeGoodsState", arr).then(() => {
				this.loading = true;
				this.pageData.IsSale = type;
				this.pageData.PN = 1;
			});
		},
		handleEdit(idx, item) {
			let sendData = Object.assign({ shopId: this.mallData.STOCKSHOPID, id: item.ID }, item);
			this.goodsData = {
				isShow: true,
				data: sendData
			};
		},
		closeModalFun(v) {
			if (v == 1) {
				this.goodsData = {
					isShow: false,
					data: {}
				};
				this.getNewData();
			} else if (v == 2) {
				let idx = this.pagelist.findIndex((item) => item.ID == this.dataItem.ID);
				if (idx > -1) {
					this.pagelist[idx].src =
						GOODS_IMGURL + this.dataItem.ID + ".png?v=" + Math.random();
				}
			} else {
				this.goodsData = {
					isShow: false,
					data: {}
				};
				console.log(v);
			}
		}
	},
	mounted() {
		this.getNewData();
	}
};
</script>
<style scoped>
.mallGoods >>> .el-dialog {
	max-width: 90%;
}
</style>
