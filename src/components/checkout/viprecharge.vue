<template>
  <div class="chongzhi" style="overflow: hidden;">
    <div class="Czjsje">
      <div class="modal-body Cashchongzhi">
        <div class="Csshjsbox">
          <div class="Cshjslef">
            <div class="leftList1">
              <div class="secrch_member">
                <el-select
                  v-model='searchText'
                  filterable
                  remote
                  reserve-keyword
                  :remote-method="remoteMethod"
                  style='width:100%'
                  :loading="loading"
                  size="small"
                  @change="handleSelect(searchText)"
                  @focus='defaultMemberData()'
                  placeholder="请输入会员名或手机号">
                  <el-option v-for='(item,i) in dataMemberList' :key='i' :value='item'  size="small">
                    <span class="pull-left">{{item.NAME}}</span>
                    <span class="pull-right font-13" style="color: #8492a6;">{{item.MOBILENO}}</span>
                  </el-option>
                </el-select>
              </div>

              <div class="Userinformation" id="PointUserinformation">
                <ul class="usernews">
                  <li class="Detailsone">
                    <div class="leftconent_List">
                      <div class="leftconent_Listleft">
                        <img :src="vipnews.IMAGEURL" onerror="this.src='static/images/admin.png'" style="width:40px;height:40px; margin-right:5px; border-radius:50%" class="pull-left">
                      </div>
                      <div class="leftconent_Listright">
                        <p>
                          {{vipnews.NAME}}
                          <span class="pull-right" style="text-align: center;"><i style="display: block;">{{vipnews.MONEY}}</i><i>余额</i></span>
                        </p>
                        <p>
                          <span><i style="margin-right:10px;">{{vipnews.MOBILENO}}</i></span>
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="leftList">
                <ul>
                  <li>
                    <span>充值金额</span>
                    <span class="pull-right"><input type="text" v-model="AddMoney" placeholder="0.00"  class="checkoutPrice" @keyup="handleInput2(1)" @focus="clickfocusstatus(1)" ref="inputa"></span>
                  </li>
                  <li>
                    <span id="Pay_span1">赠送金额</span>
                    <span class="pull-right"><input type="text" v-model="GiftMoney" placeholder="0.00" class="checkoutPrice" @keyup="handleInput2(2)" @focus="clickfocusstatus(2)" ref="inputg"></span>
                  </li>
                </ul>
              </div>
              <div class="rightList1">
                <div class="showpayList overflowscroll" style="max-height:235px;">
                  <ul>
                    <li class="list-group-item" v-for="(item,index) in rechargeListList" :key='index' @click="toggletab(index,item)">
                      <div class="paylistsock">
                        <img :src="item.payerIMG" alt="" style="width:28px;height:28px;">
                        <p> {{item.NAME}}</p>
                        <i v-if="curtab==index" :class="{isselectPay:curtab==index}" class="el-icon-circle-check"></i>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="Csjsrigh">
            <div class="Csjscalc">
              <ul class="calui">
                <li v-for="(val,i) in inputvalItem" :key='i' @click="inputval(val)">{{val}}</li>
              </ul>
            </div>
            <ul class="caldetl">
              <li class="cdbule" @click="delinputval"> <i class="el-icon-circle-close-outline" style="font-size: 22px;"></i></li>
              <li class="lohei com_key_confirm_enter" id="chongzhi"><i>确认</i></li>
            </ul>
          </div>

          <div class="rightList2">
            <span>
              打印小票<el-switch v-model='checkedreceipt' inactive-color="#ff4949"></el-switch>
            </span>
            <span class='pull-right'>
              短信通知
              <el-switch v-model='IsSms' inactive-color="#ff4949"></el-switch>
            </span>
          </div>
        </div>
      </div>
      <p style='float:left; width:100%'>
        <span style='margin: 30px auto 0; width:200px; display:table'>
          <el-button class="fl" type='info' plain @click="closeModal">取 消</el-button>
          <el-button class='fr' type='primary' @click='saveRecharge'>确 认</el-button>
        </span>
      </p>
    </div>

    <!-- 扫描支付 -->
    <el-dialog title="扫码支付" :visible.sync="showbarCodePay" width="550px" append-to-body>
      <barCodePay :paytypeid="PaytypeId" :billmoney="barCodePayMoney == '' ? AddMoney : barCodePayMoney" @barcodePayclick="barcodePaycomback"></barCodePay>
    </el-dialog>

  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import { getDayindate } from "@/util/Printing"
import { getUserInfo, getHomeData} from '@/api/index'
import { nscreenexCodeFun } from "@/util/objectivity";
export default {
  data() {
    return {
      loading: false,
      focusstatus: true,
      curtab: 0,
      AddMoney: '',
      GiftMoney: '',
      checkedreceipt: localStorage.getItem("SavesetupPrint") == "true" ? true : false,
      typecheck:false,
      searchText:'',
      showVipstatus:false,
      IsSms: false,
      VipId:0,
      inputvalItem: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '.'],
      pageData: {
        PN: 1,
        Filter: "",
        Status: -1,
        LevelName: "",
        VipFlag: ""
      },
      vipnews: {
        NAME: '姓名',
        MOBILENO: '手机号',
        DISCOUNT: '0',
        IMAGEURL: '',
        VIPFLAG: 'x',
        INTEGRAL: '0',
        MONEY: '0',
        BIRTHDATE: 'undefined'
      },
      dataMemberList:[],
      getAddMoneyList:[],
      rechargeListList: [],
      PaytypeId: '',
      barcodepaystatus: '',
      showbarCodePay: false,
      payName: '',
      barCodePayMoney:'',
    };
  },
  computed: {
    ...mapGetters({
      rechargeListList1: "rechargeListList",
      saveVipRechargeState: 'saveVipRechargeState',
      memberListState:'memberListState',
      marketingRechargedetailed:"marketingRechargeStatus",
      barcodepayopenState: 'barcodepayopenState'
    })
  },
  watch: {
     barcodepayopenState(data) {
      if (data.success) {
        let IsCheck = data.data.IsCheck;
        if (IsCheck) {
          this.showbarCodePay = true;
        } else {
          this.$message('请联系客服开通扫码支付');
          return;
        }
      }
    },
    marketingRechargedetailed(data){
      this.getAddMoneyList = data.data.GiftList
    },
    memberListState(data){
       this.loading = false
         if(data.success){
            this.dataMemberList = [...data.data.PageData.DataArr]
         }else{
            this.$message.error(data.message)
         }
    },
    saveVipRechargeState(data){
      if(data.success){
        this.AddMoney = ''
        this.GiftMoney = ''
        this.vipnews = {
          NAME: '姓名',
          MOBILENO: '手机号',
          DISCOUNT: '0',
          IMAGEURL: '',
          VIPFLAG: 'x',
          INTEGRAL: '0',
          MONEY: '0',
          BIRTHDATE: 'undefined'
        }
        this.VipId = 0
        this.getviprechargeData()
        this.closeModal()
        let qresurl = this.$store.state.commodityc.saveQRcodeIMG;
        if(this.checkedreceipt){
          getDayindate('91020223', data.data.BillId, 4, qresurl);
        }
      }
      this.$message({ type: data.success ? 'success' : 'error', message: data.message })
    },
    rechargeListList1(data) {
      let newParam = []
      for(var i in data){
         if(data[i].NAME != '余额支付' && data[i].NAME != '欠款'){
            newParam.push(data[i])
         }
      }
      this.curtab = 0
      this.payName = newParam[0].NAME;
      this.PaytypeId = newParam[0].ID;
      this.rechargeListList = newParam
    },
  },
  methods: {
    remoteMethod(query){
      this.pageData.Filter = query
      this.pageData.ShopId = ''
      this.$store.dispatch('getMemberList', this.pageData)
    },
    closeModal(){
      this.GiftMoney = ''
      this.AddMoney = ''
      this.curtab = 0
      this.vipnews = {
        NAME: '姓名',
        MOBILENO: '手机号',
        DISCOUNT: '0',
        IMAGEURL: '',
        VIPFLAG: 'x',
        INTEGRAL: '0',
        MONEY: '0',
        BIRTHDATE: 'undefined'
      }
      this.VipId = 0
      this.$emit('closeModal')
    },
    saveRecharge(){
      if(this.VipId == 0){
        this.$message.warning('请选择要充值的会员')
        return
      }

      if (this.checkedreceipt) {
        localStorage.setItem("SavesetupPrint", true);
      } else {
        localStorage.setItem("SavesetupPrint", false);
      }

      let isBarcodePay = false ;
      if (this.payName == '扫码支付' && this.barcodepaystatus != 1) { //getbarcodepayopenState
        this.$store.dispatch("getbarcodepayopenState", {}).then(() => {});
        return;
      }
      nscreenexCodeFun(5);
      this.barcodepaystatus = '';

      let sendData = {
        VipId: this.VipId,
        AddMoney: this.AddMoney,
        GiftMoney: this.GiftMoney,
        IsSmd: this.IsSms == true ? 1 : 0,
        PayTypeId: this.PaytypeId
      }
      this.$store.dispatch('saveVipRecharge', sendData)
    },
    handleSelect(item) {
      let ip = JSON.parse(sessionStorage.getItem('serverIP'))
      this.typecheck = true;
      this.showVipstatus = false;
      this.searchText = '';
      this.VipId = item.ID

      if (Object.keys(item).length > 0) {
        for (let key in this.vipnews) {
          let UCkey = key.toUpperCase();
          this.vipnews[key] = item[UCkey];
        }
        if (item.IMAGEURL == undefined || item.IMAGEURL == '') {
          let VIPIMAGESIMG = ip + "/resources/vipimages/"
          this.vipnews.IMAGEURL = VIPIMAGESIMG + item.ID + '.png';
        } else {
          this.vipnews.IMAGEURL = item.IMAGEURL;
        }
        this.defaultMemberData()
      }
    },
    defaultMemberData(){
      let sendData = { PN: 1, Filter: "", Status: -1, LevelName: "", VipFlag: "", ShopId: getHomeData().shop.ID }
      this.$store.dispatch("getMemberList", sendData).then(() => {
        this.loading = true
      });
    },
    toggletab(index, item) {
      this.curtab = index;
      this.PaytypeId = item.ID;
      this.payName = item.NAME
    },
    clickfocusstatus(status) {
      this.focusstatus = status == 1 ? true : false
    },
    handleInput2(status) {
      if (status == 1) {
        this.AddMoney = this.onlyInputnumber(this.AddMoney);
        let getAddMoneyList = this.getAddMoneyList, newMoney = []
        for(var i in getAddMoneyList){
          if(this.AddMoney >= getAddMoneyList[i].ADDMONEY){
            newMoney.push(getAddMoneyList[i].MONEY)
          }
        }

        if(newMoney.length > 0){
          var max = newMoney.reduce(function(a , b){
            return b > a ? b : a;
          })
          this.GiftMoney = max
        }else{
          this.GiftMoney = ''
        }
        nscreenexCodeFun(4, String(this.AddMoney));
      } else {
        this.GiftMoney = this.onlyInputnumber(this.GiftMoney);
      }
    },
    inputval(val) {
      if (this.focusstatus) {
        this.$refs.inputa.focus();
        this.AddMoney = this.AddMoney + val;
        this.handleInput2(1)
      } else {
        this.$refs.inputg.focus();
        this.GiftMoney = this.GiftMoney + val;
      }
    },
    delinputval() {
      if (this.focusstatus) {
        this.AddMoney = ''
        this.GiftMoney = ''
      } else {
        this.GiftMoney = ''
      }
      this.$refs.inputa.focus();
      this.$refs.inputg.focus();
    },
    getviprechargeData() {
      this.$store.dispatch("getrechargeList", { codestatus: '' }).then(() => {});
    },
    barcodePaycomback(data) {
      this.barcodepaystatus = 1;
      this.saveRecharge()
    }
  },
  components: {

  },
  mounted() {
    this.getviprechargeData();
  },
  beforeCreate() {

  }
};

</script>
<style scoped>

.fl{ float:left}
.fr{ float: right}
.Czjsje, .Csshjsbox{
  float:left
}
.Csshjsbox .Csjsrigh {
  width: 40%;
  float: right;
  font-family: "微软雅黑";
  background: #eee;
  border-radius: 4px;
}
.Cashchongzhi{
  float:left
}
.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;
    border: 1px solid #f00;
    background:#ccc;
    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}

.Csshjsbox .Csjsrigh .Csjscalc {
  width: 68%;
  margin-top: 9px;
  margin-left: 5px;
  float: left;
  overflow: hidden;
  position: relative;
}

.Csshjsbox .Csjsrigh .caldetl {
  width: 28%;
  margin-top: 9px;
}

.Csshjsbox .Csjsrigh .Csjscalc .calui {
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 5px;
}

.Csshjsbox .Csjsrigh .Csjscalc .calui li:first-child,
.Csshjsbox .Csjsrigh .Csjscalc .calui li:nth-child(4),
.Csshjsbox .Csjsrigh .Csjscalc .calui li:nth-child(7) {
  margin-left: 2px;
}

.Csshjsbox .Csjsrigh .Csjscalc .calui li {
  float: left;
  width: 55px;
  height: 55px;
  background: #fff;
  margin-right: 9px;
  border-radius: 5px;
  box-shadow: 0 1px 2px 1px #d0d0d0;
  color: #434350;
  line-height: 55px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 11px
}

.Csshjsbox .Csjsrigh .Csjscalc .calui li.font14 {
  font-size: 18px
}

.Csshjsbox .Csjsrigh .Csjscalc .calui li:nth-child(10) {
  width: 121px
}

.Csshjsbox .Csjsrigh .Csjscalc .calui li:nth-child(3n),
.Csshjsbox .Csjsrigh .Csjscalc .calui li:last-child {
  margin-right: 0
}

.Csshjsbox .Csjsrigh .Csjscalc {
  float: left;
  overflow: hidden;
  position: relative;
}

.Csshjsbox .Csjsrigh .Csjscalc .calui li:first-child,
.Csshjsbox .Csjsrigh .Csjscalc .calui li:nth-child(4),
.Csshjsbox .Csjsrigh .Csjscalc .calui li:nth-child(7) {
  margin-left: 2px
}

.Csshjsbox .Csjsrigh .caldetl {
  width: 30%;
  float: left;
  overflow: hidden;
  position: relative;
  padding: 5px
}

.Csshjsbox .Csjsrigh .caldetl li {
  float: left;
  width: 80px;
  height: 55px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 2px 1px #d0d0d0;
  color: #434350;
  line-height: 55px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 11px
}

.Csshjsbox .Csjsrigh .caldetl li.cdbule {
  background: #50a4ec;
  color: #fff
}

.Csshjsbox .Csjsrigh .caldetl li.lohei {
  height: 187px;
  line-height: 30px;
  background: #1bb987
}

.Csshjsbox .Csjsrigh .caldetl li.lohei i {
  display: block;
  margin-top: 65px;
  color: #fff;
  font-weight: 400;
  font-size: 23px
}

.Csshjsbox .Cshjslef {
  width: 56%;
  float: left;
}


/*会员*/

.leftList1 .secrch_member {
  position: relative;
  margin: 10px 0 6px 0;
}

.leftList1 .secrch_member .seaitler {
  position: absolute;
  left: 6px;
  top: 6px;
}

.leftList1 .secrch_member .query_user_member {
  width: 100%;
  padding-left: 28px;
  height: 30px;
  border: 1px solid #ccc;
  outline: none;
}

.leftList1 .secrch_member .select_member {
  position: absolute;
  right: 3px;
  top: 3px;
  outline: none;
  border: none;
  height: 24px;
  color: red;
  background: #fff;
  cursor: pointer;
}

/*会员详情*/

.Userinformation .leftconent_List {
  /* background-color: rgba(255, 102, 85, 1); */
  background: #3EA9FF;
  height: 86px;
  padding: 12px;
  border-radius: 6px;
  background-size: 100% 100%;
}

.Userinformation .leftconent_List .leftconent_Listleft {
  float: left;
  height: 100%;
  vertical-align: middle;
  margin-right: 8px;
}

.Userinformation .leftconent_List .leftconent_Listleft img {
  margin-top: 8.5px;
  height: 45px;
  width: 45px;
  border-radius:50%
}

.Userinformation .leftconent_List .leftconent_Listright {
  height: 100%;
  position: relative;
  color: #fff;
  margin-left: 53px;
}

.Userinformation .leftconent_List .leftconent_Listright p:last-child {
  position: absolute;
  bottom: 0;
  left: 0px;
  right: 0;
}

.leftList li {
  line-height: 40px;
  border-bottom: 1px solid #ccc;
  overflow: hidden;
}

.leftList li .fr {
  font-size: 16px;
  font-weight: bold;
}

.leftList li .checkoutPrice {
  text-align: right;
  border: none;
  height: 35px;
  outline: none;
  padding-right: 10px;
  font-size: 16px;
  font-weight: bold;
}

.rightList1 {
  margin-top: 12px;
}

.rightList1 nav.lisbk {
  display: inline-block;
  width: 100%;
  box-sizing: border-box;
}

.rightList1 nav.lisbk a {
  display: inline-block;
  border: 1px solid #ff6600;
  color: #666;
  font-size: 14px;
  text-decoration: none;
  margin-bottom: 5px;
  width: 25%;
  height: 36px;
  line-height: 36px;
  text-align: center;
  float: left;
}

.rightList1 nav.lisbk a.active {
  background: #ff6655;
  color: #fff;
}

.rightList2 {
  position: relative;
  overflow: hidden;
  float: right;
  width: 40%;
  padding: 13px;
}





/*会员列表*/

.addbg {
  background: #79b7f0;
  color: #fff;
}

.chongzhi .showpayList ul li {
  display: inline-block;
  color: #666;
  font-size: 14px;
  text-decoration: none;
  width: 20%;
  text-align: center;
  float: left;
  cursor: pointer;
  padding: 5px 2px;
  font-size: 12px;
  position: relative;
}

.chongzhi .showpayList ul li .paylistsock {
  padding: 4px;
  border: 1px solid #f1a027;
  overflow: hidden;
  background: #fffff1;
  border-radius: 5px;
}

.chongzhi .showpayList ul li .paylistsock p {
  margin: 0;
}

.rightList1 .isselectPay {
  position: absolute;
  color: #FF5722;
  top: 2px;
  right: 1px;
  font-size: 18px;
}

</style>
