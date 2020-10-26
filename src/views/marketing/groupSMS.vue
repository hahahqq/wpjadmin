<template>
  <el-container>
    <el-header style="height: 50px">
      <headerPage></headerPage>
    </el-header>
    <el-container>
      <el-aside width="100px">
        <section style="min-width: 100px">
          <memberMenu :activePath="activePath" :routesList="routesList" :width="100"></memberMenu>
        </section>
      </el-aside>
      <el-container>
        <div class="full-width padding-sm m-bottom-sm">
          <!-- <el-main style="padding: 10px 10px 20px; margin-bottom: 20px"> -->
          <div style="max-width: 900px">
            <div class="pull-right">
              <div class="showremark">
                <el-input
                  type="textarea"
                  :rows="25"
                  disabled
                  v-model="SmsRemarks"
                  size="medium"
                ></el-input>
              </div>
            </div>
            <div style="max-width: 490px" class="m-rop-sm">
              <div class="padding-sm rounded-xs" style="background: #edf5f9">
                <div :class="isAll ? 'block' : 'inline-block'" style="padding: 6px 0">
                  <span>是否全选</span>
                  <el-switch v-model="isAll" @change="isAllFun"></el-switch>
                  <span v-if="isAll" class="pull-right">总人数：{{ VipCount }}</span>
                </div>
                <el-button
                  v-if="!isAll"
                  @click="isShowFirstPopup = true"
                  size="small"
                  class="pull-right"
                >
                  添加会员
                </el-button>

                <el-input
                  type="textarea"
                  :rows="8"
                  placeholder="请在这里填写短信内容..."
                  v-model="SmsRemark"
                  @change="changeWrite"
                  class="marginTB-sm"
                ></el-input>
                <div class="text-right">
                  <span class="pull-left">
                    剩余短信
                    <i style="color: #f00">{{ companyInfo.SMSNumber }}</i>
                    条
                  </span>
                  <span>
                    <el-button @click="onSubmit" type="primary" size="small" :loading="loading">
                      发 送
                    </el-button>
                  </span>
                </div>
              </div>
              <div v-show="!isAll">
                <el-collapse class="collapseStyle">
                  <el-collapse-item>
                    <template slot="title">
                      <i class="header-icon el-icon-message"></i>
                      查看已选会员 （{{ selmemberArr.length }}）
                    </template>
                    <div v-for="(item, i) in selmemberArr" :key="i">
                      <span>{{ item.NAME }}</span>
                      <span>{{ item.MOBILENO }}</span>
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </div>
              <div class="font-12">
                <p class="m-top-sm">
                  已输入
                  <span style="color: #f00">{{ SmsRemark.length + fixFontLength }}</span>
                  个字（含退订回T、会员名和【短信签名】），当前内容按
                  <span style="color: #f00">{{ onStatistics }}</span>
                  条计费
                </p>
                <p class="m-top-sm" style="color: #999">
                  注: 因会员名长度不一,计算时会有误差,以实际收到内容为准
                </p>
                <div class="marginTB-md">
                  <div class="m-bottom-sm font-14">
                    <b>短信须知：</b>
                  </div>
                  <ul>
                    <li class="marginTB-xs">
                      1、按70字作为一条短信计算，若超过则之后更多内容按67字作为一条计算（含退订回T、会员名和【短信签名】）；
                    </li>

                    <li class="marginTB-xs">
                      2、少量短信30分钟左右到达，群发短信60分钟左右到达，节假日略有延迟；
                    </li>

                    <li class="marginTB-xs">3、短信发送时间：8:00-18:00;</li>

                    <li class="marginTB-xs">
                      4、根据工信部《通信短信息服务管理规定》要求，所有营销短息需在结尾加退订回T，旺铺记已在短信内预置，无需重复添加；
                    </li>

                    <li class="marginTB-xs">5、请规范短信内容，随意内容可能会被短信平台过滤。</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- memeberTable -->
            <el-dialog
              width="80%"
              title="选择会员"
              :visible.sync="isShowFirstPopup"
              append-to-body
              style="max-width: 100%"
            >
              <selMember @closeModal="isShowFirstPopup = false" :isArr="true"></selMember>
            </el-dialog>
          </div>
          <!-- </el-main> -->
        </div>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import MIXINS from "@/mixins/index";
import img from "@/assets/sms.png";
import { getHomeData, getUserInfo } from "@/api/index";
import MIXINS_MARKETING from "@/mixins/marketing.js";
export default {
  mixins: [MIXINS.IS_SHOW_POPUP, MIXINS_MARKETING.MARKETING_MENU],
  data() {
    return {
      SmsRemark: "",
      img: img,
      loading: false,
      isAll: false,
      VipCount: "",
      SmsRemarks: "",
      fixFontLength: 0,
      companyInfo: {}
    };
  },
  computed: {
    ...mapGetters({
      selmemberArr: "selmemberArr",
      dataState: "dealMarketingState",
      memberCount: "memberCount",
      marketingSmStage: "marketingSmStage"
    }),
    onStatistics() {
      let remark = this.SmsRemark.length + this.fixFontLength;
      let content;
      if (remark <= 70) {
        content = 1;
      } else {
        content = Math.ceil(remark / 67);
      }
      this.SmsRemarks = "【" + this.companyInfo.SmsSign + "】会员：" + this.SmsRemark + "退订回T";
      return content;
    }
  },
  watch: {
    dataState(data) {
      this.loading = false;
      if (data.success) {
        this.$message({
          type: "success",
          message: data.message + "，短信已发出"
        });
      } else {
        this.$message({
          type: "error",
          message: data.message
        });
      }
    },
    isAll(data) {
      if (data) {
        this.$store.dispatch("getMemberCount");
      }
    },
    marketingSmStage(data) {
      this.companyInfo = data;
      this.fixFontLength = 9 + data.SmsSign.length;
    },
    memberCount(data) {
      this.VipCount = data.success ? data.data.VipCount : 0;
    }
  },
  methods: {
    isAllFun() {
      if (this.isAll == false) {
        this.VipCount = 0;
      }
    },
    onSubmit() {
      if (!this.isAll && (this.selmemberArr.length == 0 || !this.SmsRemark)) {
        this.$message({
          type: "error",
          message: "请选择会员与填写内容"
        });
        return;
      }
      // if(this.companyInfo.SMSNumber == 0 || this.VipCount > this.companyInfo.SMSNumber){
      //   this.$message.error('剩余短信条数不足 ！')
      //   return
      // }
      let newArr = [],
        isNumber = true;
      for (let i = 0; i < this.selmemberArr.length; i++) {
        if (isNaN(this.selmemberArr[i].MOBILENO)) {
          isNumber = false;
          break;
        }
        newArr[i] = {
          MobileNo: this.selmemberArr[i].MOBILENO,
          MobileName: this.selmemberArr[i].NAME
        };
      }
      if (!isNumber) {
        this.$message({
          type: "error",
          message: "会员电话号码存在问题！"
        });
        return;
      }

      this.$store
        .dispatch("setSMSAction", {
          MobileList: this.isAll ? "{}" : JSON.stringify(newArr),
          SmsRemark: this.SmsRemark,
          AllVip: ~~this.isAll
        })
        .then(() => {
          this.loading = true;
        });
    },
    changeWrite(index) {
      console.log(index.length);
    }
  },
  components: {
    selMember: () => import("@/components/selected/selmember"),
    headerPage: () => import("@/components/header")
  },
  mounted() {
    this.$store.dispatch("getSmsSign", {});
  }
};
</script>

<style scoped>
.collapseStyle >>> .el-collapse-item__header {
  display: -webkit-box;
}
.showremark {
  width: 400px;
  height: 600px;
  font-weight: bold;
  /* border: solid 1px #61656E; */
}

.member-header {
  display: flex;
  align-items: center;
  height: 50px;
}
.center-title {
  width: 100px;
  text-align: center;
  height: 50px;
  line-height: 50px;
  border: solid 1px #d7d7d7;
}
.center-cont {
  width: 100px;
  text-align: center;
  height: 50px;
  line-height: 50px;
}
.el-header {
  padding: 0 !important;
}
.shop {
  display: flex;
  align-items: center;
  height: 50px;
  position: relative;
}
.shop .name {
  position: absolute;
  right: 50px;
  height: 50px;
  line-height: 50px;
  width: 150px;
  text-align: center;
  top: 0;
}
.el-header,
.el-footer {
  background-color: #fff;
  color: #333;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.content-eightys {
  display: flex;
  align-items: center;
  width: 100%;
  height: 80px;
  background: #fff;
}
</style>

