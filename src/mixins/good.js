/**
 * setup
 * */
import { mapState, mapGetters } from "vuex";
export default {
   GOOD_MENU: {
      data() {
         return {
            activePath: "",
            routesList: []
         };
      },
      created() {
         let goodObj = Object.assign({}, this.$router.options.routes[5]);
         console.log("goodObj");
         console.log(goodObj);
         this.routesList = [...goodObj.children];
         this.activePath = this.$route.path;
      },

      components: {
         memberMenu: () => import("@/components/other/memberMenu")
      }
   }
};
