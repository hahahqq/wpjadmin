<template>
  <div>
    <el-form :inline="false" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12">
          <el-form-item label="店铺名称" prop="ShopName">
            <el-input v-model="ruleForm.ShopName" autocomplete="off" clearable placeholder="请输入名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12">
          <el-form-item label="店铺编号">
            <el-input v-model="ruleForm.ShopCode" autocomplete="off" clearable placeholder="请输入名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12">
          <el-form-item label="联系人">
            <el-input v-model="ruleForm.Manager" clearable placeholder="请输入联系人姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12">
          <el-form-item label="联系电话">
            <el-input v-model.number="ruleForm.PhoneNo" type="number" clearable placeholder="请输入电话"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12">
          <el-form-item label="状态">
            <el-switch v-model="status" active-color="#13ce66" inactive-color="#ccc"></el-switch>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12">
          <el-form-item label="省份" prop="ProvinceID">
            <el-select v-model="ruleForm.ProvinceID" placeholder="请选择" @change="addressfun1">
              <el-option v-if="provinceList.length==0" label="请选择" value="-1"></el-option>
              <el-option
                v-for="(item,i) in provinceList"
                :key="i"
                :label="item.NAME"
                :value="item.ID"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12">
          <el-form-item label="城市" prop="CityID" v-if="ruleForm.ProvinceID">
            <el-select v-model="ruleForm.CityID" placeholder="请选择" @change="addressfun2">
              <el-option v-if="cityList.length==0" label="请选择" value="-1"></el-option>
              <el-option v-for="(item,i) in cityList" :key="i" :label="item.NAME" :value="item.ID"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12">
          <el-form-item label="区县" prop="DistrictID" v-if="ruleForm.CityID">
            <el-select v-model="ruleForm.DistrictID" placeholder="请选择">
              <el-option v-if="districtList.length==0" label="请选择" value="-1"></el-option>
              <el-option
                v-for="(item,i) in districtList"
                :key="i"
                :label="item.NAME"
                :value="item.ID"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24">
          <el-form-item label="详细地址" prop="Address">
            <el-input v-model="ruleForm.Address" clearable placeholder="请输入详细地址"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24">
          <el-form-item>
            <el-button type="primary" @click="submitForm" :loading="loading">保 存</el-button>
            <el-button @click="closeModal">取 消</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  props: ["propsData"],
  data() {
    return {
      ruleForm: {
        ShopCode: "",
        ShopName: "",
        Manager: "",
        Address: "",
        ProvinceID: "",
        CityID: "",
        DistrictID: "",
        PhoneNo: "",
        Status: 0
      },
      status: true,
      rules: {
        ShopName: [
          {
            required: true,
            message: "请输入名称",
            trigger: "blur"
          }
        ]
      },
      loading: false
    };
  },
  computed: {
    ...mapGetters({
      dataItem: "selshop",
      dataState: "dealShopState",
      provinceList: "provinceList",
      cityList: "cityList",
      districtList: "districtList",
      addressState: "addressState"
    })
  },
  watch: {
    propsData(data) {
      if (data.state) this.defaultData();
    },
    dataState(data) {
      this.loading = false;
      if (data.success) {
        this.$message({  message: data.message, type: "success" });
      } else {
        this.$message.error(data.message);
      }
    }
  },
  methods: {
    closeModal(type) {
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
          this.ruleForm.Status = this.status ? 0 : 1;
          this.$store.dispatch("dealShopItem", this.ruleForm).then(() => {
            this.loading = true;
            this.$emit('resetList')
          })
        }
      })
    },
    defaultData() {
      if (this.$refs.ruleForm) {
        this.$refs.ruleForm.resetFields();
      }
      if (Object.keys(this.dataItem).length > 0) {
        for (let key in this.ruleForm) {
          let UCkey = key.toUpperCase();
          this.ruleForm[key] = this.dataItem[UCkey] ? this.dataItem[UCkey] : "";
        }
        if (!this.ruleForm.ShopName) {
          this.ruleForm.ShopName = this.dataItem.NAME;
        }
        this.ruleForm.ShopID = this.dataItem.ID;
        this.ruleForm.Status = this.dataItem.ISSTOP;
        this.status = !this.ruleForm.Status ? true : false; // // 0=启用,1=停用
      } else {
        this.ruleForm = {
          ShopCode: "",
          ShopName: "",
          Manager: "",
          Address: "",
          ProvinceID: "",
          CityID: "",
          DistrictID: "",
          PhoneNo: "",
          Status: 0
        };
      }
      if (this.provinceList.length == 0) {
        this.$store.dispatch("getProvince", {});
      }
    }
  },
  mounted() {
    this.defaultData();
  }
};
</script>

