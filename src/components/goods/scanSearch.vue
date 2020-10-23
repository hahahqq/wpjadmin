<template>
  <div class="scanSearch">
    <el-input
      type="default"
      v-model="searchText" size='small'
      @keydown.enter.native="scanSearch"
      autofocus="true"
      placeholder="请扫描商品或单品条形码"
    >
      <div slot="prepend" class="bg-f1f2f3">
        <i class="icon-barcode"></i>
        <span class="m-left-xs">扫码添加</span>
      </div>
    </el-input>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  props: ["sindex"],
  data() {
    return {
      searchText: "",
      loading: false,
    };
  },
  methods: {
    scanSearch(e) {
      let value = e.target.value;
      if(value){
        this.searchText = value;
        let sendData = {
          Filter: this.searchText,
          Status: 1
        };
        this.$store.dispatch("getGoodsList2",sendData).then(() => {
          this.loading = true;
        });
      }
    },
    sureItem(item){
      // 获取商品详情再传值
      
      // this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     this.$message({
      //       type: 'success',
      //       message: '删除成功!'
      //     });
      //   })
    },
  },
  computed: {
    ...mapGetters({
      ResultList:'goodsList2',
      ResultState: "goodsListState2"
    })
  },
  watch: {
    ResultState(data) {
      this.loading = false;
      if (data.success) {
        this.sureItem(this.ResultList[0]);
      }
    }
  }
};
</script>
<style>
.popoverSearch .el-input-group__append {
  background-color: #409eff !important;
  padding: 0 0px;
}
.theinput {
  position: relative;
  z-index: 1;
}
.thepopover {
  margin-top: -20px;
  position: relative;
  z-index: -1;
}
</style>
