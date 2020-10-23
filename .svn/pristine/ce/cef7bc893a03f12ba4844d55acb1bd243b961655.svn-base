<template>
<el-container>
  <el-header style="height:50px;">
    <headerPage></headerPage>
  </el-header>
  <el-container>
    <el-aside width="100px">
        <section style="min-width:100px;">
        <memberMenu :activePath="activePath" :routesList="routesList" :width="100"></memberMenu>
        </section>
    </el-aside>

    <el-container>
        <div class="content-new-fex">
          <div class="content-eightys">
              <div class="content-center">
                <el-button size="small" @click="handleDeal({})" icon="el-icon-plus">新增分类</el-button>
              </div>
          
              <div class="content-table4">
                  <div class="content-table-center">
                    <!--列表-->
                    <el-table
                      border size='small'
                      :data="pagelist"
                      v-loading="loading"
                      header-row-class-name="bg-f1f2f3"
                      :height="clientHeight"
                    >
                      <el-table-column prop="NAME" label="名称" width="200" align="center"></el-table-column>
                      <el-table-column prop="REMARK" label="备注" show-overflow-tooltip></el-table-column>
                      <el-table-column label="操作" width='200'>
                        <template slot-scope="scope">
                          <el-button size="small" type="text" @click="handleDeal(scope.row)" icon="el-icon-edit">编辑</el-button>
                          <el-button size="small" type="text" @click="handleDel(scope.$index, scope.row)" icon="el-icon-delete">删除</el-button>
                        </template>
                      </el-table-column>
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
                        class="text-right"
                      ></el-pagination>
                    </div>
                  </div>
              </div>
            </div>
        </div>

        <el-dialog title="商品分类" :visible.sync="dialogVisible" width="400px">
          <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="名称" prop="Name">
              <el-input v-model="form.Name" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input type="textarea" v-model="form.Remark"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="dealData">保存</el-button>
              <el-button @click="dialogVisible=false">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>

      </el-container>
  </el-container>
</el-container>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import MIXINS_GOOD from "@/mixins/good.js";

export default {
  mixins: [MIXINS_GOOD.GOOD_MENU],
  data() {
    var checkNumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("不能为空"));
      }
      setTimeout(() => {
        if (value > 100 || value < 1) {
          callback(new Error("请输入1~100内数值"));
        } else {
          callback();
        }
      }, 500);
    };
    return {
      pagelist: [],
      loading: false,
      pagination: {
        TotalNumber: 0,
        PageNumber: 0,
        PageSize: 20,
        PN: 0
      },
      pageData: { PN: 1 },
      dialogVisible: false,
      form: {
        Name: "",
        Remark: ""
      },
      rules: {
        Name: [
          {
            required: true,
            message: "请输入名称",
            trigger: "blur"
          }
        ]
      },
      dealType: "add",
      clientHeight: document.body.clientHeight - 220
    }
  },
  components: {
    headerPage: () => import("@/components/header")
  },
  computed: {
    ...mapGetters({
      dataList: "categoryList",
      dataListState: "categoryListState",
      dataState: "categoryState",
      dealState: "dealCategoryState",
      delGoodsCategory:'delGoodsCategory'
    })
  },
  watch: {
    dataListState(data) {
      this.loading = false;
      if (data.success) {
        this.pagelist = [...this.dataList];
        this.pagination = {
          TotalNumber: data.paying.TotalNumber,
          PageNumber: data.paying.PageNumber,
          PageSize: data.paying.PageSize,
          PN: data.paying.PN
        };
        this.SumBillCount = data.SumBillCount ? parseInt(data.SumBillCount) : 0;
        this.SumMoney = data.SumMoney ? parseInt(data.SumMoney) : 0;
      }else{
        // this.$store.dispatch("getCategoryList",{})
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
      this.dialogVisible = false;
    },
    delGoodsCategory(data){
      if(data.success){
        this.$message.success('删除成功 !')
        this.getNewData()
      }else{
        this.$message({ message: data.message, type: "error" });
      }
    }
  },
  methods: {
    getNewData() {
      this.$store.dispatch("getCategoryList",{}).then(() => {
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
    getCategoryItem() {},
    handleDeal(item) {
      if (this.$refs.form) this.$refs.form.resetFields();
      if (Object.keys(item).length > 0) {
        this.form = Object.assign({}, item, {
          ID: item.ID,
          Name: item.NAME,
          Remark: item.REMARK
        });
        this.dealType = "edit";
      } else {
        this.form = { Name: "", Remark: "" };
        this.dealType = true;
      }
      this.dialogVisible = true;
    },
    dealData() {
      var _this = this;
      this.$refs.form.validate(valid => {
        if (valid) {
          _this.loading = true;
          _this.$store.dispatch("dealCategoryItem", _this.form).then(() => {
            _this.loading = true;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleDel(index, item) {
      this.$confirm("此操作将永久删除该分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$store.dispatch("delCategoryItem",item)
      }).catch(()=>{ })
    }
  },
  mounted() {
    if (this.dataList.length == 0) {
      this.getNewData();
    } else {
      this.pagination = {
        TotalNumber: this.dataListState.paying.TotalNumber,
        PageNumber: this.dataListState.paying.PageNumber,
        PageSize: this.dataListState.paying.PageSize,
        PN: this.dataListState.paying.PN
      };
      this.pagelist = [...this.dataList];
    }
  }
};
</script>


<style scoped>
.member-header{
  display: flex;
  align-items: center;
  height: 50px;
}
.center-title{
  width: 100px;
  text-align: center;
  height: 50px;
  line-height: 50px;
  border: solid 1px #d7d7d7;
}
.center-cont{
  width: 100px;
  text-align: center;
  height: 50px;
  line-height: 50px;
}
.el-header{
  padding: 0 !important;
}
.shop{
  display: flex;
  align-items: center;
  height: 50px;
  position: relative;
}
.shop .name{
  position: absolute;
  right: 50px;
  height: 50px;
  line-height: 50px;
  width: 150px;
  text-align: center;
  top: 0;
  /* background: rebeccapurple; */
}
  .el-header, .el-footer {
    background-color: #fff;
    color: #333;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .content-eightys{
    display: flex;
    align-items: center;
    width: 100%;
    height: 80px;
    background: #fff;
  }
</style>