<template>
  <div>
    <el-form ref="ruleForm2" label-width="100px">
      <el-form-item label="提成金额">
        <el-input type="number" v-model.number="royaltyMoney"></el-input>
      </el-form-item>
      <el-form-item label="员工">
        <el-select
          v-model="selectData"
          @change="changeFun"
          multiple
          clearable
          :multiple-limit="3"
          placeholder="请选择"
          class="full-width"
        >
          <el-option v-for="(item,i) in employeeList" :key="item.ID" :label="item.NAME" :value="i"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="提成金额" style="height:130px">
        <ul class="rounded-xs" :class="{'border':pageList.length>0}">
          <li v-for="(item,i) in pageList" :key="i" class="bg-light row-flex- paddingLR-sm">
            <span class="inline-block" style="width:100px">{{item.name}}</span>
            <span class="inline-block" style="width:100px">{{item.percent}}%</span>
            <span class="inline-block text-danger">&yen;{{item.money}}</span>
          </li>
        </ul>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit2">确 定</el-button>
        <el-button @click="onSubmit2('reset')">重 设</el-button>
        <div class="inline-block paddingLR-md"></div>
        <el-button type="primary" plain @click="closeModal">取 消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: {
    money: {
      type: [String, Number],
      default: 0
    },
    pageState: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      royaltyMoney:0,
      pageList: [],
      selectData: []
    };
  },
  computed: {
    ...mapGetters({
      employeeList: "employeeList"
    })
  },
  watch:{
    pageState(v){
      if(v){
        this.royaltyMoney = this.money
      }
    }
  },
  methods: {
    closeModal(){
      this.$emit('closeModal')
    },
    changeFun(arr) {
      let money = parseFloat(this.royaltyMoney / arr.length).toFixed(2);
      let percent = parseFloat(100 / arr.length).toFixed(2);
      this.pageList = [];
      for (let i = 0; i < arr.length; i++) {
        this.pageList.push({
          EmpId: this.employeeList[arr[i]].ID,
          Money: money,
          name: this.employeeList[arr[i]].NAME,
          percent: percent,
          money: money
        });
      }
    },
    onSubmit2(type) {
      if (type == "reset") {
        this.pageList = [];
        this.selectData = [];
      } else {
        this.$emit("resultArr", this.pageList);
      }
    }
  },
  mounted() {
    if (this.employeeList.length == 0) {
      this.$store.dispatch("getEmployeeList", {});
    }
  }
};
</script>
