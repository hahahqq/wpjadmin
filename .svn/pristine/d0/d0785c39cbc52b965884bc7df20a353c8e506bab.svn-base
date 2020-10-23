<template>
  <div>
    <el-form :inline="false" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="商家名称" prop="CompanyName">
        <el-input v-model="ruleForm.CompanyName" autocomplete="off" clearable placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="所属行业" prop="TradeID">
        <el-select v-model="ruleForm.TradeID" placeholder="请选择" class="full-width">
          <el-option v-if="industryList.length==0" label="请选择" value="-1"></el-option>
          <el-option v-for="(item,i) in industryList" :key="i" :label="item.NAME" :value="item.ID"></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="营业执照号" prop="LicenseNo">
        <el-input
          v-model.number="ruleForm.LicenseNo"
          type="number"
          min="0"
          clearable
          placeholder="请输入营业执照号"
        ></el-input>
      </el-form-item> -->
      <el-form-item label="联系人" prop="Linker">
        <el-input v-model="ruleForm.Linker" clearable placeholder="请输入联系人名称"></el-input>
      </el-form-item>
      <el-form-item label="联系手机" prop="PhoneNo">
        <el-input v-model="ruleForm.PhoneNo" clearable placeholder="请输入联系手机"></el-input>
      </el-form-item>
      <!-- <el-form-item label="联系QQ">
        <el-input v-model="ruleForm.QQ" clearable placeholder="请输入联系QQ"></el-input>
      </el-form-item> -->
      <el-form-item label="公司地址" prop="Address">
        <el-input v-model="ruleForm.Address" clearable placeholder="请输入公司地址"></el-input>
      </el-form-item>
      <!-- <el-form-item label="省份" prop="ProvinceID">
        <el-select v-model="ruleForm.ProvinceID" placeholder="请选择" @change="addressfun1">
          <el-option v-if="provinceList.length==0" label="请选择" value="-1"></el-option>
          <el-option v-for="(item,i) in provinceList" :key="i" :label="item.NAME" :value="item.ID"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="城市" prop="CityID" v-if="ruleForm.ProvinceID">
        <el-select v-model="ruleForm.CityID" placeholder="请选择" @change="addressfun2">
          <el-option v-if="cityList.length==0" label="请选择" value="-1"></el-option>
          <el-option v-for="(item,i) in cityList" :key="i" :label="item.NAME" :value="item.ID"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="区县" prop="DistrictID" v-if="ruleForm.CityID">
        <el-select v-model="ruleForm.DistrictID" placeholder="请选择">
          <el-option v-if="districtList.length==0" label="请选择" value="-1"></el-option>
          <el-option v-for="(item,i) in districtList" :key="i" :label="item.NAME" :value="item.ID"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="短信签名">
        <el-input v-model="ruleForm.SmsSign" clearable placeholder="请输入短信签名"></el-input>
      </el-form-item>

      <el-form-item label="是否修改签名">
        <el-switch v-model="ruleForm.isChanageSign" active-color="#13ce66" inactive-color="#ccc"></el-switch>
      </el-form-item>

      <el-form-item label="业务描述" class="clearfix">
        <el-input type="textarea" v-model="ruleForm.Remark"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm" :loading="loading">保 存</el-button>
        <el-button @click="closeModal">取 消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      loading: false,
      ruleForm: {
        CompanyName: "",
        TradeID: "",
        LicenseNo: "",
        Linker: "",
        PhoneNo: "",
        Address: "",
        QQ: "",
        ProvinceID: "",
        CityID: "",
        DistrictID: "",
        Remark: "",
        SmsSign: "",
        isChanageSign: true
      },
      rules: {}
    };
  },
  props: ["propsData"],
  computed: {
    ...mapGetters({
      dataInfo: "myinfo",
      dataState: "myinfoState",
      provinceList: "provinceList",
      cityList: "cityList",
      districtList: "districtList",
      addressState: "addressState",
      industryList: "industryList"
    })
  },
  watch: {
    propsData(data) {
      this.defaultData();
    },
    dataState(data) {
      this.loading = false;
      this.$message({
        message: data.message, type: data.success ? 'success' : 'error'
      })
    }
  },
  methods: {
    closeModal(type) {
      Object.assign(this.$data, this.$options.data());
      if (type == "resetList") {
        this.$emit("resetList");
      } else {
        this.$emit("closeModal");
      }
    },
    addressfun1: function(v) {
      this.$store.dispatch("getCity", { Pid: v }).then(() => {
        this.ruleForm.CityID = "";
      });
    },
    addressfun2: function(v) {
      this.$store.dispatch("getDistrict", { Pid: v }).then(() => {
        this.ruleForm.DistrictID = "";
      });
    },
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$store.dispatch("editMyInfo", this.ruleForm).then(() => {
            this.loading = true
            this.$emit('resetList')
          })
        }
      })
    },
    defaultData() {
      if (this.provinceList.length == 0) {
        this.$store.dispatch("getProvince", {});
      }
      if (this.industryList.length == 0) {
        this.$store.dispatch("getIndustry");
      }
      this.ruleForm={
        CompanyName: this.dataInfo.name,
        TradeID: this.dataInfo.tradeid,
        LicenseNo: '',
        Linker: this.dataInfo.linker,
        PhoneNo: this.dataInfo.phoneno,
        Address: this.dataInfo.address,
        QQ: '',
        ProvinceID: '',
        CityID: '',
        DistrictID: '',
        Remark: this.dataInfo.ProductRemark,
        SmsSign: this.dataInfo.SmsSign,
        isChanageSign: this.dataInfo.IsUseSign
      }
    }
  },
  mounted() {
    this.defaultData()
  }
};
</script>
