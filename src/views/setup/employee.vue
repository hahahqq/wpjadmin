<template>
  <el-container>
    <el-header style="height:50px;">
      <headerPage></headerPage>
    </el-header>
    <el-container>
      <el-aside width="100px">
          <section style="min-width:100px;">
            <memberMenu :activePath="activePath" :routesList="routesList" :width="100"></memberMenu>
          </section>
      </el-aside>
      <el-container>
          <div class="content-new-fex">
            <page></page>
          </div>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
import MIXINS_SETUP from "@/mixins/setup";
export default {
  mixins: [MIXINS_SETUP.SIDERBAR_MENU],
  components: {
    page: () => import("../selected/employee"),
    headerPage: () => import("@/components/header")
  }
};
</script>
<style scoped>
.el-header{
  padding: 0 !important;
}
.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

</style>
