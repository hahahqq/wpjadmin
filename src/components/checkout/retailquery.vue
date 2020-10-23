<template>
  <div class="guadanc-sock">
    <div style='margin-bottom:20px'>
      <el-row :span='24'>
        <el-col :span='6'>
          <el-input placeholder='输入零售单号' clearable v-model.trim='orderNum' size='small'></el-input>
        </el-col>
        <el-col :span='10'>
          <el-date-picker
            size='small'
            style='margin-left:10px'
            v-model="dateChoose"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-col>
        <el-col :span='4'>
          <el-button type="primary" @click='btnSearch' size='small' icon="el-icon-search">查找</el-button>
        </el-col>
      </el-row>
    </div> 
    <div class="g-guadanc-sock">
      <el-row :gutter="24">
        <el-col :span="5" style="border-right: 5px solid rgba(234, 226, 213, 1); height: 100%;" class="overflowscroll">
          <div class="section-left overflowscroll">
            <div class="leftconent" style="height:450px; overflow:auto">
              <ul>
                <li v-for="(item,index) in BillList" :key='index' @click="tabxListclick(index,item)" :class="{active:curtab==index}">
                  <div class="leftconent_List">
                    <p>
                      <span>{{item.BILLNO}}</span>
                      <span class="pull-right">{{item.RN}}</span>
                    </p>
                    <p style="font-size:12px">
                      {{new Date(item.BILLDATE) | timehf}}
                      <i v-if="item.ISCANCEL" style="color:red; float:right">已作废</i>
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <el-pagination
                background
                @size-change="handlePageChange"
                @current-change="handlePageChange"
                :current-page.sync="pagination.PN"
                :page-size="pagination.PageSize"
                layout="total, prev, next"
                :total="pagination.TotalNumber"
                class="text-center m-top-sm"
              ></el-pagination>
        </el-col>
        <el-col :span="19" v-loading='loading'>
          <div class="shop_box overflowscroll tableLineHeight" style="max-height: 350px; position:relative">
            <div v-show="ListObj.ISCANCEL == true" style="position:absolute; top: 50%; left:40%; background:rgba(245,245,245,0.9); border-radius:50px; padding: 10px 30px; border:2px solid #ddd;  z-index:9999; font-size:2em; transform: rotate(-20deg); color:#999">已作废</div>
            <el-table border :data="GoodsObj" height='320' size='small' header-row-class-name="bg-f1f2f3" style="width: 100%">
              <el-table-column align='center' prop='GOODSCODE' label="货号" fixed='left'></el-table-column>
              <el-table-column align='center' prop="GOODSNAME" label="商品名称" fixed='left'></el-table-column>
              <el-table-column align='center' prop='COLORNAME' label="颜色" width="70"></el-table-column>
              <el-table-column align='center' prop='SIZENAME' label="尺码" width="70"></el-table-column>
              <el-table-column align='center' prop='GOODSPRICE' label="零售价" width="70"></el-table-column>
              <el-table-column align='center' prop='DISCOUNT' label="折扣" width="70"></el-table-column>
              <el-table-column align='center' label="实销价" width="70">
                <template slot-scope="scope">
                  <span>{{scope.row.PRICE}}</span>
                  <span v-if='scope.row.REMARK != "" && scope.row.REMARK != undefined ' style="text-align:right; float:right">
                      <el-tooltip placement="right">
                        <div slot="content">{{scope.row.REMARK}}</div>
                        <el-button type="text" size="small" icon='el-icon-info'></el-button>
                      </el-tooltip>
                  </span>
                </template>
              </el-table-column>
              <el-table-column align='center' prop='QTY' label="数量" width="70"></el-table-column>
              <el-table-column align='center' label="金额">
                <template slot-scope="scope">
                  <span>{{scope.row.PRICE * scope.row.QTY}}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div style='margin:20px 30px; height:80px;' v-if="BillList.length>0">
            <div>
              <span style='float:left'>支付方式：{{ListObj.PAYTYPENAME}}</span>
              <span style='float:left; margin-left:15px' v-if='ListObj.VIPNAME != "散客"'>会 员：{{ListObj.VIPNAME}} (获得 {{ListObj.GETINTEGRAL}} 积分)</span>
              <!-- <span style='float:right; margin-left:5%'>共 <i class='text-red'>{{Math.abs(ListObj.GOODSQTY)}}</i> 件商品，合计 <i style='color:#f00; font-weight:bold'>￥ {{ListObj.SUMSALEMONEY}}</i></span> -->
              
              <span style='float:right; margin-left:5%'>
                共 <i class='text-red'>{{Math.abs(ListObj.GOODSQTY)}}</i> 件商品，
                <b style='font-weight:normal' v-if='ListObj.FAVORMONEY != 0'>优惠金额<i class='text-red'> ￥{{ListObj.FAVORMONEY}}</i> 元 , </b>
                <b style='font-weight:normal' v-if='ListObj.INTEGRALMONEY != 0'>抵现金额<i class='text-red'> ￥{{ListObj.INTEGRALMONEY}}</i> 元 ,</b> 
                实收金额 <i style='color:#f00; font-weight:bold'>￥ {{ListObj.PAYMONEY}}</i>
              </span>
            </div>
            <div style='margin-top:10px; width:100%; float:left' v-if="ListObj.REMARK != undefined">
              备注：{{ListObj.REMARK}}
            </div>
          </div>

          <div class="footer" style="margin-top:15px;">
            <div class="pull-right">
              <el-button type="info" @click="closeModal" icon='el-icon-back'>取消</el-button>
              <el-button type="primary" v-if="BillList.length>0 && ListObj.ISCANCEL != true" @click='cancelBill' icon='el-icon-delete' >作废</el-button>
              <el-button type="primary" @click='printReturnGoods' v-if="BillList.length>0" icon='el-icon-printer'>打印</el-button>
              <el-button type="primary" v-if="BillList.length>0" @click='isReturnGoods = true' icon='el-icon-sold-out' >退货</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <el-dialog title="退货" :visible.sync="isReturnGoods" width="60%" append-to-body>
      <el-table border
        :data="GoodsObj"
        height='300'
        size='small'
        ref="multipleTable"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
        header-row-class-name="bg-f1f2f3"
        style="width: 100%"
      >
        <el-table-column align="center" type='selection' width='50'></el-table-column>
        <el-table-column align="center" prop='GOODSCODE' label="货号" fixed='left'></el-table-column>
        <el-table-column align="center" prop="GOODSNAME" label="商品名称" fixed='left'></el-table-column>
        <el-table-column align="center" prop='COLORNAME' label="颜色" width="70"></el-table-column>
        <el-table-column align="center" prop='SIZENAME' label="尺码" width="70"></el-table-column>
        <el-table-column align="center" prop='GOODSPRICE' label="零售价" width="70"></el-table-column>
        <el-table-column align="center" prop='DISCOUNT' label="折扣" width="70"></el-table-column>
        <el-table-column align="center" prop='PRICE' label="实销价" width="80"></el-table-column>
        <el-table-column align="center" prop='QTY' label="数量" width="70"></el-table-column>
        <el-table-column align="center" label="金额" fixed='right' width="80">
          <template slot-scope="scope">
            <span>{{scope.row.PRICE * scope.row.QTY}}</span>
          </template>
        </el-table-column>
      </el-table>

      <div style='margin-top:30px' align='center'>
        <el-button type='info' @click='cancelReturn()'>取 消</el-button>
        <el-button type='primary' @click='linkCommodityPage()'>确 认</el-button>
      </div>

    </el-dialog>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import { getDayindate } from "@/util/Printing"
import dayjs from 'dayjs';
export default {
  data() {
    return {
      loading: false,
      isReturnGoods: false,
      curtab:0,
      BillList:[],
      orderNum:'',
      pageData: {
        BeginDate: 1,
        EndDate: 9999999999999,
        Filter: '',
        PN: 1,
        BillNo: ''
      },
      pagination: {
        TotalNumber: 0,
        PageNumber: 0,
        PageSize: 20,
        PN: 1
      },
      dateChoose:'',
      pickerOptions: {
        disabledDate: time => {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end]); 
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      multipleSelection: [],
      ListObj:{
        ISCANCEL:false
      },
      GoodsObj:[],
      BillId:'',
      editType: 'no'
    };
  },
  computed: {
    ...mapGetters({
      retailqueryList: 'retailqueryList',
      retailqueryiState: 'retailqueryiState',
      guadancdlistState: 'guadancdlistState',
      savePayMoneyState:'savePayMoneyState',
      billCancelState: 'billCancelState'
    })
  },
  watch: {
    billCancelState(data){
      if(data.success){
        this.getRetailData()
      }else{
        this.$message.error(data.message)
      }
    },
    savePayMoneyState(data){
      if(this.editType == 'yes'){
        if(data.success){
          this.$message.success('退货成功！')
          this.editType = 'no'
        }else{
          this.$message.error(data.message)
        }
      }
    },
    retailqueryiState (data){
      this.BillList = [...this.retailqueryList]
      if(this.retailqueryList.length > 0){
        console.log('123', this.BillId)
        if(this.BillId != ''){
          this.getguadanList(this.BillId)
          return
        }
        this.getguadanList(this.retailqueryList[0].BILLID)
        this.BillId = this.retailqueryList[0].BILLID
      }else{
        this.loading = false
        this.GoodsObj = []
      }
      if(data.success){
        this.pagination = {
          PN: data.data.PageData.PN,
          PageNumber: data.data.PageData.PageNumber,
          TotalNumber: data.data.PageData.TotalNumber,
          PageSize: data.data.PageData.PageSize
        }
      }
    },
    guadancdlistState(data) {
      this.loading = false;
      if (data.success) {
        this.ListObj = data.data.Obj;
        this.GoodsObj = [...data.data.GoodsObj];
      }
    },
  },
  methods: {
    cancelBill(){
      if(this.isPurViewFun(91040114)){
        this.$confirm("是否确认作废该单据?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
        }).then(() => {
            this.$store.dispatch("billNoCancel", { BillId : this.BillId } );
        }).catch(() => { });
      }else{
        this.$message.warning('没有此功能权限，请联系管理员授权!')
      }
    },
    printReturnGoods(){
      let qresurl = this.$store.state.commodityc.saveQRcodeIMG;
      getDayindate('91020303', this.BillId, 1, qresurl)
    },
    cancelReturn(){
      this.isReturnGoods = false
      this.$refs.multipleTable.clearSelection()
    },
    linkCommodityPage(){
      if(this.multipleSelection.length > 0){
        this.isReturnGoods = false
        this.editType = 'yes'
        // console.log(this.multipleSelection)
        this.$emit('closeModal')
        this.$emit('returnOrderList',this.multipleSelection)
        this.$emit('returnOrderObj', this.ListObj)
      }else{
        this.$message.warning('请勾选要退货的商品')
      }
    },
    handlePageChange: function(currentPage) {
      if (this.pageData.PN == currentPage) {
        return;
      }
      this.pageData.PN = parseInt(currentPage);
      this.curtab = 0
      this.getRetailData();
    },
    getguadanList(BILLID) {
      this.$store.dispatch("getguadancdlistState", { BillId: BILLID }).then(() => {
        this.loading = true
      })
    },  
    btnSearch(){
      this.pageData.BillNo = this.orderNum
      this.curtab = 0
      this.BillId = ''
      this.ListObj.ISCANCEL = false
      this.pageData.BeginDate = this.dateChoose == '' || this.dateChoose == null ? 1 : this.dateChoose[0].getTime()
      this.pageData.EndDate = this.dateChoose == '' || this.dateChoose == null ? 9999999999999 : this.dateChoose[1].getTime()
      this.getRetailData()
    },
    tabxListclick(index, item) {
      this.loading = true;
      this.curtab = index;
      this.BillId = item.BILLID;
      this.getguadanList(item.BILLID)
    },
    getRetailData() {
      this.$store.dispatch("getrqueryItem", this.pageData).then(() => {
        this.loading = true;
      });
    },
    closeModal(){
      this.orderNum = ''
      this.curtab = 0
      this.ListObj.ISCANCEL = false
      this.BillId = ''
      this.dateChoose = ''
      this.pageData.BillNo = ''
      this.pageData.BeginDate = 1
      this.pageData.EndDate = 9999999999999
      this.getRetailData()
      this.$emit('closeModal');
    },
    handleSelectionChange(val) {  //已勾选的退货数据
      this.multipleSelection = val;
    }
  },
  mounted(){
    this.getRetailData()
  }
};

</script>
<style scoped>
.el-dialog__wrapper .el-dialog .el-dialog__body{
  padding: 20px 20px !important
}
.guadanc-sock .section-left .leftconent ul li {
  position: relative;
  padding: 10px 12px;
  color: #333;
  background: #f2f2f2;
  cursor: pointer;
  border-bottom: 1px solid #ddd
}
.guadanc-sock .section-left .leftconent ul li:hover{
  background:#A0CFFF;
  color:#fff
}
.guadanc-sock .section-left .leftconent ul li.active {
  background:#3EA9FF;
  color:#fff;
}
.guadanc-sock .section-left .leftconent ul li p {
  margin: 0;
  line-height: 1.8;
}

</style>
