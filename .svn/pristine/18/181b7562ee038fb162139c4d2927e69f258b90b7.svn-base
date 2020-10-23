<template>
	<el-row class="container">
		<!-- <headerPage :collapsed="collapsed" @collapse="collapse_fun"></headerPage> -->
		<el-col :span="24" class="main">
			<aside id="leftSidebar" class="innerbox bg-theme text-white">
				<!--导航菜单-->
        <div class="login-img">
          <img :src="sysLogo" class="inline-block full-width">
        </div>
        <ul class="block" style="text-align: center; width: 90px">
          <li v-for="(item,index) in routesList" :key="index" v-if="!item.hidden">
            <a
              v-if="item.leaf&&item.children.length>0"
              @click="toFollowLink(item.children[0])"
              class="block paddingLR-md pointer"
              :class="{'isActive':activePath==item.children[0].path}"
            >
              <i :class="item.iconCls" style="font-size:13px;"></i>
              <span>{{item.children[0].name}}</span>
            </a>
          </li>
        </ul>
			</aside>

			<!-- <section class="content-container" id="content" :class="(activePath.indexOf('report')>-1 || activePath.indexOf('setup')>-1)?'report_setup':'bg-white'">
				<div class="grid-content" style="float:left; width:100%">
					<el-col :span="24" class="content-wrapper innerbox">
						<transition name="fade" mode="out-in">
							<router-view :scroll-top="scrollTop"></router-view>
						</transition>
					</el-col>
				</div>
			</section> -->

      <section class="content-container" id="content" :class="(activePath.indexOf('report')>-1 || activePath.indexOf('setup')>-1)?'report_setup':'bg-white'">
				<div class="grid-content bg-purple-light full-height">
					<el-col :span="24" class="content-wrapper full-height">
						<transition name="fade" mode="out-in">
              <!-- <keep-alive> -->
                <router-view :scroll-top="scrollTop" style="min-height:100%;position: relative;"></router-view>
              <!-- </keep-alive> -->
						</transition>
					</el-col>
				</div>
			</section>
		</el-col>
		<el-col :span="24" class="footer">
				<a id='goTop' @click='goTop' v-show = 'toTop'>
					<i class="el-icon-arrow-up"></i>
				</a>
		</el-col>
	</el-row>
</template>

<script type="text/ecmascript-6">
import { mapState, mapGetters } from "vuex";
import { getUserInfo} from '@/api/index'
export default {
  data() {
    return {
      collapsed: false,
      scrollTop: 0,
      toTop: false,
      routesList:{},
      activePath: "",
      sysLogo: "static/images/logo_WPJ.png",
    };
  },
  computed: {
    ...mapGetters({
    })
  },
  watch:{
    // $route(data){
    //   this.activePath = data.path;
    // }
    $route(to, from) {
      this.activePath = to.meta.parent ? "/" + to.meta.parent : to.path;
    }
  },
  methods: {
    toFollowLink(item) {
      let agentPermission = getUserInfo().List
      let url = item.path;
      if (
        (item.path == "/good" && !this.isPurViewFun(91040108)) ||
        (item.path == "/member" && !this.isPurViewFun(91040107)) ||
        (item.path == "/checkout" && !this.isPurViewFun(91040101))
      ) {
        this.$message.warning('没有此功能权限，请联系管理员授权')
        return;
      }
      if (item.path == "/report") {
        let reportObj = Object.assign({}, this.$router.options.routes[11]);
        for (let i = 1; i < reportObj.children.length; i++) {
          let cdata = reportObj.children[i];
          let arr = agentPermission.filter(
            element => element.MODULENAME == cdata.name
          );
          if (arr.length > 0 && this.isPurViewFun(arr[0].MODULECODE)) {
            url = cdata.path;
            break;
          }
        }
      }
      this.$router.push({ path: url });
    },
    //折叠导航栏
    collapse_fun: function() {
      this.collapsed = !this.collapsed;
    },
    goTop() {
      let scrollDiv = document.getElementById("content");
      scrollDiv.scrollTop = 0;
    },
  },
  components:{
    'headerPage':()=>import("@/components/header")
  },
  created(){
    this.routesList = Object.assign({},this.$router.options.routes);
    this.activePath = this.$route.path;
  },
  mounted() {
    var _this = this;
    var scrollDiv = document.getElementById("content");
    scrollDiv.addEventListener(
      "scroll", function() {
        _this.scrollTop = scrollDiv.scrollTop;
        _this.toTop = scrollDiv.scrollTop > window.innerHeight / 2 ? true : false
      }, true
    )
  }
};
</script>

<style scoped lang="scss">
.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  .main {
    display: flex;
    position: absolute;
    top: 0;
    bottom: 0px;
    overflow: hidden;
    aside {
      flex: 0 0 90px;
      width: 90px;
      overflow-x: hidden;
      overflow-y: auto;
      ul {
        li {
          height: 50;
          line-height: 50px;
          position: relative;
        }
        li:hover,
        a.isActive {
          color: #fff;
          background-color: #2589FF;
        }
      }
    }
    .content-container {
      flex: 1;
      background:#F4F5FA;
      .breadcrumb-container {
        .title {
          width: 140px;
          float: left;
          color: #475669;
        }
        .breadcrumb-inner {
          float: right;
        }
      }
      .content-wrapper {
        background-color: transparent;
        box-sizing: border-box;
      }
    }
  }
  .footer {
    #goTop {
      position: absolute;
      right: 0;
      bottom: 2%;
      padding: 16px;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 99999;
      color: #fff;
      font-size: 24px;
    }
  }
}
.innerbox::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}
.innerbox::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
  background: rgba(0, 0, 0, 0.1);
}
.innerbox::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
  border-radius: 0;
  background-color: rgba(0, 0, 0, 0.05);
}
.childClass:hover {
  background-color: rgba(0, 0, 0, 0.1);
  color: #409eff;
}
.childClass a.isActive {
  background-color: rgba(0, 0, 0, 0.1);
  color: #409eff;
}
.login-img{
  height: 80px;
  width: 90px;
  position: relative;
  display: flex;
  align-items: center;
}
.login-img img{
  position: absolute;
  height: 40px;
  width: 40px;
  left: 22px;
  // border-radius: 100%;
}
</style>