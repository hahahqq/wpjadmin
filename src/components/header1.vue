<template>
  <div id="header">
    <div class="header">
      <div class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
        <a @click.prevent="collapse">
          <img :src="sysLogo" class="inline-block full-width">
        </a>
        <span v-if="!collapsed" class="txt">{{sysName}}</span>
      </div>
      <div>
        <el-popover placement="bottom" width="260" trigger="hover" popper-class="no-margin no-padding">
          <div class="padding-sm">
            <ul>
              <li class="p-bottom-xs text-center">联系客服</li>
              <li class="marginTB-xs" v-for="(item,i) in headList[0].data" :key="i">{{item.label}}：{{item.value}}</li>
            </ul>
          </div>
          <a slot="reference" class="hitem">
            <img :src="headList[0].img">
          </a> 
        </el-popover>
        <!-- 消息 -->
        <el-popover
          placement="bottom"
          width="160"
          trigger="hover"
          popper-class="no-margin no-padding"
        >
          <div v-if="msgList.length>0" class="padding-sm">
            <router-link
              v-for="item in msgList"
              :key="item.RN"
              v-if="item.BILLID"
              :to="{ path: '/bespeak',query:{Filter:item.PHONENO,date:item.DATESTR} }"
              class="block"
            >
              <span>{{item.NAME}}</span>
              <span>{{item.DATESTR}}</span>
            </router-link>
          </div>
          <div v-else class="padding-sm">暂无消息</div>
          <a slot="reference" class="hitem">
            <el-badge
              :value="msgNum"
              v-if="msgList.length>0"
              class="pull-right"
              style="margin-left:-12px;"
            ></el-badge>
            <img :src="headList[1].img">
          </a>
        </el-popover>
        <el-popover
          placement="bottom"
          width="200"
          trigger="hover"
          popper-class="no-margin no-padding"
        >
          <div class="padding-sm">
            <img :src="headList[5].img" class="full-width">
            <div class="paddingTB-sm">{{headList[5].text}}</div>
          </div>
          <a slot="reference" class="hitem"> <img :src="headList[2].img"> </a>
        </el-popover>
        <el-popover
          placement="bottom-start"
          width="260"
          trigger="hover"
          @show="resetForm('ruleForm2')"
          popper-class="no-margin no-padding"
        >
          <!-- 意见 -->
          <div class="padding-sm">
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="0">
              <el-form-item label prop="PhoneNo">
                <el-input type="number" v-model.number="ruleForm2.PhoneNo" placeholder="请留下您的手机号码"></el-input>
              </el-form-item>
              <el-form-item label prop="Remark">
                <el-input type="textarea" v-model="ruleForm2.Remark" placeholder="说明您的问题或留下宝贵意见"></el-input>
              </el-form-item>
              <el-form-item class="no-m-bottom">
                <el-button-group class="full-width">
                  <el-button
                    type="primary"
                    size="small"
                    @click="submitForm2"
                    :loading="loading2"
                    style="width:50%"
                  >发 送</el-button>
                  <el-button @click="resetForm('ruleForm2')" size="small" style="width:50%">重 置</el-button>
                </el-button-group>
              </el-form-item>
            </el-form>
          </div>
          <a slot="reference" class="hitem">
            <img :src="headList[3].img">
          </a>
        </el-popover>
      </div>
      <div class="userinfo">
        <el-popover
          placement="bottom"
          width="240"
          trigger="hover"
          popper-class="no-padding"
        >
            <el-row :gutter="10" style="padding: 5px 0 5px 16px; border-bottom:1px solid #ddd">
              <el-col :span='18'>
                 <img src="/static/images/icon_user.png" class="pull-left m-right-xs" style="width:50px;">
                 <div>
                   <p>{{shopInfo.SHOPNAME}}</p>
                   <p>{{UserName}}</p>
                 </div>
              </el-col>
              <el-col :span="6">
                <el-tooltip class="item" effect="dark" content="账户信息" placement="top-start">
                  <el-button type="text" @click="$router.push('/setup/myshop')" icon='icon-chevron-right'></el-button>
                </el-tooltip>
              </el-col>
            </el-row>

            <el-button type="text" @click="isShowShop=true" class="full-width" icon='icon-exchange'> 切换店铺</el-button>
            <el-button type="text" @click="isShowPwd=true" class="full-width no-m-left border-top" icon='el-icon-edit'>修改密码</el-button>
            <el-button type="text" @click="logout()" class="full-width no-m-left border-top" icon='el-icon-document'>退出账号</el-button>

          <a slot="reference" class="userinfo-inner"><img :src="sysUserAvatar"></a>
        </el-popover>
      </div>
    </div>
    <el-dialog
      title="请选择门店"
      :visible.sync="isShowShop"
      width="300px"
      :modal-append-to-body="false"
      :before-close="handleClose"
      class="text-left"
    >
      <div class="shopListClass">
        <ul class="text-left">
          <li v-for="(item,i) in shopList" :key="i" @click="setShop(item)">
            <!-- <span>{{item.NAME}}</span> -->
            <span v-if='item.DAY >= 0'>{{item.NAME}}</span>
            <span v-else>{{item.NAME}}  <i style="color:#f00">( 已过期 )</i></span>
          </li>
        </ul>
      </div>
    </el-dialog>
    <el-dialog
      title="修改密码"
      :visible.sync="isShowPwd"
      width="350px"
      :modal-append-to-body="false"
      :before-close="handleClose"
      class="text-left"
    >
      <div>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="80px"
          class="ruleForm"
        >
          <el-form-item label="旧密码" prop="oldpass">
            <el-input type="password" v-model="ruleForm.oldpass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" :show-password='showPassW' autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" :show-password='showPassW' autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm" :loading="loading">提 交</el-button>
            <el-button @click="resetForm('ruleForm')">重 置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import { getUserInfo, getHomeData } from "@/api/index";
import { ROOT_STATE } from "@/util/define.js";
import userImg from "@/assets/userdefault.png";
import qrcodeImg from "@/assets/qrcode.png";
import mytqrcode from "@/assets/mytqrcode.png";
import MIXINS_CLEAR from "@/mixins/clearAllData";
import dayjs from 'dayjs'
import CRYPTO from "crypto-js";
export default {
  mixins: [MIXINS_CLEAR.LOGOUT],
  props: ["collapsed"],
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"))
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass")
        }
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    let checkTel = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号码不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          let myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
          if (!myreg.test(value)) {
            callback(new Error("请输入正确的手机号码"));
          } else {
            callback();
          }
        }
      }, 800);
    };
    let linkMsg = ROOT_STATE == 1 ? [
      //美业宝 121
      { label: "客服热线", value: "4008-326-327" },
      { label: "客服QQ", value: "1715816637" },
      { label: "客服微信", value: "18054282628" }
    ] : [
      // 美业通
      { label: "客服热线", value: "4008-326-327" },
      { label: "客服QQ", value: "1715816637" },
      { label: "客服手机/微信", value: "18054282628" },
      { label: "售后手机/微信", value: "18054282628" },
      { label: "微信公众号", value: "店来客软件" },
      { label: "公司网址", value: "http://www.dlaico.com" }
    ]
    return {
      showPassW: true,
      // sysName: ROOT_STATE == 1?"服装宝":"店来客美业通",
      sysName: '旺铺记',
      // sysLogo: "static/images/logo.png",
      sysLogo: 'static/images/logo_WPJ.png',
      sysUserAvatar: "static/images/logo.png",
      headList: [
        {
          img: "static/images/Contactphone.png",
          data: linkMsg
        },
        {
          img: "static/images/ic_sy_xx.png"
        },
        {
          img: "static/images/ic_sy_xz.png"
        },
        {
          img: "static/images/ic_sy_xy.png"
        },
        {
          img: userImg
        },
        { img: ROOT_STATE == 1 ? qrcodeImg : mytqrcode , text: "手机扫描即可下载 旺铺记APP" }
      ],
      shopInfo: {},
      UserName: "",
      INVALIDDATE:'',
      isShowShop: false,
      isShowPwd: false,
      loading: false,
      loading2: false,
      ruleForm: {
        oldpass: "",
        pass: "",
        checkPass: ""
      },
      rules: {
        oldpass: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ],
        pass: [
          {
            required: true,
            validator: validatePass,
            trigger: "blur"
          }
        ],
        checkPass: [
          {
            required: true,
            validator: validatePass2,
            trigger: "blur"
          }
        ]
      },
      ruleForm2: {
        Remark: "",
        PhoneNo: null
      },
      rules2: {
        Remark: [
          {
            required: true,
            message: "请输内容",
            trigger: "blur"
          }
        ],
        PhoneNo: [
          {
            required: true,
            validator: checkTel,
            trigger: "blur"
          }
        ]
      },
      msgNum: 0,
      msgList: []
    };
  },
  computed: {
    ...mapGetters({
      shopList: "shopList",
      dealState: "dealUserState",
    })
  },
  watch: {
    dealState(data) {
      this.loading = false;
      if (data.success) {
        this.isShowPwd = true
      }
      this.$message({
        message: data.message,
        type: data.success ? "success" : "error"
      })
      // this.loading2 = false;
    },
  },
  methods: {
    collapse() {
      // this.$emit("collapse");
    },
    handleClose(done) {
      this.isShowShop = false;
      this.isShowPwd = false;
      this.loading = false;
    },
    //退出登录
    logout: function() {
      let _this = this;
      this.$confirm("确认退出吗?", "提示").then(() => {
        _this.$store.dispatch("toLogOut").then(() => {
          let ip = 'http://dlaico88.cn:8080'
          _this.$store.dispatch('addServerIP', String(ip))
          _this.clearAllData();
          _this.$router.push("/login")
        })
      }).catch(() => {
        console.log("logout");
      })
    },
    //切换店铺
    setShop(item) {
      if(item.DAY < 0){
        this.$message.warning(`【${item.NAME }】 已过期， 请及时续费 ！`)
        return
      }
      this.$store.dispatch("choosingShop", item).then(() => {
        this.isShowShop = false;
        this.clearAllData();
        this.defaultData();
        this.$router.push({ path: "/home" })
      })
    },
    defaultData() {
      let homeData = getHomeData();
      if (homeData.shop) {
        this.shopInfo = Object.assign({}, homeData.shop);
        let INVALIDDATE = dayjs(this.shopInfo.INVALIDDATE).diff(dayjs(new Date().getTime()),'years')
        this.INVALIDDATE = INVALIDDATE > 20 ? '不限期限' : dayjs(new Date(this.shopInfo.INVALIDDATE)).format('YYYY-MM-DD')
      }
      this.UserName = getUserInfo().UserName;
      if (this.shopList.length == 0) {
        this.$store.dispatch("getShopList");
      }
    },
    submitForm() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.$store.dispatch("changeUserPwd", {
            OldPswd: CRYPTO.MD5(this.ruleForm.oldpass).toString(),
            NewPswd: CRYPTO.MD5(this.ruleForm.pass).toString(),
          }).then(() => {
            this.loading = true;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    submitForm2() {
      this.$refs["ruleForm2"].validate(valid => {
        if (valid) {
          this.$store.dispatch("sendUserMessage", this.ruleForm2).then(() => {
            this.loading2 = true;
          });
        } else {
          console.log("error submit !!");
          return false;
        }
      });
    },
    resetForm(name) {
      this.$refs[name].resetFields();
      this.ruleForm = { oldpass: "", pass: "", checkPass: "" }
      this.ruleForm2 = { Remark: "",  PhoneNo: "" };
    }
  },
  created() {
    this.defaultData()
  }
};
</script>
<style scoped lang="scss">
.header {
  height: 50px;
  line-height: 50px;
  background: #484848;
  color: #fff;
  text-align: right;
  div {
    display: inline-block;
  }
  .hitem {
    cursor: pointer;
    display: inline-block;
    padding: 0 20px;
    img {
      width: 25px;
      height: 25px;
      margin: 12.5px 0;
      float: left;
    }
  }

  .userinfo {
    text-align: right;
    padding-left: 20px;
    padding-right: 35px;
    float: right;
    height: 50px;
    line-height: 50px;
    .userinfo-inner {
      cursor: pointer;
      color: #fff;
      img {
        width: 40px;
        height: 40px;
        border-radius: 20px;
        margin: 5px 0;
      }
    }
  }

  .logo {
    //width:230px;
    height: 50px;
    float: left;
    text-align: left;
    font-size: 16px;
    padding-left: 20px;
    padding-right: 20px;
    img {
      width: 40px;
      height: 40px;
      float: left;
      margin: 5px 0px;
    }

    .txt {
      color: #fff;
      padding-left: 12px;
    }
  }

  .logo-width {
    width: 240px;
  }

  .logo-collapse-width {
    width: 64px;
    padding: 0px 11px;
  }

  .tools {
    padding: 0px 23px;
    width: 14px;
    height: 50px;
    line-height: 50px;
    cursor: pointer;
  }
}
.el-popover .el-button{
  color:#666;
  text-align: left;
  padding-left: 20px
}
.el-popover .el-button:hover{
  color:#409eff;
  border-bottom: 1px solid #ddd

}
</style>
