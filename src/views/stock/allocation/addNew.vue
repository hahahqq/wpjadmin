<template>
  <div class="allocation">
    <div class="content-eighty">
      <div class="content-center">
        <el-row :gutter="10">
            <el-col :xs="24" :md="6" style='height:50px'>
              <span>调出店铺</span>
              <el-select size='small' clearable v-model="curOutShopId" placeholder="请选择调出店铺">
                <el-option v-for="item in shopList1" :key="item.ID" :disabled="item.ID == curInShopId" :label="item.NAME" :value="item.ID"></el-option>
              </el-select>
            </el-col>
            <el-col :xs="24" :md="6" style='height:50px'>
              <span>调入店铺</span>
              <el-select size='small' clearable v-model="curInShopId" placeholder="请选择调入店铺">
                <el-option v-for="item in shopList1" :key="item.ID" :disabled="item.ID == curOutShopId" :label="item.NAME" :value="item.ID"></el-option>
              </el-select>
            </el-col>

            <el-col :xs="24" :md="6" style='height:50px'>
              <el-input
                type="default"
                v-model="searchText" size='small'
                @keydown.enter.native="scanSearch(searchText)"
                autofocus="true"
                placeholder="请扫描商品或单品条形码"
              >
                <div slot="prepend">
                  <i class="icon-barcode"></i>
                  <span class="m-left-xs">扫码</span>
                </div>
              </el-input>
            </el-col>
        </el-row>
      </div>
    </div>

    <div class="content-table4">
      <div class="content-table-center">
        <div class='tableStyle'>
          <el-table
            border size='small'
            :data="theGoodsList"
            :height="tableHeight"
            @row-click='handleCurRow'
            :highlight-current-row='true'
            header-row-class-name="bg-f1f2f3"
            empty-text='暂无数据,请点击 "增加行" 或 扫码添加商品'
            class="full-width"
          >
            <el-table-column type='index' width='70' align="center" label="序号" fixed='left'></el-table-column>
            <el-table-column label="商品" fixed='left'>
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
                    <span style="float:right; color: #8492a6; font-size: 12px">{{item.NAME}}</span>
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop='GOODSCODE' label="货号" align="center"></el-table-column>
            <el-table-column prop='COLORNAME' label="颜色" align="center" width="80"></el-table-column>
            <el-table-column prop='SIZENAME' label="尺码" align="center" width="80"></el-table-column>
            <el-table-column prop="PRICE" label="零售价" align="center" width="100"></el-table-column>

            <el-table-column label="数量" align="center" width="120">
              <template slot-scope='scope'>
                <span v-if='!scope.row.isEdit && scope.row.SIZENAME !=""'>{{scope.row.QTY}}</span>
                <el-input-number v-if='scope.row.isEdit && scope.row.SIZENAME == ""' size='small' style='width:100px' disabled controls-position="right" :min="1" v-model.trim="scope.row.QTY" @input="totalfun" placeholder="请输入"></el-input-number>
                <el-input-number v-if='scope.row.isEdit && scope.row.SIZENAME != ""' size='small' style='width:100px' controls-position="right" :min="1" v-model.trim="scope.row.QTY" @input="totalfun" placeholder="请输入"></el-input-number>
              </template>
            </el-table-column>

            <el-table-column label="金额" align="center" width="120">
              <template slot-scope='scope'>
                <span>{{scope.row.PRICE * scope.row.QTY}}</span>
              </template>
            </el-table-column>

            <el-table-column label="操作" width="80" fixed='right'>
              <template slot-scope='scope'>
                <el-button v-if='scope.row.GOODSID != "" && scope.row.SIZENAME !=""' type="text" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-row :gutter="10" class="marginTB-sm">
          <el-col :xs="12" :sm="8" :md="12" class="row-flex flex-items-center">
            <span class="leftLabel">备注</span>
            <el-input size="small" v-model="pageData.REMARK" placeholder="输入单据备注"></el-input>
          </el-col>

          <el-col :xs="12" :sm="8" :md="12" class="text-right">
            <span>总合计 </span>
            <span class="text-danger font-600" style="font-size:18px; ">
              <i v-if='theGoodsList.length > 1' style="font-size:16px">共 {{totalNum}} 件 , </i>
              <i>{{isPurViewFun(91040112) ? '&yen; '+ totalPrice : '****'}}</i>
            </span>
          </el-col>
        </el-row>
        <div class='marginTB-sm'>
          <span class='text-999  m-top-sm' style='float:left'>
            <span>制单人 :  &nbsp; </span>  {{USERNAME}}
            <span style='margin-left:30px'>制单时间 :  &nbsp; </span> {{zhiDanData}}
          </span>
          <span class='text-right' style='float:right'>
            <el-button style='margin-right:40px' plain icon='el-icon-upload' @click='showUploadDialog = true'>导 入</el-button>
            <el-button type="success" plain icon="el-icon-plus" @click='addNewBill'>新增单据</el-button>
            <el-button type='info' @click='handleSubmit(0)' :disabled="theGoodsList.length == 0" :loading="loading">草稿</el-button>
            <el-button type="primary" @click="handleSubmit(1)" :disabled="theGoodsList.length == 0" :loading="loading">保存</el-button>
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
              <el-input type="number" v-model.number="color[size.SIZEID]" :min="1"></el-input>
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
          <template slot="title"><span style='font-size:16px; color:red'>显示库存</span></template>
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

    <el-dialog title="导入库存调拨单" :visible.sync="showUploadDialog" width="94%" append-to-body :close-on-click-modal='false'>
      <uploadBillTable @closeModal='showUploadDialog = false' @GetUploadExportData='getUploadData' :dealUploadData="{dealState:'noDiscount'}"></uploadBillTable>
    </el-dialog>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import { getHomeData, getUserInfo } from "@/api/index";
import dayjs from 'dayjs'
import music from '@/assets/12053.mp3'
export default {
  data() {
    return {
      loading: false,
      CGloading: false,
      curOutShopId: getHomeData().shop.SHOPID,
      USERNAME: getUserInfo().UserName,
      curInShopId: '',
      titleName: '',
      searchText:'',
      pageData: {
        BILLDATE: "",
        ManualNo: "", //手工单号
        PAYTYPEID: "", // 付款方式ID
        PAYMONEY: 0,
        REMARK: "",
        GoodsList: [], // 货号Id,颜色Id,尺码Id,数量,单价,备注
        IsCheck: 1,
        FromBillId: "", // 引用采购单号
        BREAKSMONEY: 0,
        OTHERMONEY: 0,
        BILLID:''
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
      theGoodsList:[],
      currentColors:[],
      currentSizes:[],
      storedCount:[],
      goodsListData:[],
      constGOODSLIST: [],
      showUploadDialog: false,
      isAddGoodsGroup: false,
      vCheckGoodsTimeOut: undefined,
      tableHeight: document.body.clientHeight - 280,
      totalNum:0,
      totalPrice: 0
    }
  },
  computed: {
    ...mapGetters({
      shopList1: "shopList1",
      goodsState: "goodsState",
      goodsItem: "goodsItem",
      goodsList2: 'goodsList2',
      goodsListState2:'goodsListState2',
      paywayList: "paywayList",
      dataList: 'allocationItem',
      dataObj: 'allocationObj',
      dataState:'allocationState',
      allocationAddState:'allocationAddState',
      OnlyOneGoodsState:'OnlyOneGoodsState',
      cgdAllocationDataList:'cgdAllocationDataList',
      barcodeScanGoodsState: 'barcodeScanGoodsState'
    })
  },
  created(){
    let that = this
    document.onkeydown = function(e){
      var key = window.event.keyCode;
      if(key == 27){  // esc
        that.cancelAdd()
      }else if(key == 13 && that.isAddGoodsGroup == true){  // Enter
        that.twoDisConfirm()
      }
    }
  },
  watch: {
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
    cgdAllocationDataList(data){
      let getItemData = sessionStorage.getItem('theGoodsList_A')
      let theGoodsList = JSON.parse(getItemData)
      this.theGoodsList = theGoodsList.concat({
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
      let getItemObj = sessionStorage.getItem('theGoodsObj_A')
      this.pageData = JSON.parse(getItemObj)
    },
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
    allocationAddState(data){
      this.loading = false
      this.CGloading = false
      if(data.success){
        this.$message.success('保存成功！')
        this.theGoodsList = [{
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
        this.pageData.BILLID = ''
        this.pageData.REMARK = ''
        this.$store.dispatch("getAllocationItem", { BillId: data.data.OutBillId });
      }else{
        this.$message({ message:data.message, type:'error' })
      }
    }
  },
  methods: {
    searchGoodsPushFun(info){
      let param = this.theGoodsList
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

      if(this.theGoodsList.length == 0){
        this.theGoodsList = info1
      }else{
        let arr2 = this.theGoodsList.concat(info1)
        let noEmptyArr = arr2.filter(item => item.GOODSID != '' && item.GOODSNAME != '' )
        let newArr = []
        noEmptyArr.forEach(el=> {
          const res = newArr.findIndex(ol=> {
            return el.COLORID == ol.COLORID && el.SIZEID == ol.SIZEID && el.GOODSNAME == ol.GOODSNAME && el.GOODSID == ol.GOODSID
          });
           if (res!== -1) {
            newArr[res].QTY = Number(newArr[res].QTY) + Number(el.QTY);
          } else {
            newArr.push(el);
          }
        })
        this.theGoodsList = newArr.concat({
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
    getGoodsItemFun(data){
      let storedCount = []
      let result = data.StockList
      for(var i=0; i<result.length; i++) {
        var stored = result[i];
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
    totalfun() {
      let tprice = 0, param = this.theGoodsList, tnum = 0
      for (let i = 0; i < param.length; i++) {
        tprice += param[i].PRICE * param[i].QTY
        tnum += Number(param[i].QTY)
      }
      this.totalPrice = parseFloat(tprice).toFixed(2)
      this.totalNum = tnum -1
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

      this.theGoodsList = newArr.concat({
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
    handleCurRow(row ){
      let param = this.theGoodsList, newParam = []
      for(var i in param){
        if(param[i].GOODSID == row.GOODSID && param[i].COLORID == row.COLORID && param[i].SIZEID == row.SIZEID && param[i].PRICE == row.PRICE){
          param[i].isEdit = true
        }else if(param[i].GOODSCODE == '' && param[i].SIZENAME == '' && param[i].COLORNAME == ''){
          param[i].isEdit = true
        } else{
          param[i].isEdit = false
        }
        newParam.push(param[i])
      }
      this.theGoodsList = newParam
    },
    cancelAdd(){
      this.isAddGoodsGroup = false
      let param = this.theGoodsList , newParam = []
      for(var i in param){
        if(param[i].SIZENAME == ''){
          param[i].GOODSNAME = ''
          param[i].GOODSCODE = ''
          param[i].GOODSID = ''
        }
        newParam.push(param[i])
      }
      this.theGoodsList = newParam
    },
    showSetNum(){
      this.theGoodsList.splice(this.theGoodsList.length -1, 0)
    },
    twoDisConfirm(){
      if(this.searchText == ''){
        this.theGoodsList.splice(this.theGoodsList.length -1, 1)
        let insertModels = [];
        if(this.storedCount == undefined){
          this.storedCount = []
        }
        for(let i=0; i< this.currentColors.length; i++)	{
          let color = this.currentColors[i];
          for(let j=0; j< this.currentSizes.length; j++){
            let size = this.currentSizes[j];
            if(color[size.SIZEID] != undefined && color[size.SIZEID] != ''){
              if( this.storedCount[this.currentColors[i].COLORID] == undefined){
                this.storedCount[this.currentColors[i].COLORID] = [];
              }
              let item = this.goodsObj
              let newModel ={
                GOODSID : item.ID,
                GOODSNAME : item.NAME,
                GOODSCODE: item.CODE,
                QTY: color[size.SIZEID],
                // PRICE: item.PURPRICE,
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

        if(this.theGoodsList.length == 0){
          this.theGoodsList = insertModels.concat({
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
          let arr2 = this.theGoodsList.concat(insertModels), newArr = []
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

          this.theGoodsList = newArr.concat({
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
        for(var i=0;i < this.currentSizes.length;i++){
          this.currentColors[idx][this.currentSizes[i].SIZEID] = value;
        }
        this.showSetNum()
      }).catch(()=>{ })
    },
    addNewBill(){ // 新增单据
      let haveData = this.theGoodsList.filter(item => item.GOODSNAME != '')
      if(haveData.length != 0){
        this.$confirm( '单据还未保存，确定要新增单据？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.theGoodsList = [{
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
      let newParam = this.theGoodsList.filter(item => item.GOODSNAME == '' && item.GOODSCODE == '')
      if(newParam.length != 0){
        this.$message.warning('请先完成之前的操作 !')
        return
      }
      this.theGoodsList.push({
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
      if(this.theGoodsList.length == 1){
        this.$message.warning('请先选择要退货的商品！')
        return
      }

      if(this.curOutShopId == ''){
        this.$message.warning('请选择调出店铺')
        return
      }
      if(this.curInShopId == ''){
        this.$message.warning('请选择调入店铺')
        return
      }

      if(value == 0){
        this.CGloading = true
      }else{
        this.loading = true
      }

      this.theGoodsList.splice(this.theGoodsList.length -1, 1)
      let param = this.theGoodsList, newArr = []
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
        BillId: this.pageData.BILLID == undefined  || this.pageData.BILLID == '' ? '' : this.pageData.BILLID,
        BillDate: new Date().getTime(),
        ManualNo: '', //手工单号
        Remark: this.pageData.REMARK == '' || this.pageData.REMARK == undefined ? '' : this.pageData.REMARK,
        GoodsList: JSON.stringify(newArr),
        IsCheck: value,  // 0: 草稿  1：确认单
        ShopId: this.curOutShopId,
        InShopId: this.curInShopId
      }

      this.$store.dispatch('addAllocation',sendData)
    },
    handleDel(idx, row) {
      this.theGoodsList.splice(idx, 1)
    },
    defaultGoodsList(){
      this.$store.dispatch('getGoodsList2',{ Status: 1, Filter: ''})
    }
  },
  mounted() {
    if (this.shopList1.length == 0) {
      this.$store.dispatch("getShopList1")
    }
    if (this.paywayList.length == 0) {
      this.$store.dispatch("getPaywayList", {})
    }
    this.defaultGoodsList()

    this.theGoodsList.push({
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

    let getItemData = sessionStorage.getItem('theGoodsList_A') || '[]'
    let theGoodsList = JSON.parse(getItemData)

    if(theGoodsList.length != 0){
        this.theGoodsList = theGoodsList.concat({
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

        let getItemObj = sessionStorage.getItem('theGoodsObj_A')
        this.pageData = JSON.parse(getItemObj)

    }else{
        this.theGoodsList = [{
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


  },
  components: {
    inputScan: () => import("@/components/goods/scanSearch.vue"),
    uploadBillTable: () => import('../uploadExportBill.vue')
  }
};
</script>

<style lang="scss" scoped >
.allocation .el-input-group__prepend {
  padding: 0 10px !important;
  background-color: #409eff !important;
  border-color: #409eff !important;
}

.el-table td,
.el-table th {
  text-align: center;
}

.leftLabel {
  width: 77px;
  min-width: 77px;
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

