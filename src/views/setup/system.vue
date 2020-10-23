<template>
  <el-container>
      <el-header style="height:50px; padding: 0">
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

                <div class="system bg-white font-12 padding-sm">
                  <!-- <div v-for="(item,i) in lineData" :key="i" class="inline-block m-right-md">
                    <el-checkbox v-model="choose[item.value]" class="font-16">{{item.label}}</el-checkbox>
                    <el-tooltip class="item" effect="dark" placement="top-start">
                      <div slot="content" style="max-width:320px">{{item.tip}}</div>
                      <span class="el-icon-question font-16"></span>
                    </el-tooltip>
                  </div> -->
                  <div class="setparametersock full-width pull-left">
                    <ul>
                        <li v-for="(item,i) in lineData" :key="i">
                            <span style="width: 100px; float:left"> <i></i>{{item.label}}</span>
                            <span style="color:#999; margin-left: 20px ">{{item.tip}}</span>
                            <el-switch v-model="choose[item.value]" @change="modifyState(item, i)" active-color="#rgb(251, 120, 154)" inactive-color="##9E9E9E" class="pull-right"></el-switch>
                        </li>
                    </ul>
                  </div>

                  <div class="paddingTB-lg full-width pull-left">
                    <span class="font-14">确认清除以上选择的数据项</span>
                    <a @click="makesure" class="inline-block vertical-middle m-left-sm ">
                      <span class="el-checkbox__inner inline-block" :class="{'active':sure}"></span>
                    </a>
                  </div>
                  <div class="paddingTB-lg" style="width:300px">
                    <div class="paddingTB-sm">短信验证将发送至注册人手机 {{CompanyCode}}</div>
                    <el-input placeholder="请输入验证码" v-model="code" class="m-bottom-md">
                      <template slot="append">
                        <el-button type="primary" @click="getCode">
                          <span v-text="timeDown.isClick?'获取验证码':'( '+timeDown.seconds+ ' s )'"></span>
                        </el-button>
                      </template>
                    </el-input>

                    <el-button type="primary" v-if="code" @click="handleSubmit" :loading="loading" class="full-width pull-left marginTB-sm">确定清除</el-button>
                    <el-button type="primary" v-else disabled class="full-width pull-left marginTB-sm">确定清除</el-button>
                  </div>
                </div>
              </el-main>
          </el-container>
      </el-container>
  </el-container>


</template>
<script>
import { mapState, mapGetters } from "vuex";
import { getUserInfo} from '@/api/index'
import MIXINS_SETUP from "@/mixins/setup";
export default {
  mixins: [MIXINS_SETUP.SIDERBAR_MENU],
  data() {
    return {
      CompanyCode:'',
      choose: {
        IsBusi: true,
        IsVip: false,
        IsPay: false,
        IsGoods: false,
        IsOther: false
      },
      lineData: [
        {
          label: "清除业务数据",
          value: "IsBusi",
          tip: "此项必选，将清除所有会员充值、消费结账，?库存出入库，库存数据、预约数据、营销数据、业务相关报表等数据"
        },
        {
          label: "清除会员数据",
          value: "IsVip",
          tip: "选择此项，将清除所有会员信息"
        },
        {
          label: "清除支出数据",
          value: "IsPay",
          tip: "选择此项，将清除所有支出数据"
        },
        {
          label: "清除商品数据",
          value: "IsGoods",
          tip: "选择此项，将清除所有商品信息"
        },
        {
          label: "清除其他",
          value: "IsOther",
          tip: "选择此项，将清除所有店铺资料、员工资料、用户资料、积分设置、支付方式、折扣类型等数据"
        }
      ],
      sure: false,
      code:'',
      codeState: false,
      timeDown: {
        isClick: true,
        seconds: 60,
      },
      loading: false,
    };
  },
   computed: {
    ...mapGetters({
      verCodeState: "verCodeState",
      rebuildDataState:'rebuildDataState'
    })
  },
  watch:{
    verCodeState(data){
      this.codeState = data.success?true:false;
    },
    rebuildDataState(data){
      this.$message({ message: data.message, type: data.success ? "success" : "error" })
      this.loading = false
    }
  },
  methods:{
    modifyState(item, idx){
        if(idx == 0){
            if( this.choose.IsBusi == false){
                this.$message.warning('当前项为必选项 ！')
                this.choose.IsBusi = true
            }
        }
    },
    makesure(){
      if(this.sure){
        this.sure = false;
        return
      }
      if(this.CompanyCode.length<11){
        this.$message.error('体验账号不能进行该操作');
        return
      }

      let msg = '同意因我决定而清除的数据【无法恢复】店来客旺铺记将不负责任，请输入“确认清除”表示您已确认！'
      this.$prompt(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /确认清除/,
        inputErrorMessage: '输入不正确'
      }).then(({ value }) => {
        this.sure = true
      }).catch(() => { })
    },
    getCode(){
      if(this.CompanyCode.length<11){
        this.$message.error('体验账号不能进行该操作');
        return;
      }
      if (this.timeDown.isClick) {
      this.$store.dispatch('getVerCode', this.CompanyCode)
        let time = setInterval(() => {
          if (this.timeDown.seconds == 1) {
            this.timeDown.isClick = true;
            clearInterval(time)
          }
          this.timeDown.seconds--;
          this.timeDown.isClick = false
        }, 1000)
      }
    },
    handleSubmit(){
      if(this.code && this.codeState && this.sure){
        let sendData = Object.assign({},this.choose,{
          mobileno:this.CompanyCode,
          VerifyCode: this.code
        })
        this.$store.dispatch('rebuildDataFun',sendData).then(()=>{
          this.loading = true
        })
      }
    }
  },
  mounted(){ 
    let userInfo = getUserInfo();
    this.CompanyCode = userInfo.CompanyCode;
  },
  components: {
      headerPage: () => import("@/components/header")
  }
};
</script>
<style scoped>
.el-header{
  padding: 0 !important;
}
.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}
.el-checkbox__inner{
  width: 18px;
    height: 18px;
    background-color: #DEDEDE;
}
.el-checkbox__inner.active{
      background-color: #409EFF;
    border-color: #409EFF;
}
.el-checkbox__inner.active:after{
  height: 9px;
    left: 6px;
        width: 4px;
      -webkit-transform: rotate(45deg) scaleY(1);
    transform: rotate(45deg) scaleY(1);
}
</style>

<style>
.system .el-checkbox__label{
  font-size: 16px;
}
.setparametersock { color: #333}
.setparametersock ul {
  float:left; width: 100%
}

.setparametersock ul li {
  padding: 12px 0 12px 12px;
  width: 100%; 
  float:left;
  border-bottom: 1px dashed #ddd
}
.el-header{
  padding: 0 !important;
}
.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}
.el-main{
  padding: 10px
}
</style>

