<template>
	<section class="mallOrder-item bg-white p-bottom-sm" v-loading="loading">
		<div class="padding-sm" v-if="dataItem.Obj">
			<el-row :gutter="20">
				<el-col :span="7" class="text-center border-right">
					<div style="height: 160px">
						<div class="paddingLR-sm paddingTB-xs">
							<span
								v-if="dataInfo.STATUS == 0 || dataInfo.STATUS == 4"
								class="font-20 font-600 text-muted"
							>
								{{ stateInfo.text }}
							</span>
							<span
								v-else
								class="font-20 font-600"
								:style="dataInfo.STATUS == 3 ? 'color:#67C23A' : 'color:red'"
							>
								{{ stateInfo.text }}
							</span>
						</div>
						<div class="paddingLR-sm paddingTB-xs text-left inline-block">
							<div v-if="dataInfo.STATUS == 0">
								<span class="font-14">处理时间：</span>
								<span>{{ new Date(dataInfo.CHECKTIME) | formatTime }}</span>
							</div>
							<div v-if="dataInfo.STATUS == 1">
								<span class="font-14">买家申请退款，待商家处理：</span>
							</div>
							<div v-if="dataInfo.STATUS > 1">
								<span class="font-14">同意退款，处理时间：</span>
								<span>{{ new Date(dataInfo.AGREETIME) | formatTime }}</span>
							</div>
							<div v-if="dataInfo.STATUS == 3">
								<span class="font-14">确认打款，处理时间：</span>
								<span>{{ new Date(dataInfo.CHECKTIME) | formatTime }}</span>
							</div>
						</div>
						<div class="paddingLR-sm paddingTB-xs">
							<div v-if="dataInfo.STATUS == 1">
								<el-button
									size="small"
									type="primary"
									plain
									@click="handleButton(1)"
								>
									同意退款
								</el-button>
								<el-button
									size="small"
									type="danger"
									plain
									@click="handleButton(2)"
								>
									拒绝退款
								</el-button>
							</div>
							<div v-if="dataInfo.STATUS == 2">
								<el-button
									size="small"
									type="primary"
									plain
									@click="handleButton(3)"
								>
									打款确认
								</el-button>
							</div>
						</div>
					</div>
				</el-col>
				<el-col :span="7">
					<div style="height: 160px">
						<div class="paddingLR-sm paddingTB-xs">
							<span class="font-20">退款信息</span>
						</div>
						<div class="paddingLR-sm paddingTB-xs">
							<span class="inline-block" style="width: 75px">退款单编号：</span>
							<span>{{ dataInfo.BILLNO }}</span>
						</div>

						<div class="paddingLR-sm paddingTB-xs">
							<span class="inline-block" style="width: 75px">退款原因：</span>
							<span>{{ dataInfo.RETURNREASON }}</span>
						</div>
						<div class="paddingLR-sm paddingTB-xs">
							<span class="inline-block" style="width: 75px">退款金额：</span>
							<span style="color: red">&yen;{{ dataInfo.PAYMONEY }}</span>
						</div>
						<div class="paddingLR-sm paddingTB-xs">
							<span class="inline-block" style="width: 75px">退款时间：</span>
							<span>{{ new Date(dataInfo.BILLDATE) | formatTime }}</span>
						</div>
					</div>
				</el-col>
				<el-col :span="10" class="border-left">
					<div style="height: 160px">
						<div class="paddingLR-sm paddingTB-xs">
							<span class="font-20">订单信息</span>
						</div>
						<div class="paddingLR-sm paddingTB-xs">
							<span
								class="inline-block"
								style="width: 75px"
								v-text="dataItem.SaleObj.STATUS == 2 ? '订单编号：' : '下单编号：'"
							></span>
							<span>{{ dataItem.SaleObj.BILLNO }}</span>
						</div>
						<div class="paddingLR-sm paddingTB-xs">
							<span class="inline-block" style="width: 75px">下单时间：</span>
							<span>{{ new Date(dataItem.SaleObj.BILLDATE) | formatTime }}</span>
						</div>
						<div class="paddingLR-sm paddingTB-xs">
							<span class="inline-block" style="width: 75px">下单方式：</span>
							<span>{{ dataItem.SaleObj.PAYTYPENAME }}</span>
						</div>
						<div class="paddingLR-sm paddingTB-xs">
							<el-button size="small" type="primary" plain @click="handleButton(4)">
								订单详情
							</el-button>
						</div>
					</div>
				</el-col>
			</el-row>
		</div>
		<div style="padding: 5px; background-color: #f4f5fa"></div>
		<div class="padding-sm" v-if="dataItem.GoodsList">
			<div class>
				<table class="thetable">
					<thead>
						<tr class="bg-f8 text-4e">
							<th
								v-for="(item, idx) in tableHead"
								:key="idx"
								:class="{ 'border-left': idx == 0 }"
								class="border-top"
							>
								{{ item.label }}
							</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item, i) in goodsList" :key="i">
							<td
								v-for="(v, j) in tableHead"
								:key="j"
								:class="{ 'border-left': j == 0 }"
								style="line-height: 40px"
							>
								<div v-if="j == 0" class="inline-block vertical-middle m-right-xs">
									<img
										src="static/images/default.png"
										v-real-img="item.GOODSID"
										class="block"
										style="width: 36px; height: 36px"
									/>
								</div>
								<div class="inline-block vertical-middle">
									<span v-text="item[v.value]"></span>
								</div>
							</td>
						</tr>
					</tbody>
					<tfoot>
						<tr>
							<td :colspan="tableHead.length - 2" class="border-left font-14">
								<span class="m-right-sm">订单备注：{{ dataInfo.REMARK }}</span>
							</td>
							<td width="120px">商品总额：</td>
							<td width="80px" class="text-right">&yen;{{ dataItem.goodsMoney }}</td>
						</tr>
						<tr v-if="dataInfo.STATUS == 1">
							<td :colspan="tableHead.length - 2" class="border-left"></td>
							<td width="120px">订单改价：</td>
							<td width="80px" class="text-right">
								-&yen;{{ orderChangedMoney | money }}
							</td>
						</tr>
						<tr>
							<td :colspan="tableHead.length - 2" class="border-left"></td>
							<td width="120px">优惠券：</td>
							<td width="80px" class="text-right">-&yen;{{ dataInfo.CURRMONEY }}</td>
						</tr>
						<tr>
							<td :colspan="tableHead.length - 2" class="border-left"></td>
							<td width="120px">运费：</td>
							<td width="80px" class="text-right">
								&yen;{{ dataInfo.FREIGHTMONEY }}
							</td>
						</tr>
						<tr style="color: red">
							<td :colspan="tableHead.length - 2" class="border-left"></td>
							<td width="120px">总额：</td>
							<td width="80px" class="text-right font-14">
								&yen;{{ dataInfo.PAYMONEY }}
							</td>
						</tr>
					</tfoot>
				</table>
			</div>
		</div>
	</section>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import { GOODS_IMGURL } from "@/util/define.js";
export default {
	components: {},
	data() {
		return {
			// -1=全部，0=已取消，1=待处理，2=待打款，3=已完成
			tabPaneList: [
				{ title: "全部", name: "a", value: -1, btnText: "" },
				{ title: "待处理", name: "b", value: 1, btnText: "处理退款" },
				{ title: "待打款", name: "c", value: 2, btnText: "打款确认" },
				{ title: "已完成", name: "d", value: 3, btnText: "查看" },
				{ title: "已取消", name: "e", value: 0, btnText: "查看" }
			],
			activeIdx: 0,
			stateInfo: {
				text: "",
				msg: ""
			},
			dataInfo: {},
			goodsList: [],

			tableHead: [
				{ label: "商品", value: "NAME" },
				{ label: "颜色", value: "COLORNAME" },
				{ label: "尺码", value: "SIZENAME" },
				{ label: "单价", value: "PRICE" },
				{ label: "数量", value: "QTY" },
				{ label: "小计", value: "totalMoney" },
				{ label: "操作", value: "" }
			],
			showRefund: false,
			showPrint: false,
			loading: false,
			showDeliverGoods: false,
			dialogVisible1: false,
			dialogVisible2: false,
			formMoney: {
				PayMoney: 0,
				FreightMoney: 0,
				Remark: ""
			},
			formAddress: {},
			dialogData: {},
			orderChangedMoney: 0
		};
	},
	computed: {
		...mapGetters({
			dataItem: "mallRefundItem",
			dataState: "mallRefundState",
			mallData: "mallData"
		})
	},
	watch: {
		dataItem(data) {
			if (data.success && this.loading) {
				this.defaultData();
			}
			if (!data.success && this.loading) {
				this.$message.error(data.message);
			}
			this.loading = false;
		},
		dataState(data) {
			if (this.loading) {
				if (data.success) {
					this.toSuccess(data);
				} else {
					this.$message.error(data.message);
				}
			}
			this.loading = false;
		}
	},
	methods: {
		getNewData() {
			this.$store
				.dispatch("getMallRefundItem", {
					BillId: this.billId
				})
				.then(() => {
					this.loading = true;
				});
		},
		printFun() {
			this.showPrint = true;
		},
		dealResultRefund(type) {
			this.$confirm("是否" + (type == 1 ? "同意" : "拒绝") + "退款?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning"
			})
				.then(() => {
					this.$store
						.dispatch("resultMallRefund", {
							BillId: item.BILLID,
							type: type == 1 ? true : false
						})
						.then(() => {
							this.loading = true;
						});
				})
				.catch(() => {});
		},
		handleButton(type) {
			// type: 1=同意退款，2=拒绝退款，3=打款确认
			let item = Object.assign({}, this.dataItem.Obj);
			switch (type) {
				case 1:
					this.dealResultRefund(1);
					break;
				case 2:
					this.dealResultRefund(0);
					break;
				case 3:
					this.$confirm("是否确认打款?", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					})
						.then(() => {
							this.$store
								.dispatch("repayMallRefund", {
									BillId: item.BILLID
								})
								.then(() => {
									this.loading = true;
								});
						})
						.catch(() => {});
					break;
				case 4:
					this.$router.push({
						path: "/mall/orderItem",
						query: { id: this.dataItem.SaleObj.BILLID }
					});
					break;
				default:
					this.loading = false;
			}
		},

		toSuccess(data) {
			let text = "";
			if (data.type == "resultRefund_yes") {
				text = "已同意退款";
				this.$confirm(text + ", 是否打款确认?", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				})
					.then(() => {
						this.dataItem.STATUS = 2;
						this.$store
							.dispatch("repayMallRefund", {
								BillId: this.dataItem.BILLID
							})
							.then(() => {
								this.loading = true;
							});
					})
					.catch(() => {
						this.$store.dispatch("clearMallOrderList").then(() => {
							this.getNewData();
						});
					});
				return;
			}
			if (data.type == "resultRefund_no") {
				text = "拒绝退款";
			}
			if (data.type == "repayRefund") {
				text = "已确认打款";
			}
			if (text) {
				this.$message({
					showClose: true,
					message: text,
					type: "success"
				});
			}
			this.$store.dispatch("clearMallOrderList").then(() => {
				this.getNewData();
			});
		},

		defaultData() {
			console.log("defaultData", this.dataItem);
			this.goodsList = [...this.dataItem.GoodsList];
			this.dataInfo = Object.assign({}, this.dataItem.Obj);
			this.activeIdx = this.tabPaneList.findIndex(
				(item) => item.value == this.dataInfo.STATUS
			);

			this.stateInfo.text = this.tabPaneList[this.activeIdx].title;

			if (this.activeIdx == 1) {
				this.orderChangedMoney =
					parseFloat(this.dataItem.goodsMoney) +
					parseFloat(this.dataInfo.FREIGHTMONEY) -
					parseFloat(this.dataInfo.CURRMONEY) -
					parseFloat(this.dataInfo.PAYMONEY);
			}
		}
	},

	mounted() {
		this.billId = this.$route.query.id;
		if (this.billId) {
			this.getNewData();
		} else {
			this.$message.error("订单号不存在");
		}
	}
};
</script>
<style scoped>
.thetable {
	width: 100%;
	border-collapse: collapse;
}
.thetable th,
.thetable td {
	padding: 12px 10px;
	border-right: 1px solid #ddd;
	border-bottom: 1px solid #ddd;
}
</style>
