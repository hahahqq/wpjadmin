<template>
  <!--列表-->
  <div>
    <el-table border size='small'
      v-if="dataList"
      :data="dataList"
      v-loading="loading"
      :height="tableHeight"
      @selection-change="handleSelectionChange" 
      header-row-class-name="bg-f1f2f3"
      style="width: 100%;">
      <el-table-column type="selection" width="36" fixed="left">
      </el-table-column>
      <el-table-column prop="BILLID" label="id" width="180" sortable>
      </el-table-column>
      <el-table-column prop="MONEY" label="价格">
      </el-table-column>
      <el-table-column prop="QTY" label="数量">
      </el-table-column>
      <el-table-column prop="DATENAME" label="有效时间" width="260">
      </el-table-column>
      <el-table-column prop="ISSTOP" label="状态" :formatter="formatStatus">
      </el-table-column>
      <el-table-column label="操作" width="170" fixed="right">
        <template slot-scope="scope">
          <el-button size="small" type="text" v-if='scope.row.ISSTOP == false' @click="handleStop(scope.$index, scope.row)">停止</el-button>
          <div class="hide">{{scope.row}}</div>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      multipleSelection: [],
      loading: false,
      loadingShop: false,
      loadingItem: false,
      showItem: false,
      tableHeight: document.body.clientHeight - 250
    };
  },
  computed: {
    ...mapGetters({
      dataListState: "marketingListState",
      dataList: "marketingList",
      dataState: "marketingState",
      dataItem: "marketingItem"
    })
  },
  methods: {
    formatStatus: function(row, column) {
      return row.ISSTOP ? "未启用" : "启用";
    },
    formatTime: function(row, column) {
      return row.BEGINDATE ? this.filterTime(new Date(row.BEGINDATE)) : "";
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
  }
};
</script>

