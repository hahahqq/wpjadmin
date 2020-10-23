<template>
    <div class='uploadExport'>
        <input type="file" ref="upload" accept=".xls, .xlsx" class="outputlist_upload hide">
        <el-row>
        第一步，下载EXCEL文件
        <el-button size="small" type="primary" style="margin-right: 20px" >
            <a href="static/images/库存导入模板.xlsx" class="producttemplate">下载模板</a>
        </el-button>
        第二步，上传编辑好的EXCEL文件
        <el-button size="small" type="primary" @click='uploadGoods()' :loading="loading">选择文件</el-button>
      </el-row>
      <el-row class='m-top-sm'>
        <el-col :span="12">
          检索结果
          <el-select size='small' v-model="optionId" placeholder="请选择检索条件">
            <el-option v-for='item in options' :key='item.value' :value="item.value" :label="item.name">{{item.name}}</el-option>
          </el-select>
          <el-button size="small" type="primary" style="margin-left: 20px" @click='referCheck'>重新检测</el-button>
        </el-col>
        <el-col :span="12">
          <span style="background:#f2f2f2; padding: 5px 10px; border-radius:2px; min-width:400px; float:right; text-align:right">
            共传入 <i class='text-red'>{{exportNum.allNum}}</i> 条数据，
            <span v-if='exportNum.notPassNum > 0'>
                不通过 <i class='text-red'>{{exportNum.notPassNum}}</i> 条
            </span>
            <span v-else>检测全部通过</span>
          </span>
        </el-col>
      </el-row>

      <div class='tableStyle'>
        <el-table :data="GoodsIdList"
          border size='small'
          class='m-top-sm tableStyle'
          height="340px"
          v-loading='loading'
          element-loading-text="数据加载中..."
          element-loading-spinner="el-icon-loading"
          empty-text='暂无数据,请先上传相应的单据数据'
          :cell-class-name="tableGrayCellBg"
          @row-dblclick='handledblClickRow'
          @current-change='changeCurRow'
          show-summary
          :summary-method="getSummaries"
          header-row-class-name="bg-f1f2f3">
          <el-table-column type="index" fixed='left'></el-table-column>
          <el-table-column label="检验结果" width="70" align="center" fixed="left">
            <template slot-scope='scope'>
              <span v-if='scope.row.REMARK != undefined' class='text-red'>不通过</span>
              <span v-else>通过</span>
            </template>
          </el-table-column>
          <el-table-column label='检验备注' width="110" align="center" show-overflow-tooltip fixed='left'>
            <template slot-scope='scope'>
              <span class='text-red'>{{scope.row.REMARK}}</span>
            </template>
          </el-table-column>

          <el-table-column prop='GOODSCODE' label='货号'>
            <template slot-scope='scope'>
                <span v-if='scope.row.isEdit == false'>{{scope.row.GOODSCODE}}</span>
                <span v-else>
                    <span v-if='scope.row.REMARK == "货号不存在"'>
                        <el-input size="small" v-model="scope.row.GOODSCODE"></el-input>
                    </span>
                    <span v-else>{{scope.row.GOODSCODE}}</span>
                </span>
            </template>
          </el-table-column>

          <el-table-column prop='GOODSNAME' label='商品' ></el-table-column>

          <el-table-column label='颜色' align="center">
              <template slot-scope="scope">
                  <span v-if='scope.row.isEdit == false'>{{scope.row.COLORNAME}}</span>
                  <span v-else-if='scope.row.REMARK != "货号不存在" && scope.row.isEdit == true'>
                      <el-select size="small" v-model="scope.row.COLORID" @change='changeColor(scope.row.COLORID, scope.row)'>
                          <el-option v-for='item in colorList' :key='item.COLORID' :value="item.COLORID" :label="item.COLORNAME" ></el-option>
                      </el-select>
                  </span>
                  <span v-else-if='scope.row.REMARK == "货号不存在" && scope.row.isEdit == true'>
                      {{scope.row.COLORNAME}}
                  </span>
              </template>
          </el-table-column>

          <el-table-column label='尺码' align="center">
              <template slot-scope="scope">
                  <span v-if='scope.row.isEdit == false'>{{scope.row.SIZENAME}}</span>
                  <span v-else-if='scope.row.REMARK != "货号不存在" && scope.row.isEdit == true'>
                      <el-select size="small" v-model="scope.row.SIZEID" @change="changeSize(scope.row.SIZEID, scope.row)">
                          <el-option v-for='item in sizeList' :key='item.SIZEID' :value="item.SIZEID" :label="item.SIZENAME" ></el-option>
                      </el-select>
                  </span>
                  <span v-else-if='scope.row.REMARK == "货号不存在" && scope.row.isEdit == true'>
                      {{scope.row.SIZENAME}}
                  </span>
              </template>
          </el-table-column>

          <el-table-column prop='GOODSPURPRICE' label="参考进价" width="90" align="center" v-if='showDiscount'></el-table-column>

          <el-table-column prop="Discount" label="折扣" width="90" align="center" v-if='showDiscount'></el-table-column>

          <el-table-column prop="PRICE" label="单价"  align="center"></el-table-column>

          <el-table-column prop="QTY" label="数量" width="80" align="center"></el-table-column>

          <el-table-column label='金额' align="center" >
            <template slot-scope='scope'>
              <span v-if='scope.row.REMARK == "货号不存在"'> 0 </span>
              <span v-else>{{scope.row.PRICE == undefined ? scope.row.GOODSPURPRICE * scope.row.QTY : scope.row.PRICE * scope.row.QTY}}</span>
            </template>
          </el-table-column>

          <el-table-column label='操作'  fixed="right">
            <template slot-scope="scope">
                <el-button size='mini' type="text" v-if='scope.row.isEdit == false' @click.stop='handledblClickRow(scope.row)'>编辑</el-button>
                <el-button size='mini' type="text" v-else @click.stop='changeCurRow(scope.row)'>确认</el-button>
                <el-button size='mini' type="text" @click.stop='delCurRow(scope.row, scope.$index)'>删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-row class='m-top-sm text-right'>
        <el-button type="info" plain size="small" @click='closeDialog'>取 消</el-button>
        <el-button type="primary" size="small" @click='startPushData' >确定导入</el-button>
      </el-row>
    </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import MIXNINS_EXPORT from "@/mixins/exportData.js";
let _ = require("lodash");
export default {
    props:{
        dealUploadData:{
            type: Object,
            default: function() {
                return { dealState: "add" }
            }
        }
    },
    mixins: [MIXNINS_EXPORT.TOEXCEL, MIXNINS_EXPORT.TODATA],
    data() {
        return {
            GoodsIdList:[],
            optionId: -1,
            options:[{name:'全部', value: -1 },{name:'通过', value: 0 },{name:'不通过', value: 1 }],
            exportNum:{ notPassNum:0, allNum:0 },
            sizeList:[],
            colorList:[],
            loading: false,
            curRowInfo:{},
            isDel: false,
            showDiscount: true
        }
    },
    computed:{
        ...mapGetters({
            uploadStockState:'uploadStockState',
            goodsState:'goodsState',
            modifyCurState:'billIdDetailsCheckState'
        })
    },
    watch:{
        dealUploadData(data){
            this.colorList = []
            this.sizeList = []
            this.showDiscount = data.dealState == 'noDiscount' ? false : true
        },
        modifyCurState(data){
            if(data.success){
                let obj = data.data.Obj
                let curIdx = this.curRowInfo.idx
                if(obj.REMARK == undefined && obj.GOODSID != undefined){
                    this.GoodsIdList[this.curRowInfo.idx] = {
                        GOODSCODE : obj.CODE,
                        GOODSID: obj.GOODSID,
                        GOODSNAME: obj.NAME,
                        SIZENAME: obj.SIZENAME,
                        SIZEID: obj.SIZEID,
                        COLORNAME: obj.COLORNAME,
                        COLORID: obj.COLORID,
                        GOODSPURPRICE: obj.PURPRICE,
                        QTY: this.curRowInfo.QTY,
                        idx: this.curRowInfo.idx,
                        isEdit: false,
                        PRICE: this.curRowInfo.PRICE == 0 ? obj.PURPRICE : this.curRowInfo.PRICE,
                        Discount: this.curRowInfo.PRICE == 0 ? parseFloat(obj.PURPRICE).toFixed(2) : parseFloat(this.curRowInfo.PRICE / obj.PURPRICE).toFixed(2)
                    }
                    console.log(this.GoodsIdList[this.curRowInfo.idx])
                    this.GoodsIdList.splice(this.GoodsIdList.length-1, 0)
                    console.log(this.GoodsIdList)
                }else if(obj.REMARK != undefined ){
                    this.GoodsIdList[curIdx] = {
                        GOODSCODE : obj.CODE,
                        GOODSID: obj.GOODSID,
                        GOODSNAME: obj.NAME,
                        GOODSPURPRICE: obj.PURPRICE,
                        QTY: this.curRowInfo.QTY,
                        idx: curIdx,
                        SIZENAME: obj.SIZENAME,
                        SIZEID: obj.SIZEID,
                        COLORNAME: obj.COLORNAME,
                        COLORID: obj.COLORID,
                        isEdit: false,
                        PRICE: this.curRowInfo.PRICE == 0 || this.curRowInfo.PRICE == undefined ? obj.PURPRICE : this.curRowInfo.PRICE,
                        Discount: this.curRowInfo.PRICE == 0 || this.curRowInfo.PRICE == undefined ? parseFloat(obj.PURPRICE).toFixed(2) : parseFloat(this.curRowInfo.PRICE / obj.PURPRICE).toFixed(2)
                    }
                    if(obj.REMARK == '尺码不存在'){
                        this.GoodsIdList[curIdx].SIZEID = ''
                        this.GoodsIdList[curIdx].SIZENAME = ''
                        this.GoodsIdList[curIdx].REMARK = obj.REMARK
                    }
                    if(obj.REMARK == '颜色不存在'){
                        this.GoodsIdList[curIdx].COLORID = ''
                        this.GoodsIdList[curIdx].COLORNAME = ''
                        this.GoodsIdList[curIdx].REMARK = obj.REMARK
                    }
                    if(obj.REMARK == undefined && obj.GOODSID == undefined){
                        this.GoodsIdList[curIdx] = this.curRowInfo
                    }
                    this.GoodsIdList.splice(this.GoodsIdList.length-1, 0)
                }
                this.$forceUpdate()
            }
        },
        goodsState(data){
            if(data.success){
                this.colorList = data.data.ColorList
                this.sizeList = data.data.SizeList
            }
        },
        uploadStockState(data){
            this.loading = false
            if(data.success){
                let param = data.data.GoodsIdList, newParam = []
                let num = param.filter(item => item.REMARK != undefined)
                this.exportNum = { notPassNum: num.length, allNum: param.length }
                for(var i in param){
                    let price = param[i].PRICE == undefined ? param[i].GOODSPURPRICE : param[i].PRICE
                    param[i].idx = i
                    param[i].isEdit = false
                    param[i].PRICE = price
                    // param[i].SIZENAME = param[i].SIZEID == undefined ? '' : param[i].SIZENAME
                    // param[i].COLORNAME = param[i].COLORID == undefined ? '' : param[i].COLORNAME
                    param[i].Discount = param[i].REMARK == '货号不存在' ? '' : parseFloat(price / param[i].GOODSPURPRICE).toFixed(2)
                    newParam.push(param[i])
                }
                this.GoodsIdList = newParam
                console.log(this.GoodsIdList)
            }else{
                this.$message.error(data.message)
            }
        },
        outputsState(data) {
            // 导入 mixins
            if (data.state) {
                this.importExcel(this.outputs);
            } else {
                this.$message({ showClose: true, message: "数据为空", type: "error"});
            }
        },
    },
    methods:{
        referCheck(){
            let param = this.GoodsIdList, newData = []
            for(var i in param){
                newData.push({
                    GoodsCode: param[i].GOODSCODE,
                    Color: param[i].COLORNAME,
                    Size: param[i].SIZENAME,
                    Price: param[i].PRICE,
                    Qty: param[i].QTY
                })
            }

            this.$store.dispatch('uploadStockExcel', { GoodsList: JSON.stringify(newData)} ).then(()=>{
                this.loading = true
            })
        },
        startPushData(){
            let hasError = false
            let param = this.GoodsIdList, newParam = []
            for(var i in param){
                if(param[i].REMARK != undefined){
                    hasError = true
                }
                if(param[i].REMARK == undefined && param[i].GOODSID == undefined){
                    hasError = true
                }
            }
            if(hasError){
                this.$message.error('有检测未通过数据,请修改后再提交 !')
            }else{
                this.$emit('GetUploadExportData', this.GoodsIdList)
            }
        },
        changeColor(val, row){
            let arr = this.colorList.filter(item => item.COLORID == val)
            row.COLORNAME = arr[0].COLORNAME
        },
        changeSize(val, row){
            let arr = this.sizeList.filter(item => item.SIZEID == val)
            row.SIZENAME = arr[0].SIZENAME
        },
        changeCurRow(row){
            if(this.isDel == false){
                if(row != null){
                    if(this.rowInfo != undefined){
                        const curRow = this.rowInfo
                        this.$store.dispatch('billdetailsCheck', this.rowInfo).then(()=>{
                            this.curRowInfo = curRow
                        })
                    }
                }
            }
        },
        handledblClickRow(row){
            this.isDel = false
            if(row.REMARK != '货号不存在'){
                this.$store.dispatch("getGoodsItem", { ID: row.GOODSID})
            }
            this.rowInfo = row
            let param = this.GoodsIdList, newParam = []
            for(var i in param){
               param[i].isEdit = param[i].idx == row.idx ? true : false
               newParam.push(param[i])
            }
            this.GoodsIdList = newParam
        },
        closeDialog(){
            this.GoodsIdList = []
            this.showUploadDialog = false
            this.$emit('closeModal')
        },
        delCurRow(row, idx){
            this.GoodsIdList.splice(idx, 1)
            this.isDel = true
        },
        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '合计';
                    return;
                }
                if(index > 0 && index < 10){
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
        tableGrayCellBg({column, columnIndex}){
            if(columnIndex === 4 || columnIndex === 7){
                return 'bg-light';
            }
        },
        uploadGoods(){
            this.colorList = []
            this.sizeList = []
            this.$refs.upload.click()
        },
        importExcel(arr) {   // 提交excel表格后获取到的数据
            let newData = [];
            for (let i = 1; i < arr.length; i++) {
                let strCode;
                for (var index in arr[i]) {
                    let strlen = index.replace(/\s*/g, "").length;
                    if (strlen > 40) {
                        strCode = arr[i][index];
                    }
                }

                newData.push({
                    GoodsCode: strCode,
                    Color: arr[i].__EMPTY_1,
                    Size: arr[i].__EMPTY_2,
                    Price: arr[i].__EMPTY_4,
                    Qty: arr[i].__EMPTY_3 == undefined ? 1 : arr[i].__EMPTY_3
                })
            }
            this.$store.dispatch('uploadStockExcel', { GoodsList: JSON.stringify(newData)} ).then(()=>{
                this.loading = true
            })
        },
    }
}
</script>

