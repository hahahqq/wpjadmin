<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="会员回访" name="first">
      <!-- 会员消费回访列表 -->
      <revisitPage></revisitPage>
    </el-tab-pane>
    <el-tab-pane label="护理周期" name="second">
      <nourishingPage></nourishingPage>
    </el-tab-pane>
    <el-tab-pane label="意向会员" name="third">
      <intentionPage></intentionPage>
    </el-tab-pane>
    <el-tab-pane label="意见受理" name="fourth">
      <opinionPage></opinionPage>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import revisitPage from "./revisit.vue";
import nourishingPage from "./nourishing.vue";
import intentionPage from "./intention.vue";
import opinionPage from "./opinion.vue";
export default {
  data() {
    return {
      activeName: "first"
    };
  },
  components: {
    revisitPage,
    nourishingPage,
    intentionPage,
    opinionPage
  },
};
</script>


