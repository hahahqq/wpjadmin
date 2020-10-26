<template>
  <section class="mallhome">
    <el-container>
      <el-main :style="{ height: height + 'px' }" style="padding: 0 10px">
        <el-row :gutter="20" class="row1 bg-white no-m-right text-center font-14">
          <el-col v-for="(item, i) in row1" :key="i" :span="24 / row1.length" class="paddingTB-lg">
            <div class="m-bottom-sm font-26" style="color: #2589ff">
              {{ item.value }}
            </div>
            <div class="font-18">
              <strong>{{ item.label }}</strong>
            </div>
          </el-col>
        </el-row>

        <div class="row2 marginTB-sm font-14">
          <div class="padding-sm underLine bg-white" style="margin-left: -10px">
            <span class="font-16 font-600 m-right-sm">关键指数</span>
            <!-- <span class="text-muted">数据截止至</span>
                        <span class="text-muted">2020-03-21</span>
                        <div class="pull-right"></div>-->
          </div>
          <el-row :gutter="20" class="bg-white no-m-right text-center">
            <el-col
              v-for="(item, i) in row2"
              :key="i"
              :span="24 / row2.length"
              class="paddingTB-md"
            >
              <router-link :to="{ path: item.url }" class="block">
                <div class="text-center">
                  <img :src="item.img" alt class="inline-block" width="60" height="60" />
                </div>
                <div>{{ item.title }}</div>
              </router-link>
            </el-col>
          </el-row>
        </div>

        <div class="row3 marginTB-sm font-14">
          <div class="padding-sm underLine bg-white" style="margin-left: -10px">
            <span class="font-16 font-600 m-right-sm">营销功能</span>
          </div>
          <div
            class="bg-white no-m-right text-center clearfix p-left-sm paddingTB-sm"
            style="margin-left: -10px"
          >
            <div
              v-for="(item, i) in row3"
              :key="i"
              :class="{ 'clear-left': i == 3 }"
              class="pull-left p-top-sm p-right-sm"
              style="width: 33%"
            >
              <div
                @click="toFollowLink(item.url, item.number)"
                class="row-flex flex-items-center padding-sm border pointer"
              >
                <div style="min-width: 60px">
                  <img :src="item.img" alt class="block" width="50" height="50" />
                </div>
                <div class="full-width text-left">
                  <div class="font-14">
                    <span>{{ item.title }}</span>
                  </div>
                  <div>
                    <span>{{ item.des }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-main>
      <el-aside width="300px" style="line-height: 1.3; background: transparent">
        <div class="bg-white m-bottom-sm font-14">
          <div class="padding-sm text-left">
            <div class="paddingTB-sm font-18">
              <strong>试用版</strong>
            </div>
            <div class="m-bottom-sm">
              <span>剩余</span>
              <b class="font-16">{{ hDate }}</b>
              <span>天</span>
              <span class="text-muted" v-if="iDate">（{{ new Date(iDate) | time }}到期）</span>
            </div>
            <div class="m-bottom-sm text-muted">
              <div class>当前为免费试用版</div>
              <div class>升级到商城版享受更多服务</div>
            </div>
            <div class="m-top-md">
              <el-button
                class="full-width no-border"
                style="background-color: #ff5050"
                @click="aaa"
              >
                <strong class="text-white">立即升级</strong>
              </el-button>
            </div>
          </div>
        </div>
        <!-- <div class="bg-white m-bottom-sm">
                    <div class="padding-sm text-left">
                        <div class="pull-right">当前版本</div>
                        <div class="m-bottom-sm">
                            <div class="font-16">微店基础版</div>
                            <div class="m-top-xs">升级到商城版享受更多服务</div>
                        </div>
                        <el-button type="primary" class="full-width" style="height:40px;">立即升级</el-button>
                    </div>
                </div>-->
      </el-aside>
    </el-container>
  </section>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import { getUserInfo, getHomeData } from "@/api/index";
import img1 from "@/assets/card_img1.png";
import img2 from "@/assets/card_img2.png";
import img3 from "@/assets/card_img3.png";
import img4 from "@/assets/card_img4.png";
import img5 from "@/assets/card_img5.png";
import img6 from "@/assets/card_img6.png";
import img7 from "@/assets/card_img7.png";
import img8 from "@/assets/card_img8.png";
import img9 from "@/assets/card_img9.png";
import img10 from "@/assets/card_img10.png";
import img11 from "@/assets/card_img11.png";

import imgA1 from "@/assets/mall/a1.png";
import imgA2 from "@/assets/mall/a2.png";
import imgA3 from "@/assets/mall/a3.png";
import imgA4 from "@/assets/mall/a4.png";
import imgA5 from "@/assets/mall/a5.png";
import imgA6 from "@/assets/mall/a6.png";

export default {
  data() {
    return {
      iDate: 0,
      hDate: 0,
      activePath: "",
      routesList: [],
      height: window.innerHeight - 80,
      row1: [
        { label: "待付款订单", value: "0" },
        { label: "待发货订单", value: "0" },
        { label: "待售后处理", value: "0" },
        { label: "已售罄商品", value: "0" }
      ],
      row2: [
        { title: "订单管理", img: imgA1, url: "/mall/orderList" },
        { title: "售后管理", img: imgA2, url: "/mall/refundList" },
        { title: "商品上架", img: imgA3, url: "/mall/goods" },
        { title: "商品管理", img: imgA4, url: "/good/GoodList" },
        { title: "交易设置", img: imgA5, url: "/mall/setup" },
        { title: "会员管理", img: imgA6, url: "/member/MemberList" }
      ],
      row3: [
        {
          title: "注册有礼",
          des: "注册赠送积分、余额、优惠券",
          url: "/RegisterGifts",
          img: img4,
          number: "210040207"
        },
        {
          title: "充值赠送",
          des: "充值赠送余额、积分、次卡等",
          url: "/Recharge",
          img: img5,
          number: "210040208"
        },
        {
          title: "限时特价",
          des: "指定时间商品特价优惠",
          url: "/Specials",
          img: img6,
          number: "210040209"
        },
        {
          title: "优惠券",
          des: "发放优惠券刺激消费",
          url: "/marketing/coupon",
          img: img1,
          number: "210040201"
        },
        {
          title: "微信会员卡",
          des: "微信平台会员卡定制",
          url: "/weiXinVipCard",
          img: img8,
          number: "210040806"
        }
      ],
      loading: false
    };
  },
  computed: {
    ...mapGetters({
      dataState: "mallHomeData",
      mallState: "mallState",
      dataData: "mallData"
    })
  },
  watch: {
    dataState(data) {
      if (this.loading) {
        if (data.success) {
          this.row1[0].value = data.data.NoPayQty; //  待付款订单
          this.row1[1].value = data.data.NoSendQty; //  待发货订单
          this.row1[2].value = data.data.NoReturnQty; //  待售后处理
          this.row1[3].value = data.data.NoStockQty; //  已售罄商品
          this.defaultData();
        } else {
          this.$message.error(data.memssage);
        }
      }
      this.loading = false;
    },
    mallState(data) {
      if (data.success && this.loading) {
        this.dealQdate();
      }
      if (!data.success && this.loading) {
        this.$message.error(data.message);
      }
      this.loading = false;
    }
  },
  methods: {
    toFollowLink(path, number) {
      let userInfo = getUserInfo();
      let arr = userInfo.List.filter((element) => element.MODULECODE == number);
      if (arr.length > 0 && !this.isPurViewFun(number)) {
        this.$message.warning("您还没有获得相关权限!");
      } else {
        this.$router.push({ path: path });
      }
    },
    dealQdate() {
      this.iDate = this.dataData.WECHATSHOPINVALIDDATE;
      if (this.iDate) {
        let leftTime = new Date(this.iDate).getTime() - new Date().getTime();
        if (leftTime > 0) {
          this.hDate = Math.floor(leftTime / 1000 / 60 / 60 / 24);
        } else {
          this.hDate = 0;
        }
      }
    },
    aaa() {
      this.$alert("电话：4008-326-327", "服务热线", {
        confirmButtonText: "确定",
        callback: (action) => {
          console.log("服务热线");
        }
      });
    },
    defaultData() {
      if (this.dataData.STOCKSHOPID) {
        this.dealQdate();
      } else {
        this.$store.dispatch("getSettingMall").then(() => {
          this.loading = true;
        });
      }
    }
  },
  mounted() {
    this.$store.dispatch("getHomeMall").then(() => {
      this.loading = true;
    });
  }
};
</script>

