<template>
  <div>
    <el-input size='small' placeholder="请输入内容" v-model="searchText" @keyup="handleSearch" >
      <!-- <template slot="append"> -->
        <!-- <a class="text-white pointer block padding-sm" @click="handleSearch">
          <span class="paddingLR-xs">选择</span>
        </a> -->
        <el-button slot='append' type='primary'>选择</el-button>
      <!-- </template> -->
    </el-input>
    <div class="thepopover" v-if="dataListb.length>0">
    <ul>
      <li v-for="item in dataListb">
        <span class="pull-left">{{item.CODE}}</span>
        <span class="pull-right">{{item.NAME}}</span>
      </li>
    </ul>
   <!--    <el-popover placement="top" width="460" trigger="click"  >
        <div>
          <el-table
            ref="singleTable"
            :data="dataListb"
            border
            highlight-current-row
            @current-change="handleCurrentChange"
            height="250"
            style="width: 100%"
          >
            <el-table-column prop="CODE" label="货号" width="120"></el-table-column>
            <el-table-column prop="NAME" label="品名"></el-table-column>
          </el-table>
        </div>
        <el-button slot="reference" ref="bb" style="height:0px;padding:0;"></el-button>
      </el-popover> -->
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  props: ["pindex",'ptext'],
  data() {
    return {
      searchText: "",
      loading: false,
      showTable: false,
      currentRow: null,
      dataListb:[]
    };
  },
  methods: {
    handleSearch() {
      let sendData = {
        Filter: this.searchText,
        Status: 1
      };
      this.loading = true;
      this.$store.dispatch("getGoodsList2", sendData).then(() => {
        this.showTable = true;
        console.log(this.showTable);
      });
    },
    handleCurrentChange(val) {
      console.log(this.dataList.length);
      if (val) {
        this.currentRow = val;
        this.searchText = val.NAME;
         this.$store
        .dispatch("getGoodsItem", { ID: val.ID, IsShowStock: 0 })
        .then(() => {
          this.activeDom = Object.assign({}, value);
        });
        // 获取商品详情再传值

        // this.$emit("getSearchData", { index: this.pindex, data: val });
      }
      if (this.dataList.length > 0) {
        this.$refs.bb.handleClick();
        this.showTable = true;
      }
    },
    hidePanel (e) {
            if (!this.$refs.main.contains(e.target)) {
                this.hide()
            }
        }
  },
  computed: {
    ...mapGetters({
      dataList: "goodsList2",
      dataListState: "goodsListState2"
    })
  },
  watch: {
    dataListState(data) {
      this.loading = false;
      if (data.success) {
        this.currentRow = null;
        this.dataListb=this.dataList;
      }
    },
    ptext(v){
      this.searchText = v
    }
  },
mounted() { document.addEventListener('click', (e) => { if (!this.$el.contains(e.target)) this.dataListb = [] }) }
};
</script>
<style>
.popoverSearch .el-input-group__append {
  background-color: #409eff !important;
  /*padding: 0 0px;*/
}
.theinput {
  position: relative;
  z-index: 1;
}
.thepopover {
  margin-top: 0px;
  position: absolute;
 height: 217px;
    overflow: hidden;
    overflow-y: auto;
    z-index: 9999999;
    left:0;
    right: 0;
    background: #fff;
}
.thepopover ul li{
  overflow: hidden;
  cursor:pointer;

}
.thepopover ul li:hover{
  background:#3ea9ff;
}
</style>
