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
      <el-main> 
        <memTSPage></memTSPage>
      </el-main>
    </el-container>
  </el-container>
</el-container>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import MIXINS_REPORT from "@/mixins/report";
import MIXINS_MEMBER from "@/mixins/member";
import { getHomeData,getUserInfo } from '@/api/index'
import MIXINS_CLEAR from "@/mixins/clearAllData";
export default {
  mixins: [MIXINS_REPORT.SIDERBAR_MENU, MIXINS_MEMBER.MEMBER_MENU,MIXINS_CLEAR.LOGOUT],
  data() {
    return {
      current: 0,
      businessList:[{id:'001',name:"会员提醒"}],
      shopInfo: getHomeData().shop,
      isShowShop:false,
      theshopList: [],
      activePath: "",
      showBuy:true,
      showTo:false,
      showGo:false,
    };
  },
  computed: {
    ...mapGetters({
      dataData: "businessReportData",
      dataState: "businessReportState",
      dataList: "businessReportList",
      dataListState: "businessReportListState",
      dataListArr: "businessReportListARR",
      shopList: "shopList"
    })
  },
  watch: {

  },
  methods: {
    selctBusinessList(e){
      this.current = e;
    },
    handleClose(done) {
        this.isShowShop = false;
    },
  },
  created() {
  },
  components: {
    memTSPage: () => import("@/views/member/reminderList"),
    headerPage: () => import("@/components/header")
  }
};
</script>
<style scoped>
.tableStock{
  height:400px;border:1px solid #ddd; border-right:0; border-bottom:0;
}
 .tableStock thead{
    background:#E4E4E4; color:#333333; height:36px; line-height:36px;
  }
.tableStock thead tr th{
    border-right:1px solid #fff;
     }
.tableStock   tbody tr{
    height: 36px; line-height: 36px;
}
.tableStock tbody tr:hover{
    background: #ecf5ff
}
.tableStock   tfoot tr{
    height:36px; line-height: 36px; 
}
.el-header{
    padding: 0 !important;
}
.member-main-top{
    width: 99%;
    margin-left: 0.5%;
    margin-right: 0.5%;
    height: 100px;
    background: #fff;
}
.member-main-table{
    margin-top: 8px;
    width: 99%;
    margin-left: 0.5%;
    margin-right: 0.5%;
    height: 600px;
    background: #fff;
}
.member-header{
    display: flex;
    align-items: center;
    height: 50px;
    border-bottom: 1px solid #EBEDF0;
    background: #fff;
}
.center-title{
  width: 100px;
  text-align: center;
  height: 50px;
  line-height: 50px;
  font-weight: bold;
}
.center-cont{
  /* width: 100px; */
  text-align: center;
  height: 35px;
  line-height: 35px;
  /* margin-left: 20px; */
}
.center-cont-ul{
  display: flex;
}
.center-cont-ul li{
  width: 84px;
  text-align: center;
  margin-right: 25px;
}
.center-cont-ul li.selected {
    color: #2589FF;
    border-bottom: 2px solid #2589FF;
}
.el-header{
  padding: 0 !important;
}
.shop{
  display: flex;
  align-items: center;
  height: 50px;
  position: relative;
}
.el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
    border-right:  solid 1px #F366D7!important;
}
.el-aside, .el-main{
  overflow: hidden !important;
}
.shop .name{
    margin-right: 8px;
}
.icon-reorder{
    color: #2589FF;
}
</style>