<template>
  <!-- <div> -->
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

      <div class="content-new-fex">
        <div class="content-table1">
          <div class="content-table-center">
            <el-row :gutter="20" v-for="(item,i) in list" :key='i'>
              <el-col :xs="24" class='font-600 m-bottom-xs'>{{item.title}}</el-col>
              <el-col :xs="24" :sm="6" :xl="6" v-for="(item1,ii) in item.children" :key="ii">
                <a
                  @click="toFollowLink(item1)"
                  class="border rounded-xs block padding-sm m-bottom-md pointer"
                  style="height:70px;"
                >
                  <img :src="item1.img"
                    class="inline-block pull-left m-right-sm"
                    style="width: 46px; height: 46px;"
                  >
                  <div class="itt">{{item1.title}}</div>
                  <div class="itt">{{item1.des}}</div>
                </a>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </el-container>
  </el-container>
</el-container>

  <!-- </div> -->
</template>
<script>
  import img1 from '@/assets/card_img1.png'
  import img2 from '@/assets/card_img2.png'
  import img3 from '@/assets/card_img3.png'
  import img4 from '@/assets/card_img4.png'
  import img5 from '@/assets/card_img5.png'
  import img6 from '@/assets/card_img6.png'
  import img7 from '@/assets/card_img7.png'
  import img8 from '@/assets/card_img8.png'
  import img9 from '@/assets/card_img9.png'
  import img10 from '@/assets/card_img10.png'
  import img11 from '@/assets/card_img11.png'
  import img12 from '@/assets/card_img12.png'
  import { getUserInfo} from '@/api/index'
  import MIXINS_MARKETING from "@/mixins/marketing.js";

  export default {
    mixins: [MIXINS_MARKETING.MARKETING_MENU],
    data() {
      return {
        list:[
        {
          title: '卡券中心', 
          children:[
            {
              title: "优惠卡券",
              des: "发放优惠券刺激消费",
              url: "/marketing/coupon",
              img: img1,
            },{
              title: "定向优惠券",
              des: "向指定会员发放优惠券",
              url: "/memberCoupon",
              img: img2,
            },
            {
              title: "批量发放优惠券",
              des: "一次发多张优惠券给指定会员",
              url: "/lotGroup",
              img: img3,
            }
          ]
        },{
          title: '营销工具',
          children:[{
            title: "注册有礼",
            des: "注册赠送积分、余额、优惠券",
            url: "/RegisterGifts",
            img: img4
          },
          {
            title: "充值赠送",
            des: "充值赠送余额、积分、次卡等",
            url: "/Recharge",
            img: img5
          },
          {
            title: "限时特价",
            des: "指定时间商品特价优惠",
            url: "/Specials",
            img: img6
          },
          // {
          //   title: "推荐会员有礼",
          //   des: "老客带新客，赚佣金",
          //   url: "/RecommendGifts",
          //   img: img7
          // }
          ]
        },{
          title:'微信营销',
          children:[
            {
              title: "微信会员卡",
              des: "微信平台会员卡定制",
              url: "/weiXinVipCard",
              img: img8
            },
            {
              title: "微信优惠商品",
              des: "发布优惠商品到微信平台",
              url: "/marketing/goods",
              img: img9
            }, {
              title: "微信活动海报",
              des: "发布活动海报到微信平台",
              url: "/marketing/promotion",
              img: img10
            },
          ]
        },
        {
          title:'店铺工具',
          children:[
            {
              title: "群发短信",
              des: "向会员发送短信",
              url: "/groupSMS",
              img: img11
            },
            // {
            //   title: '积分清零',
            //   des:'积分清零',
            //   url:'/IntegralReset',
            //   img: img12
            // }
          ]
        },
      ]
      }
    },
    activated() {},
    components: {
      headerPage: () => import("@/components/header")
    },
    methods:{
      toFollowLink(item) {
        let agentPermission = getUserInfo().List
        let arr = agentPermission.filter(element => element.MODULENAME == item.title);
        if (arr.length > 0 && !this.isPurViewFun(arr[0].MODULECODE)) {
          this.$message.warning('没有此功能权限，请联系管理员授权!')
        } else {
          this.$router.push({ path: item.url });
        }
      }
    }
  }

</script>

<style scoped>
  .itt {
    padding: 4px 0;
  }
  .member-header{
    display: flex;
    align-items: center;
    height: 50px;
  }
  .center-title{
    width: 100px;
    text-align: center;
    height: 50px;
    line-height: 50px;
    border: solid 1px #d7d7d7;
  }
  .center-cont{
    width: 100px;
    text-align: center;
    height: 50px;
    line-height: 50px;
  }
  .el-header{
    padding: 0 !important;
  }
  .shop{
    display: flex;
    align-items: center;
    height: 50px;
    position: relative;
  }
  .shop .name{
    position: absolute;
    right: 50px;
    height: 50px;
    line-height: 50px;
    width: 150px;
    text-align: center;
    top: 0;
  }
  .el-header, .el-footer {
    background-color: #fff;
    color: #333;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .content-eightys{
    display: flex;
    align-items: center;
    width: 100%;
    height: 80px;
    background: #fff;
  }
</style>