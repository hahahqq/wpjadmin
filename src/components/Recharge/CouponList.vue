<template>
  <div class="CouponList">
    <div class="com_header">
      <div class="selectmemberid">
        <i class="icon-search iconfont com_search"></i>
        <el-input type="text" v-model="couponval" placeholder="输入优惠券号码直接使用">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
    </div>
    <div class="discountCouponList" :loading="mainloading">
      <ul>
        <li v-for="(item, index) in CouponListsock" :key="index">
          <div
            @click="selectonecoupon(index, item)"
            class="rounded-xs pointer margin-sm padding-sm"
            :class="item.LIMITMONEY <= dealData.money ? 'bg-theme' : 'bg-gw text-999'"
          >
            <div class="m-bottom-sm">
              <div class="inline-block">
                <em>&yen;</em>
                <span class="font-20">{{ item.MONEY }}</span>
              </div>
              <span class="pull-right">满{{ item.LIMITMONEY }}元可用</span>
            </div>
            <div>
              <span>No : {{ item.COUPONCODE }}</span>
            </div>
            <div>
              <span>有效期：{{ item.ENDDATE }}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div v-show="pagination.TotalNumber > 20" class="m-top-sm clearfix elpagination">
      <el-pagination
        @size-change="handlePageChange"
        @current-change="handlePageChange"
        :current-page.sync="pagination.PN"
        :page-size="pagination.PageSize"
        layout="total, prev, pager, next, jumper"
        :total="pagination.TotalNumber"
        class="text-center"
      ></el-pagination>
    </div>
    <div class="commodityfooter el-dialog__header">
      <el-button type="info" @click="closeModal">取消</el-button>
      <el-button type="primary" @click="selectcouponok">确认</el-button>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "barCodePay",
  props: {
    dealData: {
      type: Object,
      default: function () {
        return { money: "", vipID: "" };
      }
    }
  },
  data() {
    return {
      mainloading: false,
      couponval: "",
      couponcodemoney: "",
      couponcode: "",
      CouponListsock: [],
      pagination: {
        TotalNumber: 0,
        PageNumber: 0,
        PageSize: 20,
        PN: 1
      },
      pageData: {
        openID: "",
        Type: 0,
        PN: 1
      }
    };
  },
  computed: {
    ...mapGetters({
      couponlistState: "couponlistState",
      couponcheckState: "couponcheckState"
    })
  },
  watch: {
    dealData(data) {
      let openID = data.vipID;
      if (openID != "") {
        this.mainloading = true;
        this.$store.dispatch("getcouponlistState", { openID: openID, PN: 1 });
      } else {
        this.CouponListsock = [];
        this.pagination = {
          TotalNumber: 0,
          PageNumber: 0,
          PageSize: 20,
          PN: 1
        };
      }
    },
    couponlistState(data) {
      if (data.success) {
        this.mainloading = false;
        this.CouponListsock = data.data.PageData.DataArr;
        this.pagination = {
          TotalNumber: data.data.PageData.TotalNumber,
          PageNumber: data.data.PageData.PageNumber,
          PageSize: data.data.PageData.PageSize,
          PN: data.data.PageData.PN
        };
      }
    },
    couponcheckState(data) {
      if (data.success) {
        if (data.data.StatusName == "未使用") {
          let combackdata = {
            couponcode: this.couponval,
            couponcodemoney: data.data.Money,
            LimitMoney: data.data.LimitMoney
          };
          if (combackdata.LimitMoney > this.dealData.money) {
            this.$message.error("此优惠券需满" + combackdata.LimitMoney + "元使用");
            return;
          } else {
            this.$emit("CouponListclick", combackdata);
          }
        } else if (data.data.StatusName == null) {
          this.$message("输入正确的卡券优惠码");
          return;
        } else {
          this.$message("已失效");
          return;
        }
      } else {
        this.$message.warning(data.message);
      }
    }
  },
  methods: {
    handlePageChange: function (currentPage) {
      this.pagination.PN = parseInt(currentPage);
      this.getNewData();
    },
    selectonecoupon(index, item) {
      if (item.LIMITMONEY > this.dealData.money) {
        this.$message.error("此优惠券需满" + item.LIMITMONEY + "元使用");
        return;
      }

      this.couponcode = item.COUPONCODE;
      this.couponcodemoney = item.MONEY;
      this.$emit("CouponListclick", {
        couponcode: this.couponcode,
        couponcodemoney: this.couponcodemoney
      });
    },
    closeModal(type) {
      this.CouponListsock = [];
      this.$emit("CouponListclick", {});
    },
    selectcouponok() {
      if (this.couponcode != "") {
        let combackdata = {
          couponcode: this.couponcode,
          couponcodemoney: this.couponcodemoney
        };
        this.CouponListsock = [];
        this.$emit("CouponListclick", combackdata);
      } else {
        if (this.couponval != "") {
          this.$store.dispatch("getcouponcheckState", { Code: this.couponval });
        }
      }
    },
    getNewData() {
      this.pageData.openID = this.dealData.vipID;
      this.$store.dispatch("getcouponListState", this.pageData).then(() => {
        this.mainloading = true;
      });
    }
  }
};
</script>
<style scoped>
.com_header {
  position: relative;
  margin-bottom: 20px;
}

.com_header .search_selectmember {
  height: 32px;
  background: #fff;
  border: 1px solid #cccccc;
  outline: none;
  padding: 0 24px;
  border-radius: 5px;
  color: #000;
  width: 94%;
  margin: 0 auto;
  display: block;
}

.com_header .com_search {
  position: absolute;
  left: 23px;
  top: 7px;
  color: #ffa112;
}

.discountCouponList {
  overflow: hidden;
  height: 260px;
  overflow-y: auto;
  padding: 5px 0;
}

.discountCouponList ul li {
  float: left;
  width: 50%;
  color: #fff;
  position: relative;
  cursor: pointer;
}

.discountCouponList ul li .CouponListimg {
  height: 87px;
  width: 90%;
  margin: 0 auto;
  background: #f56c6c;
  border-radius: 5px;
}

.CouponListtop {
  text-align: right;
  font-size: 16px;
  padding-right: 10px;
  padding-top: 15px;
  font-weight: bold;
}

.CouponListbottom {
  padding-left: 10px;
  padding-top: 5px;
  font-size: 12px;
}

.isselectcoupon {
  position: absolute;
  color: #e91e63;
  font-size: 18px;
  right: 10px;
  top: -4px;
}
</style>
