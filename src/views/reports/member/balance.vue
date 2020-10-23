<template>
  <div class="report row-flex flex-start">
    <section class="bg-white paddingTB-sm paddingLR-md full-width block overflowX-hidden">
      <integralPage></integralPage>
    </section>
  </div>
  <!--  -->
</template>
<script>
import { mapState, mapGetters } from "vuex";
import MIXINS_REPORT from "@/mixins/report";
import MIXINS_INDEX from "@/mixins/index";
export default {
  mixins: [MIXINS_REPORT.SIDERBAR_MENU, MIXINS_INDEX.IS_SHOW_POPUP],
  data() {
    return {
      tableHeight: document.body.clientHeight - 100,
      activeName: "first",
    };
  },
  components: {
    'integralPage': () => import("@/components/reports/member/integralBalance.vue")
  }
};
</script>
