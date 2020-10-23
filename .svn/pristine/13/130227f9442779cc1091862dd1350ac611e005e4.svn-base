<template>
  <div class="s-botton-setmealr" style="height: 100%;">
    <div class="s-botton-s" style="height: 100%;">
      <el-row :gutter="24" style="height: 100%;">
        <el-col :span="8" style="border-right: 10px solid rgba(234, 226, 213, 1);height: 100%;position: relative;">
          <dropdown @getmemberID="getmemberID" :details="datalistval"></dropdown>
          <el-form label-width="80px" class="fastc_top">
            <div class="selecttaocan">
              <el-form-item label="选择套餐">
                <el-input v-model="setmealrName" style="float: left;width: 75%;" autocomplete="off" class="full-width" disabled="disabled" placeholder="请选择套餐"></el-input>
                <el-button type="danger" style="width: 25%;" @click="selectsetmealr" :loading="loading">选择</el-button>
              </el-form-item>
              <ul class="showtaocanList" v-loading="loading" v-show="taotandatalist.length>0">
                <li v-for="(item,index) in taotandatalist" @click="selectoneTotle(item)">
                  <span class="pull-left">{{item.NAME}}</span>
                  <span class="pull-right">￥{{item.PRICE}}</span>
                </li>
              </ul>
            </div>
            <el-form-item label="套餐价格">
              <el-input v-model="setmealrPrice" autocomplete="off" :disabled="true" class="full-width" placeholder="0.00"></el-input>
            </el-form-item>
            <el-form-item label="充值次数">
              <el-input v-model="rechargecount" autocomplete="off" class="full-width" type="number"></el-input>
            </el-form-item>
            <el-form-item label="有效期限">
              <el-input v-model="writetime" autocomplete="off" class="full-width" placeholder="0.00" :disabled="true"></el-input>
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
          <el-row :gutter="20" class="timescountc_right" v-show="SGoodsListObj!='' ">
            <el-col :span="24" style="margin-bottom:15px;">
              <div class="tablelcenter totletaocan">
                <div class="menu-img">
                  <img src='static/images/shopmore.png'  width="55" height="55">
                  <div class="titlename">
                    <p data-icon="10">{{SGoodsListObj.NAME}}</p>
                    <p class="list2">
                      <span>{{SGoodsListObj.PRICE}}</span>
                    </p>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="12" style="margin-bottom:15px;" v-for="(item,i) in SGoodsList" :key="i">
              <div class="tablelcenter">
                <div class="menu-img">
                  <img src='static/images/shopmore.png'  width="55" height="55">
                  <div class="titlename">
                    <p data-icon="10">{{item.GOODSNAME}}</p>
                    <p class="list2">
                      <span>￥{{item.GOODSPRICE}}</span>
                    </p>
                  </div>
                </div>
                <div class="menu-txt com_color">
                  <strong>x{{item.QTY}}</strong>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <!-- 选择业绩员工 -->
    <el-dialog title="选择业绩员工" :visible.sync="dialogFormVisible">
      <div class="employeetitle">充值金额：<i class="com_color">{{setmealrPrice}}</i>元，按金额的<i class="com_color">{{ruleFormsock.getfastcExtract}}</i>提成，员工可的<i class="com_color">{{ruleFormsock.ExtractMoney}}</i>元提成</div>
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
      <recharge @closeModalrecharge="showRecharge=false" :totalprice="setmealrPrice" :isselectvip="VipId" @CashRecharge="CashRecharge" :rechargestatus='6'></recharge>
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
      timescountrstatus: false,
      loading: false,
      taotandatalist: [],
      setmealrName: '',
      setmealrPrice: '',
      rechargecount: '',
      writetime: '',
      SGoodsListObj: '',
      SGoodsList: [],
      rechargeGoodsList: [],
      IsInvalid: 1,
      GoodsPackId: '',
      searchText: '',
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
      setmealrselectlistState: "setmealrselectlistState",
      setmealrselectdetailState: "setmealrselectdetailState",
      setmealrtimesrechargeState: "setmealrtimesrechargeState",
    })

  },
  watch: {
    setmealrselectlistState(data) {
      if (data.success) {
        let DataArr = data.data.PageData.DataArr;
        if (DataArr.length > 0) {
          this.loading = false;
          this.taotandatalist = DataArr;
        }
      }
    },
    setmealrselectdetailState(data) {
      if (data.success) {
        this.rechargeGoodsList = [];
        this.SGoodsListObj = data.data.obj;
        this.SGoodsList = data.data.GoodsList;
        let InvalidDate = this.IsInvalid == 1 ? this.getTimeStampstatuesOutput(this.writetime) : '';
        for (let i = 0; i < this.SGoodsList.length; i++) {
          this.rechargeGoodsList.push({
            "GoodsId": this.SGoodsList[i].GOODSID,
            "Qty": this.SGoodsList[i].QTY,
            "Price": this.SGoodsList[i].GOODSPRICE,
            "IsInvalid": this.IsInvalid,
            "InvalidDate": InvalidDate

          })
        };
      }
    },

    storagevaluerroyaltyState(data) {
      if (data.success) {
        this.ruleFormsock.getfastcExtract = data.data.EmpAddRate * 100 + '%';
        this.ruleFormsock.ExtractMoney = (this.setmealrPrice * data.data.EmpAddRate).toFixed(2);
      }
    },
    setmealrtimesrechargeState(data) {
      if (this.timescountrstatus) {
        if (data.success) {
          this.$message('套餐充值成功');
          this.VipId = '';
          this.setmealrPrice = '';
          this.setmealrName = '';
          this.rechargecount = '';
          this.writetime = '';
          this.SGoodsListObj = '';
          this.SGoodsList = [];
          this.GoodsPackId = '';
          this.datalistval = {};
          this.SaleEmpMoneyArray = [];
          this.rechargeGoodsList = [];
          this.ruleFormsock.Remark = '';
          this.ruleFormsock.AllselecteSaleEmpId = '';
          this.timescountrstatus = false;
                 let qresurl=this.$store.state.commodityc.saveQRcodeIMG;
          getDayindate('91020223', data.data.BillId, 5,qresurl);
        } else {
          this.$message(data.message);
          this.timescountrstatus = false;
        }

      }

    }

  },
  methods: {
    getmemberID(data) {
      this.VipId = data;
    },
    selectsetmealr() {
      if (this.VipId == '') {
        this.$message('请选择会员');
        return;
      }
      this.loading = true;
      this.$store.dispatch("getsetmealrselectlistState", {}).then(() => {
        this.loading = false;
      });

    },
    selectoneTotle(item) {
      this.taotandatalist = [];
      this.setmealrName = item.NAME;
      this.setmealrPrice = item.PRICE;
      this.rechargecount = 1;
      if (item.ISVALIDDAY != true) {
        this.writetime = '不限期限';
        this.IsInvalid = 0;
      } else {
        this.writetime = this.gettotlemouthDay(item.VALIDDAY);
        this.IsInvalid = 1;
      }
      this.loading = true;
      this.GoodsPackId = item.ID;
      let dataid = {
        ID: this.GoodsPackId
      }
      this.$store.dispatch("getssetmealrselectdetailState", dataid).then(() => {
        this.loading = false;
        this.timescountrstatus = true;
      });

    },

    closeModal() {
      this.VipId = '';
      this.setmealrPrice = '';
      this.setmealrName = '';
      this.rechargecount = '';
      this.writetime = '';
      this.SGoodsListObj = '';
      this.SGoodsList = [];
      this.GoodsPackId = '';
      this.datalistval = {};
      this.SaleEmpMoneyArray = [];
      this.rechargeGoodsList = [];
      this.ruleFormsock.Remark = '';
      this.ruleFormsock.AllselecteSaleEmpId = '';


    },
    Rechargeok() {
      if (this.VipId == '') {
        this.$message('请选择会员');
        return;
      }
      if (this.setmealrPrice == '') {
        this.$message('请選擇套餐');
        return;
      }

      this.showRecharge = true;

    },
    CashRecharge(data) {
      this.showRecharge = false;
      let GoodsList = {};
      for (let i = 0; i < this.rechargeGoodsList.length; i++) {
        this.rechargeGoodsList[i].Qty = Number(this.rechargecount)
        GoodsList[i] = this.rechargeGoodsList[i]
      };

      let GoodsDetaila = {}
      for (let i = 0; i < this.SaleEmpMoneyArray.length; i++) {
        GoodsDetaila[i] = this.SaleEmpMoneyArray[i]
      }

      let otherdata = {
        GoodsList: JSON.stringify(GoodsList),
        SaleEmpMoney: JSON.stringify(GoodsDetaila),
        VipId: this.VipId,
        Remark: this.ruleFormsock.Remark,
        GoodsPackId: this.GoodsPackId,
        GoodsPackQty: Number(this.rechargecount),
      }
      let AllsendData = Object.assign({}, otherdata, data);
      this.$store.dispatch("getsetmealrtimesrechargeState", AllsendData).then(() => {

      });
    },
    selecteSaleEmpId() {
      if (this.setmealrPrice == '') {
        this.$message('请選擇套餐');
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
      this.$store.dispatch("getEmployeeList", {}).then(() => {});
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
.s-botton-setmealr .el-form-item {
  margin-bottom: 14px;
}

.employee_ms .el-form-item__content {
  width: 70%;
}

.employeetitle {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 12px;
  overflow: hidden;
  color: #130606;
  text-align: center;
}

.selecttaocan {
  position: relative;

}

.selecttaocan .showtaocanList {
  margin-left: 80px;
  max-height: 260px;
  overflow-y: auto;
  position: absolute;
  background: #fff;
  width: 78%;
  z-index: 999;
  border: solid #76b7ef 2px;
  border-top: 0;
  top: 38px;
  padding: 0 10px;
}

.selecttaocan .showtaocanList li {
  overflow: hidden;
  padding: 5px 0;
  cursor: pointer;
}

.selecttaocan .showtaocanList li:hover {
  cursor: pointer;
  color: #fff;
  background: #00a0e9;
}

/*模板样式*/
.timescountc_right .tablelcenter {
  height: 70px;
  overflow: hidden;
  position: relative;
  border: 1px solid #9E9E9E;
  padding: 8px;
  cursor: pointer;
}

.timescountc_right .totletaocan {
  border: none;
  border-bottom: 2px solid #cccccc;
}

.timescountc_right .tablelcenter .menu-img img {
  height: 50px;
  width: 50px;
  vertical-align: middle;
  border: 0;
  float: left;
  margin-right: 5px;
}

.timescountc_right .tablelcenter .menu-txt {
  position: absolute;
  top: 12px;
  right: 20px;
}

</style>
