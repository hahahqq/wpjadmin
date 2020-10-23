<template>
  <div>
    <div class="m-bottom-md">
      <el-button-group class="m-right-sm">
        <el-button type="default" icon="el-icon-plus" @click="showAddNew=true; title='新增套餐'; dealState='add';">新增套餐</el-button>
      </el-button-group>
      <!-- add -->
      <!-- search -->
      <el-input type="default" v-model="searchText" placeholder="套餐编码/名称" class="pull-right" style="width: 250px;">
        <el-button slot="append" type="default" icon="el-icon-search" @click="searchfun2(1)"></el-button>
      </el-input>
    </div>
    <!--列表-->
    <el-table border :data="taotandatalist" v-loading="loading" height="500" header-row-class-name="bg-f1f2f3" style="width: 100%;">
      <el-table-column type="selection" width="46" fixed="left"></el-table-column>
      <el-table-column prop="NAME" label="商品名称" width="200" sortable></el-table-column>
      <el-table-column prop="LONGGOODSNAME" label="套餐内容" width="330"></el-table-column>
      <el-table-column prop="VALIDDAY" label="有效天数" width="150"></el-table-column>
      <el-table-column prop="PRICE" label="价格" width="150"></el-table-column>
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button-group>
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" @click="handleDel(scope.$index, scope.row)" icon="el-icon-delete">删除</el-button>
          </el-button-group>
          <div class="hide">{{scope.row}}</div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="m-top-sm clearfix elpagination" v-if='pagination.TotalNumber > 20'>
      <el-pagination 
        background
        @size-change="handlePageChange" 
        @current-change="handlePageChange" 
        :current-page.sync="pagination.PN" 
        :page-size="pagination.PageSize" 
        layout="total, prev, pager, next, jumper" 
        :total="pagination.TotalNumber" 
        class="text-center">
      </el-pagination>
    </div>
    <!-- add -->
    <el-dialog v-if="showAddNew" :title="title" :visible.sync="showAddNew" width="770px">
      <add-new-goods @closeModal="showAddNew=false" @resetList="showAddNew=false;getNewData();" :dataType="dealState"></add-new-goods>
    </el-dialog>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";

export default {

  data() {
    return {
      taotandatalist: [],
      searchText: '',
      title: '新增套餐',
      loading: false,
      showAddNew: false,
      dealState:'add',
      pagination: {
        TotalNumber: 0,
        PageNumber: 0,
        PageSize: 20,
        PN: 0
      },

    };
  },
  computed: {
    ...mapGetters({
      setmealrselectlistState: "setmealrselectlistState",
      goodsstemaealgState: "goodsstemaealgState",
    
    })
  },
  watch: {
    setmealrselectlistState(data) {
      if (data.success) {
        let DataArr = data.data.PageData.DataArr;
        if (DataArr.length > 0) {
          this.loading = false;
          this.taotandatalist = DataArr;
        }
        this.pagination = {
          TotalNumber: data.data.PageData.TotalNumber,
          PageNumber: data.data.PageData.PageNumber,
          PageSize: data.data.PageData.PageSize,
          PN: data.data.PageData.PN
        };
      }
    },
    goodsstemaealgState(data) {
      if (data.success) {
        this.getNewData()
      }
      this.$message({
        message: data.message,
        type: data.success ? "success" : "error"
      });
      this.dialogVisible = false;
    },
   


  },
  methods: {
    getNewData() {
      let sateDate = {
        Filter: this.Filter,
        PN: this.pagination.PN
      }
      this.$store.dispatch("getsetmealrselectlistState", sateDate).then(() => {
        this.loading = true;
      });
    },
    handlePageChange: function(currentPage) {
      // debugger
      // if (this.pagination.PN == currentPage || this.loading) {
      //   return;
      // }
      this.pagination.PN = parseInt(currentPage);
      this.getNewData();
    },
    searchfun: _.debounce(function() {
      this.searchfun2(0);
    }, 1000),
    searchfun2(type) {
      if (type == 1 && !this.searchText) {
        return;
      }
      this.pagination.Filter = this.searchText;
      this.getNewData();
    },
    handleEdit(index, item) {
      this.dealState='edit';
      this.title = '编辑套餐';
      this.showAddNew = true;
      let sendData = {
        ID: item.ID
      }
      this.$store
        .dispatch("getGoodssetmealgdetails", sendData)
        .then(() => {});

    },
    handleDel(index, item) {
      this.$confirm("此操作将永久删除该套餐, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          this.$store
            .dispatch("getGoodssetmealg", item)
            .then(() => {
              this.loading = true;
              this.dealType = "del";
            });
        })
    }

  },
  mounted() {

  },
  components: {
    addNewGoods: () => import("@/components/goods/addsetmealg"),
    // itemPage: () => import("./item")
  },
  beforeCreate() {
    this.$store.dispatch("getsetmealrselectlistState", {}).then(() => {
      this.loading = false;
    })
  }
};

</script>
<style scoped>
</style>
