<template>
   <div>
      <section>
         <el-input type="default" size="small" v-model="searchGoodsVal" placeholder="输入商品名称/货号/条码" @keyup.enter.native="getGoodsData(searchGoodsVal)" class="pull-right-" style="width: 300px;">
         <el-button slot="append" type="default" size="small" @click="getGoodsData(searchGoodsVal)" >查询</el-button>
         </el-input>
      </section>

      <el-table border :data="tableData" size='small' height='500' header-row-class-name="bg-f1f2f3" class="full-width m-top-md">
         <el-table-column align='center' prop="GOODSNAME" label="商品名称"></el-table-column>
         <el-table-column prop="GOODSCODE" label="货号"></el-table-column>
         <el-table-column label="图片" align="center" width="80">
            <template slot-scope="scope">
               <el-tooltip placement="right-start">
                  <div slot="content">
                     <img :src="scope.row.IMAGE != undefined ? scope.row.IMAGE : defaultImg" onerror="this.src='static/images/shopmore.png'" alt="" style="width:150px; height:150px;">
                  </div>
                  <img :src="scope.row.IMAGE != undefined ? scope.row.IMAGE : defaultImg" onerror="this.src='static/images/shopmore.png'" alt="" style="width:36px; height:36px;">
               </el-tooltip>
            </template>
         </el-table-column>
         <el-table-column align='center' prop="PRICE" label="零售价"></el-table-column>
         <el-table-column align='center' prop="STOCKQTY" label="库存"></el-table-column>
         <el-table-column align="center" label="操作">
            <template slot-scope="scope">
               <el-button type='text' size="small" @click='choseCurItem(scope.row)'>选择</el-button>
            </template>
         </el-table-column>
      </el-table>

      <!--  选择收银单品数量 -->
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
         <el-button type='info' @click='cancelAdd()' plain="">取消</el-button>
         <el-button type='primary' plain="" @click='twoDisConfirm()' >确认</el-button>
         </div>

         <el-collapse :accordion='true'>
            <el-collapse-item>
               <template slot="title"><span style='font-size:16px; color:red'>显示剩余库存</span></template>
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


   </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  props:['goodsValSearch','goodsSearchList'],
   data() {
    return {
      loading: false,
      searchGoodsVal: '',
      pageData: {
        IsBarcode: 0
      },
      tableData: [],
      titleName: '',
      isAddGoodsGroup: false,
      currentColors:[],
      currentSizes:[],
      storedCount:[],
      stockList:[],
      goodsObj:{},
      theGoodsList:[],
      defaultImg: 'static/images/shopmore.png'
    }
  },
  computed: {
    ...mapGetters({
      goodsListIncludeSingleState: 'goodsListIncludeSingleState',
      goodsState: "goodsState",
    })
  },
  watch: {
      goodsListIncludeSingleState(data){
         console.log(data, this.searchGoodsVal)
         // if(this.searchGoodsVal != ''){
            this.tableData = data.data.List
         // }
      },
      goodsSearchList(data){
         console.log(data)
         this.tableData = data
      },
      goodsValSearch(data){
         this.searchGoodsVal = data
         this.getGoodsData(data)
      },
      goodsState(data) {
         if (data.success) {
            this.getGoodsItemFun(data.data)
         } else {
            this.$message.error(data.message)
         }
      },
  },
  methods:{
      twoDisConfirm(){
         // if(this.searchGoodsVal == ''){
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

                     insertModels.push({
                        ID : item.ID,
                        NAME : item.NAME,
                        CODE: item.CODE,
                        QTY: color[size.SIZEID],
                        PRICE: item.PRICE,
                        COLORID: color.COLORID,
                        COLORNAME: color.COLORNAME,
                        SIZEID: size.SIZEID,
                        SIZENAME: size.SIZENAME,
                        VIPPRICE: item.VIPPRICE,
                        ISVIPDISCOUNT: item.ISVIPDISCOUNT,
                        DISPRICE: item.DISPRICE
                     })
                  }
               }
            }

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

            this.theGoodsList = newArr

            console.log(newArr)

            this.isAddGoodsGroup = false

            this.$emit('closeModal')
            this.$emit('getSelectList', this.theGoodsList)

         // }
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
      cancelAdd(){
         this.isAddGoodsGroup = false
         this.theGoodsList = []
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
      getGoodsData(val) {
         this.pageData.Filter = val
         this.$store.dispatch("getGoodsListIncludeSingle", this.pageData).then(()=>{
            this.loading = true
         })
      },
      choseCurItem(row){
         this.currentSizes = []
         this.currentColors = []
         this.$store.dispatch('getGoodsItem', { ID: row.GOODSID }).then(()=>{
            this.titleName = row.GOODSNAME + ' ( '+ row.GOODSCODE+' )'
            this.isAddGoodsGroup = true  //弹出批量添加商品窗口
            this.theGoodsList = []
         })
      }
  },
  mounted() {
      // console.log(this.goodsValSearch)
      // this.getGoodsData(this.goodsValSearch)
  },
  components: {

  }

}
</script>

<style lang="scss" scoped >
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
