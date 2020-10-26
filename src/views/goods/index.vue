<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="商品列表" name="first">
      <listPage></listPage>
    </el-tab-pane>
    <el-tab-pane label="商品分类" name="second">
      <categoryPage></categoryPage>
    </el-tab-pane>
    <el-tab-pane label="商品单位" name="third">
      <UnitPage></UnitPage>
    </el-tab-pane>
    <el-tab-pane label="单品条码" name="fourth">
      <goodBarCode></goodBarCode>
    </el-tab-pane>
  <!--   <el-tab-pane label="套餐管理" name="five">
      <setmealmPage></setmealmPage>
    </el-tab-pane> -->
  </el-tabs>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import listPage from "./list.vue";
import setmealmPage from "./setmealm.vue";
import goodBarCode from "./goodBarCode.vue";
import categoryPage from "../selected/category.vue";
import UnitPage from "../selected/unit.vue";
export default {
  data() {
    return {
      activeName: "first",
    };
  },
  components: {
    listPage,
    categoryPage,
    UnitPage,
    setmealmPage,
    goodBarCode
  },
  methods:{

  }
};
</script>
