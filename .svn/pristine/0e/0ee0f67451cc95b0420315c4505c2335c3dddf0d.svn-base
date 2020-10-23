<template>
  <div>
    <div class="content-eighty">
        <div class="content-center">
          <el-button size="small" type="primary" @click="handleDeal({})" icon="el-icon-plus">新增</el-button>
        </div>
    </div>

    <div class="content-table4">
      <div class="content-table-center">
        <!--列表-->
        <el-table
          border size='small'
          :data="pagelist"
          v-loading="loading"
          height="500"
          header-row-class-name="bg-f1f2f3"
        >
          <el-table-column prop="NAME" label="员工姓名" width="120"></el-table-column>
          <el-table-column prop="CODE" label="员工工号"></el-table-column>
          <el-table-column prop="SEX" label="性别" width="60" align="center">
            <template slot-scope='scope'>
              {{scope.row.SEX == 1 ? '男' : scope.row.SEX == 2 ? '女' : '未知'}}
            </template>
          </el-table-column>
          <el-table-column prop="MOBILENO" label="手机号码"></el-table-column>
          <el-table-column prop="SHOPNAME" label="店铺"></el-table-column>
          <el-table-column prop="POSITION" label="职务"></el-table-column>
          <el-table-column prop="BIRTHDATE" label="生日" :formatter="formatbirthdate"></el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
                <el-button size="small" type="text" @click="handleDeal(scope.row)" icon="el-icon-edit">编辑</el-button>
                <el-button
                  size="small"
                  type="text"
                  v-if="!scope.row.ISINIT"
                  @click="handleDel(scope.$index, scope.row)"
                  icon="el-icon-delete"
                >删除</el-button>
              <div class="hide">{{scope.row}}</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- deal -->
    <el-dialog :title="dealType=='add'?'新增员工':'编辑员工'" :visible.sync="dialogVisible" width="600px">
      <editEmployeePage
        @closeModal="dialogVisible=false"
        @resetList="dialogVisible=false;getNewData()"
        :propsData="{state:dialogVisible}"
      ></editEmployeePage>
    </el-dialog>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      pagelist: [],
      loading: false,
      dialogVisible: false,
      dealType: "add"
    };
  },
  computed: {
    ...mapGetters({
      dataList: "employeeList",
      dataListState: "employeeListState",
      dealState: "delemployeestate"
    })
  },
  watch: {
    dataListState(data) {
      this.loading = false;
      if (data.success) {
        this.pagelist = [...this.dataList];
      }
    },
    dealState(data) {
      if (data.success) {
        this.getNewData();
      }
      this.$message({
        message: data.message,
        type: data.success ? "success" : "error"
      });
    }
  },
  methods: {
    formatbirthdate: function(row, column) {
      //性别显示转换
      return row.BIRTHDATE > 0 ?  this.filterTimeOut(row.BIRTHDATE) :'';
    },
    getNewData() {
      this.$store.dispatch("getEmployeeList",{Filter:'',Category:''}).then(() => {
        this.loading = true;
      });
    },
    handleDeal(item) {
      this.$store.dispatch("selectingEmployee", item).then(() => {
        this.dialogVisible = true;
        this.dealType = Object.keys(item).length > 0 ? "edit" : "add";
      });
    },
    handleDel(index, item) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$store.dispatch("getdelemployeestate", { index: index, data: item }).then(() => {
          this.loading = false;
          this.dealType = "del"
        })
      })
    }
  },
  components: {
    editEmployeePage: () => import("@/components/setup/editEmployee")
  },
  mounted() {
    this.getNewData()
  }
};
</script>