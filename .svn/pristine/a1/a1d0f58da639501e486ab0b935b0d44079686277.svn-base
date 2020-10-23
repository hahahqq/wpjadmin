<template>
  <!--优惠活动列表-->
  <div>
    <el-table border 
      v-if="dataList"
      :data="dataList"
      v-loading="loading"
      @selection-change="handleSelectionChange" 
      header-row-class-name="bg-f1f2f3"
      height="500" style="width: 100%;">
      <el-table-column type="selection" width="36" fixed="left">
      </el-table-column>
      <el-table-column prop="CAPTION" label="名称" width="160" sortable>
      </el-table-column>
       <el-table-column prop="COMPANYNAME" label="公司名">
      </el-table-column>
      <el-table-column prop="ADDRESS" label="地址">
      </el-table-column>
    
      <el-table-column prop="DATENAME" label="有效时间" width="260">
      </el-table-column>
      <el-table-column prop="ISSTOP" label="状态" :formatter="formatStatus">
      </el-table-column>
      <el-table-column label="操作" width="170" fixed="right">
        <template slot-scope="scope">
          <el-button size="small" :disabled="scope.row.ISSTOP" @click="handleStop(scope.$index, scope.row)">停止</el-button>
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- item -->

  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  // props:['dataList'],
  data(){
    return {
      multipleSelection:[],
      loading:false,
      loadingShop:false,
      loadingItem:false,
      showItem: false
    }
  },
  computed: {
    ...mapGetters({
      dataListState:'marketingListState',
      dataList:'marketingList',
      dataState:'marketingState',
      dataItem:'marketingItem'
    })
  },
  beforeCreate() {
    this.$store.dispatch("getMarketingListImg",{ Type: 0});
  },
  methods:{
    formatStatus: function(row, column) {
      return row.ISSTOP?'已停止':'已启动';
    },
    formatTime:function(row, column) {
      return row.BEGINDATE?this.filterTime(new Date(row.BEGINDATE)):'';
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleStop(idx, row) {
      this.$emit('handleStop',row)     
    },
    handleEdit(idx, row) {
      this.$emit('handleEdit',row)     
    }
  },
}
</script>

