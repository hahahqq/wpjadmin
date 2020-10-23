 <template>
  <div class='history'>
    <div class="content-eighty">
        <div class="content-center">
          <input type="file" ref="upload" accept=".xls, .xlsx" class="outputlist_upload hide">
          <div class='history_top' style='width:100%; float:Left; margin-bottom:10px'>
            <el-row>
              <el-col :span='4'>
                <el-button size="small" @click="addNewBill(0)" icon="el-icon-plus">新增单据</el-button>
                <el-button size="small" icon="el-icon-download" @click="exportTable">导出</el-button>
              </el-col>
              <el-col :span='8' style='text-align:right;'>
                <el-radio-group size="small" v-model='radioStatus' @change='curRadioStatus'>
                  <el-radio-button v-for='(item,index) in billStatusList' :key='index' :label='item.id'>{{item.name}}</el-radio-button>
                </el-radio-group>
                &nbsp;
              </el-col>
              <el-col :span="4" style='text-align:right'>
                <el-input size='small' v-model='searchText' placeholder="输入单号、店铺" @input='searchList(searchText)'></el-input>
              </el-col>
              <el-col :span="4" style='text-align:right'>
                <el-date-picker
                  size="small"
                  style='margin-left:10px'
                  v-model="dateList"
                  type="daterange"
                  align="right"
                  unlink-panels
                  @change='dateChoose()'
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions">
                </el-date-picker>
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
            header-row-class-name="bg-f1f2f3"
            :row-class-name="tableRowClassName"
            :height="tableHeight"
            style="width: 100%;">
            <el-table-column prop="RN" label="序号" fixed="left" width="60" align="center"></el-table-column>
            <el-table-column label="状态" fixed='left' align="center" width="70">
              <template slot-scope="scope">
                <span v-if='scope.row.ISCHECK == true && scope.row.ISCANCEL == false && scope.row.ISFLAG == true'> 已调拨</span>
                <span v-else-if='scope.row.ISCHECK == true && scope.row.ISCANCEL == false && scope.row.ISFLAG == false'>待调入</span>
                <span v-else-if='scope.row.ISCHECK == false && scope.row.ISCANCEL == false && scope.row.ISFLAG == false'>草稿单</span>
                <span v-else-if="scope.row.ISCHECK == true && scope.row.ISCANCEL == true && scope.row.ISFLAG == false">已作废</span>
              </template>
            </el-table-column>
            <el-table-column label="业务日期" align="center" width="90">
              <template slot-scope="scope">
                <span> {{new Date(scope.row.BILLDATE) | time}}</span>
              </template>
            </el-table-column>
            <el-table-column label="单据编号" prop='BILLNO' align="center"></el-table-column>
            <el-table-column label="调出店铺" prop='SHOPNAME' align="center"></el-table-column>
            <el-table-column label="调入店铺" prop='INSHOPNAME' align="center"></el-table-column>
            <el-table-column label="调拨数量" prop='GOODSQTY' align="center"></el-table-column>
            <el-table-column label="调拨金额" prop='GOODSMONEY' align="center"></el-table-column>
            <el-table-column label="备注" prop='REMARK' show-overflow-tooltip>
              <template slot-scope="scope">
                {{ scope.row.REMARK == 'undefined' ? '' : scope.row.REMARK }}
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed='right' width="100">
              <template slot-scope="scope">
                <el-button type='text' @click='viewCurInfo(scope.row, scope.$index)'>详情</el-button>
                <el-button v-if='scope.row.ISCHECK == true && scope.row.ISCANCEL == false && scope.row.ISFLAG == true' type='text' @click='cancelBill(scope.row.BILLID, "zf")'>作废</el-button>
                <el-button v-if='scope.row.ISCHECK == true && scope.row.ISCANCEL == false && scope.row.ISFLAG == false' type='text' @click='cancelBill(scope.row.BILLID,"dr")'>调入</el-button>
                <el-button v-if='scope.row.ISCHECK == false && scope.row.ISCANCEL == false && scope.row.ISFLAG == false' type='text' @click='cancelBill(scope.row.BILLID,"sc")'>删除</el-button>
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
        <span>调出店铺 : {{infoList.SHOPNAME}}</span>
        <span style='margin-left:4%'>调入店铺 : {{infoList.INSHOPNAME}}</span>
        <span style='float:right'>业务日期 : {{new Date(infoList.BILLDATE) | timehf}}</span>
      </div>
      <el-table
        border size='small'
        :data="theGoodsListInfo"
        height='300'
        header-row-class-name="bg-f1f2f3"
        class="full-width m-top-sm"
        v-loading="loadingInfo">
        <el-table-column type='index' width='50' align="center" label="序号" fixed='left'></el-table-column>
        <el-table-column prop='GOODSNAME' label="商品" fixed='left'></el-table-column>
        <el-table-column prop='GOODSCODE' label="货号" align="center" ></el-table-column>
        <el-table-column prop='COLORNAME' label="颜色" align="center" ></el-table-column>
        <el-table-column prop='SIZENAME' label="尺码" align="center" ></el-table-column>
        <el-table-column prop='PURPRICE' label="进货价" width="100" align="center" >
          <template slot-scope="scope">
            {{isPurViewFun(91040112) ? scope.row.PURPRICE : '****'}}
          </template>
        </el-table-column>
        <el-table-column prop='DISCOUNT' label="折扣" width='100' align="center" ></el-table-column>
        <el-table-column prop="PRICE" label="单价" width="80" align="center" >
          <template slot-scope="scope">
            {{isPurViewFun(91040112) ? scope.row.PRICE : '****'}}
          </template>
        </el-table-column>
        <el-table-column prop="QTY" label="数量" width="80" align="center"></el-table-column>  
        <el-table-column width="100" label="金额" align="center" >
          <template slot-scope='scope'>
            <span>{{isPurViewFun(91040112) ? (scope.row.PRICE * scope.row.QTY) : '****'}}</span>
          </template>
        </el-table-column>
      </el-table>

      <el-row :gutter="24" class="marginTB-sm  p-top-sm">
        <el-col :span="24">
          <span>备 注：</span>
          <span>{{pageData.REMARK != undefined ? pageData.REMARK : ''}}</span>
        </el-col>
      </el-row>

      <div class='marginTB-sm' style='padding-bottom:30px'>
        <span class='text-999 m-top-sm' style='float:left'>
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
import MIXNINS_EXPORT from "@/mixins/exportData.js";
import { getHomeData, getUserInfo } from "@/api/index";
import dayjs from 'dayjs';
import { getDayindate } from "@/util/Printing"
export default {
  mixins: [ MIXNINS_EXPORT.TOEXCEL, MIXNINS_EXPORT.TODATA],
  data(){
    return {
      loading: false,
      loadingInfo:false,
      pagelist:[],
      dateList:null,
      pickerOptions: {
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
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
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
      searchText:'',
      radioStatus:1,
      infoList:{},
      isFilter: false,
      sendDataInfo :{
        BeginDate: 1,
        EndDate: 9999999999999,
        SupplierId: '',
        BillNo: '',
        IsCheck: 1,  // 是否确认, -1=all,0=草稿,1=确认单
        IsCancel: 0, // 是否作废,-1=all,0=正常,1=已作废
        IsFlag: 1,   // 是否调入 -1=all,0=未调入,1=已调入
        PN: 1,
        Status: 1
      },
      pagination: {
        TotalNumber: 0,
        PageNumber: 0,
        PageSize: 20,
        PN: 0
      },
      billStatusList:[
        // { id:0, name:'全部' },
        { id:1, name:'已调拨' },
        { id:2, name:'待调入' },
        { id:3, name:'草稿单' },
        { id:4, name:'已作废' }
      ],
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
      },
      title:'',
      editStatu:'',
      isPrintStatu:'',
      showEditStatu:true,
      exportList:[],
      tableHeight: document.body.clientHeight - 230,
      showBarcodePrinter: false
    }
  },
  computed:{
    ...mapGetters({
      allocationListState:'allocationListState',
      supplierList: "supplierList",
      dataState:'allocationState',
      dataList: 'allocationItem',
      dataObj: 'allocationObj',
      allocationCancel:'allocationCancel',
      saveAllocationState:'saveAllocationState',
      dataExportState:'allocationExportState',
      allocationAddState:'allocationAddState',
      cgdAllocationDataList:'cgdAllocationDataList'
    })
  },
  components: {
    barcodePrint: () => import('../barcodePrint.vue')
  },
  watch:{
    cgdAllocationDataList(data){ },
    dataExportState(data){
      if(data.success){
        this.exportList = [...data.data.List]
      }
    },
    saveAllocationState(data){
      this.$message({ type: data.success ? 'success' : 'error', message: data.message })
      if(data.success){
        this.getHistoryList();
      }
    },
    allocationListState(data){
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
        this.$message(data.message)
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
        this.pageData = this.dataObj
      }else{
        this.$message({
          type: "error", message: data.message
        });
      }
    },
    allocationCancel(data){
      this.$message({ type: data.success ? 'success' : 'error', message: data.message })
      if(data.success){
        this.isShowDialog = false
        this.getHistoryList()
      }
    },
    allocationAddState(data){
      this.$message({ type: data.success ? 'success' : 'error', message: data.message })
      if(data.success){
        this.isShowDialog = false
        this.getHistoryList()
      }
    }
  },
  mounted(){
    this.getHistoryList()
    if (this.supplierList.length == 0) {
      this.$store.dispatch("getSupplierList", { IsStop: 0, IsCurr :0 });
    }
  },
  methods:{
    tableRowClassName({row, rowIndex}){
      if(row.ISCHECK == true && row.ISCANCEL == false && row.ISFLAG == false && this.radioStatus == 1){
        return 'orangeColor'
      }else if(row.ISCHECK == true && row.ISCANCEL == true && row.ISFLAG == false && this.radioStatus == 1){
        return 'grayColor'
      }else if(row.ISCHECK == false && row.ISCANCEL == false && row.ISFLAG == false && this.radioStatus == 1){
        return 'dddColor'
      }
      return ''
    },
    exportTable(){
      let list = this.exportList
      for(let i in list){
        let status = ''
        if(list[i].ISCHECK == true && list[i].ISCANCEL == false && list[i].ISFLAG == true){
          status = '已调拨'
        }else if(list[i].ISCHECK == true && list[i].ISCANCEL == false && list[i].ISFLAG == false){
          status = '待调入'
        }else if(list[i].ISCHECK == true && list[i].ISCANCEL == true && list[i].ISFLAG == false){
          status = '已作废'
        }else if(list[i].ISCHECK == false && list[i].ISCANCEL == false && list[i].ISFLAG == false){
          status = '草稿单'
        }
        list[i].STATUS = status
        list[i].BILLDATE = dayjs(list[i].BILLDATE).format('YYYY-MM-DD')
      }
      var head = ['状态','业务日期','单据编号','调出店铺','调入店铺','调拨数量','调拨金额','备注']
      var val =['STATUS','BILLDATE','BILLNO','SHOPNAME','INSHOPNAME','GOODSQTY','GOODSMONEY','REMARK']
      var title = "库存调拨历史" + this.getNowDateTime();
      this.export2Excel(head, val, list, title);
    },
    dateChoose(){
      this.sendDataInfo.BeginDate = this.dateList == null ? 1 : new Date(this.dateList[0]).getTime()
      this.sendDataInfo.EndDate = this.dateList == null ? 9999999999999 : new Date(this.dateList[1]).getTime()
      this.sendDataInfo.PN = 1
      this.getHistoryList()
    },
    searchList(value){
      this.sendDataInfo.Filter = value
      this.sendDataInfo.PN = 1
      this.getHistoryList()
    },
    cancelBill(value, type){
      let title = type == 'zf' ? '作废' : type == 'sc' ? '删除' : '调入'
      let agentPermission = getUserInfo().List
      if(type == 'zf' && !this.isPurViewFun(91040114)){
        this.$message.warning('没有此功能权限，请联系管理员授权!')
      }else{
        this.$confirm( '确认' +  title + '该单据', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(type == 'zf' || type == 'sc'){
            this.$store.dispatch('cancelAllocation', { BillId: value})
          }else{  
            this.$store.dispatch('saveAllocationBill', {BillId: value})
          }
        }).catch(()=>{ })
      }
    },
    handlePrint(isPrintStatu, BillId, item){  //弹窗列表是否打印状态
      if(isPrintStatu =='打印'){
        getDayindate('91020417', BillId, 16, '');
      }else if( isPrintStatu == '确认调入'){
        this.$store.dispatch('saveAllocationBill', {BillId: BillId})
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
          BillId: item.BILLID,
          BillDate: new Date().getTime(),
          ManualNo: '', //手工单号
          Remark: this.pageData.REMARK,
          GoodsList: JSON.stringify(newArr),
          IsCheck: 1,
          ShopId: item.SHOPID,
          InShopId: item.INSHOPID
        }
        this.$store.dispatch('addAllocation',sendData)
      }
    },
    handleDraft(editStatu, BillId){  //弹窗列表是否作废状态
      if(editStatu == '作废'){
        if(!this.isPurViewFun(91040114)){
          this.$message.warning('没有此功能权限，请联系管理员授权!')
        }else{
          this.$confirm('确认作废该单据', '提示',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(()=>{
            this.$store.dispatch('cancelAllocation', { BillId: BillId})
          }).catch(()=>{})
        }
      }else{
        this.$store.dispatch('cgdAllocationDataList', '').then(()=>{
          sessionStorage.setItem('theGoodsList_A', JSON.stringify(this.theGoodsListInfo))
          sessionStorage.setItem('theGoodsObj_A', JSON.stringify(this.pageData))
          this.isShowDialog = false
          this.$emit('isAddNewBill_A', true)
        })
      }
    },
    addNewBill(val){ // 新增单据
      if(val == 1){
        this.isShowDialog = false
      }
      this.$emit('isAddNewBill_A', true)
    },
    viewCurInfo(item, idx){
      this.isShowDialog = true
      this.infoList = item
      if(item.ISCHECK == true && item.ISCANCEL == false && item.ISFLAG == true){
        this.title = ' 已调拨'
        this.editStatu = '作废'
        this.isPrintStatu = '打印'
        this.showEditStatu = true
      }else if(item.ISCHECK == true && item.ISCANCEL == false && item.ISFLAG == false){
        this.title = '待调入'
        this.editStatu = '作废'
        this.isPrintStatu = '确认调入'
        this.showEditStatu = true
      }else if(item.ISCHECK == true && item.ISCANCEL == true && item.ISFLAG == false){
        this.title = '已作废'
        this.editStatu = ''
        this.isPrintStatu = ''
        this.showEditStatu = false
      }else if(item.ISCHECK == false && item.ISCANCEL == false && item.ISFLAG == false){
        this.title = '草稿单'
        this.editStatu = '草稿'
        this.isPrintStatu = '保存'
        this.showEditStatu = true
      }
      this.$store.dispatch("getAllocationItem", { BillId : item.BILLID }).then(()=>{
        this.loadingInfo = true
      })
    },
    curRadioStatus(){  //库存调拨状态切换
      var IsCheck = -1, IsCancel = -1, IsFlag = -1;
      if(this.radioStatus == 0) { IsCheck = -1, IsCancel = -1, IsFlag = -1 } //全部
      else if(this.radioStatus == 1){ IsCheck = 1, IsCancel = 0, IsFlag = 1 } // 已调拨
      else if(this.radioStatus == 2){ IsCheck = 1, IsCancel = 0, IsFlag = 0 }  // 待调入
      else if(this.radioStatus == 3){ IsCheck = 0, IsCancel = 0, IsFlag = -1 } // 草稿单
      else if(this.radioStatus == 4){ IsCheck = 1, IsCancel = 1, IsFlag = -1 } // 已作废

      this.sendDataInfo.IsCheck = IsCheck
      this.sendDataInfo.IsCancel = IsCancel
      this.sendDataInfo.IsFlag = IsFlag
      this.sendDataInfo.PN = 1
      this.sendDataInfo.Status = this.radioStatus
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
      this.$store.dispatch('getAllocationList', this.sendDataInfo).then(()=>{
        this.loading = true
      })
      this.$store.dispatch('getAllocationList_Export', this.sendDataInfo)
    }
  }
}
</script>

<style>
.el-table .orangeColor{ color:#ff6633}
.el-table .grayColor{ color:#999}
.el-table .dddColor{ color:#137deb}
</style>

