<template>
	<section v-loading="loading" class="bg-white" style="padding-bottom: 100px">
		<div class="padding-sm clearfix" style="max-width: 740px">
			<div>
				<div class="title">广告图片|最多上传4张商品图片，建议图片长宽为1000*450</div>
				<el-row :gutter="10">
					<el-col
						:xs="24"
						:sm="12"
						:md="6"
						v-for="(item, i) in imgList"
						:key="i"
						class="overflow-hidden"
					>
						<div class="grid-content bg-purple- relative">
							<div
								v-if="item.isError"
								class="text-center text-white absolute full-width"
								style="background-color: rgba(255, 0, 0, 0.5)"
							>
								<span>上传失败</span>
							</div>
							<img
								:src="item.src"
								:alt="item.name"
								:onerror="imgError"
								id="portrait"
								ref="showbanner"
								class="block full-width"
							/>
							<input
								type="file"
								accept="image/png, image/gif, image/jpeg"
								ref="newbanner"
								v-on:change="inputChange(i)"
								class="hide"
							/>
						</div>
						<div
							class="row-flex text-center relative text-white"
							style="
								line-height: 40px;
								margin-top: -40px;
								background: rgba(0, 0, 0, 0.3);
							"
						>
							<a @click="addImage(i)" class="flex-grow-1 pointer">
								<span v-text="item.src ? '更换' : '添加'"></span>
							</a>
							<a @click="delImage(i)" class="flex-grow-1 pointer">删除</a>
						</div>
					</el-col>
				</el-row>
				<!-- <div class="text-right m-top-sm">
                <el-button type="primary" @click="onUpdate" :loading="uploading">上传</el-button>
                </div>-->
			</div>
			<div class="m-top-md">
				<el-form ref="form" :model="form" :rules="rules" label-width="100px">
					<div class="title">商城信息</div>
					<el-form-item label="商城名称" prop="NAME">
						<el-input v-model="form.NAME" placeholder="请输入商城名称"></el-input>
					</el-form-item>
					<el-form-item label="联系电话">
						<el-input
							v-model.number="form.MOBILENO"
							placeholder="请输入联系电话"
						></el-input>
					</el-form-item>
					<el-form-item label="联系地址">
						<el-select
							v-model="form.PROVINCE"
							placeholder="请选择省份"
							@change="addressfun1"
							style="width: 33%"
						>
							<el-option
								v-if="provinceList.length == 0"
								label="请选择"
								value="-1"
							></el-option>
							<el-option
								v-for="(item, i) in provinceList"
								:key="i"
								:label="item.NAME"
								:value="item.NAME"
							></el-option>
						</el-select>
						<el-select
							v-model="form.CITY"
							placeholder="请选择城市"
							@change="addressfun2"
							style="width: 33%"
						>
							<el-option
								v-if="cityList.length == 0"
								label="请选择"
								value="-1"
							></el-option>
							<el-option
								v-for="(item, i) in cityList"
								:key="i"
								:label="item.NAME"
								:value="item.NAME"
							></el-option>
						</el-select>
						<el-select
							v-model="form.DISTRICT"
							placeholder="请选择地区"
							style="width: 32%"
							class="pull-right"
						>
							<el-option
								v-if="districtList.length == 0"
								label="请选择"
								value="-1"
							></el-option>
							<el-option
								v-for="(item, i) in districtList"
								:key="i"
								:label="item.NAME"
								:value="item.NAME"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label>
						<el-input
							v-model="form.ADDRESS"
							clearable
							placeholder="请输入详细地址"
						></el-input>
					</el-form-item>

					<div class="title">商城设置</div>
					<el-form-item label="库存店铺">
						<el-select v-model="form.STOCKSHOPID" placeholder="请选择库存店铺">
							<el-option
								v-for="(item, i) in theshopList"
								:key="i"
								:label="item.NAME"
								:value="item.ID"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="onSubmit">保存</el-button>
						<el-button @click="getNewData">刷新</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</section>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import { getUserInfo, getHomeData } from "@/api/index";
import { ROOT_URL } from "@/util/define.js";
import addimg from "@/assets/default.png";
export default {
	data() {
		var userInfo = getUserInfo();
		return {
			filePathName: "shopimage",
			imgUrl: ROOT_URL + ":8080/resources/shopimage/",
			imgError: 'this.src="' + addimg + '"',
			imgList: [
				{ src: "", name: userInfo.CompanyID + "_banner1.png" },
				{ src: "", name: userInfo.CompanyID + "_banner2.png" },
				{ src: "", name: userInfo.CompanyID + "_banner3.png" },
				{ src: "", name: userInfo.CompanyID + "_banner4.png" }
			],
			imgChangeList: [],
			theshopList: [],
			form: {
				NAME: "",
				MOBILENO: "",
				PROVINCE: "",
				CITY: "",
				DISTRICT: "",
				ADDRESS: "",
				STOCKSHOPID: getHomeData().shop.ID
			},
			rules: {
				NAME: [
					{
						required: true,
						message: "请输入商城名称",
						trigger: "blur"
					}
				]
			},
			loading: false,
			uploading: false
		};
	},
	computed: {
		...mapGetters({
			shopList: "shopList",
			provinceList: "provinceList",
			cityList: "cityList",
			districtList: "districtList",
			uploadState: "goodsImgUploadState",
			dataState: "mallState",
			dataData: "mallData",
			settingState: "settingMallState",
			shopListState: "shopListState"
		})
	},
	watch: {
		uploadState(data) {
			if (data.success && this.uploading) {
				let idx = this.imgList.findIndex((item) => item.name == this.imgChangeList[0].name);
				this.imgList[idx].isError = false;
				this.imgList[idx].isChange = false;
				this.uploading = false;
				if (this.imgChangeList.lenght > 1) {
					this.onUpdate();
				}
			}
			if (!data.success) {
				let idx = this.imgList.findIndex((item) => item.name == this.imgChangeList[0].name);
				this.$message({
					message: data.message,
					type: "error"
				});
				this.uploading = false;
				this.imgList[idx].isError = true;
				this.imgList = [...this.imgList];
			}
			console.log(data);
		},
		dataState(data) {
			// 获取数据
			if (data.success && this.loading) {
				console.log(data.data);
				this.defaultData();
			}
			if (!data.success) {
				this.$message({
					message: data.message,
					type: "error"
				});
			}
			this.loading = false;
		},
		settingState(data) {
			if (data.success && this.loading) {
				this.$message({
					message: "更改设置成功",
					type: "success"
				});
				this.onUpdate(); // 上传图片
				this.getNewData();
			}
			if (!data.success) {
				this.$message({
					message: data.message,
					type: "error"
				});
			}
			this.loading = false;
		},
		shopListState(data) {
			if (data.success) this.chooseShop();
		}
	},
	methods: {
		delImage(i) {
			this.imgList[i].src = "";
		},
		addImage(i) {
			this.$refs["newbanner"][i].click();
		},
		inputChange(i) {
			let that = this;
			var imgBlock = this.$refs["showbanner"][i];
			var imgFile = this.$refs["newbanner"][i].files[0];
			if (imgFile) {
				var fr = new FileReader();
				fr.onload = function () {
					imgBlock.src = fr.result; // base64
					that.imgList[i].src = fr.result;
					that.imgList[i].isChange = true;
					that.imgList[i].isError = false;
				};
				fr.readAsDataURL(imgFile);
			}
		},
		onUpdate() {
			// upload
			let changeList = this.imgList.filter((item) => item.isChange);
			if (changeList.length == 0) return;

			let img = changeList[0];
			this.imgChangeList = [...changeList];
			this.$store
				.dispatch("uploadGoodsImg", {
					name: img.name,
					filePath: this.filePathName,
					file: img.src
				})
				.then(() => {
					this.uploading = true;
				});
		},

		addressfun1: function (v) {
			let item = this.provinceList.find((item) => item.NAME == v);
			this.$store.dispatch("getCity", { Pid: item.ID }).then(() => {
				this.form.CITY = "";
			});
		},
		addressfun2: function (v) {
			let item = this.cityList.find((item) => item.NAME == v);
			this.$store.dispatch("getDistrict", { Pid: item.ID }).then(() => {
				this.form.DISTRICT = "";
			});
		},
		chooseShop() {
			this.theshopList = [...this.shopList];
		},

		onSubmit() {
			this.$refs["form"].validate((valid) => {
				if (valid) {
					let sendData = Object.assign({}, this.form);
					let iName = ["1", "2", "3", "4"];
					for (let i = 0; i < this.imgList.length; i++) {
						if (this.imgList[i].src.indexOf("base64")) {
							sendData["IMAGE" + iName[i]] = this.imgUrl + this.imgList[i].name;
						}
						if (!this.imgList[i].src) {
							sendData["IMAGE" + iName[i]] = "";
						}
					}
					this.$store.dispatch("settingMall", sendData).then(() => {
						this.loading = true;
					});
				} else {
					console.log("error submit!!");
					return false;
				}
			});
		},
		getNewData() {
			this.$store.dispatch("getSettingMall").then(() => {
				this.loading = true;
			});
		},
		defaultData() {
			if (this.shopList.length > 0) this.chooseShop();
			else this.$store.dispatch("getShopList", {});
			if (this.provinceList.length == 0) {
				this.$store.dispatch("getProvince", {});
			}

			this.form = Object.assign({}, this.form, this.dataData);
			let iName = ["1", "2", "3", "4"];
			for (let i = 0; i < this.imgList.length; i++) {
				if (this.form["IMAGE" + iName[i]]) {
					this.imgList[i].src = this.form["IMAGE" + iName[i]];
				}
			}
			this.imgList = [...this.imgList];
		}
	},
	mounted() {
		if (this.dataData.STOCKSHOPID) {
			this.defaultData();
		} else {
			this.getNewData();
		}
	}
};
</script>
<style scoped>
.title {
	line-height: 40px;
	margin-bottom: 10px;
	font-size: 16px;
}
</style>
