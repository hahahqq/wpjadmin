<template>
  <div class="barCodePay" style="overflow: hidden;margin-top: -20px;" @click="chufaininputfocus">
    <div class="modal-body">
      <input type="hidden" id="isShowbarCodePayWindows" value="true" />
      <div class="barcodeLeft">
        <img src="static/images/barCode.jpg" />
        </div>
        <div class="barcodeRight">
          <div class="barcodeRight_top">
            <br />
            <p>
              支持微信或支付宝条码支付
            </p>
            <p style="margin-top:20px;">请使用条码枪进行扫描</p>
            <p id="errorMsg" style="position:absolute;bottom:20px;color:red;"></p>
          </div>
          <div class="barcodeRight_bottom">
            <el-input type="default" v-model="authcodeValue" placeholder="请用扫描枪扫码客户二维码" style="width:200px;" ref="mark" @keyup.enter.native="inputbarcodepay">
            </el-input>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "barCodePay",
  data() {
    return {
      authcodeValue: '',
      timeOut: '',
      countsum: 0
    };
  },
  props: ['billmoney', 'paytypeid'],
  computed: {
    ...mapGetters({
      barcodepayFState: "barcodepayFState",
      barcodepayTState: "barcodepayTState",
    })

  },
  watch: {
    barcodepayFState(data) {
      this.authcodeValue = ''
      clearTimeout(this.timeOut);
      if (data.success == false) {
        this.$message(data.message);
        return;
      } else {
        let returnobjdataval = data.data.obj;
        if (returnobjdataval.result_code == '01') {
          this.$emit("barcodePayclick");

        } else if (returnobjdataval.result_code == '02') {
          this.$message(returnobjdataval.return_msg);
          return;

        } else if (returnobjdataval.result_code == '99') {
          this.$message(returnobjdataval.return_msg);
          return;
        } else {
          let out_trade_no = returnobjdataval.terminal_trace;
          this.everyotherbarcodepay(out_trade_no);
        }
      }
    },
    barcodepayTState(data) {
      clearTimeout(this.timeOut);
      if (data.success == false) {
        this.$message(data.message);
        return;
      } else {
        let returnobjdataval = data.data.obj;
        returnobjdataval = JSON.parse(returnobjdataval);
        if (returnobjdataval.result_code == '01') {
          this.$emit("barcodePayclick");
        } else if (returnobjdataval.result_code == '02') {
          this.$message(returnobjdataval.return_msg);
          return;
        } else if (returnobjdataval.result_code == '99') {
          this.$message(returnobjdataval.return_msg);
          return;
        } else {
          let out_trade_no = returnobjdataval.pay_trace;
          this.getListIng(out_trade_no)
        }
      }
    }
  },
  methods: {
    getinputfocus() {
      this.$refs.mark.$el.querySelector('input').focus();
    },
    chufaininputfocus() {
      this.getinputfocus();
    },
    inputbarcodepay() {
      let AllDate = {
        total_fee: Number(this.billmoney * 100),
        auth_no: this.authcodeValue,
        bill_money: Number(this.billmoney),
        paytypeid: this.paytypeid
      }
      this.$store.dispatch("getbarcodepayFState", AllDate).then(() => {
        this.loading = true;
      });
    },
    everyotherbarcodepay(out_trade_no) {
      let AllDate = {
        out_trade_no: out_trade_no
      }
      this.$store.dispatch("getbarcodepayTState", AllDate).then(() => {
        this.loading = true;
      });
    },
    getListIng(out_trade_no) {
      this.countsum++
      if (this.countsum > 4) {
        clearTimeout(this.timeOut);
        this.countsum = 0;
        this.authcodeValue = '';
        this.$message("请重新扫描支付");
        return;
      }
      let _this = this;
      this.timeOut = setTimeout(() => {
        _this.everyotherbarcodepay(out_trade_no);
      }, 8000);

    }
  },

  mounted() {
    this.getinputfocus();

  }

};

</script>
<style>
.barCodePay .modal-body {
  position: relative;
  padding: 15px;
}

.barcodeLeft {
  width: 260px;
  position: relative;
  float: left;
  margin: 0;
  padding: 0;
}

.barcodeRight {
  width: 220px;
  position: relative;
  float: left;
  margin: 0;
  padding: 0;
  height: 301px;
}


.barcodeRight_bottom {
  position: absolute;
  bottom: 0;
}


.modal-body input {
  font-size: 12px;
}

</style>
