<template>
  <el-container>
    <el-header style="height: 50px">
      <headerPage></headerPage>
    </el-header>

    <el-container>
      <el-aside width="100px">
        <section style="min-width: 100px">
          <memberMenu :activePath="activePath" :routesList="routesList" :width="100"></memberMenu>
        </section>
      </el-aside>

      <el-container>
        <div class="content-new-fex">
          <div class="content-eightys">
            <div class="content-center">
              <input type="file" ref="upload" accept=".xls, .xlsx" class="outputlist_upload hide" />
              <span>
                第一步，下载打印模板
                <el-button size="small" type="primary">
                  <a href="static/images/条码打印.btw">下 载</a>
                </el-button>
              </span>
              <span style="margin-left: 30px">
                第二步，下载打印数据
                <el-button size="small" type="danger" @click="ExportBarCodeData">
                  下载数据
                </el-button>
              </span>
              <span style="margin-left: 30px">第三步，手动打开打印模板完成条码打印</span>

              <div class="full-width pull-left text-999" style="margin-top: 16px">
                <i style="color: #f00">注：</i>
                打印前电脑需安装好 打印机驱动 和 BarTender条码打印软件，如有疑问请联系售后技术
              </div>
            </div>

            <div class="content-table4">
              <div class="content-table-center">
                <el-table
                  size="small"
                  :data="theGoodsList"
                  :height="tableHeight"
                  @row-click="handleCurRow"
                  show-summary
                  :summary-method="getSummaries"
                  :highlight-current-row="true"
                  header-row-class-name="bg-f1f2f3"
                  empty-text='暂无数据,请点击 "增加行" 或 扫码添加商品'
                  class="full-width m-top-sm"
                >
                  <el-table-column
                    type="index"
                    width="70"
                    align="center"
                    label="序号"
                    fixed="left"
                  ></el-table-column>

                  <el-table-column
                    prop="GOODSCODE"
                    label="货号"
                    align="center"
                    width="140"
                  ></el-table-column>

                  <el-table-column label="商品" fixed="left" align="center">
                    <template slot-scope="scope">
                      <span v-if="!scope.row.isEdit && scope.row.SIZENAME != ''">
                        {{ scope.row.GOODSNAME }}
                      </span>
                      <span v-if="scope.row.isEdit && scope.row.SIZENAME != ''">
                        {{ scope.row.GOODSNAME }}
                      </span>
                      <el-select
                        size="small"
                        v-if="scope.row.isEdit == true && scope.row.SIZENAME == ''"
                        v-model="scope.row.GOODSID"
                        :remote-method="handleGoodsFilter"
                        reserve-keyword
                        remote
                        clearable
                        @change="curSelect(scope.$index, scope.row)"
                        @focus="defaultGoodsList"
                        filterable
                        placeholder="请输入货号、品名或条码"
                        style="min-width: 200px"
                      >
                        <el-option
                          v-for="(item, index) in goodsListData"
                          :key="index"
                          :label="item.NAME"
                          :value="item.ID"
                        >
                          <span style="float: left">{{ item.CODE }}</span>
                          <span style="float: right; color: #8492a6; font-size: 12px">
                            {{ item.NAME }}
                          </span>
                        </el-option>
                      </el-select>
                    </template>
                  </el-table-column>

                  <el-table-column
                    prop="COLORNAME"
                    label="颜色"
                    align="center"
                    width="80"
                  ></el-table-column>

                  <el-table-column
                    prop="SIZENAME"
                    label="尺码"
                    align="center"
                    width="80"
                  ></el-table-column>

                  <el-table-column
                    prop="PRICE"
                    label="零售价"
                    align="center"
                    width="90"
                  ></el-table-column>

                  <el-table-column prop="BARCODE" label="条码" align="center"></el-table-column>

                  <el-table-column label="数量" align="center" width="130">
                    <template slot-scope="scope">
                      <span v-if="!scope.row.isEdit && scope.row.SIZENAME != ''">
                        {{ scope.row.QTY }}
                      </span>
                      <el-input-number
                        v-if="scope.row.isEdit && scope.row.SIZENAME == ''"
                        size="small"
                        style="width: 100px"
                        disabled
                        controls-position="right"
                        :min="0"
                        v-model.trim="scope.row.QTY"
                        placeholder="请输入"
                      ></el-input-number>
                      <el-input-number
                        v-if="scope.row.isEdit && scope.row.SIZENAME != ''"
                        size="small"
                        style="width: 100px"
                        controls-position="right"
                        :min="0"
                        v-model.trim="scope.row.QTY"
                        placeholder="请输入"
                      ></el-input-number>
                    </template>
                  </el-table-column>

                  <el-table-column label="操作" width="80" fixed="right">
                    <template slot-scope="scope">
                      <el-button
                        v-if="scope.row.GOODSID != '' && scope.row.SIZENAME != ''"
                        type="text"
                        size="small"
                        @click="handleDel(scope.$index, scope.row)"
                      >
                        删除
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </div>
      </el-container>
    </el-container>

    <el-dialog :title="titleName" :visible.sync="isAddGoodsGroup" width="70%" append-to-body>
      <span>点击颜色可批量设置该颜色的数量</span>

      <table class="tableStock m-top-sm" border="0" cellspacing="0" cellpadding="0" width="100%">
        <thead>
          <tr>
            <th style="width: 100px">颜色</th>
            <th v-for="(size, indexS) in currentSizes" :key="indexS">{{ size.SIZENAME }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(color, indexC) in currentColors" :key="indexC">
            <td @click="batchAddNum(color, indexC)" class="namehover">
              {{ color.COLORNAME }}
            </td>
            <td v-for="(size, indexS) in currentSizes" :key="indexS">
              <el-input type="number" v-model.number="color[size.SIZEID]" :min="0"></el-input>
            </td>
          </tr>
        </tbody>
      </table>

      <div style="margin: 16px auto; text-align: center">
        <el-button type="info" @click="cancelAdd()" plain="">取消 (Esc)</el-button>
        <el-button type="primary" plain="" @click="twoDisConfirm()">确认 (Enter)</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>


<script>
import { mapState, mapGetters } from "vuex";
import { getUserInfo, getHomeData } from "@/api/index";
import MIXNINS_EXPORT from "@/mixins/exportData.js";
import MIXINS_GOOD from "@/mixins/good.js";
let _ = require("lodash");
export default {
  mixins: [MIXNINS_EXPORT.TOEXCEL, MIXNINS_EXPORT.TODATA, MIXINS_GOOD.GOOD_MENU],
  data() {
    return {
      theGoodsList: [],
      isAddGoodsGroup: false,
      tableHeight: document.body.clientHeight - 200,

      currentColors: [],
      currentSizes: [],
      storedCount: [],
      BarCodeList: [],
      goodsListData: [],
      vCheckGoodsTimeOut: undefined,

      titleName: "",
      searchText: "",
      loading: false,
      CGloading: false,
      pageDataBill: {
        PN: 1,
        Filter: "",
        Status: 1,
        TypeID: "", //商品类别ID
        DescType: 0,
        IsGift: -1,
        YearList: "",
        SeasonList: "",
        BrandList: "",
        CategoryList: "",
        SexNameList: ""
      },
      defaultParams: {
        GOODSNAME: "",
        GOODSID: "",
        GOODSCODE: "",
        PRICE: 0,
        SIZENAME: "",
        COLORNAME: "",
        QTY: 1,
        isEdit: true,
        BARCODE: "",
        TYPENAME: "", // 分类
        PURPRICE: 0, // 采购价
        VIPPRICE: 0, // 会员价
        SUPPLIERNAME: "", // 供应商
        SHOPBARCODE: "",
        BRAND: "", // 品牌
        PYEAR: "", // 年份
        SEASON: "", // 季节
        UNITNAME: "", // 单位
        STYLE: "", // 风格
        STYLE1: "", // 款式
        PROVENANCE: "", // 产地
        SAFETYCATEGORY: "", // 安全级别
        STANDARD: "", // 执行标准,
        MATERIAL: "" // 材质
      }
    };
  },
  computed: {
    ...mapGetters({
      goodsState: "goodsState",
      goodsItem: "goodsItem",
      goodsList2: "goodsList2",
      goodsListState2: "goodsListState2",
      OnlyOneGoodsState: "OnlyOneGoodsState"
    })
  },
  watch: {
    goodsState(data) {
      if (data.success) {
        let storedCount = [];
        let result = data.data.BarCodeList;
        for (let i = 0; i < result.length; i++) {
          let stored = result[i];
          console.log(stored);
          if (storedCount[stored.COLORID] == undefined) {
            storedCount[stored.COLORID] = [];
          }
          storedCount[stored.COLORID][stored.SIZEID] = stored.BARCODE;
        }

        this.storedCount = storedCount;
        this.currentColors = data.data.ColorList;
        this.currentSizes = data.data.SizeList;
        this.BarCodeList = data.data.BarCodeList; // 商品库存列表
        this.goodsObj = data.data.obj;
      } else {
        this.$message.error(data.message);
      }
    },
    goodsListState2(data) {
      if (data.success) {
        this.goodsListData = this.goodsList2;
        this.constGOODSLIST = this.goodsList2;
      }
    }
  },
  created() {
    let that = this;
    document.onkeydown = function (e) {
      let key = window.event.keyCode;
      if (key == 27) {
        // esc
        that.cancelAdd();
      } else if (key == 13 && that.isAddGoodsGroup == true) {
        // Enter
        that.twoDisConfirm();
      }
    };
  },
  components: {
    headerPage: () => import("@/components/header")
  },
  methods: {
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        if (index > 0 && index < 7) {
          sums[index] = "";
          return;
        }
        if (index == 7) {
          let totalNum = 0;
          for (var i in this.theGoodsList) {
            totalNum += this.theGoodsList[i].QTY;
          }
          sums[index] = totalNum - 1;
          return;
        }
        const values = data.map((item) => Number(item[column.property]));
        if (!values.every((value) => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] += "";
        } else {
          sums[index] = "";
        }
      });

      return sums;
    },
    ExportBarCodeData() {
      if (this.theGoodsList.length == 1) {
        this.$message.warning("请先选择要打印的商品！");
        return;
      }

      var arr = this.theGoodsList.filter(
          (item) => item.GOODSCODE != "" && item.GOODSNAME != "" && item.BARCODE != ""
        ),
        list = [];

      for (var i in arr) {
        for (var j = 0; j < arr[i].QTY; j++) {
          list.push(arr[i]);
        }
      }

      var head = [
        "货号",
        "名称",
        "颜色",
        "尺码",
        "分类",
        "供应商",
        "零售价",
        "会员价",
        "商品条码",
        "单品条码",
        "品牌",
        "单位",
        "年份",
        "季节",
        "材质",
        "风格",
        "款式",
        "产地",
        "安全类别",
        "执行标准"
      ];

      var val = [
        "GOODSCODE",
        "GOODSNAME",
        "COLORNAME",
        "SIZENAME",
        "TYPENAME",
        "SUPPLIERNAME",
        "PRICE",
        "VIPPRICE",
        "SHOPBARCODE",
        "BARCODE",
        "BRAND",
        "UNITNAME",
        "PYEAR",
        "SEASON",
        "MATERIAL",
        "STYLE",
        "STYLE1",
        "PROVENANCE",
        "SAFETYCATEGORY",
        "STANDARD"
      ];

      var title = "条码打印";
      this.export2Excel(head, val, list, title);
    },
    handleDel(idx, row) {
      this.theGoodsList.splice(idx, 1);
    },
    defaultGoodsList() {
      this.$store.dispatch("getGoodsList2", { Status: 1, Filter: "" });
    },
    handleGoodsFilter(val) {
      if (val == "") {
        this.goodsListData = this.constGOODSLIST;
        return;
      }

      if (this.vCheckGoodsTimeOut) {
        window.clearTimeout(this.vCheckGoodsTimeOut);
      }
      let that = this;
      // 1秒内如果有改动查询关键字，就取消查询，否则触发查询。
      this.vCheckGoodsTimeOut = setTimeout(function () {
        that.$store.dispatch("getGoodsList2", { Status: 1, Filter: val });
      }, 800);
    },
    cancelAdd() {
      this.isAddGoodsGroup = false;
      let param = this.theGoodsList,
        newParam = [];
      for (let i in param) {
        if (param[i].SIZENAME == "") {
          param[i].GOODSNAME = "";
          param[i].GOODSCODE = "";
          param[i].GOODSID = "";
        }
        newParam.push(param[i]);
      }
      this.theGoodsList = newParam;
    },
    handleCurRow(row) {
      let param = this.theGoodsList,
        newParam = [];
      for (let i in param) {
        if (
          param[i].GOODSID == row.GOODSID &&
          param[i].COLORID == row.COLORID &&
          param[i].SIZEID == row.SIZEID &&
          param[i].PRICE == row.PRICE
        ) {
          param[i].isEdit = true;
        } else if (
          param[i].GOODSCODE == "" &&
          param[i].SIZENAME == "" &&
          param[i].COLORNAME == ""
        ) {
          param[i].isEdit = true;
        } else {
          param[i].isEdit = false;
        }
        newParam.push(param[i]);
      }
      this.theGoodsList = newParam;
    },
    curSelect(idx, row) {
      let param = this.goodsListData,
        obj = {};
      for (let i in param) {
        if (param[i].ID == row.GOODSID) {
          obj = param[i];
        }
      }
      row.GOODSNAME = obj.NAME;
      row.PRICE = obj.PRICE;
      row.GOODSCODE = obj.CODE;
      row.ID = row.GOODSID;
      this.$store.dispatch("getGoodsItem", row).then(() => {
        if (obj.NAME != undefined) {
          this.titleName = obj.NAME + " ( " + obj.CODE + " )";
          this.isAddGoodsGroup = true; //弹出批量添加商品窗口
        }
      });
    },
    batchAddNum(color, idx) {
      this.$prompt(`批量录入 ( ${color.COLORNAME}  )`, "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPlaceholder: "请输入数字",
        inputPattern: /[!^0-9.]/,
        inputErrorMessage: "只能为数字"
      })
        .then(({ value }) => {
          for (let i = 0; i < this.currentSizes.length; i++) {
            this.currentColors[idx][this.currentSizes[i].SIZEID] = value;
          }
          this.showSetNum();
        })
        .catch(() => {});
    },
    showSetNum() {
      this.theGoodsList.splice(this.theGoodsList.length - 1, 0);
    },
    twoDisConfirm() {
      if (this.searchText == "") {
        this.theGoodsList.splice(this.theGoodsList.length - 1, 1);
        let insertModels = [];
        if (this.storedCount == undefined) {
          this.storedCount = [];
        }

        for (let i = 0; i < this.currentColors.length; i++) {
          let color = this.currentColors[i];
          for (let j = 0; j < this.currentSizes.length; j++) {
            let size = this.currentSizes[j];
            if (color[size.SIZEID] != undefined && color[size.SIZEID] !== "") {
              if (this.storedCount[this.currentColors[i].COLORID] == undefined) {
                this.storedCount[this.currentColors[i].COLORID] = [];
              }
              let item = this.goodsObj;
              console.log(item);
              let newModel = {
                GOODSID: item.ID,
                GOODSNAME: item.NAME,
                GOODSCODE: item.CODE,
                QTY: color[size.SIZEID],
                PRICE: item.PRICE,
                COLORID: color.COLORID,
                COLORNAME: color.COLORNAME,
                SIZEID: size.SIZEID,
                SIZENAME: size.SIZENAME,
                isEdit: false,
                BARCODE: this.storedCount[color.COLORID][size.SIZEID],
                TYPENAME: item.TYPENAME != undefined ? item.TYPENAME : "", // 分类
                PURPRICE: item.PURPRICE, // 采购价
                VIPPRICE: item.VIPPRICE, // 会员价
                SUPPLIERNAME: item.SUPPLIERNAME != undefined ? item.SUPPLIERNAME : "", // 供应商
                SHOPBARCODE: item.BARCODE,
                BRAND: item.BRAND != undefined ? item.BRAND : "", // 品牌
                PYEAR: item.PYEAR != undefined ? item.PYEAR : "", // 年份
                SEASON: item.SEASON != undefined ? item.SEASON : "", // 季节
                UNITNAME: item.UNITNAME != undefined ? item.UNITNAME : "", // 单位
                STYLE: item.STYLE != undefined ? item.STYLE : "", // 风格
                STYLE1: item.STYLE1 != undefined ? item.STYLE1 : "", // 款式
                PROVENANCE: item.PROVENANCE != undefined ? item.PROVENANCE : "", // 产地
                SAFETYCATEGORY: item.SAFETYCATEGORY != undefined ? item.SAFETYCATEGORY : "", // 安全级别
                STANDARD: item.STANDARD != undefined ? item.STANDARD : "", // 执行标准
                MATERIAL: item.MATERIAL != undefined ? item.MATERIAL : "" // 材质
              };
              console.log(newModel);
              insertModels.push(newModel);
            }
          }
        }

        if (this.theGoodsList.length == 0) {
          this.theGoodsList = insertModels.concat({
            GOODSNAME: "",
            GOODSID: "",
            GOODSCODE: "",
            PRICE: 0,
            SIZENAME: "",
            COLORNAME: "",
            QTY: 1,
            isEdit: true,
            BARCODE: "",
            TYPENAME: "", // 分类
            PURPRICE: 0, // 采购价
            VIPPRICE: 0, // 会员价
            SUPPLIERNAME: "", // 供应商
            SHOPBARCODE: "",
            BRAND: "", // 品牌
            PYEAR: "", // 年份
            SEASON: "", // 季节
            UNITNAME: "", // 单位
            STYLE: "", // 风格
            STYLE1: "", // 款式
            PROVENANCE: "", // 产地
            SAFETYCATEGORY: "", // 安全级别
            STANDARD: "", // 执行标准
            MATERIAL: "" // 材质
          });
        } else {
          let arr2 = this.theGoodsList.concat(insertModels),
            newArr = [];
          arr2.forEach((el) => {
            const res = newArr.findIndex((ol) => {
              return (
                el.COLORID == ol.COLORID &&
                el.SIZEID == ol.SIZEID &&
                el.GOODSNAME == ol.GOODSNAME &&
                el.GOODSID == ol.GOODSID
              );
            });
            if (res !== -1) {
              newArr[res].QTY = Number(newArr[res].QTY) + Number(el.QTY);
            } else {
              newArr.push(el);
            }
          });

          this.theGoodsList = newArr.concat({
            GOODSNAME: "",
            GOODSID: "",
            GOODSCODE: "",
            PRICE: 0,
            SIZENAME: "",
            COLORNAME: "",
            QTY: 1,
            isEdit: true,
            BARCODE: "",
            TYPENAME: "", // 分类
            PURPRICE: 0, // 采购价
            VIPPRICE: 0, // 会员价
            SUPPLIERNAME: "", // 供应商
            SHOPBARCODE: "",
            BRAND: "", // 品牌
            PYEAR: "", // 年份
            SEASON: "", // 季节
            UNITNAME: "", // 单位
            STYLE: "", // 风格
            STYLE1: "", // 款式
            PROVENANCE: "", // 产地
            SAFETYCATEGORY: "", // 安全级别
            STANDARD: "", // 执行标准
            MATERIAL: "" // 材质
          });
        }
        console.log(this.theGoodsList);
        this.isAddGoodsGroup = false;
      }
    }
  },
  mounted() {
    this.theGoodsList = [
      {
        GOODSNAME: "",
        GOODSID: "",
        GOODSCODE: "",
        PRICE: 0,
        SIZENAME: "",
        COLORNAME: "",
        QTY: 1,
        isEdit: true,
        BARCODE: "",
        TYPENAME: "", // 分类
        PURPRICE: 0, // 采购价
        VIPPRICE: 0, // 会员价
        SUPPLIERNAME: "", // 供应商
        SHOPBARCODE: "",
        BRAND: "", // 品牌
        PYEAR: "", // 年份
        SEASON: "", // 季节
        UNITNAME: "", // 单位
        STYLE: "", // 风格
        STYLE1: "", // 款式
        PROVENANCE: "", // 产地
        SAFETYCATEGORY: "", // 安全级别
        STANDARD: "", // 执行标准
        MATERIAL: "" // 材质
      }
    ];
  }
};
</script>

<style lang="scss" scoped >
.inventory .el-input-group__prepend {
  padding: 0 10px !important;
  background-color: #409eff !important;
  border-color: #409eff !important;
}

.el-table td,
.el-table th {
  text-align: center;
}

.leftLabel {
  width: 70px;
  min-width: 70px;
}

.tableStock {
  text-align: center;
  thead {
    background: #409eff;
    color: #fff;
    height: 36px;
    line-height: 36px;
    tr {
      th {
        border-right: 1px solid #fff;
      }
    }
  }
  tbody {
    tr {
      height: 36px;
      line-height: 36px;
      td {
        border: 1px solid #ebeef5;
        input {
          border: none;
          height: 36px;
          line-height: 36px;
          width: 100%;
          text-align: center;
        }
        input:hover {
          outline: 1px solid #409eff;
        }
      }
    }
  }
}
.namehover {
  text-decoration: underline;
  color: #409eff;
}
.namehover:hover {
  color: #333;
  cursor: pointer;
}
</style>

<style scoped>
.member-header {
  display: flex;
  align-items: center;
  height: 50px;
}

.center-title {
  width: 100px;
  text-align: center;
  height: 50px;
  line-height: 50px;
  border: solid 1px #d7d7d7;
}

.center-cont {
  width: 100px;
  text-align: center;
  height: 50px;
  line-height: 50px;
}

.el-header {
  padding: 0 !important;
}

.el-header,
.el-footer {
  background-color: #fff;
  color: #333;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.content-eightys {
  display: flex;
  align-items: center;
  width: 100%;
  height: 80px;
  background: #fff;
}
</style>
