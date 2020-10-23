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
                <el-main style="padding: 10px">

                  <div v-loading="loading" class='rechargeTop-bacse'>
                    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px" class="ruleForm">
                      <el-form-item label="选择会员">
                        <el-tooltip placement="right" size='small'>
                          <div slot="content">
                            <div v-if="Object.keys(selmemberArr).length>0">
                              <span v-for="(item ,i) in selmemberArr" :key="i">
                                <i v-if="i>0">，</i>
                                {{item.NAME}}
                              </span>
                            </div>
                            <span v-else>请选择会员</span>
                          </div>

                          <el-button size="small" @click="isShowFirstPopup=true;">
                            <span v-text="Object.keys(selmemberArr).length>0?'已选'+Object.keys(selmemberArr).length+'人':'请选择'"></span>
                          </el-button>
                        </el-tooltip>
                      </el-form-item>

                      <el-form-item label="使用规则" class="full-width">
                          <span>满</span>
                          <el-input size="small"
                              v-model.number="ruleForm.LimitMoney"
                              type="number"
                              min="0"
                              class="text-center"
                              style="width:100px"
                          ></el-input>
                          <span>元可使用</span>
                      </el-form-item>

                      <el-form-item label="优惠金额" >
                        <el-input size="small" v-model.number="ruleForm.Money"></el-input>
                      </el-form-item>

                      <el-form-item label="有效时间" style="display:table">
                        <el-date-picker size="small" v-model="dateBE" type="daterange" value-format="timestamp" range-separator="至"
                          start-placeholder="开始日期" end-placeholder="结束日期" style="width:100%;">
                        </el-date-picker>
                      </el-form-item>

                      <el-form-item label="是否定向" style="display:table">
                        <el-switch  v-model="ruleForm.IsLitmitVip"></el-switch>
                      </el-form-item>

                      <!-- <el-form-item label="联系方式" class="full-width">
                        <el-input v-model.number="ruleForm.Tel" type="number" min=0></el-input>
                      </el-form-item> -->

                      <el-form-item label="短信通知" class="full-width">
                        <el-switch v-model="ruleForm.IsSMS"></el-switch>
                      </el-form-item>

                      <el-form-item label="店铺" class="full-width">
                        <el-checkbox-group size="small" v-model="ShopList">
                          <el-checkbox v-for="(item,i) in shopList" :key="i" :label="item.ID" border>{{item.NAME}}</el-checkbox>
                        </el-checkbox-group>
                      </el-form-item>

                      <!-- <el-form-item label="地址">
                        <el-input size="small" v-model="ruleForm.Address"></el-input>
                      </el-form-item> -->

                      <el-form-item label="使用说明" class="full-width">
                        <el-input size="small" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="ruleForm.Remark">
                        </el-input>
                      </el-form-item>

                      <el-form-item class="full-width">
                        <el-button type="primary" @click="handleSubmit(1)" :loading="loading">保 存</el-button>
                        <el-button @click="handleSubmit(0)">重 设</el-button>
                      </el-form-item>
                    </el-form>
                    <!-- memeberTable -->
                    <el-dialog width="80%" title="选择会员" :visible.sync="isShowFirstPopup" append-to-body style="max-width:100%;">
                      <selMember @closeModal="isShowFirstPopup=false" @resetList='isShowFirstPopup=false' :vipListData='vipListData' :isArr="true"></selMember>
                    </el-dialog>
                  </div>
                  </el-main>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import MIXINS from "@/mixins/index";
import MIXINS_MARKETING from "@/mixins/marketing.js";
export default {
  mixins: [MIXINS.IS_SHOW_POPUP, MIXINS_MARKETING.MARKETING_MENU],
  data() {
    return {
      ruleForm: {
        ImgName: "",
        ShopList: "",
        Money: 0,
        Qty: 0,
        Remark: "",
        BeginDate: "",
        EndDate: "",
        Tel: null,
        Address: "",
        LimitMoney: 0,
        IsLitmitVip: true,
        LitmitVipList: "",
        IsSMS: true
      },
      rules: {},
      ShopList: [], //为空=适用全部，多个店铺用逗号分隔(15925,15926),默认为空 . add
      dateBE: [],
      loading: false
    };
  },
  computed: {
    ...mapGetters({
      dataState: "dealMarketingState",
      shopList: "shopList",
      selmemberArr: "selmemberArr",
      isAllMember: 'isAllMember'
    })
  },
  watch: {
    dataState(data) {
      this.loading = false;
      if (data.success) {
        this.$message({
          type: "success",
          message: data.message
        });

        this.$store
        .dispatch("selectingMember", {
          isArr: false,
          data: []
        })

      } else {
        this.$message({
          type: "error",
          message: data.message
        });
      }
    }
  },
  mounted() {
    this.defaultData();
  },
  methods: {
     vipListData(data){
        console.log(data)
     },
    handleSubmit(type) {
      if (type == 1) {
        let marr = [];
        let sendData = Object.assign({}, this.ruleForm, {
          IsLitmitVip: this.ruleForm.IsLitmitVip ? true : false,
          IsSMS: this.ruleForm.IsSMS ? true : false
        });
        for (let i = 0; i < this.selmemberArr.length; i++) {
          marr.push({
            VipID: this.selmemberArr[i].ID,
            MobileNo: this.selmemberArr[i].MOBILENO,
            MobileName: this.selmemberArr[i].NAME
          });
        }
        sendData.LitmitVipList = JSON.stringify(marr);
        if (this.ShopList.length > 0) {
          sendData.ShopList = this.ShopList.join(",");
        }
        sendData.Qty = Object.keys(this.selmemberArr).length
        sendData.BeginDate = this.dateBE[0] == undefined ? 1 : this.dateBE[0]
        sendData.EndDate = this.dateBE[0] == undefined ? 9999999999999 : this.dateBE[1]
        sendData.AllVip = this.isAllMember
        sendData.AllVipType = this.isAllMember ? 1 : 0
        this.$store.dispatch("addMCoyponAction", {
          type: "add",
          data: sendData
        }).then(() => {
          this.loading = true;
        });

      } else {
        Object.assign(this.$data, this.$options.data());
        this.$store.dispatch("selectingMember", {
          isArr: true,
          data: []
        });
      }
    },
    defaultData() {
      if (this.shopList.length == 0) {
        this.$store.dispatch("getShopList");
      }
    }
  },
  components: {
    selMember: () => import("@/components/selected/selmember"),
    headerPage: () => import("@/components/header")
  },

};
</script>
<style scoped>
.rechargeTop-bacse >>>.el-form-item{
    margin-bottom: 14px !important;
}
.ruleForm {
  max-width: 980px;
}

.ruleForm .el-form-item {
  width: 49%;
  display: inline-block;
}

.ruleForm .el-form-item.full-width {
  width: 100%;
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
