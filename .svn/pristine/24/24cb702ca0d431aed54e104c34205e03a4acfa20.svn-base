<template>
  <div class="f-botton-fssock" style="height: 100%;">
    <div class="f-botton-fs" style="height: 100%;">
      <el-row :gutter="24" style="height: 100%;">
        <el-col :span="8" style="border-right: 10px solid rgba(234, 226, 213, 1);height: 100%;position: relative;">
          <dropdown @getmemberID="getmemberID" :details="datalistval"></dropdown>
          <el-form label-width="80px" class="fastc_top">
            <el-form-item label="支付金额">
              <el-input v-model="payMoney" autocomplete="off" class="full-width" @keyup.native="inputpayMoney" placeholder="0.00"></el-input>
            </el-form-item>
            <el-form-item label="赠送金额">
              <el-input v-model="giveMoney" autocomplete="off" @keyup.native="inputgiveMoney" class="full-width" placeholder="0.00"></el-input>
            </el-form-item>
            <el-form-item label="合计金额">
              <el-input v-model="totalMoney" autocomplete="off" class="full-width" placeholder="0.00" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="业绩员工">
              <el-input placeholder="请选择业绩员工" auto-complete="off" :disabled="true" class="Choiceinput" v-model="ruleFormsock.AllselecteSaleEmpId" @click.native="selecteSaleEmpId"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="ruleFormsock.Remark" autocomplete="off" class="full-width"></el-input>
            </el-form-item>
          </el-form>
          <div class="timescountc_left_footer" ref="footer">
            <div class="f_commodityc-left">
              <div class="pull-right">
                <el-button type="success" @click="closeModal">取消</el-button>
                <el-button type="danger" @click="Rechargeok">充值</el-button>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple"></div>
        </el-col>
      </el-row>
    </div>
    <!-- 选择业绩员工 -->
    <el-dialog title="选择业绩员工" :visible.sync="dialogFormVisible">
      <div class="employeetitle">充值金额：<i class="com_color">{{payMoney}}</i>元，按金额的<i class="com_color">{{ruleFormsock.getfastcExtract}}</i>提成，员工可的<i class="com_color">{{ruleFormsock.ExtractMoney}}</i>元提成</div>
      <div class="dialog-footer employee_ms">
        <el-col :span="24">
          <el-form :inline="true" :model="ruleForm[0]" class="fastc_top">
            <el-col :span="8">
              <el-form-item label="员工" class="half" width="30%">
                <el-select v-model="ruleForm[0].SaleEmpIdfirst" placeholder="" class="full-width" @change="SaleEmpIdfirst">
                  <el-option v-for="(item,i) in employeeList" :key="i" :label="item.NAME" :value="item.ID"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="分享%" class="half">
                <el-input v-model="ruleForm[0].share"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="提成" class="half">
                <el-input v-model="ruleForm[0].Extract" autocomplete="off" class="full-width"></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-col>
        <el-col :span="24">
          <el-form :inline="true" :model="ruleForm[1]" class="fastc_top">
            <el-col :span="8">
              <el-form-item label="员工" class="half" width="30%">
                <el-select v-model="ruleForm[1].SaleEmpIdsecond" placeholder="" class="full-width" @change="SaleEmpIdsecond">
                  <el-option v-for="(item,i) in employeeList" :key="i" :label="item.NAME" :value="item.ID"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="分享%" class="half">
                <el-input v-model="ruleForm[1].share"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="提成" class="half">
                <el-input v-model="ruleForm[1].Extract" autocomplete="off" class="full-width"></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-col>
        <el-col :span="24">
          <el-form :inline="true" :model="ruleForm[2]" class="fastc_top">
            <el-col :span="8">
              <el-form-item label="员工" class="half" width="30%">
                <el-select v-model="ruleForm[2].SaleEmpIdthird" placeholder="" class="full-width" @change="SaleEmpIdthird">
                  <el-option v-for="(item,i) in employeeList" :key="i" :label="item.NAME" :value="item.ID"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="分享%" class="half">
                <el-input v-model="ruleForm[2].share"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="提成" class="half">
                <el-input v-model="ruleForm[2].Extract" autocomplete="off" class="full-width"></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-col>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="getAllSaleEmpId">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 选择业绩员工 -->
    <!-- 充值界面 -->
    <el-dialog v-if="showRecharge" title="收银" :visible.sync="showRecharge" width="700px">
      <recharge @closeModalrecharge="showRecharge=false" :totalprice="payMoney" :isselectvip="VipId" @CashRecharge="CashRecharge" :rechargestatus='4'></recharge>
    </el-dialog>
    <!-- 充值界面 -->
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import { getDayindate } from "@/util/Printing";
import dropdown from "@/components/ssmember/dropdown";
import recharge from "@/components/Recharge/Recharge";

export default {
  data() {
    return {
      searchText: '',
      payMoney: '',
      giveMoney: '',
      totalMoney: '',
      VipId: '',
      datalistval: {},
      SaleEmpMoneyArray: [],
      ruleFormsock: {
        getfastcExtract: '',
        Remark: '',
        ExtractMoney: '',
        AllselecteSaleEmpId: ''

      },
      ruleForm: [{
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
      ],
      dialogFormVisible: false,
      showRecharge: false
    };
  },
  computed: {
    ...mapGetters({
      employeeList: "employeeList",
      storagevaluerroyaltyState: "storagevaluerroyaltyState",
      storagevaluerrechargeState: "storagevaluerrechargeState",
    })

  },
  watch: {
    storagevaluerroyaltyState(data) {
      if (data.success) {
        this.ruleFormsock.getfastcExtract = data.data.EmpAddRate * 100 + '%';
        this.ruleFormsock.ExtractMoney = (this.payMoney * data.data.EmpAddRate).toFixed(2);
      }
    },
    storagevaluerrechargeState(data) {
      if (data.success) {
        this.$message('充值成功');
        this.VipId = '';
        this.datalistval = {};
        this.SaleEmpMoneyArray = [];
        this.payMoney = '';
        this.giveMoney = '';
        this.totalMoney = '';
        this.ruleFormsock.Remark = '';
        this.ruleFormsock.AllselecteSaleEmpId = '';
        let qresurl = this.$store.state.commodityc.saveQRcodeIMG;
        getDayindate('91020223', data.data.BillId, 4, qresurl);  //充值单详情
      } else {
        this.$message(data.message);
      }
    }

  },
  methods: {
    getmemberID(data) {
      this.VipId = data;
    },
    inputpayMoney() { //支付金额
      this.payMoney = this.onlyInputnumber(this.payMoney);
      this.totalMoney = Number(this.payMoney) + Number(this.giveMoney);
    },
    inputgiveMoney() { //赠送金额
      this.giveMoney = this.onlyInputnumber(this.giveMoney);
      this.totalMoney = Number(this.payMoney) + Number(this.giveMoney);
    },

    closeModal() {
      this.payMoney = '';
      this.giveMoney = '';
      this.totalMoney = '';
      this.ruleFormsock.AllselecteSaleEmpId = '';
      this.ruleFormsock.Remark = '';
      this.VipId = '';
      this.datalistval = {};

    },
    Rechargeok() {
      if (this.VipId == '') {
        this.$message('请选择会员');
        return;
      }
      if (this.payMoney == '') {
        this.$message('请輸入支付金額');
        return;
      }

      this.showRecharge = true;

    },
    CashRecharge(data) {
      let GoodsDetaila = {}
      for (let i = 0; i < this.SaleEmpMoneyArray.length; i++) {
        GoodsDetaila[i] = this.SaleEmpMoneyArray[i]
      }
      this.showRecharge = false;
      let otherdata = {
        SaleEmpMoney: JSON.stringify(GoodsDetaila),
        VipId: this.VipId,
        Remark: this.ruleFormsock.Remark,
        GiftMoney: this.giveMoney,
        CustomerPhone: '',
        SaleEmpList: '',
      }
      let AllsendData = Object.assign({}, otherdata, data);
      this.$store.dispatch("getstoragevaluerrechargeState", AllsendData).then(() => {});
    },
    selecteSaleEmpId() {
      if (this.payMoney == '') {
        this.$message('请输入金额');
      } else {
        this.$store.dispatch("getstoragevaluerroyaltyState", {}).then(() => {});

        this.dialogFormVisible = true;
        // this.ruleFormsock.ExtractMoney=(this.ruleFormsock.consumptionMoney*0.1).toFixed(1);
        this.ruleForm[0].SaleEmpIdfirst = '';
        this.ruleForm[1].SaleEmpIdsecond = '';
        this.ruleForm[2].SaleEmpIdthird = '';
        this.ruleForm[0].share = '';
        this.ruleForm[1].share = '';
        this.ruleForm[2].share = '';
        this.ruleForm[0].Extract = '';
        this.ruleForm[1].Extract = '';
        this.ruleForm[2].Extract = '';

      }

    },
    SaleEmpIdfirst(vId) {
      if (this.ruleForm[1].SaleEmpIdsecond == '' && this.ruleForm[2].SaleEmpIdthird == '') {
        this.ruleForm[0].share = 100;
        this.ruleForm[0].Extract = this.ruleFormsock.ExtractMoney;
      }
      let obj = {};
      obj = this.employeeList.find((item) => { //这里的userList就是上面遍历的数据源
        return item.ID === vId; //筛选出匹配数据
      });
      this.ruleForm[0].Name = obj.NAME;

    },
    SaleEmpIdsecond(vId) {
      if (this.ruleForm[1].SaleEmpIdsecond != '') {
        this.ruleForm[0].share = 50;
        this.ruleForm[1].share = 50;
        this.ruleForm[0].Extract = this.ruleFormsock.ExtractMoney * 0.5;
        this.ruleForm[1].Extract = this.ruleFormsock.ExtractMoney * 0.5;
      }
      let obj = {};
      obj = this.employeeList.find((item) => { //这里的userList就是上面遍历的数据源
        return item.ID === vId; //筛选出匹配数据
      });
      this.ruleForm[1].Name = obj.NAME;

    },
    SaleEmpIdthird(vId) {
      if (this.ruleForm[1].SaleEmpIdsecond != '' && this.ruleForm[1].SaleEmpIdsecond != '') {
        this.ruleForm[0].share = 33.33;
        this.ruleForm[1].share = 33.33;
        this.ruleForm[2].share = 33.33;
        this.ruleForm[0].Extract = Math.ceil(this.ruleFormsock.ExtractMoney * 33) / 100;
        this.ruleForm[1].Extract = Math.ceil(this.ruleFormsock.ExtractMoney * 33) / 100;
        this.ruleForm[2].Extract = Math.ceil(this.ruleFormsock.ExtractMoney * 33) / 100;
      }
      let obj = {};
      obj = this.employeeList.find((item) => { //这里的userList就是上面遍历的数据源
        return item.ID === vId; //筛选出匹配数据
      });
      this.ruleForm[2].Name = obj.NAME;
    },
    getAllSaleEmpId() {
      let showEmpIdsock = [];

      if (this.ruleForm[0].SaleEmpIdfirst != '') {
        this.SaleEmpMoneyArray.push({
          EmpId: this.ruleForm[0].SaleEmpIdfirst,
          Money: this.ruleForm[0].Extract
        })
        let NamePrice = this.ruleForm[0].Name + this.ruleForm[0].Extract + '元';
        showEmpIdsock.push(NamePrice);

      }
      if (this.ruleForm[1].SaleEmpIdsecond != '') {
        this.SaleEmpMoneyArray.push({
          EmpId: this.ruleForm[1].SaleEmpIdsecond,
          Money: this.ruleForm[1].Extract
        })
        let NamePrice = this.ruleForm[1].Name + this.ruleForm[1].Extract + '元';
        showEmpIdsock.push(NamePrice);

      }
      if (this.ruleForm[2].SaleEmpIdthird != '') {
        this.SaleEmpMoneyArray.push({
          EmpId: this.ruleForm[2].SaleEmpIdthird,
          Money: this.ruleForm[2].Extract
        })
        let NamePrice = this.ruleForm[2].Name + this.ruleForm[2].Extract + '元';
        showEmpIdsock.push(NamePrice);
      }
      this.ruleFormsock.AllselecteSaleEmpId = showEmpIdsock.join(',');
      this.dialogFormVisible = false;

    }

  },
  components: {
    dropdown,
    recharge


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
.timescountc_left_footer {
  position: absolute;
  bottom: 12px;
  left: 22px;
  right: 22px;
  background: #fff;
}

.employee_ms .el-form-item__content {
  width: 70%;
}

.f-botton-fs .el-form-item__label {
  text-align: left !important;
}

.f-botton-fs .fastc_top {
  margin-top: 25px;
}

.f-botton-fssock .el-dialog__body {
  padding: 5px 20px;

}

.employeetitle {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 12px;
  overflow: hidden;
  color: #130606;
  text-align: center;
}

</style>
