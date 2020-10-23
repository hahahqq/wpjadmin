<template>
  <div class="memberAdd">
    <el-form :inline="false" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
      <el-form-item label="姓名" prop="Name" class="half">
        <el-input v-model="ruleForm.Name" size='small' autocomplete="off" clearable placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="PhoneNo" class="half">
        <el-input v-model.number="ruleForm.PhoneNo" type='number'  size='small' clearable placeholder="请输入手机号码"></el-input>
      </el-form-item>
      <el-form-item label="卡号" class="half">
        <el-input v-model="ruleForm.Code" size='small' clearable placeholder="请输入卡号"></el-input>
      </el-form-item>
      <el-form-item label="等级" class="half">
        <el-select v-model="ruleForm.LevelId" size='small' placeholder="请选择" class="full-width">
          <el-option v-if="memberLevelList.length==0" label="请选择等级" value="-1"></el-option>
          <el-option
            v-for="(item,i) in memberLevelList"
            :key="i"
            :label="item.NAME"
            :value="item.ID"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="有效期" class="half" v-if="dealType.type=='add'">
        <el-date-picker
          v-model="ruleForm.InvalidDate"
          type="date"
          size='small'
          value-format="timestamp"
          placeholder="选择日期"
          class="full-width"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="性别" class="half">
        <el-select v-model="ruleForm.Sex" size='small' placeholder="请选择活动区域" class="full-width">
          <el-option label="先生" :value="0"></el-option>
          <el-option label="女士" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="生日" class="half">
        <el-date-picker
          v-model="ruleForm.BirthDate"
          type="date"
          size='small'
          value-format="timestamp"
          placeholder="选择日期"
          class="full-width"
        ></el-date-picker>
      </el-form-item>
         
      <el-form-item label="密码" class="half" v-if="dealType.type=='add'">
        <el-input v-model="ruleForm.Passwd" size='small' clearable placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="启用密码" class="half" v-if="dealType.type=='edit'">
        <el-switch v-model="IsUsePassWd" active-color="#13ce66" inactive-color="#ccc"></el-switch>
      </el-form-item>
      <el-form-item label="标签" class="half">
        <el-select v-model="ruleForm.VipFlag" size='small' placeholder="请选择标签" class="full-width">
          <el-option value>全部</el-option>
          <el-option v-for="(item,i) in flagList" :key="i"
            v-if="i>0" :label="item.VIPFLAG" :value="item.VIPFLAG"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="地址" class='half' style='width:34%'>
        <el-cascader size='small'
          :options="areaOptions"
          v-model="selectedAreaOptions"
          show-all-levels
          expand-trigger="hover"
          class="full-width"
          @change="handleChange"
        ></el-cascader>
      </el-form-item>
      <el-form-item label label-width="10px" class="half">
        <el-input
          size="small"
          v-model="ruleForm.Address"
          clearable
          class="full-width"
          placeholder="请填写详细地址"
        ></el-input>
      </el-form-item>
      <el-form-item label="备注" class="clearfix">
        <el-input type="textarea" v-model="ruleForm.Remark"></el-input>
      </el-form-item>
      <el-form-item align='center'>
        <el-button type='info' plain @click="closeModal">取 消</el-button>
        <el-button type="danger" @click="submitForm" disabled v-if="memberLevelList.length==0">保 存</el-button>
        <el-button type="primary" @click="submitForm" v-else :loading="loading">保 存</el-button>
      </el-form-item>
    </el-form>
    <el-dialog width="560px" title="业绩员工选择" :visible.sync="isShowRoyalty" append-to-body>
      <royalty-sel
        @closeModal="isShowRoyalty=false"
        :pageState="isShowRoyalty"
        :money="0"
        @resultArr="selRoyaltyFun"
      ></royalty-sel>
    </el-dialog>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import { CityInfo } from "@/assets/js/area.js";
import CRYPTO from "crypto-js";
import { getUserInfo, getHomeData} from '@/api/index'
export default {
  props: {
    dealType: {
      type: Object,
      default: function() {
        return {
          type: "add",
          state: false
        };
      }
    }
  },
  data() {
    var checkTel = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号码不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
          if (!myreg.test(value)) {
            callback(new Error("请输入正确的手机号码"));
          } else {
            callback();
          }
        }
      }, 800);
    };
    return {
      pickerOptions: {
        disabledDate: time => {
          return time.getTime() < Date.now();
        }
      },
      ruleForm: {
        Code: "",
        Name: "",
        Sex: 0,
        PhoneNo: "",
        LevelId: "-1",
        BirthDate: "",
        VipFlag: "",
        Passwd: "",
        Address: "",
        Remark: "",
        InvalidDate: "",
        SaleEmpId: "",
        DepositMoney: "",
        QQ: "",
        WeChat: "",
      },
      rules: {
        Name: [
          {
            required: true,
            message: "请输入名称",
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
      areaOptions: CityInfo,
      selectedAreaOptions: [],
      IsUsePassWd: false,
      loading: false,
      isShowRoyalty: false,
      royaltyData: []
    };
  },

  computed: {
    ...mapGetters({
      employeeList: "employeeList",
      memberLevelList: "memberLevelList",
      dateState: "dealMemberState",
      itemInfo: "memberItemInfo",
      flagList: "memberFlagList",
      dataList: "memberList",
      dataListState: "memberListState",
      autoVipCodeState: 'getAutoVipCodeState'
    })
  },
  watch: {
    autoVipCodeState(data){
      console.log(data)
      if(data.success){
        this.ruleForm.Code = data.data.Code
      }
    },
    dateState(data) {
      if (this.loading) {
        this.$message({
          message: data.message,
          type: data.success ? "success" : "error"
        });
        this.loading = false;
      }
      if (data.success) {
        // this.closeModal("resetList");
        Object.assign(this.$data, this.$options.data());
        this.$emit("resetList");

        let sendData = {
          PN: 1,
          Filter: "",
          Status: -1,
          LevelName: "",
          VipFlag: ""
        }
        this.$store.dispatch("getMemberList", sendData).then(() => {
          this.$emit('childByData',  [...this.dataList])
        });
      }
    }
  },
  methods: {
    handleChange(value){
      console.log(value)
    },
    closeModal(type) {
      Object.assign(this.$data, this.$options.data());
      this.$emit("closeModal");
    },
    submitForm() {
      var _this = this;
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          _this.loading = true;
          _this.submitfun();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    submitfun() {
      let address = this.ruleForm.Address == '' ? this.getAreaLabel() : this.getAreaLabel() + this.ruleForm.Address
      let sendData = Object.assign({}, this.ruleForm, {
        Address: address
      });
      if (this.dealType.type == "add") {
        sendData.Passwd = this.ruleForm.Passwd ? CRYPTO.MD5(this.ruleForm.Passwd).toString() : "";
        sendData.IsUsePassWd = 1;
        this.$store.dispatch('addNewMember', sendData)
      }
      if (this.dealType.type == "edit") {
        sendData.id = this.itemInfo.ID;
        sendData.STATUS = this.itemInfo.STATUS;
        sendData.IsUsePassWd = this.IsUsePassWd;
        sendData.Passwd = this.itemInfo.PASSWORD;
        this.$store.dispatch('editTheMember', sendData)
      }
    },
    getAreaLabel() {
      let seled = [...this.selectedAreaOptions];
      let areaStr = "";
      if (seled.length == 0) return areaStr;
      for (let i = 0; i < this.areaOptions.length; i++) {
        if (this.areaOptions[i].value == seled[0]) {
          areaStr += this.areaOptions[i].label + " ";
          for (let j = 0; j < this.areaOptions[i].children.length; j++) {
            if (this.areaOptions[i].children[j].value == seled[1]) {
              areaStr += this.areaOptions[i].children[j].label + " ";
              if(this.areaOptions[i].children[j].children != undefined){
                let karr = [...this.areaOptions[i].children[j].children];
                for (let k = 0; k < karr.length; k++) {
                  if (karr[k].value == seled[2] && seled.length > 2) {
                    areaStr += karr[k].label + " ";
                    break;
                  }
                }
              }
              break;
            }
          }
          break;
        }
      }
      return areaStr;
    },
    setAddress(address) {
      let seled = address.split(" ");
      let areaStr = [];
      let defauleArr = [...this.areaOptions];
      for (let i = 0; i < defauleArr.length; i++) {
        if (defauleArr[i].label == seled[0]) {
          areaStr.push(defauleArr[i].value);
          for (let j = 0; j < defauleArr[i].children.length; j++) {
            if (defauleArr[i].children[j].label == seled[1]) {
              areaStr.push(defauleArr[i].children[j].value);
              if(defauleArr[i].children[j].children != undefined){
                let karr = [...defauleArr[i].children[j].children];
                for (let k = 0; k < karr.length; k++) {
                  if (karr[k].label == seled[2]) {
                    areaStr.push(karr[k].value);
                    break;
                  }
                }
              }
              break;
            }
          }
          break;
        }
      }
      this.selectedAreaOptions = [...areaStr];
      this.ruleForm.Address = seled[3];
    },
    selRoyaltyFun: function(arr) {
      this.royaltyData = [...arr];
      this.isShowRoyalty = false;
    }
  },
  mounted() {
    if (this.memberLevelList.length > 0) {
      this.ruleForm.LevelId = this.memberLevelList[0].ID;
    }
    console.log(getUserInfo().CompanyConfig.AUTOGENVIPCODE, this.dealType )
    if (this.dealType.state && this.dealType.type == "edit") {
      for (let key in this.ruleForm) {
        let kk = key.toUpperCase();
        this.ruleForm[key] = this.itemInfo[kk];
      }
      this.ruleForm.PhoneNo = parseInt(this.itemInfo.MOBILENO);
      this.IsUsePassWd = this.itemInfo.ISUSEPASSWD ? true : false;
      if (this.itemInfo.ADDRESS) {
        this.setAddress(this.itemInfo.ADDRESS);
      }
    }else{
      console.log('111')
      if(getUserInfo().CompanyConfig.AUTOGENVIPCODE ){
        this.$store.dispatch('getAutoVipCode', {})
      }
    }
  },
  beforeCreate() {
    let list1 = this.$store.state.employee.employeeList;
    let list2 = this.$store.state.member.memberLevelList;
    let list3 = this.$store.state.member.memberFlagList;
    if (list1.length == 0) {
      this.$store.dispatch("getEmployeeList", {}).then(() => {});
    }
    if (list2.length == 0) {
      this.$store.dispatch("getMemberLevel").then(() => {});
    }
    if (list3.length == 0) {
      this.$store.dispatch("getMemberFlag");
    }
  },
  components: {
    royaltySel: () => import("@/components/selected/selroyalty.vue")
  }
};
</script>
<style>
.memberAdd .half {
  width: 33.33%;
  margin-right: 0px;
  float: left;
}

.memberAdd .half .el-date-editor.el-input {
  width: 100% !important;
}
.memberAdd .el-form-item{
  margin-bottom:16px;
}
.memberAdd .el-form-item__content {
  line-height: 40px;
}
</style>
