<template>
  <div class=''>
    <div id="header">
      <div class="header">
        <div class="logo">
          <img :src='`${companyImg}${shopInfo.COMPANYID}.png`' onerror="this.src='static/images/icon_company.png'">
          <div class="left_h pull-left">
            <p class="txt">{{shopInfo.SHOPNAME}} | {{UserName}} </p>
            <p class="txt">{{dateTime}}</p>
          </div>
        </div>

        <div class="right_h pull-right">
          <ul>
            <li v-for="(item,index) in headList" :key="index" class="pull-left" @click="tabsindexclick(item)">
              <img :src="item.img" alt="">
              <p>{{item.label}}</p>
            </li>
          </ul>
        </div>

        <div class="close">
          <img src="static/images/closexh_01.png" alt="" title="退出收银" @click="$router.push({path:'/home'})">
        </div>
      </div>
    </div>

    <el-dialog v-if="showAddNew" title="新增会员" :visible.sync="showAddNew" :close-on-click-modal='false' width="800px" style="max-width:100%;" append-to-body>
        <add-new-member @closeModal="showAddNew=false"></add-new-member>
    </el-dialog>

    <!-- <el-dialog title="会员查询" :visible.sync="isVipSearch" width="770px" style="max-width:100%;" append-to-body>
      <vip-search @cloeModal='isVipSearch=false'></vip-search>
    </el-dialog> -->

    <el-dialog title="会员充值" :visible.sync="isvipRechargeShowList" :close-on-click-modal='false' width="60%" style="max-width:100%;" append-to-body>
      <vipRecharge @closeModal="isvipRechargeShowList=false"></vipRecharge>
    </el-dialog>

    <el-dialog title='积分兑换' :visible.sync="showIntegralExchange" :close-on-click-modal='false' width='80%' style="max-width:100%" append-to-body>
      <integralExchange @closeModal='showIntegralExchange=false' ></integralExchange>
    </el-dialog>

    <el-dialog title="库存横排查询" :visible.sync="isstockShowList" :close-on-click-modal='false' width="96%" style="max-width:100%;" append-to-body>
      <queryPage @closeModal="isstockShowList=false" :dataType="{ dealState:'reset'}"></queryPage>
    </el-dialog>

    <el-dialog title="零售查询" :visible.sync="isretailShowList" :close-on-click-modal='false' width="90%" style="max-width:100%;" append-to-body>
      <retailqueryPage @returnOrderList='returnOrderList' @returnOrderObj='returnOrderObj' @closeModal="isretailShowList=false" ></retailqueryPage>
    </el-dialog>

    <el-dialog title="商品查询" :visible.sync="isGoodsshowList" :close-on-click-modal='false' width="80%" style="max-width:100%" append-to-body>
      <shopquery @closeModal="isGoodsshowList= false" :goodsValSearch='""' :shopViewType='0' ></shopquery>
    </el-dialog>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import { getUserInfo, getHomeData } from "@/api/index";
import dayjs from 'dayjs'
import { COMPANY_IMGURL } from "@/util/define"

export default {
  data() {
    return {
      showAddNew: false,
      isvipRechargeShowList: false,
      isstockShowList: false,
      isGoodsshowList: false,
      isretailShowList: false,
      isVipSearch: false,
      showIntegralExchange: false,
      companyImg: COMPANY_IMGURL,
      headList: [{
          img: 'static/images/h_xs1.png',
          label: '新增会员',
          index:1
        },
        {
          img: 'static/images/h_xs2.png',
          label: '会员充值',
          index:2
        }, 
        {
          img: 'static/images/h_xs3.png',
          label: '积分兑换',
          index:3
        },
        {
          img: 'static/images/h_xs4.png',
          label: '零售查询',
          index:4
        },
        {
          img: 'static/images/h_xs5.png',
          label: '库存查询',
          index:5
        },
        // {
        //   img: 'static/images/h_xs5.png',
        //   label: '会员查询',
        //   index: 7
        // }
      ],
      shopInfo: {},
      UserName: getUserInfo().UserName,
      dateTime:''
    }
  },
  methods: {
    returnOrderList(data){
      this.$emit('returnOrderList1', data)
    },
    returnOrderObj(data){
      this.$emit('returnOrderObj1', data)
    },
    tabsindexclick(item){
      if(item.index == 1){
        if(this.isPurViewFun(91040107)){
          this.showAddNew = true;
        }else{
          this.$message.warning('没有此功能权限，请联系管理员授权!')
        }
      }else if(item.index == 2){
        if(this.isPurViewFun(91040117)){
          this.$store.dispatch("getMarketingRechargeStatus",{}).then(()=>{
            this.isvipRechargeShowList = true
          })
        }else{
          this.$message.warning('没有此功能权限，请联系管理员授权!')
        }
      }else if(item.index == 3){
        this.showIntegralExchange = true
      }else if(item.index == 4){
        if(this.isPurViewFun(91040110)){
          this.isretailShowList = true
        }else{
          this.$message.warning('没有此功能权限，请联系管理员授权!')
        }
      }else if(item.index == 5){
        if(this.isPurViewFun(91040111)){
          this.isstockShowList=true
        }else{
          this.$message.warning('没有此功能权限，请联系管理员授权!')
        }
      }else if(item.index == 6){
        this.$message.warning('没有此功能权限，请联系管理员授权!')
      }
      // else if(item.index == 7){
      //   this.isVipSearch = true
      // }
    }
  },
  components: {
    shopquery: () => import("@/components/checkout/shopquery"),
    queryPage: () => import('@/components/checkout/stockQuery'),
    retailqueryPage: () => import("@/components/checkout/retailquery"),
    addNewMember: () => import("@/components/member/add"),
    vipRecharge: () => import("@/components/checkout/viprecharge"),
    integralExchange: () => import("@/views/checkout/integralExchange")
    // vipSearch: () => import("@/components/checkout/vipSearch")
  },
  mounted() {
    let homeData = getHomeData()
    if (homeData.shop) {
      this.shopInfo = Object.assign({}, homeData.shop)
    }
    let that = this
    this.timer = setInterval(() => {
      that.dateTime = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
    }, 1000)
  }
}

</script>
<style scoped lang="scss">
.headerStyle .el-dialog__wrapper .el-dialog { margin-top:15px !important;}
.header {
  height: 80px;
  background: rgba(62, 169, 255, 1);
  color: #fff;
  text-align: right;
  padding: 12px;
  position: relative;
  .logo {
    height: 50px;
    float: left;
    text-align: left;
    padding-right: 20px;
    img {
      width: 50px;
      height: 50px;
      float: left;
      border-radius: 8px;
    }
    .txt {
      color: #fff; padding-left: 12px;
    }
  }

  .right_h {
    margin-right: 20px;
    li {
      padding: 0 8px;
      text-align: center;
      cursor: pointer;
      img { width: 32px; height: 32px }
    }
  }

  .close {
    img {
      position: absolute;
      right: 8px;
      top: 9px;
      cursor: pointer;
    }
  }
}
</style>
