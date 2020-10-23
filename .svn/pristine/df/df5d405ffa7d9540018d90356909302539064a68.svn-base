<template>
  <div class="guadanc-sock">
    <div class="g-guadanc-sock">
      <el-row :gutter="24">
        <el-col :span="6" style="border-right: 10px solid rgba(234, 226, 213, 1); height: 100%; padding-right:0" class="overflowscroll">
          <div class="section-left overflowscroll" style="max-height: 400px;">
            <div class="leftconent">
              <ul>
                <li v-for="(item,index) in BillList" :key='index' @click="tabxListclick(index,item)" :class="{active:curtab==index}">
                  <div class="leftconent_List">
                    <p>
                      <span>{{item.BILLNO}}</span>
                      <span style=' float:right'>{{item.VIPNAME}}</span>
                    </p>
                    <p>{{item.DATESTR}}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
        <el-col :span="18">
          <div class="shop_box overflowscroll tableLineHeight" :loading="loading" >
            <el-table border :data="GoodsObj" size='small' height='300'
            show-summary
            :summary-method="getSummaries"
             header-row-class-name="bg-f1f2f3" v-loading="loading" element-loading-text='数据加载中...' style="width: 100%; overflow:auto">
              <el-table-column align='center' width='50' type="index" label="序号"></el-table-column>
              <el-table-column align='center' prop="GOODSCODE" label="货号"></el-table-column>
              <el-table-column align='center' prop="GOODSNAME" label="商品名称"></el-table-column>
              <el-table-column align="center" prop='GOODSPRICE' label='零售价'></el-table-column>
              <el-table-column align='center' prop="COLORNAME" label="颜色" width="80"></el-table-column>
              <el-table-column align='center' prop="SIZENAME" label="尺码" width="90"></el-table-column>
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
              <el-table-column align='center' prop="QTY" label="数量" width="60"></el-table-column>
              <el-table-column align='center' prop="MONEY" label="金额" width="80"></el-table-column>
            </el-table>
          </div>
          
          <div style='margin:20px 30px'>
            备注： <span style='color:#999'>{{ListObj.REMARK}}</span>
          </div>
          
          <div class="footer" style="margin-top:16px;">
            <div class="pull-right">
              <el-button type="info" @click="closeModal" icon='el-icon-back'>返回</el-button>
              <el-button type="danger" v-if='GoodsObj.length > 0' @click="deleteGuaDan" icon='el-icon-delete'>删除</el-button>
              <el-button type="success" v-if='GoodsObj.length > 0' @click="Ordercollection" icon='el-icon-check'>取单</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import Vue from 'vue';
export default {
  data() {
    return {
      loading: false,
      curtab:0,
      BillList:[],
      GoodsObj:[],
      ListObj:{},
      BillId: '',
      getpullBillList:[]
    };
  },
  computed: {
    ...mapGetters({
      guadancxlistState: 'guadancxlistState',
      guadancdlistState: 'guadancdlistState',
      delState:'delState'
    })
  },
  watch: {
    guadancxlistState(data) {
      this.loading = false
      if (data.success) {
        this.curtab = 0;
        this.BillList = [...data.data.BillList];
        if (this.BillList.length > 0) {
          this.BillId = this.BillList[0].BILLID;
          this.getguadanList(this.BillList[0].BILLID)
        } else {
          this.GoodsObj = [];
        }
      }
    },
    guadancdlistState(data) {
      this.loading = false;
      if (data.success) {
        this.ListObj = data.data.Obj;
        this.GoodsObj = [...data.data.GoodsObj];
        this.getpullBillList = data.data
      }
    },
    delState(data){
      if (data.success) {
        this.$store.dispatch("getguadancxlistState", {}).then(() => {});
      }
      this.$message({ type: data.success ? 'success' : 'error', message : data.message })
    }
  },
  methods: {
    closeModal (){
      this.$emit('closeModal');
    },
    tabxListclick(index, item) {
      this.loading = true;
      this.curtab = index;
      this.BillId = item.BILLID;
      this.getguadanList(item.BILLID);
    }, 
    getguadanList(BILLID) {
      this.$store.dispatch("getguadancdlistState", { BillId: BILLID }).then(() => {});
    },
    getguadancdlist() {
      this.$store.dispatch("getguadancxlistState", {}).then(() => {
        this.loading = true;
      })
    },
    deleteGuaDan() {
      this.$confirm("确认删除此单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.delloading = true;
        this.$store.dispatch("delguadancdlistState", this.BillId)
      }).catch(() => {});
    },
    Ordercollection(){
      this.$emit('pullgoodsList',this.getpullBillList)
      this.$emit('closeModal');
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index < 2) {
          sums[0] = '合计';
          return;
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
  },
  components: {

  },
  mounted(){
    this.getguadancdlist();
  }
};

</script>
<style scoped>
.guadanc-sock .section-left .leftconent ul li {
  position: relative;
  padding: 10px 12px;
  color: #333;
  background: #f2f2f2;
  cursor: pointer;
  font-size: 14px;
  border-bottom:1px solid #ccc;
}
.guadanc-sock .section-left .leftconent ul li:hover {
  background: #A0CFFF;
  color:#fff
}

.guadanc-sock .section-left .leftconent ul li.active {
  background: #3EA9FF;
  color:#fff;
}

.guadanc-sock .section-left .leftconent ul li p {
  margin: 0;
  line-height: 1.8;
}

</style>
