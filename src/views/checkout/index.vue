<template>
  <div class="checkout" style="height: 100%;">
    <commoditycPage></commoditycPage>
  </div>
</template>
<script>
import commoditycPage from "./commodityc.vue";
import { ROOT_URLQRCODE } from "@/util/define";
import { mapState, mapGetters } from "vuex";
import qrcode from "qrcode";
var QRCode = require("qrcode");
export default {
  data() {
    return {
      activeName: "first"
    };
  },
  computed: {
    ...mapGetters({
      memberQRcodeurlstate: "memberQRcodeurlstate"
    })
  },
  methods: {
   qrcodeTitle(erweimastr) {
      QRCode.toDataURL(erweimastr).then(url => {
        const img = new Image();
        this.$store.state.commodityc.saveQRcodeIMG = url;
      }).catch(err => {
        console.error(err)
      });
    },
  },
  watch: {
    memberQRcodeurlstate(data) {
      let that = this;
      if (data.success) {
        that.qrcodeTitle(data.data.BarCode);
      }
    }
  },
  components: {
    commoditycPage
  },
  beforeCreate() {

  },
  activated() {},
  mounted() {
    this.$store.dispatch("getmemberQRcodeurlstate", {}).then(() => {});
  }
};

</script>
<style>


</style>
