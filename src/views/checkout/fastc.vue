<template>
  <div class="f-botton-fssock" style="height: 100%;">
    <div class="f-botton-fs" style="height: 100%;">
      <el-row :gutter="24" style="height: 100%;">
      <el-col :span="8" style="height: 100%;border-right: 10px solid rgba(234, 226, 213, 1);height: 100%;position: relative;">
          <dropdown @getmemberID="getmemberID" :details="datalistval"></dropdown>
          <el-form :model="ruleFormsock" label-width="80px" class="fastc_top">
            <el-form-item label="消费金额">
              <el-input v-model="ruleFormsock.consumptionMoney" placeholder="0.00" type="number" autocomplete="off" class="full-width"></el-input>
            </el-form-item>
            <el-form-item label="业绩员工">
              <el-input placeholder="请选择业绩员工" class="Choiceinput" auto-complete="off" :disabled="true" v-model="ruleFormsock.AllselecteSaleEmpId" @click.native="selecteSaleEmpId"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="ruleFormsock.Remark" autocomplete="off" class="full-width"></el-input>
            </el-form-item>
          </el-form>
           <div class="timescountc_left_footer" ref="footer">
            <div class="f_commodityc-left">
              <div class="pull-right">
                <el-button type="success" @click="closeModal">取消</el-button>
                <el-button type="danger" @click="submitForm">结账</el-button>
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
      <div class="employeetitle">消费金额：<i class="com_color">{{ruleFormsock.consumptionMoney}}</i>元，按金额的<i class="com_color">{{ruleFormsock.getfastcExtract}}</i>提成，员工可的<i class="com_color">{{ruleFormsock.ExtractMoney}}</i>元提成</div>
      <div class="dialog-footer employee_ms">
        <el-col :span="24">
          <el-form :inline="true" :model="ruleForm[0]" class="fastc_top">
            <el-col :span="8">
              <el-form-item label="员工" width="30%">
                <el-select v-model="ruleForm[0].SaleEmpIdfirst" placeholder="" class="full-width" @change="SaleEmpIdfirst">
                  <el-option v-for="(item,i) in employeeList" :key="i" :label="item.NAME" :value="item.ID"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="分享%">
                <el-input v-model="ruleForm[0].share"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="提成">
                <el-input v-model="ruleForm[0].Extract" autocomplete="off" class="full-width"></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-col>
        <el-col :span="24">
          <el-form :inline="true" :model="ruleForm[1]" class="fastc_top">
            <el-col :span="8">
              <el-form-item label="员工" width="30%">
                <el-select v-model="ruleForm[1].SaleEmpIdsecond" placeholder="" class="full-width" @change="SaleEmpIdsecond">
                  <el-option v-for="(item,i) in employeeList" :key="i" :label="item.NAME" :value="item.ID"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="分享%">
                <el-input v-model="ruleForm[1].share"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="提成">
                <el-input v-model="ruleForm[1].Extract" autocomplete="off" class="full-width"></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-col>
        <el-col :span="24">
          <el-form :inline="true" :model="ruleForm[2]" class="fastc_top">
            <el-col :span="8">
              <el-form-item label="员工" width="30%">
                <el-select v-model="ruleForm[2].SaleEmpIdthird" placeholder="" class="full-width" @change="SaleEmpIdthird">
                  <el-option v-for="(item,i) in employeeList" :key="i" :label="item.NAME" :value="item.ID"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="分享%">
                <el-input v-model="ruleForm[2].share"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="提成">
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
      <recharge @closeModalrecharge="showRecharge=false" :totalprice="ruleFormsock.consumptionMoney" :isselectvip="VipId" @CashRecharge="CashRecharge" :rechargestatus='3'></recharge>
    </el-dialog>
    <!-- 充值界面 -->
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import {getDayindate} from "@/util/Printing"
import dropdown from "@/components/ssmember/dropdown"
import recharge from "@/components/Recharge/Recharge";

export default {
  data() {
    return {
      searchText: '',
      showRecharge:false,
      SaleEmpMoneyArray:[],
      VipId: '',
      datalistval: {},
      ruleFormsock: {
        consumptionMoney: '',
        getfastcExtract:'',
        Remark:'',
        ExtractMoney:'',
        AllselecteSaleEmpId:''
      },
      ruleForm:[
         {
          SaleEmpIdfirst: "",
          share:'',
          Extract:'',
          Name:''
        },
        {
          SaleEmpIdsecond: "",
          share:'',
          Extract:'',
          Name:''
        },
        {
          SaleEmpIdthird: "",
          share:'',
          Extract:'',
          Name:''
        }
      ],
      dialogFormVisible: false
    };
  },
  computed: {
    ...mapGetters({
      employeeList: "employeeList",
      fastccroyaltyState:"fastccroyaltyState",
      fastcconsumptionState:"fastcconsumptionState",
    })

  },
  watch:{
    fastccroyaltyState(data){
      if(data.success){
        this.ruleFormsock.getfastcExtract=data.data.EmpSaleRate*100+'%';
         this.ruleFormsock.ExtractMoney= (this.ruleFormsock.consumptionMoney*data.data.EmpSaleRate).toFixed(2);
      }
    },
    fastcconsumptionState(data) {
      if (data.success) {
        this.$message('快速消费成功');
        this.VipId = '';
        this.datalistval = {};
        this.SaleEmpMoneyArray=[];
        this.ruleFormsock.consumptionMoney='';
        this.ruleFormsock.Remark='';
        this.ruleFormsock.AllselecteSaleEmpId='';
         let qresurl=this.$store.state.commodityc.saveQRcodeIMG;
        getDayindate('601020405',data.data.BillId,3,qresurl);
      } else {
        this.$message(data.message);
      }
    }


  },
  methods: {
    closeModal() {
      this.VipId=''
      this.datalistval={};
      this.ruleFormsock.consumptionMoney='';
      this.ruleFormsock.AllselecteSaleEmpId='';
      this.ruleFormsock.Remark='';

    },
   getmemberID(data) {
      this.VipId = data;
    },
    submitForm() {
      if (this.ruleFormsock.consumptionMoney == '') {
          this.$message('请输入金额');
          return;
      }
       this.showRecharge = true;

    },
    selecteSaleEmpId() {
      if (this.ruleFormsock.consumptionMoney == '') {
          this.$message('请输入金额');
      } else {
        this.$store.dispatch("getfastccroyaltyState", {}).then(() => {
          this.dialogFormVisible = true;
          for(var i = 0; i<=2; i++){
            this.ruleForm[i].SaleEmpIdfirst = ''
            this.ruleForm[i].share = ''
            this.ruleForm[i].Extract = ''
          }
        })
      }
    },
    SaleEmpIdfirst(vId){
      if(this.ruleForm[1].SaleEmpIdsecond==''&&this.ruleForm[2].SaleEmpIdthird==''){
        this.ruleForm[0].share=100;
        this.ruleForm[0].Extract=this.ruleFormsock.ExtractMoney;
      }
      let obj = {};
      obj = this.employeeList.find((item)=>{//这里的userList就是上面遍历的数据源
          return item.ID === vId;//筛选出匹配数据
      });
      this.ruleForm[0].Name=obj.NAME;

    }, 
    SaleEmpIdsecond(vId){
      if(this.ruleForm[1].SaleEmpIdsecond!=''){
         this.ruleForm[0].share=50;
         this.ruleForm[1].share=50;
         this.ruleForm[0].Extract=this.ruleFormsock.ExtractMoney*0.5;
         this.ruleForm[1].Extract=this.ruleFormsock.ExtractMoney*0.5;
      }
      let obj = {};
      obj = this.employeeList.find((item)=>{//这里的userList就是上面遍历的数据源
          return item.ID === vId;//筛选出匹配数据
      });
      this.ruleForm[1].Name=obj.NAME;

    }, 
    SaleEmpIdthird(vId){
      if(this.ruleForm[1].SaleEmpIdsecond!=''&&this.ruleForm[1].SaleEmpIdsecond!=''){
        for(var i =0; i<=2; i++){
          this.ruleForm[i].share = 33.33
          this.ruleForm[i].Extract = Math.ceil(this.ruleFormsock.ExtractMoney*33)/100;
        }
      }
      let obj = {};
      obj = this.employeeList.find((item)=>{//这里的userList就是上面遍历的数据源
          return item.ID === vId;//筛选出匹配数据
      });
      this.ruleForm[2].Name=obj.NAME;
    },
    getAllSaleEmpId(){
       let showEmpIdsock=[];

       if(this.ruleForm[0].SaleEmpIdfirst!=''){
        this.SaleEmpMoneyArray.push({
          "EmpId":this.ruleForm[0].SaleEmpIdfirst,
          "Money":this.ruleForm[0].Extract
        })
        let NamePrice=this.ruleForm[0].Name+this.ruleForm[0].Extract+'元';
        showEmpIdsock.push(NamePrice);
        
       }
       if(this.ruleForm[1].SaleEmpIdsecond!=''){
        this.SaleEmpMoneyArray.push({
          "EmpId":this.ruleForm[1].SaleEmpIdsecond,
          "Money":this.ruleForm[1].Extract
        })
         let NamePrice=this.ruleForm[1].Name+this.ruleForm[1].Extract+'元';
        showEmpIdsock.push(NamePrice);
        
       }
       if(this.ruleForm[2].SaleEmpIdthird!=''){
        this.SaleEmpMoneyArray.push({
          "EmpId":this.ruleForm[2].SaleEmpIdthird,
          "Money":this.ruleForm[2].Extract
        })
        let NamePrice=this.ruleForm[2].Name+this.ruleForm[2].Extract+'元';
        showEmpIdsock.push(NamePrice);
       }
       this.ruleFormsock.AllselecteSaleEmpId=showEmpIdsock.join(',');
       console.log(this.SaleEmpMoneyArray)
       this.dialogFormVisible = false;

    },
    CashRecharge(data) {
      this.showRecharge = false;
       let GoodsDetaila = {}
      for(let i=0;i<this.SaleEmpMoneyArray.length; i++){
          GoodsDetaila[i] = this.SaleEmpMoneyArray[i]
      }
      let otherdata = {
        SaleEmpMoney: JSON.stringify(this.GoodsDetaila),
        VipId: this.VipId,
        Remark: this.ruleFormsock.Remark,
        CustomerName:'',
        CustomerPhone:'',
        SaleEmpList:'',
      }
      let AllsendData = Object.assign({}, otherdata, data);
      this.$store.dispatch("getfastcconsumption", AllsendData).then(() => {});
    }

  },
  components: {
    dropdown,
    recharge


  },
 
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
  margin-top: 50px;
}
.f-botton-fssock .el-dialog__body{
  padding: 5px 20px;
}
.employeetitle{
  font-size: 14px;
    font-weight: bold;
    margin-bottom: 12px;
    overflow: hidden;
    color: #130606;
    text-align: center;
}

</style>
