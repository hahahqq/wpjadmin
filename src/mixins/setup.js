/**
 * setup
 * */
import {
  mapState,
  mapGetters
} from "vuex";
export default {
  SIDERBAR_MENU: {
    data() {
      return {
        activePath: '',
        routesList: [],
      }
    },
    created() {
      let reportObj = Object.assign({}, this.$router.options.routes[12]);
      // let rr = this.$router.options.routes;
      // let reportObj = rr.filter(item => item.name === 'setup');
      // this.routesList = [...reportObj[0].children];

      this.routesList = [...reportObj.children];

      this.activePath = this.$route.path;
    },
    components: {
      // 'sidebarMenu': () => import('@/components/other/sidebarMenu'),
      'memberMenu': () => import('@/components/other/memberMenu'),
    },
  },

}
