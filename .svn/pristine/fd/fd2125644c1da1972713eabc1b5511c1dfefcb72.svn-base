<template>
  <div class="YJemployee">
    <div class="YJemployee_tplone">
      <div class="shoptitle">
        <img :src="getgoodsIMGURL" alt="" class="pull-left" style="width:50px;height:50px;" onerror="this.src='static/images/shopmore.png'">
        <div class="itmeright">
          <div>
            <strong style="width:40%;display: inline-block;">{{shopitemList.goodsname}}</strong>
            <span>X{{shopitemList.Qty}}</span>
          </div>
          <div>
            <strong class="com_color" style="padding-right: 20px;">￥{{shopitemList.Price}}</strong>
            <span v-if="shopitemList.itemObj.ISEMPMONEY&&shopitemList.itemObj.GOODSMODE==0">
              按金额的<i class="com_color">{{this.shopitemList.itemObj.EMPMODE1 == 0?(showsetRoyalty+'元'): (showsetRoyalty* 100 + '%') }}</i>提成，员工可得<i class="com_color">{{showsetRoyaltyval}}</i>元提成
            </span>
            <span v-else-if="shopitemList.itemObj.ISEMPMONEY&&shopitemList.itemObj.GOODSMODE==1">
              {{shopitemList.itemObj.EMPMONEYREMARK}}
            </span>
            <span v-else class="com_color">暂未设置{{shopitemList.itemObj.GOODSMODE==0? '商品':'服务'}}提成</span>
          </div>
        </div>
      </div>
      <div class="dialog-footer employee_ms" style=" overflow: hidden;">
        <el-form :inline="false" ref="ruleForm" label-width="80px">
          <el-form-item label="员工" prop="Name" class="half" :class="{'serverhalf':shopitemList.itemObj.GOODSMODE==1}">
            <el-select v-model="ruleForm[0].SaleEmpIdfirst" placeholder="" @change="SaleEmpIdfirst" clearable>
              <el-option v-for="(item,i) in employeeList" :key="i" :label="item.NAME" :value="item.ID"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分享%" prop="Name" class="half" v-if="shopitemList.itemObj.GOODSMODE==0">
            <el-input v-model="ruleForm[0].share"></el-input>
          </el-form-item>
          <el-form-item label="提成" prop="Name" class="half" :class="{'serverhalf':shopitemList.itemObj.GOODSMODE==1}">
            <el-input v-model="ruleForm[0].Extract"></el-input>
          </el-form-item>
          <el-form-item label="员工" prop="Name" class="half" :class="{'serverhalf':shopitemList.itemObj.GOODSMODE==1}">
            <el-select v-model="ruleForm[1].SaleEmpIdsecond" placeholder="" @change="SaleEmpIdsecond" clearable>
              <el-option v-for="(item,i) in employeeList" :key="i" :label="item.NAME" :value="item.ID"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分享%" prop="Name" class="half" v-if="shopitemList.itemObj.GOODSMODE==0">
            <el-input v-model="ruleForm[1].share"></el-input>
          </el-form-item>
          <el-form-item label="提成" prop="Name" class="half" :class="{'serverhalf':shopitemList.itemObj.GOODSMODE==1}">
            <el-input v-model="ruleForm[1].Extract"></el-input>
          </el-form-item>
          <el-form-item label="员工" prop="Name" class="half" :class="{'serverhalf':shopitemList.itemObj.GOODSMODE==1}">
            <el-select v-model="ruleForm[2].SaleEmpIdthird" placeholder="" @change="SaleEmpIdthird" clearable>
              <el-option v-for="(item,i) in employeeList" :key="i" :label="item.NAME" :value="item.ID"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分享%" prop="Name" class="half" v-if="shopitemList.itemObj.GOODSMODE==0">
            <el-input v-model="ruleForm[2].share"></el-input>
          </el-form-item>
          <el-form-item label="提成" prop="Name" class="half" :class="{'serverhalf':shopitemList.itemObj.GOODSMODE==1}">
            <el-input v-model="ruleForm[2].Extract"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div slot="footer" class="dialog-footer" style="overflow: hidden;text-align: right;">
      <el-button @click="closeModal">取 消</el-button>
      <el-button type="primary" @click="YJ_primary">确 定</el-button>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import { GOODS_IMGURL } from "@/util/define"
export default {
  name: "YJemployee",
  data() {
    return {
      getgoodsIMGURL: GOODS_IMGURL + this.shopitemList.itemObj.ID + '.png',
      showsetRoyalty: this.shopitemList.itemObj.EMPMODE1 == 0 ? (this.shopitemList.itemObj.EMPMONEY1) : ((this.shopitemList.itemObj.EMPMONEY1).toFixed(2)),
      showsetRoyaltyval: this.shopitemList.itemObj.EMPMODE1 == 0 ? (this.shopitemList.Qty * this.shopitemList.itemObj.EMPMONEY1).toFixed(2) : (this.shopitemList.Qty * this.shopitemList.itemObj.EMPMONEY1 * this.shopitemList.Price).toFixed(2),
      ruleFormsock: {
        consumptionMoney: 0,
        Remark: '',
        ExtractMoney: '',
        AllselecteSaleEmpId: ''
      },
      ruleForm: [
        {
          SaleEmpIdfirst: "",
          share: '',
          Extract: '',
          Name: ''
        },
        {
          SaleEmpIdsecond: "",
          share: '',
          Extract: '',
          Name: ''
        },
        {
          SaleEmpIdthird: "",
          share: '',
          Extract: '',
          Name: ''
        }
      ]
    };
  },
  props: {
    shopitemList: {
      type: Object,
    }
  },
  computed: {
    ...mapGetters({
      employeeList: "employeeList",
    })
  },
  components: {},
  methods: {
    SaleEmpIdfirst(vId) {
      let SaleEmpIdsecond = this.ruleForm[1].SaleEmpIdsecond;
      let SaleEmpIdthird = this.ruleForm[2].SaleEmpIdthird;

      if (this.shopitemList.itemObj.GOODSMODE == 1 && this.shopitemList.itemObj.ISEMPMONEY) {
        let Price = this.shopitemList.Price;
        let EMPMONEY1 = this.shopitemList.itemObj.EMPMONEY1;
        let Qty = this.shopitemList.Qty;
        if (this.shopitemList.itemObj.EMPMODE1 == 1) {
          this.ruleForm[0].Extract = (Price * EMPMONEY1).toFixed(2) * Qty;
        } else {
          this.ruleForm[0].Extract = (EMPMONEY1 * Qty).toFixed(2);
        }
      } else {
        this.ruleForm[0].share = 100;
        let ExtractMoney = this.showsetRoyaltyval;
        this.ruleForm[0].Extract = ExtractMoney;
      }

      let obj = {};
      obj = this.employeeList.find((item) => { //这里的userList就是上面遍历的数据源
        return item.ID === vId; //筛选出匹配数据
      });
      this.ruleForm[0].Name = obj.NAME;
    },
    SaleEmpIdsecond(vId) {
      if (this.shopitemList.itemObj.GOODSMODE == 1 && this.shopitemList.itemObj.ISEMPMONEY) {
        let Price = this.shopitemList.Price;
        let EMPMONEY2 = this.shopitemList.itemObj.EMPMONEY2;
        let Qty = this.shopitemList.Qty;
        if (this.shopitemList.itemObj.EMPMODE2 == 1) {
          this.ruleForm[1].Extract = (Price * EMPMONEY2).toFixed(2) * Qty;
        } else {
          this.ruleForm[1].Extract = (EMPMONEY2 * Qty).toFixed(2);
        }

      } else {
        this.ruleForm[0].share = 50;
        this.ruleForm[1].share = 50;
        let ExtractMoney = this.showsetRoyaltyval;
        this.ruleForm[0].Extract = ExtractMoney * 0.5;
        this.ruleForm[1].Extract = ExtractMoney * 0.5;
      }

      let obj = {};
      obj = this.employeeList.find((item) => { //这里的userList就是上面遍历的数据源
        return item.ID === vId; //筛选出匹配数据
      });
      this.ruleForm[1].Name = obj.NAME;
    },
    SaleEmpIdthird(vId) {
      if (this.shopitemList.itemObj.GOODSMODE == 1 && this.shopitemList.itemObj.ISEMPMONEY) {
        let Price = this.shopitemList.Price;
        let EMPMONEY3 = this.shopitemList.itemObj.EMPMONEY3;
        let Qty = this.shopitemList.Qty;
        if (this.shopitemList.itemObj.EMPMODE3 == 1) {
          this.ruleForm[2].Extract = (Price * EMPMONEY3).toFixed(2) * Qty;
        } else {
          this.ruleForm[2].Extract = (EMPMONEY3 * Qty).toFixed(2);
        }
      } else {
        this.ruleForm[0].share = 33.33;
        this.ruleForm[1].share = 33.33;
        this.ruleForm[2].share = 33.33;
        let ExtractMoney = this.showsetRoyaltyval;
        this.ruleForm[0].Extract = (ExtractMoney / 3).toFixed(1);
        this.ruleForm[1].Extract = (ExtractMoney / 3).toFixed(1);
        this.ruleForm[2].Extract = (ExtractMoney / 3).toFixed(1);
      }
      let obj = {};
      obj = this.employeeList.find((item) => { //这里的userList就是上面遍历的数据源
        return item.ID === vId; //筛选出匹配数据
      });
      this.ruleForm[2].Name = obj.NAME;
    },
    YJ_primary() {
      let SaleEmpMoneyArray = [];
      let showEmpIdsock = [];
      if (this.ruleForm[0].SaleEmpIdfirst != '') {
        SaleEmpMoneyArray.push({
          EmpId1: this.ruleForm[0].SaleEmpIdfirst,
          EmpMoney1: this.ruleForm[0].Extract
        })
        let NamePrice = this.ruleForm[0].Name + this.ruleForm[0].Extract + '元';
        showEmpIdsock.push(NamePrice);
      }
      if (this.ruleForm[1].SaleEmpIdsecond != '') {
        SaleEmpMoneyArray.push({
          EmpId2: this.ruleForm[1].SaleEmpIdsecond,
          EmpMoney2: this.ruleForm[1].Extract
        })
        let NamePrice = this.ruleForm[1].Name + this.ruleForm[1].Extract + '元';
        showEmpIdsock.push(NamePrice);
      }
      if (this.ruleForm[2].SaleEmpIdthird != '') {
        SaleEmpMoneyArray.push({
          EmpId3: this.ruleForm[2].SaleEmpIdthird,
          EmpMoney3: this.ruleForm[2].Extract
        })
        let NamePrice = this.ruleForm[2].Name + this.ruleForm[2].Extract + '元';
        showEmpIdsock.push(NamePrice);
      }
      this.ruleFormsock.AllselecteSaleEmpId = showEmpIdsock.join(',');
      this.$emit("Receiveyjemployee", SaleEmpMoneyArray, showEmpIdsock, this.shopitemList.GoodsId);

    },
    closeModal(type) {
      this.$emit("showyjemployee");
    }


  },
  beforeCreate() {
    let list1 = this.$store.state.employee.employeeList;
    if (list1.length == 0) {
      this.$store.dispatch("getEmployeeList", {}).then(() => {
        console.log(this.$store.state.employee.employeeList);
      });
    }

  }

};

</script>
<style scoped>
.YJemployee .shoptitle {
  margin-bottom: 12px;
}

.YJemployee .YJemployee_tplone .half {
  width: 33.33%;
  margin-right: 0px;
  float: left;
}

.YJemployee .YJemployee_tplone .serverhalf {
  width: 50%;
  margin-right: 0px;
  float: left;
}

.YJemployee .shoptitle .itmeright {
  padding-left: 62px;
  line-height: 1.8;
}

</style>
