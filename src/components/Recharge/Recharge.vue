<template>
  <div class="Recharge">
    <el-container>
      <el-container style="height: 400px">
        <el-aside
          width="40%"
          style="position: relative; background: none; text-align: left; line-height: normal"
        >
          <div class="Rechargeleft">
            <ul>
              <li>
                <span>本单合计</span>
                <span class="pull-right com_fontsize">{{ totalprice }}</span>
              </li>
              <li v-if="rechargestatus == 4 ? false : true">
                <span>优惠</span>
                <el-input
                  v-model="discountMoney"
                  class="pull-right com_fontsize"
                  @keyup.native="handleInput2"
                  placeholder="0.00"
                ></el-input>
              </li>
              <li>
                <span class="com_color">{{ payName }}</span>
                <el-input
                  v-model="payprice"
                  class="pull-right paytypeMoney com_fontsize"
                  :disabled="disabled"
                  @keyup.native="handleInput3"
                  style="width: 187px"
                ></el-input>
              </li>
              <li style="border-bottom: none; line-height: 30px">
                <span class="pull-left" style="color: #ff5722" v-if="couponcode != ''">
                  <i style="width: 60px; float: left">优惠券</i>
                  <i class="discountpon">￥{{ couponcodemoney }}</i>
                  <i class="el-icon-circle-close p-left-xs" @click="delcoupon"></i>
                </span>
                <span class="pull-right" v-if="!disabled">
                  找零
                  <i class="Givechange">{{ pocketmoney }}</i>
                </span>
              </li>
              <li style="border-bottom: none; line-height: 30px">
                <span
                  class="pull-left"
                  style="color: #ff5722"
                  v-if="vipID != '' && integralToGoods != 0"
                >
                  <i style="width: 60px; float: left">积分抵现</i>
                  <i class="discountpon">￥{{ integralToGoods }}</i>
                  <i class="el-icon-circle-close p-left-xs" @click="delIntegral"></i>
                </span>
              </li>
            </ul>
          </div>

          <div class="Rechargeright_f" ref="okSubmit">
            <el-checkbox v-model="checkedreceipt">打印小票</el-checkbox>
            <el-checkbox v-model="IsSms" class="pull-right">短信通知</el-checkbox>
          </div>
        </el-aside>
        <el-main>
          <div class="Rechargeright">
            <p>
              <span>选择支付方式</span>
              <el-checkbox
                size="small"
                class="pull-right"
                v-model="isCombined"
                @change="choseIsMorePayWay"
              >
                {{ isCombined == true ? "取消组合支付" : "组合支付" }}
              </el-checkbox>
            </p>
            <div
              class="showpayList overflowscroll"
              style="min-height: 200px; max-height: 235px"
              v-if="!isCombined"
            >
              <ul>
                <li
                  class="list-group-item"
                  v-for="(item, index) in rechargeListList"
                  :key="index"
                  @click="toggletab(index, item)"
                >
                  <div class="paylistsock">
                    <img :src="item.payerIMG" alt="" style="width: 35px; height: 35px" />
                    <p>{{ item.NAME }}</p>
                    <i
                      v-if="curtab == index"
                      :class="{ isselectPay: curtab == index }"
                      class="el-icon-circle-check"
                    ></i>
                  </div>
                </li>
              </ul>
            </div>

            <div
              class="showpayList overflowscroll"
              style="min-height: 200px; max-height: 235px"
              v-else
            >
              <el-row>
                <el-col
                  :span="12"
                  v-for="(item, index) in rechargeListList"
                  :key="index"
                  style="margin-top: 10px"
                >
                  <span style="width: 70px; line-height: 30px; float: left">{{ item.NAME }}</span>
                  <el-input
                    v-model="item.money"
                    v-on:focus="focusCur(item, index)"
                    v-on:input="clickCurInput(item, index)"
                    type="number"
                    size="small"
                    style="width: 100px"
                    placeholder="0.00"
                  ></el-input>
                </el-col>
              </el-row>
            </div>

            <div style="margin-top: 10px; padding-top: 10px; border-top: 1px dashed #ddd">
              <span>优惠方式</span>
              <div class="p-top-sm">
                <el-button plain type="primary" size="small" @click="clickCouponNo">
                  优惠券
                </el-button>
                <el-button
                  plain
                  type="primary"
                  size="small"
                  v-if="vipID != ''"
                  @click="clickIntegralToMoney"
                >
                  积分抵现
                </el-button>
                <el-button plain type="primary" size="small" @click="clickDiscount">
                  整单折扣
                </el-button>
              </div>
            </div>
          </div>
        </el-main>
      </el-container>
      <el-footer style="margin: 0 -10px 0 0 !important">
        <div class="settleAccounts_footer">
          <div class="footersock pull-left full-width">
            <div class="footerleft pull-left">
              <div class="footerleftspan pull-left">
                <span>实收</span>
                <strong
                  style="font-size: 20pt; color: #f9484c; font-family: '宋体'"
                  id="netreceiptsmoney"
                >
                  <span style="font-size: 10pt">￥</span>
                  {{ receivableprice }}
                  <el-button
                    type="text"
                    @click="modifyMoney"
                    style="font-size: 18px; color: #999"
                    icon="el-icon-edit-outline"
                  ></el-button>
                </strong>
              </div>
              <div class="footerleftspan pull-left" v-if="vipID != ''">
                <span>获得积分 :</span>
                <strong id="Obtainintegral">{{ gerintegral }}</strong>
                <el-select
                  size="small"
                  style="width: 150px"
                  v-model="value"
                  placeholder="请选择积分"
                  @change="selectGetintegral"
                >
                  <el-option
                    v-for="item in integraltList"
                    :key="item.ID"
                    :label="item.NAME"
                    :value="item.RATE"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <div class="footerright pull-right">
              <el-button type="info" @click="closeModal">
                取消
                <!-- <template>
                  <div style="font-size:14px; font-weight: bold">取消</div>
                  <div style="margin-top: 6px"> ( ESC )</div>
                </template> -->
              </el-button>
              <el-button type="primary" :disabled="loading == true" @click="CashPayok">
                确认支付
                <!-- <template>
                  <div style="font-size:14px; font-weight:bold">确认支付</div>
                  <div style="margin-top: 6px"> ( Enter )</div>
                </template> -->
              </el-button>
            </div>
          </div>
          <div
            class="footersock"
            style="width: 100%; display: table; font-size: 10px"
            v-if="((totalprice - ZEROTYPE) * 1000000000) / 1000000000 != 0"
          >
            已抹零 ￥{{ parseFloat(ZEROTYPE).toFixed(2) }}
          </div>
        </div>
      </el-footer>
    </el-container>
    <!-- 扫描支付 -->
    <el-dialog title="扫码支付" :visible.sync="showbarCodePay" width="550px" append-to-body>
      <barCodePay
        :paytypeid="PaytypeId"
        :billmoney="barCodePayMoney == '' ? receivableprice : barCodePayMoney"
        @barcodePayclick="barcodePaycomback"
      ></barCodePay>
    </el-dialog>
    <!-- 优惠券 -->
    <el-dialog title="选择优惠券" :visible.sync="showCouponList" width="550px" append-to-body>
      <coupon-list
        @CouponListclick="isCouponListclick"
        :dealData="{ money: receivableprice, vipID: vipID }"
      ></coupon-list>
    </el-dialog>

    <el-dialog
      title="整单折扣"
      :visible.sync="showDiscountDialog"
      width="500px"
      :close-on-click-modal="false"
      append-to-body
      :before-close="closeDiscountDialog"
    >
      <div style="display: table">
        <div
          style="
            font-size: 16px;
            text-align: center;
            padding: 6px;
            border-bottom: 1px dashed #ddd;
            margin-bottom: 10px;
          "
        >
          <i style="float: left">合计</i>
          <i style="font-size: 18px">{{ totalprice }}</i>
        </div>

        <div v-show="editDiscount" class="discountTag">
          <el-tag
            v-for="tag in discountTypeList"
            style="margin: 5px; width: 90px"
            :key="tag.NAME"
            closable
            :type="tag.ID"
            @close="handleDelClose(tag)"
          >
            {{ tag.NAME }}
          </el-tag>
        </div>

        <el-radio
          v-show="!editDiscount"
          v-model="radio3"
          style="margin: 5px; width: 90px"
          size="small"
          border
          v-for="(item, index) in discountTypeList"
          :key="index"
          :label="item"
          @change="curRadio(item)"
        >
          {{ item.NAME }}
        </el-radio>

        <el-input
          size="small"
          v-model.trim="discountVal"
          :min="0.01"
          style="margin: 5px; width: 390px"
          placeholder="9折即 0.9 , 无折扣即 1"
          v-if="isAddDiscount == true"
        >
          <div slot="append">
            <el-button
              size="small"
              icon="el-icon-check"
              style="border-right: 1px solid #ddd"
              @click="addDiscountBtn"
            >
              确认
            </el-button>
            <el-button size="small" icon="el-icon-close" @click="isAddDiscount = false">
              取消
            </el-button>
          </div>
        </el-input>
        <el-button
          icon="el-icon-plus"
          size="small"
          style="margin: 5px; width: 90px"
          v-if="!isAddDiscount && !editDiscount"
          @click="isAddDiscount = true"
        >
          自定义
        </el-button>
        <el-button
          icon="el-icon-edit"
          size="small"
          type="primary"
          :style="`margin: 5px; width:90px; float:${editDiscount ? 'right' : ''}`"
          v-if="isAddDiscount != true"
          @click="editDiscount = !editDiscount"
        >
          {{ editDiscount ? "完成" : "编辑" }}
        </el-button>

        <div
          v-if="!editDiscount && hasRate"
          style="
            margin-top: 10px;
            width: 100%;
            display: table;
            color: #ff5722;
            padding: 10px 0;
            font-size: 16px;
            text-align: center;
            border-top: 1px dashed #ddd;
          "
        >
          <i class="pull-left">应收</i>
          <i style="font-size: 20px">￥{{ discountAfterMoney }}</i>
        </div>

        <div style="text-align: center; margin-top: 20px">
          <el-button size="small" @click="closeDiscountDialog">取 消</el-button>
          <el-button size="small" type="primary" @click="submitUseDiscount">确 定</el-button>
        </div>
      </div>
    </el-dialog>

    <el-dialog
      title="积分抵现"
      :visible.sync="showIntegralDialog"
      :close-on-click-modal="false"
      width="400px"
      append-to-body
    >
      <el-form label-width="80px">
        <el-form-item label="可用积分">
          <el-input
            size="small"
            placeholder="可用积分"
            v-model="vipItem.INTEGRAL"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="使用积分">
          <input
            size="small"
            type="number"
            class="useIntegral"
            placeholder="输入本次使用积分"
            v-model.trim="formData.canUseIntegral"
            @input="inpIntegral()"
          />
        </el-form-item>
        <el-form-item label="抵扣现金">
          <el-input
            size="small"
            class="useIntegral1"
            style="color: #f00"
            disabled
            placeholder="可抵扣现金"
            v-model="formData.deductMoney"
          >
            <i slot="prefix" style="color: #f00">￥</i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="showIntegralDialog = false">取消</el-button>
          <el-button type="primary" @click="submitUseIntegral">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import barCodePay from "@/components/Recharge/barCodePay";
import CouponList from "@/components/Recharge/CouponList";
import { nscreenexCodeFun } from "@/util/objectivity";
import { getUserInfo, getHomeData } from "@/api/index";
import Vue from "vue";
export default {
  name: "Recharge",
  data() {
    return {
      discountVal: "",
      hasRate: false,
      disTransitions: false,
      isAddDiscount: false,
      editDiscount: false,
      radio3: {},
      loading: false,
      discountAfterMoney: "",
      discountMoney: "",
      paytypeMoney: "0.00",
      isCombined: false,
      checkedreceipt: localStorage.getItem("SavesetupPrint") == "true" ? true : false,
      IsSms: false,
      integraloptions: [],
      value: "",
      payName: "",
      disabled: true,
      curtab: 0,
      receivableprice: "",
      payprice: "",
      pocketmoney: 0.0,
      gerintegral: this.totalprice,
      PaytypeId: "",
      showbarCodePay: false,
      showCouponList: false,
      showDiscountDialog: false,
      barcodepaystatus: "",
      couponcodemoney: 0,
      couponcode: "",
      rechargeJiFen: {},
      rechargeListList: [],
      reduceZero: "",
      ZEROTYPE: 0,
      rechargeListChose: [],
      curInputVal: "",
      barCodePayMoney: "",
      arrLength: 0,
      curIdx: "",
      newVal: "",
      oldIdx: "",
      discountTypeList: [],
      CompanyConfig: {},
      showIntegralDialog: false,
      needIntegral: "",
      formData: {
        canUseIntegral: 0,
        deductMoney: ""
      },
      integralToGoods: 0
    };
  },
  computed: {
    ...mapGetters({
      integraltList: "integraltList",
      barcodepayopenState: "barcodepayopenState",
      gparameterstate: "gparameterstate",
      rechargeListState: "rechargeListState",
      discountTypeListState: "discountTypeListState",
      saveDiscountTypeState: "saveDiscountTypeState",
      delDiscountTypeState: "delDiscountTypeState"
    }),
    ...mapState({
      vipID: (state) => state.commodityc.payMoneyVipID
    })
  },
  props: ["totalprice", "rechargestatus", "rechargeListList1", "vipItem"],
  watch: {
    rechargeListList1(data) {
      let param = [];
      for (var i in data) {
        data[i].money = "";
        param.push(data[i]);
      }
      this.rechargeListList = param;
      this.rechargeListChose = param;

      this.payName = data[0].NAME;
      this.PaytypeId = data[0].ID;
    },
    gparameterstate(data) {
      let CompanyConfig = data.data.CompanyConfig;
      this.CompanyConfig = CompanyConfig;
      this.rechargeJiFen = {
        INTEGRALTYPEID: CompanyConfig.INTEGRALTYPEID,
        INTEGRALTYPENAME: CompanyConfig.INTEGRALTYPENAME,
        INTEGRALTYPERATE: CompanyConfig.INTEGRALTYPERATE,
        ZEROTYPE: CompanyConfig.ZEROTYPE
      };
      this.value = CompanyConfig.INTEGRALTYPERATE;
      this.gerintegral = Math.ceil(CompanyConfig.INTEGRALTYPERATE * this.totalprice);

      this.gparameterstateFun(this.totalprice);
    },
    totalprice(data) {
      let defaultIntegralRate = getUserInfo().CompanyConfig.INTEGRALTYPERATE;
      let ZEROTYPE = this.rechargeJiFen.ZEROTYPE;
      if (ZEROTYPE == 0) {
        this.receivableprice = data;
        this.payprice = data;
        this.ZEROTYPE = data;
      } else if (ZEROTYPE == 1) {
        this.receivableprice = parseInt(data);
        this.payprice = parseInt(data);
        this.ZEROTYPE = parseInt(data);
      } else if (ZEROTYPE == 2) {
        this.receivableprice = parseInt(data * 10) / 10;
        this.payprice = parseInt(data * 10) / 10;
        this.ZEROTYPE = parseInt(data * 10) / 10;
      } else if (ZEROTYPE == 3) {
        this.receivableprice = parseInt(Math.round(data));
        this.payprice = parseInt(Math.round(data));
        this.ZEROTYPE = parseInt(Math.round(data));
      } else if (ZEROTYPE == 4) {
        this.receivableprice = parseFloat(data).toFixed(1);
        this.payprice = parseFloat(data).toFixed(1);
        this.ZEROTYPE = parseFloat(data).toFixed(1);
      }

      this.gerintegral = Math.ceil(data * defaultIntegralRate);

      this.discountMoney = 0;
    },
    barcodepayopenState(data) {
      if (data.success) {
        let IsCheck = data.data.IsCheck;
        if (IsCheck) {
          this.showbarCodePay = true;
        } else {
          this.$message("请联系客服开通扫码支付");
          return;
        }
      }
    },
    discountTypeListState(data) {
      if (data.success) {
        this.discountTypeList = data.data.List;
      }
    },
    saveDiscountTypeState(data) {
      this.isAddDiscount = false;
      if (data.success) {
        this.$store.dispatch("getDiscountTypeList", {});
      } else {
        this.$message.warning(data.message);
      }
    },
    delDiscountTypeState(data) {
      if (data.success) {
        this.$store.dispatch("getDiscountTypeList", {});
      }
    }
  },
  methods: {
    submitUseIntegral() {
      this.integralToGoods = this.formData.deductMoney;

      if (this.formData.deductMoney != "") {
        let totlePrice = (
          this.totalprice -
          this.discountMoney -
          this.couponcodemoney -
          this.integralToGoods
        ).toFixed(2);
        this.gparameterstateFun(totlePrice);

        this.gerintegral =
          this.value == 0 ? 0 : Math.ceil(this.CompanyConfig.INTEGRALTYPERATE * totlePrice);
        nscreenexCodeFun(4, String(this.receivableprice));
      }

      this.showIntegralDialog = false;
    },
    modifyMoney() {
      this.$prompt("", "修改实收金额", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPlaceholder: "请输入金额",
        inputPattern: /[!^0-9.]/,
        inputErrorMessage: "只能为数字"
      })
        .then(({ value }) => {
          this.gparameterstateFun(value);
          // this.receivableprice = value

          this.discountMoney = (
            this.totalprice -
            this.receivableprice -
            this.couponcodemoney -
            this.integralToGoods
          ).toFixed(2);
          this.gerintegral =
            value == 0 ? 0 : Math.ceil(this.CompanyConfig.INTEGRALTYPERATE * value);
          nscreenexCodeFun(4, String(this.receivableprice));
        })
        .catch(() => {});
    },
    inpIntegral() {
      let canUseIntegral = String(this.formData.canUseIntegral.split(".")[0]); // 只能为整数
      let deductMoney = "";

      if (canUseIntegral > this.vipItem.INTEGRAL) {
        let maxIntegral =
          Number(this.needIntegral) > Number(this.vipItem.INTEGRAL)
            ? this.vipItem.INTEGRAL
            : this.needIntegral;
        canUseIntegral = maxIntegral;

        let maxMoney =
          Number(this.needIntegral) > Number(this.vipItem.INTEGRAL)
            ? canUseIntegral / this.CompanyConfig.INTEGRALRATE
            : this.receivableprice;
        deductMoney = maxMoney;
        this.$message.warning("最多使用" + maxIntegral + " 积分抵现 " + maxMoney + " 元 ！");
      } else if (Number(canUseIntegral) > Number(this.needIntegral)) {
        canUseIntegral = this.needIntegral;
        this.$message.warning(
          "最多使用" +
            this.needIntegral +
            " 积分抵现 " +
            canUseIntegral / this.CompanyConfig.INTEGRALRATE +
            " 元 ！"
        );
        deductMoney = this.needIntegral / this.CompanyConfig.INTEGRALRATE;
      } else if (
        Number(this.vipItem.INTEGRAL) < Number(this.needIntegral) &&
        Number(canUseIntegral) > this.vipItem.INTEGRAL
      ) {
        canUseIntegral = this.vipItem.INTEGRAL;
        deductMoney = this.vipItem.INTEGRAL / this.CompanyConfig.INTEGRALRATE;
      } else {
        canUseIntegral = canUseIntegral;
        deductMoney = canUseIntegral / this.CompanyConfig.INTEGRALRATE;
      }

      this.formData.canUseIntegral = canUseIntegral;
      this.formData.deductMoney = deductMoney;
    },
    gparameterstateFun(price) {
      let CompanyConfig = this.CompanyConfig;
      if (CompanyConfig.ZEROTYPE == 0) {
        this.receivableprice = price;
        this.payprice = price;
        this.ZEROTYPE = 0;
      } else if (CompanyConfig.ZEROTYPE == 1) {
        this.receivableprice = parseInt(price);
        this.payprice = parseInt(price);
        this.ZEROTYPE = price - parseInt(price);
      } else if (CompanyConfig.ZEROTYPE == 2) {
        this.receivableprice = parseInt(price * 10) / 10;
        this.payprice = parseInt(price * 10) / 10;
        this.ZEROTYPE = price - parseInt(price * 10) / 10;
      } else if (CompanyConfig.ZEROTYPE == 3) {
        this.receivableprice = parseInt(Math.round(price));
        this.payprice = parseInt(Math.round(price));
        this.ZEROTYPE = price - parseInt(Math.round(price));
      } else if (CompanyConfig.ZEROTYPE == 4) {
        this.receivableprice = parseFloat(price).toFixed(1);
        this.payprice = parseFloat(price).toFixed(1);
        this.ZEROTYPE = price - parseFloat(price).toFixed(1);
      }
    },
    submitUseDiscount() {
      this.discountMoney = (this.totalprice - this.discountAfterMoney).toFixed(2);

      let totlePrice = (
        this.totalprice -
        this.discountMoney -
        this.couponcodemoney -
        this.integralToGoods
      ).toFixed(2);
      this.gparameterstateFun(totlePrice);

      this.showDiscountDialog = false;
    },
    closeDiscountDialog() {
      this.hasRate = false;
      this.radio3 = {};
      this.discountAfterMoney = this.totalprice;
      this.showDiscountDialog = false;
    },
    curRadio(item) {
      this.hasRate = true;
      this.discountAfterMoney = (item.RATE * this.totalprice).toFixed(2);
    },
    choseIsMorePayWay() {
      if (this.isCombined == false) {
        let param = this.rechargeListList,
          newParam = [];
        for (var i in param) {
          param[i].money = "";
          newParam.push(param[i]);
        }
        this.rechargeListList = newParam;
        this.curInputVal = "";
        this.curIdx = "";
        this.arrLength = 0;
        this.newVal = "";
        this.oldIdx = "";
      }
    },
    focusCur(item, index) {
      let param = this.rechargeListList,
        newParam1 = [],
        newParam2 = [];
      // console.log(param)
      let newParam = param.filter((item) => item.money != "");
      this.arrLength = newParam.length;

      if (this.arrLength == 1) {
        if (item.money == "") {
          this.newVal = (this.receivableprice - this.curInputVal).toFixed(2);
          this.curIdx = index;
          this.rechargeListList[index].money = (this.receivableprice - this.curInputVal).toFixed(2);
          this.$forceUpdate();
          this.arrLength = 2;
        }
      } else if (this.arrLength == 2) {
        // console.log(param)
        for (var i in param) {
          if (i == index && param[i].money == "" && i != this.curIdx) {
            this.oldIdx = this.curIdx;
            param[i].money = this.newVal;
            this.curIdx = i;
            newParam1.push(param[i]);
          } else if (i != index && param[i].money != "" && i == this.curIdx) {
            newParam1.push(param[i]);
          } else if (i != index && param[i].money != "" && i != this.curIdx) {
            newParam1.push(param[i]);
          } else if (i == index && param[i].money != "" && i != this.curIdx) {
            newParam1.push(param[i]);
          } else if (i == index && param[i].money != "" && i == this.curIdx) {
            param[i].money = "";
            newParam1.push(param[i]);
          } else if (i == index && param[i].money == "" && i == this.curIdx) {
            param[i].money = this.newVal;
            newParam1.push(param[i]);
          } else if (i != index && param[i].money == "" && i != this.curIdx) {
            param[i].money = "";
            newParam1.push(param[i]);
          } else {
            param[i].money = "";
            newParam1.push(param[i]);
          }
        }

        let param1 = [],
          param2 = [];
        for (var m in newParam1) {
          if (newParam1[m].money != "") {
            param1.push(newParam1[m]);
          }
        }

        this.arrLength = param1.length;
        console.log(this.arrLength, newParam1);

        if (this.arrLength == 3) {
          for (var i in newParam1) {
            if (i == this.oldIdx) {
              newParam1[i].money = "";
              param2.push(newParam1[i]);
            } else {
              param2.push(newParam1[i]);
            }
          }

          this.rechargeListList = param2;
        } else {
          console.log("1111", newParam1);
          this.rechargeListList = newParam1;
        }

        this.$forceUpdate();
      }
    },
    clickCurInput(item, index) {
      if (item.money > this.receivableprice) {
        this.rechargeListList[index].money = Number(this.receivableprice);
        this.$forceUpdate();
      }
      this.curInputVal = item.money;

      let param = this.rechargeListList,
        newParam = [],
        newParam1 = [],
        newParam2 = [];
      for (var _i in param) {
        if (param[_i].money != "") {
          newParam1.push(param[_i]);
        }
      }

      if (newParam1.length == 2) {
        for (var i in param) {
          if (index != i && param[i].money != "") {
            param[i].money = (Number(this.receivableprice) - Number(item.money)).toFixed(2);
            newParam.push(param[i]);
          } else if (index == i && param[i].money == "") {
            param[i].money = Number(item.money);
            newParam.push(param[i]);
          } else if (index == i && param[i].money != "") {
            newParam.push(param[i]);
          } else {
            param[i].money = "";
            newParam.push(param[i]);
          }
        }
        this.rechargeListList = newParam;
      } else if (newParam1.length == 1) {
        let haveMoney = 0;
        for (var j in param) {
          if (param[j].money != "") {
            haveMoney = param[j].money;
          }
        }

        for (var i in param) {
          if (param[i].money == "" && index == i) {
            param[i].money = (Number(this.receivableprice) - Number(haveMoney)).toFixed(2);
            newParam2.push(param[i]);
          } else if (param[i].money != "" && param[i].money != 0 && index != i) {
            param[i].money = Number(haveMoney);
            newParam2.push(param[i]);
          } else {
            newParam2.push(param[i]);
          }
        }

        console.log(newParam2);

        let newParam3 = [];
        for (var n in newParam2) {
          if (newParam2[n].money == "" || newParam2[n].money == 0) {
            newParam2[n].money = "";
            newParam3.push(newParam2[n]);
          } else {
            newParam3.push(newParam2[n]);
          }
        }
        // console.log(newParam3)
        this.rechargeListList = newParam3;
      }
    },
    closeModal(type) {
      nscreenexCodeFun(6);
      type == "resetList" ? this.$emit("resetList") : this.$emit("closeModalrecharge");
      this.isCombined = false;
      this.integralToGoods = 0;
    },
    toggletab(index, item) {
      this.curtab = index;
      this.PaytypeId = item.ID;
      this.payName = item.NAME;

      if (item.NAME == "现金") {
        this.disabled = false;
      } else {
        this.payprice = this.receivableprice;
        this.disabled = true;
        this.pocketmoney = "0.00";
      }
    },
    clickCouponNo() {
      this.showCouponList = true;
      if (this.vipID != "") {
        this.$store.dispatch("getcouponlistState", { openID: this.vipID, PN: 1 });
      }
    },
    clickDiscount() {
      this.showDiscountDialog = true;
    },
    addDiscountBtn() {
      let haveSameDiscount = this.discountTypeList.filter((item) => item.RATE === this.discountVal);
      if (haveSameDiscount.length != 0) {
        this.$message.warning("该折扣已存在！不可重复");
        return;
      }

      if (this.discountVal == "") {
        this.$message.warning("数据不能为空");
        return;
      }

      let sendData = {
        Name: (this.discountVal * 10).toFixed(1) + "折",
        Rate: this.discountVal
      };
      this.$store.dispatch("saveDiscountType", sendData);
    },
    handleDelClose(item) {
      this.$confirm("确认删除 【" + item.NAME + "】?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch("delDiscountType", { ID: item.ID });
        })
        .catch(() => {});
    },
    clickIntegralToMoney() {
      if (!this.CompanyConfig.ISPAYINTEGRAL) {
        this.$message.warning("积分抵现功能未开启 ！");
      } else {
        if (this.vipItem.INTEGRAL == 0) {
          this.$message.warning("该会员无可用积分 ！");
        } else {
          this.showIntegralDialog = true;

          this.needIntegral = this.receivableprice * this.CompanyConfig.INTEGRALRATE;
          console.log(this.needIntegral);
          if (this.vipItem.INTEGRAL > this.needIntegral) {
            this.formData.canUseIntegral = this.needIntegral;
            this.formData.deductMoney = this.receivableprice;
          } else {
            this.formData.canUseIntegral = this.vipItem.INTEGRAL;
            this.formData.deductMoney = this.vipItem.INTEGRAL / this.CompanyConfig.INTEGRALRATE;
          }
        }
      }
    },
    isCouponListclick(data) {
      if (JSON.stringify(data) != "{}") {
        this.couponcodemoney = data.couponcodemoney;
        this.couponcode = data.couponcode;
        let totlePrice = (
          this.totalprice -
          this.discountMoney -
          this.couponcodemoney -
          this.integralToGoods
        ).toFixed(2);
        this.gparameterstateFun(totlePrice);

        this.gerintegral =
          this.value == 0 ? 0 : Math.ceil(this.CompanyConfig.INTEGRALTYPERATE * totlePrice);
      }
      this.showCouponList = false;
      nscreenexCodeFun(4, String(this.receivableprice));
    },
    delcoupon() {
      this.couponcode = "";
      this.couponcodemoney = 0;
      let totlePrice = (
        this.totalprice -
        this.discountMoney -
        this.couponcodemoney -
        this.integralToGoods
      ).toFixed(2);
      this.gparameterstateFun(totlePrice);
      this.gerintegral =
        this.value == 0 ? 0 : Math.ceil(this.CompanyConfig.INTEGRALTYPERATE * totlePrice);
      nscreenexCodeFun(4, String(this.receivableprice));
    },
    delIntegral() {
      this.integralToGoods = 0;
      let totlePrice = (
        this.totalprice -
        this.discountMoney -
        this.couponcodemoney -
        this.integralToGoods
      ).toFixed(2);
      this.gparameterstateFun(totlePrice);
      this.gerintegral =
        this.value == 0 ? 0 : Math.ceil(this.CompanyConfig.INTEGRALTYPERATE * totlePrice);
      nscreenexCodeFun(4, String(this.receivableprice));
    },
    handleInput2(e) {
      this.discountMoney = this.onlyInputnumber(this.discountMoney);
      let totlePrice = (
        this.totalprice -
        this.discountMoney -
        this.couponcodemoney -
        this.integralToGoods
      ).toFixed(2);
      this.gparameterstateFun(totlePrice);
      this.gerintegral =
        this.value == 0 ? 0 : Math.ceil(this.CompanyConfig.INTEGRALTYPERATE * totlePrice);
      nscreenexCodeFun(4, String(this.receivableprice));
    },
    handleInput3(e) {
      this.payprice = this.onlyInputnumber(this.payprice);
      // this.gparameterstateFun(this.payprice)
      this.pocketmoney = (this.payprice - this.receivableprice).toFixed(2);
    },
    selectGetintegral(value) {
      this.gerintegral = Math.ceil(this.receivableprice * value);
    },
    isShowLoading() {
      this.loading = false;
    },
    CashPayok() {
      if (this.checkedreceipt) {
        localStorage.setItem("SavesetupPrint", true);
      } else {
        localStorage.setItem("SavesetupPrint", false);
      }

      let rechargeListList = this.rechargeListList,
        newParam = [],
        isBarcodePay = false;
      if (this.isCombined) {
        console.log(rechargeListList);
        for (var i in rechargeListList) {
          if (rechargeListList[i].NAME == "扫码支付" && rechargeListList[i].money != "") {
            isBarcodePay = true;
            this.payName = "扫码支付";
            this.barCodePayMoney = rechargeListList[i].money;
          } else {
            this.payName = "";
          }

          if (rechargeListList[i].money != "") {
            newParam.push({
              PayTypeId: rechargeListList[i].ID,
              Money: rechargeListList[i].money,
              name: rechargeListList[i].NAME
            });
          }
        }
      }

      if (this.payName != "扫码支付" && this.isCombined == false) {
        this.loading = true;
      }
      if (this.payName == "扫码支付" && this.barcodepaystatus != 1) {
        //getbarcodepayopenState
        this.$store.dispatch("getbarcodepayopenState", {}).then(() => {});
        return;
      }
      nscreenexCodeFun(5);
      this.barcodepaystatus = "";
      let IsSms = this.IsSms == true ? 1 : 0;
      let comdata = {
        CouponNo: this.couponcode || "",
        PaytypeId: this.isCombined ? "" : this.PaytypeId,
        GetIntegral: this.vipID == "" ? "" : Math.ceil(this.gerintegral),
        IsSms: IsSms,
        PayIntegral: Number(this.formData.canUseIntegral),
        IntegralMoney: Number(this.formData.deductMoney),
        IsMorePayWay: this.isCombined,
        BillDate: new Date().getTime()
      };
      if (this.rechargestatus == 3) {
        let other = {
          Money: Number(this.receivableprice),
          DiscountMoney: Number(this.discountMoney)
        };
        comdata = Object.assign({}, comdata, other);
      } else if (this.rechargestatus == 4) {
        comdata = {};
        let other = {
          PayTypeId: this.PaytypeId,
          IsSms: IsSms,
          AddMoney: Number(this.receivableprice)
        };
        comdata = Object.assign({}, comdata, other);
      } else if (this.rechargestatus == 6) {
        comdata = {};
        let other = {
          PayTypeID: this.PaytypeId,
          IsSmd: IsSms,
          AddMoney: Number(this.receivableprice),
          GiftMoney: Number(this.discountMoney),
          GetIntegral: Math.ceil(this.gerintegral)
        };
        comdata = Object.assign({}, comdata, other);
      } else {
        let other = {
          FavorMoney: Number(this.discountMoney),
          PayMoney: Number(this.receivableprice),
          IsCheck: 1
        };
        comdata = Object.assign({}, comdata, other);
      }

      if (this.isCombined) {
        let hasBarcodePay = newParam.filter((item) => item.name == "扫码支付");
        if (hasBarcodePay.length != 0) {
          this.$store.dispatch("getbarcodepayopenState", {}).then(() => {});
          return;
        }
        comdata.PayTypeList = newParam;
      }

      this.$emit("CashRecharge", comdata);
      this.integralToGoods = 0;
    },
    barcodePaycomback(data) {
      this.barcodepaystatus = 1;
      this.CashPayok();
    }
  },
  components: {
    barCodePay,
    CouponList
  },
  mounted() {
    this.integralToGoods = 0;
    if (this.integraltList.length == 0) {
      this.$store.dispatch("getintegralTList", {}); // 积分列表
    }
    this.$store.dispatch("getparameterstate", {}); // 默认积分状态

    this.$store.dispatch("getDiscountTypeList", {}); //
  },
  created() {
    this.$store.dispatch("getparameterstate", {});
  }
};
</script>
<style>
.font_ff6655 {
  color: #ff6655;
}
.Recharge .el-footer {
  border-top: 6px solid rgb(224, 220, 220);
  margin: 0 -20px;
  padding: 12px;
  height: initial !important;
}

.Recharge .el-aside {
  border-right: 3px solid rgb(224, 220, 220);
}

.Recharge .Rechargeleft .el-input {
  width: inherit;
}

.Recharge .Rechargeleft .el-input__inner {
  border: none;
  text-align: right;
  padding: 0;
  font-size: 16px;
  font-weight: bold;
}

.Recharge .el-main {
  padding: 0 12px;
  border-left: 3px solid rgb(224, 220, 220);
}

.Recharge .Rechargeleft {
  padding: 0 20px;
}

.Recharge .Rechargeleft ul li {
  line-height: 45px;
  border-bottom: 1px solid #ccc;
  overflow: hidden;
}

.Recharge .Rechargeleft ul li:last-child {
  border: none;
}

.Recharge .Rechargeright {
  position: relative;
  height: 100%;
  padding-top: 10px;
}

.Recharge .showpayList ul li {
  display: inline-block;
  color: #666;
  font-size: 14px;
  text-decoration: none;
  width: 20%;
  text-align: center;
  float: left;
  cursor: pointer;
  padding: 5px 5px;
  font-size: 12px;
  position: relative;
}

.Recharge .showpayList ul li .paylistsock {
  padding: 4px;
  border: 1px solid #f1a027;
  overflow: hidden;
  background: #fffff1;
  border-radius: 5px;
}

.Recharge .showpayList ul li .paylistsock p {
  margin: 0;
}

.Rechargeright_f {
  position: absolute;
  bottom: 12px;
  overflow: hidden;
  width: 100%;
  padding: 0 30px;
}

.Recharge .settleAccounts_footer .footerleftspan {
  overflow: hidden;
  margin-right: 20px;
  height: 40px;
  line-height: 40px;
}

.Recharge .Rechargeright .isselectPay {
  position: absolute;
  color: #ff5722;
  top: 2px;
  right: 1px;
  font-size: 18px;
}

.useIntegral {
  height: 32px;
  line-height: 32px;
  border: 1px solid #dcdfe6;
  padding: 0 15px;
  width: 100%;
  border-radius: 4px;
  background-color: #fff;
  border-color: #e4e7ed;
  color: #606266;
}

.useIntegral::-webkit-input-placeholder {
  /*WebKit browsers*/
  color: #c0c4cc;
}

.useIntegral::-moz-input-placeholder {
  /*Mozilla Firefox*/
  color: #c0c4cc;
}

.useIntegral::-ms-input-placeholder {
  /*Internet Explorer*/
  color: #c0c4cc;
}
</style>
