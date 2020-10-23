<template>
	<section class="mallgoods-deal row-flex" v-loading="loading">
		<div class="leftArea" style="min-width: 400px; width: 400px">
			<div class="m-bottom-sm p-bottom-xs">
				<div class="title">商品图片 | 一张主图3张展示图片，建议图片长宽为500*500</div>
				<el-row :gutter="10" class="paddingTB-sm">
					<el-col
						:xs="24 / imgList.length"
						:sm="24 / imgList.length"
						v-for="(item, i) in imgList"
						:key="i"
					>
						<div class="grid-content bg-purple relative">
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
								class="portrait block full-width"
								ref="showbanner"
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
			</div>
			<el-form ref="form" :model="form" label-width="100px">
				<el-form-item label="商品名称">
					<el-input v-model="form.Name" placeholder="请输入商品名称" clearable></el-input>
				</el-form-item>
				<el-form-item label="商品货号">
					<div class="el-input is-disabled">
						<div class="el-input__inner">{{ dataItem.CODE }}</div>
					</div>
				</el-form-item>

				<el-form-item label="销售价格">
					<el-input
						v-model="form.Price"
						placeholder="请输入销售价格"
						clearable
					></el-input>
				</el-form-item>
				<el-form-item label="颜色">
					<div class="el-input is-disabled">
						<div class="el-input__inner">
							<span v-for="(item, i) in colorList" :key="i">
								{{ i > 0 ? "," : "" }}{{ item.COLORNAME }}
							</span>
						</div>
					</div>
				</el-form-item>
				<el-form-item label="尺码">
					<div class="el-input is-disabled">
						<div class="el-input__inner">
							<span v-for="(item, i) in sizeList" :key="i">
								{{ i > 0 ? "," : "" }}{{ item.SIZENAME }}
							</span>
						</div>
					</div>
				</el-form-item>
				<!-- <el-form-item label="展示价格">
                    <el-input v-model.number="form.Pricelable" placeholder="请输入展示价格"></el-input>
                </el-form-item>
                <el-form-item label="是否热销">
                    <el-switch v-model="form.IsHot"></el-switch>
                </el-form-item>
                <el-form-item label="是否新品">
                    <el-switch v-model="form.IsNew"></el-switch>
                </el-form-item>-->

				<!-- <el-form-item>
                    <template slot="label">
                        <div>
                            <em style="color:red">*</em>
                            <span>配送方式</span>
                        </div>
                    </template>
                    <el-checkbox-group v-model="orderway">
                        <el-checkbox :label="0">快递发货</el-checkbox>
                        <el-checkbox :label="1">到店自提</el-checkbox>
                    </el-checkbox-group>
                </el-form-item> -->
				<el-form-item label="运费模板">
					<el-button type="primary" size="small" @click="freightData.isShow = true">
						选择
					</el-button>
					<div class="inline-block m-left-sm" v-if="freightData.data.ID">
						<span>{{ freightData.data.NAME }}</span>
					</div>
				</el-form-item>
				<el-form-item label="商品分类">
					<el-button type="primary" size="small" @click="goodsClassData.isShow = true">
						选择
					</el-button>
					<div class="inline-block m-left-sm" v-if="goodsClassData.data.ID">
						<span>{{ goodsClassData.data.NAME }}</span>
					</div>
				</el-form-item>
				<el-form-item label="是否上架">
					<el-switch v-model="form.IsSale"></el-switch>
				</el-form-item>
			</el-form>
		</div>
		<div class="rightArea full-width p-left-sm">
			<div>
				<div class="title p-bottom-sm">商品描述</div>
				<the-editor :height="504" :value="Describe" @input="onEditorChange"></the-editor>
			</div>
			<div class="text-right m-top-sm">
				<el-button type="primary" @click="onSubmit" :loading="loading">保存</el-button>
				<el-button @click="onCloseModal(0)">取消</el-button>
			</div>
		</div>
		<!-- 运费模板 -->
		<el-dialog title="运费模板" :visible.sync="freightData.isShow" append-to-body width="980px">
			<selFreightPage
				:pageState="freightData"
				@closeModal="freightData.isShow = false"
				@sendData="getFData"
			></selFreightPage>
		</el-dialog>
		<!-- 商品分类 -->
		<el-dialog
			title="商品分类"
			:visible.sync="goodsClassData.isShow"
			append-to-body
			width="980px"
		>
			<selGoodsClassPage
				:pageState="goodsClassData"
				@closeModal="goodsClassData.isShow = false"
				@sendData="getGData"
			></selGoodsClassPage>
		</el-dialog>
	</section>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import { GOODS_IMGURL } from "@/util/define.js";
import { getUserInfo } from "@/api/index";
import img from "@/assets/newimg.jpg";
import theEditor from "./theEditor.vue";
import selFreightPage from "../selected/selFreight.vue";
import selGoodsClassPage from "../selected/selGoodsClass.vue";
import { compressAccurately } from "image-conversion";
export default {
	props: {
		pageState: {
			type: Object,
			default: {
				isShow: false,
				data: {
					id: null,
					shopId: null
				}
			}
		}
	},
	components: {
		theEditor,
		selFreightPage,
		selGoodsClassPage
	},
	data() {
		return {
			filePathName: "goodsimage",
			imgUrl: GOODS_IMGURL,
			imgError: 'this.src="' + img + '"',
			imgList: [
				{ src: "", name: ".png" },
				{ src: "", name: "_1.png" },
				{ src: "", name: "_2.png" },
				{ src: "", name: "_3.png" }
			],
			imgChangeList: [],
			uploading: false,
			pageData: {},
			form: {
				Name: "",
				Price: 0,
				Pricelable: 0,
				IsSale: true, // -1=全部，1=是，0=否
				IsHot: true, // -1=全部，1=是，0=否
				IsNew: true, // -1=全部，1=是，0=否
				Describe: "",
				Image: "", // 主图以商品id命名
				FreightId: null, // 运费模板id
				TypeId: null // 分类id
			},
			Describe: "",
			editorOption: {},
			loading: false,
			freightData: {
				isShow: false,
				data: {}
			},
			goodsClassData: {
				isShow: false,
				data: {}
			},

			orderway: [],
			upLoadData: {
				filePath: "goodsimage",
				imgUrl: GOODS_IMGURL,
				index: 0
			},
			colorList: [],
			sizeList: []
		};
	},
	computed: {
		...mapGetters({
			dataState: "mallGoodsState",
			dataItem: "mallGoodsItem",
			uploadState: "goodsImgUploadState",
			imagesList: "imagesList"
		})
	},
	watch: {
		pageState(data) {
			if (data.isShow) {
				this.pageData = Object.assign({}, data.data);
				this.getNewData();
			} else {
				Object.assign(this.$data, this.$options.data());
			}
		},
		uploadState(data) {
			if (this.uploading) {
				if (data.success) {
					this.$message({
						message: "上传成功",
						type: "success"
					});

					this.imgList[this.upLoadData.index].src =
						this.upLoadData.imgUrl +
						this.dataItem.ID +
						this.imgList[this.upLoadData.index].name +
						"?v=" +
						Math.random();
					if (this.upLoadData.index == 0) {
						this.onCloseModal(2);
					}
				} else {
					this.$message.error(data.message);
					this.imgList[this.upLoadData.index].isError = true;
					this.imgList[this.upLoadData.index].isChange = false;
				}
			}
			this.uploading = false;
		},
		dataState(data) {
			if (data.success && this.loading) {
				if (data.type == "item") {
					this.colorList = [...data.data.ColorList];
					this.sizeList = [...data.data.SizeList];
					this.defaultData();
				} else {
					this.$message({
						message: "保存成功",
						type: "success"
					});
				}
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
		onCloseModal(type) {
			// 0=关闭，2=刷新列表，3=刷新图片
			this.$emit("closeModal", type);
			if (type < 2) {
				Object.assign(this.$data, this.$options.data());
			}
		},
		getNewData() {
			let sendData = {
				shopId: this.pageData.shopId,
				id: this.pageData.id
			};
			this.$store.dispatch("getMallGoodsItem", sendData).then(() => {
				this.loading = true;
			});
		},
		delImage(idx) {
			this.$refs["showbanner"][idx].value = "";
			this.$refs["showbanner"][idx].src = "";
			this.imgList[idx].src = "";
			this.imgList[idx].isChange = true;
			this.imgList[idx].isError = false;
		},
		addImage(i) {
			this.$refs["newbanner"][i].click();
		},
		uploadGoodsImg_fun(data) {
			if (data) {
				this.$store
					.dispatch("uploadGoodsImg", {
						filePath: this.upLoadData.filePath,
						name: data.name,
						file: data.data
					})
					.then(() => {
						this.uploading = true;
					});
			}
		},
		uploadGoodsImg_before(src, idx) {
			this.$refs["showbanner"][idx].value = "";
			this.$refs["showbanner"][idx].src = src;
			this.imgList[idx].src = src;
			this.imgList[idx].isChange = true;
			this.imgList[idx].isError = false;
			if (this.dataItem.ID) {
				let item = {
					index: idx,
					data: src,
					name: this.dataItem.ID + this.imgList[idx].name
				};
				this.upLoadData.index = idx;
				this.uploadGoodsImg_fun(item);
			}
		},
		inputChange(i) {
			let that = this;
			var imgFile = this.$refs["newbanner"][i].files[0];
			if (imgFile) {
				const isLtKB = imgFile.size / 1024 < 200;
				const theKB = 100; // 压缩到100KB
				if (!isLtKB) {
					imageConversion.compressAccurately(imgFile, theKB).then((res) => {
						var reader = new FileReader();
						reader.readAsDataURL(res);
						reader.onload = function () {
							that.uploadGoodsImg_before(this.result, i);
						};
					});
				} else {
					var fr = new FileReader();
					fr.readAsDataURL(imgFile);
					fr.onload = function () {
						that.uploadGoodsImg_before(this.result, i);
					};
				}
			}
		},

		onEditorChange({ quill, html, text }) {
			// console.log("editor change!", quill, html, text);
			this.form.Describe = html;
			// console.log(this.form.Describe)
		},
		getGData(data) {
			this.goodsClassData = {
				isShow: false,
				data: data
			};
		},
		getFData(data) {
			this.freightData = {
				isShow: false,
				data: data
			};
		},

		onSubmit() {
			if (!this.form.Name) {
				this.$message({
					message: "请输入商品名称",
					type: "error"
				});
				return;
			}
			if (!this.dataItem.ID) {
				this.$message({
					message: "商品有误",
					type: "error"
				});
				return;
			}

			let sendData = Object.assign({}, this.form, {
				IsSale: ~~this.form.IsSale,
				IsHot: ~~this.form.IsHot,
				IsNew: ~~this.form.IsNew
			});
			if (this.dataItem.ID) {
				sendData.Id = this.dataItem.ID;
				let iName = ["", "A", "B", "C"];
				for (let i = 0; i < this.imgList.length; i++) {
					let item = this.imgList[i];
					if (item.isChange) {
						let url = "";
						if (item.src) {
							let aa = item.src.split(".png");
							url = aa[0] ? aa[0] + ".png" : "";
						}
						sendData["Image" + iName[i]] = url;
					}
					// if (this.imgList[i].src) {
					// 	sendData["Image" + iName[i]] =
					// 		GOODS_IMGURL + this.dataItem.ID + this.imgList[i].name;
					// }
				}
			}
			if (this.goodsClassData.data.ID) {
				sendData.TypeId = this.goodsClassData.data.ID;
			}
			if (this.freightData.data.ID) {
				sendData.FreightId = this.freightData.data.ID;
			}

			console.log("提交", sendData);
			this.$store.dispatch("dealMallGoodsItem", sendData).then(() => {
				this.loading = true;
			});
		},
		defaultData() {
			if (this.imagesList.length == 0) {
				this.$store.dispatch("getImagesList", 3);
			}
			if (!this.dataItem.ID) return;
			let dd = this.dataItem,
				ver = "?v=" + Math.random();
			this.form = {
				Name: dd.NAME,
				Price: dd.PRICE ? parseFloat(dd.PRICE) : 0,
				Pricelable: dd.PRICELABLE ? parseFloat(dd.PRICELABLE) : 0,
				IsSale: dd.ISSALE == 1 ? true : false, // -1=全部，1=是，0=否
				IsHot: dd.ISHOT == 1 ? true : false, // -1=全部，1=是，0=否
				IsNew: dd.ISNEW == 1 ? true : false, // -1=全部，1=是，0=否
				Describe: dd.DESCRIBE ? dd.DESCRIBE : "",
				Image: GOODS_IMGURL + dd.ID + ".png", // 主图以商品id命名
				ImageA: dd.IMAGE1 ? dd.IMAGE1 : "",
				ImageB: dd.IMAGE2 ? dd.IMAGE2 : "",
				ImageC: dd.IMAGE3 ? dd.IMAGE3 : ""
			};
			this.imgList[0].src = GOODS_IMGURL + dd.ID + ".png" + ver;
			this.imgList[1].src = dd.IMAGE1 ? dd.IMAGE1 + ver : "";
			this.imgList[2].src = dd.IMAGE2 ? dd.IMAGE2 + ver : "";
			this.imgList[3].src = dd.IMAGE3 ? dd.IMAGE3 + ver : "";

			if (dd.TYPEID) {
				this.form.TypeId = dd.TYPEID;
				this.goodsClassData.data = {
					ID: dd.TYPEID,
					NAME: dd.TYPENAME
				};
			}
			if (dd.FREIGHTID) {
				this.form.FreightId = dd.FREIGHTID;
				this.freightData.data = {
					ID: dd.FREIGHTID,
					NAME: dd.FREIGHTNAME
				};
			}
			this.Describe = dd.DESCRIBE ? dd.DESCRIBE : "";
		}
	},

	created() {
		if (this.pageState.isShow) {
			this.pageData = Object.assign({}, this.pageState.data);
			this.getNewData();
		}
	}
};
</script>
<style scoped>
@media (max-width: 768px) {
	.mallgoods-deal {
		display: block !important;
	}
}
</style>
