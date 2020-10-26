<template>
  <div class="login-container_sock login">
    <transition name="fade" mode="out-in">
      <div v-if="isRegister" class="login-container">
        <components :is="componentName" @closeModal="isRegister = false"></components>
      </div>
      <div v-else class="login-container">
        <el-form
          :model="ruleForm2"
          ref="ruleForm2"
          label-position="left"
          label-width="0px"
          style="height: 450px; padding-top: 10px"
        >
          <!-- <img :src="logoImg" class="block rounded-sm box-shadow" id="logo" /> -->
          <div class="login-container-title">
            <span style="color: #2589ff; font-size: 20px">登录</span>
          </div>
          <el-form-item prop="AuthCode">
            <div class="showEit-center-money-tt">
              <span>手机号码</span>
              <input
                type="text"
                v-model="ruleForm2.AuthCode"
                class="showEit-input"
                auto-complete="off"
                placeholder="请输入注册手机号"
              />
            </div>
          </el-form-item>
          <el-form-item prop="UserCode">
            <div class="showEit-center-money-tt">
              <span>用户账号</span>
              <input
                type="text"
                v-model="ruleForm2.UserCode"
                class="showEit-input"
                auto-complete="off"
                placeholder="请输入用户账号\boss"
              />
            </div>
          </el-form-item>
          <el-form-item prop="Password">
            <div class="showEit-center-money-tt">
              <span>登录密码</span>
              <input
                type="password"
                v-model="ruleForm2.Password"
                class="showEit-input"
                auto-complete="off"
                placeholder="请输入用户账号\boss"
              />
            </div>
          </el-form-item>

          <el-form-item style="width: 100%; margin-top: 30px">
            <el-row>
              <el-col :span="12" style="color: #666666; cursor: pointer">
                <span
                  @click="
                    componentName = 'forgetPwdPage';
                    isRegister = true;
                  "
                >
                  忘记密码？
                </span>
              </el-col>
              <el-col :span="12" style="text-align: right; color: #2589ff; cursor: pointer">
                <span
                  @click="
                    componentName = 'registerPage';
                    isRegister = true;
                  "
                >
                  商家注册
                </span>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item style="width: 100%; margin-top: 50px">
            <el-button
              type="primary"
              style="width: 100%"
              @click.native.prevent="onSubmit"
              :loading="loading"
            >
              <span>登录</span>
            </el-button>
          </el-form-item>

          <div class="text-center">
            <a @click="onExperience" class="textLogin">
              <el-row>
                <el-col :span="24" style="text-align: center; height: 20px">
                  <div>
                    <i v-if="loading2" class="icon-spin icon-refresh" style="color: #2589ff"></i>
                    <i v-else class="icon-refresh" style="color: #2589ff"></i>
                    <span class="textLogin-tx" style="cursor: pointer">体验一下</span>
                  </div>
                </el-col>
              </el-row>
            </a>
          </div>
        </el-form>
      </div>
    </transition>

    <el-dialog
      title="请选择门店"
      :visible.sync="dialogVisible"
      width="330px"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      :before-close="handleClose"
    >
      <div class="shopListClass">
        <ul>
          <li v-for="(item, i) in shopList" :key="i" @click="setShop(item)">
            <span v-if="item.DAY >= 0">{{ item.NAME }}</span>
            <span v-else>
              {{ item.NAME }}
              <i style="color: #f00">( 已过期 )</i>
            </span>
          </li>
        </ul>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import CRYPTO from "crypto-js";
import { mapState, mapGetters } from "vuex";
import logoImg from "@/assets/logo_WPJ.png";
import { nscreenexCodeFun } from "@/util/objectivity";
import dayjs from "dayjs";
export default {
  name: "login",
  data() {
    return {
      dialogVisible: false,
      ruleForm2: {
        AuthCode: "",
        UserCode: "",
        Password: ""
      },
      isRemember: true,
      isRegister: false,
      loading: false,
      loading2: false,
      componentName: "",
      logoImg: logoImg
    };
  },
  computed: {
    ...mapGetters({
      STimeState: "STimeState",
      loginState: "loginState",
      shopListState: "shopListState",
      shopList: "shopList",
      experienceState: "experienceState",
      changePwdState: "changePwdState",
      AgentPermission: "AgentPermission",
      severIpData: "severIpData"
    })
  },
  watch: {
    severIpData(data) {
      if (data.success) {
        let ip = data.data.OutIP != "" ? data.data.OutIP : "http://dlaico88.cn:8080";
        this.$store.dispatch("addServerIP", String(ip)).then(() => {
          let sendData = {
            AuthCode: this.ruleForm2.AuthCode,
            UserCode: this.ruleForm2.UserCode,
            Password: CRYPTO.MD5(this.ruleForm2.Password).toString()
          };
          this.toLogin(sendData);
        });
      } else {
        this.loading = false;
        this.$message.error(data.message);
      }
    },
    loginState(data) {
      if (data.success) {
        this.$store.dispatch("getPermissionInfo").then(() => {
          this.$store.dispatch("getShopList");
        });
      } else {
        this.loading = false;
        this.$message.error(data.message);
      }
    },
    shopListState(data) {
      this.loading = false;
      this.loading2 = false;
      if (data.success) {
        if (this.shopList.length > 0) {
          this.dialogVisible = true;
        } else {
          this.$router.push({ path: "/home" });
        }
      }
    },
    experienceState(data) {
      if (data.success) {
        let sendData = {
          AuthCode: data.data.authCode,
          UserCode: data.data.userCode,
          Password: data.data.password
        };
        this.toLogin(sendData);
      }
    },
    changePwdState(data) {
      if (data.success) {
        this.ruleForm2 = {
          AuthCode: "",
          UserCode: "",
          Password: ""
        };
      }
    },
    AgentPermission(data) {
      // console.log(data)
    }
  },
  methods: {
    onSubmit() {
      this.loading = true;
      var jsondatakexian = {
        usercode: this.ruleForm2.UserCode,
        authcode: this.ruleForm2.AuthCode,
        userpass: this.ruleForm2.Password
      };
      // if (this.isRemember) {
      localStorage.setItem("isRemember", JSON.stringify(this.ruleForm2));
      localStorage.setItem("isExperience", "false");
      nscreenexCodeFun(2, jsondatakexian);
      // }else{
      //   localStorage.setItem("isRemember", JSON.stringify({}));
      //   nscreenexCodeFun(3,jsondatakexian);
      // }
      this.$store.dispatch("chooseSeverIp", this.ruleForm2.AuthCode);
    },
    toLogin(data) {
      let sendData = {};
      if (data) {
        sendData = Object.assign({}, data);
      } else {
        sendData = {
          AuthCode: this.ruleForm2.AuthCode,
          UserCode: this.ruleForm2.UserCode,
          Password: CRYPTO.MD5(this.ruleForm2.Password).toString()
        };
      }
      this.$store.dispatch("toLogin", sendData).then(() => {});
    },
    handleClose(done) {
      let ip = "http://dlaico88.cn:8080";
      this.$store.dispatch("addServerIP", String(ip));
      this.dialogVisible = false;
    },
    setShop(item) {
      if (item.DAY < 0) {
        this.$message.warning(`【${item.NAME}】 已过期， 请及时续费 ！`);
        return;
      }
      console.log(this.AgentPermission);
      if (!this.AgentPermission.success) {
        this.$message({
          message: "用户账号权限存在问题，请重新登录",
          type: "error"
        });
        this.dialogVisible = false;
        return;
      }

      this.$store.dispatch("choosingShop", item).then(() => {
        this.$router.push({
          path: "/home"
        });
      });
    },
    onExperience() {
      this.$store.dispatch("toExperience").then(() => {
        this.loading2 = true;
        localStorage.setItem("isExperience", "true");
      });
    }
  },
  activated() {
    this.dialogVisible = false;
  },
  mounted() {
    let dd = localStorage.getItem("isRemember") || "{}";
    this.isRemember = dd == "{}" ? false : true;
    this.ruleForm2 = Object.assign({}, this.ruleForm2, JSON.parse(dd));
    this.$store.dispatch("getServerTime");
    this.dialogVisible = false;
  },
  components: {
    registerPage: () => import("@/components/other/register"),
    forgetPwdPage: () => import("@/components/other/forgetPwd")
  }
};
</script>
