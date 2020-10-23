/**
 * 报表页
 * */
  import { mapState, mapGetters } from "vuex";
  import $ from "jquery";
  import qrcode from "qrcode";
  var QRCode = require("qrcode");
  import { getHomeData } from "@/api/index";
  export default {
    QURCODE_IMG_ITEM: {
      data() {
        return {
          
        }
      },
      computed: {
      ...mapGetters({
        memberQRcodeurlstate: "memberQRcodeurlstate"
      })
    },
    watch: {
      memberQRcodeurlstate(data) {
        let that = this;
        if (data.success) {
          that.qrcodeTitle(data.data.BarCode);
        }
      }
    },
    methods: {
      qrcodeTitle(erweimastr) {
        QRCode.toDataURL(erweimastr)
          .then(url => {
            const img = new Image();
            this.$store.state.commodityc.saveQRcodeIMG = url;
          })
          .catch(err => {
            console.error(err);
          });
      }
    },
    mounted() {
      this.$store.dispatch("getmemberQRcodeurlstate", {}).then(() => {});
    }
    },
  }
  