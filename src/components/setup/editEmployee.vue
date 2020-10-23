<template>
  <div class="editEmployee">
    <el-form :inline="false" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12">
          <el-form-item label="员工姓名" prop="Name">
            <el-input v-model="ruleForm.Name" autocomplete="off" clearable placeholder="请输入员工姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12">
          <el-form-item label="员工工号" prop="Code">
            <el-input v-model="ruleForm.Code" autocomplete="off" clearable placeholder="请输入员工工号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12">
          <el-form-item label="员工职务">
            <el-input v-model="ruleForm.Position" autocomplete="off" clearable placeholder="请输入员工职务"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12">
          <el-form-item label="所属店铺" prop="ShopID">
            <el-select v-model="ruleForm.ShopID" placeholder="请选择店铺">
              <el-option label="请选择店铺" value=""></el-option>
              <el-option v-for="item in shopList" :key="item.ID" :label="item.NAME" :value="item.ID">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12">
          <el-form-item label="联系电话">
            <el-input v-model="ruleForm.MobileNo"  clearable placeholder="请输入电话"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12">
          <el-form-item label="员工生日" class="halfhh">
            <el-date-picker v-model="ruleForm.BirthDate" type="date" value-format="timestamp" placeholder="选择日期" class="full-width"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12">
          <el-form-item label="性别" prop="Sex">
            <el-select v-model="ruleForm.Sex" placeholder="请选择性别" class="full-width">
              <el-option label="男" :value="1"></el-option>
              <el-option label="女" :value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12">
          <el-form-item label="基本工资">
            <el-input v-model.number="ruleForm.BaseWages" type="number" clearable placeholder="0.00"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12">
          <el-form-item label="入职日期" class="halfhh">
            <el-date-picker v-model="ruleForm.InWorkDate" type="date" value-format="timestamp" placeholder="选择日期" class="full-width"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12">
          <el-form-item label="备注信息">
            <el-input v-model="ruleForm.Remark" clearable placeholder="请输入备注信息"></el-input>
          </el-form-item>
        </el-col>
        <!-- <el-col :xs="24" :sm="12">
          <el-form-item label="接受预约">
            <el-switch v-model="isService" active-color="#13ce66" inactive-color="#ccc"></el-switch>
          </el-form-item>
        </el-col> -->
        <el-col :xs="24" :sm="12">
          <el-form-item label="在职状态">
            <el-switch v-model="status" active-color="#13ce66" inactive-color="#ccc"></el-switch>
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
        ID:'',
        Code: "",
        Name: "",
        Sex: "1",
        Position: "",
        MobileNo: "",
        ShopID: "",
        BirthDate: "",
        IDCardNo: "",
        Remark: "",
        MobileNo: "",
        Category: "",
        BaseWages: "",
        InWorkDate: "",
        Status: 0,
        IsService: 1,
      },
      status: true,
      isService: false,
      rules: {
        Name: [{
          required: true,
          message: "请输入名称",
          trigger: "blur"
        }],
        Code: [{
          required: true,
          message: "请输入员工工号",
          trigger: "blur"
        }]
      },
      loading: false
    };
  },
  computed: {
    ...mapGetters({
      employeeitemState: "employeeitemState",
      dataItem: "selemployee",
      shopList: "shopList",
      dataList: "employeeList",
    })
  },
  watch: {
    propsData(data) {
      if (data.state) this.defaultData();
    },
    employeeitemState(data) {
      this.loading = false;
      if (data.success) {
        this.$message({
          message: data.message,
          type: "success"
        });
        this.closeModal("resetList");
      } else {
        this.$message.error(data.message);
      }
    }
  },
  methods: {
    closeModal(type) {
      // Object.assign(this.$data, this.$options.data());

      if (type == "resetList") {
        this.$emit("resetList");
      } else {
        this.$emit("closeModal");
      }
    },
    submitForm() {
      let haveSameCode = []
      if(Object.keys(this.dataItem).length == 0){
        haveSameCode = this.dataList.filter( item => item.CODE == this.ruleForm.Code)
      }else{
        haveSameCode = this.dataList.filter( item => item.CODE == this.ruleForm.Code && this.dataItem.CODE != this.ruleForm.Code )
      }

      if(haveSameCode.length > 0){
        this.$message.error('当前员工工号已存在，工号不能重复');
        return
      }
      
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.ruleForm.Status = this.status ? 0 : 1;
          this.ruleForm.IsService = this.isService ? 1 : 0;
          this.$store.dispatch("dealEmployeeItem", this.ruleForm).then(() => {
            this.loading = true;
          });
        }
      });
    },
    defaultData() {
      console.log(this.dataList , this.dataItem, Object.keys(this.dataItem).length)
      if (this.shopList.length == 0) {
        this.$store.dispatch("getShopList");
      }
      if (this.$refs.ruleForm) {
        this.$refs.ruleForm.resetFields();
      }
      if (Object.keys(this.dataItem).length > 0) {
        for (let key in this.ruleForm) {
          let UCkey = key.toUpperCase();
          this.ruleForm[key] = this.dataItem[UCkey] ? this.dataItem[UCkey] : "";
        }
        if (!this.ruleForm.Name) {
          this.ruleForm.Name = this.dataItem.NAME;
        }
        // this.ruleForm.ShopID = Number(this.ruleForm.ShopID)
        this.status = this.ruleForm.Status=='' ? true : false; // // 0=启用,1=停用
        // this.isService = this.ruleForm.IsService=='' ? false : true; // // 0=启用,1=停用
        this.ruleForm.Sex= Number(this.ruleForm.Sex) // // 0=启用,1=停用
      } else {
        this.ruleForm = {
            ID:'',
            Code: "",
            Name: "",
            Sex: "",
            Position: "",
            MobileNo: "",
            ShopID: "",
            BirthDate: "",
            IDCardNo: "",
            Remark: "",
            MobileNo: "",
            Category: "",
            BaseWages: "",
            InWorkDate: "",
            Status: 0,
            IsService: 0
        };
      }
    }
  },
  mounted() {
    this.defaultData();
  }
};

</script>
<style>
.editEmployee .halfhh .el-date-editor.el-input {
  width: 100% !important;
}

</style>
