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
						<div class="dealHistory paddingLR-sm paddingTB-xs text-left inline-block">
							<span class="font-14">{{ stateInfo.msg }}</span>
							<div v-if="stateInfo.msg2" class="font-14 marginTB-xs">
								{{ stateInfo.msg2 }}
							</div>
							<div v-if="stateInfo.msg3" class="font-14 marginTB-xs">
								{{ stateInfo.msg3 }}
							</div>
						</div>
						<div class="paddingLR-sm paddingTB-xs">
							<div v-if="dataItem.Obj.STATUS == 1">
								<div class="paddingTB-xs"></div>
								<el-button size="small" type="danger" plain @click="changeMoney(1)">
									修改金额
								</el-button>
							</div>
							<div
								v-if="
									dataInfo.STATUS == 2 ||
									dataInfo.STATUS == 3 ||
									dataInfo.STATUS == 4
								"
							>
								<el-button
									size="small"
									type="danger"
									plain
									:disabled="dataItem.hadReturn"
									@click="handleButton(1)"
								>
									退款
								</el-button>
								<el-button
									v-if="dataInfo.STATUS == 2"
									size="small"
									type="primary"
									plain
									@click="handleButton(2)"
								>
									发货
								</el-button>
								<el-button
									v-if="dataInfo.STATUS == 3"
									size="small"
									type="success"
									plain
									@click="handleButton(3)"
								>
									完成订单
								</el-button>
							</div>
						</div>
					</div>
					<div style="height: 40px">
						<el-button
							v-if="dataInfo.STATUS != 1 && !dataItem.hadReturn"
							size="small"
							type="text"
							@click="printFun()"
						>
							<span class="text-muted">
								<i class="el-icon-printer"></i>
								打印订单
							</span>
						</el-button>
						<el-button
							v-if="dataInfo.STATUS == 1"
							size="small"
							type="text"
							@click="cancelMallOrder()"
							style="margin-left: 20px"
						>
							<span class="text-muted">
								<i class="el-icon-remove-outline"></i>
								取消订单
							</span>
						</el-button>
					</div>
				</el-col>
				<el-col :span="7">
					<div style="height: 160px">
						<div class="paddingLR-sm paddingTB-xs">
							<span class="font-20">订单信息</span>
						</div>
						<div class="paddingLR-sm paddingTB-xs">
							<span
								class="inline-block"
								style="width: 75px"
								v-text="dataItem.Obj.STATUS == 2 ? '订单编号：' : '下单编号：'"
							></span>
							<span>{{ dataItem.Obj.BILLNO }}</span>
						</div>
						<div class="paddingLR-sm paddingTB-xs">
							<span class="inline-block" style="width: 75px">下单时间：</span>
							<span>{{ new Date(dataItem.Obj.BILLDATE) | formatTime }}</span>
						</div>
						<div class="paddingLR-sm paddingTB-xs">
							<span class="inline-block" style="width: 75px">下单方式：</span>
							<span>{{ dataItem.Obj.PAYTYPENAME }}</span>
						</div>
					</div>
				</el-col>
				<el-col :span="10" class="border-left">
					<div style="height: 160px">
						<div class="paddingLR-sm paddingTB-xs">
							<span class="font-20">配送信息</span>
						</div>
						<div class="paddingLR-sm paddingTB-xs">
							<span class="inline-block" style="width: 75px">收货人：</span>
							<span>{{ dataItem.Obj.RECEIPTNAME }}</span>
						</div>
						<div class="paddingLR-sm paddingTB-xs">
							<span class="inline-block" style="width: 75px">收货电话：</span>
							<span>{{ dataItem.Obj.RECEIPTPHONE }}</span>
						</div>
						<div class="paddingLR-sm paddingTB-xs">
							<span class="inline-block" style="width: 75px">收货地址：</span>
							<span>{{ dataItem.Obj.RECEIPTADDRESS }}</span>
						</div>
						<div v-if="dataInfo.STATUS > 2">
							<div class="paddingLR-sm paddingTB-xs">
								<span class="inline-block" style="width: 75px">发货方式：</span>
								<span v-if="dataInfo.LOGISTICSID">
									{{ dataInfo.LOGISTICSCOMPANYNAME }}
								</span>
								<span v-else>无</span>
							</div>
							<div class="paddingLR-sm paddingTB-xs">
								<span class="inline-block" style="width: 75px">物流单号：</span>
								<span v-if="dataInfo.LOGISTICSID">{{ dataInfo.LOGISTICSID }}</span>
								<span v-else>无</span>
							</div>
						</div>
					</div>
					<div style="height: 40px" class="paddingLR-sm">
						<el-button
							type="text"
							v-if="dataInfo.STATUS == 1 || dataInfo.STATUS == 2"
							@click="changeAddress()"
						>
							<span class="text-muted">
								<i class="el-icon-edit-outline"></i>
								修改收货地址
							</span>
						</el-button>
						<el-button type="text" @click="getNewData" class="pull-right">
							<span class="text-muted">刷新</span>
						</el-button>
					</div>
				</el-col>
			</el-row>
		</div>
		<!-- <div class="padding-xs bg-elMain"></div>
        <div class="padding-md">
            <div class="dealHistory paddingLR-lg relative">
                <el-timeline :reverse="true">
                    <el-timeline-item
                        v-for="(activity, index) in dealHistory"
                        :key="index"
                        :icon="activity.icon"
                        :type="activity.type"
                        :color="activity.color"
                        :size="activity.size"
                        :hide-timestamp="false"
                        :timestamp="activity.title"
                        placement="top"
                    >
                        <div>{{activity.content}}</div>
                    </el-timeline-item>
                </el-timeline>
            </div>
        </div>-->
		<div class="padding-xs bg-elMain"></div>
		<div class="padding-sm" v-if="dataItem.GoodsList">
			<div class>
				<!-- table -->
				<table class="thetable">
					<thead class="box-shadow">
						<tr class="bg-f8 text-4e">
							<th
								v-for="(item, idx) in tableHead"
								:key="idx"
								:class="
									idx == 1 || idx == 2
										? 'text-center'
										: idx == tableHead.length - 1
										? 'text-right'
										: 'text-left'
								"
							>
								{{ item.label }}
							</th>
						</tr>
					</thead>
					<tbody class="box-shadow">
						<tr v-for="(item, i) in goodsList" :key="i">
							<td
								v-for="(v, j) in tableHead"
								:key="j"
								:class="{ 'text-center': j == 1 || j == 2 }"
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
								<!-- 退款 -->
								<span
									v-if="j == 0 && item.ISRETURN"
									class="pull-right"
									:style="
										item.STATUS > 0
											? item.STATUS == 3
												? 'color:green'
												: 'color:red'
											: 'color:#aaa'
									"
								>
									{{ refundStateList[item.STATUS] }}
								</span>
							</td>
						</tr>
					</tbody>
					<tfoot>
						<tr>
							<td :colspan="tableHead.length - 2" class="font-14">
								<span class="m-right-sm">订单备注：{{ dataInfo.REMARK }}</span>
								<el-button
									type="text"
									v-if="dataInfo.STATUS == 1 || dataInfo.STATUS == 2"
									@click="changeMoney(2)"
								>
									<span class="text-muted">
										<i class="el-icon-edit-outline"></i>
										修改备注
									</span>
								</el-button>
							</td>
							<td width="120px">商品总额：</td>
							<td width="80px" class="text-right">&yen;{{ dataItem.goodsMoney }}</td>
						</tr>
						<tr v-if="dataInfo.STATUS == 1">
							<td :colspan="tableHead.length - 2" class></td>
							<td width="120px">订单改价：</td>
							<td width="80px" class="text-right">
								-&yen;{{ orderChangedMoney | money }}
							</td>
						</tr>
						<tr>
							<td :colspan="tableHead.length - 2" class></td>
							<td width="120px">优惠券：</td>
							<td width="80px" class="text-right">
								<span v-if="dataInfo.COUPONMONEY">
									-&yen;{{ dataInfo.COUPONMONEY }}
								</span>
								<span v-else>&yen;0</span>
							</td>
						</tr>
						<tr>
							<td :colspan="tableHead.length - 2" class></td>
							<td width="120px">运费：</td>
							<td width="80px" class="text-right">
								&yen;{{ dataInfo.FREIGHTMONEY }}
							</td>
						</tr>
						<tr style="color: red">
							<td :colspan="tableHead.length - 2" class></td>
							<td width="120px">应付总额：</td>
							<td width="80px" class="text-right font-14">
								&yen;{{ dataInfo.PAYMONEY }}
							</td>
						</tr>
					</tfoot>
				</table>
			</div>
		</div>

		<!-- 修改金额 -->
		<el-dialog append-to-body title="修改订单金额" :visible.sync="dialogVisible1" width="450px">
			<div>
				<el-form ref="form" :model="formMoney" :rules="rules" label-width="80px">
					<el-form-item label="付款金额" prop="PayMoney">
						<el-input
							type="number"
							v-model.number="formMoney.PayMoney"
							min="0"
							clearable
						></el-input>
					</el-form-item>
					<el-form-item label="运费" prop="FreightMoney">
						<el-input
							type="number"
							v-model.number="formMoney.FreightMoney"
							min="0"
							clearable
						></el-input>
					</el-form-item>
					<el-form-item>
						<el-button size="small" type="primary" @click="handleButton('1-edit')">
							确认
						</el-button>
						<el-button size="small" @click="dialogVisible1 = false">取消</el-button>
					</el-form-item>
				</el-form>
			</div>
		</el-dialog>
		<!-- 修改地址 -->
		<el-dialog append-to-body title="修改收货地址" :visible.sync="dialogVisible2" width="600px">
			<address-page
				:pageData="formAddress"
				@closeModal="dialogVisible2 = false"
				@resetModal="changeAddress_fun"
			></address-page>
		</el-dialog>
		<!-- 退款 -->
		<el-dialog append-to-body title="申请退款" :visible.sync="showRefund" width="500px">
			<order-refund-page
				:pageData="dialogData"
				@closeModal="showRefund = false"
				@resetModel="resetModel_fun"
			></order-refund-page>
		</el-dialog>
		<!-- 发货 -->
		<el-dialog append-to-body title="产品发货" :visible.sync="showDeliverGoods" width="600px">
			<deliverGoods-page @closeModal="showDeliverGoods = false"></deliverGoods-page>
		</el-dialog>
		<!-- 打印小票 -->
		<el-dialog append-to-body title="打印小票" :visible.sync="showPrint" width="400px">
			<div style="line-height: 40px">
				<div class="text-center">商家名称</div>
				<div class="text-center relative">
					<div
						class="translateY-center full-width"
						style="height: 1px; background: red"
					></div>
					<div class="paddingLR-sm relative bg-white inline-block" style="z-index: 1">
						订单信息
					</div>
				</div>
				<div>
					<span>订单编号</span>
					<span class="pull-right">&yen;10</span>
				</div>
				<div>
					<span>下单时间</span>
					<span class="pull-right">&yen;10</span>
				</div>
				<div>
					<span>会员编号</span>
					<span class="pull-right">&yen;10</span>
				</div>
				<div>
					<span>下单人</span>
					<span class="pull-right">&yen;10</span>
				</div>
				<div>
					<span>收款时间</span>
					<span class="pull-right">&yen;10</span>
				</div>
				<div class="text-center relative">
					<div
						class="translateY-center full-width"
						style="height: 1px; background: red"
					></div>
					<div class="paddingLR-sm relative bg-white inline-block" style="z-index: 1">
						消费明细
					</div>
				</div>
				<div>
					<div class="p-left-md relative">
						<span calss="inline-block absolute" style="position: absolute; left: 0">
							1.
						</span>
						<div>
							<span>商品名称</span>
							<span class="pull-right">&yen;10</span>
						</div>
						<div>
							<span>数量</span>
							<span class="pull-right">&yen;10</span>
						</div>
						<div>
							<span>小计</span>
							<span class="pull-right">&yen;10</span>
						</div>
					</div>
				</div>
				<div>
					<span>合计</span>
					<span class="pull-right">&yen;10</span>
				</div>
				<div>
					<span>订单修改</span>
					<span class="pull-right">&yen;10</span>
				</div>
				<div>
					<span>付款：微信</span>
					<span class="pull-right">&yen;10</span>
				</div>
				<div>
					<span>合计收款</span>
					<span class="pull-right">&yen;10</span>
				</div>
				<div class="text-center border-top p-top-sm" style="line-height: 1.3">
					<div>扫码收藏店铺，随时可预约</div>
					<div>谢谢光临，欢迎再来！</div>
					<div>
						<img src alt />
					</div>
				</div>
				<div class="m-top-sm text-right">
					<el-button size="small" stye="primery">打印</el-button>
					<el-button size="small" @click="showPrint = false">取消</el-button>
				</div>
			</div>
		</el-dialog>
	</section>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import { GOODS_IMGURL } from "@/util/define.js";
import orderRefundPage from "./orderRefund.vue";
import deliverGoodsPage from "./deliverGoods.vue";
import addressPage from "@/views/mall/setup/address";
import { printingFun } from "./js/print.js";
var QRCode = require("qrcode");
export default {
	components: {
		orderRefundPage,
		deliverGoodsPage,
		addressPage
	},
	data() {
		var checkNumber = (rule, value, callback) => {
			var myreg = /^((0{1}\.\d{1,2})|([1-9]\d*\.{1}\d{1,2})|([1-9]+\d*))$/;
			if (!myreg.test(value)) {
				callback(new Error("请输入小数保留两位的正整数数值"));
			} else {
				callback();
			}
		};
		var checkNumber2 = (rule, value, callback) => {
			var myreg = /^[+]{0,1}(\d+)$/;
			if (!myreg.test(value)) {
				callback(new Error("请输入正整数数值"));
			} else {
				callback();
			}
		};
		return {
			// -1=全部，0=已取消，1=待付款，2=已付款（待发货），3=待收货（已发货），4=待评价（已完成），5=已评价
			tabPaneList: [
				{ title: "全部", name: "a", value: -1, btnText: "" },
				{ title: "等待付款", name: "b", value: 1, btnText: "去付款" },
				{ title: "待发货", name: "c", value: 2, btnText: "去发货" },
				{ title: "已发货", name: "d", value: 3, btnText: "已发货" },
				{ title: "已完成", name: "e", value: 4, btnText: "已完成" },
				{ title: "已取消", name: "f", value: 0, btnText: "已取消" }
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
			rules: {
				PayMoney: [
					{
						required: true,
						validator: checkNumber,
						trigger: "blur"
					}
				],
				FreightMoney: [
					{
						required: true,
						validator: checkNumber2,
						trigger: "blur"
					}
				]
			},
			formAddress: {},
			dialogData: {},
			orderChangedMoney: 0,
			refundStateList: ["商家拒绝退款", "待商家处理退款", "等待商家打款", "完成退款"], // -1=全部，0=已取消，1=待处理，2=待打款，3=已完成
			dealHistory: []
		};
	},
	computed: {
		...mapGetters({
			dataItem: "mallOrderItem",
			dataState: "mallOrderState",
			mallState: "mallState",
			mallData: "mallData",
			mallQRcodeState: "mallQRcodeState"
		})
	},
	watch: {
		mallState(data) {
			if (data.success && Object.keys(this.dataItem).length > 0) {
				this.countDownTime(this.activeIdx);
			}
		},
		dataState(data) {
			if (this.loading) {
				if (data.success) {
					this.getNewData();
				}
				this.$message({
					showClose: true,
					message: data.message,
					type: data.success ? "success" : "error"
				});
			}
			this.loading = false;
			this.dialogVisible1 = false;
			this.dialogVisible2 = false;
			this.showRefund = false;
			this.showDeliverGoods = false;
			this.showPrint = false;
		},
		dataItem(data) {
			if (data.success && this.loading) {
				this.defaultData();
			}
			if (!data.success && this.loading) {
				this.$message.error(data.message);
			}
			this.loading = false;
		},
		mallQRcodeState(data) {
			if (this.loading) {
				if (data.success) {
					QRCode.toDataURL(data.data.BarCode)
						.then((url) => {
							printingFun(
								this.dataItem.Obj,
								this.dataItem.goodsList,
								this.dataItem.VipObj,
								url
							);
						})
						.catch((err) => {
							console.error(err);
						});
				} else this.$message.error(data.message);
			}
			this.loading = false;
		}
	},
	methods: {
		theImgurl(id) {
			return GOODS_IMGURL + id + ".png";
		},
		resetModel_fun() {
			this.$store.dispatch("clearMallOrderAll").then(() => {
				this.showRefund = false;
				this.getNewData();
			});
		},
		printFun() {
			// this.showPrint = true;
			this.$store.dispatch("getQRcodeMall", { shopId: this.dataItem.Obj.SHOPID }).then(() => {
				this.loading = true;
			});
		},
		cancelMallOrder() {
			this.$confirm("是否取消该订单?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning"
			})
				.then(() => {
					this.handleButton("1-del");
				})
				.catch(() => {});
		},
		handleButton(type) {
			// type: 1=退款，2=发货，3=完成订单
			let item = Object.assign({}, this.dataItem.Obj);
			switch (type) {
				case 1:
					this.dialogData = Object.assign({ isShow: true }, this.dataItem);
					this.showRefund = true;
					break;
				case 2:
					this.showDeliverGoods = true;
					break;
				case 3:
					this.$store
						.dispatch("finishMallOrder", {
							BillId: item.BILLID
						})
						.then(() => {
							this.loading = true;
						});
					break;
				case "1-del":
					// 取消订单
					this.$store
						.dispatch("cancelMallOrder", {
							BillId: item.BILLID
						})
						.then(() => {
							this.loading = true;
						});
					break;
				case "1-edit":
					// 订单修改 ,修改金额
					this.$refs["form"].validate((valid) => {
						if (valid) {
							this.$store
								.dispatch(
									"changeMallOrderMoney",
									Object.assign(
										{
											BillId: item.BILLID
										},
										this.formMoney
									)
								)
								.then(() => {
									this.loading = true;
								});
						} else {
							console.log("error submit!!");
							return false;
						}
					});
					break;
				default:
					this.loading = false;
			}
		},

		changeMoney(type) {
			this.formMoney = {
				PayMoney: this.dataInfo.PAYMONEY,
				FreightMoney: this.dataInfo.FREIGHTMONEY,
				Remark: this.dataInfo.REMARK
			};
			if (type == 1) {
				// 改金额
				this.dialogVisible1 = true;
			} else {
				// 改备注
				let remark = this.dataItem.Obj.REMARK;
				this.$prompt("", "修改备注", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					inputType: "textarea",
					inputPattern: /\S/,
					inputErrorMessage: "内容不能为空",
					inputValue: remark
				})
					.then(({ value }) => {
						this.formMoney.Remark = value;
						this.handleButton("1-edit");
					})
					.catch(() => {});
			}
		},
		changeAddress() {
			this.formAddress = {
				name: this.dataItem.Obj.RECEIPTNAME,
				phone: this.dataItem.Obj.RECEIPTPHONE,
				address: this.dataItem.Obj.RECEIPTADDRESS,
				isShow: true
			};
			this.dialogVisible2 = true;
		},
		changeAddress_fun(data) {
			let str = data.PROVINCE + data.CITY + data.DISTRICT + " " + data.ADDRESS;
			this.$store
				.dispatch("changeMallOrderAddress", {
					BillId: this.billId,
					ReceiptAddress: str
				})
				.then(() => {
					this.dialogVisible2 = false;
					this.loading = true;
				});
		},
		// --------------------------
		getNewData() {
			this.$store
				.dispatch("getMallOrderItem", {
					BillId: this.billId
				})
				.then(() => {
					this.loading = true;
				});
		},
		countDownTime() {
			let str = "";
			let edate = this.getCustomDay(this.mallData.AUTOORDER, this.dataInfo.BILLDATE, true);
			let leftTime = edate - new Date().getTime();

			if (leftTime > 0) {
				// 天
				let day = Math.floor(leftTime / 1000 / 60 / 60 / 24);
				// 时
				let h = Math.floor((leftTime / 1000 / 60 / 60) % 24);
				let hour = h < 10 ? "0" + h : h;
				// 分
				let m = Math.floor((leftTime / 1000 / 60) % 60);
				let min = m < 10 ? "0" + m : m;
				// 秒
				let s = Math.floor((leftTime / 1000) % 60);
				let second = s < 10 ? "0" + s : s;
				str = day + "天" + hour + "小时";
			} else {
				str = "0天0小时";
			}
			this.stateInfo.msg = "需付款：￥" + this.dataInfo.PAYMONEY + "，剩余：" + str;
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
				if (Object.keys(this.mallData).length > 0) {
					this.countDownTime();
				} else {
					this.$store.dispatch("getSettingMall").then(() => {
						this.loading = true;
					});
				}
			}

			this.dealHistory = [];
			if (this.activeIdx == 2 || this.activeIdx == 3 || this.activeIdx == 4) {
				let dstr = this.dataInfo.CHECKTIME
					? this.filterTime(new Date(this.dataInfo.CHECKTIME))
					: "";
				this.stateInfo.msg = "付款时间：" + dstr;

				this.dealHistory.push({
					content: dstr,
					title: "付款时间"
				});
			}
			if (this.activeIdx == 3 || this.activeIdx == 4) {
				let dstr = this.dataInfo.LOGISTICSTIME
					? this.filterTime(new Date(this.dataInfo.LOGISTICSTIME))
					: "";
				this.stateInfo.msg2 = "发货时间：" + dstr;

				this.dealHistory.push({
					content: dstr,
					title: "发货时间"
				});
			}
			if (this.activeIdx == 4) {
				let dstr = this.dataInfo.MODIFYTIME
					? this.filterTime(new Date(this.dataInfo.MODIFYTIME))
					: "";
				this.stateInfo.msg3 = "完成时间：" + dstr;

				this.dealHistory.push({
					content: dstr,
					title: "完成时间"
				});
			}
			if (this.activeIdx == 5) {
				this.stateInfo.msg = "";
				// this.stateInfo.msg = "取消原因：";
			}

			let dHitem = this.dealHistory[this.dealHistory.length - 1];
			this.dealHistory[this.dealHistory.length - 1] = Object.assign(
				{
					type: "primary"
				},
				dHitem
			);
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
}

.thetable tfoot td {
	padding: 5px 10px;
}

.thetable tfoot tr:first-child td {
	padding-top: 12px;
}
</style>
