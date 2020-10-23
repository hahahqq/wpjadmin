<template>
    <div>
        <el-row>
            <el-col :span="16" class="member-header"> 
                <div class="center-title" style="border-right: 0; padding-left: 10px" v-if="$route.name=='首页'">{{shopName}}</div>
                <div class="center-title" v-else>{{$route.meta.title}}</div>
                <div class="center-cont" v-if='$route.name != "首页" && $route.meta.title == "营销中心" && $route.name != "拓客工具"'>
                    <a style="color:#137deb; cursor:pointer" @click="$router.push({ path: '/marketing/bespeakList' })">拓客工具</a>  <i style="color:#868686"> / </i>  {{$route.name}}
                </div>
                <div class="center-cont" v-else-if="$route.name != '首页'" >
                    <span v-if="$route.name == '条码打印'"> <a style="cursor:pointer" @click="$router.push({ path: '/good/GoodsBarCode'})">单品条码</a> / {{$route.name}}</span>
                    <span v-else>{{$route.name}}</span>
                </div>
                <!-- <div class="center-cont" v-else-if="$route.name != '首页'" >{{$route.name}}</div> -->
            </el-col>
            <el-col :span="8" class="shop">
                <span class="name">{{shopInfo.SHOPNAME}}</span>
                <span class="">
                    <el-popover placement="bottom" width="140" trigger="hover" popper-class="no-padding">
                        <el-button style="border: none!important;" @click="changeShop()" class="full-width" icon='icon-exchange'>&nbsp;&nbsp;切换店铺</el-button>
                        <el-button style="border: none!important;" @click="informationChange()"  class="full-width no-m-left border-top" icon='icon-user'>&nbsp;&nbsp; 账号信息</el-button>
                        <el-button style="border: none!important;" @click="logout()" class="full-width no-m-left border-top" icon='icon-signout'>&nbsp;&nbsp;退出账号</el-button>
                        <a slot="reference" class="hitem">
                            <i class='icon-reorder'></i>
                        </a>
                    </el-popover>
                </span>
            </el-col>
        </el-row>
        <el-dialog title="请选择门店" :visible.sync="isShowShop" width="300px" :before-close="handleClose">
            <div class='shopListClass'>
                <ul>
                    <li v-for='(item, index) in theshopList' :key="index" @click="setShop(item)">
                        {{item.SHOPNAME}}
                    </li>
                </ul>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import { getHomeData,getUserInfo } from '@/api/index'
import MIXINS_MEMBER from "@/mixins/member";
import MIXINS_CLEAR from "@/mixins/clearAllData";
export default {
    mixins: [MIXINS_MEMBER.MEMBER_MENU,MIXINS_CLEAR.LOGOUT],
    data() {
        return {
            shopInfo: getHomeData().shop,
            isShowShop:false,
            theshopList: [],
            activePath: "",
            shopName:getUserInfo().CompanyName
        }
    },
    computed: {
        ...mapGetters({
            shopList: "shopList",
            shopListState:'shopListState'
        })
    },
    watch:{
    },
    methods:{
        handleClose(done) {
            this.isShowShop = false;
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
        informationChange(){
            this.$router.push({
                path: "/setup/myshop"
            })
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
    },
    created: function() {
        this.defaultData();
        this.activePath = this.$route.path;
    },
}
</script>

<style scoped>
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
  /* width: 300px; */
  text-align: left;
  padding-left: 20px;
  height: 50px;
  line-height: 50px;
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
    cursor: pointer;
}
</style>
