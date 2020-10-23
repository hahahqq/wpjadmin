<template>
  <div class='history'>
    <div class="content-eighty">
        <div class="content-center">
          <input type="file" ref="upload" accept=".xls, .xlsx" class="outputlist_upload hide">
          <div class='history_top' style='width:100%; float:Left;'>
            <el-row>
              <el-col :span='8'>
                <el-button size="small" @click='addNewBill(0)' icon="el-icon-plus">新增单据</el-button>
                <el-button size="small" icon="el-icon-download" @click="exportTable">导出</el-button>
              </el-col>
              <el-col :span='8' style='text-align:right;'>
                <el-radio-group size="small" v-model='radioStatus' @change='curRadioStatus'>
                  <el-radio-button v-for='(item,index) in billStatusList' :key='index' :label='item.id'>{{item.name}}</el-radio-button>
                </el-radio-group>
                &nbsp;
              </el-col>
              <el-col :span="5" style='text-align:right'>
                <el-input size="small" v-model.trim='searchText' placeholder="输入单号、供应商、店铺" @keyup.enter.native='searchList(searchText)' @input='searchList(searchText)'></el-input>
              </el-col>
              <el-col :span="3">
                <el-button-group size='small' class="pull-right m-right-sm">
                  <el-popover size='small' placement="bottom" v-model="isFilter">
                    <div>
                      <el-form label-width="100px">
                        <el-form-item label="日 期 ：">
                          <el-date-picker size='small'
                            v-model="dateList"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                          </el-date-picker>
                        </el-form-item>
                        <el-form-item label="供应商：">
                          <el-select size='small' v-model="supplierId" clearable placeholder="请选择供应商">
                            <el-option v-for="item in supplierList" :key="item.ID" :label="item.NAME" :value="item.ID"></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="店 铺：">
                          <el-select size='small' v-model="shopId" placeholder="请选择店铺">
                            <el-option v-for="item in shopList" :key="item.ID" :label="item.NAME" :value="item.ID"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-form>
                    </div>
                    <div style="text-align: right; margin: 0">
                      <el-button size="mini" type="text" @click="cancelSearch">取消</el-button>
                      <el-button type="primary" size="mini" @click="submitChoose">确定</el-button>
                    </div>
                    <el-button size="small" type="default" icon="icon-filter" slot="reference">&nbsp;&nbsp;高级搜索</el-button>
                  </el-popover>
                </el-button-group>
              </el-col>
            </el-row>
          </div>
        </div>
    </div>

    <div class="content-table4">
      <div class="content-table-center">

          <div class='history_content'>
            <el-table
              border size='small'
              :data="pagelist"
              v-loading="loading"
              element-loading-text='数据加载中...'
              :row-class-name="tableRowClassName"
              :height="tableHeight"
              show-summary
              :summary-method="getSummaries1"
              header-row-class-name="bg-f1f2f3"
              style="width: 100%;">
              <el-table-column prop="RN" label="序号" fixed="left" width="50" align="center"></el-table-column>
              <el-table-column label="状态" fixed='left' width="60" align="center">
                <template slot-scope="scope">
                  <span v-if='scope.row.ISCHECK == true && scope.row.ISCANCEL == false'> 已入库</span>
                  <span v-else-if="scope.row.ISCHECK == true && scope.row.ISCANCEL == true">已作废</span>
                  <span v-else-if='scope.row.ISCHECK == false && scope.row.ISCANCEL == false'>草稿单</span>
                </template>
              </el-table-column>
              <el-table-column label="业务日期" width="90">
                <template slot-scope="scope">
                  <span>{{new Date(scope.row.BILLDATE) | time}}</span>
                </template>
              </el-table-column>
              <el-table-column label="单据编号" prop='BILLNO' width="130"></el-table-column>
              <el-table-column label="供应商名称" prop='SUPPLIERNAME' fixed="left"></el-table-column>
              <el-table-column label="入库店铺" prop='SHOPNAME' align="center"></el-table-column>
              <el-table-column label="采购数量" prop='GOODSQTY' align='right' width="70"></el-table-column>
              <el-table-column label="采购金额" align="right" >
                <template slot-scope="scope">
                  {{isPurViewFun(91040112) ? scope.row.GOODSMONEY : '****'}}
                </template>
              </el-table-column>
              <el-table-column label="优惠金额" prop='BREAKSMONEY' align="right" width="70"></el-table-column>
              <el-table-column label="其它费用" prop='OTHERMONEY' align="right" width="70"></el-table-column>
              <el-table-column label="实付金额" align="right">
                <template slot-scope="scope">
                  {{isPurViewFun(91040112) ? scope.row.PAYMONEY : '****'}}
                </template>
              </el-table-column>
              <el-table-column label="备注" prop='REMARK' show-overflow-tooltip>
                <template slot-scope="scope">
                  {{ scope.row.REMARK == 'undefined' ? '' : scope.row.REMARK }}
                </template>
              </el-table-column>
              <el-table-column label="操作" fixed='right' width="100">
                <template slot-scope="scope">
                  <el-button type='text' @click='viewCurInfo(scope.row, scope.$index)'>详情</el-button>
                  <el-button v-if='scope.row.ISCHECK == true && scope.row.ISCANCEL == false' type='text' @click='cancelBill(scope.row.BILLID, "zf")'>作废</el-button>
                  <el-button v-if='scope.row.ISCHECK == false && scope.row.ISCANCEL == false' type='text' @click='cancelBill(scope.row.BILLID, "sc")'>删除</el-button>
                </template>
              </el-table-column>
            </el-table>

            <!-- 分页 -->
            <div class="m-top-sm clearfix elpagination" v-if='pagination.TotalNumber > 20'>
              <el-pagination
                background
                @size-change="handlePageChange"
                @current-change="handlePageChange"
                :current-page.sync="pagination.PN"
                :page-size="pagination.PageSize"
                layout="total, prev, pager, next, jumper"
                :total="pagination.TotalNumber"
                class="text-center"
              ></el-pagination>
            </div>
          </div>

      </div>
    </div>

    <el-dialog :title='`详情 (${title})`' :visible.sync="isShowDialog" width="80%" append-to-body>
      <div>
        <span>店铺 : {{infoList.SHOPNAME}}</span>
        <span style='margin-left:4%'>供应商 : {{infoList.SUPPLIERNAME}}</span>
        <span style='float:right'>业务日期 : {{new Date(infoList.BILLDATE) | timehf}}</span>
      </div>
      <el-table
        border size='small'
        :data="theGoodsListInfo"
        height='300'
        header-row-class-name="bg-f1f2f3"
        class="full-width m-top-sm"
        show-summary
        :summary-method="getSummaries"
        v-loading="loadingInfo">
        <el-table-column type='index' width='50' align="center" label="序号" fixed='left'></el-table-column>
        <el-table-column prop='GOODSNAME' label="商品" fixed='left'></el-table-column>
        <el-table-column prop='GOODSCODE' label="货号" align="center" ></el-table-column>
        <el-table-column prop='COLORNAME' label="颜色" align="center" ></el-table-column>
        <el-table-column prop='SIZENAME' label="尺码" align="center" ></el-table-column>
        <el-table-column label="进货价" width="100" align="center" >
          <template slot-scope="scope">
            {{isPurViewFun(91040112) ? scope.row.PURPRICE : '****'}}
          </template>
        </el-table-column>
        <el-table-column prop='DISCOUNT' label="折扣" width='100' align="center" ></el-table-column>
        <el-table-column label="单价" width="80" align="center" >
          <template slot-scope="scope">
            {{isPurViewFun(91040112) ? scope.row.PRICE : '****'}}
          </template>
        </el-table-column>
        <el-table-column prop="QTY" label="数量" width="80" align="center"></el-table-column>
        <el-table-column width="100" label="金额" align="center" >
          <template slot-scope='scope'>
            {{isPurViewFun(91040112) ? (scope.row.PRICE * scope.row.QTY) : '****'}}
          </template>
        </el-table-column>
      </el-table>

      <el-row :gutter="24" class="marginTB-sm">
        <el-col :span='4'>
          <span>优惠金额：</span>
          <span>{{pageData.BREAKSMONEY != undefined ? pageData.BREAKSMONEY : '￥0.00 元'}}</span>
        </el-col>
        <el-col :span="4">
          <span>其它费用：</span>
          <span>{{pageData.OTHERMONEY != undefined ? pageData.OTHERMONEY : '￥0.00 元'}}</span>
        </el-col>

        <el-col :span="4">
          <span>结算账户：</span>
          <span>{{pageData.PAYTYPENAME != undefined ? pageData.PAYTYPENAME : ''}}</span>
        </el-col>
        <el-col :span="4">
          <span>实付金额：</span>
          {{isPurViewFun(91040112) && pageData.PAYMONEY != undefined ? pageData.PAYMONEY : '****'}}
        </el-col>
        <el-col :span="8">
          <span>总合计：</span>
          <span class="inline-block text-danger font-600" style="font-size:18px"> {{isPurViewFun(91040112) ? '&yen;' + totalPrice : '****'}} 元</span>
        </el-col>
      </el-row>

      <el-row :gutter="24" class="marginTB-sm p-top-sm">
        <el-col :span="24">
          <span>备 注：</span>
          <span>{{pageData.REMARK != undefined ? pageData.REMARK : ''}}</span>
        </el-col>
      </el-row>

      <div class='marginTB-sm' style='padding-bottom:30px'>
        <span class="text-999 m-top-sm" style='float:left'>
          <span>制单人 :  &nbsp; </span>  {{infoList.USERNAME}}
          <span style='margin-left:30px'>制单时间 :  &nbsp; </span> {{new Date(infoList.BILLDATE) | timehf }}
        </span>
        <span class='text-right' style='float:right'>
          <el-button type="success" plain icon="el-icon-plus" @click='addNewBill(1)'>新增单据</el-button>
          <el-button type="info" v-if='editStatu != ""' @click="handleDraft(editStatu, infoList.BILLID)">{{editStatu}}</el-button>
          <el-button type="primary" v-if="theGoodsListInfo.length != 0" @click="showBarcodePrinter = true">条码打印</el-button>
          <el-button type="primary" v-if='isPrintStatu != ""' @click="handlePrint(isPrintStatu, infoList.BILLID, infoList)">{{isPrintStatu}}</el-button>
        </span>
      </div>
    </el-dialog>

    <el-dialog title="条码打印" :visible.sync="showBarcodePrinter" width="90%" append-to-body>
        <barcodePrint :dataType="{ value:this.theGoodsListInfo }" ></barcodePrint>
    </el-dialog>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import { getHomeData, getUserInfo } from "@/api/index";
import MIXNINS_EXPORT from "@/mixins/exportData.js";
import dayjs from 'dayjs';
let _ = require("lodash");
import { getDayindate } from "@/util/Printing"
export default {
  mixins: [MIXNINS_EXPORT.TOEXCEL, MIXNINS_EXPORT.TODATA],
  data(){
    return {
      ruleForm:{},
      rules:[],
      loading: false,
      loadingInfo: false,
      pagelist:[],
      dateList:null,
      supplierId:'',
      searchText:'',
      radioStatus:0,
      infoList:{},
      isFilter: false,
      billStatusList:[
        { id:0, name:'全部' },
        { id:1, name:'已入库' },
        { id:2, name:'草稿单' },
        { id:3, name:'已作废' }
      ],
      shopId: getHomeData().shop.SHOPID,
      sendDataInfo :{
        Filter:'',
        BeginDate: 1,
        EndDate: 9999999999999,
        SupplierId: '',
        BillNo: '',
        IsCheck: -1, // 是否确认, -1=all,0=草稿,1=确认单
        IsCancel: -1, // 是否作废,-1=all,0=正常,1=已作废
        PN: 1
      },
      pagination: {
        TotalNumber: 0,
        PageNumber: 0,
        PageSize: 20,
        PN: 0
      },
      isShowDialog: false,
      theGoodsListInfo:[],
      pageData: {
        ShopId: "",
        SUPPLIERID: "",
        BILLDATE: "",
        ManualNo: "", //手工单号
        PAYTYPEID: "", // 付款方式ID
        PAYMONEY: 0,
        REMARK: "",
        GoodsList: [], // 货号Id,颜色Id,尺码Id,数量,单价,备注
        IsCheck: 1,
        FromBillId: "", // 引用采购单号
        BREAKSMONEY: 0,
        OTHERMONEY: 0
      },
      title:'',
      editStatu:'',
      isPrintStatu:'',
      exportList:[],
      totalPrice:'',
      tableHeight: document.body.clientHeight - 230,
      showBarcodePrinter: false
    }
  },
  computed:{
    ...mapGetters({
      warehousingListState:'warehousingListState',
      supplierList: "supplierList",
      dataState:'warehousingState',
      dataList: 'warehousingItem',
      dataObj: 'warehousingObj',
      shopList: "shopList",
      warehousingCancel:'warehousingCancel',
      dataExportState:'warehousingExportState',
      warehousingAddState:'warehousingAddState',
      cgdWarehousingDataList:'cgdWarehousingDataList'
    })
  },
  watch:{
    cgdWarehousingDataList(data){ },
    dataExportState(data){
      if(data.success){
        this.exportList = [...data.data.List]
      }
    },
    warehousingListState(data){
      this.loading = false
      if(data.success){
        this.pagination = {
          TotalNumber: data.paying.TotalNumber,
          PageNumber: data.paying.PageNumber,
          PageSize: data.paying.PageSize,
          PN: data.paying.PN
        };
        this.pagelist = [...data.data.PageData.DataArr]
      }else{
        this.$message.error(data.message)
      }
    },
    dataState(data){
      this.loadingInfo = false;
      if(data.success){
        let tprice = 0
        for(let i in this.dataList){
          tprice += this.dataList[i].PRICE * this.dataList[i].QTY
        }
        this.theGoodsListInfo = this.dataList
        console.log(this.theGoodsListInfo)
        this.pageData = this.dataObj
        this.totalPrice = this.dataObj.GOODSMONEY + this.dataObj.OTHERMONEY - this.dataObj.BREAKSMONEY
      }else{
        this.$message.error(data.message)
      }
    },
    warehousingCancel(data){
      this.$message({ type: data.success ? 'success' : 'error', message: data.message })
      if(data.success){
        this.isShowDialog = false
        this.getHistoryList();
      }
    },
    warehousingAddState(data){
      this.$message({ type: data.success ? 'success' : 'error', message: data.message })
      if(data.success){
        this.isShowDialog = false
        this.getHistoryList()
      }
    },
  },
  components: {
    barcodePrint: () => import('../barcodePrint.vue')
  },
  mounted(){
    this.getHistoryList()
    if (this.supplierList.length == 0) {
      this.$store.dispatch("getSupplierList", { IsStop: 0, IsCurr :0 });
    }
    if (this.shopList.length == 0) {
      this.$store.dispatch("getShopList")
    }
  },
  methods:{
    getSummaries1(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计';
          return;
        }
        if(index == 2){
          sums[index] = ''
          return
        }
        if(index > 0 && index <= 5 && index > 11){
          sums[index] = ''
          return
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) { return prev + curr }
            else { return prev }
          }, 0);
          sums[index] += '';
        } else {
          sums[index] = '';
        }
      })

      return sums;
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计';
          return;
        }
        if(index > 0 && index < 8){
          sums[index] = ''
          return
        }
        if(index == 9){
          sums[index] = this.isPurViewFun(91040112) ? this.dataObj.GOODSMONEY : '****'
          return

        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) { return prev + curr }
            else { return prev }
          }, 0);
          sums[index] += '';
        } else {
          sums[index] = '';
        }
      })

      return sums;
    },
    tableRowClassName({row, rowIndex}){
      if(row.ISCHECK == true && row.ISCANCEL == true && this.radioStatus == 0){
        return 'orangeColor'
      }else if(row.ISCHECK == false && row.ISCANCEL == false && this.radioStatus == 0){
        return 'grayColor'
      }
      return ''
    },
    exportTable(){
      let list = this.exportList
      for(let i in list){
        list[i].TOTALNUMBER = list[i].GOODSQTY * list[i].GOODSMONEY
        let status = ''
        if(list[i].ISCHECK == true && list[i].ISCANCEL == false){
          status = '已入库'
        }else if(list[i].ISCHECK == true && list[i].ISCANCEL == true){
          status = '已作废'
        }else if(list[i].ISCHECK == false && list[i].ISCANCEL == false){
          status = '草稿单'
        }
        list[i].STATUS = status
        list[i].BILLDATE = dayjs(list[i].BILLDATE).format('YYYY-MM-DD')
      }
      var head = ['状态','供应商名称','业务日期','单据编号','入库店铺','采购数量','采购金额','优惠金额','其它费用','总合计','实付金额','备注']
      var val =['STATUS','SUPPLIERNAME','BILLDATE','BILLNO','SHOPNAME','GOODSQTY','GOODSMONEY','BREAKSMONEY','OTHERMONEY','TOTALMONEY','PAYMONEY','REMARK']
      var title = "采购入库历史" + this.getNowDateTime();
      this.export2Excel(head, val, list, title);
    },
    searchList(value){  //关键字搜索（单号、供应商、店铺）
      this.sendDataInfo.Filter = value
      this.sendDataInfo.PN = 1
      this.getHistoryList()
    },
    cancelBill(value, status){
      let title = status == 'zf' ? '作废' : '删除'
      let agentPermission = getUserInfo().List
      if(status == 'zf' && !this.isPurViewFun(91040114)){
        this.$message.warning('没有此功能权限，请联系管理员授权!')
      }else{
        this.$confirm( '确认' +  title + '该单据', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('cancelWarehousing', { BillId : value })
        }).catch(()=>{})
      }
    },
    handlePrint(isPrintStatu, BillId, item){  //打印
      if(isPrintStatu =='打印'){
        getDayindate('91020407', BillId, 14, '')
      } else{
        let param = this.theGoodsListInfo, newArr = []
        for(let i=0;i<param.length;i++){
          newArr.push({
            GoodsId : param[i].GOODSID,
            Qty: param[i].QTY,
            Price: param[i].PRICE,
            ColorId: param[i].COLORID,
            SizeId: param[i].SIZEID,
            Remark:''
          })
        }

        let sendData = {
          ShopId: item.SHOPID,
          BillId: item.BILLID,
          SupplierId: item.SUPPLIERID,
          BillDate: new Date().getTime(),
          ManualNo: '', //手工单号
          PayTypeId: this.pageData.PAYTYPEID, // 付款方式ID
          PayMoney: item.PAYMONEY,
          Remark: item.REMARK,
          GoodsList: JSON.stringify(newArr),
          IsCheck: 1 ,   // 0: 草稿  1： 确认单
          FromBillId: '', // 引用采购单号
          BreaksMoney: this.pageData.BREAKSMONEY,
          OtherMoney: this.pageData.OTHERMONEY
        }
        this.$store.dispatch('addWarehousing',sendData)
      }
    },
    handleDraft(editStatu, BillId){
      if(editStatu == '作废'){
        let agentPermission = getUserInfo().List
        if(!this.isPurViewFun(91040114)){
          this.$message.warning('没有此功能权限，请联系管理员授权!')
        }else{
          this.$confirm('确认作废该单据', '提示',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(()=>{
            this.$store.dispatch('cancelWarehousing', { BillId : BillId })
          }).catch(()=>{})
        }
      }else{
        let that = this
        this.$store.dispatch('cgdWarehousingDataList', '').then(()=>{
          sessionStorage.setItem('theGoodsList', JSON.stringify(this.theGoodsListInfo))
          sessionStorage.setItem('theGoodsObj', JSON.stringify(this.pageData))
          this.isShowDialog = false
          this.$emit('isAddNewBill_W', true)
        })
      }
    },
    addNewBill(val){ // 新增单据
      if(val == 1){
        this.isShowDialog = false
      }
      this.$emit('isAddNewBill_W', true)
    },
    viewCurInfo(item, idx){
      this.isShowDialog = true
      this.infoList = item
      if(item.ISCHECK == true && item.ISCANCEL == false){
        this.title = ' 已入库 '
        this.editStatu = '作废'
        this.isPrintStatu = '打印'
      }else if(item.ISCHECK == true && item.ISCANCEL == true){
        this.title = ' 已作废 '
        this.editStatu = ''
        this.isPrintStatu = ''
      }else if(item.ISCHECK == false && item.ISCANCEL == false){
        this.title = ' 草稿单 '
        this.editStatu = '草稿'
        this.isPrintStatu = '保存'
      }
      this.$store.dispatch("getWarehousingItem", { BillId : item.BILLID }).then(()=>{
        this.loadingInfo = true
        this.pageData = {}
      });
    },
    cancelSearch(){  // 取消高级搜索
      this.isFilter = false
      this.supplierId = ''
      this.shopId = getHomeData().shop.SHOPID
      this.dateList = null
      this.submitChoose()
    },
    submitChoose(){  //采购入库高级搜索
      this.sendDataInfo.BeginDate = this.dateList == null ? 1 : new Date(this.dateList[0]).getTime()
      this.sendDataInfo.EndDate = this.dateList == null ? 9999999999999 : new Date(this.dateList[1]).getTime()
      this.sendDataInfo.SupplierId = this.supplierId
      this.sendDataInfo.ShopId = this.shopId
      this.sendDataInfo.PN = 1
      this.getHistoryList()
      this.isFilter = false
    },
    curRadioStatus(){  //采购入库状态切换
      var IsCheck = -1, IsCancel = -1;
      if(this.radioStatus == 0) { IsCheck = -1, IsCancel = -1 } //全部
      else if(this.radioStatus == 1){ IsCheck = 1, IsCancel = 0 } // 已入库
      else if(this.radioStatus == 2){ IsCheck = 0, IsCancel = 0 } // 草稿单
      else if(this.radioStatus == 3){ IsCheck = 1, IsCancel = 1 } // 已作废

      this.sendDataInfo.IsCheck = IsCheck
      this.sendDataInfo.IsCancel = IsCancel
      this.sendDataInfo.PN = 1
      this.getHistoryList()
    },
    handlePageChange: function(currentPage) {
      if (this.sendDataInfo.PN == currentPage || this.loading) {
        return;
      }
      this.sendDataInfo.PN = parseInt(currentPage);
      this.getHistoryList();
    },
    getHistoryList(){
      this.sendDataInfo.ShopId = this.shopId
      this.$store.dispatch('getWarehousingList', this.sendDataInfo).then(()=>{
        this.loading = true
      })
      this.$store.dispatch('getWarehousingList_Export', this.sendDataInfo)
    }
  }
}
</script>

<style>
.el-table .orangeColor{ color:#ff6633}
.el-table .grayColor{ color:#999}
</style>

