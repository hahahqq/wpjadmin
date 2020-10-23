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
                <el-button size="small" type="primary" @click="handleDeal({})" icon="el-icon-plus">新增</el-button>
              </div>
            </div>

            <div class="content-table4">
              <div class="content-table-center">
                <!--列表-->
                <el-table border :data="pagelist" size='small'
                  v-loading="loading" element-loading-text='数据加载中...'
                  height="600"
                  header-row-class-name="bg-f1f2f3"
                >
                  <el-table-column prop="NAME" label="名称" width="120"></el-table-column>
                  <el-table-column prop="REMARK" label="备注" show-overflow-tooltip></el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <el-button size="small" type="text" @click="handleDeal(scope.row)" icon="el-icon-edit">编辑</el-button>
                      <el-button size="small" type="text" @click="handleDel(scope.$index, scope.row)" icon="el-icon-delete">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>

            <el-dialog :title="(this.dealType=='add'?'新增':'编辑')+'积分'" :visible.sync="dialogVisible" width="430px">
              <el-form ref="form" :model="form" :rules="rules" :hide-required-asterisk='true' label-width="90px">
                <el-row>
                  <el-col :span="11">
                    <el-form-item label='消费金额 :' prop="Money">
                      <el-input size="small" type='number' v-model='form.Money' style="width:120px">
                        <template slot="append">元</template>
                      </el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="11">
                    <el-form-item label=' 获得' prop="Integral">
                      <el-input size="small" type="number" v-model='form.Integral' style="width:120px">
                        <template slot="append">分</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="22">
                    <el-form-item label="积分规则 :">
                      <span> {{form.Money == '' ? 0 : form.Money}} 元 = {{form.Integral == '' ? 0 : form.Integral}} 积分 </span>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col>
                    <el-form-item label="默认规则：">
                      <el-switch v-model="form.IsDefault"></el-switch>
                    </el-form-item>
                  </el-col>
                </el-row>
              
                <el-form-item>
                  <el-button type="primary" @click="dealData">保存</el-button>
                  <el-button @click="dialogVisible=false">取消</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>
          </div>
      </el-container>
    </el-container>
</el-container>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import MIXINS_SETUP from "@/mixins/setup";
export default {
  mixins: [MIXINS_SETUP.SIDERBAR_MENU],
  data() {
    return {
      pagelist: [],
      loading: false,
      dialogVisible: false,
      info:'',
      form: {
        NAME:'',
        Money:'',
        Integral:'',
        Rate:'',
        IsDefault: false
      },
      rules: {
        Money: [
          {
            required: true,
            message: "请输入金额",
            trigger: "blur"
          }
        ],
        Integral: [
          {
            required: true,
            message: "请输入积分",
            trigger: "blur"
          }
        ],
      },
      dealType: "add"
    };
  },
  computed: {
    ...mapGetters({
      dataList: "integralList",
      dataListState: "integralListState",
      dataState: "integralState",
      dealState: "dealIntegralState"
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
      this.loading = false
      this.dialogVisible = false;
      this.$message({ message: data.message, type: data.success ? "success" : "error" })
    }
  },
  methods: {
    getNewData() {
      this.$store.dispatch("getIntegralList",{}).then(() => {
        this.loading = true;
      });
    },
    handleDeal(item) {
      if (this.$refs.form) this.$refs.form.resetFields();
      if (Object.keys(item).length > 0) {
        this.form = Object.assign({}, item, {
          Id: item.ID,
          NAME: item.NAME,
          Money: item.MONEY,
          Integral: item.INTEGRAL,
          IsDefault: item.ISDEF == 1 ? true : false
        })
        this.dealType = "edit"
      } else {
        this.form = { NAME: "", Money: '', Integral: '', Rate:'', IsDefault: false }
        this.dealType = 'add'
      }
      this.dialogVisible = true
    },
    dealData() {
      var _this = this;
      this.$refs.form.validate(valid => {
        if (valid) {
          _this.loading = true;
          _this.form.Rate = parseFloat(_this.form.Integral / _this.form.Money)
          _this.form.NAME = `${_this.form.Money}元=${_this.form.Integral}积分`
          _this.form.IsDefault =  _this.form.IsDefault == true ? 1 : 0
          _this.$store.dispatch("dealIntegralItem", _this.form).then(() => {
            _this.dialogVisible = false
          })
        } else {
          console.log("error submit!!")
          return false
        }
      })
    },
    handleDel(index, item) {
       this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$store.dispatch("delIntegralItem", { index: index, data: item }).then(() => {
          this.loading = true;
          this.dealType = "del";
        })
      })
    }
  },
  mounted() {
    this.getNewData();
  }
};
</script>

<style scoped>
.el-header{
  padding: 0 !important;
}
.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}
</style>
