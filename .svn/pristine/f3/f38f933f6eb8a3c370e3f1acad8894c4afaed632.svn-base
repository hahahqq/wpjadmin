<template>
  <!--列表-->
  <div>
    <el-table border v-if="serversdataList" :data="serversdataList" header-row-class-name="bg-f1f2f3" height="450px" v-loading="loading" style="width: 100%" @selection-change="changeFun">
      <el-table-column type="selection" width="60" fixed="left">
      </el-table-column>
      <el-table-column prop="NAME" label="商品名称" sortable></el-table-column>
      <el-table-column prop="CODE" label="商品编码" sortable></el-table-column>
      <el-table-column prop="PRICE" label="价格"></el-table-column>
      <el-table-column prop="TYPENAME" label="商品类型" width="140"></el-table-column>
    </el-table>
    <div class="m-top-sm clearfix elpagination">
      <el-pagination background @size-change="handlePageChange" @current-change="handlePageChange" :current-page.sync="pagination.PN" :page-size="pagination.PageSize" layout="total, prev, pager, next, jumper" :total="pagination.TotalNumber" class="text-center"></el-pagination>
    </div>

    <div class='text-center m-top-md'>
      <el-button type="primary" @click="saveaddSelectgoods">保 存</el-button>
      <el-button @click="closeModal">取 消</el-button>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      loading: false,
      serversdataList: [],
      multipleSelection: [],
      pagination: {
        TotalNumber: 0,
        PageNumber: 0,
        PageSize: 20,
        PN: 0
      },
      pageData: {
        PN: 1,
        Filter: "",
        Status: -1,
        Mode: 1,
        TypeID: "", //商品类别ID
        DescType: 0
      },
    };
  },
  computed: {
    ...mapGetters({
      dataList: "goodsList",
      dataListStates: "goodsListState",

    })
  },
  watch: {
    dataListStates(data) {
      console.log(data);
      this.loading = false;
      this.isFilter = false;
      this.serversdataList = [...this.dataList];
      if (data.success) {
        this.pagination = {
          TotalNumber: data.paying.TotalNumber,
          PageNumber: data.paying.PageNumber,
          PageSize: data.paying.PageSize,
          PN: data.paying.PN
        };
      }
    },

  },
  methods: {
    closeModal(type) {
      this.$emit("closeModal");
    },
    changeFun(val) {
      this.multipleSelection = val;
    },
    saveaddSelectgoods(val) {
      this.$emit("closeModal");
      this.$emit("handlerClickadd", this.multipleSelection);
    },
    getNewData() {
      this.$store.dispatch("getGoodsList", this.pageData).then(() => {
        this.loading = true;
      });
    },
    handlePageChange: function(currentPage) {
      if (this.pageData.PN == currentPage || this.loading) {
        return;
      }
      this.pageData.PN = parseInt(currentPage);
      this.getNewData();
    },
    searchfun: _.debounce(function() {
      this.searchfun2(0);
    }, 1000),
    searchfun2(type) {
      if (type == 1 && !this.searchText) {
        return;
      }
      this.pageData.Filter = this.searchText;
      this.getNewData();
    },

  },
  beforeCreate() {
    this.$store.dispatch("getGoodsList", { Status: -1, Mode: 1, PN: 1 });
  }
};

</script>
