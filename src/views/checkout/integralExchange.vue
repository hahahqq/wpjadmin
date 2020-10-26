<template>
  <div class="">
    <!-- 列表 -->
    <div class="overflowscroll">
      <div class="tableStyle tableLineHeight">
        <el-table
          border
          size="small"
          :data="shopDataList"
          :height="tableHeight"
          show-summary
          :summary-method="getSummaries"
          empty-text="暂无数据，请选择商品"
          :highlight-current-row="true"
          style="height: 300px"
          @row-click="handleCurRow"
          header-row-class-name="bg-f5 text-f3"
          width="100%"
        >
          <el-table-column align="center" type="index" label="序号"></el-table-column>
          <el-table-column align="center" prop="goodsCode" label="货号"></el-table-column>
          <el-table-column align="center" prop="goodsname" label="商品名称"></el-table-column>
          <el-table-column
            align="center"
            prop="ColorName"
            label="颜色"
            width="100"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="SizeName"
            label="尺码"
            width="100"
          ></el-table-column>
          <el-table-column align="center" prop="GIFTINTEGRAL" label="积分"></el-table-column>

          <el-table-column align="center" label="数量">
            <template slot-scope="scope">
              <span v-show="!scope.row.notEdit">{{ scope.row.Qty }}</span>
              <span v-show="scope.row.notEdit">
                <el-input-number
                  size="mini"
                  style="width: 90px"
                  controls-position="right"
                  v-model.trim="scope.row.Qty"
                  @keyup.enter.native="sureEditQty(scope.row, $event.target)"
                ></el-input-number>
              </span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="积分小计">
            <template slot-scope="scope">
              <span>{{ scope.row.Qty * scope.row.GIFTINTEGRAL }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="100">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="handleDel(scope.$index, scope.row)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="c_footer" style="margin-top: 10px">
      <el-row :gutter="24" style="margin-left: 0; margin-right: 0; border-top: 1px solid #e4e4e4">
        <el-col
          :span="8"
          style="padding: 16px 16px; position: relative; border-right: 1px solid #e4e4e4"
        >
          <el-select
            v-model="searchText"
            size="small"
            filterable
            remote
            reserve-keyword
            :remote-method="remoteMethod"
            style="width: 100%"
            :loading="loading"
            @change="handleSelect(searchText)"
            @focus="defaultMemberData()"
            placeholder="请输入会员名或手机号"
          >
            <el-option v-for="(item, i) in dataMemberList" :key="i" :value="item">
              <span class="pull-left">{{ item.NAME }}</span>
              <span class="pull-right font-13" style="color: #8492a6">{{ item.MOBILENO }}</span>
            </el-option>
          </el-select>
          <div
            class="vip_sock border overflow-hidden"
            style="border-radius: 8px; color: #666; background: #f5f57fa; height: 110px"
          >
            <div class="viptop overflow-hidden">
              <div class="viptop_l pull-left">
                <img
                  :src="vipnews.IMAGEURL"
                  onerror="this.src='static/images/admin.png'"
                  style="width: 40px; height: 40px; margin-right: 5px; border-radius: 50%"
                  class="pull-left"
                />
                <div class="viptop_lc pull-left" v-if="isVip">
                  <p>{{ vipnews.NAME }}</p>
                  <p style="font-size: 12px">
                    <span>{{ vipnews.MOBILENO }}</span>
                    &nbsp;&nbsp;&nbsp;
                    <span v-if="vipnews.NAME != '散客'">折扣 {{ vipnews.DISCOUNT * 100 }} %</span>
                  </p>
                </div>
                <div class="viptop_lc pull-left" style="line-height: 40px" v-else>
                  <p>{{ vipnews.NAME }}</p>
                </div>
              </div>

              <div class="viptop_r pull-right" v-if="isVip">
                <i class="el-icon-tickets m-right-sm pointer" @click="handleEdit()"></i>
                <i class="el-icon-delete pointer" @click="resetVipInfo"></i>
              </div>
            </div>

            <div class="vip_content" v-if="vipnews.NAME != '散客'">
              <ul>
                <li>
                  <p style="font-size: 12px">积分</p>
                  <p style="color: #f9484c">{{ vipnews.INTEGRAL }}</p>
                </li>
                <li>
                  <p style="font-size: 12px">余额</p>
                  <p style="color: #f9484c">{{ vipnews.MONEY }}</p>
                </li>
                <li>
                  <p style="font-size: 12px">生日</p>
                  <p style="color: #f9484c">
                    {{ new Date(vipnews.BIRTHDATE == "undefined" ? 0 : vipnews.BIRTHDATE) | time }}
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
        <el-col :span="8" style="padding: 16px 16px; border-right: 1px solid #e4e4e4">
          <el-form
            :inline="false"
            class="inputColor"
            :model="ruleForm"
            ref="ruleForm"
            label-width="60px"
          >
            <el-form-item label="商　品" style="margin-bottom: 10px">
              <el-input
                type="default"
                v-model="searchVal"
                ref="input"
                size="small"
                placeholder="输入商品名称/货号/条码"
                @keyup.enter.native="searchGoods()"
              >
                <el-button
                  type="primary"
                  slot="append"
                  class="block"
                  @click="searchGoods"
                  icon="el-icon-search"
                >
                  查询
                </el-button>
              </el-input>
            </el-form-item>
            <el-form-item label="销售员" style="margin-bottom: 10px">
              <el-select
                placeholder="请选择"
                v-model="ruleForm.empval"
                class="full-width"
                size="small"
              >
                <el-option
                  v-for="(item, i) in pagelist"
                  :key="i"
                  :label="item.NAME"
                  :value="item.ID"
                  size="small"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="备　注" class="clearfix" style="margin-bottom: 10px">
              <el-input v-model="Remark" size="small" placeholder="请输入备注说明"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8" style="padding: 16px 16px">
          <div class="cr_footer">
            <span style="display: inline-block; line-height: 40px">
              共
              <strong style="font-size: 24pt; font-family: '宋体'; color: #f9484c">
                {{ Math.abs(totalQty) }}
              </strong>
              件， 合计 :
              <strong style="font-size: 24pt; font-family: '宋体'; color: #f9484c">
                {{ totalIntegral }}
              </strong>
            </span>

            <div style="text-align: center; margin-top: 20px">
              <el-checkbox v-model="IsSms" class="pull-left" style="line-height: 40px">
                短信通知
              </el-checkbox>
              <el-button
                type="primary"
                style="width: 50%"
                @click="submitExchange"
                :loading="loading"
              >
                确认兑换
              </el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <el-dialog
      title="商品查询"
      :visible.sync="isShowList"
      width="80%"
      :close-on-click-modal="false"
      style="max-width: 100%"
      append-to-body
    >
      <shopqueryPage
        @closeModal="
          isShowList = false;
          searchVal = '';
          $refs.input.focus();
        "
        :goodsValSearch="goodsVal"
        :isIntegral="1"
        :shopViewType="1"
        @getSelectList="getSelectList"
      ></shopqueryPage>
    </el-dialog>
  </div>
</template>
<script>
import Vue from "vue";
import { mapState, mapGetters } from "vuex";
import { getDayindate } from "@/util/Printing";
import { getUserInfo, getHomeData } from "@/api/index";
import { getOpenMoneyBox } from "@/util/Printing";
import dayjs from "dayjs";
import music from "@/assets/12053.mp3";
export default {
  data() {
    return {
      IsSms: false,
      loading: false,
      pagelist: [],
      VipId: "",
      Remark: "",
      ruleForm: {
        empval: ""
      },
      isVip: false,
      isShowList: false,
      TotalPrice: 0.0,
      TotalNum: 0,
      searchText: "",
      dataMemberList: [],
      pageData: { PN: 1, Filter: "", Status: -1, LevelName: "", VipFlag: "" },
      goodsVal: "",
      searchVal: "",
      shopDataList: [],
      vipnews: {
        NAME: "散客",
        MOBILENO: "—",
        DISCOUNT: 1,
        IMAGEURL: "",
        VIPFLAG: "x",
        INTEGRAL: "0",
        MONEY: "0",
        VIPID: "",
        BIRTHDATE: "undefined"
      },
      ConstNum: 1,
      loading: false,
      pageData1: {
        PN: 1,
        Filter: "",
        Status: 1, //商品状态 -1=all  1=启用 0=停用
        TypeID: "", //商品类别ID
        IsGift: 1
      },
      rechargeListList: [],
      tableHeight: 350,
      isNeedSale: false,
      uploadShowDialog: false,
      totalQty: 0,
      totalIntegral: 0
    };
  },
  computed: {
    ...mapGetters({
      loginState: "loginState",
      empdataList: "employeeList",
      empdataListState: "employeeListState",
      getguadancdlistState: "getguadancdlistState",
      memberListState: "memberListState",
      datagList3: "goodsList3",
      datagListState3: "goodsListState3",
      saveIntegralExchangeState: "saveIntegralExchangeState"
    })
  },
  watch: {
    saveIntegralExchangeState(data) {
      this.loading = false;
      if (data.success) {
        this.$message.success("兑换成功 !");
        this.isClear();
      } else {
        this.$message.error(data.message);
      }
    },
    datagListState3(data) {
      if (data.success) {
        if (this.uploadShowDialog == false) {
          return;
        }
        let param = this.shopDataList,
          info = [...this.datagList3];
        if (info.length == 0) {
          this.$message.error(this.searchVal + ", 查无此商品 ！");
          this.searchVal = "";
        } else if (info.length == 1) {
          let info1 = {
            GoodsId: info[0].ID,
            goodsname: info[0].NAME,
            Qty: 1,
            GIFTINTEGRAL: info[0].GIFTINTEGRAL,
            ColorId: info[0].COLORID,
            SizeId: info[0].SIZEID,
            ColorName: info[0].COLORNAME,
            SizeName: info[0].SIZENAME,
            notEdit: false,
            goodsCode: info[0].CODE
          };

          if (this.shopDataList.length == 0) {
            this.shopDataList.push(info1);
            this.searchVal = "";
          } else {
            let arr2 = this.shopDataList.concat(info1),
              newArr = [];
            arr2.forEach((el) => {
              const res = newArr.findIndex((ol) => {
                return (
                  el.ColorId == ol.ColorId &&
                  el.SizeId == ol.SizeId &&
                  el.goodsname == ol.goodsname &&
                  el.GoodsId == ol.GoodsId
                );
              });
              if (res !== -1) {
                newArr[res].Qty = Number(newArr[res].Qty) + Number(el.Qty);
              } else {
                newArr.push(el);
              }
            });
            this.shopDataList = newArr;
            this.searchVal = "";
          }
        } else if (info.length > 1) {
          this.isShowList = true;
          this.goodsVal = this.searchVal;
        }
      } else {
        this.$message.error(data.message);
      }
    },
    memberListState(data) {
      this.loading = false;
      if (data.success) {
        //   this.dataMemberList = [...data.data.List]
        this.dataMemberList = [...data.data.PageData.DataArr];
      } else {
        this.$message.error(data.message);
      }
    },
    empdataListState(data) {
      if (data.success) {
        this.pagelist = [...this.empdataList];
      }
    }
  },
  methods: {
    submitExchange() {
      if (this.shopDataList.length == 0) {
        this.$message.warning("请先添加要结账的商品 !");
        return;
      }

      let empval = this.ruleForm.empval ? this.ruleForm.empval : "";
      if (this.isNeedSale == true && empval == "") {
        this.$message.warning("请选择销售员 !");
        return;
      }

      if (this.vipnews.NAME == "散客") {
        this.$message.warning("请选择会员 !");
        return;
      }

      if (this.vipnews.INTEGRAL == 0) {
        this.$message.warning("当前会员无可用积分  !");
        return;
      }

      let shopDataList = this.shopDataList,
        GoodsDetail = [];
      for (var i in shopDataList) {
        GoodsDetail.push({
          GoodsId: shopDataList[i].GoodsId,
          ColorId: shopDataList[i].ColorId,
          SizeId: shopDataList[i].SizeId,
          Qty: shopDataList[i].Qty,
          Price: shopDataList[i].GIFTINTEGRAL,
          PayIntegral: shopDataList[i].GIFTINTEGRAL * shopDataList[i].Qty
        });
      }

      if (this.vipnews.INTEGRAL >= this.totalIntegral) {
        let sendData = {
          SaleEmpId: this.ruleForm.empval ? this.ruleForm.empval : "",
          VipId: this.VipId == undefined ? "" : this.VipId,
          IsSms: this.IsSms == true ? 1 : 0,
          PayIntegral: this.totalIntegral,
          Remark: this.Remark == undefined ? "" : this.Remark,
          GoodsDetail: GoodsDetail
        };

        this.$store.dispatch("saveIntegralExchange", sendData).then(() => {
          this.loading = true;
        });
      } else {
        this.$message.warning("该会员积分不足于兑换全部商品 !");
      }
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        if (index > 0 && index < 6) {
          sums[index] = "";
          return;
        }
        if (index == 6) {
          let totalNum = 0;
          for (var i in this.shopDataList) {
            totalNum += Number(this.shopDataList[i].Qty);
          }
          sums[index] = totalNum;
          this.totalQty = totalNum;
          return;
        }

        if (index == 7) {
          let totalIntegral = 0;
          for (var i in this.shopDataList) {
            totalIntegral += this.shopDataList[i].Qty * this.shopDataList[i].GIFTINTEGRAL;
          }
          sums[index] = totalIntegral;
          this.totalIntegral = totalIntegral;
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
    handleEdit() {
      if (this.isPurViewFun(91040107) == false) {
        this.$message.warning("没有此功能权限，请联系管理员授权");
        return;
      }
      this.$store.dispatch("getMemberItem", { ID: this.VipId }).then(() => {
        this.$store.dispatch("getMemberItem2", { ID: this.VipId });
      });
    },
    handleCurRow(row) {
      this.ConstNum = row.Qty;
      let param = this.shopDataList,
        newParam = [];
      for (var i in param) {
        if (
          param[i].goodsname == row.goodsname &&
          param[i].ColorName == row.ColorName &&
          param[i].SizeName == row.SizeName
        ) {
          param[i].notEdit = true;
        } else {
          param[i].notEdit = false;
        }
        newParam.push(param[i]);
      }
      this.shopDataList = newParam;
    },
    isClear() {
      this.shopDataList = [];
      this.totalIntegral = 0;
      this.totalQty = 0;
      this.vipnews = {
        NAME: "散客",
        MOBILENO: "——",
        DISCOUNT: "1",
        IMAGEURL: "",
        VIPFLAG: "x",
        INTEGRAL: "0",
        MONEY: "0",
        VIPID: "",
        BIRTHDATE: "undefined"
      };
      this.VipId = "";
      this.ruleForm.empval = "";
      this.Remark = "";
      this.$refs.input.focus();
    },
    resetVipInfo() {
      this.vipnews = {
        NAME: "散客",
        MOBILENO: "——",
        DISCOUNT: "1",
        IMAGEURL: "",
        VIPFLAG: "x",
        INTEGRAL: "0",
        MONEY: "0",
        VIPID: "",
        BIRTHDATE: "undefined"
      };
      this.isVip = false;
      this.VipId = "";
    },
    searchGoods() {
      if (this.searchVal == "") {
        this.isShowList = true;
      } else {
        this.pageData1.Filter = this.searchVal;
        this.pageData1.IsGift = 1;
        this.$store.dispatch("getGoodsList3", this.pageData1).then(() => {
          this.uploadShowDialog = true;
        });
      }
    },
    sureEditQty(row, target) {
      if (!/^\d+$/.test(target.value)) {
        row.Qty = this.ConstNum;
        this.$message.warning("请输入整数");
        return;
      }
    },
    remoteMethod(query) {
      this.pageData.Filter = query;
      this.pageData.ShopId = query != "" ? "" : getHomeData().shop.ID;
      this.$store.dispatch("getMemberList", this.pageData);
    },

    handleSelect(item) {
      let ip = JSON.parse(sessionStorage.getItem("serverIP"));
      this.searchText = "";
      this.VipId = item.ID;
      this.isVip = true;
      if (Object.keys(item).length > 0) {
        for (let key in this.vipnews) {
          let UCkey = key.toUpperCase();
          this.vipnews[key] = item[UCkey];
        }
        if (item.IMAGEURL == undefined || item.IMAGEURL == "") {
          let VIPIMAGESIMG = ip + "/resources/vipimages/";
          this.vipnews.IMAGEURL = VIPIMAGESIMG + item.ID + ".png";
        } else {
          this.vipnews.IMAGEURL = item.IMAGEURL;
        }
        this.defaultMemberData();
      }
    },
    defaultMemberData() {
      let sendData = {
        PN: 1,
        Filter: "",
        Status: -1,
        LevelName: "",
        VipFlag: "",
        ShopId: getHomeData().shop.ID
      };
      this.$store.dispatch("getMemberList", sendData).then(() => {
        this.loading = true;
      });
    },

    getSelectList(data) {
      let param = data,
        newArr = [];
      for (let i = 0; i < param.length; i++) {
        newArr.push({
          GoodsId: param[i].ID,
          goodsname: param[i].NAME,
          Qty: 1,
          GIFTINTEGRAL: param[i].GIFTINTEGRAL,
          ColorId: param[i].COLORID ? param[i].COLORID : "",
          SizeId: param[i].SIZEID ? param[i].SIZEID : "",
          ColorName: param[i].COLORNAME,
          SizeName: param[i].SIZENAME,
          notEdit: false,
          goodsCode: param[i].CODE
        });
      }

      if (this.shopDataList.length == 0) {
        this.shopDataList = newArr;
      } else {
        let arr2 = this.shopDataList.concat(newArr),
          newArr1 = [];
        arr2.forEach((el) => {
          const res = newArr1.findIndex((ol) => {
            return (
              el.ColorId == ol.ColorId &&
              el.SizeId == ol.SizeId &&
              el.goodsname == ol.goodsname &&
              el.GoodsId == ol.GoodsId
            );
          });
          if (res !== -1) {
            newArr1[res].Qty = Number(newArr1[res].Qty) + Number(el.Qty);
          } else {
            newArr1.push(el);
          }
        });
        this.shopDataList = newArr1;
      }
      this.$refs.input.focus();
    },
    handleDel(idx, row) {
      this.shopDataList.splice(idx, 1);
    }
  },
  components: {
    shopqueryPage: () => import("@/components/checkout/shopquery")
  },
  mounted() {
    this.isNeedSale = getUserInfo().CompanyConfig.ISNEEDSALER;

    this.$nextTick(() => {
      this.$refs.input.focus();
    });
    this.$store.dispatch("getEmployeeList", {}).then(() => {});
  }
};
</script>
<style lang="scss" scoped >
// .c_footer{ border-top: 1px solid #ddd }
.c_footer .el-autocomplete {
  width: 100%;
}
.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;
    border: 1px solid #f00;
    background: #ccc;
    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}
.t-botton-timescountc {
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: #fff;
}

.vip_sock {
  color: #fff;
  padding: 12px;
  margin-top: 10px;
}

.vip_sock .vip_content {
  margin-top: 10px;
}

.vip_sock .viptop,
.vip_sock .vip_content {
  overflow: hidden;
}

.vip_content ul li {
  float: left;
  width: 33.33%;
  text-align: center;
  border-right: 1px solid #ddd;
}
.vip_content ul li:last-child {
  border-right: none;
}

.vip_sock p {
  margin: 0 0 5px 0;
}
</style>
