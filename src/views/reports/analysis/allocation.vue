<template>
  <div class="report row-flex flex-start m-top-sm">
    <section class="bg-white marginLR-sm paddingTB-sm paddingLR-md full-width" v-loading="loading">
        <el-form label-width="66px">
            <el-form-item label='日期' class="half" label-width='50px' >
              <el-date-picker size="small"
                v-model="ruleForm.dateChoose"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :clearable='false'
                class="full-width"
                style='width:210px'
                value-format="timestamp"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </el-form-item>

            <el-form-item label='店铺' class="half">
                <el-select size='small' v-model="ruleForm.ShopId" placeholder="请选择店铺" class="full-width">
                  <el-option v-for="item in shopList" :key="item.ID" :label="item.NAME" :value="item.ID"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label='商品' class="half">
                <el-input size='small' v-model='ruleForm.Filter' clearable placeholder="输入商品、货号、条码" class="full-width"></el-input>
            </el-form-item>

            <el-form-item label='品牌' class="half" label-width='50px'>
                <el-select v-model="ruleForm.Brand" size='small' clearable placeholder="请选择品牌" class="full-width" style="width:210px">
                  <el-option v-for="(item,i) in brandList" :key="i" :label="item.NAME" :value="item.NAME"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label='分类' class="half" label-width='50px'>
                <el-select v-model="ruleForm.TypeId" clearable size='small' placeholder="请选择分类" style="width:210px">
                    <el-option v-for="(item,i) in categoryList" :key="i" :label="item.NAME" :value="item.ID"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item class="half">
              <el-button size="small" type="primary" icon="el-icon-search" @click='searchData'>查找</el-button>
              <el-button size="small" type="primary" plain :loading="exportLoading" icon="el-icon-search" @click='exportData'>导出表格</el-button>
            </el-form-item>
        </el-form>
      <!-- chat -->

      <div class='full-width pull-left m-bottom-sm reportInfo'>
        共调拨 <span>{{dataObj.NUM ? dataObj.NUM : 0}}</span> 笔 , 
        调出数量 <span>{{dataObj.OUTQTY ? dataObj.OUTQTY : 0}}</span> ,
        调入数量 <span>{{dataObj.INQTY ? dataObj.INQTY : 0}}</span>
      </div>

      <!-- table-->
      <el-table
        border size='small'
        :data="tableList"
        v-loading='loading'
        element-loading-text='数据加载中...'
        header-row-class-name="bg-f1f2f3"
        class="full-width"
        :height="tableHeight"
      >
        <el-table-column align="center" prop='NAME' label="商品名称"></el-table-column>
        <el-table-column align="center" prop='CODE' label="货号"></el-table-column>
        <el-table-column align="center" prop='BRAND' label="品牌"></el-table-column>
        <el-table-column align="center" prop='TYPENAME' label="分类"></el-table-column>
        <el-table-column align="center" prop='UNITNAME' label='单位'></el-table-column>
        <el-table-column align="center" prop='INQTY' label="调入数量"></el-table-column>
        <el-table-column align="center" prop='OUTQTY' label="调出数量"></el-table-column>
        <el-table-column align="center" prop='MONEY' label="金额"></el-table-column>
        <!-- <el-table-column align="center">
          <template slot-scope="scope">
            <el-button size='small' type="text" @click='handleView(scope.row, scope.$index)'>详情</el-button>
          </template>
        </el-table-column> -->
      </el-table>
      
      <!-- 分页 -->
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
    </section>
  </div>
  <!-- 销售分析 -->
</template>
<script>
import { mapState, mapGetters } from "vuex";
import { getHomeData, getUserInfo } from "@/api/index";
import MIXINS_REPORT from "@/mixins/report";
import MIXINS_INDEX from "@/mixins/index";
import MIXNINS_EXPORT from "@/mixins/exportData.js";
import dayjs from 'dayjs'
export default {
  mixins: [MIXINS_REPORT.SIDERBAR_MENU, MIXINS_REPORT.COMMOM_PAGE,MIXINS_INDEX.IS_SHOW_POPUP, MIXNINS_EXPORT.TOEXCEL, MIXNINS_EXPORT.TODATA],
  data() {
    return {
      tableHeight: document.body.clientHeight - 280,
      pagination: {
        TotalNumber: 0,
        PageNumber: 0,
        PageSize: 20,
        PN: 0
      },
      ruleForm:{
        dateChoose:[new Date().getTime() - 3600 * 1000 * 24 * 30, new Date().getTime()],
        TypeId:'',
        ShopId: getHomeData().shop.SHOPID,
        Brand:'',
        Filter:'',
        PN:1
      },
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
      loading: false,
      PyearArr1:[
        dayjs().year(), dayjs().year() -1, dayjs().year() -2, dayjs().year() -3
      ],
      Season:[ { name:'春季' },{ name:'夏季' },{ name:'秋季' },{ name:'冬季' } ],
      dataObj:{ NUM : 0, OUTQTY : 0, INQTY : 0 },
      exportLoading: false
    }
  },
  computed: {
    ...mapGetters({
        categoryList: "categoryList",
        shopList: "shopList",
        brandList:"goodsbrandList",
        tableList:'AllocationReportList',
        getAllocationReportState:'getAllocationReportState',
        exportDataState: 'storkReportExport_3_state'
    })
  },
  watch: {
    exportDataState(data){
      this.exportLoading = false
      if(data.success){
        let list = data.data.List
        var head = [ "商品名称", "货号", "品牌", "分类", "单位", "调入数量", "调出数量", "金额"];
        var val =  [ "GOODSNAME", "GOODSCODE", "BRAND", "TYPENAME", "INQTY", "OUTQTY", "MONEY"]

        var title = "调拨统计报表" + this.getNowDateTime();
        this.export2Excel(head, val, list, title);
      }
    },
    getAllocationReportState(data){
      this.loading = false
      if(data.success){
        this.pagination =  {
          TotalNumber: data.data.PageData.TotalNumber,
          PageNumber: data.data.PageData.PageNumber,
          PageSize: data.data.PageData.PageSize,
          PN: data.data.PageData.PN
        }
        this.dataObj = data.data.Obj
      }else{
        this.$message.error(data.message)
      }
    }
  },
  methods: {
    exportData(){
      this.$store.dispatch('allocationReportExport', this.ruleForm).then(()=>{
        this.exportLoading = true
      })
    },
    searchData(){
      this.$store.dispatch('GetAllocationReport', this.ruleForm).then(()=>{
        this.loading = true
      })
    },
    handlePageChange: function(currentPage) {
      if (this.ruleForm.PN == currentPage || this.loading) {
        return;
      }
      this.ruleForm.PN = parseInt(currentPage);
      this.searchData()
    },
    handleView(item, idx){
      console.log(item)
      this.$message.warning(item.GOODSNAME)
    }
  },
  created() {
    
  },
  mounted(){
    this.searchData()
  },
  beforeCreate() {
    let list1 = this.$store.state.category.categoryList;
    let list2 = this.$store.state.goods.goodsbrandList;

    if (list1.length >= 0) {
      this.$store.dispatch("getCategoryList",{}).then(() => {});
    }
    if (list2.length >= 0) {
      this.$store.dispatch("getGoodsbrandList",{})
    }
    this.$store.dispatch("getShopList")
  },
  components: {

  }
};
</script>
<style scoped>
.active {
  background: #fff;
  border-color: #409eff;
  color: #409eff;
}
.report .half {
  width: 25%;
  margin-right: 0px;
  float: left;
}

.report .half .el-date-editor.el-input {
  width: 100% !important;
}
.report .el-form-item{
  margin-bottom:16px;
}
.report .el-form-item__content {
  line-height: 40px;
}

.reportInfo span{
  color: #f00;
}
</style>