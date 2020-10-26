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
              <el-button
                size="small"
                type="default"
                icon="el-icon-printer"
                @click="$router.push({ path: '/good/codePrinter' })"
              >
                条码打印
              </el-button>

              <el-button
                size="small"
                type="default"
                icon="el-icon-upload2"
                for="input"
                @click="uploadGoods()"
              >
                条码导入
              </el-button>
              <input type="file" ref="upload" accept=".xls, .xlsx" class="outputlist_upload hide" />

              <el-button type="default" size="small" icon="el-icon-download">
                <a href="static/images/条码导入模板.xlsx">下载条码导入模板</a>
              </el-button>

              <el-dropdown size="small" style="margin-left: 30px" @command="handleDropDown">
                <el-button size="small" type="">
                  条码规则设置
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="1">条码生成设置</el-dropdown-item>
                  <el-dropdown-item command="2">颜色条码设置</el-dropdown-item>
                  <el-dropdown-item command="3">尺码条码设置</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

              <!-- search -->
              <el-input
                type="default"
                size="small"
                v-model="searchText"
                @keyup.enter.native="
                  pageData.PN = 1;
                  getGoodsData(searchText);
                "
                placeholder="商品编码/名称/单品条码"
                class="pull-right"
                style="width: 250px"
              >
                <el-button
                  slot="append"
                  type="default"
                  icon="el-icon-search"
                  @click="
                    pageData.PN = 1;
                    getGoodsData(searchText);
                  "
                ></el-button>
              </el-input>
            </div>

            <div class="content-table4">
              <div class="content-table-center">
                <el-table
                  size="small"
                  :data="pageglist"
                  v-loading="loading"
                  :height="clientHeight"
                  :highlight-current-row="true"
                  element-loading-text="数据加载中..."
                  element-loading-spinner="el-icon-loading"
                  style="width: 100%"
                  header-row-class-name="bg-f1f2f3"
                  class="full-width"
                  empty-text="暂无商品数据"
                >
                  <el-table-column
                    prop="RN"
                    label="序号"
                    width="50"
                    align="center"
                    fixed="left"
                  ></el-table-column>
                  <el-table-column label="商品名称" sortable fixed="left" width="180">
                    <template slot-scope="scope">
                      <img
                        :src="scope.row.IMGURL"
                        onerror="this.src='static/images/shopmore.png'"
                        alt=""
                        style="
                          float: left;
                          border-radius: 3px;
                          width: 40px;
                          height: 40px;
                          margin-right: 8px;
                        "
                      />
                      <span style="height: 40px; width: 102px">
                        <div
                          class="text-3399ff pull-left inline-block"
                          style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap"
                        >
                          {{ scope.row.NAME ? scope.row.NAME : " " }}
                        </div>
                        <div style="position: absolute; top: 26px; left: 60px">
                          {{ scope.row.CODE }}
                        </div>
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="TYPENAME" align="center" label="分类"></el-table-column>
                  <el-table-column
                    prop="PYEAR"
                    align="center"
                    label="年份"
                    width="50"
                  ></el-table-column>
                  <el-table-column
                    prop="SEASON"
                    align="center"
                    label="季节"
                    width="60"
                  ></el-table-column>
                  <el-table-column
                    prop="UNITNAME"
                    align="center"
                    label="单位"
                    width="50"
                  ></el-table-column>
                  <el-table-column
                    prop="COLORNAME"
                    label="颜色"
                    align="center"
                    width="60"
                  ></el-table-column>
                  <el-table-column
                    prop="SIZENAME"
                    label="尺码"
                    align="center"
                    width="60"
                  ></el-table-column>
                  <el-table-column
                    prop="BARCODE"
                    label="单品条码"
                    align="center"
                    width="130"
                  ></el-table-column>
                  <el-table-column
                    prop="PRICE"
                    label="零售价"
                    align="center"
                    width="90"
                  ></el-table-column>
                  <!-- <el-table-column prop="STOCKQTY" label="库存" align="center" width="80"></el-table-column> -->
                  <el-table-column label="操作" width="90">
                    <template slot-scope="scope">
                      <el-button
                        type="text"
                        size="small"
                        @click="editCurBarCode(scope.$index, scope.row)"
                      >
                        修改
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>

                <div class="m-top-sm clearfix elpagination">
                  <el-pagination
                    background
                    @size-change="handlePageChange"
                    @current-change="handlePageChange"
                    :current-page.sync="pagination.PN"
                    :page-size="pagination.PageSize"
                    layout="total, prev, pager, next, jumper"
                    :total="pagination.TotalNumber"
                    class="text-center"
                  ></el-pagination>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-container>
    </el-container>

    <el-dialog title="条码生成规则" :visible.sync="setBarCode" width="40%">
      <div>
        <el-radio v-model="barCodeType" label="0">系统默认规则</el-radio>
        <div style="margin-left: 26px; font-size: 10px; color: #999">
          按系统规则生成13位数字条码，长度统一便于打印
        </div>
      </div>

      <div style="margin-top: 20px">
        <el-radio v-model="barCodeType" label="1">货号+颜色条码+尺码条码</el-radio>
        <div style="margin-left: 26px; font-size: 10px; color: #999">
          按货号+颜色条码+尺码条码生成条码
        </div>
      </div>

      <div class="text-right" style="margin-top: 40px">
        <el-button @click="setBarCode = false">取消</el-button>
        <el-button type="primary" @click="saveBarCodeFun">保存</el-button>
      </div>
    </el-dialog>

    <el-dialog title="颜色条码设置" :visible.sync="setColorCode" width="50%">
      <el-table
        :data="colorCodeList"
        size="small"
        border
        :highlight-current-row="true"
        element-loading-text="数据加载中..."
        :height="560"
        element-loading-spinner="el-icon-loading"
        style="width: 100%"
        header-row-class-name="bg-f1f2f3"
        class="full-width"
      >
        <el-table-column align="center" label="序号" type="index"></el-table-column>
        <el-table-column align="center" label="颜色" prop="NAME" width="130"></el-table-column>
        <el-table-column
          align="center"
          label="系统条码"
          prop="COLORBARCODENO"
          width="200"
        ></el-table-column>
        <el-table-column align="center" label="颜色条码">
          <template slot-scope="scope">
            <el-input
              size="mini"
              v-model="scope.row.CODE"
              onkeyup="value=value.replace(/[^\w/]/ig,'')"
              maxlength="15"
              style="text-align: center"
            ></el-input>
          </template>
        </el-table-column>
      </el-table>

      <div class="m-top-sm text-right">
        <el-button @click="setColorCode = false">取消</el-button>
        <el-button type="primary" :loading="colorLoading" @click="saveColorBarCodeFun">
          保存
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title="尺码条码设置" :visible.sync="setSizeCode" width="50%">
      <el-table
        :data="sizeCodeList"
        size="small"
        border
        :highlight-current-row="true"
        element-loading-text="数据加载中..."
        :height="560"
        element-loading-spinner="el-icon-loading"
        style="width: 100%"
        header-row-class-name="bg-f1f2f3"
        class="full-width"
      >
        <el-table-column align="center" label="序号" type="index"></el-table-column>
        <el-table-column align="center" label="尺码组" prop="GROUPNAME"></el-table-column>
        <el-table-column align="center" label="尺码" prop="NAME" width="130"></el-table-column>
        <el-table-column
          align="center"
          label="系统条码"
          prop="SIZEBARCODENO"
          width="200"
        ></el-table-column>
        <el-table-column align="center" label="尺码条码">
          <template slot-scope="scope">
            <el-input
              size="mini"
              v-model="scope.row.CODE"
              onkeyup="value=value.replace(/[^\w/]/ig,'')"
              maxlength="15"
              style="text-align: center"
            ></el-input>
          </template>
        </el-table-column>
      </el-table>

      <div class="m-top-sm text-right">
        <el-button @click="setSizeCode = false">取消</el-button>
        <el-button type="primary" :loading="sizeLoading" @click="saveSizeBarCodeFun">
          保存
        </el-button>
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
      barCodeType: "0",
      setBarCode: false,
      setColorCode: false,
      setSizeCode: false,
      showPrint: true,
      loading: false,
      searchText: "",
      pageglist: [],
      pageData: {
        PN: 1,
        Filter: "",
        Status: 1,
        TypeID: "", //商品类别ID
        IsGift: -1
      },
      pagination: {
        TotalNumber: 0,
        PageNumber: 0,
        PageSize: 20,
        PN: 0
      },
      clientHeight: document.body.clientHeight - 230,
      colorCodeList: [],
      sizeCodeList: [],
      colorLoading: false,
      sizeLoading: false,
      ruleForm: {
        IsAutoGoodsCode: false,
        autogenvipcode: false,
        isneedsaler: false,
        autosendaddsms: false,
        autosendpaysms: false,
        autosendchanagesms: false,
        IsPayIntegral: false,
        AllowSaleDate: false,
        integraltypeid: "",
        IntegralRate: "",
        AutoGoodsNumber: 0,
        AutoGoodsCode: 0,
        ZeroType: 0,
        AutoBarcodeType: 0
      }
    };
  },
  computed: {
    ...mapGetters({
      datagList: "goodsList3",
      datagListState: "goodsListState3",
      modifyBarCodeState: "modifyBarCodeState",
      importState: "importGoodsState",
      getColorCodeListState: "getColorCodeListState",
      getSizeCodeListState: "getSizeCodeListState",
      colorCodeGroupSaveState: "colorCodeGroupSaveState",
      sizeCodeGroupSaveState: "sizeCodeGroupSaveState",
      gparameterstate: "gparameterstate",
      sparameterstate: "sparameterstate"
    })
  },
  components: {
    headerPage: () => import("@/components/header")
  },
  watch: {
    gparameterstate(data) {
      let CompanyConfig = data.data.CompanyConfig;
      if (Object.keys(CompanyConfig).length > 0) {
        for (let key in this.ruleForm) {
          let UCkey = key.toUpperCase();
          this.ruleForm[key] = CompanyConfig[UCkey];
        }
        this.barCodeType = this.ruleForm.AutoBarcodeType + "";
      }
    },
    sparameterstate(data) {
      this.setBarCode = false;
      if (data.success) {
        this.$message.success("设置成功！");
      } else {
        this.$message(data.message);
      }
    },
    sizeCodeGroupSaveState(data) {
      this.sizeLoading = false;
      if (data.success) {
        this.setSizeCode = false;
      }
      this.$message({
        type: data.success ? "success" : "error",
        message: data.message
      });
    },
    colorCodeGroupSaveState(data) {
      this.colorLoading = false;
      if (data.success) {
        this.setColorCode = false;
      }
      this.$message({
        type: data.success ? "success" : "error",
        message: data.message
      });
    },
    getSizeCodeListState(data) {
      console.log(data.data, "尺码编码组");
      this.sizeCodeList = data.data.List;
    },
    getColorCodeListState(data) {
      console.log(data.data, "颜色编码组");
      this.colorCodeList = data.data.List;
    },
    modifyBarCodeState(data) {
      if (data.success) {
        this.getGoodsData("");
      }
      this.$message({
        type: data.success ? "success" : "error",
        message: data.message
      });
    },
    datagListState(data) {
      this.loading = false;
      if (data.success) {
        // this.searchText = ''
        this.pageglist = [...this.datagList];
        this.pagination = {
          TotalNumber: data.paying.TotalNumber,
          PageNumber: data.paying.PageNumber,
          PageSize: data.paying.PageSize,
          PN: data.paying.PN
        };
      } else {
        this.$message.error(data.message);
      }
    },
    outputsState(data) {
      // 导入 mixins
      if (data.state) {
        console.log(data);
        this.importExcel(this.outputs);
      } else {
        this.$message({ showClose: true, message: "数据为空", type: "error" });
      }
    },
    importState(data) {
      console.log(data);
      if (data.success) {
        this.$message("导入成功");
        this.getGoodsData("");
      } else {
        this.$message(data.message);
      }
    }
  },
  methods: {
    handleDropDown(type) {
      if (type == 1) {
        this.setBarCodeFun();
      } else if (type == 2) {
        this.setColorCodeFun();
      } else {
        this.setSizeCodeFun();
      }
    },
    saveBarCodeFun() {
      this.ruleForm.AutoBarcodeType = Number(this.barCodeType);
      this.$store.dispatch("setparameterstate", this.ruleForm);
    },
    saveColorBarCodeFun() {
      let newParam = this.colorCodeList.filter((item) => item.CODE != "" && item.CODE != undefined);
      let ColorObj = [];
      for (var i in newParam) {
        ColorObj.push({
          Id: newParam[i].ID,
          Code: newParam[i].CODE
        });
      }
      this.$store
        .dispatch("colorCodeGroupSave", { ColorObj: JSON.stringify(ColorObj) })
        .then(() => {
          this.colorLoading = true;
        });
    },
    saveSizeBarCodeFun() {
      let newParam = this.sizeCodeList.filter((item) => item.CODE != "" && item.CODE != undefined);
      let SizeObj = [];
      for (var i in newParam) {
        SizeObj.push({
          Id: newParam[i].ID,
          Code: newParam[i].CODE
        });
      }
      this.$store.dispatch("sizeCodeGroupSave", { SizeObj: JSON.stringify(SizeObj) }).then(() => {
        this.sizeLoading = true;
      });
    },
    setBarCodeFun() {
      this.setBarCode = true;
      this.$store.dispatch("getparameterstate", {});
    },
    setColorCodeFun() {
      this.$store.dispatch("getColorBarCodeList", {}).then(() => {
        this.setColorCode = true;
      });
    },
    setSizeCodeFun() {
      this.$store.dispatch("getSizeBarCodeList", {}).then(() => {
        this.setSizeCode = true;
      });
    },
    importExcel(arr) {
      let newData = [];
      for (let i = 1; i < arr.length; i++) {
        let strCode;
        for (var index in arr[i]) {
          let strlen = index.replace(/\s*/g, "").length;
          if (strlen > 40) {
            strCode = arr[i][index];
          }
        }

        newData.push({
          Code: strCode,
          ColorName: arr[i].__EMPTY_1,
          SizeName: arr[i].__EMPTY_2,
          BarCode: arr[i].__EMPTY_3
        });
      }
      this.$store.dispatch("getImportGoodsData", { arr: newData, type: "code" });
    },
    uploadGoods() {
      if (localStorage.getItem("isExperience") == "true") {
        const h = this.$createElement;
        this.$msgbox({
          title: "提示",
          message: h("p", null, [
            h("span", null, "此账号为公用演示账号，数据不可更改，请完成注册之后免费试用！ "),
            h("p", null, "如需协助请联系客服 18054282628 , 随时为您服务！")
          ]),
          showCancelButton: false,
          confirmButtonText: "我知道了",
          confirmButtonClass: "btnFalses"
        });

        return;
      }

      this.$refs.upload.click();
    },
    searchfun(type) {
      this.getGoodsData(this.searchText);
    },
    editCurBarCode(idx, row) {
      if (localStorage.getItem("isExperience") == "true") {
        const h = this.$createElement;
        this.$msgbox({
          title: "提示",
          message: h("p", null, [
            h("span", null, "此账号为公用演示账号，数据不可更改，请完成注册之后免费试用！ "),
            h("p", null, "如需协助请联系客服 18054282628 , 随时为您服务！")
          ]),
          showCancelButton: false,
          confirmButtonText: "我知道了",
          confirmButtonClass: "btnFalses"
        });

        return;
      }

      this.$prompt(`${row.NAME} ( ${row.COLORNAME} - ${row.SIZENAME} )`, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^[0-9a-zA-Z]+$/,
        inputPlaceholder: "请手动输入或扫描单品条码",
        inputValue: row.BARCODE,
        inputErrorMessage: "只能输入数字和字母"
      })
        .then(({ value }) => {
          row.BARCODE = value;
          this.$store.dispatch("modifyBarCode", {
            GoodsId: row.ID,
            ColorId: row.COLORID,
            SizeId: row.SIZEID,
            BarCode: value
          });
        })
        .catch(() => {});
    },
    handlePageChange: function (currentPage) {
      if (this.pageData.PN == currentPage) {
        return;
      }
      this.pageData.PN = parseInt(currentPage);
      this.getGoodsData(this.searchText);
    },
    queryData() {
      this.pageData.PN = 1;
      this.pageData.TypeID = "";
      this.getGoodsData(this.searchText);
    },
    getGoodsData(val) {
      this.pageData.Filter = val;
      this.$store.dispatch("getGoodsList3", this.pageData).then(() => {
        this.loading = true;
      });
    }
  },
  mounted() {
    this.getGoodsData("");
  }
};
</script>


<style scoped>
.btnFalses {
  background-color: white !important;
  color: #409eff !important;
  border: 0;
}

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
.shop {
  display: flex;
  align-items: center;
  height: 50px;
  position: relative;
}
.shop .name {
  position: absolute;
  right: 50px;
  height: 50px;
  line-height: 50px;
  width: 150px;
  text-align: center;
  top: 0;
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
