<template>
    <el-container>
      <el-header style="height:50px;">
          <template>
            <el-row>
              <el-col :span="16" class="member-header">
                  <div class="center-title">{{$route.meta.title}}</div>
                  <div class="center-cont">
                    <ul  class="center-cont-ul">
                      <li v-for="(item,index) in businessList"
                      style="cursor:pointer"
                      :key="index"  
                      @click="selctBusinessList(index)" 
                      :class="{'selected':index==current}"
                      >{{item.name}}</li>
                    </ul>
                  </div>
              </el-col>

              <el-col :span="8" class="shop">
                  <span class="name">{{shopInfo.SHOPNAME}}</span>
                  <span class="">
                      <el-popover placement="bottom" width="140" trigger="hover" popper-class="no-padding">
                          <el-button style="border: none!important;"  @click="changeShop()" class="full-width" icon='icon-exchange'>&nbsp;&nbsp;切换店铺</el-button>
                          <el-button style="border: none!important;"  class="full-width no-m-left border-top" icon='icon-user'>&nbsp;&nbsp; 账号信息</el-button>
                          <el-button style="border: none!important;"  @click="logout()" class="full-width no-m-left border-top" icon='icon-signout'>&nbsp;&nbsp;退出账号</el-button>
                          <a slot="reference" class="hitem">
                              <i class='icon-reorder'></i>
                          </a>
                      </el-popover>
                  </span>
              </el-col>
            </el-row>
          </template>
      </el-header>

      <el-container>
          <el-aside width="100px">
              <section style="min-width:100px;">
                <memberMenu :activePath="activePath" :routesList="routesList" :width="100"></memberMenu>
              </section>
          </el-aside>

          <el-container>
            <div class="content-new-fex"> 
              <addNewPage v-if="current==0"></addNewPage>
              <historyPage v-on:isAddNewBill_A='isAddNewBill_A' v-if="current==1"></historyPage>
            </div>
          </el-container>
      </el-container>

      <el-dialog title="请选择门店" :visible.sync="isShowShop" width="300px" :before-close="handleClose">
          <div class='shopListClass'>
              <ul>
                  <li v-for='(item, index) in theshopList' :key="index" @click="setShop(item)">
                      {{item.SHOPNAME}}
                  </li>
              </ul>
          </div>
      </el-dialog>

    </el-container>
</template>

<script>
import { getHomeData,getUserInfo } from '@/api/index'
import { mapState, mapGetters } from "vuex";
import addNewPage from "./allocation/addNew.vue";
import historyPage from "./allocation/history.vue";
import MIXINS_STOCK from "@/mixins/stock.js";
import MIXINS_CLEAR from "@/mixins/clearAllData";
export default {
  mixins: [MIXINS_STOCK.STOCK_MENU, MIXINS_CLEAR.LOGOUT],
  data() {
    return {
      current: 0,
      businessList:[{id:'001',name:"库存调拨"},{id:'002',name:"库存调拨历史"}],
      shopInfo: getHomeData().shop,
      isShowShop:false,
      theshopList: [],
      activeName: "first",
      activePath: ""
    }
  },
  components: {
    addNewPage,
    historyPage
  },
  computed: {
    ...mapGetters({
      shopList: "shopList",
    })
  },
  methods:{
    selctBusinessList(e){
      this.current = e;
      if(e == 1){
        this.clearSetItem()
      }
    },
    handleClose(done) {
        this.isShowShop = false;
    },
    isAddNewBill_A(data){
      if(data){
        this.current = 0
        this.$forceUpdate()
      }
    },
    defaultData() {
        let homeData = getHomeData();
        if (homeData.shop) {
            this.shopInfo = Object.assign({}, homeData.shop);
        }
        this.UserName = getUserInfo().UserName;
        if (this.shopList.length == 0) {
            this.$store.dispatch("getShopList")
        }
    },
    changeShop() {
        let userInfo = getUserInfo();
        if (userInfo.CODE2 == "boss") {
            this.theshopList = [...this.shopList];
        } else {
            this.theshopList = [];
            for (let i = 0; i < userInfo.ShopList.length; i++) {
                if (userInfo.ShopList[i].ISPURVIEW == 1) {
                this.theshopList.push({
                    ID : userInfo.ShopList[i].SHOPID,
                    NAME : userInfo.ShopList[i].SHOPNAME
                });
                }
            }
        }
        this.isShowShop = true;
    },
    informationChange(){
        this.$router.push({
            path: "/setup/myshop"
        })
    },
    logout: function() { //退出登录
        var _this = this;
        this.$confirm("确认退出吗?", "提示").then(() => {
            _this.$store.dispatch("toLogOut").then(() => {
                _this.clearAllData();
                _this.$router.push("/login");
            })
        }).catch(() => {
            console.log("logout");
        })
    },
    setShop(item) { //切换店铺
        this.$store.dispatch("choosingShop", item).then(() => {
            this.isShowShop = false;
            this.clearAllData();
            this.defaultData();
            this.$router.push({
                path: "/home"
            })
            this.$emit('changeShop',item)
        })
    },
    clearSetItem(){
      this.$store.dispatch('cgdAllocationDataList', '').then(()=>{
        sessionStorage.setItem('theGoodsList_A', JSON.stringify([]))
        sessionStorage.setItem('theGoodsObj_A', JSON.stringify({}))
      })
    }
  },
  destroyed: function () {
    this.clearSetItem()
  }
}
</script>

<style scoped>
.member-header{
  display: flex;
  align-items: center;
  height: 50px;
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
  /* border: solid 1px #d7d7d7; */
}
.center-cont{
  /* width: 100px; */
  text-align: center;
  height: 35px;
  line-height: 35px;
  margin-left: 20px;
}
.center-cont-ul{
  display: flex;
}
.center-cont-ul li{
  /* width: 84px;
  text-align: center; */
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
  line-height: 50px;
  height: 50px;
  text-align: right;
  padding-right: 20px;
  border-bottom: 1px solid #EBEDF0;
  background: #fff;
}
.shop .name{
    margin-right: 8px;
}
.icon-reorder{
    color: #2589FF;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}
</style>