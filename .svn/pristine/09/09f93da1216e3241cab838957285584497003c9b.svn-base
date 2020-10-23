<template>
	<div v-loading="loading">
		<div class="paddingTB-sm" v-if="dataItem.GoodsList">
			<table class="thetable">
				<thead>
					<tr>
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
					<tr v-for="(item, i) in dataItem.goodsList" :key="i">
						<td v-for="(v, j) in tableHead" :key="j" :class="{ 'border-left': j == 0 }">
							<div v-if="j == 0" class="inline-block vertical-middle">
								<img
									src="static/images/default.png"
									v-real-img="item.GOODSID"
									class="block"
									style="width: 36px; height: 36px"
									:alt="item.GOODSID"
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
						<td :colspan="tableHead.length - 2" class="border-left"></td>
						<td width="120px">合计：</td>
						<td width="80px">&yen;{{ dataItem.goodsMoney }}</td>
					</tr>
					<tr>
						<td :colspan="tableHead.length - 2" class="border-left"></td>
						<td width="120px">运费：</td>
						<td width="80px">&yen;{{ dataItem.Obj.FREIGHTMONEY }}</td>
					</tr>
					<tr>
						<td :colspan="tableHead.length - 2" class="border-left"></td>
						<td width="120px">实付款：</td>
						<td width="80px">&yen;{{ dataItem.Obj.PAYMONEY }}</td>
					</tr>
				</tfoot>
			</table>
		</div>
		<div class="m-bottom-sm" v-if="dataItem.Obj">
			<div class="marginTB-sm">
				<span class="inline-block" style="width: 75px">收货人</span>
				<span>{{ dataItem.Obj.RECEIPTNAME }}</span>
			</div>
			<div class="marginTB-sm">
				<span class="inline-block" style="width: 75px">收货电话</span>
				<span>{{ dataItem.Obj.RECEIPTPHONE }}</span>
			</div>
			<div class="marginTB-sm">
				<span class="inline-block" style="width: 75px">收货地址</span>
				<span>{{ dataItem.Obj.RECEIPTADDRESS }}</span>
			</div>
		</div>
		<el-form ref="form" :model="form" label-width="80px" label-position="left">
			<el-form-item label="发货方式">
				<el-radio-group v-model="form.Delivery">
					<el-radio label="1">物流发货</el-radio>
					<el-radio label="0">无需物流</el-radio>
				</el-radio-group>
			</el-form-item>

			<el-form-item label="物流公司" v-if="form.Delivery == 1" style="height: 42px">
				<div v-if="form.id != 'new'">
					<el-select v-model="form.id" placeholder="请选择">
						<el-option-group
							v-for="group in logisticsList"
							:key="group.label"
							:label="group.label"
						>
							<el-option
								v-for="item in group.options"
								:key="item.ID"
								:label="item.NAME"
								:value="item.ID"
							></el-option>
						</el-option-group>
					</el-select>
					<el-button type="primary" size="small" @click="getNewData()">刷新</el-button>
				</div>
				<div v-else class="vertical-middle">
					<el-input
						placeholder="请输入物流名称"
						v-model="formName"
						clearable
						style="width: 210px"
						class="vertical-middle"
					></el-input>
					<el-button-group>
						<el-button type="primary" size="small" @click="addNew()">新增</el-button>
						<el-button size="small" @click="form.id = ''">取消</el-button>
					</el-button-group>
				</div>
			</el-form-item>
			<el-form-item label="物流单号" v-if="form.Delivery == 1">
				<el-input v-model="form.code" clearable style="width: 210px"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" size="small" @click="onSubmit">确定</el-button>
				<el-button size="small" @click="closeModal">取消</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import { GOODS_IMGURL } from "@/util/define.js";
import img from "@/assets/default.png";
export default {
	props: ["pageState"],
	data() {
		return {
			img: img,
			form: { BillId: "", Delivery: "1", code: "", name: "", id: null },
			formName: "",
			logisticsList: [
				{
					label: "常用",
					options: []
				},
				{
					label: "其它",
					options: [
						{
							ID: "new",
							NAME: "新增"
						}
					]
				}
			],
			loading: false,
			tableHead: [
				{ label: "商品", value: "NAME" },
				{ label: "颜色", value: "COLOR" },
				{ label: "尺码", value: "SIZE" },
				{ label: "单价", value: "PRICE" },
				{ label: "数量", value: "QTY" },
				{ label: "小计", value: "totalMoney" }
			]
		};
	},
	computed: {
		...mapGetters({
			dataItem: "mallOrderItem",
			expressListState: "mallExpressListState",
			expressList: "mallExpressList",
			expressState: "mallExpressState",
			dataState: "mallOrderState"
		})
	},
	watch: {
		expressListState(data) {
			if (this.loading) {
				if (data.success) {
					this.logisticsList[0].options = [...this.expressList];
				} else {
					this.$message.error(data.message);
				}
			}
			this.loading = false;
		},
		pageState(data) {
			if (data.isShow) {
				this.defaultData();
			}
		},
		expressState(data) {
			if (this.loading) {
				if (data.success) {
					this.logisticsList[0].options.push({
						ID: data.data.OutId,
						NAME: this.formName
					});
					this.form.id = data.data.OutId;
					this.formName = "";
				} else {
					this.$message.error(data.message);
				}
			}
			this.loading = false;
		},
		dataState(data) {
			if (this.loading) {
				if (data.success) {
					this.$emit("resetModal");
				} else {
					this.$message.error(data.message);
				}
			}
			this.loading = false;
		}
	},
	methods: {
		closeModal() {
			this.$emit("closeModal");
		},
		getNewData() {
			this.$store.dispatch("getMallExpressList").then(() => {
				this.loading = true;
			});
		},
		addNew() {
			if (!this.formName) {
				this.$message.error("请输入新增物流名称");
				return;
			}
			this.$store
				.dispatch("dealMallExpress", {
					data: { name: this.formName },
					type: "add"
				})
				.then(() => {
					this.loading = true;
				});
		},
		onSubmit() {
			this.form.BillId =
				this.dataItem.Obj && this.dataItem.Obj.BILLID ? this.dataItem.Obj.BILLID : "";
			if (!this.form.BillId) {
				this.$message.error("单号不存在，刷新重试");
				return;
			}
			let sendData = Object.assign({}, this.form),
				isReturn = false;

			if (this.form.Delivery == 1) {
				let arr = this.logisticsList[0].options;
				let idx = arr.findIndex((item) => item.ID == sendData.id);
				if (idx == -1) {
					this.$message.error("请选择物流公司");
					isReturn = true;
				} else {
					sendData.name = arr[idx].NAME;
				}
				if (!this.form.code) {
					this.$message.error("请填写物流单号");
					isReturn = true;
				}
			} else {
				sendData.name = "";
				sendData.code = "";
				sendData.id = "";
			}
			if (isReturn) {
				return;
			}
			// console.log(sendData);
			this.$store.dispatch("deliverMallOrder", sendData).then(() => {
				this.loading = true;
			});
		},

		defaultData() {
			if (this.expressList.length > 0) {
				this.logisticsList[0].options = [...this.expressList];
			} else {
				this.getNewData();
			}
		}
	},
	created() {
		this.defaultData();
	}
};
</script>
<style scoped>
.thetable {
	width: 100%;
}
.thetable th,
.thetable td {
	padding: 12px 10px;
	border-right: 1px solid #ddd;
	border-bottom: 1px solid #ddd;
}
</style>
