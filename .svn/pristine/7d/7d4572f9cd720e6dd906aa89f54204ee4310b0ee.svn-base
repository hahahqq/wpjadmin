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
                <el-button size="small" @click="handleDeal({})" icon="el-icon-plus">新增单位</el-button>
              </div>
          
              <div class="content-table4">
                  <div class="content-table-center">
                    <el-table :data="pagelist" border tooltip-effect="dark"
                      v-loading="loading" size='small' element-loading-text='数据加载中...'
                      :height="clientHeight" header-row-class-name="bg-f1f2f3"
                    >
                      <el-table-column prop="NAME" label="名称" width="140" align="center">
                      </el-table-column>
                      <el-table-column prop="REMARK" label="备注">
                      </el-table-column>
                      <el-table-column label="操作" width="200">
                        <template slot-scope="scope">
                          <el-button size="small" type='text' @click="handleDeal(scope.row)" icon="el-icon-edit">编辑</el-button>
                          <el-button size="small" type='text' @click="handleDel(scope.$index, scope.row)" icon="el-icon-delete">删除</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
              </div>
          </div>
        </div>
    </el-container>

      <el-dialog title="商品单位" :visible.sync="dialogVisible" width="400px">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="名称" prop="Name">
            <el-input v-model.trim="form.Name" placeholder="请输入名称"></el-input>
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
    <!-- </div> -->
  </el-container>
</el-container>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import MIXINS_GOOD from "@/mixins/good.js";

export default {
  mixins: [MIXINS_GOOD.GOOD_MENU],
  data() {
    return {
      pagelist: [],
      loading: false,
      dialogVisible: false,
      form: {
        Name: "",
        Remark: ""
      },
      clientHeight: document.body.clientHeight - 180,
      rules: {
        Name: [
          {
            required: true,
            message: "请输入等级名称",
            trigger: "blur"
          }
        ],
      },
      dealType: "add"
    }
  },
  computed: {
    ...mapGetters({
      dataList: "unitList",
      dataListState: "unitListState",
      dataState: "unitState",
      dealState: "dealUnitState",
      delUnitItemState:'delUnitItemState'
    })
  },
  components: {
    headerPage: () => import("@/components/header")
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
      this.dialogVisible = false;
    },
    delUnitItemState(data){
      if(data.success){
        this.$message.success('删除成功 !')
        this.getNewData()
      }else{
        this.$message({
          message: data.message,
          type: "error"
        });
      }
    }
  },
  methods: {
    getNewData() {
      this.$store.dispatch("getUnitList").then(() => {
        this.loading = true;
      })
    },
    getUnitItem() {},
    handleDeal(item) {
      if (this.$refs.form) this.$refs.form.resetFields();
      if (Object.keys(item).length > 0) {
        this.form = Object.assign({}, item, {
          Id: item.ID,
          Name: item.NAME,
          Remark: item.REMARK
        });
        this.dealType = "edit";
      } else {
        this.form = {
          Name: "",
          Remark: ""
        };
        this.dealType = 'add';
      }
      this.dialogVisible = true;
    },
    dealData() {
      var _this = this;
      // let haveSameName = _this.pagelist.filter(item => item.NAME == _this.form.Name)
      // if(haveSameName.length != 0 ){
      //   this.$message.warning('该单位名称已存在 ！')
      //   return
      // }
    
      this.$refs.form.validate(valid => {
        if (valid) {
          _this.loading = true;
          _this.$store.dispatch("dealUnitItem", _this.form).then(() => {
            _this.loading = true;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleDel(index, item) {
       this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$store.dispatch("delUnitItem", item )
      })
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