<template>
  <div class="inventory">
    <div class="content-eighty">
      <div class="content-center">
        <el-row :gutter="10">
          <!-- <el-col :span="5"> -->
            <span>店铺</span>
            <el-select size='small' style="width: 140px" v-model="shopId" placeholder="请选择店铺">
              <el-option v-for="item in shopList" :key="item.ID" :label="item.NAME" :value="item.ID"></el-option>
            </el-select>
          <!-- </el-col> -->

          <!-- <el-col :span="6"> -->
            <span style="margin-left: 16px">盘点范围
              <el-tooltip class="item" effect="dark" placement="top-start">
                <div slot="content">
                  全店盘点：对全店商品进行盘点，有库存数未被盘点到的商品会被更新成0
                  <br> <br>
                  单品盘点：只针对盘点单中已盘点的商品进行库存核对更新
                </div>
                <el-button type="text" style="color:#333" icon="el-icon-question"></el-button>
              </el-tooltip>
            </span>

            <el-radio-group v-model="radio1" size="small">
              <el-radio-button label="单品盘点"></el-radio-button>
              <el-radio-button label="全店盘点"></el-radio-button>
            </el-radio-group>
          <!-- </el-col> -->

          <!-- <el-col :span="6" style="text-align:right"> -->
            <span style="text-align:right; float:right">
            <el-input
              type="default"
              v-model="searchText" size='small'
              @keydown.enter.native="scanSearch(searchText)"
              autofocus="true"
              placeholder="请扫描商品或单品条形码"
              style="width:260px;"
            >
              <div slot="prepend">
                <i class="icon-barcode"></i>
                <span class="m-left-xs">扫码</span>
              </div>
            </el-input>
          <!-- </el-col> -->

          <!-- <el-col :span="7" style="float:right; text-align:right"> -->
            <span style="margin-left: 16px">盘点日期</span>
            <el-date-picker size="small"
              style="width: 140px; text-align:right"
              v-model="BILLDATE"
              type="date"
              value-format="timestamp"
              placeholder="选择日期"
            ></el-date-picker>
          <!-- </el-col> -->
          </span >
        </el-row>
      </div>
    </div>

    <div class="content-table4">
      <div class="content-table-center">
        <el-button size="small" type="primary" plain icon="el-icon-plus" @click.native="addTab(editableTabsValue)">新增子单</el-button>
        <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" @tab-click="handleClick" style="width: 100%; margin-top:10px; margin-bottom:10px; float:left">
          <el-tab-pane
            v-for="(item,index) in editableTabs"
            :key="item.name"
            :label="`${USERNAME}${index > 0 ? ' ( 子单'+(index+1)+' )' : ''}`"
            :name="item.name"
            style="min-width:60px"
          >
          </el-tab-pane>
        </el-tabs>

        <el-table
          border size='small'
          :data="editableTabs[editableTabsValue].tableData"
          :height="tableHeight"
          @row-click='handleCurRow'
          :highlight-current-row='true'
          header-row-class-name="bg-f1f2f3"
          empty-text='暂无数据,请点击 "增加行" 或 扫码添加商品'
          class="full-width m-top-sm"
        >
          <el-table-column type='index' width='70' align="center" label="序号" fixed='left'></el-table-column>
          <el-table-column label="商品" fixed='left' align="center">
            <template slot-scope="scope" >
              <span v-if='!scope.row.isEdit && scope.row.SIZENAME != ""'>{{scope.row.GOODSNAME}}</span>
              <span v-if='scope.row.isEdit && scope.row.SIZENAME != ""'>{{scope.row.GOODSNAME}}</span>
              <el-select
                size="small"
                v-if='scope.row.isEdit == true && scope.row.SIZENAME == ""'
                v-model="scope.row.GOODSID"
                :remote-method="handleGoodsFilter"
                reserve-keyword
                remote
                clearable
                @change='curSelect(scope.$index,scope.row)'
                @focus='defaultGoodsList'
                filterable
                placeholder="请输入货号、品名或条码">
                <el-option v-for='(item,index) in goodsListData' :key='index' :label='item.NAME' :value='item.ID'>
                  <span style='float:left'>{{item.CODE}}</span>
                  <span style="float:right; color: #8492a6; font-size: 12px">{{ item.NAME }}</span>
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop='GOODSCODE' label="货号" align="center" width="160"></el-table-column>
          <el-table-column prop='COLORNAME' label="颜色" align="center" width="80" ></el-table-column>
          <el-table-column prop='SIZENAME' label="尺码" align="center" width="80"></el-table-column>

          <el-table-column prop="PRICE" label="单价" align="center" width="150">
            <!-- <template slot-scope="scope"> -->
              <!-- <span v-if='!scope.row.isEdit && scope.row.SIZENAME !=""'>{{scope.row.PRICE}}</span> -->
              <!-- <el-input-number v-if='scope.row.isEdit && scope.row.SIZENAME == ""' size='small' style="width:110px" disabled controls-position="right" v-model.trim="scope.row.PRICE" placeholder="请输入"></el-input-number> -->
              <!-- <el-input-number v-if='scope.row.isEdit && scope.row.SIZENAME != ""' size='small' style="width:110px" controls-position="right" v-model.trim="scope.row.PRICE" placeholder="请输入"></el-input-number> -->
            <!-- </template> -->
          </el-table-column>

          <el-table-column label="数量" align="center" width="150">
            <template slot-scope='scope'>
              <span v-if='!scope.row.isEdit && scope.row.SIZENAME !=""'>{{scope.row.QTY}}</span>
              <el-input-number v-if='scope.row.isEdit && scope.row.SIZENAME == ""' size='small' style='width:110px' disabled controls-position="right" :min="0" v-model.trim="scope.row.QTY" placeholder="请输入"></el-input-number>
              <el-input-number v-if='scope.row.isEdit && scope.row.SIZENAME != ""' size='small' style='width:110px' controls-position="right" :min="0" v-model.trim="scope.row.QTY" placeholder="请输入"></el-input-number>
            </template>
          </el-table-column>

          <el-table-column label="金额" align="center" width="130">
            <template slot-scope='scope'>
              <span>{{(scope.row.PRICE * scope.row.QTY).toFixed(2)}}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="80" fixed='right' >
            <template slot-scope='scope'>
              <el-button v-if='scope.row.GOODSID != "" && scope.row.SIZENAME !=""' type="text" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-row :gutter="10" class="marginTB-sm">
          <el-col :xs="12" :sm="8" :md="12" class="row-flex flex-items-center">
            <span class="leftLabel">备 注 </span>
            <el-input size="small" v-model="pageData.REMARK" placeholder="输入单据备注"></el-input>
          </el-col>
        </el-row>

        <div class='marginTB-sm'>
          <span class='text-999 m-top-sm' style='float:left'>
            <span style=''>制单时间 :  &nbsp; </span>
            {{zhiDanData}}
          </span>
          <span class='text-right' style='float:right'>
            <el-button style='margin-right:40px' plain icon='el-icon-upload' @click='showUploadDialog = true'>导 入</el-button>
            <el-button type="success" plain icon="el-icon-plus" @click='addNewBill'>新增单据</el-button>
            <el-button type="info" @click="handleSubmit(0)" :disabled="editableTabs[editableTabsValue].tableData.length == 0" :loading="CGloading">草稿</el-button>
            <el-button type="primary" @click="handleSubmit(1)" :disabled="editableTabs[editableTabsValue].tableData.length == 0" :loading="loading">盘点汇总</el-button>
          </span>
        </div>
      </div>
    </div>

    <el-dialog :title='titleName' :visible.sync="isAddGoodsGroup" width="70%" append-to-body>
      <span>点击颜色可批量设置该颜色的数量</span>

      <table class='tableStock m-top-sm' border='0' cellspacing='0' cellpadding='0' width='100%'>
        <thead>
          <tr>
            <th style="width:100px">颜色</th>
            <th v-for="(size,indexS) in currentSizes" :key="indexS">{{size.SIZENAME}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for='(color, indexC) in currentColors' :key='indexC'>
            <td @click='batchAddNum(color, indexC)' class="namehover">
              {{color.COLORNAME}}
            </td>
            <td v-for="(size,indexS) in currentSizes" :key="indexS">
              <el-input type="number" v-model.number="color[size.SIZEID]" :min="0"></el-input>
            </td>
          </tr>
        </tbody>
      </table>

      <div style='margin:16px auto; text-align:center;'>
        <el-button type='info' @click='cancelAdd()' plain="">取消 (Esc)</el-button>
        <el-button type='primary' plain="" @click='twoDisConfirm()' >确认 (Enter)</el-button>
      </div>

      <el-collapse :accordion='true'>
        <el-collapse-item>
          <template slot="title"><span style='font-size:16px; color:red'>显示库存</span> </template>
          <table class='tableStock' border='0' cellspacing='0' cellpadding='0' width='100%' >
            <thead>
              <tr>
                <th style="width:100px">颜色</th>
                <th v-for="(size,indexS) in currentSizes" :key="indexS">{{size.SIZENAME}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for='(color, indexC) in currentColors' :key='indexC'>
                <td>{{color.COLORNAME}}</td>
                <td v-for="(size,indexS) in currentSizes" :key="indexS">
                  <span>{{storedCount[color.COLORID][size.SIZEID]}}</span>
                </td>
              </tr>
            </tbody>
          </table>

        </el-collapse-item>
      </el-collapse>

    </el-dialog>

    <el-dialog title="导入库存盘点单" :visible.sync="showUploadDialog" width="94%" append-to-body :close-on-click-modal='false'>
      <uploadBillTable @closeModal='showUploadDialog = false' @GetUploadExportData='getUploadData' :dealUploadData="{dealState:'noDiscount'}"></uploadBillTable>
    </el-dialog>

    <el-dialog :title="`盘点单汇总 —— ${radio1}`" :visible.sync="showSumDialog" width="90%" append-to-body="" :close-on-click-modal="false" :before-close='closeDialog'>
      <el-row :gutter="10" style="line-height:40px">
        <el-col :span="5">
          分类
          <el-select v-model="GoodsType" placeholder="请选择分类" size="small"  @change="selectMode" clearable>
              <el-option
                v-for="item in commoditycflList"
                :key="item.ID"
                :label="item.NAME"
                :value="item.ID">
              </el-option>
          </el-select>

        </el-col>

        <el-col :span="5">
          盈亏状况
          <el-select v-model="Type" clearable size="small" placeholder="请选择盈亏状况" @change="selectMode" style="width: 150px; margin-left: 6px">
            <el-option value="0" label="盘盈"></el-option>
            <el-option value="2" label="正常"></el-option>
            <el-option value="1" label="盘亏"></el-option>
          </el-select>
        </el-col>

        <el-col :span="14">
          <el-input size="small" clearable v-model='Filter' @keyup.enter.native="getNewData" style="width: 300px; float:right" placeholder="输入商品信息" >
            <el-button slot="append" @click="getNewData">搜索</el-button>
          </el-input>
        </el-col>
      </el-row>

      <el-table
        border size='small'
        :data="sumBillTable"
        :highlight-current-row='true'
        header-row-class-name="bg-f1f2f3"
        empty-text='暂无数据'
        :height="sumTableHeight"
        show-summary
        :summary-method="getSummaries"
        class="full-width m-top-sm"
        :row-class-name="tableRowClassName"
      >
        <el-table-column type='index' width='70' align="center" label="序号" fixed='left'></el-table-column>
        <el-table-column prop='GOODSNAME' label="商品"></el-table-column>
        <el-table-column prop='GOODSCODE' label="货号"></el-table-column>
        <el-table-column prop='COLORNAME' label="颜色" align="center"></el-table-column>
        <el-table-column prop='SIZENAME' label="尺码" width="80" align="center"></el-table-column>
        <el-table-column prop='BARCODE' label="条码"></el-table-column>
        <el-table-column prop='UNITNAME' align="center" label="单位" width="90"></el-table-column>
        <el-table-column prop='TYPENAME' align="center" label="分类" width="90"></el-table-column>

        <el-table-column width="90" prop='STOCKQTY' align="right" label="盘点数量"></el-table-column>
        <el-table-column width="90" prop='CURSTOCKQTY' align="right" label="盘点前数量"></el-table-column>
        <el-table-column prop='QTY' align="right" label="盈亏数量"></el-table-column>
        <el-table-column prop='MONEY' align="right" label="盈亏金额"></el-table-column>
      </el-table>

      <div class="p-top-md full-width" style="display:table">
        <span class="pull-left" style="line-height:40px; ">
          <i style="margin-right: 30px; font-weight:bold">盘点总数： {{sumBillSkuObj.SUMQTY}}</i>
          <i style="margin-right: 30px; font-weight:bold">盈亏总数： {{sumBillSkuObj.UQTY - sumBillSkuObj.DQTY}}</i>
          <i style="font-weight:bold">盈亏总金额： {{sumBillSkuObj.UMONEY - sumBillSkuObj.DMONEY}}</i>
        </span>
        <span class="pull-right text-right">
          <el-button plain icon="el-icon-download" @click="exportTable">导出</el-button>
          <el-button type="primary" @click="submitInventory" :disabled='isOkInventory == true'>完成盘点</el-button>
        </span>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import { getHomeData, getUserInfo } from "@/api/index";
import dayjs from 'dayjs'
import music from '@/assets/12053.mp3'
import MIXNINS_EXPORT from "@/mixins/exportData.js";
export default {
   mixins: [MIXNINS_EXPORT.TOEXCEL, MIXNINS_EXPORT.TODATA],
  data() {
    return {
       isOkInventory: false,
      radio1: '单品盘点',
      GoodsType:'',
      Type: '',
      Filter: '',
      editableTabsValue: '0',
      editableTabs: [{
        name: '0',
        userid: '',
        label: getUserInfo().UserName,
        tableData: [{
          GOODSNAME: "",
          GOODSID:'',
          GOODSCODE: "",
          PRICE: 0,
          PURPRICE: 0,
          SIZENAME: "",
          COLORNAME: "",
          QTY: 1,
          isEdit: true
        }]
      }],
      tabIndex: 0,
      loading: false,
      CGloading: false,
      shopId: getHomeData().shop.SHOPID,
      titleName: '',
      searchText:'',
      BILLDATE: dayjs(),
      USERNAME: getUserInfo().UserName,
      pageData: {
        BILLID:'',
        BILLDATE: new Date(),
        ManualNo: "", //手工单号
        REMARK: "",
        WRITER:'',
        GoodsList: [], // 货号Id,颜色Id,尺码Id,数量,单价,备注
        IsCheck: 1,
        FromBillId: "" // 引用采购单号
      },
      pageDataBill: {
        PN: 1,
        Filter: "",
        Status: 1,
        TypeID: '', //商品类别ID
        DescType: 0,
        IsGift: -1,
        YearList: '',
        SeasonList: '',
        BrandList: '',
        CategoryList: '',
        SexNameList: '',
      },
      zhiDanData: dayjs(new Date()).format('YYYY-MM-DD'),
      currentColors:[],
      currentSizes:[],
      storedCount:[],
      stockList:[],
      goodsListData:[],
      constGOODSLIST: [],
      showUploadDialog: false,
      isAddGoodsGroup: false,
      vCheckGoodsTimeOut: undefined,
      tableHeight: document.body.clientHeight - 400,
      sumTableHeight: document.body.clientHeight - 280,
      suborderNum: 1,
      showSumDialog: false,
      firstBillID: '',
      sumBillTable: [],
      sumBillSkuObj: {},
      saveState: 0,
      curTabIdx: 0,
      editableTabs1: []
    }
  },
  computed: {
    ...mapGetters({
      shopList: "shopList",
      goodsState: "goodsState",
      goodsItem: "goodsItem",
      goodsList2: 'goodsList2',
      goodsListState2:'goodsListState2',
      dataList: 'inventoryItem',
      dataState:'inventoryState',
      dataObj: 'inventoryObj',
      inventoryAddState:'inventoryAddState',
      OnlyOneGoodsState:'OnlyOneGoodsState',
      cgdInventoryDataList:'cgdInventoryDataList',
      saveInventorySuborderState:'saveInventorySuborderState',
      saveInventorySuborderState_1 : 'saveInventorySuborderState_1',
      sumInventorySuborderState: 'sumInventorySuborderState',
      sumInventorySuborderSearchState: 'sumInventorySuborderSearchState',
      commoditycflList: "commoditycflList",
      sumInventorySuborderSubmitState: 'sumInventorySuborderSubmitState',
      inventorySuborderDetailsState: 'inventorySuborderDetailsState',
      saveDraftListInventoryState:'saveDraftListInventoryState',
      inventorySuborderDelState:'inventorySuborderDelState',
      countingUserList: 'inventoryCountingUserList',
      barcodeScanGoodsState: 'barcodeScanGoodsState'
    })
  },
  created(){
    let that = this
    document.onkeydown = function(e){
      let key = window.event.keyCode;
      if(key == 27){  // esc
        that.cancelAdd()
      }else if(key == 13 && that.isAddGoodsGroup == true){  // Enter
        that.twoDisConfirm()
      }
    }
  },
  watch: {
     dataState(data){
      this.loadingInfo = false;
      if(data.success){
            let param = this.countingUserList, newParam = []
            for(var i = 0; i< param.length; i++){
               newParam.push({
                     name: (Number(i)+''),
                     userid: param[i].ID,
                     label: i == 0 ? param[i].USERNAME : param[i].USERNAME + '( 子单'+ Number(i+1)+' )',
                     tableData: [{
                        GOODSNAME: "",
                        GOODSID:'',
                        GOODSCODE: "",
                        PRICE: 0,
                        PURPRICE: 0,
                        SIZENAME: "",
                        COLORNAME: "",
                        QTY: 1,
                        isEdit: true
                     }]
               })
            }
            this.editableTabs1 = newParam
            this.curTabIdx = 0
            this.editableTabsValue = '0'
            this.$store.dispatch('inventorySuborderDetails', { CountingId: param[0].ID, BillId: this.firstBillID })
      }else{
        this.$message({ message: data.message, type: "error" });
      }
    },
    inventorySuborderDelState(data){
      if(data.success){
        this.$store.dispatch("getInventoryItem",  { BillId : this.firstBillID } )
      }
    },
    inventorySuborderDetailsState(data){
      if(data.success){
        let param = data.data.GoodsList, newParam = []
        for(var i in param){
          param[i].QTY = param[i].STOCKQTY
          newParam.push(param[i])
        }

        this.editableTabs = this.editableTabs1

        this.editableTabs[this.curTabIdx].tableData = newParam.concat({
          GOODSNAME: "",
          GOODSID:'',
          GOODSCODE: "",
          PRICE: 0,
          PURPRICE: 0,
          SIZENAME: "",
          COLORNAME: "",
          QTY: 1,
          isEdit: true
        })
      }else{
        this.$message.error(data.message)
      }
    },
    saveDraftListInventoryState(data){
      if(data.success){
        console.log('完成盘点汇总')
        this.showSumDialog = false
        this.loading = false
        this.CGloading = false

        this.editableTabsValue = '0'

        this.editableTabs = [{
          name: '0',
          userid: '',
          label: getUserInfo().UserName,
          tableData: [{
            GOODSNAME: "",
            GOODSID:'',
            GOODSCODE: "",
            PRICE: 0,
            PURPRICE: 0,
            SIZENAME: "",
            COLORNAME: "",
            QTY: 1,
            isEdit: true
          }]
        }]

      }else{
        this.$message.error(data.message)
      }
    },
    sumInventorySuborderSubmitState(data){
      if(data.success){
        this.showSumDialog = false
        this.loading = false
        this.CGloading = false
        this.firstBillID = ''

        this.editableTabsValue = '0'

        this.editableTabs = [{
          name: '0',
          userid: '',
          label: getUserInfo().UserName,
          tableData: [{
            GOODSNAME: "",
            GOODSID:'',
            GOODSCODE: "",
            PRICE: 0,
            PURPRICE: 0,
            SIZENAME: "",
            COLORNAME: "",
            QTY: 1,
            isEdit: true
          }]
        }]
      }else{
        this.$message.error(data.message)
      }
    },
    sumInventorySuborderSearchState(data){
      if(data.success){
        this.sumBillTable = data.data.GoodsList
        this.sumBillSkuObj = data.data.SkuObj
      }
    },
    sumInventorySuborderState(data){
      if(data.success){
        this.sumBillTable = data.data.GoodsList
        this.sumBillSkuObj = data.data.SkuObj
        this.isOkInventory = false
      }
    },
    saveInventorySuborderState_1(data){
      if(data.success){
        this.suborderNum += 1
        if(this.suborderNum == this.editableTabs.length){
          this.$message.success('保存成功， 请核对单据完成盘点')
          this.$store.dispatch('sumInventorySuborder',{
            BillId: this.firstBillID
          }).then(() =>{
            this.showSumDialog = true
          })
        }
      }else{
        this.$message.error(data.message)
      }
    },
    saveInventorySuborderState(data){
      if(data.success){
         this.firstBillID = data.data.OutBillId
         this.editableTabs[0].userid = data.data.OutCountinId
        if(this.editableTabs.length > 1){
          let breakSum = false, params = {}
          for(var i = 1; i<=this.editableTabs.length -1; i++){
            if(this.editableTabs[i].userid == ''){
               params = this.publicFun(i, data.data.OutBillId, '')
              this.$store.dispatch('saveInventorySuborder_1',params)
            } else if(this.editableTabs[i].userid != '' && this.editableTabs[i].tableData[0].GOODSNAME != ''){
              params = this.publicFun(i, data.data.OutBillId, this.editableTabs[i].userid  )
              this.$store.dispatch('saveInventorySuborder_1',params)
            }
          }

          this.$store.dispatch('sumInventorySuborder',{
            BillId: this.firstBillID
          }).then(() =>{
            this.showSumDialog = true
            this.isOkInventory = true
          })

        }else{
          this.$message.success('保存成功， 请核对单据完成盘点')
          this.$store.dispatch('sumInventorySuborder',{
            BillId: this.firstBillID
          }).then(() =>{
            this.showSumDialog = true
            this.isOkInventory = true
          })
        }
      }else{
        this.$message.error(data.message)
      }
    },
    barcodeScanGoodsState(data){
      if(data.success){
        let item = data.data.obj
        if(item.ID == undefined){
          this.$message.error( this.searchText +', 查无此商品 ！')
          this.searchText = ''
          let mp3 = new Audio()
          mp3.src = music
          mp3.play()
          return
        }

        if(item.ISDETAILBARCODE == 1){
          this.searchGoodsPushFun(item)
        }else{
          this.getGoodsItemFun(data.data)
          this.titleName = item.NAME + ' ( '+  item.CODE+' )'
          this.isAddGoodsGroup = true  //弹出批量添加商品窗口
          this.searchText = ''
        }

      }else{
        this.$message.error(data.message)
      }
    },
    cgdInventoryDataList(data){ },
    OnlyOneGoodsState(data){
      if(data.length == 0){
        this.$message.error( this.searchText +', 查无此商品 ！')
        this.searchText = ''
        let mp3 = new Audio()
        mp3.src = music
        mp3.play()
        return
      }

      this.searchGoodsPushFun(data[0])

    },
    goodsState(data) {
      if (data.success) {
        this.getGoodsItemFun(data.data)
      } else {
        this.$message.error(data.message)
      }
    },
    goodsListState2(data){
      if(data.success){
        this.goodsListData = this.goodsList2
        this.constGOODSLIST = this.goodsList2
      }
    },
    inventoryAddState(data){
      this.loading = false
      this.CGloading = false
      if(data.success){
        this.$message.success('保存成功！')
        this.editableTabs[this.editableTabsValue].tableData = [{
          GOODSNAME: "",
          GOODSID:'',
          GOODSCODE: "",
          PRICE: 0,
          PURPRICE: 0,
          SIZENAME: "",
          COLORNAME: "",
          QTY: 1,
          isEdit: true
        }]
        this.firstBillID = ''
        this.pageData.REMARK = ''
        this.pageData.BILLDATE = new Date()
        this.$store.dispatch("getInventoryItem", { BillId: data.data.OutBillId });
      }else{
        this.$message({ message:data.message, type:'error' })
      }
    }
  },
  methods: {
    getGoodsItemFun(data){
      let storedCount = []
      let result = data.StockList
      for(let i=0; i<result.length; i++) {
        let stored = result[i];
        if( storedCount[stored.COLORID] == undefined)	{
          storedCount[stored.COLORID] = [];
        }
        storedCount[stored.COLORID][stored.SIZEID] = stored.STOCKQTY;
      }

      this.storedCount = storedCount
      this.currentColors = data.ColorList
      this.currentSizes = data.SizeList
      this.stockList = data.StockList   // 商品库存列表
      this.goodsObj = data.obj
    },
    searchGoodsPushFun(info){
      let param = this.editableTabs[this.editableTabsValue].tableData
      let info1 = [{
        GOODSNAME: info.NAME,
        GOODSID: info.ID,
        GOODSCODE: info.CODE,
        COLORID: info.COLORID,
        SIZEID: info.SIZEID,
        PRICE: info.PRICE,
        PURPRICE: info.PURPRICE,
        SIZENAME: info.SIZENAME,
        COLORNAME: info.COLORNAME,
        QTY: 1,
        DISCOUNT:1,
        isEdit: false
      }]

      if(this.editableTabs[this.editableTabsValue].tableData.length == 0){
        this.editableTabs[this.editableTabsValue].tableData = info1
      }else{
        let arr2 = this.editableTabs[this.editableTabsValue].tableData.concat(info1)
        let noEmptyArr = arr2.filter(item => item.GOODSID != '' && item.GOODSNAME != '' )
        let newArr = []
        noEmptyArr.forEach(el=> {
          const res = newArr.findIndex(ol=> {
            return el.COLORID == ol.COLORID && el.SIZEID == ol.SIZEID && el.GOODSNAME == ol.GOODSNAME && el.GOODSID == ol.GOODSID && el.PRICE == ol.PRICE
          })
          if (res!== -1) {
            newArr[res].QTY = Number(newArr[res].QTY) + Number(el.QTY);
          } else {
            newArr.push(el)
          }
        })
        this.editableTabs[this.editableTabsValue].tableData = newArr.concat({
          GOODSNAME: "",
          GOODSID:'',
          GOODSCODE: "",
          PRICE: 0,
          PURPRICE: 1,
          SIZENAME: "",
          COLORNAME: "",
          QTY: 1,
          DISCOUNT:0,
          isEdit: true
        })
      }
      this.searchText = ''
    },
    exportTable(){
      let list = this.sumBillTable
      var head = ['商品','货号','颜色','尺码','条码','单位','分类','盘点数量', '盘点前数量', '盈亏数量', '盈亏金额']
      var val =['GOODSNAME','GOODSCODE','COLORNAME','SIZENAME','BARCODE','UNITNAME','TYPENAME','STOCKQTY', 'CURSTOCKQTY', 'QTY', 'MONEY']
      var title = "盘点单汇总——"+ this.radio1 + this.getNowDateTime();
      this.export2Excel(head, val, list, title);
    },
    tabClick(activeName){
      console.log(activeName)
    },
    closeDialog(){
      this.showSumDialog = false
      this.loading = false
      this.CGloading = false

      this.$store.dispatch("getInventoryItem", { BillId : this.firstBillID })

    },
    publicFun(i, OutBillId, CountingId){
      this.editableTabs[i].tableData.splice(this.editableTabs[i].tableData.length -1, 1)
      let param = this.editableTabs[i].tableData, newArr = []
      for(let j=0; j < param.length; j++){
        newArr.push({
          GoodsId : param[j].GOODSID,
          Qty: param[j].QTY,
          Price: param[j].PRICE,
          ColorId: param[j].COLORID,
          SizeId: param[j].SIZEID,
          Remark:''
        })
      }

      let sendData = {
        BillId: OutBillId,
        BillDate: dayjs(this.BILLDATE).valueOf(),
        ManualNo: '', //手工单号
        Remark: '',
        GoodsList: JSON.stringify(newArr),
        IsAll: this.radio1 == '单品盘点' ? 0 : 1,
        ShopId: this.shopId,
        CountingId: CountingId,  // 子单id
        CountingUserId: getUserInfo().UserID,  // 子单用户id
        CountingRemark: '',  // 子单备注
        IsAddGoods: 0  // 是否新增明细
      }

      return sendData
    },
    submitInventory(){
      if(this.saveState == 0){
        let sendData = {
          BillId: this.firstBillID,
          ShopId: this.shopId,
          BillDate: dayjs(this.BILLDATE).valueOf(),
          IsAll: this.radio1 == '单品盘点' ? 0 : 1,
          Remark: this.pageData.REMARK == '' || this.pageData.REMARK == undefined ? '' : this.pageData.REMARK
        }

        this.$store.dispatch('saveDraftListInventory', sendData)
      }else{
        this.$store.dispatch('sumInventorySuborderSubmit', { BillId: this.firstBillID})
      }
    },
    selectMode(){
      this.getNewData()
    },
    getNewData(){
      let sendData = {
        BillId: this.firstBillID,
        Filter: this.Filter,
        Type: this.Type ? this.Type : -1,
        GoodsType: this.GoodsType ? this.GoodsType : ''
      }
      this.$store.dispatch('sumInventorySuborderSearch', sendData).then(() =>{
         this.isOkInventory = true
      })
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计';
          return;
        }
        if(index > 0 && index <= 7){
          sums[index] = ''
          return
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
               let sum = prev + curr
              return sum
            } else {
              return prev;
            }
          }, 0);
          sums[index] += '';
        } else {
          sums[index] = '';
        }
      })

      return sums;
    },
    tableRowClassName({row, rowIndex}){
      console.log(row)
      if(row.QTY > 0){
        return 'orangeColor'
      }else if(row.QTY < 0){
        return 'successColor'
      }
      return ''
    },
    addTab(targetName) {
      console.log(this.editableTabs.length -1)
      if(this.editableTabs[this.editableTabs.length-1].tableData.length == 1 && this.editableTabs[this.editableTabs.length -1].userid == ''){
        this.$message.warning('当前子单表格数据为空 ！')
        return
      }

      let newTabName = ++this.tabIndex + '';
      this.editableTabs.push({
        name: this.editableTabs.length+'',
        userid: '',
        label: this.USERNAME + '( 子单'+(this.editableTabs.length+1)+' )',
        tableData: [{
          GOODSNAME: "",
          GOODSID:'',
          GOODSCODE: "",
          PRICE: 0,
          PURPRICE: 0,
          SIZENAME: "",
          COLORNAME: "",
          QTY: 1,
          isEdit: true
        }]
      });
      this.editableTabsValue = this.editableTabs.length-1+'';

      console.log(this.editableTabs)
    },
    handleClick(tab, event){
      let UserId = this.editableTabs[tab.index].userid
      if(UserId != ''){
        this.$store.dispatch('inventorySuborderDetails', { CountingId: UserId, BillId: this.firstBillID }).then(() =>{
          this.curTabIdx = tab.index
        })
      }

    },
    removeTab(targetName) {
      if(this.editableTabs.length == 1){
        this.$message.warning( '主单不能删除！')
        return
      }

      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }

      let UserId = this.editableTabs[targetName].userid
      if(UserId != ''){
        this.$confirm( '是否删除该单据', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('delInventorySuborder', { BillId: this.firstBillID, CountingId: UserId }).then(() =>{
            this.editableTabsValue = activeName;
            this.editableTabs = tabs.filter(tab => tab.name !== targetName);
          })
        }).catch(()=>{})
      }else{
        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      }
    },
    getUploadData(data){
      let arr = [], newArr = []
      for(var i in data){
        arr.push({
          GOODSNAME: data[i].GOODSNAME,
          GOODSID: data[i].GOODSID,
          GOODSCODE: data[i].GOODSCODE,
          PRICE: data[i].PRICE,
          PURPRICE: data[i].GOODSPURPRICE,
          SIZEID: data[i].SIZEID,
          SIZENAME: data[i].SIZENAME,
          COLORID: data[i].COLORID,
          COLORNAME: data[i].COLORNAME,
          QTY : data[i].QTY,
          isEdit: false,
        })
      }

      arr.forEach(el=> {
        const res = newArr.findIndex(ol=> {
          return el.COLORID == ol.COLORID && el.SIZEID == ol.SIZEID && el.GOODSNAME == ol.GOODSNAME && el.GOODSID == ol.GOODSID && el.PRICE == ol.PRICE
        });
        if (res!== -1) {
          newArr[res].QTY = Number(newArr[res].QTY) + Number(el.QTY);
        } else {
          newArr.push(el);
        }
      })

      this.editableTabs[this.editableTabsValue].tableData = newArr.concat({
        GOODSNAME: "",
        GOODSID:'',
        GOODSCODE: "",
        PRICE: 0,
        PURPRICE: 1,
        SIZENAME: "",
        COLORNAME: "",
        QTY: 1,
        isEdit: true
      })

      this.showUploadDialog = false
    },
    handleCurRow(row){
      let param = this.editableTabs[this.editableTabsValue].tableData, newParam = []
      for(let i in param){
        if(param[i].GOODSID == row.GOODSID && param[i].COLORID == row.COLORID && param[i].SIZEID == row.SIZEID && param[i].PRICE == row.PRICE){
          param[i].isEdit = true
        }else if(param[i].GOODSCODE == '' && param[i].SIZENAME == '' && param[i].COLORNAME == ''){
          param[i].isEdit = true
        } else{
          param[i].isEdit = false
        }
        newParam.push(param[i])
      }
      this.editableTabs[this.editableTabsValue].tableData = newParam
    },
    cancelAdd(){
      this.isAddGoodsGroup = false
      let param = this.editableTabs[this.editableTabsValue].tableData , newParam = []
      for(let i in param){
        if(param[i].SIZENAME == ''){
          param[i].GOODSNAME = ''
          param[i].GOODSCODE = ''
          param[i].GOODSID = ''
        }
        newParam.push(param[i])
      }
      this.editableTabs[this.editableTabsValue].tableData = newParam
    },
    showSetNum(){
      this.editableTabs[this.editableTabsValue].tableData.splice(this.editableTabs[this.editableTabsValue].tableData.length -1, 0)
    },
    twoDisConfirm(){
      if(this.searchText == ''){
        this.editableTabs[this.editableTabsValue].tableData.splice(this.editableTabs[this.editableTabsValue].tableData.length -1, 1)
        let insertModels = [];
        if(this.storedCount == undefined){
          this.storedCount = []
        }

        for(let i=0; i< this.currentColors.length; i++)	{
          let color = this.currentColors[i];
          for(let j=0; j< this.currentSizes.length; j++){
            let size = this.currentSizes[j];
            if(color[size.SIZEID] != undefined && color[size.SIZEID] !== ''){
              if( this.storedCount[this.currentColors[i].COLORID] == undefined){
                this.storedCount[this.currentColors[i].COLORID] = [];
              }
              let item = this.goodsObj
              let newModel ={
                GOODSID : item.ID,
                GOODSNAME : item.NAME,
                GOODSCODE: item.CODE,
                QTY: color[size.SIZEID],
                PRICE: item.PRICE,
                PURPRICE: item.PURPRICE,
                COLORID: color.COLORID,
                COLORNAME: color.COLORNAME,
                SIZEID: size.SIZEID,
                SIZENAME: size.SIZENAME,
                DISCOUNT: 1,
                isEdit:false
              }
              insertModels.push(newModel)
            }
          }
        }

        if(this.editableTabs[this.editableTabsValue].tableData.length == 0){
          this.editableTabs[this.editableTabsValue].tableData = insertModels.concat({
            GOODSNAME: "",
            GOODSID:'',
            GOODSCODE: "",
            PRICE: 0,
            PURPRICE: 0,
            SIZENAME: "",
            COLORNAME: "",
            QTY: 1,
            isEdit: true
          })
        }else{
          let arr2 = this.editableTabs[this.editableTabsValue].tableData.concat(insertModels), newArr = []
          arr2.forEach(el=> {
            const res = newArr.findIndex(ol=> {
              return el.COLORID == ol.COLORID && el.SIZEID == ol.SIZEID && el.GOODSNAME == ol.GOODSNAME && el.GOODSID == ol.GOODSID && el.PRICE == ol.PRICE
            });
            if (res!== -1) {
              newArr[res].QTY = Number(newArr[res].QTY) + Number(el.QTY);
            } else {
              newArr.push(el);
            }
          })

          this.editableTabs[this.editableTabsValue].tableData = newArr.concat({
            GOODSNAME: "",
            GOODSID:'',
            GOODSCODE: "",
            PRICE: 0,
            PURPRICE: 0,
            SIZENAME: "",
            COLORNAME: "",
            QTY: 1,
            isEdit: true
          })
        }
        console.log(this.editableTabs[this.editableTabsValue].tableData)
        this.isAddGoodsGroup = false
      }
    },
    batchAddNum(color, idx){
      this.$prompt(`批量录入 ( ${color.COLORNAME}  )`, '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPlaceholder:'请输入数字',
        inputPattern: /[!^0-9.]/,
        inputErrorMessage:'只能为数字'
      }).then(({ value }) => {
        for(let i=0;i < this.currentSizes.length;i++){
          this.currentColors[idx][this.currentSizes[i].SIZEID] = value;
        }
        this.$forceUpdate()
        this.showSetNum()
      }).catch(()=>{ })
    },
    addNewBill(){ // 新增单据
      let haveData = this.editableTabs[this.editableTabsValue].tableData.filter(item => item.GOODSNAME != '' && item.GOODSCODE != '')
      if(haveData.length != 0){
        this.$confirm( '单据还未保存，确定要新增单据？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.editableTabs[this.editableTabsValue].tableData = [{
            GOODSNAME: "",
            GOODSID:'',
            GOODSCODE: "",
            PRICE: 0,
            PURPRICE: 0,
            SIZENAME: "",
            COLORNAME: "",
            QTY: 1,
            isEdit: true
          }]
          this.pageData = {}
          this.searchText = ''
        }).catch(()=>{})
      }
    },
    scanSearch(searchText){  // 根据单据号查询
      // this.pageDataBill.Filter = searchText
      this.$store.dispatch('getBarCodeScanGoods', { Code: searchText })
    },
    curSelect(idx, row){
      let param = this.goodsListData , obj = {}
      for(let i in param){
        if(param[i].ID == row.GOODSID){
          obj = param[i]
        }
      }
      row.GOODSNAME = obj.NAME
      row.PRICE = obj.PRICE
      row.GOODSCODE = obj.CODE
      row.ID = row.GOODSID
      this.$store.dispatch('getGoodsItem', row).then(()=>{
        if(obj.NAME != undefined){
          this.titleName = obj.NAME + ' ( '+  obj.CODE+' )'
          this.isAddGoodsGroup = true  //弹出批量添加商品窗口
        }
      })
    },
    handleGoodsFilter(val){
      if(val == ""){
        this.goodsListData = this.constGOODSLIST
        return
      }

      if(this.vCheckGoodsTimeOut){
        window.clearTimeout(this.vCheckGoodsTimeOut);
      }
      let that = this
      // 1秒内如果有改动查询关键字，就取消查询，否则触发查询。
      this.vCheckGoodsTimeOut = setTimeout(function() {
        that.$store.dispatch('getGoodsList2', { Status : 1, Filter: val })
      }, 800)
    },
    addRow() {
      let newParam = this.editableTabs[this.editableTabsValue].tableData.filter(item => item.GOODSNAME == '' && item.GOODSCODE == '')
      if(newParam.length != 0){
        this.$message.warning('请先完成之前的操作 !')
        return
      }
      this.editableTabs[this.editableTabsValue].tableData.push({
        GOODSNAME: "",
        GOODSID:'',
        GOODSCODE: "",
        PRICE: 0,
        PURPRICE: 0,
        SIZENAME: "",
        COLORNAME: "",
        QTY: 1,
        isEdit: true
      })
    },
    handleSubmit(value) {
      if(this.editableTabs[this.editableTabsValue].tableData.length == 1){
        this.$message.warning('请先选择要盘点的商品！')
        return
      }

      if(value == 0){
        this.CGloading = true
      }else{
        this.loading = true
      }
      this.saveState = value
      this.editableTabs[0].tableData.splice(this.editableTabs[0].tableData.length -1, 1)
      let param = this.editableTabs[0].tableData, newArr = []
      for(let i=0; i < param.length; i++){
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
        BillId: this.firstBillID == undefined  || this.firstBillID == '' ? '' : this.firstBillID,
        BillDate: dayjs(this.BILLDATE).valueOf(),
        ManualNo: '', //手工单号
        Remark: this.pageData.REMARK == '' || this.pageData.REMARK == undefined ? '' : this.pageData.REMARK,
        GoodsList: JSON.stringify(newArr),
        IsAll: this.radio1 == '单品盘点' ? 0 : 1,
        ShopId: this.shopId,

        CountingId: this.firstBillID == undefined  || this.firstBillID == '' ? '' : this.editableTabs[0].userid,  // 子单id
        CountingUserId: getUserInfo().UserID,  // 子单用户id
        CountingRemark: '',  // 子单备注
        IsAddGoods: 0  // 是否新增明细
      }

      this.$store.dispatch('saveInventorySuborder',sendData).then(()=>{
        this.suborderNum = 1
      })
    },
    handleDel(idx, row) {
      this.editableTabs[this.editableTabsValue].tableData.splice(idx, 1)
    },
    defaultGoodsList(){
      this.$store.dispatch('getGoodsList2',{ Status: 1, Filter: ''})
    }
  },
  mounted() {
    if (this.shopList.length == 0) {
      this.$store.dispatch("getShopList")
    }

    let list = this.$store.state.commodityc.commoditycflList;
    if (list.length == 0) {
      this.$store.dispatch("getcommoditycflList", {}).then(() => {});
    }

    this.defaultGoodsList()

    let getSuborderData = sessionStorage.getItem('countingUserList_I') || '[]'
    let getSuborderObj = sessionStorage.getItem('theGoodsObj_I') || '{}'

    console.log(JSON.parse(getSuborderData))

    let param = JSON.parse(getSuborderData), newParam = []
    let obj = JSON.parse(getSuborderObj)
    this.pageData = obj
    this.firstBillID = obj.BILLID

    if(param.length != 0){
      for(var i = 0; i< param.length; i++){
        newParam.push({
            name: (Number(i)+''),
            userid: param[i].ID,
            label: i == 0 ? param[i].USERNAME : param[i].USERNAME + '( 子单'+ Number(i+1)+' )',
            tableData: [{
              GOODSNAME: "",
              GOODSID:'',
              GOODSCODE: "",
              PRICE: 0,
              PURPRICE: 0,
              SIZENAME: "",
              COLORNAME: "",
              QTY: 1,
              isEdit: true
            }]
        })
      }
      this.editableTabs = newParam
      this.editableTabs1 = newParam
      this.editableTabsValue = '0'
      this.$store.dispatch('inventorySuborderDetails', { CountingId: param[0].ID, BillId: obj.BILLID })

    }else{
      this.editableTabs[0] = {
        name: '0',
        userid: '',
        label: getUserInfo().UserName,
        tableData:[{
          GOODSNAME: "",
          GOODSID:'',
          GOODSCODE: "",
          PRICE: 0,
          PURPRICE: 0,
          SIZENAME: "",
          COLORNAME: "",
          QTY: 1,
          isEdit: true
        }]
      }
    }
  },
  components: {
    inputScan: () => import("@/components/goods/scanSearch.vue"),
    uploadBillTable: () => import('../uploadExportBill.vue')
  }
};
</script>

<style lang="scss" scoped >

.el-table .orangeColor{ color:#D9001B}
.el-table .successColor { color: #4B7902 }
// .el-table .grayColor{ color:#999}

.inventory .el-input-group__prepend {
  padding: 0 10px !important;
  background-color: #409eff !important;
  border-color: #409eff !important;
}

.el-table td,
.el-table th {
  text-align: center;
}

.leftLabel {
  width: 70px;
  min-width: 70px;
}

.tableStock{
  text-align: center;
  thead{
    background:#409eff; color:#fff; height:36px; line-height:36px;
    tr{
      th{
        border-right:1px solid #fff
      }
    }
  }
  tbody{
    tr{
      height: 36px; line-height: 36px;
      td{
        border:1px solid #ebeef5;
        input{
          border:none; height: 36px; line-height: 36px; width: 100%; text-align: center
        }
        input:hover{
          outline: 1px solid #409eff;
        }
      }
    }
  }
}
.namehover{
  text-decoration: underline; color:#409eff;
}
.namehover:hover{
  color:#333; cursor: pointer;
}
</style>
