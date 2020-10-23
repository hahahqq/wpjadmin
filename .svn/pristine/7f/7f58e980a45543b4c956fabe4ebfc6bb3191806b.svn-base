/**
 * setup
 * */
import {
    mapState,
    mapGetters
  } from "vuex";
  export default {
    STOCK_MENU: {
      data() {
        return {
          activePath: '',
          routesList: [],
        }
      },
      created() {
        let stockObj = Object.assign({}, this.$router.options.routes[6]);
        this.routesList = [...stockObj.children];
        this.activePath = this.$route.path;
      },
      
      components: {
        'memberMenu': () => import('@/components/other/memberMenu'),
      },
    },
  
  }
  
  