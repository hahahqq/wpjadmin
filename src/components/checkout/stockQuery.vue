<template>
  <div class="shopquery">
    <el-tabs v-model="activeName" type="card" @tab-click="handleTabClick(activeName)">
        <el-tab-pane
            :key="item.name"
            v-for="item in tableTabs"
            :label="item.label"
            :name="item.name"
        >
        </el-tab-pane>
    </el-tabs>


    <input type="file" ref="upload" accept=".xls, .xlsx" class="outputlist_upload hide">

    <el-row :gutter="10" >
        <el-col :xs="24" :sm="12" :md="6">
            <span style="padding-left: 10px">店铺 </span>
            <el-select size="small" v-model="radio" @change="submitSearch" multiple collapse-tags placeholder="请选择店铺">
              <el-option value="所有店铺">所有店铺</el-option>
              <el-option :disabled='radio == "所有店铺"' v-for='item in shopList' :key='item.ID' :label="item.NAME" :value="item.ID"></el-option>
            </el-select>
        </el-col>
        <el-col :xs="24" :sm="12" :md="6">
            <span>商品分类</span>
            <el-select size='small' v-model="TypeId" multiple collapse-tags clearable @change="submitSearch" placeholder="请选择商品分类">
                <el-option v-for="item in commoditycflList" :key="item.ID" :label="item.NAME" :value="item.ID"></el-option>
            </el-select>
        </el-col>

        <el-col :xs="24" :sm="12" :md="4">
            <el-dropdown class="pull-right" @command="handleCommand">
              <el-button size="small">
                导出<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command='0'>
                  <a @click="ExportRowFun" class=' pull-right' id='Button1'>横排</a>
                </el-dropdown-item>
                <el-dropdown-item command='1'>竖排</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
        </el-col>

        <el-col :xs="24" :sm="12" :md="8">
            <el-input type="default" size="small" v-model="searchText" clearable placeholder="输入商品名称/货号" class="pull-right-" style="width: 300px;">
            <el-button slot="append" type="primary" icon="el-icon-search" size="small" @click="submitSearch">查询</el-button></el-input>
        </el-col>
    </el-row>

    <el-row class="tac" style="margin-top: 10px">
      <el-col :span="24" v-loading="loading">
        <div style="overflow: auto; height:400px; width: 100%" >
          <table border='0' class='tableStock' cellspacing='0' cellpadding='0' width='100%' style="height:auto;empty-cells:show;">
            <tbody>
              <tr>
                  <td align='center'>序号</td>
                  <td align='center' v-if="activeName == 'first'" style="width: 90px">店铺</td>
                  <td align='center' style="width: 160px">商品名称</td>
                  <td align='center' style='width:120px'>货号</td>
                  <td align='center' style="width:50px">图片</td>
                  <td align='center' style='width:90px'>颜色</td>

                  <td >
                    <span v-for="(item,index) in sizeGroupList" :key="index" style="display:table; line-height:24px">
                      <td align='center' style='padding: 0 6px; width: 52px; font-size:10px; border: none' v-for="(item1, index1) in item" :key="index1">{{item1}}</td>
                    </span>
                  </td>

                  <td align='center' style='width:70px'>总数</td>
                  <td align='center' style='width:70px'>零售价</td>
                  <td align='center' style='width:70px' v-if="isPurViewFun(91040112)">成本价</td>
              </tr>
            </tbody>

            <tbody>
              <tr v-for='(item, index) in pageglist' :key='index'>
                  <td align='center' style="padding:0 4px; width:50px;">{{item.RN}}</td>
                  <td v-if="activeName == 'first'" style="padding:0 4px">{{item.SHOPNAME}}</td>
                  <td style='padding:0 4px'>{{item.GOODSNAME}}</td>
                  <td style='padding:0 4px' align='center'>{{item.GOODSCODE}}</td>
                  <td style='padding:2px 4px; width:50px;'>
                     <el-tooltip placement="right-start">
                        <div slot="content">
                           <img :src="item.IMGURL" onerror="this.src='static/images/shopmore.png'" alt="" style="width:150px; height:150px; ">
                        </div>
                        <img :src="item.IMGURL" alt="" onerror="this.src='static/images/shopmore.png'" style="width:40px; height:40px; border-radius:8px; vertical-align: middle">
                     </el-tooltip>
                  </td>
                  <td align='center' style='padding:0 4px; width:90px'>{{item.COLORNAME}}</td>

                  <td>
                    <span v-for='(item1, index1) in item.SIZELISTQTY' :key='index1'>
                      <td align='center' style='padding:0 6px; width: 39px; font-size:10px; border-bottom:none'>{{item1.length == 1 ? ' &nbsp;' : ''}}
                        <span style="width: 40px; height:36px; display:table; text-align:center; border: 0;">{{item1}}</span>
                      </td>
                    </span>
                  </td>

                  <td align='center' style='padding:0 4px; width:70px'>{{item.QTY}}</td>
                  <td align='center' style='padding:0 4px; width:70px'>{{item.PRICE}}</td>
                  <td align='center' style='padding:0 4px; width:70px' v-if="isPurViewFun(91040112)">{{item.PURPRICE}}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="m-top-sm clearfix elpagination">
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
      </el-col>
    </el-row>

    <div id='tableStock'>
      <table border='0' class='tableStock1' cellspacing='0' cellpadding='10' width='100%' style="height:auto; display:none">
          <thead>
            <tr>
              <th :rowspan="sizeGroupList1.length + 1" align='center' v-if="activeName == 'first'" style="width: 90px">店铺</th>
              <th :rowspan="sizeGroupList1.length + 1" align='center' style="font-weight:bold; width: 160px">商品名称</th>
              <th :rowspan="sizeGroupList1.length + 1" align='center' style='font-weight:bold; width:140px'>货号</th>
              <th :rowspan="sizeGroupList1.length + 1" align='center' style='font-weight:bold; width:90px'>颜色</th>
              <th :rowspan="sizeGroupList1.length + 1" align='center' style='font-weight:bold; width:70px'>总数</th>
              <th :rowspan="sizeGroupList1.length + 1" align='center' style='font-weight:bold; width:70px'>零售价</th>
              <th :rowspan="sizeGroupList1.length + 1" align='center' style='font-weight:bold; width:70px' v-if="isPurViewFun(91040112)">成本价</th>
              <th :rowspan="sizeGroupList1.length + 1">
                <tr v-for='(item, index) in sizeGroupList1' :key='index'>
                  <td align='center' v-for='(item1, index1) in item' :key='index1'>
                    {{item1}}
                  </td>
                </tr>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for='(item, index) in pageglist1' :key='index'>
              <td v-if="activeName == 'first'" style="padding:0 4px">{{item.SHOPNAME}}</td>
              <td style='padding:0 4px'>{{item.GOODSNAME}}</td>
              <td style='padding:0 4px'>{{item.GOODSCODE}}</td>
              <td align='center' style='padding:0 4px; width:90px'>{{item.COLORNAME}}</td>
              <td align='center' style='padding:0 4px; width:70px'>{{item.QTY}}</td>
              <td align='center' style='padding:0 4px; width:70px'>{{item.PRICE}}</td>
              <td align='center' style='padding:0 4px; width:70px' v-if="isPurViewFun(91040112)">{{item.PURPRICE}}</td>
              <td>
                <span v-for='(item1, index1) in item.SIZELISTQTY' :key='index1'>
                  <td align='center'>{{item1}}</td>
                </span>
              </td>
            </tr>
          </tbody>
      </table>
    </div>

  </div>
</template>
<script>

function method1(){
  var html = "<html><head><meta charset='utf-8' /></head><body>" + document.getElementById("tableStock").outerHTML + "</body></html>"
  var blob = new Blob([html], { type: "application/vnd.ms-excel" });
  var a = document.getElementById("Button1");
  a.href = URL.createObjectURL(blob);
  a.download = "库存横排报表"+ this.getNowDateTime();
}

import { mapState, mapGetters } from "vuex";
import { getHomeData } from "@/api/index";
import MIXNINS_EXPORT from "@/mixins/exportData.js";
export default {
  mixins: [MIXNINS_EXPORT.TOEXCEL, MIXNINS_EXPORT.TODATA],
  props: {
    dataType: {
      type: Object,
      default: function() {
        return { dealState: "reset" };
      }
    }
  },
  data() {
    return {
      activeName: 'first',
      tableTabs:[{ name: 'first', label: '库存明细'}, { name: 'second', label: '库存汇总'}],
      choseShopId:'',
      sizeGroupList: [],
      sizeGroupList1: [],
      loading: false,
      TypeId: [],
      radio:[getHomeData().shop.ID],
      searchText: '',
      pageglist: [],
      pageglist1: [],
      pagination: {
        TotalNumber: 0,
        PageNumber: 0,
        PageSize: 20,
        PN: 1
      },
      pageData: {
        ShopId: getHomeData().shop.ID,
        CategoryId: "",
        Status: -1,  //  -1=全部，0=停用，1=启用
        ZeroQty: 1, //  -1=全部，1=不显示零库存
        Filter: '',
        TypeId: '',
        PN: 1,
        tabIdx: 0,
        OrderType: 2,
        OrderMode: 0
      },
      needSizeGroup:[],
      needSizeGroup1:[],
      exportLoading: false
    };
  },
  computed: {
    ...mapGetters({
      shopList: "shopList",
      datastockqueryList: "stockqueryList",
      stockqueryiState: "stockqueryiState",
      sizeGroupState:'sizeGroupState',
      exportColumnData:'exportStockColumnState',
      exportRowData: 'exportStockRowState',
      commoditycflListState: "commoditycflListState",
      commoditycflList: "commoditycflList",
    })
  },
  watch: {
    exportRowData(data){
      if(data.success){
        let param = data.data.List, newArr = []
        for(var i in param){
          param[i].SIZELISTQTY = param[i].QTYS.split(',')
          newArr.push(param[i])
        }
        this.pageglist1 = newArr
        let needSizeGroup = this.pageglist1.map(item => item.SIZEGROUPID)
        this.needSizeGroup1 = new Set(needSizeGroup)
        this.exportLoading = false
        this.getSizeGroupList()
      }else{
        this.$message.error(data.message)
      }
    },
    exportColumnData(data){
      this.exportLoading = false
      var list =  data.data.List
      var head = [ "商品名称", "货号", "颜色", "尺码", "库存数", "零售价"];
      var val =  [ "NAME", "CODE", "COLORNAME", "SIZENAME", "STOCKQTY", "PRICE"]

      if(this.pageData.tabIdx == 0){
        head.unshift('店铺')
        val.unshift('SHOPNAME')
      }
      var type = this.pageData.tabIdx == 0 ? '明细' : '汇总'
      var title = "库存"+ type +"竖排导出" + this.getNowDateTime();
      this.export2Excel(head, val, list, title);
    },
    sizeGroupState(data){
      if(data.success){
        let param = data.data.List, newArr = []
        for(var i in param){
          if(param[i].SIZEIDS){
            newArr.push({id: param[i].GROUPID, arr : param[i].SIZENAMES.split(',')})
          }
        }
        this.getSizeGroupList(newArr)
      }
    },
    stockqueryiState(data) {
      this.loading = false;
      if (data.success) {
        let param =  [...this.datastockqueryList], newArr = []
        for(var i in param){
          param[i].SIZELISTQTY = param[i].QTYS.split(',')
          newArr.push(param[i])
        }

        this.pageglist = newArr
        let needSizeGroup = this.pageglist.map(item => item.SIZEGROUPID)
        this.needSizeGroup = new Set(needSizeGroup)
        this.$store.dispatch('getsizeGroupList')
        this.pagination = {
          TotalNumber: data.paying.TotalNumber,
          PageNumber: data.paying.PageNumber,
          PageSize: data.paying.PageSize,
          PN: data.paying.PN
        }
      }
    },
  },
  methods: {
    handleCommand(command){
      if(command == 1){
        // 0: 横排  1： 竖排
        this.ExportColumnFun()
      }
    },
    handleTabClick(activeName){
      this.pageData.tabIdx = activeName == 'first' ? 0 : 1
      this.pageData.PN = 1
      this.pageData.ShopId = getHomeData().shop.ID
      this.pageData.Filter = ''
      this.getStockData()

    },
    getScroll(){
      this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      if (!!document.documentElement.scrollTop &&document.documentElement.scrollTop >= 300){
        console.log('123')
      }
    },
    getSizeGroupList(newArr){
      let needSizeGroupData = [], needSizeGroupData1 = []
      let param1 = [...this.needSizeGroup],param2 = [...this.needSizeGroup1]
        for(var j in newArr){
          for(var k in param1){
            if(newArr[j].id == param1[k]){
              needSizeGroupData.push(newArr[j].arr)
            }
          }
          for(var m in param2){
            if(newArr[j].id == param2[m]){
              needSizeGroupData1.push(newArr[j].arr)
            }
          }
        }

        this.sizeGroupList = needSizeGroupData
        this.sizeGroupList1 = needSizeGroupData1
    },
    ExportRowFun(){
      if(this.pageglist1.length == 0){
        this.$message.error('无相应数据')
      }else{
        var html = "<html><head><meta charset='utf-8' /></head><body>" + document.getElementById("tableStock").outerHTML + "</body></html>"
        var blob = new Blob([html], { type: "application/vnd.ms-excel" });
        var a = document.getElementById("Button1");
        a.href = URL.createObjectURL(blob);
        var type = this.pageData.tabIdx == 0 ? '明细' : '汇总'
        a.download = "库存" + type +"横排导出.xls";
      }
    },
    submitSearch(){
      if(this.TypeId.length == 0){
          this.pageData.TypeId = ''
      }else{
          let typeList = this.TypeId, str = ''
          for(var i in typeList){
              str += typeList[i] + ','
          }
          if(str.length>0){  //去掉最后一个逗号
              str=str.substring(0,str.length-1)
          }
          this.pageData.TypeId = str
      }

      let haveAllShop = this.radio.filter(item => item == "所有店铺"),  shopIdList = []
      if(haveAllShop.length == 1){
        this.radio = ['所有店铺']
        shopIdList = this.shopList.map(item => item.ID)
      }else if(this.radio.length == 0){
        shopIdList = [getHomeData().shop.ID]
        this.radio = [getHomeData().shop.ID]
      }else{
        shopIdList = this.radio
      }

      let str = '', id = ''
      for(let i in shopIdList){
          str += shopIdList[i] + ','
      }
      if(str.length>0){  //去掉最后一个逗号
        str=str.substring(0,str.length-1)
      }
      this.pageData.ShopId = str

      this.pageData.Filter = this.searchText;
      this.pageData.PN=1;
      this.getStockData()
    },

    handlePageChange: function(currentPage) {
      if (this.pageData.PN == currentPage || this.loading) {
        return;
      }
      this.pageData.PN = parseInt(currentPage);
      this.getStockData();
    },
    selectGoods(item){
      this.$emit('closeModal');
      this.$emit('getSelectList',item);
    },
    getStockData() {
      this.$store.dispatch("getsqueryItem", this.pageData).then(() => {
        this.loading = true
      })
      this.$store.dispatch('exportStockRow', this.pageData)
    },
    ExportColumnFun() {
      this.$store.dispatch('exportStockColumn', this.pageData).then(()=>{
        this.exportLoading = true;
      })
    }
  },
  mounted() {
    this.getStockData()

    let list = this.$store.state.commodityc.commoditycflList;
    if (list.length == 0) {
      this.$store.dispatch("getcommoditycflList", {})
    }

    this.$store.dispatch("getShopList")
    window.addEventListener('scroll', this.getScroll);
  },
  components: {

  },
  destroyed(){
    window.removeEventListener('scroll', this.getScroll);
  }
};

</script>

<style lang="scss" scoped>
.shopquery .el-tabs--left .el-tabs__item.is-left {
  text-align: center;
}

.shopquery .el-tabs__nav-scroll {
  height: 300px;
  overflow-y: auto;
}

.shopquery .m-top-lg {
  margin-top: 20px;
}

.tableStock{
  height:400px;border:1px solid #ddd; border-right:0; border-bottom:0;
  thead{
    background:#F7F7F7; color:#333; height:36px; line-height:36px;
    tr{
      th{
        border-right:1px solid #ddd; border-bottom: 1px solid #ddd
      }
    }
  }
  tbody{
    tr{
      height: 36px; line-height: 36px;
    }
    tr:hover{
      background: #ecf5ff
    }
  }
  tfoot{
    tr{
      height:36px; line-height: 36px;
    }
  }
}
.tableStock>tbody>tr>td{
  border-bottom: 1px solid #ddd; border-right: 1px solid #ddd;
}
.exportRowStyle{
  padding: 6px 16px; color: #333; border:1px solid #ddd; cursor: pointer;
}
.exportRowStyle:hover{
  background: #ecf5ff
}
</style>

