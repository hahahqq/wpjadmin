/**
 * 报表页
 * */
import { mapState, mapGetters } from "vuex";
import { getHomeData } from "@/api/index";
export default {
   SIDERBAR_MENU: {
      data() {
         return {
            activePath: "",
            routesList: [],
            theShopId: getHomeData().shop.ID,
            theShopName: getHomeData().shop.NAME
         };
      },
      created() {
         // let reportObj = Object.assign({}, this.$router.options.routes[10]);
         // this.routesList = [...reportObj.children];
         // this.activePath = this.$route.path;

         let rr = this.$router.options.routes;
         let reportObj = rr.filter(item => item.name === "report");
         this.routesList = [...reportObj[0].children];

         this.$nextTick(() => {
            this.activePath = this.$route.meta.name;
         });
      },
      components: {
         // 'sidebarMenu': () => import('@/components/other/sidebarMenu'),
         memberMenu: () => import("@/components/other/memberMenu")
      }
   },
   COMMOM_PAGE: {
      data() {
         return {
            ruleFrom: {},
            ruleFrom2: {},
            isShowList: false,
            loading: false,
            title: ""
         };
      },
      watch: {
         dataListState(data) {
            this.loading = false;
            if (data.success) {
               console.log(data);
               console.log(this.ruleFrom2);
               // console.log(this.dataListArr[this.ruleFrom2.obj.index].List.length)
               // if (this.dataListArr[this.ruleFrom2.obj.index].List.length == 0) {
               //   this.$message(this.title + "，暂无数据");
               // } else {
               this.isShowList = true;
               // }
            } else {
               this.$message.error(data.message);
            }
         }
      },
      components: {
         filtePage: () => import("@/views/reports/filte")
      }
   }
};
