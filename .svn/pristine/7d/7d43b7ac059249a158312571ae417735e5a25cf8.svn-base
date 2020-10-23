<template>
	<section class="mallOrder bg-white p-bottom-sm" v-loading="loading">
		<div class="content-center paddingTB-sm">
			<div class="paddingTB-sm">
				<span>下单时间</span>
				<el-date-picker
					v-model="dateBE"
					type="daterange"
					value-format="timestamp"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					class="m-left-sm vertical-middle"
					@change="dateChangeFun"
					size="small"
				></el-date-picker>
				<el-button-group>
					<el-button
						size="small"
						:type="activeDate == 0 ? 'primary' : ''"
						@click="dateClickFun(0)"
					>
						今天
					</el-button>
					<el-button
						size="small"
						:type="activeDate == 3 ? 'primary' : ''"
						@click="dateClickFun(3)"
					>
						近三天
					</el-button>
					<el-button
						size="small"
						:type="activeDate == 7 ? 'primary' : ''"
						@click="dateClickFun(7)"
					>
						近七天
					</el-button>
					<el-button
						size="small"
						:type="activeDate == 'all' ? 'primary' : ''"
						@click="dateClickFun('all')"
					>
						全部
					</el-button>
				</el-button-group>
			</div>
			<div class="paddingTB-sm">
				<el-input
					placeholder="请输入内容"
					v-model="formData.Filter"
					class
					style="width: 400px"
					size="small"
				>
					<el-select
						slot="prepend"
						v-model="formData.FilterType"
						placeholder="请选择"
						style="width: 120px"
						size="small"
					>
						<el-option
							v-for="(item, i) in filterTypeList"
							:key="i"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
					<el-button slot="append" size="small" @click="searchFun()">搜索</el-button>
				</el-input>
			</div>
		</div>
		<div class="bg-elMain padding-xs" @click="setListHeight"></div>
		<div class="content-table-center">
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane
					v-for="(tab, index) in tabPaneList"
					:key="index"
					:label="tab.title"
					:name="tab.name"
				>
					<!-- head -->
					<div class="el-table bg-f8">
						<table class="full-width">
							<thead>
								<tr class="el-table__row font-12 text-4e bg-f8">
									<template v-for="(item, idx) in tableHead">
										<th
											:key="idx"
											rowspan="1"
											:width="idx < 2 ? '20%' : '12%'"
											:style="{ width: idx == 0 ? '500px' : '' }"
										>
											<div :class="idx > 1 ? 'text-center' : 'text-left'">
												{{ item.label }}
											</div>
										</th>
									</template>
								</tr>
							</thead>
						</table>
					</div>
					<!-- body  -->
					<div
						class="List overflowY-scroll"
						ref="List"
						:style="{ height: ListHeight + 'px' }"
					>
						<div v-for="(itemList, idx) in dataList" :key="idx" class="m-top-md">
							<div class="el-table bg-f8 el-table--border">
								<table class="full-width" style="border-spacing: 0px">
									<thead>
										<tr class="bg-f8 text-4e">
											<th :colspan="tableHead.length">
												<div style="user-select: text">
													<span class="m-right-sm">
														订单编号：{{ itemList.BILLNO }}
													</span>
													<span class="m-right-sm">
														提交时间：{{
															new Date(itemList.BILLDATE) | formatTime
														}}
													</span>
												</div>
											</th>
										</tr>
									</thead>
									<tbody>
										<tr
											v-for="(item, i) in itemList.subList"
											:key="i"
											class="el-table__row font-12 text-4e"
										>
											<td rowspan="1" width="20%" style="width: 500px">
												<div class="row-flex">
													<div style="min-width: 54px">
														<img
															src="static/images/default.png"
															v-real-img="theImgurl(item.GOODSID)"
															style="width: 54px; height: 54px"
														/>
													</div>
													<div class="full-width p-left-sm">
														<div class="text-overflow-fag2">
															<span>{{ item.GOODSNAME }}</span>
															<span class="pull-right">
																&times;{{ item.QTY }}
															</span>
														</div>
														<div class="m-top-xs">
															<span>{{ item.COLORNAME }}</span>
															<span>&nbsp;-&nbsp;</span>
															<span>{{ item.SIZENAME }}</span>
														</div>
														<div class="m-top-xs">
															<b>&yen;{{ item.PRICE }}</b>
															<span
																class="pull-right"
																v-if="item.ISRETURN"
															>
																{{ refundStateList[item.STATUS] }}
															</span>
														</div>
													</div>
												</div>
											</td>
											<td
												v-if="i == 0"
												:rowspan="itemList.subList.length"
												width="20%"
											>
												<div
													v-if="
														!itemList.RECEIPTNAME ||
														itemList.RECEIPTNAME == 'undefined'
													"
												>
													--
												</div>
												<div v-else>
													<div>
														<span>{{ itemList.RECEIPTNAME }}</span>
														<span class="m-left-xs">
															{{ itemList.RECEIPTPHONE }}
														</span>
													</div>
													<div>
														<span>{{ itemList.RECEIPTADDRESS }}</span>
													</div>
												</div>
											</td>
											<td
												v-if="i == 0"
												:rowspan="itemList.subList.length"
												width="12%"
											>
												<div class="text-center">
													<span>&yen;{{ itemList.PAYMONEY }}</span>
												</div>
												<div class="text-center">
													<span class="text-muted">含运费</span>
													<span class="text-muted">
														&yen;{{ itemList.FREIGHTMONEY }}
													</span>
												</div>
											</td>
											<td
												v-if="i == 0"
												:rowspan="itemList.subList.length"
												width="12%"
											>
												<div class="text-center">
													<span>{{ itemList.LOGISTICSCOMPANYNAME }}</span>
												</div>
											</td>
											<td
												v-if="i == 0"
												:rowspan="itemList.subList.length"
												width="12%"
											>
												<div class="text-center">
													{{ itemList.shopName }}
												</div>
											</td>
											<td
												v-if="i == 0"
												:rowspan="itemList.subList.length"
												width="12%"
											>
												<div class="text-center">
													<span v-text="formatterState2(itemList)"></span>
												</div>
											</td>
											<td
												v-if="i == 0"
												:rowspan="itemList.subList.length"
												width="12%"
											>
												<!-- 操作 -->
												<div class="text-center">
													<div>
														<el-button
															type="text"
															v-on:click="toDetail(itemList, 0)"
															size="small"
														>
															订单详情
														</el-button>
													</div>
													<div v-if="itemList.STATUS == 1">
														<div>
															<!-- 待付款 -->
															<el-button
																type="text"
																v-on:click="
																	cancelMallOrder(itemList)
																"
																size="small"
																style="color: red"
															>
																取消订单
															</el-button>
														</div>
														<div>
															<el-button
																type="text"
																v-on:click="
																	changeMoneyFun(itemList)
																"
																size="small"
															>
																修改价格
															</el-button>
														</div>
													</div>
													<div
														class="m-top-sm"
														v-if="itemList.STATUS == 2"
													>
														<!-- 去发货 -->
														<el-button
															@click="toDetail(itemList, 1)"
															type="primary"
															size="small"
														>
															<span>去发货</span>
														</el-button>
													</div>
												</div>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
					<!-- 分页 -->
					<div v-if="dataList.length > 0" class="m-top-smts clearfix elpagination">
						<el-pagination
							@size-change="handlePageChange"
							@current-change="handlePageChange"
							:current-page.sync="pagination.PN"
							:page-size="pagination.PageSize"
							layout="total,prev, pager, next, jumper"
							:total="pagination.TotalNumber"
							class="text-right"
						></el-pagination>
					</div>
					<div v-else class="padding-md text-center text-muted">
						<span>暂无单据</span>
					</div>
				</el-tab-pane>
			</el-tabs>
		</div>

		<!-- item -->
		<el-dialog
			append-to-body
			:title="itemTitle"
			v-if="showItem"
			:visible.sync="showItem"
			width="700px"
			top="20px"
			style="max-width: 100%"
		>
			<itemPage
				@closeModal="showItem = false"
				@resetModal="
					showItem = false;
					getNewData();
				"
			></itemPage>
		</el-dialog>

		<!-- 发货 -->
		<el-dialog append-to-body title="订单发货" :visible.sync="showDeliverGoods" width="600px">
			<deliverGoods-page
				:pageState="{ isShow: showDeliverGoods }"
				@closeModal="showDeliverGoods = false"
				@resetModal="
					showDeliverGoods = false;
					getNewData();
				"
			></deliverGoods-page>
		</el-dialog>
		<!-- 修改价格 -->
		<el-dialog
			append-to-body
			title="修改价格"
			:visible.sync="changeMoneyForm.isShow"
			width="600px"
		>
			<changePricePage
				:pageData="changeMoneyForm"
				@closeModal="changeMoneyForm.isShow = false"
				@resetModal="
					changeMoneyForm.isShow = false;
					getNewData();
				"
			></changePricePage>
		</el-dialog>
	</section>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import { getHomeData } from "@/api/index";
import img from "@/assets/default.png";
import { GOODS_IMGURL } from "@/util/define.js";
import MIXINS_CHECKOUT from "@/mixins/checkout";
export default {
	mixins: [MIXINS_CHECKOUT.CHOOSE_MEMBER],
	data() {
		return {
			img: img,
			loading: false,
			formData: {
				ShopId: "",
				PN: 1,
				Status: "-1",
				Filter: "",
				FilterType: "",
				BeginDate: "",
				EndDate: ""
			},
			dateBE: [],
			// -1=全部，0=已取消，1=待付款，2=已付款（待发货），3=待收货（已发货），4=待评价（已完成），5=已评价
			tabPaneList: [
				{ title: "全部", name: "a", value: -1, btnText: "" },
				{ title: "待付款", name: "b", value: 1, btnText: "去付款" },
				{ title: "待发货", name: "c", value: 2, btnText: "去发货" },
				{ title: "已发货", name: "d", value: 3, btnText: "已发货" },
				{ title: "已完成", name: "e", value: 4, btnText: "已完成" },
				{ title: "已取消", name: "f", value: 0, btnText: "已取消" }
			],
			activeName: "a",
			// 1=会员姓名，2=会员编号，3=会员手机号，4=商品名称，5=订单号，6=备注，7=收货人名称，8=收货人手机号
			filterTypeList: [
				{ label: "会员姓名", value: "1" },
				{ label: "会员编号", value: "2" },
				{ label: "会员手机号", value: "3" },
				{ label: "商品名称", value: "4" },
				{ label: "订单号", value: "5" },
				{ label: "备注", value: "6" },
				{ label: "收货人名称", value: "7" },
				{ label: "收货人手机号", value: "8" }
			],
			tableHead: [
				{ label: "订单信息", value: "" },
				{ label: "收货信息", value: "" },
				{ label: "金额", value: "" },
				{ label: "配送方式", value: "" },
				{ label: "下单门店", value: "" },
				{ label: "订单状态", value: "" },
				{ label: "操作", value: "" }
			],
			showItem: false,
			showDeliverGoods: false,
			showState: 0,
			pagination: {
				TotalNumber: 0,
				PageNumber: 0,
				PageSize: 20,
				PN: 0
			},
			itemTitle: "",
			activeDate: "all",
			changeMoneyForm: {
				BillId: null,
				PayMoney: 0,
				FreightMoney: 0,
				Remark: "",
				isShow: false
			},
			refundStateList: ["商家拒绝退款", "待商家处理退款", "等待商家打款", "完成退款"], // -1=全部，0=已取消，1=待处理，2=待打款，3=已完成
			ListHeight: 0
		};
	},
	computed: {
		...mapGetters({
			dataListState: "mallOrderListState",
			dataList: "mallOrderList",
			dataData: "mallData",
			dataItem: "mallOrderItem",
			dataState: "mallOrderState"
		})
	},
	watch: {
		dataState(data) {
			if (this.loading) {
				if (data.success) {
					this.$store.dispatch("clearMallOrderList").then(() => {
						this.getNewData();
					});
				}
				this.$message({
					showClose: true,
					message: data.message,
					type: data.success ? "success" : "error"
				});
				this.showDeliverGoods = false;
				this.showItem = false;
			}
			this.loading = false;
		},
		dataListState(data) {
			if (data.success && this.loading) {
				this.pagination = {
					TotalNumber: data.paying.TotalNumber,
					PageNumber: data.paying.PageNumber,
					PageSize: data.paying.PageSize,
					PN: data.paying.PN
				};
				this.formData.PN = data.paying.PN;
				this.formData.Status = data.Status;
			}
			if (!data.success && this.loading) {
				this.$message.error(data.message);
			}
			this.loading = false;
			this.setListHeight();
		},
		dataItem(data) {
			if (data.success && this.loading) {
				if (this.showState == 1) {
					// 发货
					this.showItem = false;
					this.showDeliverGoods = true;
				} else {
					// 详情
					this.showItem = true;
					this.showDeliverGoods = false;
				}
			}
			if (!data.success && this.loading) {
				this.$message.error(data.message);
			}
			this.loading = false;
		}
	},
	methods: {
		setListHeight() {
			let idx = this.tabPaneList.findIndex((item) => item.name == this.activeName),
				top = 0;
			if (this.$refs["List"][idx]) {
				top = this.$refs["List"][idx].getBoundingClientRect().top;
			}
			top = parseInt(top) ? parseInt(top) : 345;
			this.ListHeight = window.innerHeight - top - 85;
		},
		formatterState: function (data) {
			let idx = this.tabPaneList.findIndex((item) => item.value == data.STATUS);
			return this.tabPaneList[idx].btnText;
		},
		formatterState2: function (data) {
			let idx = this.tabPaneList.findIndex((item) => item.value == data.STATUS);
			return this.tabPaneList[idx].title;
		},
		theImgurl(id) {
			return GOODS_IMGURL + id + ".png";
		},
		handleClick(tab, event) {
			let d = this.tabPaneList.find((item) => item.name == tab.name);
			this.formData.Status = d.value;
			this.$store.dispatch("clearMallOrderAll").then(() => {
				this.getNewData();
			});
		},
		getNewData() {
			this.formData.ShopId = this.dataData.STOCKSHOPID;
			let sendData = Object.assign({}, this.formData);
			this.$store.dispatch("getMallOrderList", sendData).then(() => {
				this.loading = true;
			});
		},

		dateChangeFun(data) {
			// 选择时间段
			this.formData.BeginDate = data[0];
			this.formData.EndDate = data[1];
			this.getNewData();
		},
		dateClickFun(num) {
			this.activeDate = num;
			// 选择近期时间
			if (num == "all") {
				this.formData.BeginDate = "";
				this.formData.EndDate = "";
				this.dateBE = [];
				this.formData.FilterType = "";
				this.formData.Filter = "";
				this.searchFun();
			} else {
				this.formData.BeginDate = this.getTimeStamp(num);
				this.formData.EndDate = new Date().getTime();
				this.dateBE[0] = this.getTimeStamp(num);
				this.dateBE[1] = new Date().getTime();
				this.dateBE = [...this.dateBE];
				this.getNewData();
			}
		},
		searchFun() {
			this.activeName = "a";
			this.formData.Status = -1;
			this.getNewData();
		},
		handlePageChange: function (currentPage) {
			if (this.formData.PN == currentPage || this.loading) {
				return;
			}
			this.formData.PN = parseInt(currentPage);
			this.getNewData();
		},
		toDetail(item, type) {
			if (type == 1) {
				this.$store
					.dispatch("getMallOrderItem", {
						BillId: item.BILLID
					})
					.then(() => {
						this.showState = 1;
						this.loading = true;
					});
			} else {
				this.$router.push({
					path: "/mall/orderItem",
					query: { id: item.BILLID }
				});
			}

			// this.itemTitle = "单据详情（" + this.formatterState2(item) + "）";
			// this.$store
			//     .dispatch("getMallOrderItem", {
			//         BillId: item.BILLID
			//     })
			//     .then(() => {
			//         this.showState = type ? type : 0;
			//         this.loading = true;
			//     });
		},
		cancelMallOrder(item) {
			this.$confirm("是否取消该订单?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning"
			})
				.then(() => {
					this.$store
						.dispatch("cancelMallOrder", {
							BillId: item.BILLID
						})
						.then(() => {
							this.loading = true;
						});
				})
				.catch(() => {});
		},

		changeMoneyFun(item) {
			this.changeMoneyForm = {
				BillId: item.BILLID,
				PayMoney: item.PAYMONEY,
				FreightMoney: item.FREIGHTMONEY,
				Remark: item.REMARK ? item.REMARK : "",
				isShow: true
			};
		},
		defaultData() {}
	},
	mounted() {
		this.getNewData();
	},
	components: {
		itemPage: () => import("./item.vue"),
		deliverGoodsPage: () => import("./deliverGoods.vue"),
		changePricePage: () => import("./changePrice.vue")
	}
};
</script>
<style scoped>
.el-table th,
.el-table td {
	padding-left: 7px;
	padding-right: 7px;
}
.div-tabel {
	display: table;
	border-spacing: 20px; /*边距*/
	width: 100%;
}
.div-tabel-row {
	display: table-row;
}
.div-table-cell {
	display: table-cell;
}

.text-overflow-fag2 {
	overflow: hidden;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	word-break: break-all;
}
</style>
