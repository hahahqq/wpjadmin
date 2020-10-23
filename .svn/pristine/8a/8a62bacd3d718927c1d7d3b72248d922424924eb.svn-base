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
      <el-main :style="{height:height+'px'}">
        <div class="myShop font-12" style="color:#333">
            <el-row>
              <div class="myShop-bacse">
                <div class="dmt"></div>
                <div><span class="h5">商家信息</span></div>
                <div style="margin-left:15px;"><el-button type="text" @click="editCompanyfun">修改</el-button></div>
              </div>
              <div class="myShop-bacse-cont">
                <ul>
                  <li>
                    <div class="myShop-logo">
                      <div>商家logo : </div>
                      <img :src='`${companyImg}${shopInfo.COMPANYID}.png`' onerror="this.src='static/images/icon_company.png'">
                    </div>
                  </li>
                  <li class="myShop-logo">商家名称 :&nbsp;<span> {{dataInfo.name}}</span></li>
                  <li class="myShop-logo">所属行业 :&nbsp;<span>{{dataInfo.tradename}}</span></li>
                  <li class="myShop-logo">联系人 :&nbsp;<span>{{dataInfo.linker}}</span></li>
                  <li class="myShop-logo">联系电话 :&nbsp;<span>{{dataInfo.phoneno}}</span></li>
                  <li class="myShop-logo">联系地址 :&nbsp;<span>{{dataInfo.address}}</span></li>
                </ul>
              </div>
            </el-row>
            <el-row>
              <div class="myShop-bacse">
                <div class="dmt"></div>
                <div><span class="h5">店铺信息</span></div>
                <div style="margin-left:15px;"><el-button type="text" @click="editShopfun">修改</el-button></div>
              </div>
              <div class="myShop-bacse-cont">
                <ul>
                  <li class="myShop-logo">店铺名称 :&nbsp;<span> {{shopItem.NAME}}</span></li>
                  <li class="myShop-logo">有效时间 :&nbsp;<span> {{new Date(shopItem.INVALIDDATE) | time}}</span></li>
                  <li class="myShop-logo">联系人 :&nbsp;<span> {{shopItem.MANAGER}}</span></li>
                  <li class="myShop-logo">联系电话 :&nbsp;<span> {{shopItem.PHONENO}}</span></li>
                  <li class="myShop-logo">店铺地址 :&nbsp;<span> {{shopItem.ADDRESS}}</span></li>
                  <li class="myShop-logo">注册时间 :&nbsp;<span> {{new Date(shopItem.WRITETIME) | time}}</span></li>
                </ul>
              </div>
            </el-row>
          <el-dialog
            width="500px"
            title="修改商家信息"
            :visible.sync="showEdit"
            append-to-body
            style="max-width:100%;"
          >
            <editPage
              @closeModal="showEdit=false"
              @resetList="showEdit=false;resetInfo_fun()"
              :propsData="{state:showEdit}"
            ></editPage>
          </el-dialog>
          <el-dialog
            width="500px"
            title="修改店铺信息"
            :visible.sync="showEdit2"
            append-to-body
            style="max-width:100%;"
          >
            <editShopPage
              @closeModal="showEdit2=false;"
              @resetList="showEdit2=false;resetShop_fun()"
              :propsData="{state:showEdit2}"
            ></editShopPage>
          </el-dialog>
        </div>
      </el-main>
    </el-container>
  </el-container>
</el-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { getHomeData } from "@/api/index";
import MIXINS_SETUP from "@/mixins/setup";
import { COMPANY_IMGURL } from "@/util/define"

export default {
  mixins: [MIXINS_SETUP.SIDERBAR_MENU],
  data() {
    return {
      showEdit: false,
      showEdit2: false,
      activeNames: "",
      shopItem: {},
      shopInfo:{},
      height:window.innerHeight -60,
      companyImg: COMPANY_IMGURL,
    };
  },
  computed: {
    ...mapGetters({
      dataInfo: "myinfo",
      shopItem1: 'shopItem'
    })
  },
  watch:{
    shopItem1(data){
      this.shopItem = data
    },
    getMyShop(data){
      console.log(data)
    },
    dataInfo(data){

    }
  },
  methods: {
    editCompanyfun(){
      if(!this.isPurViewFun(91040301)){
        this.$message.warning('没有此功能权限，请联系管理员授权')
        return
      }
      this.showEdit = true
    },
    handleChange(val) {
      console.log(val);
    },
    editShopfun() {
      if(!this.isPurViewFun(91040301)){
        this.$message.warning('没有此功能权限，请联系管理员授权')
        return
      }

      this.$store.dispatch("selectingShop", this.shopItem).then(() => {
        this.showEdit2 = true;
      });
    },
    resetInfo_fun() {
      this.$store.dispatch("getMyInfo");
    },
    resetShop_fun() {
      this.$store.dispatch("getShopList", {});
      this.$store.dispatch('getShopItem', {})
    }
  },
  mounted() {
    this.shopItem = Object.assign({}, getHomeData().shop);
    let homeData = getHomeData()
    if (homeData.shop) {
      this.shopInfo = Object.assign({}, homeData.shop)
    }

  },
  beforeCreate() {
    this.$store.dispatch("getMyInfo");
  },
  components: {
    editPage: () => import("@/components/setup/editMyinfo"),
    editShopPage: () => import("@/components/setup/editShop"),
    headerPage: () => import("@/components/header")
  }
};
</script>
<style scoped>
.t-name{
  display: inline-block;
  width: 124px;
  padding: 4px 0px;
}
.t-label{
  display: inline-block;
  padding: 4px 10px;
  border-radius:3px;
}
.el-header{
  padding: 0 !important;
}
.myShop{
  width: 100%;
  background: #fff;
  overflow-y: auto !important;
}
.myShop-bacse{
  display: flex;
  align-items: center;
  height: 40px;
  width: 96%;
  margin-top: 10px;
  margin-left: 20px;
  background: #F7F8FA;
}
.myShop-bacse .dmt{
    margin-left: 10px;
    margin-right: 10px;
    height: 16px;
    width: 6px;
    background: #3399FF;
}
.myShop-bacse-cont{
  /* margin-top: 62px; */
  margin-left: 60px;
}
.myShop-logo{
  display: flex;
  align-items: center;
  height: 40px;
}
.myShop-logo img{
  width: 45px;
  height: 45px;
  margin-left: 20px;
}
.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}
</style>
