<template>
    <section id="headerRightArea">
        <div>
            <span class="name" style="margin-right: 8px;">{{shopInfo.SHOPNAME}}</span>
            <span class>
                <el-popover
                    placement="bottom"
                    width="140"
                    trigger="hover"
                    popper-class="no-padding"
                >
                    <el-button
                        style="border: none!important;"
                        @click="changeShop()"
                        class="full-width"
                        icon="icon-exchange"
                    >&nbsp;&nbsp;切换店铺</el-button>
                    <el-button
                        style="border: none!important;"
                        @click="informationChange()"
                        class="full-width no-m-left border-top"
                        icon="icon-user"
                    >&nbsp;&nbsp; 账号信息</el-button>
                    <el-button
                        style="border: none!important;"
                        @click="logout()"
                        class="full-width no-m-left border-top"
                        icon="icon-signout"
                    >&nbsp;&nbsp;退出账号</el-button>
                    <a slot="reference" class="hitem">
                        <i class="icon-reorder"></i>
                    </a>
                </el-popover>
            </span>
        </div>
        <el-dialog append-to-body
            title="请选择门店"
            :visible.sync="isShowShop"
            width="300px"
            :before-close="handleClose"
        >
            <div class="shopListClass">
                <ul>
                    <li
                        v-for="(item, index) in theshopList"
                        :key="index"
                        @click="setShop(item)"
                    >{{item.SHOPNAME}}</li>
                </ul>
            </div>
        </el-dialog>
    </section>
</template>


<script>
import { mapState, mapGetters } from "vuex";
import { getHomeData, getUserInfo } from "@/api/index";
import MIXINS_CLEAR from "@/mixins/clearAllData";
export default {
    mixins: [MIXINS_CLEAR.LOGOUT],
    data() {
        var homeData = getHomeData(),
            userInfo = getUserInfo();
        return {
            shopInfo: homeData.shop,
            isShowShop: false,
            theshopList: [],
            activePath: "",
            shopName: userInfo.CompanyName,
        };
    },
    computed: {
        ...mapGetters({
            shopList: "shopList",
            shopListState: "shopListState",
        }),
    },
    methods: {
        handleClose(done) {
            this.isShowShop = false;
        },
        logout: function () {
            //退出登录
            var _this = this;
            this.$confirm("确认退出吗?", "提示")
                .then(() => {
                    _this.$store.dispatch("toLogOut").then(() => {
                        _this.clearAllData();
                        _this.$router.push("/login");
                    });
                })
                .catch(() => {});
        },
        setShop(item) {
            //切换店铺
            this.$store.dispatch("choosingShop", item).then(() => {
                this.isShowShop = false;
                this.clearAllData();
                this.defaultData();
                this.$router.push({
                    path: "/home",
                });
                this.$emit("changeShop", item);
            });
        },
        informationChange() {
            this.$router.push({
                path: "/setup/myshop",
            });
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
                            ID: userInfo.ShopList[i].SHOPID,
                            NAME: userInfo.ShopList[i].SHOPNAME,
                        });
                    }
                }
            }
            this.isShowShop = true;
        },
        defaultData() {
            var homeData = getHomeData(),
                userInfo = getUserInfo();
            this.UserName = userInfo.UserName;
            if (homeData.shop) {
                this.shopInfo = Object.assign({}, homeData.shop);
            }

            if (this.shopList.length == 0) {
                this.$store.dispatch("getShopList");
            }
        },
    },
    created: function () {
        this.defaultData();
        // console.log(this.$route.meta.children)
        this.activePath = this.$route.path;
    },
};
</script>
<style scoped>
#headerRightArea {
    line-height: 50px;
    height: 50px;
    text-align: right;
    background: #fff;
    font-size: 14px;
}
</style>