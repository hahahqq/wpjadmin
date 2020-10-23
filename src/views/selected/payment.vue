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

          <div class="content-eighty">
            <div class="content-center">
              <el-button size="small" @click="handleDeal({})" icon="el-icon-plus">新增</el-button>
            </div>
          </div>

          <div class="content-table4">
              <div class="content-table-center">

                <!--列表-->
                <el-table
                  border size='small'
                  :data="pagelist"
                  v-loading="loading"
                  :height="tableHeight"
                  header-row-class-name="bg-f1f2f3"
                >
                  <el-table-column prop="NAME" label="名称" width="120" sortable></el-table-column>
                  <el-table-column prop="ISSTOP" label="状态"></el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="handleDeal(scope.row)" icon="el-icon-edit">编辑</el-button>
                        <el-button type="text" size="small" @click="handleDel(scope.row)" icon="el-icon-delete">删除</el-button>
                    </template> 
                  </el-table-column>
                </el-table>
              </div>
          </div>
        </div>

        <!-- 新增编辑 -->
        <el-dialog title="支出项目" :visible.sync="dialogVisible" width="400px">
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
import MIXINS_DEFRAY from "@/mixins/defray.js";
export default {
  mixins: [MIXINS_DEFRAY.DEFRAY_MENU],
  data() {
    return {
      pagelist: [],
      loading: false,
      pagination: {
        TotalNumber: 0,
        PageNumber: 0,
        PageSize: 120,
        PN: 1
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
      tableHeight: document.body.clientHeight - 190,
    };
  },
  computed: {
    ...mapGetters({
      dataList: "paymentList",
      dataListState: "paymentListState",
      dataState: "paymentState",
      dealState: "dealPaymentState"
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
      this.loading = false
      if (data.success) {
        this.getNewData();
      }
      this.$message({
        message: data.message,
        type: data.success ? "success" : "error"
      });
      this.dialogVisible = false;
    }
  },
  components: {
    headerPage: () => import("@/components/header"),
  },
  methods: {
    getNewData() {
      this.$store.dispatch("getPaymentList", {}).then(() => {
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
        this.form = { Name: "", Remark: "" }
        this.dealType = "add";
      }
      this.dialogVisible = true;
    },
    dealData() {
      var _this = this;
      this.$refs.form.validate(valid => {
        if (valid) {
          _this.loading = true;
          _this.$store.dispatch("dealPaymentItem", {
            type: this.dealType,
            data: _this.form
          }).then(() => {
            _this.loading = true;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleDel(item) {
      this.$confirm("此操作将永久删除该支出项目, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$store.dispatch("dealPaymentItem", { type: "del", data: item }).then(() => {
          this.loading = true;
          this.dealType = "del";
        });
      }).catch(() => {});
    }
  },
  mounted() {
    if (this.dataList.length == 0) {
      this.getNewData();
    } else {
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
  border: solid 1px #EDEEEE;
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
  
  .el-main {
    background-color: #F4F5FA;
    color: #333;
  }
  .member-main-top{
    width: 99%;
    margin-left: 0.5%;
    margin-right: 0.5%;
    height: 150px;
    background: #fff;
  }
  .member-main-table{
    margin-top: 8px;
    width: 99%;
    margin-left: 0.5%;
    margin-right: 0.5%;
    height: 600px;
    background: #fff;
  }
  .member-main-top-buttom{
    height: 70px;
    width: 100%;
    line-height: 70px;
  }
  .member-main-top-type{
    height: 70px;
    width: 100%;
    line-height: 70px;
  }
  .defray-index-top{
    width: 98%;
    margin-left: 1%;
    margin-right: 1%;
    background: #fff;
    height: 80px;
    line-height: 80px;
    margin-top: 5px;
    margin-bottom: 15px;
  }
  .defray-index-top-cont{
    width: 96%;
    margin-left: 2%;
    margin-right: 2%;
  }
  .defray-table{
    width: 98%;
    margin-left: 1%;
    margin-right: 1%;
    background: #fff;
  }
</style>
